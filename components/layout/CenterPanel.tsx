"use client";

import dynamic from "next/dynamic";

// Three.js canvas — dynamic import disables SSR for this subtree
const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false,
  loading: () => null,
});

export default function CenterPanel() {
  return (
    <main className="flex-1 relative overflow-hidden bg-black">
      {/* Arc reactor fills the full panel as a living background */}
      <ArcReactor />

      {/* JARVIS chat — overlaid at bottom center, rebuilt in Session 5 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-10 pointer-events-none">
        <div
          style={{
            border: "1px solid rgba(0,229,255,0.18)",
            background: "rgba(5,10,10,0.88)",
          }}
          className="relative p-4 before:absolute before:top-[-1px] before:left-[-1px] before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-[#00e5ff]"
        >
          <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase block mb-2">
            // JARVIS_CHAT
          </span>
          <div className="font-mono text-[0.8rem] text-[#94a3b8]">
            &gt; AWAITING INPUT_
          </div>
        </div>
      </div>
    </main>
  );
}
