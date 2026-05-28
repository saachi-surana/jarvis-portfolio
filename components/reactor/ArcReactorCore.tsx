"use client";

import { useRef, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { ReactorMode } from "@/lib/store";
import { useJarvisStore } from "@/lib/store";

// Smoothly moves the camera to the cameraZ value set by scroll reveal
export function CameraRig() {
  const { camera } = useThree();
  const cameraZ = useJarvisStore((s) => s.cameraZ);
  useFrame(() => {
    (camera as THREE.PerspectiveCamera).position.z +=
      (cameraZ - (camera as THREE.PerspectiveCamera).position.z) * 0.04;
  });
  return null;
}

interface CoreProps {
  hovered:     boolean;
  onHover:     (v: boolean) => void;
  mode:        ReactorMode;
  onCoreClick: () => void;
}

export function Core({ hovered, onHover, mode, onCoreClick }: CoreProps) {
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
      const targetEI = hovered ? 18 : mode === "overdrive" ? 14 : mode === "stealth" ? 2 : 8;
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
      <mesh onPointerOver={() => onHover(true)} onPointerOut={() => onHover(false)} onClick={handleClick}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh ref={coronaRef} scale={0}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={3}
          transparent opacity={0} side={THREE.BackSide} toneMapped={false} depthWrite={false} />
      </mesh>

      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#e0f8ff" emissiveIntensity={8} toneMapped={false} />
      </mesh>

      <pointLight ref={lightRef} color="#00e5ff" intensity={3} distance={4} />
    </group>
  );
}
