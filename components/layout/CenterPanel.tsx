"use client";

import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import JarvisChat from "@/components/chat/JarvisChat";
import OperatorOverlay from "@/components/panels/OperatorOverlay";
import { useJarvisStore } from "@/lib/store";

const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false,
  loading: () => null,
});

interface CenterPanelProps {
  booted?: boolean;
}

export default function CenterPanel({ booted }: CenterPanelProps) {
  const { showAbout, setShowAbout } = useJarvisStore();

  return (
    <main className="relative h-full w-full flex flex-col bg-black overflow-hidden">
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

      {/* Operator profile overlay — slides up over chat area */}
      <AnimatePresence>
        {showAbout && (
          <OperatorOverlay key="operator-overlay" onClose={() => setShowAbout(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
