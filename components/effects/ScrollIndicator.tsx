"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* Vertical track line */}
      <div
        style={{
          position: "relative",
          width: 1,
          height: 50,
          background: "rgba(0,229,255,0.4)",
        }}
      >
        {/* Sliding dot */}
        <motion.div
          animate={{ y: [0, 44], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#00e5ff",
          }}
        />
      </div>

      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.5rem",
          letterSpacing: "0.2em",
          color: "rgba(0,229,255,0.5)",
          textTransform: "uppercase",
          userSelect: "none",
        }}
      >
        SCROLL
      </span>
    </motion.div>
  );
}
