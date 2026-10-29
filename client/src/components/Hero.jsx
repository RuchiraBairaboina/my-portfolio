import { useTypewriter } from "../hooks.js";

export default function Hero({ profile }) {
  const role = useTypewriter(profile.roles);
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="home" className="hero">
      <div className="hero__content">
        <p className="mono hero__hello">
          <span className="neon-green">$</span> whoami
        </p>
        <h1 className="hero__name">
          <span className="glitch" data-text={first}>{first}</span>
          <br />
          <span className="neon-pink-text">{rest.join(" ")}</span>
        </h1>
        <h2 className="hero__role mono">
          <span className="neon-cyan">&gt;</span> {role}
          <span className="caret">|</span>
        </h2>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__cta">
          <a href="#projects" className="btn btn--green">View Projects</a>
          <a href="#test-lab" className="btn btn--cyan">Run a Live Test ▶</a>
          <a href="#contact" className="btn btn--ghost">Get in Touch</a>
        </div>
        <p className="hero__loc mono muted">📍 {profile.location} · open to QA / SDET roles</p>
      </div>

      <div className="hero__orb" aria-hidden="true">
        <div className="orb-ring orb-ring--1" />
        <div className="orb-ring orb-ring--2" />
        <div className="orb-ring orb-ring--3" />
        <div className="orb-core mono">
          <span className="neon-green">✔</span> 0 bugs
          <br />
          <small>shipped to prod</small>
        </div>
      </div>

      <a href="#stats" className="hero__scroll" aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}
