import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";

/**
 * Interactive "Test Lab": visitors pick a suite, the Node.js server simulates a run,
 * and results stream in one by one like a real test runner.
 */
export default function TestRunner() {
  const [suites, setSuites] = useState([]);
  const [suite, setSuite] = useState("android-ui");
  const [chaos, setChaos] = useState(false);
  const [running, setRunning] = useState(false);
  const [shown, setShown] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const timers = useRef([]);

  useEffect(() => {
    fetch("/api/suites").then((r) => r.json()).then(setSuites).catch(() => {});
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const run = async () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setShown([]);
    setSummary(null);
    setError(null);
    try {
      const res = await fetch("/api/run-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suite, chaos }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      data.results.forEach((r, i) => {
        timers.current.push(setTimeout(() => setShown((s) => [...s, r]), 350 * (i + 1)));
      });
      timers.current.push(
        setTimeout(() => {
          setSummary(data);
          setRunning(false);
        }, 350 * (data.results.length + 1))
      );
    } catch (e) {
      setError(e.message);
      setRunning(false);
    }
  };

  const total = suites.find((s) => s.id === suite)?.count || 1;
  const progress = Math.round((shown.length / total) * 100);

  return (
    <section id="test-lab" className="section">
      <SectionTitle
        index="04"
        title="Live Test Lab"
        subtitle="Run one of my test suites — the Node.js API executes it and streams results back"
      />
      <div className="lab card card--cyan">
        <div className="lab__controls">
          <div className="filters">
            {suites.map((s) => (
              <button
                key={s.id}
                className={`filter ${suite === s.id ? "active" : ""}`}
                onClick={() => setSuite(s.id)}
                disabled={running}
              >
                {s.name}
              </button>
            ))}
          </div>
          <label className="toggle mono">
            <input type="checkbox" checked={chaos} onChange={(e) => setChaos(e.target.checked)} disabled={running} />
            <span className="toggle__track"><span className="toggle__thumb" /></span>
            chaos mode (inject a bug)
          </label>
          <button className="btn btn--green" onClick={run} disabled={running}>
            {running ? "Running…" : "▶ Run Suite"}
          </button>
        </div>

        <div className="lab__console mono" aria-live="polite">
          <div className="lab__console-head">
            <span className="dot dot--red" /><span className="dot dot--yellow" /><span className="dot dot--green" />
            <span className="muted">test-runner — {suite}</span>
          </div>
          <div className="progress"><div className="progress__bar" style={{ width: `${progress}%` }} /></div>

          {!shown.length && !running && !error && (
            <p className="muted">$ waiting… press <span className="neon-green">Run Suite</span> to start.</p>
          )}
          {error && <p className="neon-pink">✖ {error} — is the server running?</p>}

          {shown.map((r, i) => (
            <div key={i} className={`lab__line ${r.status}`}>
              <span>{r.status === "passed" ? "✔" : "✖"}</span>
              <span className="lab__name">{r.name}</span>
              <span className="muted">{r.durationMs}ms</span>
              {r.error && <div className="lab__error">↳ {r.error}</div>}
            </div>
          ))}
          {running && <p className="neon-cyan">running<span className="blink">_</span></p>}

          {summary && (
            <div className={`lab__summary ${summary.failed ? "has-fail" : ""}`}>
              Tests: <span className="neon-green">{summary.passed} passed</span>
              {summary.failed > 0 && <>, <span className="neon-pink">{summary.failed} failed</span></>}, {summary.total} total
              {"  ·  "}Time: {(summary.durationMs / 1000).toFixed(2)}s
              {summary.failed > 0 && <div className="muted">→ defect logged in Jira, root cause analysis started 🔍</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
