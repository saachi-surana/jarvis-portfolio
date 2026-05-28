"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import ProjectOverlay from "@/components/panels/ProjectOverlay";

const LABEL = { fontFamily: "'Space Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.18em", color: "#00b8cc", textTransform: "uppercase" as const, marginBottom: 2 };
const VALUE = { fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem", color: "#ffffff", letterSpacing: "0.08em" };
const SECTION = { fontFamily: "'Space Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.22em", color: "rgba(0,229,255,0.5)", textTransform: "uppercase" as const, marginBottom: 8 };

export function IdentityContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={SECTION}>// IDENTITY</div>
      <div>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.85rem", color: "#00e5ff", letterSpacing: "0.1em", marginBottom: 2 }}>SAACHI SURANA</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.5rem", color: "rgba(0,229,255,0.6)", letterSpacing: "0.18em" }}>STUDENT // DEVELOPER</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          ["SCHOOL",  "UNIVERSITY OF WASHINGTON"],
          ["DEGREE",  "CS + DATA SCIENCE"],
          ["STATUS",  "DEAN'S LIST"],
          ["GRAD",    "2028"],
        ].map(([label, val]) => (
          <div key={label}>
            <div style={LABEL}>{label}</div>
            <div style={VALUE}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(0,229,255,0.15)", paddingTop: 8, fontFamily: "'Rajdhani', sans-serif", fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.55 }}>
        Building systems that bridge AI with everyday tooling.
      </div>
    </div>
  );
}

export function ProjectsContent() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, pointerEvents: "all" }}>
        <div style={SECTION}>// ACTIVE_PROJECTS</div>
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            style={{
              display: "flex", alignItems: "center", gap: 8, background: "transparent",
              border: "none", cursor: "pointer", textAlign: "left", padding: "3px 0",
              borderBottom: "1px solid rgba(0,229,255,0.07)",
            }}
          >
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.5rem", color: "#00b8cc" }}>{p.id}</span>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.8rem", color: "#e2e8f0", letterSpacing: "0.06em" }}>{p.name}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected && <ProjectOverlay project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

const ENTRIES = [
  { role: "PRODUCTION ENGINEERING INTERN", company: "COREWEAVE",          date: "JUNE 2026 – AUG 2026"   },
  { role: "UNDERGRADUATE RESEARCHER",      company: "UW BIOROBOTICS LAB", date: "JAN 2026 – PRESENT"     },
  { role: "CS & PARTICLE PHYSICS INTERN",  company: "UW HSU LAB",         date: "SEP 2024 – JUNE 2025"   },
  { role: "SOFTWARE ENGINEERING INTERN",   company: "C2S TECHNOLOGIES",   date: "JULY 2024 – SEP 2024"   },
  { role: "CO-FOUNDER & CO-PRESIDENT",     company: "THE FUTURE IS FEMALE", date: "SEP 2022 – PRESENT"   },
];

export function ExperienceContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 340, overflowY: "auto" }}>
      <div style={SECTION}>// EXPERIENCE</div>
      {ENTRIES.map((e, i) => (
        <div key={i} style={{ borderBottom: "1px solid rgba(0,229,255,0.07)", paddingBottom: 8 }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.82rem", color: "#ffffff", letterSpacing: "0.06em" }}>{e.role}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.5rem", color: "#00e5ff", letterSpacing: "0.14em", marginTop: 2 }}>{e.company}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.45rem", color: "#64748b", letterSpacing: "0.1em", marginTop: 2 }}>{e.date}</div>
        </div>
      ))}
    </div>
  );
}

const CONTACTS = [
  { label: "PRIMARY",  value: "saachi7@uw.edu",                          href: "mailto:saachi7@uw.edu"                       },
  { label: "LINKEDIN", value: "linkedin.com/in/saachisurana",            href: "https://linkedin.com/in/saachisurana"        },
  { label: "GITHUB",   value: "github.com/saachi-surana",                href: "https://github.com/saachi-surana"            },
  { label: "UW CS",    value: "saachi@cs.washington.edu",                href: "mailto:saachi@cs.washington.edu"             },
];

export function ContactContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, pointerEvents: "all" }}>
      <div style={SECTION}>// CONTACT</div>
      {CONTACTS.map(({ label, value, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
          style={{ display: "block", textDecoration: "none", borderBottom: "1px solid rgba(0,229,255,0.07)", paddingBottom: 8 }}>
          <div style={LABEL}>{label}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", color: "#00e5ff", letterSpacing: "0.1em", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#00e5ff")}
          >{value}</div>
        </a>
      ))}
    </div>
  );
}
