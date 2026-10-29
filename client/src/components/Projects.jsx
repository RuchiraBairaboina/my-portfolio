import { useEffect, useMemo, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className={`modal__box card card--${project.color}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        <p className={`mono neon-${project.color}`}>{project.category} · {project.date}</p>
        <h3 className="modal__title">{project.title}</h3>
        <p>{project.summary}</p>
        <div className="metrics">
          {project.metrics.map((m) => (
            <div key={m.label} className="metric">
              <span className={`metric__value neon-${project.color}`}>{m.value}</span>
              <span className="metric__label">{m.label}</span>
            </div>
          ))}
        </div>
        <ul className="exp__bullets">
          {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <div className="chips">
          {project.tech.map((t) => <span key={t} className={`chip chip--${project.color}`}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function TiltCard({ project, onOpen }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  };
  const onLeave = (e) => (e.currentTarget.style.transform = "");

  return (
    <article
      className={`card project card--${project.color}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onOpen(project)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    >
      <div className="project__top">
        <span className={`mono neon-${project.color}`}>{project.category}</span>
        <span className="mono muted">{project.date}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="chips">
        {project.tech.slice(0, 5).map((t) => <span key={t} className={`chip chip--${project.color}`}>{t}</span>)}
        {project.tech.length > 5 && <span className="chip">+{project.tech.length - 5}</span>}
      </div>
      <span className={`project__more mono neon-${project.color}`}>view details →</span>
    </article>
  );
}

export default function Projects({ projects }) {
  const categories = useMemo(() => ["All", ...new Set(projects.map((p) => p.category))], [projects]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const visible = projects.filter((p) => {
    const matchCat = filter === "All" || p.category === filter;
    const q = query.trim().toLowerCase();
    const matchQ = !q || [p.title, p.summary, ...p.tech].join(" ").toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <section id="projects" className="section">
      <SectionTitle index="03" title="Projects" subtitle="Filter, search, and click a card to dive in" />
      <div className="toolbar">
        <div className="filters">
          {categories.map((c) => (
            <button key={c} className={`filter ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        <input
          className="search mono"
          placeholder="search tech… e.g. Docker"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search projects"
        />
      </div>

      <div className="projects">
        {visible.map((p) => <TiltCard key={p.id} project={p} onOpen={setSelected} />)}
        {!visible.length && <p className="muted mono">No projects match “{query}”. Try another keyword.</p>}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
