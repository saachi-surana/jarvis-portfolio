"use client";

import type { MouseZone } from "@/lib/mouseZoneStore";

interface CompassRoseProps {
  zone: MouseZone;
}

const DIRS = [
  { key: "E", label: "PROJECTS",   matchZone: "PROJECTS"   as MouseZone, dx:  1, dy:  0 },
  { key: "N", label: "EXPERIENCE", matchZone: "EXPERIENCE" as MouseZone, dx:  0, dy: -1 },
  { key: "W", label: "ABOUT",      matchZone: "IDENTITY"   as MouseZone, dx: -1, dy:  0 },
  { key: "S", label: "CONTACT",    matchZone: "CONTACT"    as MouseZone, dx:  0, dy:  1 },
] as const;

// SVG viewBox: 0 0 100 100, center at (50,50)
// Tick marks radiate from radius 28 to 34 (normal) or 38 (active)
const R_INNER = 28;
const R_OUTER_N = 34;
const R_OUTER_A = 38;
const R_LABEL   = 44;

export default function CompassRose({ zone }: CompassRoseProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden
      style={{ zIndex: 5 }}
    >
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {DIRS.map(({ key, label, matchZone, dx, dy }) => {
          const active = zone === matchZone;
          const rOuter = active ? R_OUTER_A : R_OUTER_N;
          const x1 = 50 + dx * R_INNER;
          const y1 = 50 + dy * R_INNER;
          const x2 = 50 + dx * rOuter;
          const y2 = 50 + dy * rOuter;
          const lx = 50 + dx * R_LABEL;
          const ly = 50 + dy * R_LABEL;

          return (
            <g key={key}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={active ? "#00e5ff" : "rgba(0,229,255,0.2)"}
                strokeWidth={active ? 0.6 : 0.4}
                style={{ transition: "stroke 300ms ease, stroke-width 300ms ease" }}
              />
              <text
                x={lx} y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={active ? "rgba(0,229,255,0.6)" : "rgba(0,229,255,0.15)"}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 3.6,
                  letterSpacing: 0.6,
                  transition: "fill 300ms ease",
                }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Center crosshair dot */}
        <circle
          cx={50} cy={50} r={0.8}
          fill="rgba(0,229,255,0.3)"
        />
      </svg>
    </div>
  );
}
