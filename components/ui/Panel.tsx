"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useJarvisStore } from "@/lib/store";

interface PanelProps {
  label?: string;
  children: ReactNode;
  className?: string;
  corner?: "tl" | "both" | "none";
  noPadding?: boolean;
  style?: React.CSSProperties;
  /** When set, this panel will pulse a cyan glow when highlightSection matches */
  sectionId?: string;
}

export default function Panel({
  label,
  children,
  className = "",
  corner = "tl",
  noPadding = false,
  style,
  sectionId,
}: PanelProps) {
  const { highlightSection, setHighlightSection } = useJarvisStore();
  const isHighlighted = !!sectionId && highlightSection === sectionId;

  // Auto-clear after 2s when this panel is highlighted
  useEffect(() => {
    if (!isHighlighted) return;
    const t = setTimeout(() => setHighlightSection(null), 2000);
    return () => clearTimeout(t);
  }, [isHighlighted, setHighlightSection]);

  return (
    <motion.div
      animate={isHighlighted
        ? { boxShadow: ["inset 0 0 8px rgba(0,229,255,0.05)", "0 0 20px rgba(0,229,255,0.5)", "inset 0 0 8px rgba(0,229,255,0.05)"] }
        : { boxShadow: "inset 0 0 8px rgba(0,229,255,0.05)" }
      }
      transition={{ duration: 0.8 }}
      style={{
        border: `1px solid ${isHighlighted ? "#00e5ff" : "rgba(0,229,255,0.25)"}`,
        ...style,
      }}
      className={`relative bg-[#070d0d] ${noPadding ? "" : "p-4"} ${className}`}
    >
      {(corner === "tl" || corner === "both") && (
        <span
          aria-hidden
          className="absolute top-[-1px] left-[-1px] w-3 h-3 pointer-events-none"
          style={{ borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff" }}
        />
      )}
      {corner === "both" && (
        <span
          aria-hidden
          className="absolute bottom-[-1px] right-[-1px] w-3 h-3 pointer-events-none"
          style={{ borderBottom: "2px solid #00e5ff", borderRight: "2px solid #00e5ff" }}
        />
      )}
      {label && (
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase mb-3">
          {label}
        </p>
      )}
      {children}
    </motion.div>
  );
}
