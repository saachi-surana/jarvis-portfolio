"use client";

import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import LeftSidebar from "./LeftSidebar";
import CenterPanel from "./CenterPanel";
import RightSidebar from "./RightSidebar";

export default function JarvisHUD() {
  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      <TopBar />
      <div className="flex flex-1 min-h-0">
        <LeftSidebar />
        <CenterPanel />
        <RightSidebar />
      </div>
      <BottomBar />
    </div>
  );
}
