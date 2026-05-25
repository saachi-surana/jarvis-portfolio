"use client";

import Panel from "@/components/ui/Panel";
import BarGauge from "@/components/ui/BarGauge";

interface SkillsPanelProps {
  shouldAnimate?: boolean;
}

const SKILLS = [
  { label: "PYTHON",     value: 85 },
  { label: "TYPESCRIPT", value: 80 },
  { label: "GO",         value: 70 },
  { label: "REACT/NEXT", value: 80 },
  { label: "AI/ML",      value: 75 },
  { label: "SYSTEMS",    value: 75 },
];

export default function SkillsPanel({ shouldAnimate }: SkillsPanelProps) {
  return (
    <Panel label="// SKILLS_MATRIX">
      <div className="flex flex-col gap-3">
        {SKILLS.map((s) => (
          <BarGauge
            key={s.label}
            label={s.label}
            value={s.value}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>
    </Panel>
  );
}
