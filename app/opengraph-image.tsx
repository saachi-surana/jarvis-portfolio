import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Saachi Surana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#000000",
          fontFamily: "sans-serif",
          padding: "0 80px",
        }}
      >
        <div style={{ position: "relative", width: 340, height: 340, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {/* soft ambient halo */}
          <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", background: "#00e5ff", opacity: 0.18, filter: "blur(60px)" }} />

          <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", border: "2px solid #00e5ff", opacity: 0.3 }} />
          <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", border: "2px solid #00e5ff", opacity: 0.5 }} />
          <div style={{ position: "absolute", width: 190, height: 190, borderRadius: "50%", border: "5px solid #00e5ff", opacity: 0.95, boxShadow: "0 0 22px #00e5ff, inset 0 0 12px #00e5ff" }} />
          <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: "3px solid #00b8cc", opacity: 0.7, boxShadow: "0 0 12px #00b8cc" }} />
          <div style={{ position: "absolute", width: 95, height: 95, borderRadius: "50%", border: "4px solid #00e5ff", opacity: 0.9, boxShadow: "0 0 18px #00e5ff" }} />
          <div style={{ position: "absolute", width: 52, height: 52, borderRadius: "50%", background: "#001a1f", border: "2px solid #00e5ff", boxShadow: "0 0 20px #00e5ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#003a45", border: "1.5px solid #00e5ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 15, height: 15, borderRadius: "50%", background: "#ffffff", boxShadow: "0 0 16px #ffffff, 0 0 26px #00e5ff" }} />
            </div>
          </div>
          <div style={{ position: "absolute", top: 8, left: 168, width: 4, height: 44, background: "#00e5ff", opacity: 0.7, boxShadow: "0 0 8px #00e5ff" }} />
          <div style={{ position: "absolute", bottom: 8, left: 168, width: 4, height: 44, background: "#00e5ff", opacity: 0.7, boxShadow: "0 0 8px #00e5ff" }} />
          <div style={{ position: "absolute", left: 8, top: 168, width: 44, height: 4, background: "#00e5ff", opacity: 0.7, boxShadow: "0 0 8px #00e5ff" }} />
          <div style={{ position: "absolute", right: 8, top: 168, width: 44, height: 4, background: "#00e5ff", opacity: 0.7, boxShadow: "0 0 8px #00e5ff" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginLeft: 80 }}>
          <div style={{ fontSize: 88, fontWeight: 700, color: "#fafafa", letterSpacing: -2, lineHeight: 1.05, textShadow: "0 0 30px rgba(0,229,255,0.35)" }}>
            Saachi Surana
          </div>
          <div style={{ fontSize: 38, color: "#00e5ff", marginTop: 18, textShadow: "0 0 20px rgba(0,229,255,0.6)" }}>
            building things that feel alive
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
