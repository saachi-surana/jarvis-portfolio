"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useJarvisStore } from "./store";

export interface ScrollRevealState {
  scrollYProgress: MotionValue<number>;
  topBarHeight:    MotionValue<number>;
  bottomBarHeight: MotionValue<number>;
  leftWidth:       MotionValue<number>;
  rightWidth:      MotionValue<number>;
  leftBooted:      boolean;
  rightBooted:     boolean;
  orbitalBooted:   boolean;
  chatBooted:      boolean;
  locked:          boolean;
  containerRef:    React.RefObject<HTMLDivElement>;
}

export function useScrollReveal(): ScrollRevealState {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { setBloomIntensity, setCameraZ } = useJarvisStore.getState();

  const [leftBooted,    setLeftBooted]    = useState(false);
  const [rightBooted,   setRightBooted]   = useState(false);
  const [orbitalBooted, setOrbitalBooted] = useState(false);
  const [chatBooted,    setChatBooted]    = useState(false);
  const [locked,        setLocked]        = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Layout wrappers driven by scroll
  const topBarHeight    = useTransform(scrollYProgress, [0, 0.22], [0, 52]);
  const bottomBarHeight = useTransform(scrollYProgress, [0, 0.22], [0, 32]);
  const leftWidth       = useTransform(scrollYProgress, [0.28, 0.58], [0, 280]);
  const rightWidth      = useTransform(scrollYProgress, [0.58, 0.88], [0, 300]);

  // Boolean milestones + store side-effects
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      // Bloom: 3.2 full-screen → 2.5 at HUD
      setBloomIntensity(3.2 - v * 0.7);
      // Camera: z 5.4 full-screen → 7.2 at HUD
      setCameraZ(5.4 + v * 1.8);

      if (v >= 0.28 && !leftBooted)    setLeftBooted(true);
      if (v >= 0.50 && !orbitalBooted) setOrbitalBooted(true);
      if (v >= 0.58 && !rightBooted)   setRightBooted(true);
      if (v >= 0.60 && !chatBooted)    setChatBooted(true);
      if (v >= 0.99 && !locked)        setLocked(true);
    });
  // deps: only the setters and static flags matter; scrollYProgress never changes identity
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftBooted, rightBooted, orbitalBooted, chatBooted, locked]);

  return {
    scrollYProgress, topBarHeight, bottomBarHeight,
    leftWidth, rightWidth,
    leftBooted, rightBooted, orbitalBooted, chatBooted, locked,
    containerRef,
  };
}
