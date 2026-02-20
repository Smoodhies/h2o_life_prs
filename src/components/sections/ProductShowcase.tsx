"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../ui/ProductCard";
import FeatureMiniCard from "../ui/FeatureMiniCard";
import { useTheme } from "@/context/ThemeContext";

const products = [
  {
    name: "Black Edition",
    tagline: "Premium Mineral",
    description: "The ultimate pure hydration experience.",
    imageSrc: "/hero_prd/black_front_can.png",
    accent: "#00c2ff",
  },
  {
    name: "Azure Edition",
    tagline: "Sparkling Refresh",
    description: "Crisp, lightly carbonated mineral water.",
    imageSrc: "/hero_prd/blue_no_can.png",
    accent: "#38bdf8",
  },
  {
    name: "Pure Edition",
    tagline: "Eco Reserve",
    description: "Sustainably sourced from deep alpine springs.",
    imageSrc: "/hero_prd/white_front_can.png",
    accent: "#7dd3fc",
  },
];

const miniFeatures = [
  { icon: "", title: "100% Natural", description: "Sourced sustainably for purity and taste." },
  { icon: "", title: "Aluminium Can", description: "Recyclable and eco-friendly packaging." },
  { icon: "", title: "Eco Conscious", description: "Committed to sustainable practices." },
  { icon: "", title: "Premium Mineral Source", description: "Purity ensured by advanced filtration." },
];

/* Bokeh particles  deterministic to avoid hydration mismatch */
const LIGHT_PARTICLES = [
  { top: 8,  left: 12, size: 18, opacity: 0.55, delay: 0   },
  { top: 15, left: 35, size: 10, opacity: 0.40, delay: 0.6 },
  { top: 22, left: 62, size: 24, opacity: 0.50, delay: 1.2 },
  { top: 5,  left: 78, size: 14, opacity: 0.45, delay: 0.3 },
  { top: 38, left: 90, size: 8,  opacity: 0.38, delay: 0.9 },
  { top: 55, left: 5,  size: 20, opacity: 0.42, delay: 1.5 },
  { top: 70, left: 25, size: 12, opacity: 0.48, delay: 0.4 },
  { top: 78, left: 55, size: 16, opacity: 0.44, delay: 1.1 },
  { top: 85, left: 82, size: 9,  opacity: 0.38, delay: 0.7 },
  { top: 42, left: 48, size: 22, opacity: 0.35, delay: 1.8 },
  { top: 60, left: 72, size: 11, opacity: 0.42, delay: 0.2 },
  { top: 30, left: 18, size: 7,  opacity: 0.30, delay: 1.4 },
];

const DARK_PARTICLES = [
  { top: 10, left: 8,  size: 4, opacity: 0.55, delay: 0   },
  { top: 18, left: 28, size: 3, opacity: 0.45, delay: 0.5 },
  { top: 28, left: 55, size: 5, opacity: 0.60, delay: 1.1 },
  { top: 6,  left: 72, size: 3, opacity: 0.50, delay: 0.3 },
  { top: 40, left: 88, size: 4, opacity: 0.42, delay: 0.8 },
  { top: 52, left: 3,  size: 3, opacity: 0.55, delay: 1.4 },
  { top: 65, left: 18, size: 5, opacity: 0.48, delay: 0.6 },
  { top: 75, left: 44, size: 3, opacity: 0.52, delay: 1.2 },
  { top: 82, left: 70, size: 4, opacity: 0.44, delay: 0.9 },
  { top: 35, left: 60, size: 3, opacity: 0.38, delay: 1.7 },
  { top: 58, left: 82, size: 4, opacity: 0.50, delay: 0.2 },
  { top: 45, left: 35, size: 3, opacity: 0.42, delay: 1.0 },
];

export default function ProductShowcase() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sectionRef        = useRef<HTMLElement>(null);
  const heroTextRef       = useRef<HTMLDivElement>(null);
  const cardsRef          = useRef<HTMLDivElement[]>([]);
  const bottomHeadingRef  = useRef<HTMLHeadingElement>(null);
  const miniCardsRef      = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current, {
          scrollTrigger: { trigger: heroTextRef.current, start: "top 85%" },
          y: 55, opacity: 0, duration: 1.1, ease: "power3.out",
        });
      }
      /* product cards: no scroll-position animation */
      if (bottomHeadingRef.current) {
        gsap.from(bottomHeadingRef.current, {
          scrollTrigger: { trigger: bottomHeadingRef.current, start: "top 85%" },
          y: 45, opacity: 0, duration: 1, ease: "power3.out",
        });
      }
      if (miniCardsRef.current.length > 0) {
        gsap.from(miniCardsRef.current, {
          scrollTrigger: { trigger: miniCardsRef.current[0], start: "top 85%" },
          y: 55, opacity: 0, scale: 0.96, duration: 0.8, stagger: 0.1, ease: "power3.out",
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* theme tokens */
  const bgImage = isDark
    ? "url('/product_section/dark_prd_bg.png')"
    : "url('/product_section/light_prd_bg.png')";

  const bgOverlay = isDark
    ? "rgba(2, 10, 26, 0.45)"
    : "rgba(210, 232, 248, 0.30)";

  const bottomFade = isDark
    ? "linear-gradient(180deg, transparent 0%, #020c1b 100%)"
    : "linear-gradient(180deg, transparent 0%, #c2dff5 100%)";

  const headingColor = isDark ? "#ffffff" : "#0A3E66";
  const headingGlow  = isDark
    ? "0 0 20px rgba(0,210,255,0.65), 0 2px 8px rgba(0,0,0,0.5)"
    : "0 0 14px rgba(0,140,255,0.28)";

  const ctaBg     = isDark ? "rgba(0,180,255,0.14)" : "rgba(255,255,255,0.38)";
  const ctaBorder = isDark ? "1px solid rgba(0,210,255,0.50)" : "1px solid rgba(255,255,255,0.70)";
  const ctaColor  = isDark ? "#7ee8ff" : "#055a99";
  const ctaShadow = isDark ? "0 0 26px rgba(0,210,255,0.42)" : "0 0 18px rgba(0,120,255,0.24)";

  const particles = isDark ? DARK_PARTICLES : LIGHT_PARTICLES;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Photo colour overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: bgOverlay, transition: "background 0.6s ease" }}
      />

      {/* Edge vignette — depth & focus on center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.38) 100%)",
          mixBlendMode: "multiply" as const,
        }}
      />

      {/* Top inner shadow */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: 180,
          background: isDark
            ? "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)"
            : "linear-gradient(to bottom, rgba(180,215,240,0.35) 0%, transparent 100%)",
        }}
      />

      {/* Bottom inner shadow */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: 220,
          background: isDark
            ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)"
            : "linear-gradient(to top, rgba(160,205,235,0.40) 0%, transparent 100%)",
        }}
      />

      {/*  ATMOSPHERE  */}

      {/* Bokeh particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: isDark
                ? "radial-gradient(circle, rgba(140,220,255,0.85) 0%, rgba(0,180,255,0.30) 60%, transparent 100%)"
                : "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(180,225,255,0.50) 55%, transparent 100%)",
              boxShadow: isDark
                ? `0 0 ${p.size * 1.8}px rgba(0,200,255,0.6)`
                : `0 0 ${p.size * 1.4}px rgba(255,255,255,0.8)`,
              opacity: p.opacity,
              animation: `subtleFloat 6s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Water-splash blob near base */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 1300,
          height: 280,
          background: isDark
            ? "radial-gradient(ellipse at center 60%, rgba(0,150,255,0.10) 0%, transparent 68%)"
            : "radial-gradient(ellipse at center 60%, rgba(120,190,255,0.22) 0%, transparent 68%)",
          filter: "blur(40px)",
          opacity: 0.75,
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          background: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"%3E%3Cfilter id=\"g\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"120\" height=\"120\" filter=\"url(%23g)\" opacity=\"0.5\"/%3E%3C/svg%3E')",
          mixBlendMode: "soft-light" as const,
        }}
      />

      {/*  CONTENT  */}
      <div
        className="container mx-auto max-w-[1400px] px-6 relative z-10"
        style={{ paddingTop: 130, paddingBottom: 120 }}
      >
        {/* Hero text + CTA */}
        <div className="flex justify-center items-center pb-14">
          <div ref={heroTextRef} className="max-w-2xl text-center">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[1.05] mb-7"
              style={{ letterSpacing: "0.04em", color: headingColor, textShadow: headingGlow }}
            >
              Discover
              <br />
              <span style={{ color: isDark ? "var(--c-aqua)" : "#0077cc" }}>Pure</span> Hydration
            </h2>

            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base font-semibold relative overflow-hidden"
              style={{
                background: ctaBg,
                backdropFilter: "blur(18px) saturate(140%)",
                WebkitBackdropFilter: "blur(18px) saturate(140%)",
                border: ctaBorder,
                color: ctaColor,
                boxShadow: ctaShadow,
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 0 42px rgba(0,210,255,0.65)"
                  : "0 0 32px rgba(0,120,255,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = ctaShadow;
              }}
            >
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 36%, rgba(255,255,255,0.12) 46%, rgba(255,255,255,0.05) 52%, transparent 60%)",
                  animation: "shimmerLoad 4s infinite",
                }}
              />
              <span className="relative z-10">Order Now</span>
              <svg className="relative z-10" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Product cards grid */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(ellipse at center, rgba(0,160,255,0.12) 0%, transparent 60%)"
                : "radial-gradient(ellipse at center, rgba(140,200,255,0.28) 0%, transparent 60%)",
              filter: "blur(20px)",
              opacity: 0.85,
            }}
          />
          <div
            className="relative z-10"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "48px",
              padding: "24px 0",
            }}
          >
            {products.map((product, i) => (
              <div
                key={product.name}
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
                style={{ minWidth: 0 }}
              >
                <ProductCard
                  name={product.name}
                  tagline={product.tagline}
                  description={product.description}
                  imageSrc={product.imageSrc}
                  accent={product.accent}
                  theme={theme}
                />
              </div>
            ))}
          </div>
        </div>

        {/* NOT JUST WATER + mini cards */}
        <div className="relative z-20" style={{ marginTop: 80 }}>
          <h2
            ref={bottomHeadingRef}
            className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase"
            style={{
              marginBottom: 64,
              letterSpacing: "0.10em",
              color: headingColor,
              textShadow: headingGlow,
            }}
          >
            Not Just Water.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px",
              padding: "16px 0",
            }}
          >
            {miniFeatures.map((feat, i) => (
              <div
                key={feat.title}
                ref={(el) => { if (el) miniCardsRef.current[i] = el; }}
                style={{ minWidth: 0 }}
              >
                <FeatureMiniCard
                  icon={feat.icon}
                  title={feat.title}
                  description={feat.description}
                  theme={theme}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 130, background: bottomFade }}
      />
    </section>
  );
}
