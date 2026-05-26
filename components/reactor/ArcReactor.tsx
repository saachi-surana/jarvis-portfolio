"use client";

import { useRef, useState, useCallback, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { useJarvisStore, type ReactorMode } from "@/lib/store";
import { RING_MESSAGES } from "@/components/chat/responses";

// ─── Mode config ─────────────────────────────────────────────────────────────

const MODE_COLORS: Record<ReactorMode, string> = {
  "online":    "",
  "red-alert": "#ff3333",
  "stealth":   "#1a0a2e",
  "overdrive": "",
};

const MODE_INTENSITY_MULT: Record<ReactorMode, number> = {
  "online":    1.0,
  "red-alert": 1.6,
  "stealth":   0.22,
  "overdrive": 2.8,
};

const MODE_SPEED_MULT: Record<ReactorMode, number> = {
  "online":    1.0,
  "red-alert": 1.4,
  "stealth":   0.28,
  "overdrive": 2.6,
};

// ─── Ring configuration ──────────────────────────────────────────────────────

type RingSpec = {
  radius: number;
  tube: number;
  color: string;
  intensity: number;
  speed: number;
  axis: [number, number, number];
  tilt: [number, number, number];
  tubeSeg: number;
  sectionId: string;
  sectionLabel: string;
};

const RINGS: RingSpec[] = [
  { radius: 2.80, tube: 0.010, color: "#00e5ff", intensity: 2.5, speed:  0.12, axis: [0,   1,   0  ], tilt: [0,    0,    0   ], tubeSeg: 220, sectionId: "projects",   sectionLabel: "// ACTIVE_PROJECTS" },
  { radius: 2.55, tube: 0.013, color: "#00b8cc", intensity: 2.0, speed: -0.20, axis: [1,   0,   0  ], tilt: [0,    0,    0.3 ], tubeSeg: 200, sectionId: "skills",      sectionLabel: "// SKILLS"          },
  { radius: 2.30, tube: 0.015, color: "#c084fc", intensity: 2.0, speed:  0.32, axis: [0.7, 1,   0  ], tilt: [0.5,  0,    0   ], tubeSeg: 190, sectionId: "vitals",      sectionLabel: "// VITALS"          },
  { radius: 2.05, tube: 0.018, color: "#00e5ff", intensity: 2.5, speed: -0.27, axis: [0,   0,   1  ], tilt: [0.2,  0.4,  0   ], tubeSeg: 170, sectionId: "network",     sectionLabel: "// NETWORK"         },
  { radius: 1.80, tube: 0.020, color: "#9b5fd4", intensity: 1.8, speed:  0.50, axis: [1,   1,   0  ], tilt: [-0.3, 0,    0.5 ], tubeSeg: 160, sectionId: "operator-id", sectionLabel: "// OPERATOR_ID"     },
  { radius: 1.50, tube: 0.022, color: "#5cddf0", intensity: 2.5, speed: -0.65, axis: [1,   0,   0.7], tilt: [0,    0.6,  0   ], tubeSeg: 150, sectionId: "diagnostics", sectionLabel: "// DIAGNOSTICS"     },
  { radius: 1.20, tube: 0.025, color: "#a8ecff", intensity: 3.0, speed:  0.85, axis: [0,   1,   1  ], tilt: [0.4,  0,   -0.4 ], tubeSeg: 140, sectionId: "voice",       sectionLabel: "// VOICE ANALYSIS"  },
  { radius: 0.90, tube: 0.028, color: "#c8f4ff", intensity: 3.5, speed: -1.20, axis: [1,   1,   1  ], tilt: [0,    0,    0   ], tubeSeg: 120, sectionId: "atmospheric", sectionLabel: "// ATMOSPHERIC"     },
  { radius: 0.60, tube: 0.032, color: "#e0f7ff", intensity: 4.5, speed:  1.60, axis: [0,   0,   1  ], tilt: [0.5,  0.3,  0   ], tubeSeg: 100, sectionId: "location",    sectionLabel: "// LOCATION"        },
  { radius: 0.35, tube: 0.038, color: "#f0faff", intensity: 6.0, speed: -2.20, axis: [1,   0,   0  ], tilt: [0,    0.5,  0   ], tubeSeg:  80, sectionId: "operator",    sectionLabel: "// OPERATOR"        },
];

// ─── Ring ────────────────────────────────────────────────────────────────────

interface RingProps extends RingSpec {
  mode: ReactorMode;
  onHoverChange: (hovered: boolean, sectionId: string) => void;
  onRingClick: (sectionId: string) => void;
  isHovered: boolean;
}

function Ring({
  radius, tube, color, intensity, speed, axis, tilt, tubeSeg,
  sectionId, sectionLabel, mode, onHoverChange, onRingClick, isHovered,
}: RingProps) {
  const meshRef  = useRef<THREE.Mesh>(null!);
  const rotAxis  = useRef(new THREE.Vector3(...axis).normalize());
  const curColor = useRef(new THREE.Color(color));
  const curEI    = useRef(intensity);

  useFrame((_, delta) => {
    const modeColorHex = MODE_COLORS[mode];
    const targetColor  = new THREE.Color(modeColorHex || color);
    curColor.current.lerp(targetColor, 5 * delta);
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.color.copy(curColor.current);
    mat.emissive.copy(curColor.current);

    const targetEI = intensity * MODE_INTENSITY_MULT[mode] * (isHovered ? 1.6 : 1.0);
    curEI.current += (targetEI - curEI.current) * 5 * delta;
    mat.emissiveIntensity = curEI.current;

    meshRef.current.rotateOnAxis(rotAxis.current, speed * MODE_SPEED_MULT[mode] * delta);
  });

  return (
    <mesh ref={meshRef} rotation={tilt}>
      <torusGeometry args={[radius, tube, 8, tubeSeg]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity}
        toneMapped={false}
      />

      {/* Invisible wider hitbox for reliable pointer events */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); onHoverChange(true, sectionId); }}
        onPointerOut={(e)  => { e.stopPropagation(); onHoverChange(false, sectionId); }}
        onClick={(e)       => { e.stopPropagation(); onRingClick(sectionId); }}
      >
        <torusGeometry args={[radius, 0.12, 6, tubeSeg]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {isHovered && (
        <Html
          position={[radius + 0.2, 0, 0]}
          style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              color: "#00b8cc",
              textTransform: "uppercase",
              background: "rgba(0,0,0,0.75)",
              padding: "2px 6px",
              border: "1px solid rgba(0,229,255,0.25)",
              userSelect: "none",
            }}
          >
            {sectionLabel}
          </span>
        </Html>
      )}
    </mesh>
  );
}

// ─── Particle field ──────────────────────────────────────────────────────────

function Particles({ count = 1200, mode }: { count?: number; mode: ReactorMode }) {
  const ref = useRef<THREE.Points>(null!);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan   = new THREE.Color("#00e5ff");
    const purple = new THREE.Color("#c084fc");
    const dim    = new THREE.Color("#00b8cc");

    for (let i = 0; i < count; i++) {
      const r     = 2.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      const c = t < 0.55 ? cyan : t < 0.80 ? purple : dim;
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.04 * MODE_SPEED_MULT[mode];
    ref.current.rotation.x = t * 0.015 * MODE_SPEED_MULT[mode];

    const mat = ref.current.material as THREE.PointsMaterial;
    const targetOpacity =
      mode === "stealth" ? 0.18 :
      mode === "overdrive" ? 0.9 :
      0.65;
    mat.opacity += (targetOpacity - mat.opacity) * 3 * delta;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── Burst particles ──────────────────────────────────────────────────────────

const BURST_COUNT = 100;

function BurstParticles({ burstTick, mode }: { burstTick: number; mode: ReactorMode }) {
  const ref = useRef<THREE.Points>(null!);

  const basePos = useMemo(() => {
    const arr = new Float32Array(BURST_COUNT * 3);
    for (let i = 0; i < BURST_COUNT; i++) {
      const r     = 1.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const velocities = useRef(new Float32Array(BURST_COUNT * 3));
  const active     = useRef(false);
  const elapsed    = useRef(0);
  const prevTick   = useRef(0);

  const geo = useMemo(() => {
    const g   = new THREE.BufferGeometry();
    const pos = new Float32Array(basePos);
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (burstTick !== prevTick.current) {
      prevTick.current = burstTick;
      for (let i = 0; i < BURST_COUNT; i++) {
        const mag = 2.5 + Math.random() * 1.5;
        const dir = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
        ).normalize().multiplyScalar(mag);
        velocities.current[i * 3]     = dir.x;
        velocities.current[i * 3 + 1] = dir.y;
        velocities.current[i * 3 + 2] = dir.z;
      }
      active.current  = true;
      elapsed.current = 0;
    }

    if (!active.current) return;

    elapsed.current += delta;
    const progress = Math.min(elapsed.current / 0.8, 1);
    const burst    = Math.sin(progress * Math.PI);

    const posArr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < BURST_COUNT; i++) {
      posArr[i * 3]     = basePos[i * 3]     + velocities.current[i * 3]     * burst;
      posArr[i * 3 + 1] = basePos[i * 3 + 1] + velocities.current[i * 3 + 1] * burst;
      posArr[i * 3 + 2] = basePos[i * 3 + 2] + velocities.current[i * 3 + 2] * burst;
    }
    geo.attributes.position.needsUpdate = true;

    if (progress >= 1) active.current = false;
  });

  const burstColor =
    mode === "red-alert" ? "#ff4444" :
    mode === "stealth"   ? "#4a2080" :
    mode === "overdrive" ? "#ffffff" :
    "#00e5ff";

  return (
    <points geometry={geo} ref={ref}>
      <pointsMaterial
        size={0.025}
        color={burstColor}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── Core ────────────────────────────────────────────────────────────────────

function Core({
  hovered,
  onHover,
  mode,
  onCoreClick,
}: {
  hovered: boolean;
  onHover: (v: boolean) => void;
  mode: ReactorMode;
  onCoreClick: () => void;
}) {
  const sphereRef   = useRef<THREE.Mesh>(null!);
  const coronaRef   = useRef<THREE.Mesh>(null!);
  const coronaScale = useRef(0);
  const lightRef    = useRef<THREE.PointLight>(null!);
  const clickFlash  = useRef(0);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    const pulse    = 1 + Math.sin(t * 2.5) * 0.06;
    const targetSc = hovered ? 1.45 * pulse : pulse;
    const curSc    = sphereRef.current.scale.x;
    sphereRef.current.scale.setScalar(curSc + (targetSc - curSc) * 8 * delta);

    const mat = sphereRef.current.material as THREE.MeshStandardMaterial;

    if (clickFlash.current > 0) {
      clickFlash.current -= delta;
      mat.emissiveIntensity = 25;
    } else {
      const coreColor =
        mode === "red-alert" ? "#ff2222" :
        mode === "stealth"   ? "#220840" :
        mode === "overdrive" ? "#ffffff" :
        "#e0f8ff";
      mat.emissive.lerp(new THREE.Color(coreColor), 4 * delta);
      const targetEI =
        hovered     ? 18 :
        mode === "overdrive" ? 14 :
        mode === "stealth"   ? 2  :
        8;
      mat.emissiveIntensity += (targetEI - mat.emissiveIntensity) * 6 * delta;
    }

    const targetCS = hovered ? 1 : 0;
    coronaScale.current += (targetCS - coronaScale.current) * 8 * delta;
    coronaRef.current.scale.setScalar(Math.max(0, coronaScale.current));
    const cMat = coronaRef.current.material as THREE.MeshStandardMaterial;
    const targetOp = hovered ? 0.07 + Math.sin(t * 4) * 0.025 : 0;
    cMat.opacity += (targetOp - cMat.opacity) * 6 * delta;

    lightRef.current.intensity += ((hovered ? 8 : 3) - lightRef.current.intensity) * 5 * delta;
  });

  const handleClick = useCallback(() => {
    clickFlash.current = 0.12;
    onCoreClick();
  }, [onCoreClick]);

  return (
    <group>
      <mesh
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh ref={coronaRef} scale={0}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={3}
          transparent
          opacity={0}
          side={THREE.BackSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#e0f8ff"
          emissiveIntensity={8}
          toneMapped={false}
        />
      </mesh>

      <pointLight ref={lightRef} color="#00e5ff" intensity={3} distance={4} />
    </group>
  );
}

// ─── Scene group ─────────────────────────────────────────────────────────────

function ReactorScene({
  hovered, onHover, mouseRef, mode, hoveredRing,
  onRingHoverChange, onRingClick, burstTick, onCoreClick,
}: {
  hovered: boolean;
  onHover: (v: boolean) => void;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  mode: ReactorMode;
  hoveredRing: string | null;
  onRingHoverChange: (hovered: boolean, sectionId: string) => void;
  onRingClick: (sectionId: string) => void;
  burstTick: number;
  onCoreClick: () => void;
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
      {RINGS.map((spec, i) => (
        <Ring
          key={i}
          {...spec}
          mode={mode}
          isHovered={hoveredRing === spec.sectionId}
          onHoverChange={onRingHoverChange}
          onRingClick={onRingClick}
        />
      ))}
      <Core hovered={hovered} onHover={onHover} mode={mode} onCoreClick={onCoreClick} />
      <Particles count={1200} mode={mode} />
      <BurstParticles burstTick={burstTick} mode={mode} />
    </group>
  );
}

// ─── ArcReactor — exported component ─────────────────────────────────────────

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

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
  }, []);

  const handleRingHoverChange = useCallback((isHovered: boolean, sectionId: string) => {
    setHoveredRing(isHovered ? sectionId : null);
  }, []);

  const handleRingClick = useCallback((sectionId: string) => {
    setHighlightSection(sectionId);
    const msg = RING_MESSAGES[sectionId];
    if (msg) queueMessage(msg);
  }, [setHighlightSection, queueMessage]);

  const handleCoreClick = useCallback(() => {
    setBurstTick((t) => t + 1);
  }, []);

  return (
    <div
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* OPERATOR label — absolute overlay centered below the core */}
      <button
        onClick={() => setShowAbout(true)}
        className="absolute left-1/2 z-10 flex flex-col items-center gap-[3px] group"
        style={{
          top: "58%",
          transform: "translateX(-50%)",
          background: "transparent",
          border: "none",
          padding: "4px 10px",
        }}
        aria-label="View operator profile"
      >
        <span
          className="font-mono text-[0.55rem] tracking-[0.22em] uppercase select-none transition-colors duration-200 group-hover:text-[#00e5ff]"
          style={{ color: "rgba(0,229,255,0.35)", animation: "operatorPulse 3s ease-in-out infinite" }}
        >
          // OPERATOR
        </span>
        <span
          className="block w-3 h-px transition-colors duration-200 group-hover:bg-[#00e5ff]"
          style={{ background: "rgba(0,229,255,0.25)" }}
        />
      </button>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.04} />

        <Suspense fallback={null}>
          <ReactorScene
            hovered={hovered}
            onHover={setHovered}
            mouseRef={mouseRef}
            mode={reactorMode}
            hoveredRing={hoveredRing}
            onRingHoverChange={handleRingHoverChange}
            onRingClick={handleRingClick}
            burstTick={burstTick}
            onCoreClick={handleCoreClick}
          />
        </Suspense>

        <EffectComposer>
          <Bloom
            intensity={2.0}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration
            offset={caOffset.current}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.15} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
