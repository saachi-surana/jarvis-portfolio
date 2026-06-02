"use client";

import { useEffect } from "react";
import SplashSection from "@/components/layout/SplashSection";
import JarvisHUD from "@/components/layout/JarvisHUD";

export default function Page() {
  // Prevent browser scroll restoration from loading mid-page (into HUD)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <main style={{ margin: 0, padding: 0 }}>
      <SplashSection />
      <JarvisHUD skipBoot />
    </main>
  );
}
