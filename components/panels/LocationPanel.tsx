"use client";

import Panel from "@/components/ui/Panel";
import DataRow from "@/components/ui/DataRow";

const ROWS = [
  { label: "CITY",    value: "SEATTLE WA",           color: "white"  as const },
  { label: "WEATHER", value: "RAIN",                  color: "cyan"   as const },
  { label: "SEASON",  value: "SPRING 2026",           color: "white"  as const },
  { label: "COORDS",  value: "47.6062°N 122.3321°W", color: "muted"  as const },
];

export default function LocationPanel() {
  return (
    <Panel label="// LOCATION">
      <div className="flex flex-col gap-[2px]">
        {ROWS.map((r) => (
          <DataRow key={r.label} label={r.label} value={r.value} valueColor={r.color} />
        ))}
      </div>
    </Panel>
  );
}
