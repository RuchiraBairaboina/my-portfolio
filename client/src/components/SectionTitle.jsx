import { useInView } from "../hooks.js";

export default function SectionTitle({ index, title, subtitle }) {
  const [ref, inView] = useInView(0.4);
  return (
    <div ref={ref} className={`section-title reveal ${inView ? "is-visible" : ""}`}>
      <span className="mono neon-green section-title__index">{index}.</span>
      <h2>{title}</h2>
      {subtitle && <p className="muted">{subtitle}</p>}
      <div className="section-title__line" />
    </div>
  );
}
