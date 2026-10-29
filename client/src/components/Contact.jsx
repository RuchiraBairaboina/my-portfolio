import { useState } from "react";
import SectionTitle from "./SectionTitle.jsx";

const EMPTY = { name: "", email: "", message: "" };

export default function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const [copied, setCopied] = useState(false);

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", msg: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 422) {
        setErrors(data.errors || {});
        setStatus({ state: "idle", msg: "" });
        return;
      }
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setForm(EMPTY);
      setStatus({ state: "sent", msg: data.message });
    } catch (err) {
      setStatus({ state: "error", msg: `Something went wrong (${err.message}). Please email me directly.` });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <section id="contact" className="section">
      <SectionTitle index="07" title="Contact" subtitle="Hiring for QA / SDET? Let's talk." />
      <div className="contact">
        <div className="card card--pink contact__info">
          <h3>Let's build something <span className="neon-pink">bug-free</span>.</h3>
          <p className="muted">
            I'm open to QA Engineer, SDET and Test Automation roles. Send a message and I'll get back to you soon.
          </p>
          <button className="contact__item" onClick={copyEmail}>
            <span>✉️</span>
            <span className="mono">{profile.email}</span>
            <span className="contact__copy">{copied ? "copied!" : "copy"}</span>
          </button>
          <a className="contact__item" href={profile.linkedin} target="_blank" rel="noreferrer">
            <span>💼</span><span className="mono">LinkedIn</span><span className="contact__copy">open ↗</span>
          </a>
          <div className="contact__item contact__item--static">
            <span>📍</span><span className="mono">{profile.location}</span>
          </div>
        </div>

        <form className="card card--cyan contact__form" onSubmit={submit} noValidate>
          {[
            ["name", "Name", "text"],
            ["email", "Email", "email"],
          ].map(([key, label, type]) => (
            <label key={key} className="field">
              <span className="mono">{label}</span>
              <input name={key} type={type} value={form[key]} onChange={update} className={errors[key] ? "invalid" : ""} />
              {errors[key] && <small className="neon-pink">{errors[key]}</small>}
            </label>
          ))}
          <label className="field">
            <span className="mono">Message</span>
            <textarea name="message" rows="5" value={form.message} onChange={update} className={errors.message ? "invalid" : ""} />
            {errors.message && <small className="neon-pink">{errors.message}</small>}
          </label>
          <button className="btn btn--cyan" disabled={status.state === "sending"}>
            {status.state === "sending" ? "Sending…" : "Send Message ➤"}
          </button>
          {status.state === "sent" && <p className="neon-green mono">✔ {status.msg}</p>}
          {status.state === "error" && <p className="neon-pink mono">✖ {status.msg}</p>}
        </form>
      </div>
    </section>
  );
}
