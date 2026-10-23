import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { transform } from "esbuild";

test("analytics service inserts events without requesting a restricted SELECT/RETURNING read", async () => {
  const source = await readFile(new URL("../src/services/analytics.ts", import.meta.url), "utf8");
  const instrumentedSource = source.replace(
    'import { supabase } from "../lib/supabase";',
    "const { supabase } = globalThis.__pulsePlayAnalyticsTest;",
  );

  assert.notEqual(instrumentedSource, source, "test must replace the real Supabase import");

  const { code } = await transform(instrumentedSource, {
    loader: "ts",
    format: "esm",
    target: "node24",
  });

  let inserted;
  let selectCalled = false;
  globalThis.__pulsePlayAnalyticsTest = {
    supabase: {
      from(table) {
        assert.equal(table, "analytics_events");
        return {
          async insert(payload) {
            inserted = payload;
            return { error: null };
          },
          select() {
            selectCalled = true;
            throw new Error("analytics insert must not request a SELECT/RETURNING read");
          },
        };
      },
    },
  };

  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: { referrer: "https://example.test/", title: "Integration Test" },
  });
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      location: { pathname: "/store" },
      sessionStorage: { getItem: () => null, setItem: () => {} },
    },
  });
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { userAgent: "PulsePlay integration test" },
  });

  try {
    const moduleUrl = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
    const analytics = await import(moduleUrl);
    const result = await analytics.trackEvent({
      eventType: "page_view",
      pagePath: "/store",
      pageTitle: "Integration Test Store",
      contentType: "store",
    });

    assert.ok(result, "trackEvent should return the submitted payload");
    assert.equal(inserted.event_type, "page_view");
    assert.equal(inserted.page_path, "/store");
    assert.equal(inserted.page_title, "Integration Test Store");
    assert.equal(inserted.content_type, "store");
    assert.equal(selectCalled, false);
  } finally {
    delete globalThis.__pulsePlayAnalyticsTest;
    delete globalThis.document;
    delete globalThis.window;
    delete globalThis.navigator;
  }
});
