import { useState } from "react";
import SectionTitle from "./SectionTitle.jsx";
import { useInView } from "../hooks.js";

const COLORS = ["green", "cyan", "pink", "purple", "yellow"];

export default function Skills({ skills }) {
  const categories = Object.keys(skills);
  const [active, setActive] = useState(categories[0]);
  const [ref, inView] = useInView(0.2);
  const color = COLORS[categories.indexOf(active) % COLORS.length];

  return (
    <section id="skills" className="section" ref={ref}>
      <SectionTitle index="05" title="Skills" subtitle="Pick a category" />
      <div className="skills">
        <div className="skills__tabs">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`skills__tab skills__tab--${COLORS[i % COLORS.length]} ${active === c ? "active" : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div key={active} className={`card skills__panel card--${color} fade-in`}>
          {skills[active].map((s, i) => (
            <div key={s.name} className="skill">
              <div className="skill__row">
                <span>{s.name}</span>
                <span className={`mono neon-${color}`}>{s.level}%</span>
              </div>
              <div className="skill__track">
                <div
                  className={`skill__bar skill__bar--${color}`}
                  style={{ width: inView ? `${s.level}%` : 0, transitionDelay: `${i * 80}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
