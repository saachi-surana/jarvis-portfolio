"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import BootSequence from "@/components/effects/BootSequence";
import ScrollHUD from "@/components/layout/ScrollHUD";

export default function Page() {
  const { scrollYProgress } = useScroll();
  const [booted, setBooted]     = useState(false);
  const [spinningUp, setSpinningUp] = useState(false);
  const spinFiredRef = useRef(false);

  // Fire spin-up exactly once on first scroll past threshold
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
  );
}
