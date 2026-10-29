import { useEffect, useState } from "react";
import { useScrollSpy } from "../hooks.js";

const LINKS = [
  ["home", "Home"],
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["test-lab", "Test Lab"],
  ["skills", "Skills"],
  ["terminal", "Terminal"],
  ["contact", "Contact"],
];
const IDS = LINKS.map(([id]) => id);

export default function Navbar({ name }) {
  const active = useScrollSpy(IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = name.split(" ").map((w) => w[0]).join("");

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#home" className="nav__logo" onClick={() => setOpen(false)}>
        &lt;<span className="neon-green">{initials}</span>/&gt;
      </a>
      <button
        className={`nav__burger ${open ? "is-open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>
      <nav className={`nav__links ${open ? "is-open" : ""}`}>
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
