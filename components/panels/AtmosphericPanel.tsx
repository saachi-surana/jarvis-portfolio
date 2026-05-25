"use client";

import Panel from "@/components/ui/Panel";
import CircularGauge from "@/components/ui/CircularGauge";

interface AtmosphericPanelProps {
  shouldAnimate?: boolean;
}

// 29.91 inHg mapped on scale 28.0–31.0 → ~64%
const BARO_VALUE = Math.round(((29.91 - 28.0) / (31.0 - 28.0)) * 100);

export default function AtmosphericPanel({ shouldAnimate = true }: AtmosphericPanelProps) {
  return (
    <Panel label="// ATMOSPHERIC">
      <div className="flex flex-col items-center gap-2">
        <CircularGauge
          value={BARO_VALUE}
          label="BARO PRESSURE"
          size={104}
          color="cyan"
          unit="%"
          shouldAnimate={shouldAnimate}
        />
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-mono text-[1.1rem] tracking-[0.04em] text-[#00e5ff] tabular-nums">
            29.91
          </span>
          <span className="font-mono text-[0.62rem] tracking-[0.15em] text-[#475569] uppercase">
            inHg
          </span>
        </div>
      </div>
    </Panel>
  );
}
