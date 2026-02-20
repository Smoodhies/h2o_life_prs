"use client";

import { useState } from "react";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  imageSrc: string;
  accent?: string;
  theme?: "light" | "dark";
  className?: string;
}

export default function ProductCard({
  name,
  tagline,
  description,
  imageSrc,
  accent = "#00c2ff",
  theme = "light",
  className = "",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === "dark";

  const headingColor = isDark ? "#ffffff" : "#0A3E66";
  const bodyColor = isDark ? "rgba(190,225,255,0.65)" : "rgba(10,62,102,0.60)";

  return (
    <div
      className={`group relative cursor-pointer flex flex-col items-center text-center w-full overflow-hidden p-8 transition-all duration-500 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: "5%",
        backdropFilter: "blur(5px) saturate(160%)",
        WebkitBackdropFilter: "blur(5px) saturate(160%)",
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.42)",
        border: isDark
          ? isHovered ? `1px solid rgba(0,194,255,0.55)` : "1px solid rgba(255,255,255,0.12)"
          : isHovered ? `1px solid ${accent}66` : "1px solid rgba(255,255,255,0.65)",
        boxShadow: isHovered
          ? isDark
            ? `0 0 0 2px ${accent}30, 0 24px 48px rgba(0,0,0,0.55), 0 0 60px ${accent}18`
            : `0 0 0 2px ${accent}40, 0 24px 48px rgba(0,100,200,0.22), 0 0 50px ${accent}14`
          : isDark
            ? "0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 8px 28px rgba(0,60,160,0.12), inset 0 1px 0 rgba(255,255,255,0.70)",
        transform: isHovered ? "translateY(-10px)" : "translateY(0)",
        willChange: "transform",
        height: 520,
        justifyContent: "space-between",
        transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Liquid sheen overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: "5%" }}>
        <div
          className="absolute -top-full -left-full w-[300%] h-[300%] rotate-45 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom right, transparent, rgba(255,255,255,0.18), transparent)",
            transition: "transform 1s ease",
          }}
        />
        {/* Internal top glow */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.10), transparent)", opacity: 0.5 }} />
      </div>

      {/* Hover aqua tint overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          borderRadius: "5%",
          background: `linear-gradient(to top, ${accent}0a 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* CAN IMAGE — fills top 2/3 of card */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        {/* Aqua backlight glow — stronger on hover */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500"
          style={{
            background: isDark
              ? `radial-gradient(ellipse at 50% 65%, ${accent}${isHovered ? "44" : "22"} 0%, transparent 70%)`
              : `radial-gradient(ellipse at 50% 65%, ${accent}${isHovered ? "38" : "1a"} 0%, transparent 70%)`,
            filter: `blur(${isHovered ? 20 : 32}px)`,
          }}
        />

        {/* Glow ring under can on hover */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none rounded-full transition-all duration-500"
          style={{
            width: isHovered ? 160 : 100,
            height: isHovered ? 28 : 16,
            background: `radial-gradient(ellipse, ${accent}${isHovered ? "55" : "28"} 0%, transparent 70%)`,
            filter: "blur(12px)",
            opacity: isHovered ? 1 : 0.5,
          }}
        />

        {/* Floating can */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={name}
          className="relative z-10 object-contain"
          style={{
            width: 210,
            height: "auto",
            maxHeight: 340,
            filter: isHovered
              ? isDark
                ? `drop-shadow(0 0 28px ${accent}66) drop-shadow(0 16px 32px rgba(0,0,0,0.70)) contrast(1.12) saturate(1.15) brightness(1.05)`
                : `drop-shadow(0 0 22px ${accent}55) drop-shadow(0 16px 28px rgba(0,80,180,0.35)) contrast(1.12) saturate(1.15) brightness(1.05)`
              : isDark
                ? `drop-shadow(0 8px 20px rgba(0,0,0,0.60)) drop-shadow(0 0 12px ${accent}33) contrast(1.08) saturate(1.08)`
                : `drop-shadow(0 8px 18px rgba(0,60,160,0.22)) drop-shadow(0 0 10px ${accent}22) contrast(1.08) saturate(1.08)`,
            transform: isHovered ? "translateY(-16px) scale(1.07)" : "translateY(0) scale(1)",
            transition: "all 0.50s cubic-bezier(0.22,1,0.36,1)",
            animation: "subtleFloat 6s ease-in-out infinite",
          }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />

        {/* Reflection shimmer on hover */}
        <div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
          style={{
            borderRadius: "5%",
            background: "linear-gradient(to top right, transparent, rgba(255,255,255,0.10), transparent)",
            backdropFilter: "blur(20px)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        />
      </div>

      {/* TEXT */}
      <div className="relative z-10 mt-6 space-y-2">
        <h3
          className="text-xl font-medium tracking-wide"
          style={{ color: headingColor }}
        >
          {name}
        </h3>
        <p
          className="text-sm uppercase tracking-widest"
          style={{ color: bodyColor }}
        >
          {description}
        </p>
      </div>

      {/* View Details — appears on hover */}
      <div
        className="relative z-10 mt-6 flex items-center gap-2 text-sm font-medium transition-all duration-300"
        style={{
          color: isDark ? "#00c2ff" : "#0077cc",
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateY(0)" : "translateY(6px)",
        }}
      >
        View Details
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
