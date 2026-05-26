"use client";

import Panel from "@/components/ui/Panel";
import BarGauge from "@/components/ui/BarGauge";

interface SkillsPanelProps {
  shouldAnimate?: boolean;
}

const SKILLS = [
  { label: "PYTHON",       value: 90 },
  { label: "TYPESCRIPT/JS",value: 80 },
  { label: "REACT/NEXT.JS",value: 80 },
  { label: "ML/AI",        value: 85 },
  { label: "JAVA",         value: 70 },
  { label: "DATA",         value: 75 },
];

export default function SkillsPanel({ shouldAnimate }: SkillsPanelProps) {
  return (
    <Panel label="// SKILLS_MATRIX" sectionId="skills">
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
