"use client";

import { useState, useCallback } from "react";
import BootSequence from "@/components/effects/BootSequence";
import ScrollIndicator from "@/components/effects/ScrollIndicator";

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

interface SplashSectionProps {
  onBootComplete?: () => void;
}

export default function SplashSection({ onBootComplete }: SplashSectionProps) {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    onBootComplete?.();
  }, [onBootComplete]);

  return (
    <section
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        background: "transparent",
        // Reactor is rendered in its own permanent layer in page.tsx (always mounted)
      }}
    >
      {/* Boot sequence — runs once, unmounts on complete */}
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {/* Coordinate labels */}
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
