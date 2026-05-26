"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { EASE_REVEAL } from "@/lib/animations";
import { OverlayDataRow, OverlayLinkRow } from "./OperatorOverlayRows";

interface OperatorOverlayProps {
  onClose: () => void;
}

export default function OperatorOverlay({ onClose }: OperatorOverlayProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-end"
      style={{ background: "rgba(0,0,0,0.65)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full relative"
        style={{ background: "#020808", border: "1px solid #00e5ff", borderBottom: "none" }}
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ duration: 0.35, ease: EASE_REVEAL }}
        onClick={(e) => e.stopPropagation()}
      >
        <span aria-hidden className="absolute top-[-1px] left-[-1px] pointer-events-none"
          style={{ width: 12, height: 12, borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff", position: "absolute" }} />
        <span aria-hidden className="absolute top-[-1px] right-[-1px] pointer-events-none"
          style={{ width: 12, height: 12, borderTop: "2px solid #00e5ff", borderRight: "2px solid #00e5ff", position: "absolute" }} />

        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center justify-between mb-5">
            <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase">
              // OPERATOR_PROFILE
            </p>
            <button onClick={onClose}
              className="font-mono text-[0.6rem] tracking-[0.15em] text-[#475569] hover:text-[#00e5ff] uppercase transition-colors duration-150">
              [ESC]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 mb-5">
            <OverlayDataRow label="OPERATOR_ID" value="SAACHI SURANA"               valueColor="white" />
            <OverlayDataRow label="DEGREE"      value="B.S. CS & DATA SCIENCE"      valueColor="white" />
            <OverlayDataRow label="SCHOOL"      value="UNIVERSITY OF WASHINGTON"    valueColor="white" />
            <OverlayDataRow label="STATUS"      value="DEAN'S LIST — CLASS OF 2028"  valueColor="cyan"  />
            <OverlayDataRow label="ROLE"        value="STUDENT // DEVELOPER"         valueColor="cyan"  />
          </div>

          <div className="flex flex-col gap-0 mb-5" style={{ borderTop: "1px solid rgba(0,229,255,0.1)" }}>
            <OverlayLinkRow label="EMAIL (PERSONAL)" display="saachisurana@outlook.com"      href="mailto:saachisurana@outlook.com" />
            <OverlayLinkRow label="EMAIL (UW)"       display="saachi7@uw.edu"                href="mailto:saachi7@uw.edu" />
            <OverlayLinkRow label="EMAIL (CS)"       display="saachi7@cs.washington.edu"     href="mailto:saachi7@cs.washington.edu" />
            <OverlayLinkRow label="LINKEDIN"         display="saachi-surana"                 href="https://linkedin.com/in/saachi-surana" external />
            <OverlayLinkRow label="GITHUB"           display="saachi-surana"                 href="https://github.com/saachi-surana" external />
          </div>

          <p className="font-ui text-[0.82rem] text-[#475569] leading-relaxed tracking-[0.02em]">
            Computer Science and Data Science student at UW Seattle. Building AI systems,
            local inference pipelines, and things that feel alive.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
