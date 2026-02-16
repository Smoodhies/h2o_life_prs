import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import LiquidBackground from "@/components/ui/LiquidBackground";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "H2O Life | Experience Purity",
  description: "Premium mineral water for a balanced life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <ThemeProvider>
          <LiquidBackground />
          <NoiseOverlay />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
