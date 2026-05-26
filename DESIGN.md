# JARVIS Portfolio — Design System
# Saachi Surana // CS @ University of Washington

---

## Visual Personality

**In three words:** Cinematic. Technical. Alive.

**Adjectives:** sci-fi HUD, Iron Man interface, military-grade, operator terminal, deep space control room
**Anti-examples:** startup SaaS, Tailwind template, glassmorphism blur cards, purple gradient hero, rounded pill buttons, emoji bullets, "innovative solutions for modern businesses" copy, generic dark mode dashboard, shadcn components, centered hero with subtitle + CTA, three-column feature grid

**Reference feel:** The JARVIS UI from Iron Man 3 — but sharper, denser, and running on real data. Every element looks like it *does* something. Nothing is decorative for its own sake. The interface feels like it's actively processing.

**One rule above all:** If it could appear on a generic SaaS landing page, it doesn't belong here.

---

## Text Hierarchy (official — applied everywhere)

| Role | Color | Font | Size | Usage |
|------|-------|------|------|-------|
| PRIMARY | `#ffffff` | Rajdhani 600 | ≥0.88rem | Names, values, titles, headings |
| SECONDARY | `#00e5ff` | Space Mono | any | Active labels, company names, status |
| LABEL | `#00b8cc` | Space Mono 0.65rem | 0.65rem | Section headers, data row labels |
| BODY | `#e2e8f0` | Rajdhani 400 | 0.9–0.95rem / lh 1.6 | Bios, descriptions, chat responses |
| MUTED | `#64748b` | Space Mono | any | Dates, coordinates, metadata |

**Rules:**
- NEVER use purple or cyan for readable body text
- NEVER use `#94a3b8` or `#475569` for readable descriptions — use `#e2e8f0`
- Nothing readable below 0.85rem
- Add `text-shadow: 0 0 8px rgba(255,255,255,0.08)` to white PRIMARY text in key panels

---

## Color Palette

```css
/* Backgrounds */
--color-bg:           #000000;   /* true black — not #0a0a0a, not #111 */
--color-bg-panel:     #070d0d;   /* panel surfaces */
--color-bg-overlay:   #020808;   /* modal/overlay backgrounds */

/* Primary — Cyan (system active state) */
--color-cyan:         #00e5ff;
--color-cyan-dim:     #00b8cc;
--color-cyan-ghost:   rgba(0, 229, 255, 0.08);
--color-cyan-border:  rgba(0, 229, 255, 0.25);
--color-cyan-glow:    rgba(0, 229, 255, 0.35);

/* Secondary — Purple (accent, AI responses) */
--color-purple:       #c084fc;
--color-purple-dim:   #9b5fd4;
--color-purple-ghost: rgba(192, 132, 252, 0.08);
--color-purple-glow:  rgba(192, 132, 252, 0.3);

/* Text */
--color-text-primary:   #ffffff;    /* names, values, headings */
--color-text-body:      #e2e8f0;    /* bios, descriptions, chat responses */
--color-text-secondary: #94a3b8;    /* intermediate labels */
--color-text-muted:     #64748b;    /* dates, coords, metadata */
--color-text-cyan:      #00e5ff;    /* active labels, section IDs */
--color-text-purple:    #c084fc;    /* accent only — NOT for readable text */

/* Status */
--color-online:  #00e5ff;
--color-warning: #f59e0b;
--color-error:   #ef4444;
--color-offline: #475569;

/* DO NOT USE */
/* No white backgrounds. No gray backgrounds. No blue (#3b82f6). */
/* No gradients except radial glows behind centerpiece elements. */
```

---

## Typography

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

--font-display:  'Orbitron', monospace;      /* hero title: J.A.R.V.I.S */
--font-ui:       'Rajdhani', sans-serif;     /* panel headers, labels, body */
--font-mono:     'Space Mono', monospace;    /* data readouts, terminal, coords */

/* Scale */
--text-hero:    clamp(3rem, 8vw, 7rem);
--text-section: clamp(0.6rem, 1vw, 0.75rem);
--text-panel:   1.1rem;
--text-data:    0.8rem;
--text-micro:   0.65rem;

/* Rules */
/* ALL section/panel labels: uppercase, letter-spacing 0.2em or wider */
/* Section markers: "// SECTION_NAME" or "01 — LABEL" */
/* Numbers and data: always Space Mono */
/* Never font-weight 700 on Rajdhani body — use 500 or 600 */
/* No text-transform: capitalize — only uppercase or as-written */
```

---

## Spacing & Shape

```css
--space-1:  4px;   --space-2:  8px;   --space-3:  12px;
--space-4:  16px;  --space-6:  24px;  --space-8:  32px;
--space-12: 48px;  --space-16: 64px;

/* Border radius */
--radius-none: 0px;   /* ALL panels, cards, inputs, buttons */
--radius-sm:   2px;   /* only tiny badges */
/* NEVER use border-radius above 2px on rectangles */
/* No rounded-lg, no rounded-full on anything that isn't a circle */

/* Borders */
--border-panel:  1px solid rgba(0, 229, 255, 0.25);
--border-active: 1px solid #00e5ff;
--border-dim:    1px solid rgba(255,255,255,0.06);

/* Glow — for glow only, never for elevation */
--glow-cyan:   0 0 12px rgba(0,229,255,0.35), 0 0 40px rgba(0,229,255,0.1);
--glow-purple: 0 0 12px rgba(192,132,252,0.3), 0 0 40px rgba(192,132,252,0.1);
```

---

## Layout Rules

Three-column HUD dashboard. Fixed viewport height — no page scroll.

```
LEFT SIDEBAR (280px) | CENTER (flex-1) | RIGHT SIDEBAR (300px)
```

Panel structure — every panel uses this pattern:
```css
.panel {
  background: #070d0d;
  border: 1px solid rgba(0,229,255,0.25);
  box-shadow: inset 0 0 8px rgba(0,229,255,0.05);
  padding: 16px;
  position: relative;
}
/* Corner accent — mandatory on featured panels */
.panel::before {
  content: '';
  position: absolute;
  top: -1px; left: -1px;
  width: 12px; height: 12px;
  border-top: 2px solid #00e5ff;
  border-left: 2px solid #00e5ff;
}
```

Section labels always: `// LABEL_NAME` — Space Mono, 0.65rem, uppercase, cyan-dim

**DO NOT use:**
- Centered layouts for main content
- Full-width hero with headline + subtitle + CTA
- Equal-size card grids
- Horizontal nav bars that look like a website header

---

## Component Style Cues

### Panels
- Flat `#050a0a` surface, 1px cyan border at 18% opacity
- Corner bracket `::before`/`::after` accents on key panels
- Hover: border → full `#00e5ff`, background → `rgba(0,229,255,0.08)`

### Buttons
- Sharp rectangles, 0px border-radius
- Primary: `border: 1px solid #00e5ff`, transparent bg, cyan text
- Hover: bg → `rgba(0,229,255,0.08)`, glow activates
- Labels: uppercase, Rajdhani 600, letter-spacing 0.15em
- NO gradient buttons. NO pill buttons. NO shadow buttons.

### Terminal / Chat Input
- Background `#000`, 1px cyan border
- Prefix: `> ` in cyan, blinking cursor
- Font: Space Mono 0.85rem
- Enter to submit — no send button

### Circular Gauges
- SVG `stroke-dasharray` — not CSS border tricks
- Cyan primary, purple secondary
- Numeric readout in Space Mono at center
- Tick marks on outer ring, fill from 0 on load over 1.2s

### Data Rows
- Label: left, Space Mono 0.65rem, muted, uppercase
- Value: right, Rajdhani 600, white or cyan
- Flex row `justify-content: space-between`
- NO `<table>`, NO divider lines between rows

---

## Animations

**Principles:**
- Every animation feels *functional*, not decorative
- Nothing bounces. Nothing elastics. Nothing playful.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for reveals, linear for rotation
- Duration: reveals 0.6–0.8s, micro-interactions 0.15–0.25s

**Required:**
1. Arc reactor: continuous multi-ring rotation, Three.js, bloom postprocessing, particles
2. Panel boot sequence: staggered fade+slide on load (left → center → right)
3. Scan line: subtle 1px cyan line sweeping top→bottom on 8s loop (opacity 0.04)
4. Scanline texture: CSS repeating-linear-gradient overlay across full page
5. Typewriter: JARVIS responses type out character by character
6. Gauge fill: 0 → value on page load
7. Waveform: continuous idle sine animation

**DO NOT use:**
- Scroll-triggered reveals (this is a dashboard, not a landing page)
- Parallax scrolling
- Bounce/spring easing
- Page transitions that slide entire views

---

## Copy & Voice

**JARVIS speaks first.** On load, JARVIS initializes with a greeting. No hero headline.

**Format:**
```
J.A.R.V.I.S
"Good evening. You've accessed the portfolio interface of Saachi Surana..."
```

**Labels:** OPERATOR, STATUS, ACTIVE_PROJECTS, LAST_COMMIT, UPTIME, NEURAL_LINK
**Never:** "About Me", "My Projects", "Get In Touch", "Welcome to my portfolio"
**Saachi's role:** `STUDENT // DEVELOPER`
**GitHub:** `saachisurana`

---

## Projects Reference (for JARVIS chat responses)

### 01 — JARVIS
Iron Man-style voice AI assistant running locally on macOS. Wake word activation, ElevenLabs TTS (with Piper + macOS fallback), connects to Google Calendar, Notion tasks, Spotify, Canvas LMS, and StudySync. Built in Python, exposed as an MCP server so Claude Desktop can call its skills directly. HUD rendered in a local browser window.
**Stack:** Python, Flask, Ollama (Llama 3.2), ElevenLabs, MCP
**GitHub:** https://github.com/saachi-surana/Jarvis

### 02 — STUDYSYNC
Local AI study assistant — no API keys, no cloud, no cost. Upload lecture audio/video → Whisper transcribes locally → Llama 3.2 generates structured notes, cheatsheets cross-referenced with past exam PDFs, and practice quizzes with personalized feedback. Fully Dockerized.
**Stack:** FastAPI, Python, Whisper, Ollama + Llama 3.2, ChromaDB, React + Vite, Docker
**GitHub:** https://github.com/saachi-surana/studysync

### 03 — NOTION-PLANNER
Mac menu bar app unifying Google Calendar, Notion tasks (SQLite + sync), Canvas LMS assignments, and Spotify — all in one compact floating panel. Tabs: Cal, Tasks, Canvas, Music. Electron app with a React renderer.
**Stack:** Electron, React, Node.js, SQLite, Notion API, Google Calendar API, Spotify API, Canvas LMS API
**GitHub:** https://github.com/saachi-surana/notion-planner

### 04 — QUERY
Live Q&A platform built for DubHacks. Real-time AI clustering groups audience questions into topics as they come in. Supports polls, word clouds, QR join codes, custom host branding, moderation, post-session reports, and PDF export. 26/26 Playwright E2E tests passing. Deployed on Vercel.
**Stack:** Next.js 14, TypeScript, Supabase (Postgres + Realtime), Gemini 2.0 Flash (+ Anthropic fallback), Tailwind
**GitHub:** https://github.com/saachi-surana/query
**Live:** https://query-dubhacks-next.vercel.app

### 05 — SNIP
Production-grade URL shortener with click analytics. Redis-cached redirects (1h TTL), async click logging (IP, country, referrer), QR code generation, JWT + API key auth, per-IP rate limiting (token bucket), OG preview scraping.
**Stack:** Go (Chi router), PostgreSQL, Redis, React + Vite, Docker
**GitHub:** https://github.com/saachi-surana/snip

### 06 — TRAFFICOP
HTTP load balancer in pure Go. Round-robin routing via lock-free atomic counter, per-backend circuit breakers (Closed/Open/HalfOpen), active health checking, automatic failover with retry, per-IP rate limiting, Prometheus metrics, Grafana dashboard (pre-provisioned), live admin API.
**Stack:** Go, Prometheus, Grafana, Docker
**GitHub:** https://github.com/saachi-surana/trafficop

### 07 — STELLAR CLASSIFICATION
[No README yet — placeholder: ML model for classifying stellar objects]
**GitHub:** https://github.com/saachi-surana/stellar-classification

### 08 — FLEXNET
[No README yet — placeholder]
**GitHub:** https://github.com/saachi-surana/flexnet

---

## What This Site Is NOT

- Not a landing page or a resume in disguise
- Not a three-column feature grid with a hero and footer CTA
- Not something with a single emoji anywhere in the UI
- Not something that could be mistaken for a Vercel/Tailwind template
- Not something where you can tell Claude built it in 20 minutes

---

## Changelog
- 2026-05-25: Initial design system, full project roster added
