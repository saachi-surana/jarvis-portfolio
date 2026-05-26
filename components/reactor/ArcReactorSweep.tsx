"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  CASING_RADIUS, CASING_SEG, CASING_GAP,
  TICK_COUNT, TICK_RADIUS,
  C_CYAN,
} from "@/lib/constants";

// ─── Segmented outer casing (static) ─────────────────────────────────────────

export function CasingRing() {
  const segments = useMemo(() => {
    const items: THREE.Mesh[] = [];
    const segAngle = (Math.PI * 2) / CASING_SEG;
    for (let i = 0; i < CASING_SEG; i++) {
      const angle     = i * segAngle;
      const spanAngle = segAngle - CASING_GAP;
      const geo = new THREE.TorusGeometry(
        CASING_RADIUS, 0.055, 4, Math.max(2, Math.round(spanAngle * 32)), spanAngle,
      );
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a1a"),
        emissive: new THREE.Color(C_CYAN),
        emissiveIntensity: 0.3,
        metalness: 0.8,
        roughness: 0.4,
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.z = angle + spanAngle / 2;
      items.push(mesh);
    }
    return items;
  }, []);

  return (
    <group>
      {segments.map((mesh, i) => <primitive key={i} object={mesh} />)}
    </group>
  );
}

// ─── Tick marks ring ─────────────────────────────────────────────────────────

export function TickMarks() {
  const geo = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < TICK_COUNT; i++) {
      const angle   = (i / TICK_COUNT) * Math.PI * 2;
      const len     = i % 4 === 0 ? 0.14 : 0.07;
      const inner   = TICK_RADIUS;
      const outer   = TICK_RADIUS + len;
      positions.push(
        Math.cos(angle) * inner, Math.sin(angle) * inner, 0,
        Math.cos(angle) * outer, Math.sin(angle) * outer, 0,
      );
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={C_CYAN} toneMapped={false} />
    </lineSegments>
  );
}

// ─── Radar sweep (shader) ────────────────────────────────────────────────────

const VERT = `
  varying float vAngle;
  void main() {
    vAngle = atan(position.y, position.x);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const FRAG = `
  varying float vAngle;
  uniform float uTime;
  void main() {
    float speed = 0.1047197551; // 2π/60 = 1 RPM
    float lead  = mod(uTime * speed, 6.28318);
    float diff  = mod(lead - vAngle + 6.28318, 6.28318);
    float fade  = diff < 1.5708 ? (1.0 - diff / 1.5708) : 0.0;
    gl_FragColor = vec4(0.0, 0.898, 1.0, fade * 0.45);
  }
`;

export function RadarSweep() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const geo = useMemo(() => {
    const segs  = 128;
    const verts = [0, 0, 0];
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      verts.push(Math.cos(a) * TICK_RADIUS, Math.sin(a) * TICK_RADIUS, 0);
    }
    const indices: number[] = [];
    for (let i = 1; i <= segs; i++) indices.push(0, i, i + 1);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    g.setIndex(indices);
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
