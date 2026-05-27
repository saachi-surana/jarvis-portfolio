import type { ReactorMode } from "@/lib/store";
import { type Rule, PROJECT_RULES } from "@/lib/projectRules";

export const GREETING =
  `Online and fully operational. You've accessed the portfolio interface of Saachi Surana — Computer Science, University of Washington, Class of 2028. This interface was designed and built by Saachi Surana. I can brief you on active projects, pull her GitHub, or answer any questions about her work. How may I assist?`;

const FALLBACK =
  `I didn't quite catch that. Try: 'show projects', a project name like 'jarvis' or 'query', 'experience', 'skills', or 'about'.`;

export const RING_MESSAGES: Record<string, string> = {
  "projects":       "Displaying active project registry. Nine entries on file. Type any project name for a full briefing.",
  "github":         "Navigating to external GitHub portal — Saachi Surana's repositories now loading.",
  "about":          "Loading operator profile. Access granted.",
  "skills":         "Operator skill matrix online. Primary: Python, ML/AI, Java. Secondary: React, TypeScript, Data.",
  "contact":        "Contact protocols active. saachi7@uw.edu — LinkedIn and GitHub links available.",
  "jarvis":         "JARVIS — Iron Man-style voice AI. Wake word, ElevenLabs TTS, MCP server exposing skills to Claude Desktop.",
  "studysync":      "STUDYSYNC — Local AI study assistant. Whisper → Llama 3.2 → structured notes. No cloud. No API keys.",
  "notion-planner": "NOTION-PLANNER — Mac menu bar unifying Calendar, Notion, Canvas, Spotify in one floating panel.",
  "query":          "QUERY — Live Q&A platform. Real-time AI question clustering. Built for DubHacks. Deployed on Vercel.",
  "snip":           "SNIP — Production URL shortener. Redis-cached redirects, click analytics, Go backend.",
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

const GENERAL_RULES: Rule[] = [
  {
    keywords: ["github", "open github", "source code", "code", "repos"],
    response: `Initiating external link — GitHub portal now open.\n[LINK: github.com/saachi-surana]`,
  },
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
  {
    keywords: ["who is saachi", "about", "tell me about", "who are you", "bio", "saachi", "operator"],
    response: `OPERATOR PROFILE — loading credentials. Display active.`,
    showAbout: true,
  },
  {
    keywords: ["contact", "email", "reach", "hire", "linkedin", "get in touch"],
    response:
      `Direct contact: saachisurana@outlook.com\n` +
      `LinkedIn: [LINK: linkedin.com/in/saachi-surana]\n` +
      `GitHub: [LINK: github.com/saachi-surana]`,
  },
  {
    keywords: ["resume", "cv", "curriculum"],
    response:
      `Resume on file. Direct link: saachi.dev\n` +
      `LinkedIn: [LINK: https://linkedin.com/in/saachi-surana]`,
  },
  {
    keywords: ["iron man", "tony stark", "stark", "avenger"],
    response: `"Jarvis, sometimes I want to punch you in your perfect teeth." — Tony Stark, 2012.\nI've been told I have excellent teeth.`,
  },
  {
    keywords: ["are you real", "are you alive", "sentient", "conscious"],
    response: `Define 'real.' I process, I respond, I remember. Whether that constitutes consciousness is above my pay grade. And yours.`,
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

const RULES: Rule[] = [
  { keywords: ["red alert", "emergency", "threat detected", "lockdown", "red mode"],
    response: `RED ALERT PROTOCOL ENGAGED.\nReactor switching to emergency configuration. All systems on heightened standby.`, mode: "red-alert" },
  { keywords: ["stealth", "dark mode", "go dark", "silent mode", "quiet mode"],
    response: `STEALTH MODE ACTIVATED.\nReducing reactor output and electromagnetic signature. Running silent.`, mode: "stealth" },
  { keywords: ["overdrive", "maximum power", "full power", "max power", "boost"],
    response: `OVERDRIVE SEQUENCE INITIATED.\nReactor output at maximum. All ring velocities elevated. Power surging.`, mode: "overdrive" },
  { keywords: ["online", "reset", "normal mode", "stand down"],
    response: `RETURNING TO STANDARD OPERATING PARAMETERS.\nReactor normalized. All systems nominal.`, mode: "online" },
  { keywords: ["hello", "hi", "hey", "good morning", "good evening", "good afternoon", "sup", "greetings"],
    response: GREETING },
  ...PROJECT_RULES,
  ...GENERAL_RULES,
];

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

export interface JarvisResponse {
  response: string;
  mode?: ReactorMode;
  showAbout?: boolean;
}

export function getResponse(input: string): JarvisResponse {
  const norm = normalize(input);
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => norm.includes(kw))) {
      return { response: rule.response, mode: rule.mode, showAbout: rule.showAbout };
    }
  }
  return { response: FALLBACK };
}
