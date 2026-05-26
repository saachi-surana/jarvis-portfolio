"use client";

import { motion } from "framer-motion";

interface BarGaugeProps {
  label: string;
  value: number;
  shouldAnimate?: boolean;
  showPercent?: boolean;
  index?: number;
}

export default function BarGauge({
  label,
  value,
  shouldAnimate = true,
  showPercent = true,
  index = 0,
}: BarGaugeProps) {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className={`flex ${showPercent ? "justify-between" : ""} items-baseline`}>
        <span className="font-ui font-semibold text-[0.78rem] tracking-[0.1em] text-white uppercase"
          style={{ textShadow: "0 0 8px rgba(255,255,255,0.08)" }}
        >
          {label}
        </span>
        {showPercent && (
          <span className="font-mono text-[0.62rem] text-[#00e5ff] tabular-nums">
            {value}%
          </span>
        )}
      </div>
      <div
        className="h-[2px] w-full"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full"
          initial={{ width: shouldAnimate ? "0%" : `${value}%` }}
          animate={{ width: `${value}%` }}
          transition={shouldAnimate ? {
            duration: 0.9,
            delay: index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          } : { duration: 0 }}
          style={{
            background: "#00e5ff",
            boxShadow: "0 0 6px rgba(0,229,255,0.45)",
          }}
        />
      </div>
    </div>
  );
}
