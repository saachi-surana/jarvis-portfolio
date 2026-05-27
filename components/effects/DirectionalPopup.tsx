"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { MouseZone } from "@/lib/mouseZoneStore";
import { useJarvisStore } from "@/lib/store";

interface PopupProps { zone: MouseZone }

const PANEL: React.CSSProperties = {
  position: "absolute", background: "#000",
  border: "1px solid rgba(0,229,255,0.45)",
  boxShadow: "inset 0 0 8px rgba(0,229,255,0.05), 0 0 16px rgba(0,229,255,0.15)",
  padding: "8px 11px", maxWidth: 210, zIndex: 20, pointerEvents: "auto",
};
const CORNER: React.CSSProperties = {
  position: "absolute", top: -1, left: -1,
  width: 10, height: 10,
  borderTop: "1.5px solid #00e5ff", borderLeft: "1.5px solid #00e5ff",
};
const LABEL = { fontFamily: "'Space Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.18em", color: "#00b8cc", textTransform: "uppercase" as const };
const ROW   = { fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", color: "#e2e8f0", lineHeight: 1.4 };
const LINK  = { fontFamily: "'Rajdhani',sans-serif", fontSize: "0.8rem", color: "#00e5ff", textDecoration: "none" as const };
const FADE  = { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.2 } };

function IdentityContent() {
  const { setShowAbout } = useJarvisStore();
  return (
    <div style={PANEL}>
      <span style={CORNER} aria-hidden />
      <p style={LABEL}>// OPERATOR</p>
      <p style={{ ...ROW, color: "#fff", fontWeight: 600, marginTop: 4 }}>SAACHI SURANA</p>
      <p style={ROW}>ROLE: STUDENT // DEVELOPER</p>
      <p style={ROW}>SCHOOL: UNIV OF WASHINGTON</p>
      <p style={ROW}>STATUS: DEAN&apos;S LIST 2028</p>
      <button onClick={() => setShowAbout(true)} style={{ ...LINK, background: "none", border: "none", cursor: "none", marginTop: 6, display: "block" }}>
        expand profile →
      </button>
    </div>
  );
}

function ProjectsContent() {
  const { setHighlightSection } = useJarvisStore();
  return (
    <div style={PANEL}>
      <span style={CORNER} aria-hidden />
      <p style={LABEL}>// FEATURED</p>
      <p style={{ ...ROW, marginTop: 4 }}><span style={{ color: "#00b8cc" }}>01</span> JARVIS — Voice AI (MCP)</p>
      <p style={ROW}><span style={{ color: "#00b8cc" }}>02</span> STUDYSYNC — Local AI study</p>
      <p style={ROW}><span style={{ color: "#00b8cc" }}>03</span> QUERY — Live Q&amp;A + AI</p>
      <button onClick={() => setHighlightSection("projects")} style={{ ...LINK, background: "none", border: "none", cursor: "none", marginTop: 6, display: "block" }}>
        all 9 entries →
      </button>
    </div>
  );
}

function ExperienceContent() {
  const { setHighlightSection } = useJarvisStore();
  return (
    <div style={PANEL}>
      <span style={CORNER} aria-hidden />
      <p style={LABEL}>// CURRENT</p>
      <p style={{ ...ROW, color: "#00e5ff", marginTop: 4 }}>CoreWeave — Prod. Engineering</p>
      <p style={{ ...ROW, color: "#00e5ff" }}>UW BioRobotics — Researcher</p>
      <p style={{ ...LABEL, marginTop: 6 }}>// RECENT</p>
      <p style={{ ...ROW, marginTop: 2 }}>UW Hsu Lab — CS &amp; Physics</p>
      <button onClick={() => setHighlightSection("experience")} style={{ ...LINK, background: "none", border: "none", cursor: "none", marginTop: 6, display: "block" }}>
        expand →
      </button>
    </div>
  );
}

function ContactContent() {
  return (
    <div style={PANEL}>
      <span style={CORNER} aria-hidden />
      <p style={LABEL}>// CONTACT</p>
      <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 3 }}>
        <a href="mailto:saachisurana@outlook.com" target="_blank" rel="noopener noreferrer" style={LINK}>saachisurana@outlook.com</a>
        <a href="mailto:saachi7@uw.edu" target="_blank" rel="noopener noreferrer" style={LINK}>saachi7@uw.edu</a>
        <a href="https://linkedin.com/in/saachi-surana" target="_blank" rel="noopener noreferrer" style={LINK}>linkedin.com/in/saachi-surana</a>
        <a href="https://github.com/saachi-surana" target="_blank" rel="noopener noreferrer" style={LINK}>github.com/saachi-surana</a>
      </div>
    </div>
  );
}

const POSITIONS: Record<string, React.CSSProperties> = {
  IDENTITY:   { left: 12, top: "50%", transform: "translateY(-50%)" },
  PROJECTS:   { right: 12, top: "50%", transform: "translateY(-50%)" },
  EXPERIENCE: { top: 14, left: "50%", transform: "translateX(-50%)" },
  CONTACT:    { bottom: 14, left: "50%", transform: "translateX(-50%)" },
};

const CONTENT: Record<string, React.ReactElement> = {
  IDENTITY:   <IdentityContent />,
  PROJECTS:   <ProjectsContent />,
  EXPERIENCE: <ExperienceContent />,
  CONTACT:    <ContactContent />,
};

export default function DirectionalPopup({ zone }: PopupProps) {
  const key = zone === "IDLE" ? null : zone;
  return (
    <AnimatePresence>
      {key && (
        <motion.div
          key={key}
          style={{ position: "absolute", zIndex: 20, ...POSITIONS[key] }}
          {...FADE}
        >
          {CONTENT[key]}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
