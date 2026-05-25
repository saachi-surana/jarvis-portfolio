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
      {/* Arc reactor — fills ~58% */}
      <div className="relative min-h-0" style={{ flex: 58 }}>
        <ArcReactor />
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(0,229,255,0.18)", flexShrink: 0 }} />

      {/* JARVIS chat — fills ~42% */}
      <div className="min-h-0 overflow-hidden" style={{ flex: 42 }}>
        <JarvisChat booted={booted} />
      </div>
    </main>
  );
}
