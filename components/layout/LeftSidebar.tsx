"use client";

import { motion } from "framer-motion";
import ClockPanel from "@/components/panels/ClockPanel";
import AboutPanel from "@/components/panels/AboutPanel";
import SkillsPanel from "@/components/panels/SkillsPanel";
import LocationPanel from "@/components/panels/LocationPanel";
import OperatorPanel from "@/components/panels/OperatorPanel";
import DiagnosticsPanel from "@/components/panels/DiagnosticsPanel";
import VoicePanel from "@/components/panels/VoicePanel";
import AtmosphericPanel from "@/components/panels/AtmosphericPanel";

interface LeftSidebarProps {
  booted: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const PANELS = [
  { id: "clock",       Component: ClockPanel       },
  { id: "about",       Component: AboutPanel       },
  { id: "skills",      Component: SkillsPanel      },
  { id: "location",    Component: LocationPanel    },
  { id: "operator",    Component: OperatorPanel    },
  { id: "diagnostics", Component: DiagnosticsPanel },
  { id: "voice",       Component: VoicePanel       },
  { id: "atmospheric", Component: AtmosphericPanel },
];

export default function LeftSidebar({ booted }: LeftSidebarProps) {
  return (
    <aside
      className="sidebar-border-r w-full md:w-[280px] md:shrink-0 bg-[#050a0a] md:overflow-y-auto flex flex-col gap-2 p-3"
    >
      {PANELS.map(({ id, Component }, i) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, x: -10 }}
          animate={booted ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.6, delay: booted ? i * 0.08 : 0, ease: EASE }}
        >
          <Component shouldAnimate={booted} />
        </motion.div>
      ))}
    </aside>
  );
}
