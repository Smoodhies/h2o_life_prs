"use client";

import { useTheme } from "@/context/ThemeContext";

/**
 * Dark/Light mode toggle slider with sun/moon icons.
 * Liquid glass pill style — SSR-safe (renders fallback until mounted).
 *
 * @example
 * <ThemeToggle />
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative rounded-full border-2 border-white/50 transition-all duration-500 overflow-hidden shrink-0 group hover:border-white/70"
      style={{
        width: "105px",
        height: "44px",
        backdropFilter: "blur(16px) saturate(1.4)",
        WebkitBackdropFilter: "blur(16px) saturate(1.4)",
        backgroundColor: isDark
          ? "rgba(10,20,45,0.7)"
          : "rgba(255,255,255,0.5)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 12px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.15)",
      }}
    >
      {/* Sliding knob */}
      <div
        className="absolute rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.15,0.27,1.15)] flex items-center justify-center"
        style={{
          top: "4px",
          width: "36px",
          height: "36px",
          left: isDark ? "4px" : "calc(100% - 40px)",
          backgroundColor: isDark ? "#1a3555" : "#ffffff",
          boxShadow: isDark
            ? "0 0 12px rgba(100,180,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 6px rgba(0,0,0,0.3)"
            : "0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(0,0,0,0.08)",
        }}
      >
        {/* Moon icon (dark mode) */}
        <svg
          className="absolute transition-all duration-500"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark
              ? "rotate(0deg) scale(1)"
              : "rotate(-90deg) scale(0.5)",
          }}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8bb8e0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>

        {/* Sun icon (light mode) */}
        <svg
          className="absolute transition-all duration-500"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark
              ? "rotate(90deg) scale(0.5)"
              : "rotate(0deg) scale(1)",
          }}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e0960b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </div>
    </button>
  );
}
