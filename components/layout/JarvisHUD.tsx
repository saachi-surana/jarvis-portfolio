"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import LeftSidebar from "./LeftSidebar";
import CenterPanel from "./CenterPanel";
import RightSidebar from "./RightSidebar";
import BootSequence from "@/components/effects/BootSequence";

const EASE = [0.16, 1, 0.3, 1] as const;

interface JarvisHUDProps {
  skipBoot?: boolean; // true on /hud — skip boot sequence, run entrance animations directly
}

export default function JarvisHUD({ skipBoot = false }: JarvisHUDProps) {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  // When skipBoot: trigger animations immediately after mount (no boot sequence)
  useEffect(() => {
    if (skipBoot) setBooted(true);
  }, [skipBoot]);

  // Entrance animation parameters differ based on entry path
  const topBarAnim   = skipBoot
    ? { initial: { opacity: 0, y: -40 }, transition: { duration: 0.35, delay: 0.2, ease: EASE } }
    : { initial: { opacity: 0, y: 0   }, transition: { duration: 0.6,  delay: 0,   ease: EASE } };

  const centerAnim   = skipBoot
    ? { initial: { opacity: 0, scale: 0.84 }, transition: { duration: 0.45, delay: 0,   ease: EASE } }
    : { initial: { opacity: 0, scale: 0.975 }, transition: { duration: 0.7,  delay: 0.5, ease: EASE } };

  const bottomBarAnim = skipBoot
    ? { initial: { opacity: 0, y: 20 }, transition: { duration: 0.35, delay: 0.2, ease: EASE } }
    : { initial: { opacity: 0, y: 8  }, transition: { duration: 0.5,  delay: 0.75, ease: EASE } };

  return (
    <div className="flex flex-col bg-black min-h-screen md:h-screen md:overflow-hidden">
      {!skipBoot && <BootSequence onComplete={handleBootComplete} />}

      <motion.div
        initial={topBarAnim.initial}
        animate={booted ? { opacity: 1, y: 0 } : topBarAnim.initial}
        transition={topBarAnim.transition}
      >
        <TopBar />
      </motion.div>

      <div className="flex flex-col md:flex-row md:flex-1 md:min-h-0">
        <LeftSidebar booted={booted} />

        <motion.div
          className="flex-1 min-w-0 md:min-h-0"
          initial={centerAnim.initial}
          animate={booted ? { opacity: 1, scale: 1 } : centerAnim.initial}
          transition={centerAnim.transition}
        >
          <CenterPanel booted={booted} />
        </motion.div>

        <RightSidebar booted={booted} />
      </div>

      <motion.div
        initial={bottomBarAnim.initial}
        animate={booted ? { opacity: 1, y: 0 } : bottomBarAnim.initial}
        transition={bottomBarAnim.transition}
      >
        <BottomBar />
      </motion.div>
    </div>
  );
}
