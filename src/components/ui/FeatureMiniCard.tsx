"use client";

import { useState } from "react";

interface FeatureMiniCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * Mini feature card with liquid-glass style matching navbar.
 * Used in the "NOT JUST WATER." strip of the Product Showcase section.
 */
export default function FeatureMiniCard({
  icon,
  title,
  description,
  className = "",
}: FeatureMiniCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden text-center cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: 20,
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(1px) saturate(160%)",
        WebkitBackdropFilter: "blur(1px) saturate(160%)",
        border: isHovered
          ? "1px solid rgba(0, 194, 255, 0.25)"
          : "1px solid rgba(255,255,255,0.10)",
        boxShadow: isHovered
          ? "0 12px 30px rgba(0,0,0,0.35), 0 0 20px rgba(0, 194, 255, 0.08), inset 0 1px 2px rgba(255,255,255,0.3)"
          : "0 6px 20px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.2)",
        padding: "clamp(1.25rem, 2vw, 1.75rem)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Light refraction highlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[20px]"
        style={{
          background: "radial-gradient(circle at 30% 15%, rgba(255, 255, 255, 0.25), transparent 60%)",
        }}
      />

      {/* Frost noise texture */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[20px]"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          mixBlendMode: "overlay" as const,
        }}
      />

      {/* Icon */}
      <div
        className="relative z-10 text-3xl mb-3 transition-all duration-400"
        style={{
          filter: isHovered ? "grayscale(0) drop-shadow(0 0 8px rgba(0,194,255,0.3))" : "grayscale(0.5)",
          opacity: isHovered ? 1 : 0.75,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h4 className="relative z-10 text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-1.5 group-hover:text-[var(--c-aqua)] transition-colors duration-400">
        {title}
      </h4>

      {/* Description */}
      <p className="relative z-10 text-xs text-[var(--c-silver)] leading-relaxed opacity-65 line-clamp-2">
        {description}
      </p>
    </div>
  );
}
