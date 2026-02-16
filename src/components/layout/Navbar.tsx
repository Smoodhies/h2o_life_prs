"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mouseAtTop, setMouseAtTop] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Determine if scrolled enough to apply glass effect
          setScrolled(currentScrollY > 50);

          // Auto-hide logic: hide on scroll down, show on scroll up
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down & past threshold
            if (!mouseAtTop) {
              setVisible(false);
            }
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            setVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar when mouse is near the top (within 100px)
      if (e.clientY < 100) {
        setMouseAtTop(true);
        setVisible(true);
      } else {
        setMouseAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastScrollY, mouseAtTop]);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "bg-gradient-to-b from-[#0A0F14]/95 via-[#0A0F14]/90 to-transparent backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--c-aqua)] via-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-[var(--c-aqua)]/40 ring-2 ring-white/10">
                <span className="text-white font-bold text-xl drop-shadow-lg">
                  H₂O
                </span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                <span className="drop-shadow-lg">H2O</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--c-aqua)] to-blue-300">
                  LIFE
                </span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-white/90 hover:text-aqua transition-all duration-300 text-sm font-medium hover:drop-shadow-glow"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-white/90 hover:text-aqua transition-all duration-300 text-sm font-medium hover:drop-shadow-glow"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-white/90 hover:text-aqua transition-all duration-300 text-sm font-medium hover:drop-shadow-glow"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-white/90 hover:text-aqua transition-all duration-300 text-sm font-medium hover:drop-shadow-glow"
              >
                Contact
              </a>
            </div>

            {/* Right side: CTA + Theme Toggle + Hamburger */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <svg
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.828-2.829a1 1 0 00-1.414 0l-2.828 2.829a1 1 0 001.414 1.414L9 13.414l1.586 1.586a1 1 0 001.414-1.414zM7 11a1 1 0 11-2 0 1 1 0 012 0zm7-4a1 1 0 11-2 0 1 1 0 012 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              {/* CTA Button */}
              <button className="relative px-6 md:px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase overflow-hidden group transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--c-aqua)] via-blue-400 to-[var(--c-aqua)] transition-all duration-500 group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 text-white drop-shadow-md">
                  Order Now
                </span>
              </button>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                  />
                  <span
                    className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Liquid glass effect overlay */}
        {scrolled && (
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-aqua/10 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu - Horizontal Dropdown */}
          <div className="fixed top-16 left-0 right-0 mx-4 glass-panel-deep z-50 md:hidden transform transition-all duration-300 ease-premium rounded-2xl">
            <div className="flex flex-col p-6 space-y-4">
              <a
                href="#home"
                onClick={handleLinkClick}
                className="text-white/80 hover:text-[var(--c-aqua)] transition-colors text-base font-medium py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Home
              </a>
              <a
                href="#features"
                onClick={handleLinkClick}
                className="text-white/80 hover:text-[var(--c-aqua)] transition-colors text-base font-medium py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Features
              </a>
              <a
                href="#about"
                onClick={handleLinkClick}
                className="text-white/80 hover:text-[var(--c-aqua)] transition-colors text-base font-medium py-3 px-4 rounded-lg hover:bg-white/5"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="text-white/80 hover:text-[var(--c-aqua)] transition-colors text-base font-medium py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Contact
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
