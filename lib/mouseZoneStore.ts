import { create } from "zustand";
import { useEffect, useRef } from "react";

export type MouseZone = "IDENTITY" | "PROJECTS" | "EXPERIENCE" | "CONTACT" | "IDLE";

const IDLE_RADIUS = 120; // px — within this radius from reactor center = IDLE

// Angles: 0° = right, 90° = up, 180° = left, 270° = down (math convention, y-flipped for screen)
function computeZone(mx: number, my: number, cx: number, cy: number): MouseZone {
  const dx = mx - cx;
  const dy = -(my - cy); // flip y: screen y increases downward, math y increases upward
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < IDLE_RADIUS) return "IDLE";
  const angle = ((Math.atan2(dy, dx) * 180 / Math.PI) + 360) % 360;
  if (angle > 315 || angle <= 45)  return "PROJECTS";   // right
  if (angle > 45  && angle <= 135) return "EXPERIENCE"; // up
  if (angle > 135 && angle <= 225) return "IDENTITY";   // left
  return "CONTACT";                                      // down (225–315)
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

/** Convenience selector — read current zone in any component */
export function useMouseZone(): MouseZone {
  return useMouseZoneStore((s) => s.zone);
}

/** Call once at the root of the reactor layout to wire up the global listener */
export function useMouseZoneTracker(): void {
  const centerX = useMouseZoneStore((s) => s.reactorCenter.x);
  const centerY = useMouseZoneStore((s) => s.reactorCenter.y);
  const setZone  = useMouseZoneStore((s) => s.setZone);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const z = computeZone(e.clientX, e.clientY, centerX, centerY);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setZone(z), 200);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [centerX, centerY, setZone]);
}
