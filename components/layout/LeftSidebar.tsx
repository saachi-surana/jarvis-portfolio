"use client";

import { motion } from "framer-motion";
import ClockPanel from "@/components/panels/ClockPanel";
import DiagnosticsPanel from "@/components/panels/DiagnosticsPanel";
import VoicePanel from "@/components/panels/VoicePanel";
import AtmosphericPanel from "@/components/panels/AtmosphericPanel";
import LocationPanel from "@/components/panels/LocationPanel";
import OperatorPanel from "@/components/panels/OperatorPanel";

interface LeftSidebarProps {
  booted: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const PANELS = [
  { id: "clock",       Component: ClockPanel,       needsAnimate: false },
  { id: "diagnostics", Component: DiagnosticsPanel, needsAnimate: true  },
  { id: "voice",       Component: VoicePanel,       needsAnimate: false },
  { id: "atmospheric", Component: AtmosphericPanel, needsAnimate: true  },
  { id: "location",    Component: LocationPanel,    needsAnimate: false },
  { id: "operator",    Component: OperatorPanel,    needsAnimate: false },
];

export default function LeftSidebar({ booted }: LeftSidebarProps) {
  return (
    <aside
      style={{ borderRight: "1px solid rgba(0,229,255,0.18)" }}
      className="w-[280px] shrink-0 bg-[#050a0a] overflow-y-auto flex flex-col gap-2 p-3"
    >
      {PANELS.map(({ id, Component, needsAnimate }, i) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, x: -10 }}
          animate={booted ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{
            duration: 0.6,
            delay: booted ? i * 0.08 : 0,
            ease: EASE,
          }}
        >
          {needsAnimate ? (
            <Component shouldAnimate={booted} />
          ) : (
            <Component />
          )}
        </motion.div>
      ))}
    </aside>
  );
}
