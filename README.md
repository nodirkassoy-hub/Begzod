# BALANS AI — Interactive Product Presentation

**AI-POWERED BUSINESS OPERATING SYSTEM**
*BUTUN BIZNESINGIZ — BITTA PLATFORMADA.*

A premium, interactive, executive-level product presentation for the BALANS AI
business operating system: accounting, sales, CRM, warehouse, purchasing,
manufacturing, HR, documents, analytics and AI CFO on one connected platform.

Built as a **23-slide presentation experience** (16:9 desktop, vertical mobile),
with a live product tour, role-based dashboards, an AI CFO chat demo, an
interactive demo section and a neutral competitive landscape.

---

## Run

```bash
npm start           # http://localhost:4173
PORT=8080 npm start # custom port
```

No build step, no framework, no runtime dependencies. Plain ES modules + CSS,
served by a zero-dependency Node static server (`server.cjs`).

---

## What's inside

| # | Slide | Answers |
|---|-------|---------|
| 01 | Hero | What is BALANS AI? |
| 02 | The Problem | Why is data fragmented a problem? |
| 03 | The Solution | One digital centre |
| 04 | How it works | Connected sales & manufacturing chains |
| 05 | Ecosystem | 16 modules |
| 06 | Role-based experience | Who sees what |
| 07 | AI CFO | Ask your numbers in plain language |
| 08 | Business command centre | One screen for the CEO |
| 09 | Manufacturing | Raw material → margin |
| 10 | AI + manufacturing | Business context, not just reports |
| 11 | Competitive landscape | Neutral, factual positioning |
| 12 | Differentiators | The five pillars |
| 13 | Security & control | Permissions, audit, 2FA-ready |
| 14 | Documents & approvals | Create → review → approve → audit |
| 15 | Analytics | Numbers become decisions |
| 16 | Business value | Visibility / control / insight / scale |
| 17 | Who is it for | Industries & roles |
| 18 | One day of business | Cinematic timeline |
| 19 | Business model | Pricing, trial, subscription states |
| 20 | Roadmap | Available / in development / planned |
| 21 | Investor & partner view | Multi-tenant SaaS architecture |
| 22 | Final | Closing CTA |
| 23 | Interactive demo | Switch roles, ask AI CFO |

### Navigation

* **Desktop** — arrow keys / space, `Home` / `End`, number keys `1`–`9`,
  `F` fullscreen, `G` slide overview, `D` / `L` theme toggle.
* **Touch** — swipe left/right; on-screen prev/next; side rail with tooltips.
* **Any size** — progress bar, slide counter, section pills, slide-name readout.
* Deep links: `#7` opens slide 7, `#start` skips the intro.

### Languages

Uzbek Latin (primary), Russian, English — switchable in the top bar.
All copy lives in `src/js/i18n/{uz,en,ru}.js`; missing keys fall back to the
primary locale so a slide can never break.

### Themes

Dark (default) and light, persisted to `localStorage`, initialised from
`prefers-color-scheme`.

---

## Architecture

```
index.html                 app shell + boot screen
server.cjs                 zero-dependency static server
assets/
  fonts/                   local Inter + Manrope variable fonts (no CDN)
  favicon.svg
src/css/
  tokens.css               design tokens (colour, type, space, motion, themes)
  base.css                 shell, deck engine chrome, intro, overview
  components.css           liquid-glass primitives (cards, KPIs, chat, flow…)
  slides.css               per-slide layouts + responsive rebuilds
src/js/
  main.js                  entry: theme/lang boot, intro, deck wiring
  engine.js                presentation engine (nav, keyboard, swipe, overview)
  icons.js                 single-weight SVG icon family
  i18n/                    locale runtime + uz / en / ru dictionaries
  data/demo.js             sample data for every mock (labelled DEMO)
  components/
    ui.js                  hyperscript + shared visual components
    chart.js               zero-dependency SVG chart engine
    dashboard.js           role dashboards + permission cards
    aicfo.js               AI CFO chat component (permission-aware)
  slides/                  one module per slide + registry
tools/
  smoke.mjs                headless walk of all 23 slides (jsdom)
  audit.mjs                static audit: i18n keys + CSS classes
```

### Layout system

Each slide is a **CSS container** (`container-type: inline-size`), so layouts
rebuild for narrow viewports instead of being shrunk: grids collapse, the radial
diagram rescales, cards stack, and the deck becomes a vertical swipeable
experience under 900px.

### Charts

Hand-written SVG (area, column, donut, ranking bars, cash-flow forecast,
sparkline) with CSS-driven draw animations. No chart library, no canvas,
`viewBox`-scaled and `prefers-reduced-motion` aware.

---

## Trust & positioning rules

The presentation deliberately avoids unsupported claims. Concretely:

* Competitors are described **factually and neutrally** (public capability
  categories only) — no insults, no "10x better", no "#1", no "the only".
* BALANS AI differentiation is stated as *product philosophy*
  ("the BALANS AI product concept is built around this combination"), never as
  a competitor deficiency.
* Every number on screen is sample data and is labelled **DEMO DATA**.
* Roadmap phases are labelled **AVAILABLE / IN DEVELOPMENT / PLANNED**.
* Payment integrations are explicitly noted as "go live once implemented".
* No fake certifications, logos, testimonials, statistics or savings guarantees.
* The AI CFO demo shows the permission-denied and insufficient-data replies
  alongside FACT / ESTIMATE / RECOMMENDATION labelling.

---

## Development

```bash
node tools/audit.mjs     # i18n keys + CSS class coverage
node tools/smoke.mjs     # headless render/nav/interaction test (needs the server)
```
