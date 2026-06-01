"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import BootSequence from "@/components/effects/BootSequence";
import ScrollIndicator from "@/components/effects/ScrollIndicator";

const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false,
  loading: () => null,
});

const EXIT_EASE = [0.4, 0, 0.2, 1] as const;

export default function SplashPage() {
  const router = useRouter();
  const [booted,     setBooted]     = useState(false);
  const [clickReady, setClickReady] = useState(false);
  const [spinningUp, setSpinningUp] = useState(false);
  const [shaking,    setShaking]    = useState(false);
  const [exiting,    setExiting]    = useState(false);
  const triggeredRef = useRef(false);

  // Mobile: skip splash, go straight to HUD
  useEffect(() => {
    if (window.innerWidth < 768) router.replace("/hud");
  }, [router]);

  // Allow interaction 1s after boot
  useEffect(() => {
    if (!booted) return;
    const tid = setTimeout(() => setClickReady(true), 1000);
    return () => clearTimeout(tid);
  }, [booted]);

  const handleInteraction = useCallback(() => {
    if (!clickReady || triggeredRef.current) return;
    triggeredRef.current = true;
    setSpinningUp(true);
    setTimeout(() => setShaking(true),  800);
    setTimeout(() => setShaking(false), 950);
    setTimeout(() => setExiting(true),  1000);
    setTimeout(() => router.push("/hud"), 1400);
  }, [clickReady, router]);

  // Scroll triggers spin-up
  useEffect(() => {
    if (!clickReady) return;
    const onWheel = () => handleInteraction();
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [clickReady, handleInteraction]);

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden cursor-pointer"
      onClick={handleInteraction}
    >
      <BootSequence onComplete={() => setBooted(true)} />

      {/* Reactor — full viewport, shakes at peak spin then exits */}
      <motion.div
        animate={
          shaking ? { x: [0, -2, 2, -1, 1, 0], y: [0, 1, -2, 2, -1, 0] } :
          exiting  ? { scale: 0.32, x: "-28vw", y: "-28vh" } :
          { scale: 1, x: 0, y: 0 }
        }
        transition={
          shaking ? { duration: 0.15, ease: "linear" } :
          { duration: 0.65, ease: EXIT_EASE }
        }
        style={{ position: "fixed", inset: 0 }}
      >
        <ArcReactor fullScreen spinningUp={spinningUp} />
      </motion.div>

      {/* Fade-to-black */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: "fixed", inset: 0, background: "#000000", zIndex: 40, pointerEvents: "none" }}
      />

      {/* Scroll indicator — hidden once spin starts */}
      <ScrollIndicator visible={clickReady && !spinningUp && !exiting} />
    </div>
  );
}
