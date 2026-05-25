"use client";

import { useEffect, useRef } from "react";

interface RadarDisplayProps {
  size?: number;
}

const BLIPS = [
  { angle: 38,  r: 0.38 },
  { angle: 148, r: 0.61 },
  { angle: 252, r: 0.45 },
];

export default function RadarDisplay({ size = 100 }: RadarDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const angleRef  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx   = size / 2;
    const cy   = size / 2;
    const maxR = size / 2 - 3;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Concentric grid rings
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (maxR * i) / 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,229,255,0.1)";
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }

      // Cross-hairs
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR);
      ctx.strokeStyle = "rgba(0,229,255,0.07)";
      ctx.lineWidth   = 0.5;
      ctx.stroke();

      const sweepRad = (angleRef.current * Math.PI) / 180;

      // Sweep fill arc (trailing glow)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, sweepRad - 1.1, sweepRad);
      ctx.closePath();
      const x2 = cx + maxR * Math.cos(sweepRad);
      const y2 = cy + maxR * Math.sin(sweepRad);
      const grad = ctx.createLinearGradient(cx, cy, x2, y2);
      grad.addColorStop(0, "rgba(0,229,255,0)");
      grad.addColorStop(1, "rgba(0,229,255,0.12)");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // Sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "rgba(0,229,255,0.75)";
      ctx.lineWidth   = 1;
      ctx.shadowBlur  = 5;
      ctx.shadowColor = "#00e5ff";
      ctx.stroke();
      ctx.shadowBlur  = 0;

      // Blips — fade in as sweep passes, then decay
      BLIPS.forEach((blip) => {
        const diff = ((angleRef.current % 360) - blip.angle + 360) % 360;
        if (diff < 70) {
          const opacity = (1 - diff / 70) * 0.95;
          const bx = cx + maxR * blip.r * Math.cos((blip.angle * Math.PI) / 180);
          const by = cy + maxR * blip.r * Math.sin((blip.angle * Math.PI) / 180);
          ctx.beginPath();
          ctx.arc(bx, by, 2, 0, Math.PI * 2);
          ctx.fillStyle  = `rgba(0,229,255,${opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#00e5ff";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      angleRef.current = (angleRef.current + 0.9) % 360;
      rafRef.current   = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size]);

  return <canvas ref={canvasRef} aria-hidden="true" className="block shrink-0" />;
}
