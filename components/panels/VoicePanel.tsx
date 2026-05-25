"use client";

import Panel from "@/components/ui/Panel";
import Waveform from "@/components/ui/Waveform";

interface VoicePanelProps {
  shouldAnimate?: boolean;
}

export default function VoicePanel(_props: VoicePanelProps) {
  return (
    <Panel noPadding>
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase">
            // VOICE_ANALYSIS
          </span>
          <span
            className="font-mono text-[0.55rem] tracking-[0.15em] text-[#00e5ff] uppercase px-1.5 py-0.5"
            style={{ border: "1px solid rgba(0,229,255,0.35)" }}
          >
            NOMINAL
          </span>
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-center">
        <Waveform width={220} height={38} color="#00e5ff" />
      </div>
    </Panel>
  );
}
