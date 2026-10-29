import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";

const PROMPT = "guest@ruchira:~$";

function buildCommands(data) {
  const { profile, experience, projects, skills, education, certifications } = data;
  return {
    help: () => [
      "Available commands:",
      "  about        who I am",
      "  experience   where I've worked",
      "  projects     things I've built",
      "  skills       my toolbox",
      "  education    degrees & certifications",
      "  contact      how to reach me",
      "  goto <id>    jump to a section (about, projects, skills, contact…)",
      "  clear        clear the screen",
    ],
    about: () => [profile.name, profile.roles.join(" · "), "", profile.tagline],
    experience: () =>
      experience.flatMap((e) => [`▸ ${e.role} @ ${e.company}`, `  ${e.period} · ${e.location}`]),
    projects: () => projects.flatMap((p) => [`▸ ${p.title} (${p.date})`, `  ${p.tech.join(", ")}`]),
    skills: () => Object.entries(skills).map(([cat, list]) => `${cat.padEnd(16)} ${list.map((s) => s.name).join(", ")}`),
    education: () => [
      ...education.map((e) => `🎓 ${e.degree} — ${e.school} (${e.period})`),
      ...certifications.map((c) => `🎖  ${c.name} — ${c.issuer} (${c.date})`),
    ],
    contact: () => [`email:    ${profile.email}`, `linkedin: ${profile.linkedin}`, `location: ${profile.location}`],
    whoami: () => ["guest — but you could be my next teammate 😉"],
    sudo: () => ["Permission denied: nice try. All access requests go through QA. 🔒"],
    ls: () => ["about  experience  projects  skills  education  contact"],
  };
}

export default function Terminal({ data }) {
  const commands = useRef(buildCommands(data)).current;
  const [lines, setLines] = useState([
    { type: "out", text: `Welcome to ${data.profile.name}'s interactive terminal.` },
    { type: "out", text: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim();
    const [name, arg] = cmd.split(/\s+/);
    const next = [...lines, { type: "in", text: cmd }];
    if (!cmd) return setLines(next);
    if (name === "clear") return setLines([]);
    if (name === "goto") {
      const el = document.getElementById(arg || "");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return setLines([...next, { type: "out", text: `→ jumping to #${arg}` }]);
      }
      return setLines([...next, { type: "err", text: `goto: section '${arg ?? ""}' not found` }]);
    }
    const fn = commands[name.toLowerCase()];
    const out = fn
      ? fn().map((t) => ({ type: "out", text: t }))
      : [{ type: "err", text: `command not found: ${name}. Type 'help'.` }];
    setLines([...next, ...out]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [input, ...h]);
      setInput("");
      setHIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      if (history[i] !== undefined) { setHIndex(i); setInput(history[i]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = [...Object.keys(commands), "clear", "goto"].find((c) => c.startsWith(input));
      if (match && input) setInput(match);
    }
  };

  return (
    <section id="terminal" className="section">
      <SectionTitle index="06" title="Terminal" subtitle="Prefer the command line? Explore my résumé here" />
      <div className="term card card--green" onClick={() => inputRef.current?.focus()}>
        <div className="lab__console-head">
          <span className="dot dot--red" /><span className="dot dot--yellow" /><span className="dot dot--green" />
          <span className="muted mono">bash — ruchira@portfolio</span>
        </div>
        <div className="term__body mono" ref={bodyRef}>
          {lines.map((l, i) => (
            <div key={i} className={`term__line term__line--${l.type}`}>
              {l.type === "in" && <span className="neon-green">{PROMPT} </span>}
              {l.text}
            </div>
          ))}
          <div className="term__input-row">
            <span className="neon-green">{PROMPT}&nbsp;</span>
            <input
              ref={inputRef}
              className="term__input mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal input"
              spellCheck="false"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="term__hints">
          {["help", "about", "projects", "skills", "contact"].map((c) => (
            <button key={c} className="chip chip--green" onClick={(e) => { e.stopPropagation(); run(c); }}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
