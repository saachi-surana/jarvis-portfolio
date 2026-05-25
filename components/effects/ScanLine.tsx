"use client";

export default function ScanLine() {
  return (
    <div
      aria-hidden
      className="scan-line fixed left-0 w-full pointer-events-none"
      style={{
        height: "1px",
        background: "rgba(0,229,255,0.04)",
        zIndex: 9998,
        top: "-2px",
      }}
    />
  );
}
