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
  const h2oTextRef = useRef<HTMLDivElement>(null);
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

      // Animate H2O text first
      tl.from(h2oTextRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "back.out(1.2)",
      })
        // Then can with upward motion
        .from(
          canContainerRef.current,
          {
            scale: 0.85,
            opacity: 0,
            y: 50,
            duration: 1.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        // Finally bottom text slides in
        .from(
          contentRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1.4,
          },
          "-=1.0",
        );
    }, container);

    return () => ctx.revert();
  }, [mounted]);

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
    el.addEventListener("mousemove", handleMouseMove);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={container}
      className="relative w-full overflow-hidden"
      style={{
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        backgroundColor: "#7CB9D6",
      }}
    >
      <ParallaxBackground />

      {/* H2O Background Text - Behind Can with liquid glass effect */}
      <div
        ref={h2oTextRef}
        className="pointer-events-none transform-gpu isolate"
        style={{
          position: "absolute",
          left: isPortrait ? "50%" : "52%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: isPortrait
            ? "clamp(140px, 35vw, 200px)"
            : "clamp(200px, 24vw, 360px)",
          fontWeight: 800,
          background:
            "linear-gradient(135deg, rgba(240, 250, 255, 0.95) 0%, rgba(150, 230, 255, 0.95) 20%, rgba(70, 200, 255, 0.95) 50%, rgba(0, 160, 230, 0.9) 80%, rgba(0, 120, 200, 0.9) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-12px",
          lineHeight: 1,
          zIndex: 8,
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          maxWidth: "100vw",
          overflow: "visible",
          whiteSpace: "nowrap",
          textShadow: `
            0 1px 0 rgba(255, 255, 255, 0.9),
            0 2px 0 rgba(230, 248, 255, 0.85),
            0 3px 0 rgba(200, 240, 255, 0.8),
            0 4px 0 rgba(170, 232, 255, 0.75),
            0 5px 0 rgba(140, 224, 255, 0.7),
            0 6px 0 rgba(110, 216, 255, 0.65),
            0 7px 0 rgba(80, 208, 255, 0.6),
            0 8px 0 rgba(50, 200, 255, 0.55),
            0 10px 15px rgba(0, 120, 180, 0.6),
            0 15px 25px rgba(0, 100, 160, 0.5),
            0 20px 35px rgba(0, 80, 140, 0.4),
            0 25px 45px rgba(0, 60, 120, 0.3),
            0 0 60px rgba(150, 230, 255, 1),
            0 0 90px rgba(70, 200, 255, 1),
            0 0 130px rgba(0, 160, 230, 0.9),
            0 0 170px rgba(0, 120, 200, 0.7),
            inset 0 0 70px rgba(150, 230, 255, 1),
            inset 0 0 110px rgba(70, 200, 255, 0.9)
          `,
          filter:
            "drop-shadow(0 25px 50px rgba(0, 120, 180, 0.7)) contrast(1.15) brightness(1.1)",
        }}
      >
        H2O
      </div>

      {/* Headline Text with liquid glass effect */}
      <div
        ref={contentRef}
        className="flex flex-col justify-center items-center transform-gpu isolate text-center"
        style={{
          position: "absolute",
          left: "50%",
          bottom: isPortrait ? "3%" : isUltrawide ? "1%" : "2%",
          transform: "translateX(-50%)",
          zIndex: 14,
          width: "95%",
          maxWidth: "1200px",
          pointerEvents: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          overflow: "visible",
        }}
      >
        <h1
          className="font-black tracking-tight"
          style={{
            fontSize: isPortrait
              ? "clamp(24px, 5vw, 38px)"
              : isUltrawide
                ? "clamp(42px, 3.5vw, 68px)"
                : "clamp(32px, 4vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: isPortrait ? "-1.5px" : "-2px",
            userSelect: "none",
            WebkitUserSelect: "none",
            color: "white",
            maxWidth: "100%",
            overflow: "visible",
            whiteSpace: "normal",
            wordWrap: "break-word",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(240, 250, 255, 0.98) 15%, rgba(200, 240, 255, 0.95) 40%, rgba(150, 220, 255, 0.92) 70%, rgba(100, 200, 240, 0.9) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: `
              0 1px 0 rgba(255, 255, 255, 1),
              0 2px 0 rgba(240, 250, 255, 0.95),
              0 3px 0 rgba(220, 245, 255, 0.9),
              0 4px 0 rgba(200, 240, 255, 0.85),
              0 5px 0 rgba(180, 235, 255, 0.8),
              0 6px 0 rgba(160, 230, 255, 0.75),
              0 7px 0 rgba(140, 225, 255, 0.7),
              0 8px 0 rgba(120, 220, 255, 0.65),
              0 10px 12px rgba(0, 120, 180, 0.5),
              0 14px 20px rgba(0, 100, 160, 0.4),
              0 18px 30px rgba(0, 80, 140, 0.35),
              0 22px 40px rgba(0, 60, 120, 0.3),
              0 0 50px rgba(255, 255, 255, 1),
              0 0 70px rgba(200, 240, 255, 1),
              0 0 100px rgba(150, 220, 255, 1),
              0 0 140px rgba(100, 200, 240, 0.9),
              inset 0 0 60px rgba(200, 240, 255, 1),
              inset 0 0 90px rgba(150, 220, 255, 0.9)
            `,
            filter:
              "drop-shadow(0 12px 30px rgba(0, 120, 180, 0.6)) contrast(1.2) brightness(1.15)",
          }}
        >
          <span className="block">PURE HYDRATION</span>
          <span className="block">REDEFINED</span>
        </h1>
      </div>

      {/* 3D Can Container */}
      <div
        ref={canContainerRef}
        className="flex items-end justify-center will-change-transform"
        style={{
          position: "absolute",
          bottom: isPortrait ? "5%" : isUltrawide ? "8%" : "6%",
          left: "50%",
          transform: "translateX(-50%)",
          width: isPortrait
            ? "clamp(190px, 48vw, 340px)"
            : isUltrawide
              ? "clamp(240px, 26vw, 420px)"
              : "clamp(220px, 35vw, 420px)",
          height: isPortrait ? "54%" : isUltrawide ? "60%" : "60%",
          zIndex: 10,
          transition:
            "left 0.3s ease, bottom 0.3s ease, width 0.3s ease, height 0.3s ease",
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
            background:
              "radial-gradient(ellipse, rgba(0,194,255,0.2) 0%, rgba(0,194,255,0.06) 40%, transparent 70%)",
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

      {/* Atmosphere Haze Layer */}
      <div
        className="pointer-events-none transform-gpu"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45%",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)",
          zIndex: 5,
        }}
      />

      {/* Water Darkening Gradient at Bottom */}
      <div
        className="pointer-events-none transform-gpu"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0, 40, 80, 0.4) 40%, rgba(10, 15, 20, 0.7) 70%, #0A0F14 100%)",
          zIndex: 19,
        }}
      />
    </section>
  );
}
