"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import ProjectOverlay from "./ProjectOverlay";

interface ProjectsPanelProps {
  shouldAnimate?: boolean;
}

export default function ProjectsPanel(_props: ProjectsPanelProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div
        className="relative bg-[#050a0a]"
        style={{ border: "1px solid rgba(0,229,255,0.18)" }}
      >
        {/* Top-left corner bracket */}
        <span
          aria-hidden
          className="absolute top-[-1px] left-[-1px] w-3 h-3 pointer-events-none"
          style={{ borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff" }}
        />

        {/* Label */}
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase px-4 pt-4 pb-0 mb-3">
          // ACTIVE_PROJECTS
        </p>

        {/* Project rows */}
        <div className="pb-2">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="w-full flex items-center gap-3 px-4 py-[6px] text-left group transition-colors duration-150 hover:bg-[rgba(0,229,255,0.05)]"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
            >
              <span className="font-mono text-[0.55rem] tracking-[0.1em] text-[#475569] shrink-0 w-4 tabular-nums">
                {p.id}
              </span>
              <span className="font-ui font-semibold text-[0.82rem] tracking-[0.05em] text-[#94a3b8] group-hover:text-white uppercase transition-colors duration-150 leading-tight">
                {p.name}
              </span>
              <span className="ml-auto font-mono text-[0.6rem] text-[#00e5ff] opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
                &rarr;
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectOverlay
            key="overlay"
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
