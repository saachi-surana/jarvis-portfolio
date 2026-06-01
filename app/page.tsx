"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import BootSequence from "@/components/effects/BootSequence";
import ScrollHUD from "@/components/layout/ScrollHUD";

export default function Page() {
  // Container ref so scrollYProgress tracks this element, not window —
  // prevents browser scroll-restoration from starting at non-zero progress.
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const [booted,     setBooted]     = useState(false);
  const [spinningUp, setSpinningUp] = useState(false);
  const spinFiredRef = useRef(false);

  // Guarantee top on mount (belt-and-suspenders alongside containerRef).
  useEffect(() => {
    containerRef.current?.scrollTo(0, 0);
  }, []);

  // Fire spin-up exactly once on first scroll past threshold.
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > 0.02 && !spinFiredRef.current) {
        spinFiredRef.current = true;
        setSpinningUp(true);
        setTimeout(() => setSpinningUp(false), 800);
      }
    });
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        // Hide scrollbar — visual only, scroll still works
        scrollbarWidth: "none",
      }}
      className="[&::-webkit-scrollbar]:hidden"
    >
      {/* Scrollable height = 200vh; sticky child pins to viewport top */}
      <div style={{ height: "200vh" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "#000",
          }}
        >
          {!booted && <BootSequence onComplete={() => setBooted(true)} />}
          <ScrollHUD
            scrollYProgress={scrollYProgress}
            booted={booted}
            spinningUp={spinningUp}
          />
        </div>
      </div>
    </div>
  );
}
