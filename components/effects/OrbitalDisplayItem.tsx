"use client";

export interface OrbitalDisplay {
  id:            string;
  label:         string;
  size:          number;
  ringColor:     string;
  centerColor:   string;
  glowColor:     string;
  duration:      string;
  centerPulse:   boolean;
  centerOpacity: number;
}

export default function OrbitalDisplayItem({ d }: { d: OrbitalDisplay }) {
  const { size, ringColor, centerColor, glowColor, duration, centerPulse, centerOpacity, label } = d;
  const half  = size / 2;
  const rOuter = half - 2;
  const rSpin  = half - 6;
  const rInner = half - 16;
  const innerDur = `${parseFloat(duration) * 1.7}s`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>

        {/* Static outer border */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", inset: 0 }}>
          <circle cx={half} cy={half} r={rOuter} fill="none" stroke="rgba(0,229,255,0.12)" strokeWidth="1" />
          <circle cx={half} cy={half} r={rOuter} fill="none" stroke={ringColor} strokeWidth="0.5" opacity="0.25" />
        </svg>

        {/* Rotating dashed ring */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
          style={{ position: "absolute", inset: 0, animation: `orbital-spin ${duration} linear infinite`, filter: `drop-shadow(0 0 4px ${ringColor})` }}>
          <circle cx={half} cy={half} r={rSpin} fill="none" stroke={ringColor}
            strokeWidth="1.5" strokeDasharray="6 14" strokeLinecap="square" />
        </svg>

        {/* Counter-rotating inner tick ring */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
          style={{ position: "absolute", inset: 0, animation: `orbital-spin-rev ${innerDur} linear infinite`, opacity: 0.5 }}>
          <circle cx={half} cy={half} r={rInner} fill="none" stroke={ringColor}
            strokeWidth="1" strokeDasharray="2 10" strokeLinecap="square" />
        </svg>

        {/* Center dot */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 6, height: 6, borderRadius: "50%",
          background: centerColor, opacity: centerOpacity,
          boxShadow: `0 0 8px ${glowColor}, 0 0 16px ${glowColor}`,
          animation: centerPulse ? "orbital-dot-pulse 1.8s ease-in-out infinite" : undefined,
        }} />

        {/* Glow overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 65%)`,
          opacity: 0.18, pointerEvents: "none",
        }} />
      </div>

      <span style={{
        fontFamily: "'Space Mono', monospace", fontSize: "0.55rem",
        letterSpacing: "0.18em", color: "rgba(0,184,204,0.65)",
        textTransform: "uppercase", whiteSpace: "nowrap", userSelect: "none",
      }}>
        {label}
      </span>
    </div>
  );
}
