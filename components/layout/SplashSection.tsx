"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import BootSequence from "@/components/effects/BootSequence";
import ScrollIndicator from "@/components/effects/ScrollIndicator";

const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false,
  loading: () => null,
});

const LABEL: React.CSSProperties = {
  position: "absolute",
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.6rem",
  letterSpacing: "0.18em",
  color: "rgba(0,184,204,0.75)",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  pointerEvents: "none",
  userSelect: "none",
};

export default function SplashSection() {
  const [booted, setBooted] = useState(false);

  // Always start at the top — prevents browser scroll restoration from loading into HUD
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <section
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        background: "#000",
        // No overflow:hidden — allows free scroll in both directions
      }}
    >
      {/* Boot sequence — runs once, unmounts on complete */}
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {/* Reactor — always mounted, never conditionally rendered */}
      <div style={{ position: "absolute", inset: 0 }}>
        <ArcReactor fullScreen />
      </div>

      {/* Coordinate labels (SplashSection owns these; HUD reactor suppresses its own) */}
      <span style={{ ...LABEL, top: "12%", left: "50%", transform: "translateX(-50%)" }}>
        47.6062°N
      </span>
      <span style={{ ...LABEL, bottom: "12%", left: "50%", transform: "translateX(-50%)" }}>
        122.3321°W
      </span>
      <span style={{ ...LABEL, top: "50%", left: "8%", transform: "translateY(-50%)" }}>
        ALT: 52M
      </span>
      <span style={{ ...LABEL, top: "50%", right: "8%", transform: "translateY(-50%)" }}>
        SEC: NOMINAL
      </span>

      <ScrollIndicator />
    </section>
  );
}
