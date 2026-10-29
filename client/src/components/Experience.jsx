import { useState } from "react";
import SectionTitle from "./SectionTitle.jsx";

export default function Experience({ experience }) {
  const [activeId, setActiveId] = useState(experience[0].id);
  const job = experience.find((e) => e.id === activeId);

  return (
    <section id="experience" className="section">
      <SectionTitle index="02" title="Experience" subtitle="Click a role to see the details" />
      <div className="exp">
        <div className="exp__tabs" role="tablist">
          {experience.map((e) => (
            <button
              key={e.id}
              role="tab"
              aria-selected={e.id === activeId}
              className={`exp__tab exp__tab--${e.color} ${e.id === activeId ? "active" : ""}`}
              onClick={() => setActiveId(e.id)}
            >
              <span className="exp__tab-company">{e.company}</span>
              <span className="exp__tab-period mono">{e.period}</span>
            </button>
          ))}
        </div>

        <div key={job.id} className={`card exp__panel card--${job.color} fade-in`} role="tabpanel">
          <h3>
            {job.role} <span className={`neon-${job.color}`}>@ {job.company}</span>
          </h3>
          <p className="mono muted">
            {job.period} · {job.location}
          </p>
          <ul className="exp__bullets">
            {job.bullets.map((b, i) => (
              <li key={i} style={{ animationDelay: `${i * 60}ms` }}>
                {b}
              </li>
            ))}
          </ul>
          <div className="chips">
            {job.tools.map((t) => (
              <span key={t} className={`chip chip--${job.color}`}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
