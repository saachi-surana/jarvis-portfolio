"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import type { Message } from "./ChatMessage";
import { getResponse, GREETING } from "./responses";

let _id = 0;
const nextId = () => String(++_id);

const CHAR_MS = 25;

interface JarvisChatProps {
  booted?: boolean;
}

export default function JarvisChat({ booted }: JarvisChatProps) {
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [isTyping, setIsTyping]   = useState(false);
  const bottomRef                  = useRef<HTMLDivElement>(null);
  const timerRef                   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const greetedRef                 = useRef(false);

  const typeMessage = useCallback((text: string) => {
    const id = nextId();
    setIsTyping(true);
    setMessages((prev) => [
      ...prev,
      { id, role: "jarvis", text, typed: "", done: false },
    ]);

    let i = 0;
    const tick = () => {
      i += 1;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, typed: text.slice(0, i), done: i >= text.length }
            : m
        )
      );
      if (i < text.length) {
        timerRef.current = setTimeout(tick, CHAR_MS);
      } else {
        setIsTyping(false);
      }
    };
    timerRef.current = setTimeout(tick, CHAR_MS);
  }, []);

  // Start greeting once booted
  useEffect(() => {
    if (!booted || greetedRef.current) return;
    greetedRef.current = true;
    const tid = setTimeout(() => typeMessage(GREETING), 350);
    return () => clearTimeout(tid);
  }, [booted, typeMessage]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const submit = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "user", text: trimmed, typed: trimmed, done: true },
    ]);
    setInput("");

    const response = getResponse(trimmed);
    const responseDelay = setTimeout(() => typeMessage(response), 280);
    timerRef.current = responseDelay;
  }, [input, isTyping, typeMessage]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#000" }}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4 min-h-0">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0"
        style={{ borderTop: "1px solid rgba(0,229,255,0.12)" }}
      >
        <span
          className="font-mono text-[0.85rem] shrink-0 select-none"
          style={{ color: "#00e5ff" }}
          aria-hidden
        >
          &gt;
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={isTyping}
          placeholder={isTyping ? "" : "ENTER COMMAND_"}
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent outline-none border-none font-mono text-[0.82rem] text-white placeholder:text-[#2d3748] tracking-[0.04em]"
          style={{ caretColor: "#00e5ff" }}
        />
      </div>
    </div>
  );
}
