"use client";

import { useState, useEffect, useRef } from "react";
import { DUR_BOOT_CHAR } from "@/lib/constants";

const LINE1 = "INITIALIZING SYSTEMS...";
const LINE2 = "OPERATOR PORTFOLIO SYSTEM — BUILT BY SAACHI SURANA";

type Phase = "title" | "typing1" | "typing2" | "fade";

export function useBootSequence(onComplete: () => void) {
  const [phase, setPhase]         = useState<Phase>("title");
  const [line1, setLine1]         = useState("");
  const [line2, setLine2]         = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [visible, setVisible]     = useState(true);
  const completedRef              = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 150);
    const t2 = setTimeout(() => setPhase("typing1"), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== "typing1") return;
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setLine1(LINE1.slice(0, i));
      if (i >= LINE1.length) {
        clearInterval(iv);
        setTimeout(() => setPhase("typing2"), 100);
      }
    }, DUR_BOOT_CHAR);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing2") return;
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setLine2(LINE2.slice(0, i));
      if (i >= LINE2.length) {
        clearInterval(iv);
        setTimeout(() => {
          if (!completedRef.current) {
            completedRef.current = true;
            setPhase("fade");
            onComplete();
            setTimeout(() => setVisible(false), 100);
          }
        }, 100);
      }
    }, 10); // 10ms/char → 50 chars = 500ms total
    return () => clearInterval(iv);
  }, [phase, onComplete]);

  return { phase, line1, line2, showTitle, visible };
}
