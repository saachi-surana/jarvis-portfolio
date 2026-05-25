"use client";

import { useEffect, useRef, useState } from "react";

interface CircularGaugeProps {
  value: number;        // 0–100
  label: string;
  size?: number;        // outer diameter px
  color?: "cyan" | "purple";
  unit?: string;
  shouldAnimate?: boolean;
}

export default function CircularGauge({
  value,
  label,
  size = 84,
  color = "cyan",
  unit = "%",
  shouldAnimate = true,
}: CircularGaugeProps) {
  const strokeColor = color === "cyan" ? "#00e5ff" : "#c084fc";
  const glowColor   = color === "cyan" ? "rgba(0,229,255,0.5)" : "rgba(192,132,252,0.5)";

  const strokeW = 2;
  const radius  = (size - 12 - strokeW * 2) / 2;
  const cx      = size / 2;
  const cy      = size / 2;
  const circ    = 2 * Math.PI * radius;

  const [fill, setFill]     = useState(0);   // 0–100
  const [arcOn, setArcOn]   = useState(false);
  const rafRef              = useRef<number>(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    // Give the browser a frame to register the initial dashoffset before CSS transition kicks in
    const tid = setTimeout(() => setArcOn(true), 50);

    // Counter animation
    const start   = performance.now();
    const dur     = 1200;
    const tick = (now: number) => {
      const t      = Math.min((now - start) / dur, 1);
      const eased  = 1 - Math.pow(1 - t, 3);   // ease-out cubic
      setFill(value * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(tid);
      cancelAnimationFrame(rafRef.current);
    };
  }, [shouldAnimate, value]);

  const dashOffset = circ - (fill / 100) * circ;

  // Tick marks on outer ring
  const TICKS = 32;
  const ticks = Array.from({ length: TICKS }, (_, i) => {
    const angle   = (i / TICKS) * 360 - 90;
    const rad     = (angle * Math.PI) / 180;
    const major   = i % 8 === 0;
    const rOuter  = size / 2 - 2;
    const rInner  = size / 2 - (major ? 7 : 5);
    return {
      x1: cx + rOuter * Math.cos(rad),
      y1: cy + rOuter * Math.sin(rad),
      x2: cx + rInner * Math.cos(rad),
      y2: cy + rInner * Math.sin(rad),
      major,
    };
  });

  return (
    <div className="flex flex-col items-center gap-[3px]">
      <svg width={size} height={size} className="overflow-visible" aria-label={`${label}: ${value}${unit}`}>
        {/* Background track */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeW}
        />

        {/* Animated value arc */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeW}
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={arcOn ? dashOffset : circ}
          strokeLinecap="butt"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{
            transition: arcOn
              ? "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)"
              : "none",
            filter: `drop-shadow(0 0 3px ${glowColor})`,
          }}
        />

        {/* Tick marks */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.major ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}
            strokeWidth={t.major ? 1.2 : 0.7}
          />
        ))}

        {/* Center numeric readout */}
        <text
          x={cx} y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill={strokeColor}
          fontSize="13"
          fontFamily="'Space Mono', monospace"
          fontWeight="700"
        >
          {Math.round(fill)}{unit}
        </text>
      </svg>

      <span className="font-mono text-[0.52rem] tracking-[0.15em] text-[#475569] uppercase">
        {label}
      </span>
    </div>
  );
}
