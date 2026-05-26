"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface OperatorOverlayProps {
  onClose: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function OperatorOverlay({ onClose }: OperatorOverlayProps) {
  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    // Background scrim — click to close
    <motion.div
      className="absolute inset-0 z-20 flex items-end"
      style={{ background: "rgba(0,0,0,0.65)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Panel — slides up from bottom, click doesn't close */}
      <motion.div
        className="w-full relative"
        style={{
          background: "#020808",
          border: "1px solid #00e5ff",
          borderBottom: "none",
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-left corner bracket */}
        <span
          aria-hidden
          className="absolute top-[-1px] left-[-1px] w-3 h-3 pointer-events-none"
          style={{ borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff" }}
        />
        {/* Top-right corner bracket */}
        <span
          aria-hidden
          className="absolute top-[-1px] right-[-1px] w-3 h-3 pointer-events-none"
          style={{ borderTop: "2px solid #00e5ff", borderRight: "2px solid #00e5ff" }}
        />

        <div className="px-6 pt-5 pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase">
              // OPERATOR_PROFILE
            </p>
            <button
              onClick={onClose}
              className="font-mono text-[0.6rem] tracking-[0.15em] text-[#475569] hover:text-[#00e5ff] uppercase transition-colors duration-150"
            >
              [ESC]
            </button>
          </div>

          {/* Data grid — two columns on wider panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 mb-5">
            <DataRow label="OPERATOR_ID" value="SAACHI SURANA"              valueColor="white"  />
            <DataRow label="DEGREE"      value="B.S. CS & DATA SCIENCE"     valueColor="white"  />
            <DataRow label="SCHOOL"      value="UNIVERSITY OF WASHINGTON"   valueColor="white"  />
            <DataRow label="STATUS"      value="DEAN'S LIST — CLASS OF 2028" valueColor="cyan"  />
            <DataRow label="ROLE"        value="STUDENT // DEVELOPER"        valueColor="cyan"  />
          </div>

          {/* Contact rows — full width with links */}
          <div
            className="flex flex-col gap-0 mb-5"
            style={{ borderTop: "1px solid rgba(0,229,255,0.1)" }}
          >
            <LinkRow
              label="EMAIL (PERSONAL)"
              display="saachisurana@outlook.com"
              href="mailto:saachisurana@outlook.com"
            />
            <LinkRow
              label="EMAIL (UW)"
              display="saachi7@uw.edu"
              href="mailto:saachi7@uw.edu"
            />
            <LinkRow
              label="EMAIL (CS)"
              display="saachi7@cs.washington.edu"
              href="mailto:saachi7@cs.washington.edu"
            />
            <LinkRow
              label="LINKEDIN"
              display="saachi-surana"
              href="https://linkedin.com/in/saachi-surana"
              external
            />
            <LinkRow
              label="GITHUB"
              display="saachi-surana"
              href="https://github.com/saachi-surana"
              external
            />
          </div>

          {/* Bio */}
          <p className="font-ui text-[0.82rem] text-[#475569] leading-relaxed tracking-[0.02em]">
            Computer Science and Data Science student at UW Seattle. Building AI systems,
            local inference pipelines, and things that feel alive.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Local sub-components ─────────────────────────────────────────────────────

function DataRow({
  label,
  value,
  valueColor = "white",
}: {
  label: string;
  value: string;
  valueColor?: "white" | "cyan";
}) {
  return (
    <div className="flex justify-between items-baseline gap-3 py-[4px]">
      <span className="font-mono text-[0.58rem] tracking-[0.18em] text-[#475569] uppercase shrink-0">
        {label}
      </span>
      <span
        className={`font-ui font-semibold text-[0.85rem] text-right ${
          valueColor === "cyan" ? "text-[#00e5ff]" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function LinkRow({
  label,
  display,
  href,
  external = false,
}: {
  label: string;
  display: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div
      className="flex justify-between items-baseline gap-3 py-[4px]"
      style={{ borderBottom: "1px solid rgba(0,229,255,0.06)" }}
    >
      <span className="font-mono text-[0.58rem] tracking-[0.18em] text-[#475569] uppercase shrink-0">
        {label}
      </span>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="font-mono text-[0.72rem] tracking-[0.06em] text-[#00e5ff] hover:text-white transition-colors duration-150 text-right"
        style={{ textDecoration: "underline", textDecorationColor: "rgba(0,229,255,0.35)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {display}
      </a>
    </div>
  );
}
