"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { ReactorMode } from "@/lib/store";
import { MODE_COLORS, MODE_INTENSITY_MULT, MODE_SPEED_MULT, CYAN_BORDER } from "@/lib/constants";

export type RingSpec = {
  radius: number; tube: number; color: string; intensity: number;
  speed: number; axis: [number,number,number]; tilt: [number,number,number];
  tubeSeg: number; sectionId: string; sectionLabel: string;
};

export interface RingProps extends RingSpec {
  mode: ReactorMode;
  onHoverChange: (hovered: boolean, sectionId: string) => void;
  onRingClick:   (sectionId: string) => void;
  isHovered:     boolean;
}

export const RINGS: RingSpec[] = [
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

export function Ring({
  radius, tube, color, intensity, speed, axis, tilt, tubeSeg,
  sectionId, sectionLabel, mode, onHoverChange, onRingClick, isHovered,
}: RingProps) {
  const meshRef  = useRef<THREE.Mesh>(null!);
  const rotAxis  = useRef(new THREE.Vector3(...axis).normalize());
  const curColor = useRef(new THREE.Color(color));
  const curEI    = useRef(intensity);

  useFrame((_, delta) => {
    const targetColor = new THREE.Color(MODE_COLORS[mode] || color);
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
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} toneMapped={false} />
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); onHoverChange(true, sectionId); }}
        onPointerOut={(e)  => { e.stopPropagation(); onHoverChange(false, sectionId); }}
        onClick={(e)       => { e.stopPropagation(); onRingClick(sectionId); }}
      >
        <torusGeometry args={[radius, 0.12, 6, tubeSeg]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {isHovered && (
        <Html position={[radius + 0.2, 0, 0]} style={{ pointerEvents: "none", whiteSpace: "nowrap" }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.6rem",
            letterSpacing: "0.18em", color: "#00b8cc", textTransform: "uppercase",
            background: "rgba(0,0,0,0.75)", padding: "2px 6px",
            border: `1px solid ${CYAN_BORDER}`, userSelect: "none",
          }}>
            {sectionLabel}
          </span>
        </Html>
      )}
    </mesh>
  );
}
