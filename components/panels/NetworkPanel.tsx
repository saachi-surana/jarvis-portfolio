"use client";

import Panel from "@/components/ui/Panel";
import DataRow from "@/components/ui/DataRow";
import RadarDisplay from "@/components/ui/RadarDisplay";

interface NetworkPanelProps {
  shouldAnimate?: boolean;
}

export default function NetworkPanel(_props: NetworkPanelProps) {
  return (
    <Panel noPadding sectionId="network">
      {/* Top-left corner bracket — Panel already renders it */}

      {/* Header row */}
      <div
        className="px-4 pt-4 pb-3"
        style={{ borderBottom: "1px solid rgba(0,229,255,0.08)" }}
      >
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase">
          // GLOBAL_UPLINK
        </p>
        <p className="font-mono text-[0.55rem] tracking-[0.18em] text-[#475569] uppercase mt-[3px]">
          SEATTLE WA &mdash; ONLINE
        </p>
      </div>

      {/* Radar + data rows */}
      <div className="flex items-center gap-4 px-4 py-3">
        <RadarDisplay size={80} />
        <div className="flex flex-col gap-[3px] flex-1">
          <DataRow label="PING"      value="24ms"      valueColor="cyan"  />
          <DataRow label="BANDWIDTH" value="783 Mb/s"  valueColor="white" />
          <DataRow label="STATUS"    value="NOMINAL"   valueColor="cyan"  />
        </div>
      </div>
    </Panel>
  );
}
