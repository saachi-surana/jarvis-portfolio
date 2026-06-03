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
COMPLETE — fake scroll architecture: page never actually scrolls; wheel/touch drives Zustand progress (0→1) which animates sections via CSS transforms

## Fake Scroll Session — DONE
- [DONE] lib/scrollStore.ts: Zustand store with `progress` (smooth display, 0–1), `target` (desired pos), `isTransitioning`; actions: `setProgress` (sets target), `_setDisplay` (rAF writes interpolated value), `incrementProgress`/`decrementProgress` (+/- 0.015)
- [DONE] components/effects/FakeScroll.tsx: intercepts wheel (passive:false, preventDefault) + touch events; rAF loop lerps displayRef toward target at 0.08 speed; writes back to store via `_setDisplay`; all listeners cleaned up on unmount
- [DONE] app/page.tsx: no window.scrollTo; FakeScroll rendered; both sections `position:fixed top:0 left:0 width:100vw height:100vh`; splash slides up + fades as progress→1; HUD slides up from below + fades in; JarvisHUD wrapper gets `contain:strict`
- [DONE] app/globals.css: html and body get `height:100vh; width:100vw; overflow:hidden` — browser can never actually scroll
- [DONE] components/effects/ScrollIndicator.tsx: reads `progress` from scrollStore instead of window.scrollY; visible when progress < 0.15
- [DONE] components/layout/BottomBar.tsx: // RESTART converted from Link→button; onClick calls `setProgress(0)` → target=0 → lerp smoothly returns to splash

## Scroll & Containment Fix Session — DONE
- [DONE] BUG 1 — Scroll restoration: page.tsx useEffect sets `window.history.scrollRestoration = 'manual'` + `window.scrollTo(0, 0)` on mount; SplashSection.tsx redundant useEffect scroll-to-top removed (and `useEffect` import dropped); layout.tsx retains `scrollBehavior: 'auto'` on html + inline script guard
- [DONE] BUG 2 — Fixed overlay bleed: JarvisHUD wrapper in page.tsx uses `contain: 'strict'`; CSS containment clips ALL children including position:fixed to container bounds — no component internals changed

## Routing Consolidation Session — DONE
- [DONE] app/page.tsx: wraps SplashSection in `height:100vh overflow:hidden position:relative` div; wraps JarvisHUD in `height:100vh overflow:hidden position:relative isolation:isolate` div
- [DONE] app/hud/ directory deleted — / is now the only route; both sections live on one scrollable page
- [DONE] JarvisHUD skipBoot prop already existed; SplashSection already rendered ScrollIndicator — no other files changed
- ROUTING: / = SplashSection (100vh, boot sequence) → scroll down → JarvisHUD (100vh, skipBoot); no /hud route

## HUD Containment Fix — DONE
- [DONE] JarvisHUD div: added `relative isolate transform-gpu` classes
  - `relative`: establishes positioning context for absolute children
  - `isolate`: creates new stacking context (z-index values inside can't compete with splash)
  - `transform-gpu`: adds transform:translateZ(0) → makes JarvisHUD the containing block for ALL position:fixed descendants (ProjectOverlay, FloatingCard, TopBar fade overlay)
- Why not change fixed→absolute: ProjectOverlay renders inside Panel (position:relative) so absolute inset-0 would cover only the Panel; FloatingCard must escape CenterPanel's overflow:hidden per existing design comment
- Result: when user scrolls to splash, JarvisHUD is off-screen → its fixed children are off-screen too → no bleed-over

## Splash Entry Fix — DONE
- [DONE] page.tsx converted to client component ("use client") — required for useEffect scroll-to-top
- [DONE] useEffect(() => window.scrollTo({top:0, behavior:'instant'})) at page level overrides browser scroll restoration
- [DONE] main gets margin:0 padding:0 — eliminates any default layout gap
- [DONE] SplashSection verified: onComplete only calls setBooted(true), no auto-scroll/navigate after boot; section stays in DOM permanently
- Root cause: server component page.tsx couldn't run useEffect → browser scroll restoration fired → user landed in HUD

## Scroll Fix Session — DONE
- [DONE] ISSUE 1 — SplashSection: useEffect window.scrollTo({top:0,behavior:'instant'}) prevents browser scroll restoration loading into HUD
- [DONE] ISSUE 2 — Boot timing cut to <2.5s: t2 1500→600ms, LINE1 pause 220→100ms, LINE2 10ms/char (was 32ms) → 500ms total, LINE2 pause 420→100ms, exit fade 0.85→0.4s, title fade 0.75→0.6s
- [DONE] ISSUE 3 — Removed overflow:hidden from SplashSection (was trapping scroll; free scroll in both directions now)
- [DONE] ISSUE 4 — ArcReactor: DataLabels only render when !fullScreen (HUD mode only); SplashSection owns its HTML labels → no more duplicates
- [DONE] ISSUE 5 — Reactor always mounted in SplashSection (no conditional rendering); overflow removal also prevents canvas clipping

## Simple Scroll Session — DONE
- [DONE] app/page.tsx: renders <SplashSection /> then <JarvisHUD skipBoot /> — plain vertical scroll, no animations
- [DONE] components/layout/SplashSection.tsx: 100vh fullscreen reactor (fullScreen), BootSequence, coordinate labels, ScrollIndicator
- [DONE] components/effects/ScrollIndicator.tsx: self-managing (window.scrollY ≤ 100 = visible); position:fixed right:32px; 80px line + 8px glow dot + SCROLL rotated label; no props
- [DONE] Deleted ScrollHUD.tsx (dead code from failed scroll architecture; was causing TS error)
- ROUTING: / = SplashSection + JarvisHUD (scroll to reveal); /hud removed
- TopBar // HOME → router.push("/") scrolls back to top of page (SplashSection)

## Enhancement Session — DONE
- [DONE] PART 1 — Authorship clarity (boot sequence, greeting, bottom bar, operator ID)
- [DONE] PART 2 — Ring navigation: hover labels (// SECTION_NAME) + ring click sends JARVIS message + highlights right sidebar panel
- [DONE] PART 3 — Reactor modes via chat: "red alert" / "stealth" / "overdrive" / "reset" → ArcReactor smoothly transitions color/speed
- [DONE] PART 4 — Panel ping: JARVIS response mentioning a project flashes that row in ProjectsPanel
- [DONE] PART 5 — GlitchEffect: J.A.R.V.I.S title in TopBar does RGB channel split every 15–20s
- [DONE] PART 6 — Particle burst: clicking reactor core fires 100 particles outward + lerp back

## Interactive Features Session — DONE
- [DONE] PART 1 — Ring navigation re-mapped: outer 5 (largest→smallest) = PROJECTS, GITHUB, ABOUT, SKILLS, CONTACT; inner 5 = JARVIS, STUDYSYNC, NOTION-PLANNER, QUERY, SNIP
  - Hover: ring brightens, floating HTML label appears in Space Mono
  - Click PROJECTS/SKILLS → highlight matching sidebar panel
  - Click GITHUB → window.open github.com/saachi-surana
  - Click ABOUT → opens OperatorOverlay
  - Click inner project rings → highlight Projects panel + ping that project row + JARVIS message
- [DONE] PART 2 — Reactor modes via chat (red alert/stealth/overdrive/online/reset) wired to Zustand store in lib/store.ts; smooth color+speed transitions in ArcReactorRings.tsx + ArcReactorCore.tsx + ArcReactorParticles.tsx
- [DONE] PART 3 — Panel ping: JarvisChat scans response text for project names via PROJECT_PING_MAP → pingProject(id) → ProjectsPanel flashes .pinged class for 700ms
- [DONE] PART 4 — GlitchEffect: GlitchTitle in TopBar fires RGB channel split every 15–20s (80ms duration)
- [DONE] PART 5 — Particle burst: clicking reactor core fires 100 BurstParticles outward (2.5–4 units), lerp back over 0.8s; core flashes max emissive for 120ms; burst color matches reactor mode
- [DONE] responses.ts split: 272 lines → lib/projectRules.ts (88 lines) + components/chat/responses.ts (138 lines)

## Content Update Session — DONE
- [DONE] SkillsPanel: updated to Python 90%, TS/JS 80%, React/Next 80%, ML/AI 85%, Java 70%, Data 75%
- [DONE] AboutPanel: new left sidebar panel with bio, degree/school/status/grad/email/LinkedIn data rows
- [DONE] ExperiencePanel: new right sidebar panel (below ProjectsPanel) with 5 expandable entries
- [DONE] lib/projects.ts: added BIN SENTINEL as project 09
- [DONE] responses.ts: updated skills, about, resume, contact; added experience/work command + BIN SENTINEL rule

## Modularity Refactor Session — DONE
- [DONE] lib/constants.ts: all color tokens (C_CYAN, C_BG_PANEL, etc.), reactor mode maps, geometry constants, animation durations, BURST_COUNT
- [DONE] lib/animations.ts: SPRING, EASE_REVEAL, fadeIn, slideUp, slideFromRight, slideFromBottom, scrim, stagger variants
- [DONE] ArcReactor.tsx (737 lines) → 6 files: ArcReactor (122), ArcReactorRings (83), ArcReactorCore (85), ArcReactorParticles (125), ArcReactorSweep (129), ArcReactorLabels (39)
- [DONE] BootSequence (181 lines) → useBootSequence.ts hook (61) + BootSequence.tsx (81)
- [DONE] OrbitalDisplays (238 lines) → OrbitalDisplayItem.tsx (74) + OrbitalDisplays.tsx (57)
- [DONE] OperatorOverlay (186 lines) → OperatorOverlayRows.tsx (49) + OperatorOverlay.tsx (74)
- [DONE] ChatMessage imports slideUp from animations.ts; JarvisChat imports DUR_CHAT_CHAR from constants.ts; ProjectOverlay imports SPRING from animations.ts
- [DONE] All refactored files verified ≤ 150 lines; build passes clean

## Cinematic HUD Density Session — DONE
- [DONE] PART 1 — ArcReactor: 48-segment static casing ring (charcoal + cyan emissive), 48 tick marks (every 4th longer), radar sweep shader (1 RPM, 90° cyan trail), floating HTML data labels (coords + ALT + SEC), 2000 particles (mixed orbital/drift, 0.008–0.025 size), bloom 2.5 / threshold 0.1, camera pullback to z=7.2
- [DONE] PART 2 — OrbitalDisplays.tsx: three CSS/SVG animated HUD circles (NEURAL LINK cyan, QUANTUM CORE purple, STORAGE ARRAY dim cyan) with counter-rotating inner rings, pulsing center dots, glow overlays, corner brackets on container; wired into CenterPanel between reactor and chat
- [DONE] PART 3 — globals.css: scanline opacity 0.03→0.055, panel inset-shadow 8→12px, statusDotPulse keyframe + .panel-status-dot class, topbar-scan keyframe; Panel.tsx: status dot before every label, brackets 12→16px; CenterPanel: dot grid background (rgba(0,229,255,0.015) every 40px)
- [DONE] PART 4 — TopBar: subtitle "JUST A RATHER VERY INTELLIGENT SYSTEM" Space Mono 0.5rem rgba(0,229,255,0.4) letterSpacing 0.3em, height 40→52px, animated left-to-right scan line 10s loop rgba(0,229,255,0.15)

## Readability & Visual Polish Session — DONE
- [DONE] DESIGN.md: added official text hierarchy table (PRIMARY/BODY/LABEL/MUTED), updated bg-panel to #070d0d, border to 0.25 opacity
- [DONE] globals.css: --color-bg-panel #070d0d, --color-cyan-border 0.25, --color-text-body #e2e8f0, --color-text-muted #64748b, panel inset glow
- [DONE] DataRow.tsx: label #00b8cc 0.65rem, value #ffffff Rajdhani 0.9rem with text-shadow
- [DONE] BarGauge.tsx: converted to Framer Motion with stagger delay via index prop, label now white Rajdhani 0.78rem
- [DONE] SkillsPanel.tsx: passes index to BarGauge for staggered fill animation
- [DONE] Panel.tsx: border 0.25 opacity, inset glow in animate base state, bg #070d0d
- [DONE] ProjectsPanel.tsx: number #00b8cc, name #ffffff→hover #00e5ff, row separator cyan-tinted, inset glow
- [DONE] ExperiencePanel.tsx: role #ffffff, company #00e5ff, date #64748b, desc #e2e8f0 0.9rem lh 1.6
- [DONE] ChatMessage.tsx: JARVIS text #e2e8f0 Rajdhani 0.9rem lh 1.6, YOU label #64748b, entry fade+slide-up animation
- [DONE] AboutPanel.tsx: bio #e2e8f0 Rajdhani 400 0.95rem lh 1.6
- [DONE] OperatorIDPanel.tsx: name text-shadow, GitHub #ffffff→hover #00e5ff (corrected direction)
- [DONE] ProjectOverlay.tsx: spring transition stiffness 300 damping 30, desc #e2e8f0 0.95rem lh 1.6, bg #070d0d

## Mouse Zone Navigation Session — DONE (revised)
- [DONE] PART 1 — lib/mouseZoneStore.ts: IDLE_RADIUS=200px, narrow 60° bands (RIGHT 330°–30°=PROJECTS, UP 60°–120°=EXPERIENCE, LEFT 150°–210°=IDENTITY, DOWN 240°–300°=CONTACT), NONE zone for gaps, 400ms debounce
- [DONE] PART 2 — Sidebars fully reverted: no opacity dimming, no zone logic, always full brightness; zone-based dimming removed from LeftSidebar + RightSidebar
- [DONE] PART 3 — FloatingCard.tsx: position:fixed overlay cards per zone (left/right/top/bottom of viewport), spring(200,25) entry animation from direction, AnimatePresence exit; IDENTITY=left 12px, PROJECTS=right 12px, EXPERIENCE=top 72px centered, CONTACT=bottom 56px centered; black bg 0.92 + backdrop-blur + cyan border
- [DONE] PART 4 — FloatingCardContent.tsx: IdentityContent (name/role/school/degree/status/grad/bio), ProjectsContent (all 9 projects clickable→ProjectOverlay), ExperienceContent (5 work entries, scrollable), ContactContent (4 clickable contact links)
- [DONE] PART 5 — ChevronHints.tsx: `< > ^ v` Space Mono chars at reactor edges (position:absolute), brighten + chevronPulse animation when zone matches
- [DONE] CompassRose.tsx + DirectionalPopup.tsx deleted; globals.css: added @keyframes chevronPulse
- [DONE] Reactor tilt enhancement stays: tiltMult 0.28→0.42 when zone≠IDLE; outermost ring shifts to #00ccaa (EXPERIENCE) or #20f0ff (PROJECTS)

## Splash → HUD Routing Session — DONE
- [DONE] PART 1 — /app/page.tsx: full-screen splash with reactor (80vh centered); BootSequence plays; after boot+1s, scroll hint appears (∨ // SCROLL OR CLICK TO INITIALIZE INTERFACE); scroll or click triggers exit animation (scale 0.32, move -28vw/-28vh, fade to black) → router.push('/hud') at 800ms
- [DONE] PART 2 — /app/hud/page.tsx: renders JarvisHUD with skipBoot prop; no boot sequence; entrance animations play immediately (reactor scale 0.84→1, topbar y:-40→0, bottombar y:20→0)
- [DONE] PART 3 — JarvisHUD: added skipBoot prop; when true, skips BootSequence and sets booted=true via useEffect; animation params differ per entry path
- [DONE] PART 4 — BottomBar: added hidden-md // RESTART Link → / (splash); very muted color (text-[#2d3748]) hover to [#475569]
- [DONE] PART 5 — Mobile: /app/page.tsx detects window.innerWidth<768 on mount → router.replace('/hud')
- [DONE] PART 6 — Both routes independent: /hud works directly (entrance animation), / is splash-only entry; build: / = 2.43kB, /hud = 29.8kB, zero TS errors

## Favicon Session — DONE
- [DONE] /public/favicon.svg: arc reactor SVG (680×680 viewBox, black bg, concentric cyan rings, white core, cardinal tick marks + end-caps)
- [DONE] app/layout.tsx: metadata icons → /favicon.svg for icon/shortcut/apple; title updated to "Saachi Surana"; description updated
- [DONE] app/favicon.ico: deleted (SVG replaces it)

## Splash Spin-Up Session — DONE
- [DONE] PART 1 — ScrollIndicator.tsx: right-side vertical indicator (right:40px, vertically centered); 80px line at 60% cyan opacity; 8px dot slides y:[0→72] with drop-shadow glow on 1.5s loop; "SCROLL" label rotate(-90deg) left of line at 70% opacity
- [DONE] PART 2 — Spin-up state machine in page.tsx: spinningUp / shaking / exiting states + triggeredRef; scroll or click → setSpinningUp → shake at 800ms → setExiting at 1000ms → router.push at 1400ms; old 800ms handleExit replaced
- [DONE] PART 3 — ArcReactor spinningUp prop: ReactorScene ramps groupRef.rotation.z by (1 + ramp*3)*delta*2 over 1.2s using spinElapsed ref; Core flares emissiveIntensity → 25 when spinningUp; Bloom jumps to 3.5 (fullScreen) when spinningUp; screen shake via Framer Motion keyframes on reactor wrapper
- [DONE] ArcReactorCore: spinningUp?: boolean prop; lerps emissive to #ffffff and intensity to 25 during spin-up

## Splash/HUD Polish Session — DONE
- [DONE] ISSUE 1 — Splash reactor is now full 100vw×100vh (removed 80vh centered box); motion.div is position:fixed inset:0; background bleeds to edges
- [DONE] ISSUE 2 — ArcReactor accepts fullScreen?: boolean prop; when true: camera z=8.5 (vs 7.2), bloom 3.0 (vs 2.5), particles 3000 (vs 2000)
- [DONE] ISSUE 3 — TopBar converted to client component; "// HOME" button far left (color #2d3748→#475569 hover); Escape key listener navigates to /; fade-to-black overlay (500ms) before router.push("/") at 600ms
- [DONE] ISSUE 4 — ArcReactorRings: disableNav?: boolean prop; when true: hit-area torus not rendered (no pointer events), hover labels suppressed; fullScreen passes disableNav=true, isHovered=false to all rings

## Polish Session — DONE
- [DONE] BarGauge: added showPercent prop; SkillsPanel now shows relative bars only, no numbers
- [DONE] SkillsPanel: 8 skills (Python/ML-AI/Java = strongest; React/TS/Data = strong; HTML/C++ = familiar)
- [DONE] OperatorOverlay: HUD slide-up panel over center panel with full contact info + bio
- [DONE] ArcReactor: "// OPERATOR" pulsing label below core — click opens OperatorOverlay
- [DONE] JarvisChat: "about"/"who is saachi" keywords trigger OperatorOverlay + brief typewriter response
- [DONE] store.ts: added showAbout / setShowAbout to Zustand store

## File Length Rule
**Keep all files under 150 lines. Split if exceeded.**
- Large components: extract sub-components or custom hooks
- Shared config: add to lib/constants.ts (colors, durations, reactor config)
- Shared animations: add to lib/animations.ts (Framer Motion variants)

## Key Architecture Notes (for future sessions)
- State management: Zustand store at lib/store.ts (reactorMode, pingProjectId, highlightSection, pendingMessage)
- Panel highlight system: Panel.tsx accepts sectionId prop → reads highlightSection from Zustand → pulses glow
- Ring→section map: outer 5 rings = PROJECTS/GITHUB/ABOUT/SKILLS/CONTACT; inner 5 = JARVIS/STUDYSYNC/NOTION-PLANNER/QUERY/SNIP
- Reactor mode keywords: "red alert"/"stealth"/"overdrive"/"reset" in chat → setReactorMode in store
- Ring click → queueMessage(RING_MESSAGES[sectionId]) → JarvisChat watches pendingMessage → types it out
- OperatorOverlay: slides up from bottom of CenterPanel; triggered by ArcReactor "// OPERATOR" button OR "about" keyword in chat; ESC/click-outside closes
- store.ts also has showAbout / setShowAbout for the overlay
- Projects: now 9 entries (01–09, BIN SENTINEL added)
- Right sidebar order: OperatorID → Projects → Experience → Vitals → Network
- Left sidebar order: Clock → About → Skills → Location → Operator → Diagnostics → Voice → Atmospheric
- Saachi: CS & Data Science @ UW, Dean's List, Class 2028, CoreWeave intern, UW BioRobotics researcher

- Zone-based tilt in ArcReactor: tiltMult = zone!=="IDLE" ? 0.42 : 0.28; outermost ring gets zoneAccent color
- mouseZoneStore.ts: IDLE_RADIUS=200px; zones by atan2; 400ms debounce; NONE zone for gaps
- ROUTING: / = splash (100vh) + HUD (100vh) on single scrollable page; /hud deleted; skipBoot=true on HUD section
- JarvisHUD accepts skipBoot prop: when true, skips BootSequence, sets booted=true via useEffect immediately, uses faster/different entrance animations
- BottomBar has hidden // RESTART link → / (splash), visible on md+ only
- TopBar (client component): "// HOME" button far left + Escape key → fade-to-black 500ms → router.push("/")
- ArcReactor fullScreen prop: camera z=8.5, bloom 3.0, particles 3000, OPERATOR button hidden, ring disableNav=true (no hover/click/labels)

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
