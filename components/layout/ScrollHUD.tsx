"use client";

import { useTransform, motion, MotionValue, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import ScrollIndicator from "@/components/effects/ScrollIndicator";
import JarvisChat from "@/components/chat/JarvisChat";
import OperatorOverlay from "@/components/panels/OperatorOverlay";
import { useJarvisStore } from "@/lib/store";

const ArcReactor = dynamic(() => import("@/components/reactor/ArcReactor"), {
  ssr: false, loading: () => null,
});

const TOP_H = 52, BOT_H = 32, L_W = 280, R_W = 300;

interface Props {
  scrollYProgress: MotionValue<number>;
  booted: boolean;
  spinningUp: boolean;
}

export default function ScrollHUD({ scrollYProgress, booted, spinningUp }: Props) {
  const { showAbout, setShowAbout } = useJarvisStore();
  const [hud, setHud]               = useState(false);
  const [sp,  setSp]                = useState(0);
  const [greetingFired, setGreeting] = useState(false);
  const greetingRef = useRef(false);

  const topOp      = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const topY       = useTransform(scrollYProgress, [0, 0.3],  [-TOP_H, 0]);
  const botOp      = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);
  const leftX      = useTransform(scrollYProgress, [0.35, 0.65], [-L_W, 0]);
  const rightX     = useTransform(scrollYProgress, [0.35, 0.65], [R_W,  0]);
  const chatOp     = useTransform(scrollYProgress, [0.65, 0.95], [0, 1]);
  const chatY      = useTransform(scrollYProgress, [0.65, 0.95], [24, 0]);
  // Reactor shrinks from fullscreen toward center-column size during scroll
  const reactorScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.72]);
  const reactorX     = useTransform(scrollYProgress, [0, 0.7], [0, -10]);
  const reactorY     = useTransform(scrollYProgress, [0, 0.7], [0,  10]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setSp(v);
      setHud(v > 0.3);
      if (v > 0.9 && !greetingRef.current) {
        greetingRef.current = true;
        setGreeting(true);
      }
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Reactor — fullscreen, scales toward center-column during scroll */}
      <motion.div className="absolute inset-0 z-0"
        style={{ scale: reactorScale, x: reactorX, y: reactorY }}>
        <ArcReactor fullScreen={sp < 0.5} spinningUp={spinningUp} />
      </motion.div>

      {/* TOP BAR */}
      <motion.div className="absolute top-0 left-0 right-0 z-30"
        style={{ opacity: topOp, y: topY }}>
        <TopBar />
      </motion.div>

      {/* LEFT SIDEBAR — overflow:hidden clips panel x:-10 against sidebar boundary */}
      <motion.div className="absolute z-20"
        style={{ top: TOP_H, bottom: BOT_H, left: 0, width: L_W, x: leftX, overflow: "hidden" }}>
        <div style={{ height: "100%", overflowY: "auto", background: "#050a0a" }}>
          <LeftSidebar booted={hud} />
        </div>
      </motion.div>

      {/* RIGHT SIDEBAR */}
      <motion.div className="absolute z-20"
        style={{ top: TOP_H, bottom: BOT_H, right: 0, width: R_W, x: rightX, overflow: "hidden" }}>
        <div style={{ height: "100%", overflowY: "auto", background: "#050a0a" }}>
          <RightSidebar booted={hud} />
        </div>
      </motion.div>

      {/* JARVIS CHAT — center column bottom */}
      <motion.div className="absolute z-10"
        style={{ bottom: BOT_H, left: L_W, right: R_W, height: "42vh", opacity: chatOp, y: chatY }}>
        <JarvisChat booted={greetingFired} />
      </motion.div>

      {/* BOTTOM BAR */}
      <motion.div className="absolute bottom-0 left-0 right-0 z-30" style={{ opacity: botOp }}>
        <BottomBar />
      </motion.div>

      {/* OPERATOR OVERLAY */}
      <AnimatePresence>
        {showAbout && (
          <div key="op-overlay" className="absolute inset-0 z-40">
            <OperatorOverlay onClose={() => setShowAbout(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* SCROLL INDICATOR */}
      <ScrollIndicator booted={booted} scrollProgress={sp} />
    </>
  );
}
