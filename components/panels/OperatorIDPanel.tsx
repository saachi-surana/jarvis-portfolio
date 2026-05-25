"use client";

import Panel from "@/components/ui/Panel";

interface OperatorIDPanelProps {
  shouldAnimate?: boolean;
}

export default function OperatorIDPanel(_props: OperatorIDPanelProps) {
  return (
    <Panel corner="both">
      <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase mb-3">
        // OPERATOR_ID
      </p>
      <p className="font-ui font-bold text-[1.4rem] tracking-[0.06em] text-white uppercase leading-none mb-1">
        SAACHI SURANA
      </p>
      <p className="font-mono text-[0.68rem] tracking-[0.18em] text-[#00e5ff] uppercase mb-4">
        STUDENT // DEVELOPER
      </p>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[0.55rem] tracking-[0.18em] text-[#475569] uppercase">
          GITHUB
        </span>
        <span
          className="font-mono text-[0.55rem] tracking-[0.1em] text-[#475569]"
          aria-hidden
        >
          /
        </span>
        <a
          href="https://github.com/saachi-surana"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.62rem] tracking-[0.08em] text-[#00e5ff] hover:text-white transition-colors duration-150"
          style={{ textDecoration: "underline", textDecorationColor: "rgba(0,229,255,0.35)" }}
        >
          saachisurana
        </a>
      </div>
    </Panel>
  );
}
