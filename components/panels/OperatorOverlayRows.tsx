"use client";

// ─── Shared row sub-components for OperatorOverlay ───────────────────────────

export function OverlayDataRow({
  label, value, valueColor = "white",
}: {
  label: string; value: string; valueColor?: "white" | "cyan";
}) {
  return (
    <div className="flex justify-between items-baseline gap-3 py-[4px]">
      <span className="font-mono text-[0.58rem] tracking-[0.18em] text-[#475569] uppercase shrink-0">
        {label}
      </span>
      <span className={`font-ui font-semibold text-[0.85rem] text-right ${
        valueColor === "cyan" ? "text-[#00e5ff]" : "text-white"
      }`}>
        {value}
      </span>
    </div>
  );
}

export function OverlayLinkRow({
  label, display, href, external = false,
}: {
  label: string; display: string; href: string; external?: boolean;
}) {
  return (
    <div
      className="flex justify-between items-baseline gap-3 py-[4px]"
      style={{ borderBottom: "1px solid rgba(0,229,255,0.06)" }}
    >
      <span className="font-mono text-[0.58rem] tracking-[0.18em] text-[#475569] uppercase shrink-0">
        {label}
      </span>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="font-mono text-[0.72rem] tracking-[0.06em] text-[#00e5ff] hover:text-white transition-colors duration-150 text-right"
        style={{ textDecoration: "underline", textDecorationColor: "rgba(0,229,255,0.35)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {display}
      </a>
    </div>
  );
}
