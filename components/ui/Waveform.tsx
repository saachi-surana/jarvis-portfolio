"use client";

import { useEffect, useRef } from "react";

interface WaveformProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function Waveform({ width = 240, height = 40, color = "#00e5ff" }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const tRef      = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = width  * dpr;
    canvas.height = height * dpr;
    canvas.style.width  = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineWidth   = 1.5;
      ctx.shadowBlur  = 10;
      ctx.shadowColor = color;

      ctx.beginPath();
      for (let x = 0; x <= width; x++) {
        const nx = x / width;
        const y =
          height / 2 +
          Math.sin(nx * 6.5 * Math.PI + tRef.current)         * 9 +
          Math.sin(nx * 13  * Math.PI + tRef.current * 1.35)  * 4.5 +
          Math.sin(nx * 3.2 * Math.PI + tRef.current * 0.7)   * 3;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      tRef.current += 0.045;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height, color]);

  return (
    <canvas
      ref={canvasRef}
      className="block"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
