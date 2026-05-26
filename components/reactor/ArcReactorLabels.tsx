"use client";

import { Html } from "@react-three/drei";
import { C_CYAN_DIM } from "@/lib/constants";

const LABEL_STYLE: React.CSSProperties = {
  fontFamily:    "'Space Mono', monospace",
  fontSize:      "0.6rem",
  letterSpacing: "0.18em",
  color:         `rgba(0,184,204,0.75)`,
  textTransform: "uppercase" as const,
  whiteSpace:    "nowrap",
  pointerEvents: "none",
  userSelect:    "none",
};

const LABELS = [
  { pos: [0,  3.6, 0] as [number,number,number], text: "47.6062°N",    anchor: "center" },
  { pos: [0, -3.6, 0] as [number,number,number], text: "122.3321°W",   anchor: "center" },
  { pos: [-3.8, 0, 0] as [number,number,number], text: "ALT: 52M",     anchor: "right"  },
  { pos: [ 3.8, 0, 0] as [number,number,number], text: "SEC: NOMINAL", anchor: "left"   },
];

// Suppress unused-import warning; C_CYAN_DIM used for the base rgba
void C_CYAN_DIM;

export function DataLabels() {
  return (
    <>
      {LABELS.map((l) => (
        <Html key={l.text} position={l.pos} style={{ pointerEvents: "none" }}>
          <span style={{ ...LABEL_STYLE, display: "block", textAlign: l.anchor as "center" | "left" | "right" }}>
            {l.text}
          </span>
        </Html>
      ))}
    </>
  );
}
