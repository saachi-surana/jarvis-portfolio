"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import LeftSidebar from "./LeftSidebar";
import CenterPanel from "./CenterPanel";
import RightSidebar from "./RightSidebar";
import BootSequence from "@/components/effects/BootSequence";
import ScrollRevealHUD from "./ScrollRevealHUD";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function JarvisHUD() {
  const [booted, setBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  // Desktop: scroll-driven reveal
  if (!isMobile) {
    return <ScrollRevealHUD booted={booted} onBootComplete={handleBootComplete} />;
  }

  // Mobile: direct HUD after boot (no scroll reveal)
  return (
    <div className="flex flex-col bg-black min-h-screen">
      <BootSequence onComplete={handleBootComplete} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <TopBar />
      </motion.div>

      <div className="flex flex-col flex-1 min-h-0">
        <LeftSidebar booted={booted} />
        <motion.div
          className="flex-1 min-w-0 min-h-0"
          initial={{ opacity: 0, scale: 0.975 }}
          animate={booted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.975 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        >
          <CenterPanel booted={booted} />
        </motion.div>
        <RightSidebar booted={booted} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, delay: 0.75, ease: EASE }}
      >
        <BottomBar />
      </motion.div>
    </div>
  );
}
