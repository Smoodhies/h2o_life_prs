"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/** Navigation items */
export const NAV_ITEMS = [
  { href: "#experience", label: "Experience Purity" },
  { href: "#shop", label: "Shop" },
  { href: "#contact", label: "Contact" },
] as const;

export default function HeroNavbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* SVG Filter for organic liquid distortion */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="liquidDistortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              result="turbulence"
            />
            <feDisplacementMap
              in2="turbulence"
              in="SourceGraphic"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <nav
        className="fixed left-1/2 -translate-x-1/2 z-50"
        style={{
          top: "clamp(16px, 4vh, 48px)",
          width: "min(94%, 1000px)",
        }}
      >
        <div
          className="liquid-glass-nav group"
          style={{
            position: "relative",
            padding: "12px 24px",
            borderRadius: "80px",
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(3px) saturate(180%)",
            WebkitBackdropFilter: "blur(3px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: `
                            0 8px 32px rgba(0, 0, 0, 0.4),
                            0 2px 8px rgba(0, 0, 0, 0.2),
                            inset 0 1px 2px rgba(255, 255, 255, 0.4),
                            inset 0 -1px 3px rgba(255, 255, 255, 0.1)
                        `,
            filter: "url(#liquidDistortion)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Top light refraction highlight */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "80px",
              background: `radial-gradient(
                                circle at 28% 18%,
                                rgba(255, 255, 255, 0.35),
                                transparent 65%
                            )`,
              pointerEvents: "none",
            }}
          />

          {/* Subtle frost texture overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "80px",
              background:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
              opacity: 0.6,
              pointerEvents: "none",
              mixBlendMode: "overlay",
            }}
          />

          {/* Bottom floating shadow */}
          <div
            style={{
              position: "absolute",
              bottom: "-12px",
              left: "8%",
              right: "8%",
              height: "8px",
              background: "rgba(0, 0, 0, 0.15)",
              filter: "blur(8px)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div
            className="relative flex items-center justify-between"
            style={{
              gap: "clamp(16px, 3vw, 32px)",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "52px",
              }}
            >
              <Image
                src="/logos/h2o_logo.png"
                alt="H2O LIFES"
                width={140}
                height={52}
                style={{
                  width: "auto",
                  height: "52px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 1px 3px rgba(255, 255, 255, 0.3))",
                }}
                priority
              />
            </div>

            {/* Desktop Navigation Links */}
            <div
              className="desktop-nav-links"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(20px, 2.5vw, 32px)",
              }}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: "Inter, -apple-system, system-ui, sans-serif",
                    fontSize: "clamp(13px, 1.6vw, 15px)",
                    fontWeight: 500,
                    color: "#0a0a0a",
                    textDecoration: "none",
                    position: "relative",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    whiteSpace: "nowrap",
                    textShadow: "0 0.5px 1px rgba(255, 255, 255, 0.6)",
                  }}
                  className="desktop-nav-link"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Order Now Button + Mobile Menu Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Theme Toggle (Desktop only) */}
              <div className="theme-toggle-desktop">
                <ThemeToggle />
              </div>

              {/* Order Now Button */}
              <button
                onClick={() => (window.location.href = "#order")}
                className="order-now-btn"
                style={{
                  fontFamily: "Inter, -apple-system, system-ui, sans-serif",
                  fontSize: "clamp(12px, 1.5vw, 14px)",
                  fontWeight: 600,
                  color: "#1e3a5f",
                  background: "rgba(255, 255, 255, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  padding: "10px 24px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  boxShadow:
                    "0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
                  textShadow: "0 0.5px 1px rgba(255, 255, 255, 0.8)",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.95)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.85)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.8)";
                }}
              >
                ORDER NOW →
              </button>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mobile-menu-btn"
                style={{
                  display: "none",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "40px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  gap: "5px",
                }}
                aria-label="Toggle menu"
              >
                <span
                  style={{
                    width: "24px",
                    height: "2px",
                    background: "#0a0a0a",
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                    transform: mobileMenuOpen
                      ? "rotate(45deg) translateY(7px)"
                      : "none",
                  }}
                />
                <span
                  style={{
                    width: "24px",
                    height: "2px",
                    background: "#0a0a0a",
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    width: "24px",
                    height: "2px",
                    background: "#0a0a0a",
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                    transform: mobileMenuOpen
                      ? "rotate(-45deg) translateY(-7px)"
                      : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "280px",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(3px) saturate(180%)",
          WebkitBackdropFilter: "blur(3px) saturate(180%)",
          boxShadow:
            "-4px 0 32px rgba(0, 0, 0, 0.4), inset 1px 0 2px rgba(255, 255, 255, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRight: "none",
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 60,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          aria-label="Close menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="#0a0a0a"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Frost texture overlay for mobile menu */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
            opacity: 0.6,
            pointerEvents: "none",
            mixBlendMode: "overlay",
          }}
        />

        {/* Light refraction on mobile menu */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 15%, rgba(255, 255, 255, 0.25), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            marginTop: "60px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: "Inter, -apple-system, system-ui, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: "#0a0a0a",
                textDecoration: "none",
                padding: "16px 20px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
                textShadow: "0 0.5px 1px rgba(255, 255, 255, 0.6)",
                boxShadow:
                  "0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateX(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Theme Toggle for Mobile */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 55,
            backdropFilter: "blur(4px)",
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Additional global styles for enhanced realism */}
      <style jsx>{`
        .liquid-glass-nav {
          animation: subtle-float 6s ease-in-out infinite;
        }

        @keyframes subtle-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .liquid-glass-nav:hover {
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.45),
            0 4px 12px rgba(0, 0, 0, 0.25),
            inset 0 1px 2px rgba(255, 255, 255, 0.5),
            inset 0 -1px 4px rgba(255, 255, 255, 0.15) !important;
        }

        /* Tablet - Hide navigation links, show hamburger */
        @media (max-width: 900px) {
          .desktop-nav-links {
            display: none !important;
          }

          .theme-toggle-desktop {
            display: none !important;
          }

          .mobile-menu-btn {
            display: flex !important;
          }
        }

        /* Mobile - Adjust button size */
        @media (max-width: 640px) {
          .order-now-btn {
            padding: 8px 18px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
