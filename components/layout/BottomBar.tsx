"use client";

import { useEffect, useState } from "react";
import { useScrollStore } from "@/lib/scrollStore";

export default function BottomBar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const setProgress = useScrollStore((s) => s.setProgress);

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
      className="flex items-center px-6 h-8 bg-[#050a0a] shrink-0"
    >
      {/* Left */}
      <div className="flex items-center gap-6 flex-1">
        <button
          onClick={() => setProgress(0)}
          className="font-mono text-[0.55rem] text-[#2d3748] tracking-[0.2em] uppercase hover:text-[#475569] transition-colors duration-300 hidden md:inline"
          style={{ background: 'transparent', border: 'none', padding: 0 }}
        >
          // RESTART
        </button>
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em] uppercase">
          // OPERATOR: SAACHI SURANA
        </span>
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em] hidden sm:inline">
          CS @ UNIVERSITY OF WASHINGTON
        </span>
      </div>

      {/* Center — attribution */}
      <div className="flex items-center justify-center flex-1">
        <span className="font-mono text-[0.55rem] tracking-[0.2em] text-[#475569] uppercase">
          DESIGNED &amp; BUILT BY SAACHI SURANA
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6 justify-end flex-1">
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em] hidden sm:inline">
          {date}
        </span>
        <span className="font-mono text-[0.65rem] text-[#00e5ff] tracking-[0.2em]">
          {time}
        </span>
      </div>
    </footer>
  );
}
