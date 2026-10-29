// API tests using Node's built-in test runner (no extra dependencies).
// Run with: npm test   (from the /server folder)
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../index");

let server;
let base;

before(async () => {
  server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  base = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test("GET /api/health returns ok", async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).status, "ok");
});

test("GET /api/portfolio returns profile and projects", async () => {
  const data = await (await fetch(`${base}/api/portfolio`)).json();
  assert.equal(data.profile.name, "Ruchira Bairaboina");
  assert.ok(data.projects.length >= 3);
});

test("GET /api/projects?category=API filters projects", async () => {
  const list = await (await fetch(`${base}/api/projects?category=API`)).json();
  assert.ok(list.every((p) => p.category === "API"));
});

test("GET /api/projects/:id returns 404 for unknown project", async () => {
  const res = await fetch(`${base}/api/projects/nope`);
  assert.equal(res.status, 404);
});

test("POST /api/run-tests with unknown suite returns 422", async () => {
  const res = await fetch(`${base}/api/run-tests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ suite: "missing" }),
  });
  assert.equal(res.status, 422);
});

test("POST /api/run-tests returns all passing without chaos", async () => {
  const res = await fetch(`${base}/api/run-tests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ suite: "payment-api" }),
  });
  const data = await res.json();
  assert.equal(data.failed, 0);
  assert.equal(data.passed, data.total);
});

test("POST /api/contact rejects invalid payload with 422", async () => {
  const res = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "A", email: "bad", message: "short" }),
  });
  assert.equal(res.status, 422);
  const data = await res.json();
  assert.ok(data.errors.name && data.errors.email && data.errors.message);
});
