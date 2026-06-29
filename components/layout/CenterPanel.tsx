"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import JarvisChat from "@/components/chat/JarvisChat";
import OperatorOverlay from "@/components/panels/OperatorOverlay";
import OrbitalDisplays from "@/components/effects/OrbitalDisplays";
import ChevronHints from "@/components/effects/ChevronHints";
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
  const setReactorHeight = useMouseZoneStore((s) => s.setReactorHeight);
  const zone = useMouseZone();
  // Pause the HUD reactor's render loop while the splash is on screen so only
  // one Three.js canvas is rendering at a time (keeps scrolling smooth).
  const [paused, setPaused] = useState(true);

  useMouseZoneTracker();

  useEffect(() => {
    const el = reactorRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      // getBoundingClientRect is viewport-relative and changes as the page
      // scrolls — recompute on scroll so the mouse-zone center is correct once
      // the HUD is in view (otherwise every mouse position reads as "above").
      setReactorCenter(rect.left + rect.width / 2, rect.top + rect.height / 2);
      setReactorHeight(rect.height);
      setPaused(window.scrollY < window.innerHeight * 0.5);
    };
    update();
    // rAF-throttle the scroll handler so getBoundingClientRect doesn't thrash.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };
    window.addEventListener("resize", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", onScroll);
    };
  }, [setReactorCenter, setReactorHeight]);

  return (
    <main
      className="relative h-full w-full flex flex-col overflow-hidden"
      style={{
        background: "#000000",
        backgroundImage: `radial-gradient(rgba(0,229,255,0.015) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Arc reactor + chevron hints */}
      <div className="reactor-section" ref={reactorRef} style={{ position: "relative" }}>
        <ArcReactor paused={paused} />
        <ChevronHints zone={zone} />
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
