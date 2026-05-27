"use client";

import { motion } from "framer-motion";
import OperatorIDPanel from "@/components/panels/OperatorIDPanel";
import ProjectsPanel from "@/components/panels/ProjectsPanel";
import ExperiencePanel from "@/components/panels/ExperiencePanel";
import SkillsPanel from "@/components/panels/SkillsPanel";
import VitalsPanel from "@/components/panels/VitalsPanel";
import NetworkPanel from "@/components/panels/NetworkPanel";
import { useMouseZone } from "@/lib/mouseZoneStore";

interface RightSidebarProps {
  booted?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const PANELS = [
  { id: "operator-id", Component: OperatorIDPanel  },
  { id: "projects",    Component: ProjectsPanel    },
  { id: "experience",  Component: ExperiencePanel  },
  { id: "skills",      Component: SkillsPanel      },
  { id: "vitals",      Component: VitalsPanel      },
  { id: "network",     Component: NetworkPanel     },
];

// Which right-panel IDs brighten per active zone
const RIGHT_HIGHLIGHTS: Partial<Record<string, string[]>> = {
  IDENTITY:   ["operator-id"],
  PROJECTS:   ["projects"],
  EXPERIENCE: ["experience", "skills"],
  CONTACT:    ["operator-id"],
};

export default function RightSidebar({ booted = false }: RightSidebarProps) {
  const zone = useMouseZone();
  const zoneActive = zone !== "IDLE";
  const highlighted = RIGHT_HIGHLIGHTS[zone] ?? [];

  return (
    <aside
      className="sidebar-border-l w-full md:w-[300px] md:shrink-0 bg-[#050a0a] md:overflow-y-auto flex flex-col gap-2 p-3"
    >
      {PANELS.map(({ id, Component }, i) => {
        const isLit = !zoneActive || highlighted.includes(id);
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 10 }}
            animate={booted ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
            transition={{ duration: 0.6, delay: booted ? 0.3 + i * 0.08 : 0, ease: EASE }}
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
