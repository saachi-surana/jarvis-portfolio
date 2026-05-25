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
  title: "J.A.R.V.I.S // SAACHI SURANA",
  description: "Portfolio interface — Saachi Surana, CS @ University of Washington",
  robots: { index: true, follow: true },
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
        <CustomCursor />
        <ScanLine />
        {children}
      </body>
    </html>
  );
}
