"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { SPRING } from "@/lib/animations";

interface ProjectOverlayProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.65)" }} />

      {/* Sliding panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={SPRING}
        className="absolute top-0 right-0 h-full w-[380px] overflow-y-auto"
        style={{
          background: "#070d0d",
          borderLeft: "1px solid rgba(0,229,255,0.4)",
          boxShadow: "inset 4px 0 24px rgba(0,229,255,0.03)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-left corner bracket */}
        <span
          aria-hidden
          className="absolute top-[-1px] left-[-1px] w-3 h-3 pointer-events-none"
          style={{ borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff" }}
        />

        <div className="flex flex-col gap-5 p-6 h-full">
          {/* Project header */}
          <div>
            <p className="font-mono text-[0.62rem] tracking-[0.22em] text-[#00b8cc] uppercase mb-2">
              // PROJECT_{project.id}
            </p>
            <h2
              className="font-ui font-bold text-[1.5rem] tracking-[0.06em] text-white uppercase leading-none"
              style={{ textShadow: "0 0 12px rgba(255,255,255,0.1)" }}
            >
              {project.name}
            </h2>
          </div>

          {/* Description */}
          <div>
            <p className="font-mono text-[0.58rem] tracking-[0.18em] text-[#00b8cc] uppercase mb-2">
              // SYNOPSIS
            </p>
            <p className="font-ui font-normal text-[0.95rem] leading-[1.6] text-[#e2e8f0]">
              {project.description}
            </p>
          </div>

          {/* Stack tags */}
          {project.stack.length > 0 && (
            <div>
              <p className="font-mono text-[0.58rem] tracking-[0.18em] text-[#475569] uppercase mb-2">
                // TECH_STACK
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[0.55rem] tracking-[0.1em] text-[#00e5ff] uppercase px-2 py-[3px]"
                    style={{ border: "1px solid rgba(0,229,255,0.22)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Links */}
          <div className="flex flex-col gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 font-ui font-semibold text-[0.78rem] tracking-[0.15em] text-[#00e5ff] uppercase transition-colors duration-150 hover:bg-[rgba(0,229,255,0.06)]"
              style={{ border: "1px solid rgba(0,229,255,0.32)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <span>VIEW ON GITHUB</span>
              <span className="font-mono text-[0.75rem]">&rarr;</span>
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 font-ui font-semibold text-[0.78rem] tracking-[0.15em] text-[#00b8cc] uppercase transition-colors duration-150 hover:bg-[rgba(0,229,255,0.04)]"
                style={{ border: "1px solid rgba(0,229,255,0.18)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <span>LIVE DEPLOYMENT</span>
                <span className="font-mono text-[0.75rem]">&rarr;</span>
              </a>
            )}
          </div>

          {/* Close hint */}
          <button
            onClick={onClose}
            className="font-mono text-[0.58rem] tracking-[0.2em] text-[#475569] uppercase hover:text-[#94a3b8] transition-colors duration-150 text-left"
          >
            [ESC] CLOSE
          </button>
        </div>
      </motion.div>
    </div>
  );
}
