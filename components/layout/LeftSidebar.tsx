"use client";

import { motion } from "framer-motion";
import ClockPanel from "@/components/panels/ClockPanel";
import DiagnosticsPanel from "@/components/panels/DiagnosticsPanel";
import VoicePanel from "@/components/panels/VoicePanel";
import AtmosphericPanel from "@/components/panels/AtmosphericPanel";
import LocationPanel from "@/components/panels/LocationPanel";
import OperatorPanel from "@/components/panels/OperatorPanel";
import AboutPanel from "@/components/panels/AboutPanel";
import { useMouseZone } from "@/lib/mouseZoneStore";

interface LeftSidebarProps {
  booted: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const PANELS = [
  { id: "clock",       Component: ClockPanel       },
  { id: "diagnostics", Component: DiagnosticsPanel },
  { id: "voice",       Component: VoicePanel       },
  { id: "atmospheric", Component: AtmosphericPanel },
  { id: "location",    Component: LocationPanel    },
  { id: "operator",    Component: OperatorPanel    },
  { id: "about",       Component: AboutPanel       },
];

// Which left-panel IDs brighten per active zone
const LEFT_HIGHLIGHTS: Partial<Record<string, string[]>> = {
  IDENTITY: ["about", "operator"],
};

export default function LeftSidebar({ booted }: LeftSidebarProps) {
  const zone = useMouseZone();
  const zoneActive = zone !== "IDLE";
  const highlighted = LEFT_HIGHLIGHTS[zone] ?? [];

  return (
    <aside
      className="sidebar-border-r w-full md:w-[280px] md:shrink-0 bg-[#050a0a] md:overflow-y-auto flex flex-col gap-2 p-3"
    >
      {PANELS.map(({ id, Component }, i) => {
        const isLit = !zoneActive || highlighted.includes(id);
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: -10 }}
            animate={booted ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.6, delay: booted ? i * 0.08 : 0, ease: EASE }}
          >
            <motion.div
              animate={{
                opacity: isLit ? 1 : 0.35,
                boxShadow: (booted && isLit && zoneActive)
                  ? "0 0 0 1px rgba(0,229,255,0.6), 0 0 12px rgba(0,229,255,0.15)"
                  : "none",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Component shouldAnimate={booted} />
            </motion.div>
          </motion.div>
        );
      })}
    </aside>
  );
}
