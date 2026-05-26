import type { ReactorMode } from "@/lib/store";

// ─── Color tokens ─────────────────────────────────────────────────────────────
export const C_CYAN       = "#00e5ff";
export const C_CYAN_DIM   = "#00b8cc";
export const C_PURPLE     = "#c084fc";
export const C_PURPLE_DIM = "#9b5fd4";
export const C_WHITE      = "#ffffff";
export const C_BODY       = "#e2e8f0";
export const C_MUTED      = "#64748b";
export const C_MUTED_DARK = "#475569";
export const C_SECONDARY  = "#94a3b8";
export const C_BG         = "#000000";
export const C_BG_PANEL   = "#070d0d";
export const C_BG_OVERLAY = "#020808";

// ─── Border / shadow ─────────────────────────────────────────────────────────
export const CYAN_BORDER     = "rgba(0,229,255,0.25)";
export const CYAN_BORDER_DIM = "rgba(0,229,255,0.12)";
export const CYAN_GHOST      = "rgba(0,229,255,0.08)";
export const GLOW_INSET      = "inset 0 0 12px rgba(0,229,255,0.04)";

// ─── Animation timing ────────────────────────────────────────────────────────
export const DUR_CHAT_CHAR    = 25;   // ms — JarvisChat typewriter
export const DUR_BOOT_CHAR    = 32;   // ms — BootSequence typewriter
export const SPRING_STIFFNESS = 300;
export const SPRING_DAMPING   = 30;
export const EASE_REVEAL      = [0.16, 1, 0.3, 1] as const;

// ─── Reactor mode config ─────────────────────────────────────────────────────
export const MODE_COLORS: Record<ReactorMode, string> = {
  "online":    "",
  "red-alert": "#ff3333",
  "stealth":   "#1a0a2e",
  "overdrive": "",
};

export const MODE_INTENSITY_MULT: Record<ReactorMode, number> = {
  "online":    1.0,
  "red-alert": 1.6,
  "stealth":   0.22,
  "overdrive": 2.8,
};

export const MODE_SPEED_MULT: Record<ReactorMode, number> = {
  "online":    1.0,
  "red-alert": 1.4,
  "stealth":   0.28,
  "overdrive": 2.6,
};

// ─── Reactor geometry ────────────────────────────────────────────────────────
export const CASING_RADIUS = 3.25;
export const CASING_SEG    = 48;
export const CASING_GAP    = 0.045; // radians gap between casing segments
export const TICK_COUNT    = 48;
export const TICK_RADIUS   = 3.05;

// ─── Particle config ─────────────────────────────────────────────────────────
export const BURST_COUNT = 100;
