"use client";

import dynamic from "next/dynamic";
import JarvisChat from "@/components/chat/JarvisChat";

const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false,
  loading: () => null,
});

interface CenterPanelProps {
  booted?: boolean;
}

export default function CenterPanel({ booted }: CenterPanelProps) {
  return (
    <main className="h-full w-full flex flex-col bg-black overflow-hidden">
      {/* Arc reactor — 280px on mobile, flex-[58] on desktop */}
      <div className="reactor-section">
        <ArcReactor />
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(0,229,255,0.18)", flexShrink: 0 }} />

      {/* JARVIS chat — 240px on mobile, flex-[42] on desktop */}
      <div className="chat-section">
        <JarvisChat booted={booted} />
      </div>
    </main>
  );
}
