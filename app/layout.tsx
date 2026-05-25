import type { Metadata } from "next";
import { Space_Mono, Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${rajdhani.variable} ${orbitron.variable}`}>
      <body className="bg-black overflow-hidden h-screen">
        {children}
      </body>
    </html>
  );
}
