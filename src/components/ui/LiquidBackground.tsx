"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

export default function LiquidBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#06080B]" />
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#00C2FF] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.15] animate-blob" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-500">
      {/* Deep Atmosphere Base - Theme dependent */}
      <div
        className={`absolute inset-0 ${
          theme === "dark" ? "bg-[#06080B]" : "bg-[#F5F7FA]"
        }`}
      />

      {/* Moving Blobs - Theme dependent */}
      {theme === "dark" ? (
        <>
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#00C2FF] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.15] animate-blob" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#004e92] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.1] animate-blob animation-delay-2000" />
          <div className="absolute top-[20%] right-[30%] w-[40vw] h-[40vw] bg-[#ffffff] rounded-full mix-blend-overlay filter blur-[80px] opacity-[0.05] animate-blob animation-delay-4000" />
        </>
      ) : (
        <>
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.08] animate-blob" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#87CEEB] rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.06] animate-blob animation-delay-2000" />
          <div className="absolute top-[20%] right-[30%] w-[40vw] h-[40vw] bg-[#E0F6FF] rounded-full mix-blend-lighten filter blur-[80px] opacity-[0.08] animate-blob animation-delay-4000" />
        </>
      )}
    </div>
  );
}
