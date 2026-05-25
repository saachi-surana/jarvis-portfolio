"use client";

import { useEffect, useState } from "react";

export default function BottomBar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setDate(
        now
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
          .toUpperCase()
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      style={{ borderTop: "1px solid rgba(0,229,255,0.18)" }}
      className="flex items-center justify-between px-6 h-8 bg-[#050a0a] shrink-0"
    >
      <div className="flex items-center gap-6">
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em] uppercase">
          // OPERATOR: SAACHI SURANA
        </span>
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em]">
          CS @ UNIVERSITY OF WASHINGTON
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em]">
          {date}
        </span>
        <span className="font-mono text-[0.65rem] text-[#00e5ff] tracking-[0.2em]">
          {time}
        </span>
      </div>
    </footer>
  );
}
