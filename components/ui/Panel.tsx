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

  useEffect(() => {
    if (!isHighlighted) return;
    const t = setTimeout(() => setHighlightSection(null), 2000);
    return () => clearTimeout(t);
  }, [isHighlighted, setHighlightSection]);

  return (
    <motion.div
      animate={isHighlighted
        ? { boxShadow: ["inset 0 0 12px rgba(0,229,255,0.04)", "0 0 20px rgba(0,229,255,0.5)", "inset 0 0 12px rgba(0,229,255,0.04)"] }
        : { boxShadow: "inset 0 0 12px rgba(0,229,255,0.04)" }
      }
      transition={{ duration: 0.8 }}
      style={{
        border: `1px solid ${isHighlighted ? "#00e5ff" : "rgba(0,229,255,0.25)"}`,
        ...style,
      }}
      className={`relative bg-[#070d0d] ${noPadding ? "" : "p-4"} ${className}`}
    >
      {/* Top-left bracket — 16px */}
      {(corner === "tl" || corner === "both") && (
        <span
          aria-hidden
          className="absolute top-[-1px] left-[-1px] pointer-events-none"
          style={{
            width: 16, height: 16,
            borderTop: "2px solid #00e5ff",
            borderLeft: "2px solid #00e5ff",
          }}
        />
      )}
      {/* Bottom-right bracket — 16px */}
      {corner === "both" && (
        <span
          aria-hidden
          className="absolute bottom-[-1px] right-[-1px] pointer-events-none"
          style={{
            width: 16, height: 16,
            borderBottom: "2px solid #00e5ff",
            borderRight: "2px solid #00e5ff",
          }}
        />
      )}
      {label && (
        <div className="flex items-center gap-[6px] mb-3">
          <span className="panel-status-dot" aria-hidden />
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase">
            {label}
          </p>
        </div>
      )}
      {children}
    </motion.div>
  );
}
