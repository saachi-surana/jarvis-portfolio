"use client";

import Panel from "@/components/ui/Panel";
import CircularGauge from "@/components/ui/CircularGauge";

interface VitalsPanelProps {
  shouldAnimate?: boolean;
}

const VITALS = [
  { label: "NEURAL", value: 70 },
  { label: "CPU",    value: 12 },
  { label: "MEMORY", value: 31 },
];

export default function VitalsPanel({ shouldAnimate }: VitalsPanelProps) {
  return (
    <Panel label="// VITALS" sectionId="vitals">
      <div className="grid grid-cols-3 gap-x-1 place-items-center">
        {VITALS.map((v) => (
          <CircularGauge
            key={v.label}
            value={v.value}
            label={v.label}
            size={76}
            color="purple"
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>
    </Panel>
  );
}
