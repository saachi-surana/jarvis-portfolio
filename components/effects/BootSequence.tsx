"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINE1 = "INITIALIZING SYSTEMS...";
const LINE2 = "OPERATOR PORTFOLIO SYSTEM — BUILT BY SAACHI SURANA";
const CHAR_MS = 32;

type Phase = "title" | "typing1" | "typing2" | "fade";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase]         = useState<Phase>("title");
  const [line1, setLine1]         = useState("");
  const [line2, setLine2]         = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [visible, setVisible]     = useState(true);
  const completedRef              = useRef(false);

  // Phase 1 — title flickers in, then typing1 starts
  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 150);
    const t2 = setTimeout(() => setPhase("typing1"), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Phase typing1 — type LINE1
  useEffect(() => {
    if (phase !== "typing1") return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setLine1(LINE1.slice(0, i));
      if (i >= LINE1.length) {
        clearInterval(interval);
        // Short pause, then start LINE2
        setTimeout(() => setPhase("typing2"), 220);
      }
    }, CHAR_MS);
    return () => clearInterval(interval);
  }, [phase]);

  // Phase typing2 — type LINE2, then hand off
  useEffect(() => {
    if (phase !== "typing2") return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setLine2(LINE2.slice(0, i));
      if (i >= LINE2.length) {
        clearInterval(interval);
        setTimeout(() => {
          if (!completedRef.current) {
            completedRef.current = true;
            setPhase("fade");
            onComplete();
            setTimeout(() => setVisible(false), 100);
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
          {/* Radial glow */}
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

          {/* Typing area — two sequential lines */}
          <div className="flex flex-col items-center gap-2">
            {/* Line 1 — dims once line 2 begins typing */}
            <div className="h-5 flex items-center">
              {(phase === "typing1" || phase === "typing2" || phase === "fade") && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase === "typing1" ? 1 : 0.4 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-[0.72rem] tracking-[0.18em] text-[#00b8cc] uppercase"
                >
                  {line1}
                  {phase === "typing1" && (
                    <span className="animate-pulse text-[#00e5ff]">_</span>
                  )}
                </motion.p>
              )}
            </div>

            {/* Line 2 — brighter, more prominent */}
            <div className="h-5 flex items-center">
              {(phase === "typing2" || phase === "fade") && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="font-mono text-[0.72rem] tracking-[0.18em] text-[#00e5ff] uppercase"
                >
                  {line2}
                  {phase === "typing2" && (
                    <span className="animate-pulse text-[#00e5ff]">_</span>
                  )}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
