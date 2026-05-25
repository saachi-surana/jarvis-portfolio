"use client";

import { motion } from "framer-motion";
import OperatorIDPanel from "@/components/panels/OperatorIDPanel";
import ProjectsPanel from "@/components/panels/ProjectsPanel";
import SkillsPanel from "@/components/panels/SkillsPanel";
import VitalsPanel from "@/components/panels/VitalsPanel";
import NetworkPanel from "@/components/panels/NetworkPanel";

interface RightSidebarProps {
  booted?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const PANELS = [
  { id: "operator-id", Component: OperatorIDPanel },
  { id: "projects",    Component: ProjectsPanel   },
  { id: "skills",      Component: SkillsPanel     },
  { id: "vitals",      Component: VitalsPanel     },
  { id: "network",     Component: NetworkPanel    },
];

export default function RightSidebar({ booted = false }: RightSidebarProps) {
  return (
    <aside
      className="sidebar-border-l w-full md:w-[300px] md:shrink-0 bg-[#050a0a] md:overflow-y-auto flex flex-col gap-2 p-3"
    >
      {PANELS.map(({ id, Component }, i) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, x: 10 }}
          animate={booted ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
          transition={{
            duration: 0.6,
            delay: booted ? 0.3 + i * 0.08 : 0,
            ease: EASE,
          }}
        >
          <Component shouldAnimate={booted} />
        </motion.div>
      ))}
    </aside>
  );
}
