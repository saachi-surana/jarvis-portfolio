import type { ReactorMode } from "@/lib/store";

export interface Rule {
  keywords: string[];
  response: string;
  mode?: ReactorMode;
  showAbout?: boolean;
}

export const PROJECT_RULES: Rule[] = [
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
  {
    keywords: ["bin sentinel", "bin", "waste", "trash", "garbage classification", "anthropic"],
    response:
      `BIN SENTINEL — Real-time waste classification. Won Best Use of AI at Anthropic Startup-athon and AI Student Collective Hackathon. Camera feed → TensorFlow.js CNN classifies waste type → FastAPI + ChromaDB + LangChain route disposal instructions in real time.\n` +
      `Stack: React, TensorFlow.js, FastAPI, ChromaDB, LangChain.\n` +
      `[LINK: github.com/saachi-surana]`,
  },
  {
    keywords: ["jarvis"],
    response:
      `JARVIS — Iron Man-style voice AI, running locally on macOS. Wake word activation. ElevenLabs TTS with Piper + macOS fallback. Connects to Google Calendar, Notion tasks, Spotify, Canvas LMS, and StudySync. Exposed as an MCP server — Claude Desktop can call its skills directly.\n` +
      `Stack: Python, Flask, Ollama (Llama 3.2), ElevenLabs, MCP.\n` +
      `[LINK: github.com/saachi-surana/Jarvis]`,
  },
  {
    keywords: ["studysync", "study sync", "study"],
    response:
      `STUDYSYNC — Local AI study assistant. No API keys, no cloud, no cost. Upload a lecture recording → Whisper transcribes locally → Llama 3.2 generates structured notes, cheatsheets cross-referenced against past exam PDFs, and adaptive practice quizzes with personalized feedback. Fully Dockerized.\n` +
      `Stack: FastAPI, Python, Whisper, Ollama, ChromaDB, React, Docker.\n` +
      `[LINK: github.com/saachi-surana/studysync]`,
  },
  {
    keywords: ["notion", "notion-planner", "notion planner", "planner", "menu bar"],
    response:
      `NOTION-PLANNER — Mac menu bar app unifying Google Calendar, Notion tasks, Canvas LMS assignments, and Spotify in one floating panel. Four tabs: Cal, Tasks, Canvas, Music. Tasks sync bidirectionally to Notion via SQLite.\n` +
      `Stack: Electron, React, Node.js, SQLite, Google Calendar API, Notion API, Spotify API.\n` +
      `[LINK: github.com/saachi-surana/notion-planner]`,
  },
  {
    keywords: ["query", "dubhacks", "q&a", "live qa", "live q&a"],
    response:
      `QUERY — Live Q&A platform built for DubHacks. Real-time AI clustering groups audience questions into topics as they arrive. Supports polls, word clouds, QR join codes, custom host branding, moderation, and post-session PDF reports. 26/26 Playwright E2E tests passing. Deployed on Vercel.\n` +
      `Stack: Next.js 14, TypeScript, Supabase (Postgres + Realtime), Gemini 2.0 Flash.\n` +
      `[LINK: query-dubhacks-next.vercel.app]`,
  },
  {
    keywords: ["snip", "url shortener", "short link"],
    response:
      `SNIP — Production-grade URL shortener with click analytics. Redis-cached redirects (1h TTL), async click logging (IP, country, referrer), QR code generation, JWT + API key auth, per-IP token-bucket rate limiting, OG preview scraping.\n` +
      `Stack: Go (Chi), PostgreSQL, Redis, React + Vite, Docker.\n` +
      `[LINK: github.com/saachi-surana/snip]`,
  },
  {
    keywords: ["trafficop", "traffic", "load balancer", "load balance"],
    response:
      `TRAFFICOP — HTTP load balancer in pure Go. Lock-free atomic round-robin routing, per-backend circuit breakers (Closed/Open/HalfOpen), active TCP health checking, automatic failover, per-IP rate limiting, Prometheus metrics, Grafana dashboard, live admin API.\n` +
      `Stack: Go, Prometheus, Grafana, Docker.\n` +
      `[LINK: github.com/saachi-surana/trafficop]`,
  },
  {
    keywords: ["stellar", "star", "classification", "astronomy", "stellar classification"],
    response:
      `STELLAR CLASSIFICATION — Machine learning model for classifying stellar objects from spectral and photometric data.\n` +
      `Stack: Python, PyTorch.\n` +
      `[LINK: github.com/saachi-surana/stellar-classification]`,
  },
  {
    keywords: ["flexnet", "flex net"],
    response:
      `FLEXNET — Currently classified. Documentation incoming.\n` +
      `[LINK: github.com/saachi-surana/flexnet]`,
  },
];
