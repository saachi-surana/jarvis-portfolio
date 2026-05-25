"use client";

import { useEffect, useState } from "react";
import Panel from "@/components/ui/Panel";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function ClockPanel() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    : "--:--:--";

  const date = now
    ? `${DAYS[now.getDay()]} ${pad(now.getDate())} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`
    : "--- -- --- ----";

  return (
    <Panel label="// CLOCK">
      <div className="font-mono text-[1.6rem] leading-none tracking-[0.08em] text-[#00e5ff] tabular-nums">
        {time}
      </div>
      <div className="font-mono text-[0.62rem] tracking-[0.2em] text-[#475569] uppercase mt-2">
        {date}
      </div>
    </Panel>
  );
}
