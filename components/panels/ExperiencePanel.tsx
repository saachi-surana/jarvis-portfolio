"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Panel from "@/components/ui/Panel";

interface Entry {
  id: string;
  role: string;
  company: string;
  date: string;
  location: string;
  desc: string;
}

const ENTRIES: Entry[] = [
  {
    id: "01",
    role: "PRODUCTION ENGINEERING INTERN",
    company: "COREWEAVE",
    date: "JUNE 2026 – AUG 2026",
    location: "BELLEVUE, WA",
    desc: "Self-healing infrastructure automation and observability across a GPU hyperscaler platform.",
  },
  {
    id: "02",
    role: "UNDERGRADUATE RESEARCHER",
    company: "UW BIOROBOTICS LAB",
    date: "JAN 2026 – PRESENT",
    location: "SEATTLE, WA",
    desc: "Automated data processing pipelines and signal analysis for human motor control research.",
  },
  {
    id: "03",
    role: "CS & PARTICLE PHYSICS INTERN",
    company: "UW HSU LAB",
    date: "SEP 2024 – JUNE 2025",
    location: "SEATTLE, WA",
    desc: "Stellar object classification using deep learning on telescope observation data.",
  },
  {
    id: "04",
    role: "SOFTWARE ENGINEERING INTERN",
    company: "C2S TECHNOLOGIES",
    date: "JULY 2024 – SEP 2024",
    location: "SEATTLE, WA",
    desc: "Built an end-to-end AI/ML application independently from brief to production.",
  },
  {
    id: "05",
    role: "CO-FOUNDER & CO-PRESIDENT",
    company: "THE FUTURE IS FEMALE",
    date: "SEP 2022 – PRESENT",
    location: "SEATTLE, WA",
    desc: "CS education nonprofit delivering technical programming to students across the Seattle area.",
  },
];

interface ExperiencePanelProps {
  shouldAnimate?: boolean;
}

export default function ExperiencePanel(_props: ExperiencePanelProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Panel noPadding>
      <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase px-4 pt-4 pb-0 mb-3">
        // EXPERIENCE
      </p>
      <div className="pb-2">
        {ENTRIES.map((e) => {
          const isOpen = expanded.has(e.id);
          return (
            <div key={e.id} style={{ borderTop: "1px solid rgba(0,229,255,0.08)" }}>
              <button
                onClick={() => toggle(e.id)}
                className="w-full flex items-start gap-3 px-4 py-[7px] text-left group transition-colors duration-150 hover:bg-[rgba(0,229,255,0.06)]"
              >
                {/* ID */}
                <span className="font-mono text-[0.58rem] tracking-[0.1em] text-[#00b8cc] shrink-0 w-4 tabular-nums mt-[1px]">
                  {e.id}
                </span>

                {/* Role + company */}
                <div className="flex-1 min-w-0">
                  <span
                    className="font-ui font-semibold text-[0.85rem] tracking-[0.04em] text-white group-hover:text-[#00e5ff] uppercase transition-colors duration-150 leading-tight block"
                    style={{ textShadow: "0 0 8px rgba(255,255,255,0.08)" }}
                  >
                    {e.role}
                    <span className="text-[#475569] mx-1">//</span>
                    <span className="text-[#00e5ff]">{e.company}</span>
                  </span>
                  <span className="font-mono text-[0.58rem] tracking-[0.1em] text-[#64748b] uppercase block mt-[2px]">
                    {e.date}
                  </span>
                </div>

                {/* Expand chevron */}
                <span
                  className="font-mono text-[0.65rem] text-[#64748b] shrink-0 mt-[1px] transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  &rsaquo;
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-4 pb-3 pl-11">
                      <p className="font-mono text-[0.55rem] tracking-[0.12em] text-[#64748b] uppercase mb-[3px]">
                        {e.location}
                      </p>
                      <p className="font-ui font-normal text-[0.9rem] text-[#e2e8f0] leading-[1.6] tracking-[0.01em]">
                        {e.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
