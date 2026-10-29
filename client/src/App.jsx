import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import TestRunner from "./components/TestRunner.jsx";
import Skills from "./components/Skills.jsx";
import Terminal from "./components/Terminal.jsx";
import Contact from "./components/Contact.jsx";
import CursorGlow from "./components/CursorGlow.jsx";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="boot-screen">
        <p className="neon-pink">✖ Could not reach the API ({error}).</p>
        <p className="muted">Make sure the Node.js server is running: <code>npm run dev</code> from the project root.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="boot-screen">
        <div className="loader" />
        <p className="mono neon-green">booting portfolio<span className="blink">_</span></p>
      </div>
    );
  }

  return (
    <>
      <CursorGlow />
      <div className="grid-bg" aria-hidden="true" />
      <Navbar name={data.profile.name} />
      <main>
        <Hero profile={data.profile} />
        <Stats stats={data.stats} />
        <About highlights={data.highlights} education={data.education} certifications={data.certifications} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} />
        <TestRunner />
        <Skills skills={data.skills} />
        <Terminal data={data} />
        <Contact profile={data.profile} />
      </main>
      <footer className="footer">
        <p>
          Built with <span className="neon-cyan">React</span> + <span className="neon-green">Node.js</span> by{" "}
          {data.profile.name} · © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
