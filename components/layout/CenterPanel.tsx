"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import JarvisChat from "@/components/chat/JarvisChat";
import OperatorOverlay from "@/components/panels/OperatorOverlay";
import OrbitalDisplays from "@/components/effects/OrbitalDisplays";
import CompassRose from "@/components/effects/CompassRose";
import DirectionalPopup from "@/components/effects/DirectionalPopup";
import { useJarvisStore } from "@/lib/store";
import { useMouseZoneStore, useMouseZone, useMouseZoneTracker } from "@/lib/mouseZoneStore";

const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false,
  loading: () => null,
});

interface CenterPanelProps {
  booted?: boolean;
}

export default function CenterPanel({ booted }: CenterPanelProps) {
  const { showAbout, setShowAbout } = useJarvisStore();
  const reactorRef = useRef<HTMLDivElement>(null);
  const setReactorCenter = useMouseZoneStore((s) => s.setReactorCenter);
  const zone = useMouseZone();

  // Wire up global mouse zone tracking
  useMouseZoneTracker();

  // Measure reactor center and update store on mount and resize
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

  return (
    <main
      className="relative h-full w-full flex flex-col overflow-hidden"
      style={{
        background: "#000000",
        backgroundImage: `radial-gradient(rgba(0,229,255,0.015) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Arc reactor + HUD overlays */}
      <div className="reactor-section" ref={reactorRef}>
        <ArcReactor />
        <CompassRose zone={zone} />
        <DirectionalPopup zone={zone} />
      </div>

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
