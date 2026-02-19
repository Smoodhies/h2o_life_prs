"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  imageSrc: string;
  accent?: string;
  className?: string;
}

/**
 * Premium cinematic liquid-glass product card.
 * Matches navbar UI style (same glass bg, border, shadows, frost texture) with 1% blur.
 */
export default function ProductCard({
  name,
  tagline,
  description,
  imageSrc,
  accent = "var(--c-aqua)",
  className = "",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden cursor-pointer flex flex-col h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: "box-shadow 0.3s ease",
        borderRadius: 28,
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(2px) saturate(180%)",
        WebkitBackdropFilter: "blur(2px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: isHovered
          ? `0 12px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(255,255,255,0.1), 0 0 30px ${accent}25`
          : "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(255,255,255,0.1)",
        padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
      }}
    >
      {/* Top light refraction highlight — matches navbar liquid glass */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[28px]"
        style={{
          background:
            "radial-gradient(circle at 28% 18%, rgba(255, 255, 255, 0.35), transparent 65%)",
        }}
      />

      {/* Subtle frost texture overlay — matches navbar liquid glass */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[28px]"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.6,
          mixBlendMode: "overlay" as const,
        }}
      />

      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[28px]" />

      {/* Accent glow on hover */}
      <div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-3xl pointer-events-none"
        style={{ background: accent }}
      />

      {/* Product image */}
      <div className="relative w-full flex items-center justify-center mb-4 pt-2" style={{ height: 200 }}>
        {/* Soft blue glow behind product */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${accent}15 0%, transparent 60%)`,
            filter: "blur(15px)",
          }}
        />
        <Image
          src={imageSrc}
          alt={name}
          width={160}
          height={220}
          className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-110"
          style={{ filter: `drop-shadow(0 10px 25px ${accent}30)` }}
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-2 group-hover:text-[var(--c-aqua)] transition-colors duration-500">
          {tagline}
        </h3>

        <p className="text-xs sm:text-sm text-[var(--c-silver)] leading-relaxed opacity-75 mb-5 line-clamp-2">
          {description}
        </p>

        {/* Glass CTA button - matches Order Now button style */}
        <a
          href="#"
          className="group/btn inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.04] hover:brightness-125 active:scale-[0.98] relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(1px) saturate(180%)",
            WebkitBackdropFilter: "blur(1px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(255,255,255,0.1)",
          }}
        >
          {/* Shimmer sweep */}
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.04) 50%, transparent 55%)",
              animation: "shimmer-button 4s infinite",
            }}
          />
          <span className="relative z-10">Shop Now</span>
          <svg
            className="relative z-10"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
