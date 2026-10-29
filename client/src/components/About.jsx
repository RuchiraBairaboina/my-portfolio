import SectionTitle from "./SectionTitle.jsx";
import { useInView } from "../hooks.js";

function Highlight({ h, i }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div
      ref={ref}
      className={`card highlight reveal ${inView ? "is-visible" : ""}`}
      style={{ transitionDelay: `${(i % 3) * 90}ms` }}
    >
      <div className="highlight__icon">{h.icon}</div>
      <h3>{h.title}</h3>
      <p>{h.text}</p>
    </div>
  );
}

export default function About({ highlights, education, certifications }) {
  return (
    <section id="about" className="section">
      <SectionTitle index="01" title="About Me" subtitle="What I bring to a QA team" />
      <div className="highlights">
        {highlights.map((h, i) => (
          <Highlight key={h.title} h={h} i={i} />
        ))}
      </div>

      <div className="edu-grid">
        <div className="card card--cyan">
          <h3 className="neon-cyan mono">// education</h3>
          {education.map((e) => (
            <div key={e.degree} className="edu">
              <strong>{e.degree}</strong>
              <span>{e.school}</span>
              <span className="mono muted">{e.period}</span>
            </div>
          ))}
        </div>
        <div className="card card--pink">
          <h3 className="neon-pink mono">// certifications</h3>
          {certifications.map((c) => (
            <div key={c.name} className="edu">
              <strong>🎖 {c.name}</strong>
              <span>{c.issuer}</span>
              <span className="mono muted">{c.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
