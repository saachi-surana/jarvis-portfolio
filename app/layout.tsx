import type { Metadata, Viewport } from "next";
import { Space_Mono, Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/effects/CustomCursor";
import ScanLine from "@/components/effects/ScanLine";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saachi Surana",
  description: "JARVIS Portfolio Interface — Saachi Surana, CS & Data Science @ University of Washington",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${rajdhani.variable} ${orbitron.variable}`}
    >
      <body className="bg-black">
        <script dangerouslySetInnerHTML={{ __html: `
          if (history.scrollRestoration) history.scrollRestoration = 'manual';
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        ` }} />
        <CustomCursor />
        <ScanLine />
        {children}
      </body>
    </html>
  );
}
