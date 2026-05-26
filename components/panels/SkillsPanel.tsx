"use client";

import Panel from "@/components/ui/Panel";
import BarGauge from "@/components/ui/BarGauge";

interface SkillsPanelProps {
  shouldAnimate?: boolean;
}

// Values are relative only — no percentages displayed.
// STRONGEST: Python, ML/AI, Java
// STRONG:    React/Next.js, TypeScript/JS, Data
// FAMILIAR:  HTML/CSS, C/C++
const SKILLS = [
  { label: "PYTHON",       value: 93 },
  { label: "ML/AI",        value: 90 },
  { label: "JAVA",         value: 88 },
  { label: "REACT/NEXT.JS",value: 80 },
  { label: "TYPESCRIPT/JS",value: 79 },
  { label: "DATA",         value: 78 },
  { label: "HTML/CSS",     value: 65 },
  { label: "C/C++",        value: 62 },
];

export default function SkillsPanel({ shouldAnimate }: SkillsPanelProps) {
  return (
    <Panel label="// SKILLS_MATRIX" sectionId="skills">
      <div className="flex flex-col gap-3">
        {SKILLS.map((s, i) => (
          <BarGauge
            key={s.label}
            label={s.label}
            value={s.value}
            shouldAnimate={shouldAnimate}
            showPercent={false}
            index={i}
          />
        ))}
      </div>
    </Panel>
  );
}
