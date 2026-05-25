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
      ? "text-[#475569]"
      : "text-white";

  return (
    <div className="flex justify-between items-baseline gap-3 py-[3px]">
      <span className="font-mono text-[0.62rem] tracking-[0.18em] text-[#475569] uppercase shrink-0">
        {label}
      </span>
      <span className={`font-ui font-semibold text-[0.82rem] text-right ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}
