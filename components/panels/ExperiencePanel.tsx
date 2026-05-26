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
            <div key={e.id} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <button
                onClick={() => toggle(e.id)}
                className="w-full flex items-start gap-3 px-4 py-[7px] text-left group transition-colors duration-150 hover:bg-[rgba(0,229,255,0.04)]"
              >
                {/* ID */}
                <span className="font-mono text-[0.55rem] tracking-[0.1em] text-[#475569] shrink-0 w-4 tabular-nums mt-[1px]">
                  {e.id}
                </span>

                {/* Role + company */}
                <div className="flex-1 min-w-0">
                  <span className="font-ui font-semibold text-[0.78rem] tracking-[0.04em] text-[#94a3b8] group-hover:text-white uppercase transition-colors duration-150 leading-tight block">
                    {e.role}
                    <span className="text-[#475569] mx-1">//</span>
                    <span className="text-[#00b8cc]">{e.company}</span>
                  </span>
                  <span className="font-mono text-[0.58rem] tracking-[0.1em] text-[#475569] uppercase block mt-[2px]">
                    {e.date}
                  </span>
                </div>

                {/* Expand chevron */}
                <span
                  className="font-mono text-[0.65rem] text-[#475569] shrink-0 mt-[1px] transition-transform duration-200"
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
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-4 pb-3 pl-11">
                      <p className="font-mono text-[0.55rem] tracking-[0.12em] text-[#475569] uppercase mb-[2px]">
                        {e.location}
                      </p>
                      <p className="font-ui text-[0.8rem] text-[#475569] leading-relaxed tracking-[0.02em]">
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
