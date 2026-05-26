"use client";

import { useRef, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useJarvisStore } from "@/lib/store";
import { RING_MESSAGES } from "@/components/chat/responses";
import { Ring, RINGS } from "./ArcReactorRings";
import { Core } from "./ArcReactorCore";
import { Particles, BurstParticles } from "./ArcReactorParticles";
import { CasingRing, TickMarks, RadarSweep } from "./ArcReactorSweep";
import { DataLabels } from "./ArcReactorLabels";
import type { ReactorMode } from "@/lib/store";

// ─── Scene ────────────────────────────────────────────────────────────────────

function ReactorScene({
  hovered, onHover, mouseRef, mode, hoveredRing,
  onRingHoverChange, onRingClick, burstTick, onCoreClick,
}: {
  hovered: boolean; onHover: (v: boolean) => void;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  mode: ReactorMode; hoveredRing: string | null;
  onRingHoverChange: (hovered: boolean, sectionId: string) => void;
  onRingClick: (sectionId: string) => void;
  burstTick: number; onCoreClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    const targetX = -mouseRef.current.y * 0.28;
    const targetY =  mouseRef.current.x * 0.28;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 3 * delta;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 3 * delta;
  });

  return (
    <group ref={groupRef}>
      <CasingRing />
      <TickMarks />
      <RadarSweep />
      <DataLabels />
      {RINGS.map((spec, i) => (
        <Ring key={i} {...spec} mode={mode}
          isHovered={hoveredRing === spec.sectionId}
          onHoverChange={onRingHoverChange} onRingClick={onRingClick}
        />
      ))}
      <Core hovered={hovered} onHover={onHover} mode={mode} onCoreClick={onCoreClick} />
      <Particles count={2000} mode={mode} />
      <BurstParticles burstTick={burstTick} mode={mode} />
    </group>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export default function ArcReactor() {
  const [hovered,     setHovered]     = useState(false);
  const [hoveredRing, setHoveredRing] = useState<string | null>(null);
  const [burstTick,   setBurstTick]   = useState(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const caOffset = useRef(new THREE.Vector2(0.0008, 0.0008));

  const { reactorMode, setHighlightSection, queueMessage, setShowAbout } = useJarvisStore();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x =  ((e.clientX - r.left) / r.width  - 0.5) * 2;
    mouseRef.current.y = -((e.clientY - r.top)  / r.height - 0.5) * 2;
  }, []);

  const handleRingHoverChange = useCallback((isHovered: boolean, sectionId: string) => {
    setHoveredRing(isHovered ? sectionId : null);
  }, []);

  const handleRingClick = useCallback((sectionId: string) => {
    setHighlightSection(sectionId);
    const msg = RING_MESSAGES[sectionId];
    if (msg) queueMessage(msg);
  }, [setHighlightSection, queueMessage]);

  return (
    <div className="absolute inset-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseRef.current.x = 0; mouseRef.current.y = 0; }}
    >
      <button
        onClick={() => setShowAbout(true)}
        className="absolute left-1/2 z-10 flex flex-col items-center gap-[3px] group"
        style={{ top: "58%", transform: "translateX(-50%)", background: "transparent", border: "none", padding: "4px 10px" }}
        aria-label="View operator profile"
      >
        <span className="font-mono text-[0.55rem] tracking-[0.22em] uppercase select-none transition-colors duration-200 group-hover:text-[#00e5ff]"
          style={{ color: "rgba(0,229,255,0.35)", animation: "operatorPulse 3s ease-in-out infinite" }}>
          // OPERATOR
        </span>
        <span className="block w-3 h-px transition-colors duration-200 group-hover:bg-[#00e5ff]"
          style={{ background: "rgba(0,229,255,0.25)" }} />
      </button>

      <Canvas camera={{ position: [0, 0, 7.2], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.04} />
        <Suspense fallback={null}>
          <ReactorScene
            hovered={hovered} onHover={setHovered} mouseRef={mouseRef}
            mode={reactorMode} hoveredRing={hoveredRing}
            onRingHoverChange={handleRingHoverChange} onRingClick={handleRingClick}
            burstTick={burstTick} onCoreClick={() => setBurstTick((t) => t + 1)}
          />
        </Suspense>
        <EffectComposer>
          <Bloom intensity={2.5} luminanceThreshold={0.1} luminanceSmoothing={0.85} />
          <ChromaticAberration offset={caOffset.current} radialModulation={false} modulationOffset={0} />
          <Vignette eskil={false} offset={0.15} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
