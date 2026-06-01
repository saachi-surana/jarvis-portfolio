"use client";

import { motion } from "framer-motion";

interface Props {
  booted: boolean;
  scrollProgress: number;
}

export default function ScrollIndicator({ booted, scrollProgress }: Props) {
  const visible = booted && scrollProgress < 0.15;

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        right: 40,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* "SCROLL" rotated to read upward, sitting left of the line */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "rgba(0,229,255,0.7)",
          textTransform: "uppercase",
          userSelect: "none",
          transform: "rotate(-90deg)",
          whiteSpace: "nowrap",
        }}
      >
        SCROLL
      </span>

      {/* Vertical track + sliding dot */}
      <div style={{ position: "relative", width: 1, height: 80, background: "rgba(0,229,255,0.6)" }}>
        <motion.div
          animate={{ y: [0, 72], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#00e5ff",
            filter: "drop-shadow(0 0 4px #00e5ff)",
          }}
        />
      </div>
    </motion.div>
  );
}
