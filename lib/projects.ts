export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  github: string;
  live?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    name: "JARVIS",
    description:
      "Iron Man-style voice AI assistant running locally on macOS. Wake word activation, ElevenLabs TTS (with Piper + macOS fallback), connects to Google Calendar, Notion tasks, Spotify, Canvas LMS, and StudySync. Built in Python, exposed as an MCP server so Claude Desktop can call its skills directly. HUD rendered in a local browser window.",
    stack: ["Python", "Flask", "Ollama", "Llama 3.2", "ElevenLabs", "MCP"],
    github: "https://github.com/saachi-surana/Jarvis",
  },
  {
    id: "02",
    name: "STUDYSYNC",
    description:
      "Local AI study assistant — no API keys, no cloud, no cost. Upload lecture audio/video → Whisper transcribes locally → Llama 3.2 generates structured notes, cheatsheets cross-referenced with past exam PDFs, and practice quizzes with personalized feedback. Fully Dockerized.",
    stack: ["FastAPI", "Python", "Whisper", "Ollama", "Llama 3.2", "ChromaDB", "React", "Vite", "Docker"],
    github: "https://github.com/saachi-surana/studysync",
  },
  {
    id: "03",
    name: "NOTION-PLANNER",
    description:
      "Mac menu bar app unifying Google Calendar, Notion tasks (SQLite + sync), Canvas LMS assignments, and Spotify — all in one compact floating panel. Tabs: Cal, Tasks, Canvas, Music. Electron app with a React renderer.",
    stack: ["Electron", "React", "Node.js", "SQLite", "Notion API", "Google Calendar API", "Spotify API", "Canvas LMS API"],
    github: "https://github.com/saachi-surana/notion-planner",
  },
  {
    id: "04",
    name: "QUERY",
    description:
      "Live Q&A platform built for DubHacks. Real-time AI clustering groups audience questions into topics as they come in. Supports polls, word clouds, QR join codes, custom host branding, moderation, post-session reports, and PDF export. 26/26 Playwright E2E tests passing. Deployed on Vercel.",
    stack: ["Next.js 14", "TypeScript", "Supabase", "Postgres", "Realtime", "Gemini 2.0 Flash", "Tailwind"],
    github: "https://github.com/saachi-surana/query",
    live: "https://query-dubhacks-next.vercel.app",
  },
  {
    id: "05",
    name: "SNIP",
    description:
      "Production-grade URL shortener with click analytics. Redis-cached redirects (1h TTL), async click logging (IP, country, referrer), QR code generation, JWT + API key auth, per-IP rate limiting (token bucket), OG preview scraping.",
    stack: ["Go", "Chi router", "PostgreSQL", "Redis", "React", "Vite", "Docker"],
    github: "https://github.com/saachi-surana/snip",
  },
  {
    id: "06",
    name: "TRAFFICOP",
    description:
      "HTTP load balancer in pure Go. Round-robin routing via lock-free atomic counter, per-backend circuit breakers (Closed/Open/HalfOpen), active health checking, automatic failover with retry, per-IP rate limiting, Prometheus metrics, Grafana dashboard (pre-provisioned), live admin API.",
    stack: ["Go", "Prometheus", "Grafana", "Docker"],
    github: "https://github.com/saachi-surana/trafficop",
  },
  {
    id: "07",
    name: "STELLAR CLASSIFICATION",
    description:
      "Machine learning model for classifying stellar objects from spectral and photometric data.",
    stack: ["Python", "ML"],
    github: "https://github.com/saachi-surana/stellar-classification",
  },
  {
    id: "08",
    name: "FLEXNET",
    description: "In development.",
    stack: [],
    github: "https://github.com/saachi-surana/flexnet",
  },
  {
    id: "09",
    name: "BIN SENTINEL",
    description:
      "Real-time waste classification system. Won Best Use of AI at the Anthropic Startup-athon and AI Student Collective Hackathon. Camera feed → TensorFlow.js CNN classifies waste type → FastAPI + ChromaDB + LangChain route disposal instructions in real time.",
    stack: ["React", "TensorFlow.js", "FastAPI", "ChromaDB", "LangChain"],
    github: "https://github.com/saachi-surana",
  },
];
