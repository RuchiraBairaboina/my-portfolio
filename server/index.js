const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const portfolio = require("./data/portfolio");

const app = express();
const PORT = process.env.PORT || 5000;
const MESSAGES_FILE = path.join(__dirname, "data", "messages.json");

app.use(cors());
app.use(express.json({ limit: "20kb" }));

// Tiny request logger — handy when debugging
app.use((req, _res, next) => {
  if (req.path.startsWith("/api")) console.log(`${new Date().toISOString()}  ${req.method} ${req.path}`);
  next();
});

/* ----------------------------- API ROUTES ----------------------------- */

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/api/portfolio", (_req, res) => {
  res.json(portfolio);
});

app.get("/api/projects", (req, res) => {
  const { category } = req.query;
  const list = category
    ? portfolio.projects.filter((p) => p.category.toLowerCase() === String(category).toLowerCase())
    : portfolio.projects;
  res.json(list);
});

app.get("/api/projects/:id", (req, res) => {
  const project = portfolio.projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

/* ---- Live test-runner demo: simulates a test suite run on the server ---- */

const SUITES = {
  "android-ui": {
    name: "Android UI Suite (Espresso + UIAutomator)",
    tests: [
      "LoginPage › valid credentials navigate to item list",
      "LoginPage › empty password shows inline error",
      "LoginPage › invalid email format is rejected",
      "ItemListPage › add item appends to list",
      "ItemListPage › delete item removes row",
      "ItemListPage › list survives screen rotation",
      "System › notification shade opens via UIAutomator",
      "System › app resumes after home button press",
    ],
  },
  "payment-api": {
    name: "Payment REST API (Pytest)",
    tests: [
      "POST /transactions › returns 201 with valid schema",
      "POST /transactions › rejects missing amount (400)",
      "GET /transactions/:id › returns 404 for unknown id",
      "POST /refund › refunds a created transaction",
      "POST /refund › duplicate refund returns 422",
      "SQL › DB state matches API status after refund",
      "SQL › failed transactions are never refunded",
    ],
  },
  "ci-pipeline": {
    name: "Jenkins CI Pipeline",
    tests: [
      "Checkout source",
      "Build Docker agent image",
      "start_emulator.sh › boot headless AVD (API 34)",
      "Gradle › assembleDebug",
      "run_tests.sh › connectedAndroidTest",
      "Publish JUnit XML reports",
      "Archive APK artifacts",
      "Teardown emulator",
    ],
  },
};

app.get("/api/suites", (_req, res) => {
  res.json(Object.entries(SUITES).map(([id, s]) => ({ id, name: s.name, count: s.tests.length })));
});

app.post("/api/run-tests", (req, res) => {
  const { suite, chaos = false } = req.body || {};
  const def = SUITES[suite];
  if (!def) return res.status(422).json({ error: `Unknown suite "${suite}"` });

  // In "chaos mode" one random test fails, so visitors can see failure reporting.
  const failIndex = chaos ? Math.floor(Math.random() * def.tests.length) : -1;

  const results = def.tests.map((name, i) => {
    const failed = i === failIndex;
    return {
      name,
      status: failed ? "failed" : "passed",
      durationMs: Math.floor(120 + Math.random() * 900),
      error: failed ? "AssertionError: expected element to be displayed — root cause logged via adb logcat" : null,
    };
  });

  const passed = results.filter((r) => r.status === "passed").length;
  res.json({
    suite: def.name,
    total: results.length,
    passed,
    failed: results.length - passed,
    durationMs: results.reduce((a, r) => a + r.durationMs, 0),
    results,
  });
});

/* ------------------------- Contact form endpoint ------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/api/contact", (req, res) => {
  const { name = "", email = "", message = "" } = req.body || {};
  const errors = {};
  if (String(name).trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(String(email).trim())) errors.email = "Please enter a valid email.";
  if (String(message).trim().length < 10) errors.message = "Message should be at least 10 characters.";
  if (Object.keys(errors).length) return res.status(422).json({ ok: false, errors });

  const entry = {
    id: Date.now(),
    name: String(name).trim().slice(0, 100),
    email: String(email).trim().slice(0, 200),
    message: String(message).trim().slice(0, 2000),
    receivedAt: new Date().toISOString(),
  };

  let messages = [];
  try {
    messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
  } catch {
    /* file doesn't exist yet */
  }
  messages.push(entry);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

  res.status(201).json({ ok: true, message: `Thanks ${entry.name}! Your message was received.` });
});

/* ------------- Serve the built React app in production mode ------------- */

const clientDist = path.join(__dirname, "..", "client", "dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(clientDist, "index.html")));
}

app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

if (require.main === module) {
  app.listen(PORT, () => console.log(`⚡ Portfolio API running on http://localhost:${PORT}`));
}

module.exports = app;
