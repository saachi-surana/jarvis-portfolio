# JARVIS Portfolio — Claude Code Starter Prompt
# Paste this entire file as your first message in Claude Code.
# Read DESIGN.md before writing a single line of code.
# ---------------------------------------------------------------

## Project

Build a personal portfolio for Saachi Surana as a live JARVIS HUD interface.
This is NOT a website that presents a portfolio. This IS an operating interface
that happens to contain portfolio information. The visitor is accessing the JARVIS
system. Saachi is the operator. The interface already knows who she is.

CS Student @ University of Washington. GitHub: saachisurana.

---

## Stack

- Next.js 14 with App Router
- Tailwind CSS (extend theme to match DESIGN.md tokens exactly)
- Framer Motion for panel animations and micro-interactions
- Three.js + @react-three/fiber + @react-three/drei for the arc reactor
- @react-three/postprocessing for bloom + chromatic aberration
- Space Mono, Rajdhani, Orbitron from Google Fonts
- NO Anthropic SDK. NO external AI API. See JARVIS Chat section below.

---

## Layout

Three-column HUD dashboard. Fixed viewport height — no page scrolling.
Panels scroll internally if content overflows.

```
┌───────────────────────────────────────────────────────────────────────┐
│  TOP BAR: [live clock]          J.A.R.V.I.S         [v7.3.1 // AUTO] │
├──────────────────┬─────────────────────────────┬──────────────────────┤
│  LEFT SIDEBAR    │       CENTER PANEL           │   RIGHT SIDEBAR      │
│  280px fixed     │       flex-1                 │   300px fixed        │
│                  │                              │                      │
│  // CLOCK        │   [3D ARC REACTOR]           │  // OPERATOR_ID      │
│  // DIAGNOSTICS  │                              │  // ACTIVE_PROJECTS  │
│  // VOICE        │   [JARVIS CHAT BELOW]        │  // SKILLS           │
│  // ATMOSPHERIC  │                              │  // VITALS           │
│  // LOCATION     │                              │  // NETWORK          │
│  // OPERATOR     │                              │                      │
├──────────────────┴─────────────────────────────┴──────────────────────┤
│  BOTTOM BAR: [● SYSTEM ONLINE]   [UPTIME: live]   [LAST COMMIT: date] │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Centerpiece — Arc Reactor (Three.js)

This is the most important element. Do not rush it.

**Rings (minimum 8 distinct rings):**
- Each: different radius, rotation speed, rotation axis
- Alternate cyan/purple tint with emissive materials
- Outer rings rotate slowly, inner rings faster
- Some tilted on X or Z axis for 3D depth
- Rings should feel like they're processing, not just spinning

**Inner core:**
- Bright white/cyan sphere at center
- Heavy bloom — core blows out slightly
- Subtle volumetric light shaft (sprite or shader)

**Particle field:**
- 1000+ small particles at varying orbital distances
- Mix of fixed orbits and free drift
- Particles brighten near the core

**Post-processing:**
- Bloom: threshold 0.1, radius 0.8, intensity 1.5
- Chromatic aberration: offset 0.002
- Vignette: offset 0.5, darkness 0.6

**Interaction:**
- Mouse position subtly tilts the whole reactor (not click-to-spin — parallax feel)
- Hover over center: core flares, outer particles briefly accelerate

**Camera:** Perspective, slightly above center, static. Reactor rotates, camera doesn't.

---

## JARVIS Chat — No External API (Zero Cost)

Do NOT use the Anthropic SDK or any paid AI API.

Build a smart keyword-matching response system that feels like talking to JARVIS.
It must handle these commands/inputs and respond in-character:

```typescript
// responses.ts — build this as a structured response map

const responses = {
  // Greetings / generic
  greetings: ["hello", "hi", "hey", "good morning", "good evening"],
  greeting_response: `Online and fully operational. You've accessed the portfolio 
    interface of Saachi Surana — Computer Science, University of Washington, 
    Class of 2028. I can brief you on active projects, pull her GitHub, or 
    answer any questions about her work. How may I assist?`,

  // Projects — list
  project_list: ["projects", "what have you built", "show projects", "work"],
  project_list_response: `Eight active entries in the project registry:
    01 — JARVIS (you're looking at it)
    02 — STUDYSYNC
    03 — NOTION-PLANNER
    04 — QUERY
    05 — SNIP
    06 — TRAFFICOP
    07 — STELLAR CLASSIFICATION
    08 — FLEXNET
    Type the name of any project for a full briefing.`,

  // Individual projects
  jarvis: ["jarvis"],
  jarvis_response: `JARVIS — Iron Man-style voice AI assistant, running locally on macOS.
    Wake word activation. ElevenLabs TTS with Piper and macOS fallback chain.
    Connects to Google Calendar, Notion tasks, Spotify, Canvas LMS, and StudySync.
    Exposed as an MCP server — Claude Desktop can call its skills directly.
    Stack: Python, Flask, Ollama (Llama 3.2), ElevenLabs, MCP.
    [LINK: github.com/saachi-surana/Jarvis]`,

  studysync: ["studysync", "study sync"],
  studysync_response: `STUDYSYNC — Local AI study assistant. No API keys, no cloud, no cost.
    Upload a lecture recording → Whisper transcribes locally → Llama 3.2 generates 
    structured notes, cheatsheets cross-referenced against past exam PDFs, and 
    adaptive practice quizzes with personalized feedback. Fully Dockerized.
    Stack: FastAPI, Whisper, Ollama, ChromaDB, React, Docker.
    [LINK: github.com/saachi-surana/studysync]`,

  notion: ["notion", "notion-planner", "notion planner"],
  notion_response: `NOTION-PLANNER — Mac menu bar app unifying Google Calendar, Notion tasks,
    Canvas LMS assignments, and Spotify in one floating panel. Four tabs: Cal, Tasks,
    Canvas, Music. Tasks sync bidirectionally to Notion via SQLite.
    Stack: Electron, React, Node.js, SQLite, Google Calendar API, Notion API, Spotify API.
    [LINK: github.com/saachi-surana/notion-planner]`,

  query: ["query", "dubhacks", "q&a"],
  query_response: `QUERY — Live Q&A platform built for DubHacks. Real-time AI clustering 
    groups audience questions into topics as they arrive. Supports polls, word clouds, 
    QR join codes, custom host branding, moderation, and post-session PDF reports.
    26/26 Playwright E2E tests passing. Deployed on Vercel.
    Stack: Next.js 14, TypeScript, Supabase (Postgres + Realtime), Gemini 2.0 Flash.
    [LINK: query-dubhacks-next.vercel.app]`,

  snip: ["snip", "url shortener"],
  snip_response: `SNIP — Production-grade URL shortener with click analytics.
    Redis-cached redirects (1h TTL), async click logging (IP, country, referrer),
    QR code generation, JWT + API key auth, per-IP token-bucket rate limiting,
    OG preview scraping. Redirect latency is never blocked by analytics writes.
    Stack: Go (Chi), PostgreSQL, Redis, React + Vite, Docker.
    [LINK: github.com/saachi-surana/snip]`,

  trafficop: ["trafficop", "traffic", "load balancer"],
  trafficop_response: `TRAFFICOP — HTTP load balancer in pure Go.
    Lock-free atomic round-robin routing, per-backend circuit breakers 
    (Closed → Open → HalfOpen), active TCP health checking, automatic failover,
    per-IP rate limiting, Prometheus metrics, pre-provisioned Grafana dashboard,
    live admin API for runtime backend management.
    Stack: Go, Prometheus, Grafana, Docker.
    [LINK: github.com/saachi-surana/trafficop]`,

  stellar: ["stellar", "star", "classification", "ml"],
  stellar_response: `STELLAR CLASSIFICATION — Machine learning model for classifying
    stellar objects. Documentation incoming.
    [LINK: github.com/saachi-surana/stellar-classification]`,

  flexnet: ["flexnet", "flex"],
  flexnet_response: `FLEXNET — Currently classified. Documentation incoming.
    [LINK: github.com/saachi-surana/flexnet]`,

  // GitHub
  github: ["github", "open github", "source code", "code"],
  github_response: `Initiating external link... GitHub portal now open.
    [LINK: github.com/saachi-surana]`,

  // Skills
  skills: ["skills", "tech stack", "languages", "what do you know"],
  skills_response: `Operator skill matrix:
    PRIMARY: Python, JavaScript/TypeScript, Go
    FRAMEWORKS: React, Next.js, FastAPI, Electron
    AI/ML: Ollama, Whisper, ChromaDB, LLM integration, MCP
    SYSTEMS: Docker, PostgreSQL, Redis, Prometheus, Supabase
    OTHER: Framer Motion, Three.js, Canvas API`,

  // About / who is Saachi
  about: ["who is saachi", "about", "tell me about", "who are you", "bio"],
  about_response: `OPERATOR PROFILE — Saachi Surana.
    CS student, University of Washington, Class of 2028.
    Based in Seattle, WA.
    Builds things that feel alive — AI assistants, dev tools, real-time systems.
    Current focus: local AI, systems programming, full-stack.
    GitHub: saachisurana`,

  // Contact
  contact: ["contact", "email", "reach", "hire", "linkedin"],
  contact_response: `Contact protocols available via GitHub: github.com/saachi-surana
    For direct inquiries, LinkedIn search: Saachi Surana (University of Washington).`,

  // Resume
  resume: ["resume", "cv"],
  resume_response: `Resume request logged. 
    Redirecting to GitHub for full project history: github.com/saachi-surana
    Direct resume available on request via LinkedIn.`,

  // Easter eggs
  ironman: ["iron man", "tony stark", "stark"],
  ironman_response: `"Jarvis, sometimes I want to punch you in your perfect teeth." 
    — Tony Stark, 2012. 
    I've been told I have excellent teeth.`,

  thanks: ["thank you", "thanks", "thx"],
  thanks_response: `My pleasure. Is there anything else I can assist with?`,

  // Fallback
  fallback: `I didn't quite catch that. Try: 'show projects', a project name, 
    'open github', 'skills', or 'about'.`,
}
```

**Matching logic:**
- Lowercase the input, strip punctuation
- Check if input contains any keyword from each category
- Return the matching response
- If nothing matches: return fallback
- All JARVIS responses type out character by character (typewriter effect, ~25ms/char)
- `[LINK: url]` tokens in responses should render as a clickable cyan link that opens in a new tab

**JARVIS personality in responses:**
- Dry, precise, efficient
- Never sycophantic ("Great question!")
- Never says "I cannot" — redirects with character
- No emojis. Ever.

---

## Panels — Build One at a Time, Confirm Before Next

### TOP BAR
- Left: live clock updating every second — Space Mono — `HH:MM:SS` then `DAY DD MON YYYY`
- Center: `J.A.R.V.I.S` in Orbitron, letter-spacing 0.3em, scan animation across it on load
- Right: `v7.3.1 // AUTONOMOUS` + `STARK INDUSTRIES` — Space Mono, right-aligned, muted

### LEFT SIDEBAR

**// SUIT DIAGNOSTICS**
- 4 circular SVG gauges: POWER (94%), GRID (NOMINAL — show as 87%), SHIELD (93%), COMMS (ONLINE — 100%)
- Cyan primary, purple secondary, fill from 0 on load over 1.2s

**// VOICE ANALYSIS**
- Canvas waveform — idle sine in cyan with glow. Label: VOICE ANALYSIS. Status: NOMINAL.

**// ATMOSPHERIC**
- Single gauge: barometric pressure 29.91 inHg, Space Mono readout

**// LOCATION**
- Data rows: CITY / SEATTLE, WA — WEATHER / RAIN — SEASON / SPRING 2026 — COORDS / 47.6062°N 122.3321°W

**// OPERATOR**
- INSTITUTION / UNIV OF WASHINGTON — MAJOR / COMPUTER SCIENCE — CLASS / 2028

### CENTER — JARVIS CHAT (below arc reactor)

Top 58% of center: arc reactor canvas
Bottom 42%: JARVIS terminal chat

Chat display:
- `J.A.R.V.I.S` label (cyan, Space Mono, small) before each JARVIS message
- `YOU` label (muted) before each user message
- Typewriter on every JARVIS response (~25ms per character)
- On load: JARVIS sends greeting automatically (typewriter, no user input)
- Chat scrolls internally, newest messages at bottom

Input:
- `> ` prefix in cyan, Space Mono, blinking block cursor
- No rounded corners, no send button, Enter to submit
- Input is always stuck to bottom of chat area

### RIGHT SIDEBAR

**// OPERATOR_ID**
- USER: SAACHI SURANA (Rajdhani 700, large)
- STATUS: STUDENT // DEVELOPER (cyan)
- GITHUB: saachisurana (clickable → https://github.com/saachi-surana, opens new tab)

**// ACTIVE_PROJECTS**
Numbered rows, all 8 projects:
```
01  JARVIS
02  STUDYSYNC
03  NOTION-PLANNER
04  QUERY
05  SNIP
06  TRAFFICOP
07  STELLAR CLASSIFICATION
08  FLEXNET
```
- Each row clickable: clicking opens an overlay panel with the project briefing
- Overlay slides in from right — sharp edges, cyan border, Space Mono header, Rajdhani body
- Overlay contains: project name, description, tech stack, GitHub link
- Clicking elsewhere or pressing ESC closes the overlay

**// SKILLS**
Horizontal bar gauges (not circles — differentiate from diagnostics):
- Python: 85%, TypeScript: 80%, Go: 70%, React/Next: 80%, AI/ML: 75%, Systems: 75%
- Cyan fill, animate from 0 on load, percentage shown in Space Mono at right

**// VITALS**
3 small circular gauges in purple: NEURAL (70%), CPU (12%), MEMORY (31%)

**// NETWORK**
- Header: GLOBAL UPLINK — SEATTLE
- PING: 24ms, BANDWIDTH: 783 Mb/s (static)
- Small animated radar: rotating sweep line in cyan, 2–3 blip dots

### BOTTOM BAR
- Left: `●` pulsing cyan dot + `SYSTEM ONLINE`
- Center: `UPTIME: [live counter HH:MM:SS since page load]`
- Right: `LAST COMMIT: 18 MIN AGO` + `JARVIS v7.3.1`

---

## Global Effects

**Scanline texture (CSS, full page):**
```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.03) 2px,
    rgba(0,0,0,0.03) 4px
  );
  pointer-events: none;
  z-index: 9999;
}
```

**Moving scan line:**
A single 1px line (rgba(0,229,255,0.04)) sweeps top to bottom on an 8s CSS animation loop.

**Boot sequence (page load — one time):**
1. Black screen
2. `J.A.R.V.I.S` fades in — Orbitron, centered, slight flicker on the letters
3. `INITIALIZING SYSTEMS...` appears below in Space Mono, types out
4. 1.2s: left sidebar panels fade+slide in staggered (0.08s between each)
5. 1.6s: center panel and arc reactor materialize
6. 2.0s: right sidebar panels appear
7. 2.4s: bottom bar appears
8. 2.8s: JARVIS chat overlay fades in, greeting begins typing
9. Boot overlay fades out

**Custom cursor:**
- 12px cyan crosshair replacing default cursor
- 24px outer ring follows with ~80ms lag (CSS or JS transform)
- Cursor ring shrinks on clickable elements

---

## Build Order — Confirm Each Step Before Moving On

1. Project scaffold: Next.js 14, Tailwind config with DESIGN.md tokens, Google Fonts, folder structure
2. Layout skeleton: three columns, top bar, bottom bar, correct proportions, no content
3. **Arc reactor** — spend as long as needed here. Do not move on until it looks extraordinary.
4. Boot sequence animation
5. Left sidebar (all panels)
6. Right sidebar (all panels + project overlay system)
7. JARVIS chat (keyword matching + typewriter, no AI API)
8. Custom cursor + scan line effects
9. Mobile graceful degradation: single column, arc reactor shrinks, panels stack
10. Lighthouse audit: target 85+ performance

---

## Quality Checklist — Verify Before Calling Anything Done

- [ ] No border-radius above 2px on any rectangle
- [ ] No Inter, Roboto, or system-ui font anywhere
- [ ] No centered hero layout
- [ ] No generic button labels (Learn More / Get Started / Click Here)
- [ ] No emojis anywhere in the UI
- [ ] No elevation box-shadows — glow only
- [ ] No Anthropic SDK or any paid API call
- [ ] Arc reactor has at least 8 rings with bloom post-processing
- [ ] All 8 projects listed and accessible via overlay
- [ ] JARVIS responds intelligently to at least 15 distinct input patterns
- [ ] Boot sequence runs once on load
- [ ] Custom cursor active
- [ ] Uptime counter ticking live
- [ ] GitHub link opens correctly
- [ ] Lighthouse 85+
