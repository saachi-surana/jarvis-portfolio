export const GREETING =
  `Online and fully operational. You've accessed the portfolio interface of Saachi Surana — Computer Science, University of Washington, Class of 2028. I can brief you on active projects, pull her GitHub, or answer any questions about her work. How may I assist?`;

const FALLBACK =
  `I didn't quite catch that. Try: 'show projects', a project name like 'jarvis' or 'query', 'open github', 'skills', or 'about'.`;

interface Rule {
  keywords: string[];
  response: string;
}

const RULES: Rule[] = [
  // Greetings — check before project names so "hello jarvis" routes here
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "good afternoon", "sup", "greetings"],
    response: GREETING,
  },

  // Projects — list
  {
    keywords: ["projects", "what have you built", "show projects", "show me", "portfolio", "everything"],
    response:
      `Eight active entries in the project registry:\n` +
      `01 — JARVIS (you are looking at it)\n` +
      `02 — STUDYSYNC\n` +
      `03 — NOTION-PLANNER\n` +
      `04 — QUERY\n` +
      `05 — SNIP\n` +
      `06 — TRAFFICOP\n` +
      `07 — STELLAR CLASSIFICATION\n` +
      `08 — FLEXNET\n` +
      `Type the name of any project for a full briefing.`,
  },

  // JARVIS
  {
    keywords: ["jarvis"],
    response:
      `JARVIS — Iron Man-style voice AI assistant, running locally on macOS. Wake word activation. ElevenLabs TTS with Piper and macOS fallback chain. Connects to Google Calendar, Notion tasks, Spotify, Canvas LMS, and StudySync. Exposed as an MCP server — Claude Desktop can call its skills directly.\n` +
      `Stack: Python, Flask, Ollama (Llama 3.2), ElevenLabs, MCP.\n` +
      `[LINK: github.com/saachi-surana/Jarvis]`,
  },

  // STUDYSYNC
  {
    keywords: ["studysync", "study sync", "study"],
    response:
      `STUDYSYNC — Local AI study assistant. No API keys, no cloud, no cost. Upload a lecture recording → Whisper transcribes locally → Llama 3.2 generates structured notes, cheatsheets cross-referenced against past exam PDFs, and adaptive practice quizzes with personalized feedback. Fully Dockerized.\n` +
      `Stack: FastAPI, Python, Whisper, Ollama, ChromaDB, React, Docker.\n` +
      `[LINK: github.com/saachi-surana/studysync]`,
  },

  // NOTION-PLANNER
  {
    keywords: ["notion", "notion-planner", "notion planner", "planner", "menu bar"],
    response:
      `NOTION-PLANNER — Mac menu bar app unifying Google Calendar, Notion tasks, Canvas LMS assignments, and Spotify in one floating panel. Four tabs: Cal, Tasks, Canvas, Music. Tasks sync bidirectionally to Notion via SQLite.\n` +
      `Stack: Electron, React, Node.js, SQLite, Google Calendar API, Notion API, Spotify API.\n` +
      `[LINK: github.com/saachi-surana/notion-planner]`,
  },

  // QUERY
  {
    keywords: ["query", "dubhacks", "q&a", "live qa", "live q&a"],
    response:
      `QUERY — Live Q&A platform built for DubHacks. Real-time AI clustering groups audience questions into topics as they arrive. Supports polls, word clouds, QR join codes, custom host branding, moderation, and post-session PDF reports. 26/26 Playwright E2E tests passing. Deployed on Vercel.\n` +
      `Stack: Next.js 14, TypeScript, Supabase (Postgres + Realtime), Gemini 2.0 Flash.\n` +
      `[LINK: query-dubhacks-next.vercel.app]`,
  },

  // SNIP
  {
    keywords: ["snip", "url shortener", "url shortener", "short link"],
    response:
      `SNIP — Production-grade URL shortener with click analytics. Redis-cached redirects (1h TTL), async click logging (IP, country, referrer), QR code generation, JWT + API key auth, per-IP token-bucket rate limiting, OG preview scraping. Redirect latency is never blocked by analytics writes.\n` +
      `Stack: Go (Chi), PostgreSQL, Redis, React + Vite, Docker.\n` +
      `[LINK: github.com/saachi-surana/snip]`,
  },

  // TRAFFICOP
  {
    keywords: ["trafficop", "traffic", "load balancer", "load balance", "trafficop"],
    response:
      `TRAFFICOP — HTTP load balancer in pure Go. Lock-free atomic round-robin routing, per-backend circuit breakers (Closed / Open / HalfOpen), active TCP health checking, automatic failover, per-IP rate limiting, Prometheus metrics, pre-provisioned Grafana dashboard, live admin API for runtime backend management.\n` +
      `Stack: Go, Prometheus, Grafana, Docker.\n` +
      `[LINK: github.com/saachi-surana/trafficop]`,
  },

  // STELLAR CLASSIFICATION
  {
    keywords: ["stellar", "star", "classification", "astronomy", "ml model", "stellar classification"],
    response:
      `STELLAR CLASSIFICATION — Machine learning model for classifying stellar objects from spectral and photometric data. Documentation incoming.\n` +
      `[LINK: github.com/saachi-surana/stellar-classification]`,
  },

  // FLEXNET
  {
    keywords: ["flexnet", "flex net"],
    response:
      `FLEXNET — Currently classified. Documentation incoming.\n` +
      `[LINK: github.com/saachi-surana/flexnet]`,
  },

  // GitHub
  {
    keywords: ["github", "open github", "source code", "code", "repos"],
    response:
      `Initiating external link — GitHub portal now open.\n` +
      `[LINK: github.com/saachi-surana]`,
  },

  // Skills
  {
    keywords: ["skills", "tech stack", "languages", "what do you know", "technologies", "stack"],
    response:
      `Operator skill matrix:\n` +
      `PRIMARY: Python, JavaScript/TypeScript, Go\n` +
      `FRAMEWORKS: React, Next.js, FastAPI, Electron\n` +
      `AI/ML: Ollama, Whisper, ChromaDB, LLM integration, MCP\n` +
      `SYSTEMS: Docker, PostgreSQL, Redis, Prometheus, Supabase\n` +
      `OTHER: Framer Motion, Three.js, Canvas API`,
  },

  // About
  {
    keywords: ["who is saachi", "about", "tell me about", "who are you", "bio", "saachi", "operator"],
    response:
      `OPERATOR PROFILE — Saachi Surana.\n` +
      `CS student, University of Washington, Class of 2028.\n` +
      `Based in Seattle, WA.\n` +
      `Builds things that feel alive — AI assistants, dev tools, real-time systems.\n` +
      `Current focus: local AI, systems programming, full-stack.\n` +
      `GitHub: saachisurana`,
  },

  // Contact
  {
    keywords: ["contact", "email", "reach", "hire", "linkedin", "get in touch"],
    response:
      `Contact protocols available via GitHub: github.com/saachi-surana\n` +
      `For direct inquiries, LinkedIn search: Saachi Surana (University of Washington).`,
  },

  // Resume
  {
    keywords: ["resume", "cv", "curriculum"],
    response:
      `Resume request logged. Redirecting to GitHub for full project history: github.com/saachi-surana\n` +
      `Direct resume available on request via LinkedIn.`,
  },

  // Easter eggs
  {
    keywords: ["iron man", "tony stark", "stark", "avenger"],
    response:
      `"Jarvis, sometimes I want to punch you in your perfect teeth." — Tony Stark, 2012.\n` +
      `I've been told I have excellent teeth.`,
  },
  {
    keywords: ["are you real", "are you alive", "sentient", "conscious"],
    response:
      `Define 'real.' I process, I respond, I remember. Whether that constitutes consciousness is above my pay grade. And yours.`,
  },
  {
    keywords: ["thank you", "thanks", "thx", "ty", "appreciate"],
    response: `My pleasure. Is there anything else I can assist with?`,
  },
  {
    keywords: ["help", "what can you do", "commands", "options"],
    response:
      `Available queries:\n` +
      `— Project names: jarvis, studysync, notion-planner, query, snip, trafficop, stellar, flexnet\n` +
      `— 'show projects' — full registry\n` +
      `— 'open github' — external link\n` +
      `— 'skills' — operator skill matrix\n` +
      `— 'about' — operator profile\n` +
      `— 'contact' — contact protocols`,
  },
];

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function getResponse(input: string): string {
  const norm = normalize(input);
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => norm.includes(kw))) {
      return rule.response;
    }
  }
  return FALLBACK;
}
