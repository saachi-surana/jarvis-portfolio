"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import BootSequence from "@/components/effects/BootSequence";
import ScrollIndicator from "@/components/effects/ScrollIndicator";

const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false,
  loading: () => null,
});

const EXIT_EASE = [0.4, 0, 0.2, 1] as const;
const SEQUENCE_MS = 1400; // locked spin-up + flourish before handing off
const SETTLE_MS = 900; // smooth-scroll settle before re-arming

// Full-screen splash. On the first downward scroll from the top we LOCK the
// page, play the reactor spin-up + flourish (so it can't be skipped by a fast
// scroll), then glide into the HUD. Scroll back to the top to re-arm.
export default function SplashSection() {
  const [booted, setBooted] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [spinningUp, setSpinningUp] = useState(false);
  const [paused, setPaused] = useState(false);
  const busyRef = useRef(false);

  const runSequence = useCallback(() => {
    if (busyRef.current || window.scrollY > 5) return;
    busyRef.current = true;
    setExiting(true);
    setSpinningUp(true);

    // After the spin-up plays in full, glide down into the HUD. The page is
    // held still meanwhile by preventDefault in the listeners (no overflow
    // toggling — that caused the scrollbar-width layout shift).
    window.setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, SEQUENCE_MS);

    // Once parked in the HUD (reactor off-screen), reset for the next pass.
    window.setTimeout(() => {
      setExiting(false);
      setSpinningUp(false);
      busyRef.current = false;
    }, SEQUENCE_MS + SETTLE_MS);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Hold the page still for the whole locked sequence...
      if (busyRef.current) { e.preventDefault(); return; }
      // ...and fire it on the first downward scroll from the top.
      if (e.deltaY > 0 && window.scrollY <= 5) {
        e.preventDefault();
        runSequence();
      }
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
      if (touchStartY - e.touches[0].clientY > 8) {
        e.preventDefault();
        runSequence();
      }
    };
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y <= 80);
      // Stop rendering the splash reactor once we're in the HUD.
      setPaused(y > window.innerHeight * 0.95);
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

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <BootSequence onComplete={() => setBooted(true)} />

      {/* Reactor fills the section. During the locked sequence it spins up while
          shrinking, drifting to the corner, and fading to black. */}
      <motion.div
        initial={false}
        animate={{
          scale: exiting ? 0.34 : 1,
          opacity: exiting ? 0 : 1,
          x: exiting ? "-24vw" : "0vw",
          y: exiting ? "-18vh" : "0vh",
        }}
        transition={{ duration: exiting ? 1.3 : 0.4, ease: EXIT_EASE }}
        style={{ position: "absolute", inset: 0, transformOrigin: "center" }}
      >
        <ArcReactor fullScreen spinningUp={spinningUp} paused={paused} />
      </motion.div>

      {/* Scroll cue — only after boot, parked at the top, and not mid-sequence */}
      <ScrollIndicator visible={booted && atTop && !exiting} />
    </section>
  );
}
