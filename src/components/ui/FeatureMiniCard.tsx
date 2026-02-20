"use client";

import { useState } from "react";

interface FeatureMiniCardProps {
  icon: string;
  title: string;
  description: string;
  theme?: "light" | "dark";
  className?: string;
}

export default function FeatureMiniCard({
  icon,
  title,
  description,
  theme = "light",
  className = "",
}: FeatureMiniCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === "dark";

  const cardBg = isDark ? "rgba(6, 18, 42, 0.55)" : "rgba(255,255,255,0.28)";
  const cardBorder = isHovered
    ? isDark ? "1px solid rgba(0,210,255,0.70)" : "1px solid rgba(255,255,255,0.78)"
    : isDark ? "1px solid rgba(0,180,255,0.35)" : "1px solid rgba(255,255,255,0.52)";
  const cardShadow = isHovered
    ? isDark
      ? "0 10px 28px rgba(0,0,0,0.60), 0 0 16px rgba(0,210,255,0.28)"
      : "0 10px 28px rgba(0,80,180,0.16), 0 0 12px rgba(255,255,255,0.28)"
    : isDark
    ? "0 4px 18px rgba(0,0,0,0.50), 0 0 10px rgba(0,180,255,0.12)"
    : "0 4px 18px rgba(0,80,180,0.10), inset 0 1px 0 rgba(255,255,255,0.5)";

  const titleColor = isDark ? "#ffffff" : "#0A3E66";
  const titleGlow = isDark ? "0 0 14px rgba(0,210,255,0.65)" : "0 0 8px rgba(0,140,255,0.20)";
  const bodyColor = isDark ? "rgba(190,225,255,0.72)" : "rgba(10,62,102,0.70)";

  return (
    <div
      className={`group relative text-center cursor-default h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: 22,
        background: cardBg,
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        border: cardBorder,
        boxShadow: cardShadow,
        padding: "32px 24px",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Highlight gradient */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[22px]"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(0,200,255,0.10) 0%, rgba(255,255,255,0.02) 42%, transparent 68%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.20) 42%, rgba(255,255,255,0.04) 68%)",
        }}
      />

      {/* Top-left streak */}
      <div
        className="absolute top-0 left-0 w-2/3 h-[70px] pointer-events-none rounded-tl-[22px]"
        style={{
          background: isDark
            ? "linear-gradient(112deg, rgba(0,210,255,0.18) 0%, rgba(0,210,255,0.04) 55%, transparent 75%)"
            : "linear-gradient(112deg, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.16) 55%, transparent 75%)",
          mixBlendMode: "screen" as const,
        }}
      />

      {/* Bottom micro-shadow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[22px]"
        style={{
          boxShadow: isDark
            ? "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -10px 18px rgba(0,0,0,0.28)"
            : "inset 0 1px 0 rgba(255,255,255,0.72), inset 0 -8px 16px rgba(0,60,160,0.05)",
        }}
      />

      {/* Noise frost */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[22px]"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          opacity: 0.35,
          mixBlendMode: "overlay" as const,
        }}
      />

      {/* Icon */}
      <div
        className="relative z-10 text-3xl mb-4"
        style={{
          filter: isHovered
            ? isDark
              ? "grayscale(0) drop-shadow(0 0 10px rgba(0,210,255,0.55))"
              : "grayscale(0) drop-shadow(0 0 8px rgba(0,140,255,0.40))"
            : "grayscale(0.3)",
          opacity: isHovered ? 1 : 0.82,
          transition: "all 0.42s ease",
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h4
        className="relative z-10 text-sm sm:text-base font-black uppercase tracking-[0.09em] mb-2.5"
        style={{ color: titleColor, textShadow: titleGlow }}
      >
        {title}
      </h4>

      {/* Description */}
      <p
        className="relative z-10 text-xs leading-relaxed"
        style={{ color: bodyColor }}
      >
        {description}
      </p>
    </div>
  );
}
