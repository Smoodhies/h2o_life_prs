"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "../ui/GlassCard";
import { useTheme } from "@/context/ThemeContext";

export default function Features() {
  const container = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".section-title", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Stagger cards with scale effect
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
        y: 120,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        stagger: 0.25,
        ease: "power3.out",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Aluminium > Plastic",
      desc: "Sustainable packaging for a cleaner planet. Infinitely recyclable, endlessly responsible.",
      icon: "♻️",
    },
    {
      title: "Lab-Quality Minerals",
      desc: "Enhanced with electrolytes for optimal hydration. Science-backed purity.",
      icon: "⚗️",
    },
    {
      title: "Arctic Crispness",
      desc: "Sourced from glacial springs for pure taste. Every sip tells a story of untouched nature.",
      icon: "❄️",
    },
  ];

  return (
    <section
      ref={container}
      className="min-h-screen py-32 relative px-6 section-padding"
    >
      <div className="container mx-auto max-w-[1400px]">
        <h2
          className={`section-title text-5xl md:text-7xl font-bold text-center mb-24 transition-colors duration-500 ${
            mounted && theme === "dark" ? "text-gradient" : "text-navy"
          }`}
        >
          Why H2O Life?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {features.map((feature, i) => (
            <GlassCard
              key={i}
              ref={(el: any) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group cursor-pointer"
            >
              <div className="text-5xl mb-6 filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                {feature.icon}
              </div>
              <h3
                className={`text-2xl md:text-3xl font-semibold mb-5 group-hover:text-[var(--c-aqua)] transition-colors duration-500 ${
                  mounted && theme === "dark" ? "text-white" : "text-navy"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-base md:text-lg leading-relaxed opacity-90 transition-colors duration-500 ${
                  mounted && theme === "dark"
                    ? "text-[var(--c-silver)]"
                    : "text-navy/80"
                }`}
              >
                {feature.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
