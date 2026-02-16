"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import gsap from "gsap";
import Scene from "../3d/Scene";
import ParallaxBackground from "./ParallaxBackground.new";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isUltrawide, setIsUltrawide] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkAspect = () => {
      const ratio = window.innerWidth / window.innerHeight;
      setIsPortrait(ratio < 1);
      setIsUltrawide(ratio > 2);
    };
    checkAspect();
    window.addEventListener("resize", checkAspect);
    return () => window.removeEventListener("resize", checkAspect);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(contentRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.6,
        delay: 0.4,
      }).from(
        canContainerRef.current,
        {
          scale: 0.85,
          opacity: 0,
          y: 40,
          duration: 2.0,
          ease: "power2.out",
        },
        "-=1.3",
      );
    }, container);

    return () => ctx.revert();
  }, [mounted]);

  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;
    const scrollY = window.scrollY;
    const factor = Math.min(scrollY / 800, 1);
    contentRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
    contentRef.current.style.opacity = `${1 - factor * 0.6}`;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!container.current || !canContainerRef.current) return;
    const rect = container.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(canContainerRef.current, {
      x: x * 2.5 * -14,
      y: y * 2.5 * -8,
      duration: 1.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    el.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  return (
    <section
      ref={container}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "100vh", maxHeight: "100vh", backgroundColor: "#7CB9D6" }}
    >
      <ParallaxBackground />

      <div
        ref={contentRef}
        className="flex flex-col justify-center will-change-transform px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pointer-events-none"
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 4,
          maxWidth: isPortrait ? "100%" : 720,
        }}
      >
        <h1 
          className="font-black tracking-tight mb-6"
          style={{
            fontSize: "clamp(48px, 8vw, 80px)",
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          <span 
            className="block"
            style={{
              color: "white",
              textShadow: "0 2px 24px rgba(0, 0, 0, 0.45), 0 0 60px rgba(255, 255, 255, 0.1)",
            }}
          >
            PURE HYDRATION
          </span>
          <span 
            className="block"
            style={{
              color: "white",
              textShadow: "0 2px 24px rgba(0, 0, 0, 0.45), 0 0 60px rgba(255, 255, 255, 0.1)",
            }}
          >
            REDEFINED
          </span>
        </h1>

        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            right: isPortrait ? "-60px" : "-180px",
            top: isPortrait ? "10px" : "50%",
            transform: isPortrait ? "none" : "translateY(-50%)",
            fontSize: isPortrait ? "clamp(100px, 25vw, 140px)" : "clamp(140px, 18vw, 240px)",
            fontWeight: 800,
            background: "linear-gradient(135deg, rgba(174, 241, 255, 0.6), rgba(0, 198, 255, 0.65))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-6px",
            lineHeight: 1,
            zIndex: 4,
            filter: "drop-shadow(0 0 40px rgba(0, 198, 255, 0.3))",
          }}
        >
          H2O
        </div>

        <p className="text-white text-opacity-85 text-sm sm:text-base md:text-lg leading-relaxed max-w-md font-light italic" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}>
          Experience the perfect balance of mineral water, crafted to enhance
          your daily hydration and wellness journey.
        </p>

      </div>

      <div
        ref={canContainerRef}
        className="flex items-end justify-center will-change-transform"
        style={{
          position: "absolute",
          bottom: isPortrait ? "5%" : isUltrawide ? "8%" : "6%",
          left: "50%",
          transform: "translateX(-50%)",
          width: isPortrait ? "clamp(190px, 48vw, 340px)" : isUltrawide ? "clamp(240px, 26vw, 420px)" : "clamp(220px, 35vw, 420px)",
          height: isPortrait ? "54%" : isUltrawide ? "60%" : "60%",
          zIndex: 10,
          transition: "left 0.3s ease, bottom 0.3s ease, width 0.3s ease, height 0.3s ease",
        }}
      >
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            bottom: "2%",
            left: "50%",
            width: 180,
            height: 60,
            borderRadius: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse, rgba(0,194,255,0.2) 0%, rgba(0,194,255,0.06) 40%, transparent 70%)",
            filter: "blur(12px)",
            zIndex: -1,
          }}
        />

        <div
          className="relative"
          style={{
            width: "100%",
            height: "100%",
            maxWidth: 420,
            maxHeight: 520,
          }}
        >
          <Scene />
        </div>
      </div>

      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.25), transparent)",
          zIndex: 5,
        }}
      />

      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: "linear-gradient(180deg, transparent 0%, rgba(10,15,20,0.6) 60%, #0A0F14 100%)",
          zIndex: 19,
        }}
      />
    </section>
  );
}
