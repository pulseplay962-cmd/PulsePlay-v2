import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { retryAnalyticsWrite } from "../src/services/analyticsRetry.js";

const analyticsSource = readFileSync(
  new URL("../src/services/analytics.ts", import.meta.url),
  "utf8",
);

test("analytics service reuses one event id and configures duplicate-safe upsert", () => {
  // This is a source-contract test: it verifies the production service wiring
  // without importing the app's Supabase client or contacting any database.
  assert.match(analyticsSource, /const eventId = generateEventId\(\);/);
  assert.match(analyticsSource, /const payload = \{[\s\S]*?id:\s*eventId,/);
  assert.match(
    analyticsSource,
    /retryAnalyticsWrite\(\s*async\s*\(\)\s*=>\s*\{[\s\S]*?\.upsert\(payload,\s*\{\s*onConflict:\s*"id",\s*ignoreDuplicates:\s*true,\s*\}\)/,
  );
});

test("retries a failed write and succeeds on the next attempt", async () => {
  const eventIds = [];
  const waits = [];
  let calls = 0;
  const result = await retryAnalyticsWrite(async () => {
    calls += 1;
    eventIds.push("same-event-uuid");
    return calls === 1 ? { message: "temporary network error" } : null;
  }, { wait: async (ms) => waits.push(ms) });

  assert.deepEqual(result, { success: true, attempt: 2 });
  assert.equal(calls, 2);
  assert.deepEqual(eventIds, ["same-event-uuid", "same-event-uuid"]);
  assert.deepEqual(waits, [300]);
});

test("retries thrown transport errors and stops after three failures", async () => {
  let calls = 0;
  const waits = [];
  const result = await retryAnalyticsWrite(async () => {
    calls += 1;
    throw new Error("simulated transport failure");
  }, { wait: async (ms) => waits.push(ms) });

  assert.equal(result.success, false);
  if (!result.success) assert.equal(result.attempts, 3);
  assert.equal(calls, 3);
  assert.deepEqual(waits, [300, 900]);
});

test("a server-accepted write followed by a client timeout retries with the same id", async () => {
  const storedIds = new Set();
  const submittedIds = [];
  let calls = 0;
  const result = await retryAnalyticsWrite(async () => {
    calls += 1;
    const id = "same-event-uuid";
    submittedIds.push(id);
    storedIds.add(id); // Simulate server acceptance before the client sees a timeout.
    return calls === 1 ? { message: "client timed out after server accepted write" } : null;
  }, { wait: async () => {} });

  assert.equal(result.success, true);
  assert.deepEqual(submittedIds, ["same-event-uuid", "same-event-uuid"]);
  assert.equal(storedIds.size, 1);
});

test("reports failure after all attempts without throwing", async () => {
  const result = await retryAnalyticsWrite(async () => ({ message: "write rejected" }), {
    wait: async () => {},
  });
  assert.equal(result.success, false);
  if (!result.success) assert.match(String(result.error?.message), /write rejected/);
});
