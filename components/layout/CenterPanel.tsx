"use client";

export default function CenterPanel() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center overflow-hidden relative bg-black gap-4 p-6">
      {/* Arc reactor placeholder — filled in Session 2 */}
      <div
        style={{ border: "1px solid rgba(0,229,255,0.18)" }}
        className="relative bg-[#050a0a] p-4 w-[360px] h-[360px] flex flex-col items-center justify-center gap-4 before:absolute before:top-[-1px] before:left-[-1px] before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-[#00e5ff] after:absolute after:bottom-[-1px] after:right-[-1px] after:w-3 after:h-3 after:border-b-2 after:border-r-2 after:border-[#00e5ff]"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase">
          // ARC_REACTOR
        </span>
        <div
          style={{ border: "1px solid rgba(0,229,255,0.18)" }}
          className="w-48 h-48 rounded-full flex items-center justify-center"
        >
          <span className="font-display text-xs text-[#00e5ff] tracking-[0.2em] uppercase">
            CORE
          </span>
        </div>
        <span className="font-mono text-[0.65rem] text-[#475569] tracking-[0.2em] uppercase">
          // AWAITING SESSION 2
        </span>
      </div>

      {/* JARVIS chat placeholder — filled in Session 5 */}
      <div
        style={{ border: "1px solid rgba(0,229,255,0.18)" }}
        className="relative bg-[#050a0a] p-4 w-full max-w-xl before:absolute before:top-[-1px] before:left-[-1px] before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-[#00e5ff]"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase block mb-2">
          // JARVIS_CHAT
        </span>
        <div className="font-mono text-[0.8rem] text-[#94a3b8]">
          &gt; AWAITING INPUT_
        </div>
      </div>
    </main>
  );
}
