import type { ReactorMode } from "@/lib/store";

export const GREETING =
  `Online and fully operational. You've accessed the portfolio interface of Saachi Surana — Computer Science, University of Washington, Class of 2028. This interface was designed and built by Saachi Surana. I can brief you on active projects, pull her GitHub, or answer any questions about her work. How may I assist?`;

const FALLBACK =
  `I didn't quite catch that. Try: 'show projects', a project name like 'jarvis' or 'query', 'experience', 'skills', or 'about'.`;

export const RING_MESSAGES: Record<string, string> = {
  "projects":    "ACTIVE_PROJECTS panel — 9 entries in the project registry. Type any project name for a full briefing.",
  "skills":      "OPERATOR SKILL MATRIX — Primary: Python, TypeScript/JS, Java. ML/AI: PyTorch, Whisper, Ollama, ChromaDB, LangChain.",
  "vitals":      "NEURAL LINK holding at 70%. CPU nominal at 12%. Memory footprint 31%. All systems green.",
  "network":     "GLOBAL UPLINK stable. Seattle node active. Ping 24ms. Bandwidth 783 Mb/s.",
  "operator-id": "OPERATOR: Saachi Surana — CS & Data Science, University of Washington, Class of 2028. Dean's List.",
  "diagnostics": "SUIT DIAGNOSTICS nominal — Power 94%, Grid 87%, Shield 93%, Comms 100%.",
  "voice":       "VOICE ANALYSIS module active. Waveform stable. Signal nominal.",
  "atmospheric": "ATMOSPHERIC SENSORS reading 29.91 inHg. Conditions nominal.",
  "location":    "LOCATION LOCK: Seattle, WA. Coordinates 47.6062°N, 122.3321°W.",
  "operator":    "OPERATOR CREDENTIALS confirmed — University of Washington, CS & Data Science, Class of 2028.",
};

export const PROJECT_PING_MAP: Record<string, string> = {
  "JARVIS":    "01",
  "STUDYSYNC": "02",
  "NOTION":    "03",
  "QUERY":     "04",
  "SNIP":      "05",
  "TRAFFICOP": "06",
  "STELLAR":   "07",
  "FLEXNET":   "08",
  "BIN":       "09",
};

interface Rule {
  keywords: string[];
  response: string;
  mode?: ReactorMode;
}

const RULES: Rule[] = [
  // Reactor modes — check before generic keywords
  {
    keywords: ["red alert", "emergency", "threat detected", "lockdown", "red mode"],
    response: `RED ALERT PROTOCOL ENGAGED.\nReactor switching to emergency configuration. All systems on heightened standby.`,
    mode: "red-alert",
  },
  {
    keywords: ["stealth", "dark mode", "go dark", "silent mode", "quiet mode"],
    response: `STEALTH MODE ACTIVATED.\nReducing reactor output and electromagnetic signature. Running silent.`,
    mode: "stealth",
  },
  {
    keywords: ["overdrive", "maximum power", "full power", "max power", "boost"],
    response: `OVERDRIVE SEQUENCE INITIATED.\nReactor output at maximum. All ring velocities elevated. Power surging.`,
    mode: "overdrive",
  },
  {
    keywords: ["online", "reset", "normal mode", "stand down"],
    response: `RETURNING TO STANDARD OPERATING PARAMETERS.\nReactor normalized. All systems nominal.`,
    mode: "online",
  },

  // Greetings — check before project names so "hello jarvis" routes here
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "good afternoon", "sup", "greetings"],
    response: GREETING,
  },

  // Projects — list
  {
    keywords: ["projects", "what have you built", "show projects", "show me", "portfolio", "everything"],
    response:
      `Nine active entries in the project registry:\n` +
      `01 — JARVIS (you are looking at it)\n` +
      `02 — STUDYSYNC\n` +
      `03 — NOTION-PLANNER\n` +
      `04 — QUERY\n` +
      `05 — SNIP\n` +
      `06 — TRAFFICOP\n` +
      `07 — STELLAR CLASSIFICATION\n` +
      `08 — FLEXNET\n` +
      `09 — BIN SENTINEL\n` +
      `Type the name of any project for a full briefing.`,
  },

  // BIN SENTINEL — check before generic "bin" matches anything else
  {
    keywords: ["bin sentinel", "bin", "waste", "trash", "garbage classification", "anthropic"],
    response:
      `BIN SENTINEL — Real-time waste classification system. Won Best Use of AI at the Anthropic Startup-athon and AI Student Collective Hackathon. Camera feed → TensorFlow.js CNN classifies waste type → FastAPI + ChromaDB + LangChain route disposal instructions in real time.\n` +
      `Stack: React, TensorFlow.js, FastAPI, ChromaDB, LangChain.\n` +
      `[LINK: github.com/saachi-surana]`,
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
    keywords: ["snip", "url shortener", "short link"],
    response:
      `SNIP — Production-grade URL shortener with click analytics. Redis-cached redirects (1h TTL), async click logging (IP, country, referrer), QR code generation, JWT + API key auth, per-IP token-bucket rate limiting, OG preview scraping. Redirect latency is never blocked by analytics writes.\n` +
      `Stack: Go (Chi), PostgreSQL, Redis, React + Vite, Docker.\n` +
      `[LINK: github.com/saachi-surana/snip]`,
  },

  // TRAFFICOP
  {
    keywords: ["trafficop", "traffic", "load balancer", "load balance"],
    response:
      `TRAFFICOP — HTTP load balancer in pure Go. Lock-free atomic round-robin routing, per-backend circuit breakers (Closed / Open / HalfOpen), active TCP health checking, automatic failover, per-IP rate limiting, Prometheus metrics, pre-provisioned Grafana dashboard, live admin API for runtime backend management.\n` +
      `Stack: Go, Prometheus, Grafana, Docker.\n` +
      `[LINK: github.com/saachi-surana/trafficop]`,
  },

  // STELLAR CLASSIFICATION
  {
    keywords: ["stellar", "star", "classification", "astronomy", "stellar classification"],
    response:
      `STELLAR CLASSIFICATION — Machine learning model for classifying stellar objects from spectral and photometric data.\n` +
      `Stack: Python, PyTorch.\n` +
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
      `PRIMARY: Python, Java, TypeScript, JavaScript, C/C++\n` +
      `ML/AI: PyTorch, TensorFlow.js, Whisper, Ollama, ChromaDB, LangChain, RAG, CNNs\n` +
      `BACKEND: FastAPI, Node.js, PostgreSQL, Supabase, Docker, REST APIs\n` +
      `FRONTEND: React, Next.js, Tailwind CSS\n` +
      `DATA: Pandas, NumPy, SciPy, HDF5, Prometheus, Grafana`,
  },

  // Experience / work history
  {
    keywords: ["experience", "work", "jobs", "internship", "employment", "career", "history", "coreweave", "biorobotics", "hsu lab", "c2s", "future is female"],
    response:
      `WORK HISTORY:\n` +
      `CoreWeave — Production Engineering Intern (June 2026)\n` +
      `UW BioRobotics Lab — Undergraduate Researcher (Jan 2026)\n` +
      `UW Hsu Lab — CS & Particle Physics Intern (Sep 2024)\n` +
      `C2S Technologies — Software Engineering Intern (July 2024)\n` +
      `The Future Is Female — Co-Founder & Co-President (Sep 2022)`,
  },

  // About
  {
    keywords: ["who is saachi", "about", "tell me about", "who are you", "bio", "saachi", "operator"],
    response:
      `OPERATOR PROFILE — Saachi Surana.\n` +
      `CS & Data Science, University of Washington, Class of 2028. Dean's List.\n` +
      `Currently: Production Engineering Intern at CoreWeave, Undergraduate Researcher at UW BioRobotics Lab.\n` +
      `Builds AI systems, local inference pipelines, full-stack platforms, and things that feel alive.\n` +
      `Won Best Use of AI at the Anthropic Startup-athon.\n` +
      `GitHub: saachi-surana | saachi.dev`,
  },

  // Contact
  {
    keywords: ["contact", "email", "reach", "hire", "linkedin", "get in touch"],
    response:
      `Direct contact: saachisurana@outlook.com\n` +
      `LinkedIn: [LINK: linkedin.com/in/saachi-surana]\n` +
      `GitHub: [LINK: github.com/saachi-surana]`,
  },

  // Resume
  {
    keywords: ["resume", "cv", "curriculum"],
    response:
      `Resume on file. Direct link: saachi.dev\n` +
      `LinkedIn: [LINK: https://linkedin.com/in/saachi-surana]`,
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
      `— Project names: jarvis, studysync, query, snip, trafficop, stellar, bin sentinel\n` +
      `— 'show projects' — full registry\n` +
      `— 'experience' — work history\n` +
      `— 'skills' — operator skill matrix\n` +
      `— 'about' — operator profile\n` +
      `— 'resume' — direct link\n` +
      `— 'contact' — contact protocols\n` +
      `— Reactor commands: 'red alert', 'stealth', 'overdrive', 'reset'`,
  },
];

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

export interface JarvisResponse {
  response: string;
  mode?: ReactorMode;
}

export function getResponse(input: string): JarvisResponse {
  const norm = normalize(input);
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => norm.includes(kw))) {
      return { response: rule.response, mode: rule.mode };
    }
  }
  return { response: FALLBACK };
}
