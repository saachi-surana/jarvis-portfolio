"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ReactorMode } from "@/lib/store";
import { MODE_SPEED_MULT, BURST_COUNT, C_CYAN, C_PURPLE, C_CYAN_DIM } from "@/lib/constants";

// ─── Ambient particle field ───────────────────────────────────────────────────

export function Particles({ count = 2000, mode }: { count?: number; mode: ReactorMode }) {
  const ref = useRef<THREE.Points>(null!);

  const geo = useMemo(() => {
    const g   = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan   = new THREE.Color(C_CYAN);
    const purple = new THREE.Color(C_PURPLE);
    const dim    = new THREE.Color(C_CYAN_DIM);

    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.45) {
        // Orbital band
        const r     = 2.6 + Math.random() * 1.8;
        const theta = Math.random() * Math.PI * 2;
        pos[i * 3]     = r * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(theta) * 0.3 + (Math.random() - 0.5) * 0.8;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      } else {
        // Free drift sphere
        const r     = 3.0 + Math.random() * 2.8;
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
      }
      const t = Math.random();
      const c = t < 0.55 ? cyan : t < 0.80 ? purple : dim;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
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
    const targetOpacity = mode === "stealth" ? 0.18 : mode === "overdrive" ? 0.9 : 0.65;
    mat.opacity += (targetOpacity - mat.opacity) * 3 * delta;
    mat.size = 0.015 + Math.sin(t * 1.2) * 0.003;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.015} vertexColors transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ─── Burst particles (core click) ────────────────────────────────────────────

export function BurstParticles({ burstTick, mode }: { burstTick: number; mode: ReactorMode }) {
  const ref      = useRef<THREE.Points>(null!);
  const vels     = useRef(new Float32Array(BURST_COUNT * 3));
  const active   = useRef(false);
  const elapsed  = useRef(0);
  const prevTick = useRef(0);

  const { geo, basePos } = useMemo(() => {
    const arr = new Float32Array(BURST_COUNT * 3);
    for (let i = 0; i < BURST_COUNT; i++) {
      const r = 1.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(arr), 3));
    return { geo: g, basePos: arr };
  }, []);

  useFrame((_, delta) => {
    if (burstTick !== prevTick.current) {
      prevTick.current = burstTick;
      for (let i = 0; i < BURST_COUNT; i++) {
        const mag = 2.5 + Math.random() * 1.5;
        const dir = new THREE.Vector3(
          (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2,
        ).normalize().multiplyScalar(mag);
        vels.current[i * 3] = dir.x; vels.current[i * 3 + 1] = dir.y; vels.current[i * 3 + 2] = dir.z;
      }
      active.current = true; elapsed.current = 0;
    }
    if (!active.current) return;
    elapsed.current += delta;
    const progress = Math.min(elapsed.current / 0.8, 1);
    const burst    = Math.sin(progress * Math.PI);
    const posArr   = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < BURST_COUNT; i++) {
      posArr[i * 3]     = basePos[i * 3]     + vels.current[i * 3]     * burst;
      posArr[i * 3 + 1] = basePos[i * 3 + 1] + vels.current[i * 3 + 1] * burst;
      posArr[i * 3 + 2] = basePos[i * 3 + 2] + vels.current[i * 3 + 2] * burst;
    }
    geo.attributes.position.needsUpdate = true;
    if (progress >= 1) active.current = false;
  });

  const burstColor =
    mode === "red-alert" ? "#ff4444" : mode === "stealth" ? "#4a2080" :
    mode === "overdrive" ? "#ffffff" : C_CYAN;

  return (
    <points geometry={geo} ref={ref}>
      <pointsMaterial size={0.025} color={burstColor} transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  );
}
