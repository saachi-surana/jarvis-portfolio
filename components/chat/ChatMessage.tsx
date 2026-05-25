"use client";

export interface Message {
  id: string;
  role: "jarvis" | "user";
  text: string;
  typed: string;
  done: boolean;
}

type Segment =
  | { kind: "text"; content: string }
  | { kind: "link"; url: string };

function parseSegments(text: string): Segment[] {
  const segments: Segment[] = [];
  const regex = /\[LINK:\s*([^\]]+)\]/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({ kind: "text", content: text.slice(last, match.index) });
    }
    segments.push({ kind: "link", url: match[1].trim() });
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    segments.push({ kind: "text", content: text.slice(last) });
  }
  return segments;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isJarvis = message.role === "jarvis";
  const displayText = isJarvis ? message.typed : message.text;
  const segments = parseSegments(displayText);

  return (
    <div className="flex flex-col gap-[2px]">
      <span
        className="font-mono text-[0.52rem] tracking-[0.25em] uppercase select-none"
        style={{ color: isJarvis ? "#00e5ff" : "#475569" }}
      >
        {isJarvis ? "J.A.R.V.I.S" : "YOU"}
      </span>

      <p className="font-mono text-[0.77rem] leading-relaxed whitespace-pre-wrap"
         style={{ color: isJarvis ? "#94a3b8" : "#ffffff" }}>
        {segments.map((seg, i) =>
          seg.kind === "link" ? (
            <a
              key={i}
              href={seg.url.startsWith("http") ? seg.url : `https://${seg.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-white"
              style={{
                color: "#00e5ff",
                textDecoration: "underline",
                textDecorationColor: "rgba(0,229,255,0.35)",
              }}
            >
              {seg.url}
            </a>
          ) : (
            <span key={i}>{seg.content}</span>
          )
        )}
        {isJarvis && !message.done && (
          <span
            className="animate-pulse inline-block ml-[1px]"
            style={{ color: "#00e5ff" }}
            aria-hidden
          >
            &#x2588;
          </span>
        )}
      </p>
    </div>
  );
}
