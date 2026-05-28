import { create } from "zustand";
import { useEffect, useRef } from "react";

// "NONE" = outside IDLE radius but not in any narrow directional band
export type MouseZone = "IDENTITY" | "PROJECTS" | "EXPERIENCE" | "CONTACT" | "IDLE" | "NONE";

const IDLE_RADIUS = 200; // px — large enough that small movements don't trigger zones

// Narrow directional bands (60° each, math convention: 0°=right, 90°=up, y-flipped for screen)
function computeZone(mx: number, my: number, cx: number, cy: number): MouseZone {
  const dx = mx - cx;
  const dy = -(my - cy); // flip y: screen y increases downward
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < IDLE_RADIUS) return "IDLE";
  const angle = ((Math.atan2(dy, dx) * 180 / Math.PI) + 360) % 360;
  if (angle >= 330 || angle <  30)  return "PROJECTS";   // right: 330°–30°
  if (angle >=  60 && angle < 120)  return "EXPERIENCE"; // up:    60°–120°
  if (angle >= 150 && angle < 210)  return "IDENTITY";   // left:  150°–210°
  if (angle >= 240 && angle < 300)  return "CONTACT";    // down:  240°–300°
  return "NONE"; // between bands — no popup
}

interface ZoneStore {
  zone: MouseZone;
  reactorCenter: { x: number; y: number };
  setReactorCenter: (x: number, y: number) => void;
  setZone: (z: MouseZone) => void;
}

export const useMouseZoneStore = create<ZoneStore>((set) => ({
  zone: "IDLE",
  reactorCenter: { x: 0, y: 0 },
  setReactorCenter: (x, y) => set({ reactorCenter: { x, y } }),
  setZone: (zone) => set({ zone }),
}));

export function useMouseZone(): MouseZone {
  return useMouseZoneStore((s) => s.zone);
}

/** Call once to wire up the global mouse listener. Re-runs when reactor center changes. */
export function useMouseZoneTracker(): void {
  const centerX = useMouseZoneStore((s) => s.reactorCenter.x);
  const centerY = useMouseZoneStore((s) => s.reactorCenter.y);
  const setZone  = useMouseZoneStore((s) => s.setZone);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const z = computeZone(e.clientX, e.clientY, centerX, centerY);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setZone(z), 400); // 400ms debounce
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [centerX, centerY, setZone]);
}
