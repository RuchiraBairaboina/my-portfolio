import { useCountUp, useInView } from "../hooks.js";

const COLORS = ["green", "cyan", "pink", "purple", "yellow", "green"];

function Stat({ stat, start, color }) {
  const value = useCountUp(stat.value, start);
  return (
    <div className={`stat card card--${color}`}>
      <div className={`stat__value neon-${color}`}>
        {value}
        <span className="stat__suffix">{stat.suffix}</span>
      </div>
      <div className="stat__label">{stat.label}</div>
    </div>
  );
}

export default function Stats({ stats }) {
  const [ref, inView] = useInView(0.3);
  return (
    <section id="stats" className="section section--tight" ref={ref}>
      <div className="stats">
        {stats.map((s, i) => (
          <Stat key={s.label} stat={s} start={inView} color={COLORS[i % COLORS.length]} />
        ))}
      </div>
    </section>
  );
}
