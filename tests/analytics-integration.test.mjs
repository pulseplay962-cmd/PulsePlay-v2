import assert from "node:assert/strict";
import { createServer as createHttpServer } from "node:http";
import { once } from "node:events";
import test from "node:test";
import { createServer as createViteServer } from "vite";

function withTimeout(promise, ms, label) {\n  let timer;\n  return Promise.race([\n    promise,\n    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms); }),\n  ]).finally(() => clearTimeout(timer));\n}\n\ntest("trackEvent inserts analytics without requesting a restricted SELECT/RETURNING read", async () => {
  let captured;
  const mockDb = createHttpServer(async (req, res) => {
    let body = "";
    for await (const chunk of req) body += chunk;
    captured = {
      method: req.method,
      url: req.url,
      prefer: req.headers.prefer || "",
      apikey: req.headers.apikey,
      body: body ? JSON.parse(body) : null,
    };

    res.writeHead(201, { "content-type": "application/json" });
    res.end();
  });

  mockDb.listen(0, "127.0.0.1");
  await once(mockDb, "listening");

  const port = mockDb.address().port;
  process.env.VITE_SUPABASE_URL = `http://127.0.0.1:${port}`;
  process.env.VITE_SUPABASE_ANON_KEY = "integration-test-anon-key";

  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: { referrer: "https://example.test/", title: "Integration Test" },
  });
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      location: { pathname: "/store" },
      sessionStorage: {
        getItem: () => null,
        setItem: () => {},
      },
    },
  });
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { userAgent: "PulsePlay integration test" },
  });

  const vite = await createViteServer({
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });

  try {
    const analytics = await withTimeout(vite.ssrLoadModule("/src/services/analytics.ts"), 10000, "load analytics module");
    const result = await withTimeout(analytics.trackEvent({
      eventType: "page_view",
      pagePath: "/store",
      pageTitle: "Integration Test Store",
      contentType: "store",
    });

    assert.ok(result, "trackEvent should return its submitted payload");
    assert.equal(captured.method, "POST");
    assert.equal(captured.url.split("?")[0], "/rest/v1/analytics_events");
    assert.equal(captured.body.event_type, "page_view");
    assert.equal(captured.body.page_path, "/store");
    assert.equal(captured.body.page_title, "Integration Test Store");
    assert.equal(captured.body.content_type, "store");
    assert.match(captured.prefer, /return=minimal/);
    assert.doesNotMatch(captured.prefer, /return=representation/);
  } finally {
    await vite.close();
    mockDb.closeAllConnections();
    await new Promise((resolve) => mockDb.close(resolve));
  }
});
