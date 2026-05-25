"use client";

export default function TopBar() {
  return (
    <header
      style={{ borderBottom: "1px solid rgba(0,229,255,0.18)" }}
      className="flex items-center justify-between px-6 h-10 bg-[#050a0a] shrink-0"
    >
      <div className="flex items-center gap-6">
        <span className="font-display text-xs tracking-[0.2em] text-[#00e5ff] uppercase">
          J.A.R.V.I.S
        </span>
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em] uppercase">
          // INTERFACE v7.3.1
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em] uppercase">
          // SYSTEM ONLINE
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
          <span className="font-mono text-[0.65rem] text-[#00e5ff] tracking-[0.2em] uppercase">
            ACTIVE
          </span>
        </span>
      </div>
    </header>
  );
}
