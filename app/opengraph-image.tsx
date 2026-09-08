import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Saachi Surana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(family: string, weight: number) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    })
  ).text();
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error("font url not found");
  return await (await fetch(url)).arrayBuffer();
}

export default async function OG() {
  const [orbitron, spaceMono] = await Promise.all([
    loadFont("Orbitron", 700),
    loadFont("Space+Mono", 400),
  ]);
  const cyan = "#00e5ff";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#000000", position: "relative" }}>
        {/* radial vignette glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 250px 315px, rgba(0,229,255,0.20), rgba(0,0,0,0) 55%)" }} />

        {/* HUD corner brackets */}
        <div style={{ position: "absolute", top: 32, left: 32, width: 46, height: 46, borderTop: `3px solid ${cyan}`, borderLeft: `3px solid ${cyan}`, opacity: 0.55 }} />
        <div style={{ position: "absolute", top: 32, right: 32, width: 46, height: 46, borderTop: `3px solid ${cyan}`, borderRight: `3px solid ${cyan}`, opacity: 0.55 }} />
        <div style={{ position: "absolute", bottom: 32, left: 32, width: 46, height: 46, borderBottom: `3px solid ${cyan}`, borderLeft: `3px solid ${cyan}`, opacity: 0.55 }} />
        <div style={{ position: "absolute", bottom: 32, right: 32, width: 46, height: 46, borderBottom: `3px solid ${cyan}`, borderRight: `3px solid ${cyan}`, opacity: 0.55 }} />

        {/* reactor mark */}
        <div style={{ position: "relative", width: 340, height: 340, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", border: `1px solid ${cyan}`, opacity: 0.12 }} />
          <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", border: `1px solid ${cyan}`, opacity: 0.18 }} />
          <div style={{ position: "absolute", width: 310, height: 310, borderRadius: "50%", border: `2px dashed ${cyan}`, opacity: 0.4 }} />
          <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", border: `2px solid ${cyan}`, opacity: 0.3 }} />
          <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", border: `2px solid ${cyan}`, opacity: 0.5 }} />
          <div style={{ position: "absolute", width: 190, height: 190, borderRadius: "50%", border: `5px solid ${cyan}`, opacity: 0.95, boxShadow: `0 0 22px ${cyan}, inset 0 0 12px ${cyan}` }} />
          <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: "3px solid #00b8cc", opacity: 0.7, boxShadow: "0 0 12px #00b8cc" }} />
          <div style={{ position: "absolute", width: 95, height: 95, borderRadius: "50%", border: `4px solid ${cyan}`, opacity: 0.9, boxShadow: `0 0 18px ${cyan}` }} />
          <div style={{ position: "absolute", width: 52, height: 52, borderRadius: "50%", background: "#001a1f", border: `2px solid ${cyan}`, boxShadow: `0 0 20px ${cyan}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#003a45", border: `1.5px solid ${cyan}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 15, height: 15, borderRadius: "50%", background: "#ffffff", boxShadow: `0 0 16px #ffffff, 0 0 26px ${cyan}` }} />
            </div>
          </div>
          <div style={{ position: "absolute", top: 8, left: 168, width: 4, height: 44, background: cyan, opacity: 0.7, boxShadow: `0 0 8px ${cyan}` }} />
          <div style={{ position: "absolute", bottom: 8, left: 168, width: 4, height: 44, background: cyan, opacity: 0.7, boxShadow: `0 0 8px ${cyan}` }} />
          <div style={{ position: "absolute", left: 8, top: 168, width: 44, height: 4, background: cyan, opacity: 0.7, boxShadow: `0 0 8px ${cyan}` }} />
          <div style={{ position: "absolute", right: 8, top: 168, width: 44, height: 4, background: cyan, opacity: 0.7, boxShadow: `0 0 8px ${cyan}` }} />
          <div style={{ position: "absolute", top: 2, left: 165, width: 10, height: 6, borderRadius: 3, background: cyan, opacity: 0.7 }} />
          <div style={{ position: "absolute", bottom: 2, left: 165, width: 10, height: 6, borderRadius: 3, background: cyan, opacity: 0.7 }} />
          <div style={{ position: "absolute", left: 2, top: 165, width: 6, height: 10, borderRadius: 3, background: cyan, opacity: 0.7 }} />
          <div style={{ position: "absolute", right: 2, top: 165, width: 6, height: 10, borderRadius: 3, background: cyan, opacity: 0.7 }} />
          <div style={{ position: "absolute", top: 66, left: 166, width: 9, height: 9, borderRadius: "50%", background: cyan, boxShadow: `0 0 10px ${cyan}` }} />
          <div style={{ position: "absolute", bottom: 66, right: 120, width: 7, height: 7, borderRadius: "50%", background: cyan, boxShadow: `0 0 10px ${cyan}` }} />
        </div>

        {/* text */}
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 56 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 68, fontWeight: 700, color: "#fafafa", letterSpacing: 2, lineHeight: 1.1, textShadow: "0 0 30px rgba(0,229,255,0.4)" }}>
            SAACHI SURANA
          </div>
          <div style={{ fontFamily: "Space Mono", fontSize: 30, color: cyan, marginTop: 22, letterSpacing: 1, textShadow: "0 0 18px rgba(0,229,255,0.6)" }}>
            BUILDING THINGS THAT FEEL ALIVE
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Orbitron", data: orbitron, weight: 700, style: "normal" },
        { name: "Space Mono", data: spaceMono, weight: 400, style: "normal" },
      ],
    }
  );
}
