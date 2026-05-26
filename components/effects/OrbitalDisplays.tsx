"use client";

import OrbitalDisplayItem from "./OrbitalDisplayItem";
import type { OrbitalDisplay } from "./OrbitalDisplayItem";

const DISPLAYS: OrbitalDisplay[] = [
  {
    id: "neural", label: "NEURAL LINK", size: 108,
    ringColor: "#00e5ff", centerColor: "#ffffff", glowColor: "rgba(0,229,255,0.45)",
    duration: "2.8s", centerPulse: true, centerOpacity: 1,
  },
  {
    id: "quantum", label: "QUANTUM CORE", size: 120,
    ringColor: "#c084fc", centerColor: "#ffffff", glowColor: "rgba(192,132,252,0.5)",
    duration: "2.1s", centerPulse: false, centerOpacity: 1,
  },
  {
    id: "storage", label: "STORAGE ARRAY", size: 108,
    ringColor: "#00b8cc", centerColor: "#00b8cc", glowColor: "rgba(0,184,204,0.3)",
    duration: "4.5s", centerPulse: false, centerOpacity: 0.35,
  },
];

export default function OrbitalDisplays() {
  return (
    <>
      <style>{`
        @keyframes orbital-spin     { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes orbital-spin-rev { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
        @keyframes orbital-dot-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.7); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 24, padding: "10px 16px",
        borderTop:    "1px solid rgba(0,229,255,0.25)",
        borderBottom: "1px solid rgba(0,229,255,0.25)",
        background: "rgba(0,0,0,0.6)",
        position: "relative", flexShrink: 0,
      }}>
        <span aria-hidden style={{
          position: "absolute", top: -1, left: -1, width: 12, height: 12,
          borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff", pointerEvents: "none",
        }} />
        <span aria-hidden style={{
          position: "absolute", bottom: -1, right: -1, width: 12, height: 12,
          borderBottom: "2px solid #00e5ff", borderRight: "2px solid #00e5ff", pointerEvents: "none",
        }} />

        {DISPLAYS.map((d) => <OrbitalDisplayItem key={d.id} d={d} />)}
      </div>
    </>
  );
}
