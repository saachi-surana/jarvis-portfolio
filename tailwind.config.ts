import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#000000",
          panel: "#050a0a",
          overlay: "#020808",
        },
        cyan: {
          DEFAULT: "#00e5ff",
          dim: "#00b8cc",
          ghost: "rgba(0,229,255,0.08)",
          border: "rgba(0,229,255,0.18)",
          glow: "rgba(0,229,255,0.35)",
        },
        purple: {
          DEFAULT: "#c084fc",
          dim: "#9b5fd4",
          ghost: "rgba(192,132,252,0.08)",
          glow: "rgba(192,132,252,0.3)",
        },
        text: {
          primary: "#ffffff",
          secondary: "#94a3b8",
          muted: "#475569",
          cyan: "#00e5ff",
          purple: "#c084fc",
        },
        status: {
          online: "#00e5ff",
          warning: "#f59e0b",
          error: "#ef4444",
          offline: "#475569",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "monospace"],
        ui: ["var(--font-rajdhani)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      fontSize: {
        hero: "clamp(3rem, 8vw, 7rem)",
        section: "clamp(0.6rem, 1vw, 0.75rem)",
        panel: "1.1rem",
        data: "0.8rem",
        micro: "0.65rem",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
      },
      boxShadow: {
        "glow-cyan": "0 0 12px rgba(0,229,255,0.35), 0 0 40px rgba(0,229,255,0.1)",
        "glow-purple": "0 0 12px rgba(192,132,252,0.3), 0 0 40px rgba(192,132,252,0.1)",
      },
      letterSpacing: {
        widest: "0.2em",
        wider: "0.15em",
      },
    },
  },
  plugins: [],
};

export default config;
