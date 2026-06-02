"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY <= 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "fixed",
        right: 32,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.55rem",
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

      <div style={{ position: "relative", width: 1, height: 80, background: "rgba(0,229,255,0.5)" }}>
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
