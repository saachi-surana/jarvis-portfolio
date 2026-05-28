"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface ScrollHintProps {
  booted:          boolean;
  scrollYProgress: MotionValue<number>;
}

export default function ScrollHint({ booted, scrollYProgress }: ScrollHintProps) {
  // Fade out quickly as user starts scrolling
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={booted ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.6, duration: 1.0, ease: "easeOut" }}
      style={{
        opacity: fadeOpacity,
        position: "fixed",
        bottom: 36,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <motion.span
        animate={{ y: [0, 7, 0] }}
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
          fontSize: "0.44rem",
          letterSpacing: "0.3em",
          color: "rgba(0,229,255,0.3)",
          textTransform: "uppercase",
          userSelect: "none",
        }}
      >
        // SCROLL TO INITIALIZE
      </span>
    </motion.div>
  );
}
