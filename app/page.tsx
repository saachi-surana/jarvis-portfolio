"use client";

import { useEffect } from "react";
import SplashSection from "@/components/layout/SplashSection";
import JarvisHUD from "@/components/layout/JarvisHUD";

// Single URL: the splash and the HUD are two stacked 100vh sections in normal
// document flow. Scroll down from the splash to reveal the HUD; scroll back up
// to return to the splash. No routing.
export default function Page() {
  useEffect(() => {
    // Stop the browser from restoring a stored scroll position into the HUD.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* Splash — scrolls away to reveal the HUD */}
      <SplashSection />

      {/* HUD — contained so its fixed overlays cannot bleed into the splash.
          JarvisHUD's root has transform-gpu, making it the containing block for
          its position:fixed descendants (ProjectOverlay, FloatingCard, etc.);
          the overflow-hidden here clips them to this 100vh section on desktop.
          On mobile the HUD flows naturally (single column, scrollable). */}
      <div className="relative isolate md:h-screen md:overflow-hidden">
        <JarvisHUD skipBoot />
      </div>
    </main>
  );
}
