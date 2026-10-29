# ⚡ Ruchira Bairaboina — Interactive Portfolio

A full-stack, black & neon portfolio built with **React (Vite)** on the frontend and **Node.js / Express** on the backend.

## ✨ Interactive features

| Feature | What it does |
|---|---|
| **Typewriter hero + glitch name** | Cycles through roles with a typing animation |
| **Animated stats** | Numbers count up when scrolled into view |
| **Experience tabs** | Click a company to see that role's details |
| **Project cards** | Filter by category, live search by tech, 3D tilt on hover, click to open a detail modal |
| **🧪 Live Test Lab** | Visitors run a test suite; the Node.js API executes it and results stream back. Toggle *chaos mode* to inject a failing test |
| **Skills tabs** | Animated neon progress bars per category |
| **💻 Terminal** | Type commands (`help`, `about`, `projects`, `skills`, `goto contact`…) with history (↑/↓) and Tab autocomplete |
| **Contact form** | Validated on the server (returns 422 on bad input) and saved to `server/data/messages.json` |
| Extras | Scroll-spy navbar, mobile menu, cursor glow, reduced-motion support |

## 📁 Project structure

```
ruchira-portfolio/
├── package.json            # root scripts (runs both apps together)
├── server/                 # Node.js + Express API
│   ├── index.js            # routes: /api/portfolio, /api/projects, /api/run-tests, /api/contact
│   ├── data/portfolio.js   # ← ALL résumé content lives here
│   └── tests/api.test.js   # API tests (node:test)
└── client/                 # React + Vite frontend
    ├── index.html
    └── src/
        ├── App.jsx
        ├── hooks.js        # typewriter, count-up, in-view, scroll-spy hooks
        ├── styles.css      # black + neon theme
        └── components/     # Hero, Stats, About, Experience, Projects, TestRunner, Skills, Terminal, Contact…
```

## 🚀 Run it locally

Requires **Node.js 18+** (check with `node -v`).

```bash
cd ruchira-portfolio
npm run install-all     # installs root, server and client dependencies
npm run dev             # starts API on :5000 and React on :5173
```

Open **http://localhost:5173**.

## 🏗️ Production build

```bash
npm run build           # builds React into client/dist
npm start               # Express serves the API + built site on http://localhost:5000
```

## ✅ Run the API tests

```bash
npm test
```

## 🌐 Deploy (free options)

Because Express serves the built React app, you can deploy the whole thing as **one Node.js web service** on Render, Railway, or Fly.io:

- **Build command:** `npm run install-all && npm run build`
- **Start command:** `npm start`

## ✏️ Customize

- **Content:** edit `server/data/portfolio.js` — every section on the site reads from it.
- **LinkedIn / GitHub:** replace the placeholder URLs in `profile` inside that file.
- **Colors:** change the `--green`, `--cyan`, `--pink`, `--purple` variables at the top of `client/src/styles.css`.

## 🛠️ API reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/portfolio` | Full portfolio data |
| GET | `/api/projects?category=API` | Projects, optionally filtered |
| GET | `/api/projects/:id` | One project (404 if unknown) |
| GET | `/api/suites` | Test suites available in the Test Lab |
| POST | `/api/run-tests` | `{ suite, chaos }` → simulated test results |
| POST | `/api/contact` | `{ name, email, message }` → 201, or 422 with field errors |
