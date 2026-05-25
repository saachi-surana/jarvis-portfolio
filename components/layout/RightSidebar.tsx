"use client";

const PANELS = [
  "OPERATOR_ID",
  "ACTIVE_PROJECTS",
  "SKILLS",
  "VITALS",
  "NETWORK",
];

export default function RightSidebar() {
  return (
    <aside
      style={{ borderLeft: "1px solid rgba(0,229,255,0.18)" }}
      className="w-[300px] shrink-0 bg-[#050a0a] overflow-y-auto flex flex-col gap-2 p-3"
    >
      {PANELS.map((label) => (
        <div
          key={label}
          style={{ border: "1px solid rgba(0,229,255,0.18)" }}
          className="relative bg-[#050a0a] p-4 flex-1 min-h-[60px] flex items-center before:absolute before:top-[-1px] before:left-[-1px] before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-[#00e5ff]"
        >
          <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00b8cc] uppercase">
            // {label}
          </span>
        </div>
      ))}
    </aside>
  );
}
