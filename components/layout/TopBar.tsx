"use client";

import { useCallback, useEffect } from "react";
import { GlitchTitle } from "@/components/effects/GlitchEffect";

export default function TopBar() {
  const goHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") goHome(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goHome]);

  return (
    <header
      className="flex items-center justify-between px-6 bg-[#070d0d] shrink-0 overflow-hidden relative"
      style={{ borderBottom: "1px solid rgba(0,229,255,0.25)", height: 52 }}
    >
      {/* Horizontal scan line sweeping left to right */}
      <div
        className="topbar-scan"
        aria-hidden
        style={{ position: "absolute", top: 0, left: "-4px", width: 4, height: "100%", background: "rgba(0,229,255,0.15)", pointerEvents: "none", zIndex: 10 }}
      />

      <div className="flex items-center gap-6 relative z-0">
        {/* HOME — scrolls back to top, very muted */}
        <button
          onClick={goHome}
          className="font-mono tracking-[0.2em] uppercase text-[#2d3748] hover:text-[#475569] transition-colors duration-200 shrink-0"
          style={{ fontSize: "0.55rem", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
        >
          // HOME
        </button>

        <div className="flex flex-col gap-[2px]">
          <GlitchTitle
            text="J.A.R.V.I.S"
            className="font-display text-xs tracking-[0.2em] text-[#00e5ff] uppercase leading-none"
          />
          <span
            className="font-mono uppercase"
            style={{ fontSize: "0.5rem", letterSpacing: "0.3em", color: "rgba(0,229,255,0.4)", lineHeight: 1 }}
          >
            JUST A RATHER VERY INTELLIGENT SYSTEM
          </span>
        </div>
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em] uppercase">
          // INTERFACE v7.3.1
        </span>
      </div>

      <div className="flex items-center gap-4 relative z-0">
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em] uppercase">
          // SYSTEM ONLINE
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
          <span className="font-mono text-[0.65rem] text-[#00e5ff] tracking-[0.2em] uppercase">
            ACTIVE
          </span>
        </span>
      </div>
    </header>
  );
}
