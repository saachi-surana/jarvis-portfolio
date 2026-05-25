"use client";

import { useEffect, useRef } from "react";

interface BarGaugeProps {
  label: string;
  value: number;
  shouldAnimate?: boolean;
}

export default function BarGauge({ label, value, shouldAnimate = true }: BarGaugeProps) {
  const barRef  = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const start = performance.now();
    const dur   = 1000;

    const tick = (now: number) => {
      const t      = Math.min((now - start) / dur, 1);
      const eased  = 1 - Math.pow(1 - t, 3);
      const current = value * eased;

      if (barRef.current)  barRef.current.style.width = `${current}%`;
      if (textRef.current) textRef.current.textContent = `${Math.round(current)}%`;

      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldAnimate, value]);

  return (
    <div className="flex flex-col gap-[4px]">
      <div className="flex justify-between items-baseline">
        <span className="font-mono text-[0.58rem] tracking-[0.15em] text-[#475569] uppercase">
          {label}
        </span>
        <span
          ref={textRef}
          className="font-mono text-[0.62rem] text-[#00e5ff] tabular-nums"
        >
          0%
        </span>
      </div>
      <div
        className="h-[2px] w-full"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          ref={barRef}
          className="h-full"
          style={{
            width: "0%",
            background: "#00e5ff",
            boxShadow: "0 0 6px rgba(0,229,255,0.45)",
          }}
        />
      </div>
    </div>
  );
}
