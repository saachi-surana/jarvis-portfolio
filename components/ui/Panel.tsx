"use client";

import type { ReactNode } from "react";

interface PanelProps {
  label?: string;
  children: ReactNode;
  className?: string;
  /** "tl" = top-left only, "both" = top-left + bottom-right, "none" = no accents */
  corner?: "tl" | "both" | "none";
  noPadding?: boolean;
  style?: React.CSSProperties;
}

export default function Panel({
  label,
  children,
  className = "",
  corner = "tl",
  noPadding = false,
  style,
}: PanelProps) {
  return (
    <div
      style={{ border: "1px solid rgba(0,229,255,0.18)", ...style }}
      className={`relative bg-[#050a0a] ${noPadding ? "" : "p-4"} ${className}`}
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
    </div>
  );
}
