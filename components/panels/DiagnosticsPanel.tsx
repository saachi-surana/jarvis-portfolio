"use client";

import Panel from "@/components/ui/Panel";
import CircularGauge from "@/components/ui/CircularGauge";

interface DiagnosticsPanelProps {
  shouldAnimate?: boolean;
}

const GAUGES = [
  { value: 94,  label: "POWER",  color: "cyan"   as const },
  { value: 87,  label: "GRID",   color: "purple" as const },
  { value: 93,  label: "SHIELD", color: "cyan"   as const },
  { value: 100, label: "COMMS",  color: "cyan"   as const },
];

export default function DiagnosticsPanel({ shouldAnimate = true }: DiagnosticsPanelProps) {
  return (
    <Panel label="// DIAGNOSTICS">
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 place-items-center">
        {GAUGES.map((g) => (
          <CircularGauge
            key={g.label}
            value={g.value}
            label={g.label}
            color={g.color}
            size={86}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>
    </Panel>
  );
}
