"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../ui/ProductCard";
import FeatureMiniCard from "../ui/FeatureMiniCard";
import { useTheme } from "@/context/ThemeContext";

/* ─── Product data ─── */
const products = [
  {
    name: "Premium Mineral Water",
    tagline: "Premium Mineral Water",
    description: "Naturally sourced with a crisp, refreshing taste.",
    imageSrc: "/hero_prd/black_front_can.png",
    accent: "#00a0ff",
  },
  {
    name: "Sparkling Hydration",
    tagline: "Sparkling Hydration",
    description: "Effervescent taste perfect for ultimate refreshment.",
    imageSrc: "/hero_prd/white_front_can.png",
    accent: "#22d3ee",
  },
  {
    name: "Eco Conscious",
    tagline: "Eco Conscious",
    description: "Sustainable packaging that cares for the planet.",
    imageSrc: "/hero_prd/white_front_can.png",
    accent: "#34d399",
  },
];

const miniFeatures = [
  {
    icon: "💧",
    title: "100% Natural",
    description: "Sourced sustainably for purity and taste.",
  },
  {
    icon: "🥫",
    title: "Aluminium Can",
    description: "Recyclable and eco-friendly packaging.",
  },
  {
    icon: "🌿",
    title: "Eco Conscious",
    description: "Committed to sustainable practices.",
  },
  {
    icon: "🔬",
    title: "Premium Mineral Source",
    description: "Purity ensured by advanced filtration.",
  },
];

export default function ProductShowcase() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const bottomHeadingRef = useRef<HTMLHeadingElement>(null);
  const miniCardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Hero text fade in */
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current, {
          scrollTrigger: { trigger: heroTextRef.current, start: "top 85%" },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      /* Product cards stagger */
      if (cardsRef.current.length > 0) {
        gsap.from(cardsRef.current, {
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 80%" },
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
        });
      }

      /* "NOT JUST WATER." heading */
      if (bottomHeadingRef.current) {
        gsap.from(bottomHeadingRef.current, {
          scrollTrigger: { trigger: bottomHeadingRef.current, start: "top 85%" },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      /* Mini feature cards stagger */
      if (miniCardsRef.current.length > 0) {
        gsap.from(miniCardsRef.current, {
          scrollTrigger: { trigger: miniCardsRef.current[0], start: "top 85%" },
          y: 60,
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background:
          theme === "light"
            ? "linear-gradient(180deg, #f5f7fa 0%, #e0f2f7 15%, #d1ebf3 50%, #e0f2f7 85%, #f5f7fa 100%)"
            : "linear-gradient(180deg, #0A0F14 0%, #071A2F 15%, #0B2C4A 50%, #071A2F 85%, #0A0F14 100%)",
      }}
    >
      {/* ═══════════ ATMOSPHERIC LAYERS ═══════════ */}

      {/* Volumetric light rays from top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "120%",
          height: "60%",
          background:
            theme === "light"
              ? "conic-gradient(from 180deg at 50% 0%, transparent 30%, rgba(0, 160, 255, 0.02) 35%, transparent 40%, transparent 45%, rgba(0, 160, 255, 0.015) 48%, transparent 52%, transparent 60%, rgba(0, 160, 255, 0.02) 63%, transparent 68%)"
              : "conic-gradient(from 180deg at 50% 0%, transparent 30%, rgba(0, 160, 255, 0.04) 35%, transparent 40%, transparent 45%, rgba(0, 160, 255, 0.03) 48%, transparent 52%, transparent 60%, rgba(0, 160, 255, 0.04) 63%, transparent 68%)",
          opacity: theme === "light" ? 0.5 : 0.8,
        }}
      />

      {/* Caustic water reflection overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.015' numOctaves='3' seed='2'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='40'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%230088cc' filter='url(%23c)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "600px 600px",
        }}
      />

      {/* Main ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            theme === "light"
              ? "radial-gradient(ellipse, rgba(0, 130, 220, 0.03) 0%, transparent 65%)"
              : "radial-gradient(ellipse, rgba(0, 130, 220, 0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Subtle floating mist particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute animate-mist-drift"
          style={{
            top: "20%",
            left: "10%",
            width: 300,
            height: 200,
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.015) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute animate-mist-drift-reverse"
          style={{
            top: "50%",
            right: "5%",
            width: 400,
            height: 250,
            background:
              "radial-gradient(ellipse, rgba(0,160,255,0.012) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute animate-mist-float"
          style={{
            bottom: "30%",
            left: "30%",
            width: 250,
            height: 150,
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.01) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* ═══════════ CONTENT ═══════════ */}
      <div className="container mx-auto max-w-[1400px] px-6 relative z-10">
        {/* ──── TOP: Cinematic Hero Text (Centered) ──── */}
        <div className="flex justify-center items-center pt-16 pb-12 md:pt-24 md:pb-20">
          {/* Text */}
          <div ref={heroTextRef} className="max-w-2xl text-center">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[1.05] mb-6"
              style={{
                letterSpacing: "0.04em",
                color: theme === "light" ? "#0a0f14" : "#ffffff",
                textShadow:
                  theme === "light"
                    ? "0 0 20px rgba(0, 160, 255, 0.1), 0 0 40px rgba(0, 120, 200, 0.05)"
                    : "0 0 40px rgba(0, 160, 255, 0.2), 0 0 80px rgba(0, 120, 200, 0.08)",
              }}
            >
              Discover
              <br />
              <span style={{ color: "var(--c-aqua)" }}>Pure</span> Hydration
            </h2>

            {/* Glass CTA button */}
            <a
              href="#"
              className="group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-300 hover:scale-[1.04] hover:brightness-125 active:scale-[0.98] relative overflow-hidden"
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
              <span className="relative z-10">Order Now</span>
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

        {/* ──── MIDDLE: 3 Floating Glass Product Cards ──── */}
        <div className="relative pb-8">
          {/* Radial glow behind card group */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full pointer-events-none -z-0"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0, 160, 255, 0.04) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />

          {/* Single row with 3 cards - always horizontal */}
          <div className="flex flex-nowrap justify-center items-stretch gap-12 md:gap-16 lg:gap-20 relative z-10 px-4">
            {products.map((product, i) => (
              <div
                key={product.name}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="flex-shrink-0"
                style={{
                  width: "clamp(280px, 30vw, 380px)",
                  maxWidth: "380px",
                  marginRight: "5%",
                }}
              >
                <ProductCard
                  name={product.name}
                  tagline={product.tagline}
                  description={product.description}
                  imageSrc={product.imageSrc}
                  accent={product.accent}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ──── BOTTOM: "NOT JUST WATER." + Feature Strip ──── */}
        <div className="pt-20 md:pt-28 pb-16 md:pb-24 relative z-20">
          {/* Heading */}
          <h2
            ref={bottomHeadingRef}
            className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase mb-20 md:mb-28"
            style={{
              letterSpacing: "0.06em",
              color: theme === "light" ? "#000000" : "#ffffff",
              textShadow:
                theme === "light"
                  ? "0 2px 4px rgba(0, 0, 0, 0.15), 0 0 30px rgba(0, 160, 255, 0.2)"
                  : "0 0 30px rgba(0, 160, 255, 0.15), 0 0 60px rgba(0, 120, 200, 0.06)",
              fontWeight: 900,
            }}
          >
            Not Just Water.
          </h2>

          {/* 4 Mini Feature Cards - Single Horizontal Row */}
          <div className="flex flex-nowrap justify-center items-stretch gap-8 md:gap-10 lg:gap-12 overflow-x-auto px-4 md:px-8 lg:px-12">
            {miniFeatures.map((feat, i) => (
              <div
                key={feat.title}
                ref={(el) => {
                  if (el) miniCardsRef.current[i] = el;
                }}
                className="flex-shrink-0"
                style={{
                  width: "clamp(200px, 22vw, 280px)",
                  maxWidth: "280px",
                }}
              >
                <FeatureMiniCard
                  icon={feat.icon}
                  title={feat.title}
                  description={feat.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 120,
          background:
            theme === "light"
              ? "linear-gradient(180deg, transparent 0%, #f5f7fa 100%)"
              : "linear-gradient(180deg, transparent 0%, #0A0F14 100%)",
        }}
      />
    </section>
  );
}
