"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import BootSequence from "@/components/effects/BootSequence";

const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false,
  loading: () => null,
});

const EXIT_EASE = [0.4, 0, 0.2, 1] as const;

export default function SplashPage() {
  const router = useRouter();
  const [booted,     setBooted]     = useState(false);
  const [clickReady, setClickReady] = useState(false);
  const [exiting,    setExiting]    = useState(false);

  // Mobile: skip splash, go straight to HUD
  useEffect(() => {
    if (window.innerWidth < 768) {
      router.replace("/hud");
    }
  }, [router]);

  // Allow interaction 1s after boot (lets BootSequence exit animation finish)
  useEffect(() => {
    if (!booted) return;
    const tid = setTimeout(() => setClickReady(true), 1000);
    return () => clearTimeout(tid);
  }, [booted]);

  const handleExit = useCallback(() => {
    if (!clickReady || exiting) return;
    setExiting(true);
    setTimeout(() => router.push("/hud"), 800);
  }, [clickReady, exiting, router]);

  // Wheel to trigger exit
  useEffect(() => {
    if (!clickReady) return;
    const onWheel = () => handleExit();
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [clickReady, handleExit]);

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden cursor-pointer"
      onClick={handleExit}
    >
      {/* Boot overlay */}
      <BootSequence onComplete={() => setBooted(true)} />

      {/* Reactor — full viewport */}
      <motion.div
        animate={
          exiting
            ? { scale: 0.32, x: "-28vw", y: "-28vh" }
            : { scale: 1, x: 0, y: 0 }
        }
        transition={{ duration: 0.65, ease: EXIT_EASE }}
        style={{ position: "fixed", inset: 0 }}
      >
        <ArcReactor fullScreen />
      </motion.div>

      {/* Fade-to-black overlay — starts 400ms after exit triggers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 1 : 0 }}
        transition={exiting ? { duration: 0.4, delay: 0.4 } : { duration: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "#000000",
          zIndex: 40,
          pointerEvents: "none",
        }}
      />

      {/* Scroll / click hint — appears after clickReady */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={clickReady && !exiting ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "1.1rem",
            color: "rgba(0,229,255,0.65)",
            lineHeight: 1,
            display: "block",
          }}
        >
          ∨
        </motion.span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.48rem",
            letterSpacing: "0.26em",
            color: "rgba(0,229,255,0.32)",
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          // SCROLL OR CLICK TO INITIALIZE INTERFACE
        </span>
      </motion.div>
    </div>
  );
}
