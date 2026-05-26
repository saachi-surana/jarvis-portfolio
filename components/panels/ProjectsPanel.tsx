"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import ProjectOverlay from "./ProjectOverlay";
import { useJarvisStore } from "@/lib/store";

const SECTION_ID = "projects";

interface ProjectsPanelProps {
  shouldAnimate?: boolean;
}

export default function ProjectsPanel(_props: ProjectsPanelProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  const { pingProjectId, pingProject, highlightSection, setHighlightSection } = useJarvisStore();
  const rowRefs  = useRef<Record<string, HTMLButtonElement | null>>({});
  const pinging  = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const isHighlighted = highlightSection === SECTION_ID;

  // Flash the matching project row when pinged
  useEffect(() => {
    if (!pingProjectId) return;
    const el = rowRefs.current[pingProjectId];
    if (!el) return;

    el.classList.add("pinged");
    if (pinging.current[pingProjectId]) clearTimeout(pinging.current[pingProjectId]);
    pinging.current[pingProjectId] = setTimeout(() => {
      el.classList.remove("pinged");
      pingProject(null);
    }, 700);
  }, [pingProjectId, pingProject]);

  // Clear highlight after 2s
  useEffect(() => {
    if (!isHighlighted) return;
    const t = setTimeout(() => setHighlightSection(null), 2000);
    return () => clearTimeout(t);
  }, [isHighlighted, setHighlightSection]);

  return (
    <>
      <motion.div
        className="relative bg-[#050a0a]"
        animate={isHighlighted
          ? { boxShadow: ["0 0 0px transparent", "0 0 16px rgba(0,229,255,0.45)", "0 0 0px transparent"] }
          : { boxShadow: "0 0 0px transparent" }
        }
        transition={{ duration: 0.8 }}
        style={{ border: `1px solid ${isHighlighted ? "#00e5ff" : "rgba(0,229,255,0.18)"}` }}
      >
        <span
          aria-hidden
          className="absolute top-[-1px] left-[-1px] w-3 h-3 pointer-events-none"
          style={{ borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff" }}
        />

        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase px-4 pt-4 pb-0 mb-3">
          // ACTIVE_PROJECTS
        </p>

        <div className="pb-2">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              ref={(el) => { rowRefs.current[p.id] = el; }}
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
      </motion.div>

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
