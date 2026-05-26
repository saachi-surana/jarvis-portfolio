"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlitchTitleProps {
  text: string;
  className?: string;
}

export function GlitchTitle({ text, className = "" }: GlitchTitleProps) {
  const [glitching, setGlitching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const schedule = () => {
      // Fire every 15–20s with randomization
      const delay = 15000 + Math.random() * 5000;
      timerRef.current = setTimeout(() => {
        setGlitching(true);
        timerRef.current = setTimeout(() => {
          setGlitching(false);
          schedule();
        }, 80);
      }, delay);
    };
    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Base text */}
      <span className="relative">{text}</span>

      {/* RGB split layers — only during glitch */}
      <AnimatePresence>
        {glitching && (
          <>
            {/* Red channel — shifts right, clips top */}
            <motion.span
              key="r"
              aria-hidden
              className="absolute inset-0 select-none"
              style={{
                color: "#ff2020",
                clipPath: "inset(0 0 58% 0)",
                mixBlendMode: "screen",
              }}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0.8, 0.6, 0.75, 0], x: [3, -2, 4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08, times: [0, 0.35, 0.65, 1] }}
            >
              {text}
            </motion.span>

            {/* Cyan channel — shifts left, clips middle */}
            <motion.span
              key="c"
              aria-hidden
              className="absolute inset-0 select-none"
              style={{
                color: "#00ffff",
                clipPath: "inset(42% 0 22% 0)",
                mixBlendMode: "screen",
              }}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0.8, 0.55, 0.7, 0], x: [-3, 2, -4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08, times: [0, 0.35, 0.65, 1] }}
            >
              {text}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}
