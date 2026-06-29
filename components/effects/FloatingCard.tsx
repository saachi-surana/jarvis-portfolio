"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { MouseZone } from "@/lib/mouseZoneStore";
import { IdentityContent, ProjectsContent, ExperienceContent, ContactContent } from "./FloatingCardContent";

import type { Transition } from "framer-motion";
const SPRING: Transition = { type: "spring", stiffness: 200, damping: 25 };

const ZONE_CONFIG: Record<string, {
  pos: React.CSSProperties;
  initial: { x?: number; y?: number; opacity: number };
  width: number;
}> = {
  IDENTITY:   {
    pos: { left: 12, top: "50vh", transform: "translateY(-50%)" },
    initial: { x: -60, opacity: 0 },
    width: 260,
  },
  PROJECTS:   {
    pos: { right: 12, top: "50vh", transform: "translateY(-50%)" },
    initial: { x: 60, opacity: 0 },
    width: 260,
  },
  EXPERIENCE: {
    pos: { top: 72, left: "50vw", transform: "translateX(-50%)" },
    initial: { y: -60, opacity: 0 },
    width: 340,
  },
  CONTACT:    {
    pos: { bottom: 56, left: "50vw", transform: "translateX(-50%)" },
    initial: { y: 60, opacity: 0 },
    width: 320,
  },
};

const CONTENT: Record<string, React.ComponentType> = {
  IDENTITY:   IdentityContent,
  PROJECTS:   ProjectsContent,
  EXPERIENCE: ExperienceContent,
  CONTACT:    ContactContent,
};

const CARD_ZONES: MouseZone[] = ["IDENTITY", "PROJECTS", "EXPERIENCE", "CONTACT"];

interface FloatingCardProps {
  zone: MouseZone;
}

export default function FloatingCard({ zone }: FloatingCardProps) {
  const cfg = ZONE_CONFIG[zone];
  const Content = CONTENT[zone];

  return (
    <AnimatePresence>
      {CARD_ZONES.includes(zone) && cfg && Content && (
        <motion.div
          key={zone}
          initial={cfg.initial}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ ...cfg.initial, transition: { duration: 0.18 } }}
          transition={SPRING}
          style={{
            position: "fixed",
            zIndex: 50,
            width: cfg.width,
            ...cfg.pos,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,229,255,0.5)",
            boxShadow: "0 0 30px rgba(0,229,255,0.15)",
            padding: 20,
            pointerEvents: "none",
          }}
        >
          {/* Corner bracket */}
          <span style={{
            position: "absolute", top: -1, left: -1, width: 12, height: 12,
            borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff",
            display: "block",
          }} />
          <span style={{
            position: "absolute", bottom: -1, right: -1, width: 12, height: 12,
            borderBottom: "2px solid #00e5ff", borderRight: "2px solid #00e5ff",
            display: "block",
          }} />
          <Content />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
