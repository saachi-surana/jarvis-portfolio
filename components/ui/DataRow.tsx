"use client";

interface DataRowProps {
  label: string;
  value: string;
  valueColor?: "white" | "cyan" | "muted";
}

export default function DataRow({ label, value, valueColor = "white" }: DataRowProps) {
  const valueClass =
    valueColor === "cyan"
      ? "text-[#00e5ff]"
      : valueColor === "muted"
      ? "text-[#64748b]"
      : "text-white";

  return (
    <div className="flex justify-between items-baseline gap-3 py-[3px]">
      <span className="font-mono text-[0.65rem] tracking-[0.18em] text-[#00b8cc] uppercase shrink-0">
        {label}
      </span>
      <span className={`font-ui font-semibold text-[0.9rem] text-right ${valueClass}`}
        style={{ textShadow: valueColor === "white" ? "0 0 8px rgba(255,255,255,0.08)" : undefined }}
      >
        {value}
      </span>
    </div>
  );
}
