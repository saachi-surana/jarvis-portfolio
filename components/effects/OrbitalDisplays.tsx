"use client";

interface OrbitalDisplay {
  id: string;
  label: string;
  size: number;
  ringColor: string;
  centerColor: string;
  glowColor: string;
  duration: string;
  centerPulse: boolean;
  centerOpacity: number;
}

const DISPLAYS: OrbitalDisplay[] = [
  {
    id:            "neural",
    label:         "NEURAL LINK",
    size:          108,
    ringColor:     "#00e5ff",
    centerColor:   "#ffffff",
    glowColor:     "rgba(0,229,255,0.45)",
    duration:      "2.8s",
    centerPulse:   true,
    centerOpacity: 1,
  },
  {
    id:            "quantum",
    label:         "QUANTUM CORE",
    size:          120,
    ringColor:     "#c084fc",
    centerColor:   "#ffffff",
    glowColor:     "rgba(192,132,252,0.5)",
    duration:      "2.1s",
    centerPulse:   false,
    centerOpacity: 1,
  },
  {
    id:            "storage",
    label:         "STORAGE ARRAY",
    size:          108,
    ringColor:     "#00b8cc",
    centerColor:   "#00b8cc",
    glowColor:     "rgba(0,184,204,0.3)",
    duration:      "4.5s",
    centerPulse:   false,
    centerOpacity: 0.35,
  },
];

export default function OrbitalDisplays() {
  return (
    <>
      <style>{`
        @keyframes orbital-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbital-spin-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes orbital-dot-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.7); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "10px 16px",
          borderTop:    "1px solid rgba(0,229,255,0.25)",
          borderBottom: "1px solid rgba(0,229,255,0.25)",
          background: "rgba(0,0,0,0.6)",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Corner brackets on the row container */}
        <span aria-hidden style={{
          position: "absolute", top: -1, left: -1, width: 12, height: 12,
          borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff",
          pointerEvents: "none",
        }} />
        <span aria-hidden style={{
          position: "absolute", bottom: -1, right: -1, width: 12, height: 12,
          borderBottom: "2px solid #00e5ff", borderRight: "2px solid #00e5ff",
          pointerEvents: "none",
        }} />

        {DISPLAYS.map((d) => (
          <div
            key={d.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {/* SVG display circle */}
            <div
              style={{
                width:    d.size,
                height:   d.size,
                position: "relative",
                flexShrink: 0,
              }}
            >
              {/* Static outer border */}
              <svg
                width={d.size}
                height={d.size}
                viewBox={`0 0 ${d.size} ${d.size}`}
                style={{ position: "absolute", inset: 0 }}
              >
                <circle
                  cx={d.size / 2}
                  cy={d.size / 2}
                  r={d.size / 2 - 2}
                  fill="none"
                  stroke="rgba(0,229,255,0.12)"
                  strokeWidth="1"
                />
                {/* Glow border */}
                <circle
                  cx={d.size / 2}
                  cy={d.size / 2}
                  r={d.size / 2 - 2}
                  fill="none"
                  stroke={d.ringColor}
                  strokeWidth="0.5"
                  opacity="0.25"
                />
              </svg>

              {/* Rotating dashed ring */}
              <svg
                width={d.size}
                height={d.size}
                viewBox={`0 0 ${d.size} ${d.size}`}
                style={{
                  position:  "absolute",
                  inset:     0,
                  animation: `orbital-spin ${d.duration} linear infinite`,
                  filter:    `drop-shadow(0 0 4px ${d.ringColor})`,
                }}
              >
                <circle
                  cx={d.size / 2}
                  cy={d.size / 2}
                  r={d.size / 2 - 6}
                  fill="none"
                  stroke={d.ringColor}
                  strokeWidth="1.5"
                  strokeDasharray="6 14"
                  strokeLinecap="square"
                />
              </svg>

              {/* Counter-rotating inner tick ring */}
              <svg
                width={d.size}
                height={d.size}
                viewBox={`0 0 ${d.size} ${d.size}`}
                style={{
                  position:  "absolute",
                  inset:     0,
                  animation: `orbital-spin-rev ${parseFloat(d.duration) * 1.7}s linear infinite`,
                  opacity:   0.5,
                }}
              >
                <circle
                  cx={d.size / 2}
                  cy={d.size / 2}
                  r={d.size / 2 - 16}
                  fill="none"
                  stroke={d.ringColor}
                  strokeWidth="1"
                  strokeDasharray="2 10"
                  strokeLinecap="square"
                />
              </svg>

              {/* Center dot */}
              <div
                style={{
                  position:        "absolute",
                  top:             "50%",
                  left:            "50%",
                  transform:       "translate(-50%, -50%)",
                  width:           6,
                  height:          6,
                  borderRadius:    "50%",
                  background:      d.centerColor,
                  opacity:         d.centerOpacity,
                  boxShadow:       `0 0 8px ${d.glowColor}, 0 0 16px ${d.glowColor}`,
                  animation:       d.centerPulse ? "orbital-dot-pulse 1.8s ease-in-out infinite" : undefined,
                }}
              />

              {/* Glow overlay */}
              <div
                style={{
                  position:     "absolute",
                  inset:        0,
                  borderRadius: "50%",
                  background:   `radial-gradient(ellipse at center, ${d.glowColor} 0%, transparent 65%)`,
                  opacity:      0.18,
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Label */}
            <span
              style={{
                fontFamily:    "'Space Mono', monospace",
                fontSize:      "0.55rem",
                letterSpacing: "0.18em",
                color:         "rgba(0,184,204,0.65)",
                textTransform: "uppercase",
                whiteSpace:    "nowrap",
                userSelect:    "none",
              }}
            >
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
