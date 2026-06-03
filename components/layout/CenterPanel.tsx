"use client";

import { AnimatePresence } from "framer-motion";
import JarvisChat from "@/components/chat/JarvisChat";
import OperatorOverlay from "@/components/panels/OperatorOverlay";
import OrbitalDisplays from "@/components/effects/OrbitalDisplays";
import { useJarvisStore } from "@/lib/store";

interface CenterPanelProps {
  booted?: boolean;
}

export default function CenterPanel({ booted }: CenterPanelProps) {
  const { showAbout, setShowAbout } = useJarvisStore();

  return (
    <main
      className="relative h-full w-full flex flex-col overflow-hidden"
      style={{
        background: "#000000",
        backgroundImage: `radial-gradient(rgba(0,229,255,0.015) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Layout spacer — the single reactor is position:fixed in page.tsx */}
      <div className="reactor-section" />

      {/* Secondary orbital displays row */}
      <OrbitalDisplays />

      {/* JARVIS chat */}
      <div className="chat-section">
        <JarvisChat booted={booted} />
      </div>

      {/* Operator profile overlay */}
      <AnimatePresence>
        {showAbout && (
          <OperatorOverlay key="operator-overlay" onClose={() => setShowAbout(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
