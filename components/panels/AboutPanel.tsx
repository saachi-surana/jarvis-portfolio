"use client";

import Panel from "@/components/ui/Panel";
import DataRow from "@/components/ui/DataRow";

interface AboutPanelProps {
  shouldAnimate?: boolean;
}

export default function AboutPanel(_props: AboutPanelProps) {
  return (
    <Panel label="// ABOUT">
      <p className="font-ui text-[0.8rem] text-[#475569] mb-4 leading-relaxed tracking-[0.02em]">
        CS &amp; Data Science @ UW Seattle. Dean&rsquo;s List. Building AI systems,
        local inference pipelines, and things that feel alive.
      </p>
      <div className="flex flex-col gap-[2px]">
        <DataRow label="DEGREE" value="B.S. CS & DATA SCIENCE" valueColor="white" />
        <DataRow label="SCHOOL" value="UNIV OF WASHINGTON"     valueColor="white" />
        <DataRow label="STATUS" value="DEAN'S LIST"            valueColor="cyan"  />
        <DataRow label="GRAD"   value="JUNE 2028"              valueColor="white" />

        {/* Email — custom link row */}
        <div className="flex justify-between items-baseline gap-3 py-[3px]">
          <span className="font-mono text-[0.62rem] tracking-[0.18em] text-[#475569] uppercase shrink-0">
            EMAIL
          </span>
          <a
            href="mailto:saachisurana@outlook.com"
            className="font-ui font-semibold text-[0.78rem] text-[#00e5ff] hover:text-white transition-colors duration-150 text-right"
            style={{ textDecoration: "underline", textDecorationColor: "rgba(0,229,255,0.35)" }}
          >
            saachisurana@outlook.com
          </a>
        </div>

        {/* LinkedIn — custom link row */}
        <div className="flex justify-between items-baseline gap-3 py-[3px]">
          <span className="font-mono text-[0.62rem] tracking-[0.18em] text-[#475569] uppercase shrink-0">
            LINKEDIN
          </span>
          <a
            href="https://linkedin.com/in/saachi-surana"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui font-semibold text-[0.82rem] text-[#00e5ff] hover:text-white transition-colors duration-150 text-right"
            style={{ textDecoration: "underline", textDecorationColor: "rgba(0,229,255,0.35)" }}
          >
            saachi-surana
          </a>
        </div>
      </div>
    </Panel>
  );
}
