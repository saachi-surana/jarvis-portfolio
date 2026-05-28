"use client";

import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import LeftSidebar from "./LeftSidebar";
import CenterPanel from "./CenterPanel";
import RightSidebar from "./RightSidebar";
import BootSequence from "@/components/effects/BootSequence";
import ScrollHint from "@/components/effects/ScrollHint";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface ScrollRevealHUDProps {
  booted: boolean;
  onBootComplete: () => void;
}

export default function ScrollRevealHUD({ booted, onBootComplete }: ScrollRevealHUDProps) {
  const {
    scrollYProgress, topBarHeight, bottomBarHeight,
    leftWidth, rightWidth,
    leftBooted, rightBooted, orbitalBooted, chatBooted,
    locked, containerRef,
  } = useScrollReveal();

  return (
    <>
      {/* Boot overlay — fixed, covers everything until dismissed */}
      <BootSequence onComplete={onBootComplete} />

      {/* Scroll hint — fixed, fades in after boot, out on scroll */}
      <AnimatePresence>
        {booted && !chatBooted && (
          <ScrollHint booted={booted} scrollYProgress={scrollYProgress} />
        )}
      </AnimatePresence>

      {/* 300vh scroll container — locked once HUD is fully revealed */}
      <div
        ref={containerRef}
        style={{
          height: locked ? "100vh" : "300vh",
          overflow: (!booted || locked) ? "hidden" : "auto",
          position: "relative",
        }}
      >
        {/* Sticky 100vh HUD — stays in view while scroll drives animations */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "#000000",
            overflow: "hidden",
          }}
        >
          {/* Top bar — slides down from above */}
          <motion.div style={{ height: topBarHeight, overflow: "hidden", flexShrink: 0 }}>
            <TopBar />
          </motion.div>

          {/* Main content row */}
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            {/* Left sidebar — wipes in from left */}
            <motion.div
              style={{
                width: leftWidth,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <LeftSidebar booted={leftBooted} />
            </motion.div>

            {/* Center column — always visible, fills remaining space */}
            <div style={{ flex: 1, minWidth: 0, minHeight: 0 }}>
              <CenterPanel
                booted={booted}
                orbitalBooted={orbitalBooted}
                chatBooted={chatBooted}
              />
            </div>

            {/* Right sidebar — wipes in from right */}
            <motion.div
              style={{
                width: rightWidth,
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <RightSidebar booted={rightBooted} />
            </motion.div>
          </div>

          {/* Bottom bar — slides up from below */}
          <motion.div style={{ height: bottomBarHeight, overflow: "hidden", flexShrink: 0 }}>
            <BottomBar />
          </motion.div>
        </div>
      </div>
    </>
  );
}
