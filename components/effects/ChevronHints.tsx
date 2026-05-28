"use client";

import type { MouseZone } from "@/lib/mouseZoneStore";

interface ChevronHintsProps {
  zone: MouseZone;
}

const CHEVRONS: Array<{ dir: MouseZone; symbol: string; style: React.CSSProperties }> = [
  { dir: "IDENTITY",   symbol: "<", style: { left: 8,  top: "50%", transform: "translateY(-50%)" } },
  { dir: "PROJECTS",   symbol: ">", style: { right: 8, top: "50%", transform: "translateY(-50%)" } },
  { dir: "EXPERIENCE", symbol: "^", style: { top: 8,  left: "50%", transform: "translateX(-50%)" } },
  { dir: "CONTACT",    symbol: "v", style: { bottom: 8, left: "50%", transform: "translateX(-50%)" } },
];

export default function ChevronHints({ zone }: ChevronHintsProps) {
  return (
    <>
      {CHEVRONS.map(({ dir, symbol, style }) => {
        const active = zone === dir;
        return (
          <span
            key={dir}
            style={{
              position: "absolute",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0",
              color: active ? "rgba(0,229,255,0.75)" : "rgba(0,229,255,0.18)",
              animation: active ? "chevronPulse 1.2s ease-in-out infinite" : "none",
              transition: "color 0.3s ease",
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 5,
              ...style,
            }}
          >
            {symbol}
          </span>
        );
      })}
    </>
  );
}
