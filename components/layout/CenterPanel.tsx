"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import JarvisChat from "@/components/chat/JarvisChat";
import OperatorOverlay from "@/components/panels/OperatorOverlay";
import OrbitalDisplays from "@/components/effects/OrbitalDisplays";
import FloatingCard from "@/components/effects/FloatingCard";
import ChevronHints from "@/components/effects/ChevronHints";
import { useJarvisStore } from "@/lib/store";
import { useMouseZoneStore, useMouseZone, useMouseZoneTracker } from "@/lib/mouseZoneStore";

const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false,
  loading: () => null,
});

interface CenterPanelProps {
  booted?:        boolean;
  chatBooted?:    boolean; // scroll-reveal: undefined = show immediately (mobile)
  orbitalBooted?: boolean; // scroll-reveal: undefined = show immediately (mobile)
}

export default function CenterPanel({ booted, chatBooted, orbitalBooted }: CenterPanelProps) {
  const { showAbout, setShowAbout } = useJarvisStore();
  const reactorRef = useRef<HTMLDivElement>(null);
  const setReactorCenter = useMouseZoneStore((s) => s.setReactorCenter);
  const zone = useMouseZone();

  useMouseZoneTracker();

  useEffect(() => {
    const el = reactorRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setReactorCenter(rect.left + rect.width / 2, rect.top + rect.height / 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [setReactorCenter]);

  // If explicit prop not supplied, fall back to `booted` (mobile / normal mode)
  const showOrbital = orbitalBooted ?? booted ?? false;
  const showChat    = chatBooted    ?? booted ?? false;

  return (
    <main
      className="relative h-full w-full flex flex-col overflow-hidden"
      style={{
        background: "#000000",
        backgroundImage: `radial-gradient(rgba(0,229,255,0.015) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Arc reactor — takes all remaining height when chat/orbital are hidden */}
      <div className="reactor-section" ref={reactorRef} style={{ position: "relative" }}>
        <ArcReactor />
        <ChevronHints zone={zone} />
      </div>

      {showOrbital && <OrbitalDisplays />}

      {showChat && (
        <div className="chat-section">
          <JarvisChat booted={showChat} />
        </div>
      )}

      {/* Floating zone cards */}
      <FloatingCard zone={zone} />

      {/* Operator profile overlay */}
      <AnimatePresence>
        {showAbout && (
          <OperatorOverlay key="operator-overlay" onClose={() => setShowAbout(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
