# JARVIS Portfolio — Persistent Context
# Saachi Surana // CS @ University of Washington
# Read this file at the start of every session before doing anything.

---
## Communication Style
If anything is unclear — design decisions, content, preferences, or 
anything about Saachi — ask before assuming. One question at a time.


## Project Overview

This is a personal portfolio for Saachi Surana built as a live JARVIS HUD interface.
It is NOT a website dressed up as JARVIS. It IS the JARVIS operating system.
Always read DESIGN.md before making any UI or styling decision.

## Stack
- Next.js 14 with App Router
- Tailwind CSS (tokens from DESIGN.md — never override with arbitrary values)
- Framer Motion (panel animations, boot sequence, micro-interactions)
- Three.js + @react-three/fiber + @react-three/drei (arc reactor)
- @react-three/postprocessing (bloom, chromatic aberration, vignette)
- Space Mono, Rajdhani, Orbitron (Google Fonts)
- Zustand (global state: reactor mode, project ping, section highlight, pending chat messages)
- NO Anthropic SDK. NO paid AI API. JARVIS chat = keyword matching only.

## Non-Negotiable Design Rules
- No border-radius above 2px on any rectangle, ever
- No Inter, Roboto, or system-ui fonts anywhere
- No emojis anywhere in the UI
- No elevation box-shadows — glow only
- No centered hero layout
- No generic button labels (Learn More, Get Started, Click Here)
- All section labels format: // LABEL_NAME in Space Mono uppercase
- Panels use corner bracket ::before/::after accents

---

## Build Order & Progress

Update the status of each step as you go: [ ] → [IN PROGRESS] → [DONE]

- [DONE] 1. Project scaffold — Next.js 14, Tailwind config, fonts, folder structure
- [DONE] 2. Layout skeleton — three columns, top bar, bottom bar, correct proportions
- [DONE] 3. Arc reactor — Three.js, 8+ rings, bloom, particles (do not rush this)
- [DONE] 4. Boot sequence — black screen → J.A.R.V.I.S → staggered panel load
- [DONE] 5. Left sidebar — clock, diagnostics, voice, atmospheric, location, operator
- [DONE] 6. Right sidebar — operator ID, projects (all 8 + overlay), skills, vitals, network
- [DONE] 7. JARVIS chat — keyword matching, typewriter effect, all response cases
- [DONE] 8. Global effects — custom cursor, scan line, scanline texture overlay
- [DONE] 9. Mobile — single column graceful degradation, arc reactor scales down
- [DONE] 10. Lighthouse audit — target 85+ performance

## Current Step
COMPLETE — all 10 steps done + attribution + enhancement session done

## Enhancement Session — DONE
- [DONE] PART 1 — Authorship clarity (boot sequence, greeting, bottom bar, operator ID)
- [DONE] PART 2 — Ring navigation: hover labels (// SECTION_NAME) + ring click sends JARVIS message + highlights right sidebar panel
- [DONE] PART 3 — Reactor modes via chat: "red alert" / "stealth" / "overdrive" / "reset" → ArcReactor smoothly transitions color/speed
- [DONE] PART 4 — Panel ping: JARVIS response mentioning a project flashes that row in ProjectsPanel
- [DONE] PART 5 — GlitchEffect: J.A.R.V.I.S title in TopBar does RGB channel split every 15–20s
- [DONE] PART 6 — Particle burst: clicking reactor core fires 100 particles outward + lerp back

## Content Update Session — DONE
- [DONE] SkillsPanel: updated to Python 90%, TS/JS 80%, React/Next 80%, ML/AI 85%, Java 70%, Data 75%
- [DONE] AboutPanel: new left sidebar panel with bio, degree/school/status/grad/email/LinkedIn data rows
- [DONE] ExperiencePanel: new right sidebar panel (below ProjectsPanel) with 5 expandable entries
- [DONE] lib/projects.ts: added BIN SENTINEL as project 09
- [DONE] responses.ts: updated skills, about, resume, contact; added experience/work command + BIN SENTINEL rule

## Polish Session — DONE
- [DONE] BarGauge: added showPercent prop; SkillsPanel now shows relative bars only, no numbers
- [DONE] SkillsPanel: 8 skills (Python/ML-AI/Java = strongest; React/TS/Data = strong; HTML/C++ = familiar)
- [DONE] OperatorOverlay: HUD slide-up panel over center panel with full contact info + bio
- [DONE] ArcReactor: "// OPERATOR" pulsing label below core — click opens OperatorOverlay
- [DONE] JarvisChat: "about"/"who is saachi" keywords trigger OperatorOverlay + brief typewriter response
- [DONE] store.ts: added showAbout / setShowAbout to Zustand store

## Key Architecture Notes (for future sessions)
- State management: Zustand store at lib/store.ts (reactorMode, pingProjectId, highlightSection, pendingMessage)
- Panel highlight system: Panel.tsx accepts sectionId prop → reads highlightSection from Zustand → pulses glow
- Ring→section map: outer 5 rings = right sidebar (projects, skills, vitals, network, operator-id), inner 5 = left sidebar
- Reactor mode keywords: "red alert"/"stealth"/"overdrive"/"reset" in chat → setReactorMode in store
- Ring click → queueMessage(RING_MESSAGES[sectionId]) → JarvisChat watches pendingMessage → types it out
- OperatorOverlay: slides up from bottom of CenterPanel; triggered by ArcReactor "// OPERATOR" button OR "about" keyword in chat; ESC/click-outside closes
- store.ts also has showAbout / setShowAbout for the overlay
- Projects: now 9 entries (01–09, BIN SENTINEL added)
- Right sidebar order: OperatorID → Projects → Experience → Skills → Vitals → Network
- Left sidebar order: Clock → Diagnostics → Voice → Atmospheric → Location → Operator → About
- Saachi: CS & Data Science @ UW, Dean's List, Class 2028, CoreWeave intern, UW BioRobotics researcher

(Update this line every time you finish a step so context can be restored if needed)

---

## If Context Is Lost Mid-Session

If you're resuming and unsure where things left off, do this:
1. Read this file (CLAUDE.md)
2. Read DESIGN.md
3. Run `find . -name "*.tsx" -o -name "*.ts" | head -30` to see what exists
4. Check "Current Step" above and continue from there

---

## Project File Structure (target)

```
jarvis-portfolio/
├── CLAUDE.md                  ← this file
├── DESIGN.md                  ← design system, read before any UI work
├── CLAUDE_CODE_PROMPT.md      ← original full prompt (reference only)
├── app/
│   ├── layout.tsx
│   ├── page.tsx               ← root — renders <JarvisHUD />
│   ├── globals.css            ← Tailwind, CSS variables from DESIGN.md, scanline
│   └── fonts.ts               ← Google Fonts config
├── components/
│   ├── layout/
│   │   ├── TopBar.tsx
│   │   ├── LeftSidebar.tsx
│   │   ├── CenterPanel.tsx
│   │   ├── RightSidebar.tsx
│   │   └── BottomBar.tsx
│   ├── panels/
│   │   ├── ClockPanel.tsx
│   │   ├── DiagnosticsPanel.tsx
│   │   ├── VoicePanel.tsx
│   │   ├── AtmosphericPanel.tsx
│   │   ├── LocationPanel.tsx
│   │   ├── OperatorPanel.tsx
│   │   ├── OperatorIDPanel.tsx
│   │   ├── ProjectsPanel.tsx
│   │   ├── ProjectOverlay.tsx
│   │   ├── SkillsPanel.tsx
│   │   ├── VitalsPanel.tsx
│   │   └── NetworkPanel.tsx
│   ├── reactor/
│   │   └── ArcReactor.tsx     ← Three.js component
│   ├── chat/
│   │   ├── JarvisChat.tsx
│   │   ├── ChatMessage.tsx
│   │   └── responses.ts       ← keyword matching + all response strings
│   ├── effects/
│   │   ├── BootSequence.tsx
│   │   ├── CustomCursor.tsx
│   │   └── ScanLine.tsx
│   └── ui/
│       ├── CircularGauge.tsx  ← reusable SVG gauge
│       ├── BarGauge.tsx       ← reusable horizontal bar gauge
│       ├── Waveform.tsx       ← canvas waveform
│       ├── Panel.tsx          ← base panel wrapper with corner accents
│       ├── DataRow.tsx        ← label/value flex row
│       └── RadarDisplay.tsx
├── lib/
│   └── jarvis-responses.ts   ← same as responses.ts, central response map
├── public/
└── tailwind.config.ts
```

---

## Session Breakdown (if you need to split across multiple sessions)

If Claude Code hits a context limit, use these as clean restart points.
Paste the relevant session prompt to resume.

### Session 1 — Foundation
"Read CLAUDE.md and DESIGN.md. 
Complete steps 1 and 2: project scaffold and layout skeleton.
Set up Next.js 14, Tailwind with DESIGN.md tokens, Google Fonts, 
and the three-column layout with top and bottom bars (no panel content yet).
Update CLAUDE.md build order when done."

### Session 2 — Arc Reactor (most important)
"Read CLAUDE.md and DESIGN.md.
Step 3: Build the arc reactor in /components/reactor/ArcReactor.tsx.
Requirements: Three.js via @react-three/fiber, minimum 8 rings at different 
speeds/axes/colors, bloom + chromatic aberration + vignette postprocessing, 
1000+ particle field, mouse parallax tilt, core flare on hover.
Do not move on to anything else. Make this extraordinary.
Update CLAUDE.md when done."

### Session 3 — Boot Sequence + Left Sidebar
"Read CLAUDE.md and DESIGN.md. Current step: 4 and 5.
Build the boot sequence (BootSequence.tsx) and all left sidebar panels:
ClockPanel, DiagnosticsPanel (4 SVG gauges), VoicePanel (canvas waveform),
AtmosphericPanel, LocationPanel, OperatorPanel.
Update CLAUDE.md when done."

### Session 4 — Right Sidebar
"Read CLAUDE.md and DESIGN.md. Current step: 6.
Build all right sidebar panels: OperatorIDPanel (with GitHub link),
ProjectsPanel (all 8 projects, clickable rows, slide-in overlay with 
full project details), SkillsPanel (horizontal bar gauges), 
VitalsPanel (3 purple circular gauges), NetworkPanel (animated radar).
Update CLAUDE.md when done."

### Session 5 — JARVIS Chat
"Read CLAUDE.md and DESIGN.md. Current step: 7.
Build the JARVIS chat system in /components/chat/.
Use the keyword matching response map from CLAUDE_CODE_PROMPT.md.
Requirements: typewriter effect at 25ms/char, auto-greeting on load,
[LINK: url] tokens render as clickable cyan links, terminal-style input 
with > prefix and blinking cursor, Enter to submit.
No external API calls whatsoever.
Update CLAUDE.md when done."

### Session 6 — Effects + Polish + Launch
"Read CLAUDE.md and DESIGN.md. Current step: 8, 9, 10.
Build: CustomCursor (12px crosshair + 24px lagging ring), 
ScanLine (sweeping 1px line, 8s loop), scanline texture (CSS in globals.css).
Then: mobile graceful degradation (single column, reactor scales).
Finally: Lighthouse audit, fix any performance issues, target 85+.
Update CLAUDE.md when done."
