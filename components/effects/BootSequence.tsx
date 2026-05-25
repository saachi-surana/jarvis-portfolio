"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TITLE_LINES = ["INITIALIZING SYSTEMS", "LOADING OPERATOR PROFILE", "NEURAL LINK ESTABLISHED"];
const INIT_TEXT = "INITIALIZING SYSTEMS...";
// Each char at 32ms → 23 chars ≈ 736ms
const CHAR_MS = 32;

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<"title" | "typing" | "fade">("title");
  const [typed, setTyped] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [visible, setVisible] = useState(true);
  const completedRef = useRef(false);

  // Phase 1 — title appears with flicker at 150ms
  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 150);
    // Phase 2 — start typing after title settles (800ms flicker + 400ms pause)
    const t2 = setTimeout(() => setPhase("typing"), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Phase 2 — typewriter
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(INIT_TEXT.slice(0, i));
      if (i >= INIT_TEXT.length) {
        clearInterval(interval);
        // Brief pause after typing, then fade out
        setTimeout(() => {
          if (!completedRef.current) {
            completedRef.current = true;
            setPhase("fade");
            onComplete();          // tells JarvisHUD to start stagger
            setTimeout(() => setVisible(false), 100); // unmount triggers exit
          }
        }, 420);
      }
    }, CHAR_MS);
    return () => clearInterval(interval);
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          {/* Radial glow behind title */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,229,255,0.055) 0%, transparent 70%)",
            }}
          />

          {/* J.A.R.V.I.S title */}
          <AnimatePresence>
            {showTitle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0.25, 0.9, 0.5, 1],
                  textShadow: [
                    "0 0 0px transparent",
                    "0 0 30px rgba(0,229,255,0.6)",
                    "0 0 6px rgba(0,229,255,0.3)",
                    "0 0 24px rgba(0,229,255,0.5)",
                    "0 0 10px rgba(0,229,255,0.3)",
                    "0 0 20px rgba(0,229,255,0.45)",
                  ],
                }}
                transition={{
                  duration: 0.75,
                  times: [0, 0.12, 0.3, 0.52, 0.72, 1],
                  ease: "linear",
                }}
                className="font-display text-[clamp(2.8rem,7vw,6rem)] tracking-[0.35em] text-[#00e5ff] uppercase"
              >
                J.A.R.V.I.S
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtitle */}
          {showTitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-mono text-[0.6rem] tracking-[0.28em] text-[#475569] uppercase mt-3"
            >
              JUST A RATHER VERY INTELLIGENT SYSTEM
            </motion.p>
          )}

          {/* Horizontal rule */}
          {showTitle && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.25 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-8 mb-8 origin-left"
              style={{
                width: "min(320px, 60vw)",
                height: "1px",
                background: "#00e5ff",
              }}
            />
          )}

          {/* Typing area */}
          <div className="h-6 flex items-center">
            {(phase === "typing" || phase === "fade") && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[0.78rem] tracking-[0.18em] text-[#00b8cc] uppercase"
              >
                {typed}
                <span className="animate-pulse text-[#00e5ff]">_</span>
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
