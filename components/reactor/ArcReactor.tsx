"use client";

import { useRef, useState, useCallback, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

// ─── Ring configuration ──────────────────────────────────────────────────────
//
// Outer rings: cyan + purple from the design system.
// Inner rings: shift progressively toward cold blue-white (#a8ecff → #f0faff).
// Each ring has a unique rotation axis and initial tilt so they never align.

type RingSpec = {
  radius: number;
  tube: number;
  color: string;
  intensity: number;
  speed: number;
  axis: [number, number, number];
  tilt: [number, number, number];
  tubeSeg: number;
};

const RINGS: RingSpec[] = [
  // Outermost — slow cyan orbit on Y
  { radius: 2.80, tube: 0.010, color: "#00e5ff", intensity: 2.5, speed:  0.12, axis: [0,   1,   0  ], tilt: [0,    0,    0   ], tubeSeg: 220 },
  // Cyan-dim on X with slight Z tilt
  { radius: 2.55, tube: 0.013, color: "#00b8cc", intensity: 2.0, speed: -0.20, axis: [1,   0,   0  ], tilt: [0,    0,    0.3 ], tubeSeg: 200 },
  // Purple on diagonal XY
  { radius: 2.30, tube: 0.015, color: "#c084fc", intensity: 2.0, speed:  0.32, axis: [0.7, 1,   0  ], tilt: [0.5,  0,    0   ], tubeSeg: 190 },
  // Cyan on Z with angled tilt
  { radius: 2.05, tube: 0.018, color: "#00e5ff", intensity: 2.5, speed: -0.27, axis: [0,   0,   1  ], tilt: [0.2,  0.4,  0   ], tubeSeg: 170 },
  // Purple-dim on XY diagonal
  { radius: 1.80, tube: 0.020, color: "#9b5fd4", intensity: 1.8, speed:  0.50, axis: [1,   1,   0  ], tilt: [-0.3, 0,    0.5 ], tubeSeg: 160 },
  // Transition — teal-cyan, shifting toward blue-white
  { radius: 1.50, tube: 0.022, color: "#5cddf0", intensity: 2.5, speed: -0.65, axis: [1,   0,   0.7], tilt: [0,    0.6,  0   ], tubeSeg: 150 },
  // Light blue-white, fast
  { radius: 1.20, tube: 0.025, color: "#a8ecff", intensity: 3.0, speed:  0.85, axis: [0,   1,   1  ], tilt: [0.4,  0,   -0.4 ], tubeSeg: 140 },
  // Near-white, faster
  { radius: 0.90, tube: 0.028, color: "#c8f4ff", intensity: 3.5, speed: -1.20, axis: [1,   1,   1  ], tilt: [0,    0,    0   ], tubeSeg: 120 },
  // Almost-white, very fast
  { radius: 0.60, tube: 0.032, color: "#e0f7ff", intensity: 4.5, speed:  1.60, axis: [0,   0,   1  ], tilt: [0.5,  0.3,  0   ], tubeSeg: 100 },
  // Innermost — white-hot, rapid
  { radius: 0.35, tube: 0.038, color: "#f0faff", intensity: 6.0, speed: -2.20, axis: [1,   0,   0  ], tilt: [0,    0.5,  0   ], tubeSeg:  80 },
];

// ─── Ring ────────────────────────────────────────────────────────────────────

function Ring({ radius, tube, color, intensity, speed, axis, tilt, tubeSeg }: RingSpec) {
  const meshRef = useRef<THREE.Mesh>(null!);
  // Stable axis vector — computed once on mount via useRef initial value
  const rotAxis = useRef(new THREE.Vector3(...axis).normalize());

  useFrame((_, delta) => {
    meshRef.current.rotateOnAxis(rotAxis.current, speed * delta);
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
    </mesh>
  );
}

// ─── Particle field ──────────────────────────────────────────────────────────

function Particles({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan   = new THREE.Color("#00e5ff");
    const purple = new THREE.Color("#c084fc");
    const dim    = new THREE.Color("#00b8cc");

    for (let i = 0; i < count; i++) {
      // Spherical distribution in a shell around the reactor
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

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.04;
    ref.current.rotation.x = t * 0.015;
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

// ─── Core + hover flare ──────────────────────────────────────────────────────

function Core({
  hovered,
  onHover,
}: {
  hovered: boolean;
  onHover: (v: boolean) => void;
}) {
  const sphereRef  = useRef<THREE.Mesh>(null!);
  const coronaRef  = useRef<THREE.Mesh>(null!);
  const coronaScale = useRef(0);
  const lightRef   = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // Core pulse + hover scale
    const pulse      = 1 + Math.sin(t * 2.5) * 0.06;
    const targetSc   = hovered ? 1.45 * pulse : pulse;
    const curSc      = sphereRef.current.scale.x;
    sphereRef.current.scale.setScalar(curSc + (targetSc - curSc) * 8 * delta);

    // Core emissive brightens on hover
    const mat = sphereRef.current.material as THREE.MeshStandardMaterial;
    const targetEI = hovered ? 18 : 8;
    mat.emissiveIntensity += (targetEI - mat.emissiveIntensity) * 6 * delta;

    // Corona scale lerp
    const targetCS = hovered ? 1 : 0;
    coronaScale.current += (targetCS - coronaScale.current) * 8 * delta;
    coronaRef.current.scale.setScalar(Math.max(0, coronaScale.current));

    // Corona opacity pulse while hovered
    const cMat = coronaRef.current.material as THREE.MeshStandardMaterial;
    const targetOp = hovered ? 0.07 + Math.sin(t * 4) * 0.025 : 0;
    cMat.opacity += (targetOp - cMat.opacity) * 6 * delta;

    // Point light intensity follows hover
    lightRef.current.intensity += ((hovered ? 8 : 3) - lightRef.current.intensity) * 5 * delta;
  });

  return (
    <group>
      {/* Invisible hitbox — captures pointer events over core area */}
      <mesh
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Hover corona — expands and pulses on hover */}
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

      {/* Visible core sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#e0f8ff"
          emissiveIntensity={8}
          toneMapped={false}
        />
      </mesh>

      {/* Dynamic point light — illuminates inner rings from center */}
      <pointLight ref={lightRef} color="#00e5ff" intensity={3} distance={4} />
    </group>
  );
}

// ─── Scene group — owns all geometry and the parallax tilt ──────────────────

function ReactorScene({
  hovered,
  onHover,
  mouseRef,
}: {
  hovered: boolean;
  onHover: (v: boolean) => void;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    // Lazily lerp toward mouse-based tilt — max ~16 degrees
    const targetX = -mouseRef.current.y * 0.28;
    const targetY =  mouseRef.current.x * 0.28;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 3 * delta;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 3 * delta;
  });

  return (
    <group ref={groupRef}>
      {RINGS.map((spec, i) => (
        <Ring key={i} {...spec} />
      ))}
      <Core hovered={hovered} onHover={onHover} />
      <Particles count={1200} />
    </group>
  );
}

// ─── ArcReactor — exported component ────────────────────────────────────────

export default function ArcReactor() {
  const [hovered, setHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  // Stable offset vector for ChromaticAberration
  const caOffset = useRef(new THREE.Vector2(0.0008, 0.0008));

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x =  ((e.clientX - r.left) / r.width  - 0.5) * 2;
    mouseRef.current.y = -((e.clientY - r.top)  / r.height - 0.5) * 2;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
  }, []);

  return (
    <div
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        {/* True black background — matches the overall #000000 palette */}
        <color attach="background" args={["#000000"]} />
        {/* Minimal ambient so rings aren't invisible on the dark side */}
        <ambientLight intensity={0.04} />

        <Suspense fallback={null}>
          <ReactorScene
            hovered={hovered}
            onHover={setHovered}
            mouseRef={mouseRef}
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
