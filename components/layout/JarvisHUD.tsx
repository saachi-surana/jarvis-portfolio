"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import LeftSidebar from "./LeftSidebar";
import CenterPanel from "./CenterPanel";
import RightSidebar from "./RightSidebar";
import BootSequence from "@/components/effects/BootSequence";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function JarvisHUD() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      {/* Boot overlay — renders on top of everything until dismissed */}
      <BootSequence onComplete={handleBootComplete} />

      {/* Top bar — fades in with the boot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <TopBar />
      </motion.div>

      <div className="flex flex-1 min-h-0">
        {/* Left sidebar — panels stagger in individually */}
        <LeftSidebar booted={booted} />

        {/* Center panel — materializes slightly after left */}
        <motion.div
          className="flex-1 min-w-0"
          initial={{ opacity: 0, scale: 0.975 }}
          animate={booted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.975 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        >
          <CenterPanel />
        </motion.div>

        {/* Right sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={booted ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
          transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
        >
          <RightSidebar />
        </motion.div>
      </div>

      {/* Bottom bar — last to appear */}
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
