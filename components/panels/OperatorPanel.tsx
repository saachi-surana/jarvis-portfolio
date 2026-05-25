"use client";

import Panel from "@/components/ui/Panel";
import DataRow from "@/components/ui/DataRow";

const ROWS = [
  { label: "STATUS",      value: "STUDENT // DEVELOPER", color: "cyan"  as const },
  { label: "INSTITUTION", value: "UNIV OF WASHINGTON",   color: "white" as const },
  { label: "MAJOR",       value: "COMPUTER SCIENCE",     color: "white" as const },
  { label: "CLASS",       value: "2028",                 color: "white" as const },
];

export default function OperatorPanel() {
  return (
    <Panel label="// OPERATOR">
      <div className="flex flex-col gap-[2px]">
        {ROWS.map((r) => (
          <DataRow key={r.label} label={r.label} value={r.value} valueColor={r.color} />
        ))}
      </div>
    </Panel>
  );
}
