"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const crosshairRef = useRef<HTMLDivElement>(null);
  const ringRef      = useRef<HTMLDivElement>(null);
  const mouseRef     = useRef({ x: -100, y: -100 });
  const ringPosRef   = useRef({ x: -100, y: -100 });
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    // Don't activate on touch-primary devices
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (crosshairRef.current) {
        crosshairRef.current.style.transform =
          `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    // Lerp factor ≈ 0.14 per frame at 60fps ≈ ~80ms lag feel
    const animate = () => {
      const { x: mx, y: my } = mouseRef.current;
      const pos = ringPosRef.current;
      pos.x += (mx - pos.x) * 0.14;
      pos.y += (my - pos.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${pos.x - 12}px, ${pos.y - 12}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* 12px crosshair — moves instantly */}
      <div
        ref={crosshairRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none"
        style={{ width: 12, height: 12, zIndex: 9997, willChange: "transform" }}
      >
        <span
          className="absolute top-1/2 left-0 w-full"
          style={{
            height: "1px",
            background: "#00e5ff",
            transform: "translateY(-50%)",
            boxShadow: "0 0 4px rgba(0,229,255,0.6)",
          }}
        />
        <span
          className="absolute left-1/2 top-0 h-full"
          style={{
            width: "1px",
            background: "#00e5ff",
            transform: "translateX(-50%)",
            boxShadow: "0 0 4px rgba(0,229,255,0.6)",
          }}
        />
      </div>

      {/* 24px outer ring — lags ~80ms */}
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: 24,
          height: 24,
          border: "1px solid rgba(0,229,255,0.5)",
          borderRadius: "50%",
          zIndex: 9997,
          willChange: "transform",
        }}
      />
    </>
  );
}
