import { redirect } from "next/navigation";

// The HUD now lives on "/" as a scroll section. Keep /hud working as a
// permanent entry point by redirecting to the single-page experience.
export default function HudRedirect() {
  redirect("/");
}
