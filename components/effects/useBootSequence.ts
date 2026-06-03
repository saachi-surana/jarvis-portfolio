"use client";

import { useState, useEffect, useRef } from "react";

const LINE1 = "INITIALIZING SYSTEMS...";
const LINE2 = "OPERATOR PORTFOLIO SYSTEM — BUILT BY SAACHI SURANA";

// LINE1: 23 chars × 65ms = ~1.5s  |  LINE2: 50 chars × 30ms = 1.5s
const SPEED1 = 65;
const SPEED2 = 30;

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
    // 1400ms gives the 1.0s title fade-in animation time to fully complete
    const t2 = setTimeout(() => setPhase("typing1"), 1400);
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
    }, SPEED1);
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
        // Hold 800ms after all text appears, then signal complete
        setTimeout(() => {
          if (!completedRef.current) {
            completedRef.current = true;
            setPhase("fade");
            onComplete();
            setTimeout(() => setVisible(false), 400);
          }
        }, 800);
      }
    }, SPEED2);
    return () => clearInterval(iv);
  }, [phase, onComplete]);

  return { phase, line1, line2, showTitle, visible };
}
