"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import BootSequence from "@/components/effects/BootSequence";
import ScrollIndicator from "@/components/effects/ScrollIndicator";
import { useMouseZoneStore } from "@/lib/mouseZoneStore";

const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false,
  loading: () => null,
});

const EXIT_EASE = [0.4, 0, 0.2, 1] as const;
const SHRINK_EASE = [0.16, 1, 0.3, 1] as const; // fast early → leaves the big state quickly
const EXIT_MS = 1000; // align + crossfade onto the HUD reactor (one motion)
// Camera-z ratio (splash z=8.5 / HUD z=7.2): the reactor renders larger per
// canvas pixel in the HUD, so correct the scale by this factor.
const Z_RATIO = 8.5 / 7.2;

type Phase = "idle" | "exit";

// Full-screen splash. The first downward scroll runs a locked, un-skippable
// hand-off: we jump to the HUD but keep the reactor as a fixed, transparent
// overlay on top, then move + scale it to land exactly on the HUD's reactor
// (using its measured position/size) and crossfade onto it. Scroll back up to
// re-arm.
export default function SplashSection() {
  const [booted, setBooted] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [phase, setPhase] = useState<Phase>("idle");
  const [paused, setPaused] = useState(false);
  const [exitT, setExitT] = useState({ scale: 0.55, x: 0, y: -240 });
  const busyRef = useRef(false);
  const phaseRef = useRef<Phase>("idle");

  const setPhaseSafe = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const runSequence = useCallback(() => {
    if (busyRef.current || window.scrollY > 5) return;
    busyRef.current = true;
    setPaused(false);

    // Measure where the HUD reactor will sit and size it to match. reactorCenter
    // is measured viewport-relative at the top (scrollY≈0), where the HUD section
    // sits one viewport below — so after we jump down by innerHeight its on-screen
    // center is (reactorCenter.y - innerHeight). The splash reactor's own center
    // is the viewport center, so the drift to land on it is the difference.
    const { reactorCenter, reactorHeight } = useMouseZoneStore.getState();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = reactorHeight > 0 ? Math.min(1, Z_RATIO * (reactorHeight / vh)) : 0.55;
    const x = Math.round(reactorCenter.x - vw / 2);
    const y = Math.round(reactorCenter.y - 1.5 * vh);
    setExitT({ scale, x, y });

    // Jump to the HUD in the same tick — the transparent overlay covers it, so
    // the jump is never seen and the HUD shows through behind the reactor.
    setPhaseSafe("exit");
    window.scrollTo(0, vh);

    // Done: reset the overlay off-screen and re-arm.
    window.setTimeout(() => {
      setPhaseSafe("idle");
      setPaused(window.scrollY > window.innerHeight * 0.95);
      busyRef.current = false;
    }, EXIT_MS + 150);
  }, [setPhaseSafe]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (busyRef.current) { e.preventDefault(); return; }
      if (e.deltaY > 0 && window.scrollY <= 5) { e.preventDefault(); runSequence(); }
    };
    const onKey = (e: KeyboardEvent) => {
      const down = e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";
      if (!down) return;
      if (busyRef.current) { e.preventDefault(); return; }
      if (window.scrollY <= 5) { e.preventDefault(); runSequence(); }
    };
    // Touch: a downward swipe from the top fires the same locked sequence.
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (busyRef.current) { e.preventDefault(); return; }
      if (window.scrollY > 5) return;
      if (touchStartY - e.touches[0].clientY > 8) { e.preventDefault(); runSequence(); }
    };
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y <= 80);
      // Stop rendering the splash reactor once we're idle in the HUD.
      if (phaseRef.current === "idle") setPaused(y > window.innerHeight * 0.95);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [runSequence]);

  const overlay = phase !== "idle";

  return (
    // z-index lifts the fixed reactor overlay above the HUD section during the
    // hand-off so it can crossfade onto the HUD reactor.
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ zIndex: overlay ? 50 : "auto" }}
    >
      <BootSequence onComplete={() => setBooted(true)} />

      <motion.div
        initial={false}
        animate={{
          scale: phase === "exit" ? exitT.scale : 1,
          x: phase === "exit" ? exitT.x : 0,
          y: phase === "exit" ? exitT.y : 0,
          // Stay visible while it moves/scales to land on the HUD reactor, then
          // crossfade out onto it so they coincide before it disappears.
          opacity: phase === "exit" ? [1, 1, 0] : 1,
        }}
        transition={
          phase === "exit"
            ? {
                scale: { duration: EXIT_MS / 1000, ease: SHRINK_EASE },
                x: { duration: EXIT_MS / 1000, ease: SHRINK_EASE },
                y: { duration: EXIT_MS / 1000, ease: SHRINK_EASE },
                opacity: { duration: EXIT_MS / 1000, times: [0, 0.6, 1], ease: "linear" },
              }
            : { duration: 0.3, ease: EXIT_EASE }
        }
        style={{ position: overlay ? "fixed" : "absolute", inset: 0, transformOrigin: "center" }}
      >
        <ArcReactor fullScreen spinningUp={overlay} paused={paused} transparent />
      </motion.div>

      {/* Scroll cue — only after boot, parked at the top, and not mid-sequence */}
      <ScrollIndicator visible={booted && atTop && phase === "idle"} />
    </section>
  );
}
