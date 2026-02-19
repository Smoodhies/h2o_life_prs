"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

/* --------------------------------------------------------
   Image-based parallax background — matching the reference:
   Back → Front:  sky-gradient → sky.png → mountain → lake → rock → leaves
   
   • sky & mountain & lake share a compositing frame so their
     alpha channels line up (mountains show through lake's
     transparent top half).
   • rock is positioned independently — small boulder at
     bottom-center, NOT the full compositing frame.
   • leaves are slightly overscaled for foreground depth.
   -------------------------------------------------------- */

interface ParallaxLayer {
  ref: React.RefObject<HTMLDivElement | null>;
  mouseSpeed: number;
  scrollSpeed: number;
}

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement>(null);
  const lakeRef = useRef<HTMLDivElement>(null);
  const rockRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  /* ---- Detect aspect ratio for responsive layer sizing ---- */
  const [isPortrait, setIsPortrait] = useState(false);
  const [isUltrawide, setIsUltrawide] = useState(false);

  useEffect(() => {
    const checkAspect = () => {
      const ratio = window.innerWidth / window.innerHeight;
      setIsPortrait(ratio < 1);
      setIsUltrawide(ratio > 2);
    };
    checkAspect();
    window.addEventListener("resize", checkAspect);
    return () => window.removeEventListener("resize", checkAspect);
  }, []);

  /* ---- Entry animations: leaves from bottom, mountains grow up ---- */
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Mountains: grow upward from 10% below original position
    if (mountainsRef.current) {
      gsap.set(mountainsRef.current, { y: "10%", opacity: 0.7 });
      tl.to(
        mountainsRef.current,
        {
          y: "0%",
          opacity: 1,
          duration: 2.4,
          ease: "power2.out",
        },
        0.2,
      );
    }

    // Rock: scale up from bottom
    if (rockRef.current) {
      gsap.set(rockRef.current, { y: "60%", opacity: 0, scale: 0.8 });
      tl.to(
        rockRef.current,
        {
          y: "0%",
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "back.out(1.2)",
        },
        0.8,
      );
    }

    // Leaves: sweep in from sides to original position
    if (leavesRef.current) {
      gsap.set(leavesRef.current, { scale: 1.3, opacity: 0 });
      tl.to(
        leavesRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 2.2,
          ease: "power3.out",
        },
        0.4,
      );
    }
  }, []);

  const getLayers = useCallback(
    (): ParallaxLayer[] => [
      { ref: skyRef, mouseSpeed: 0.3, scrollSpeed: 0.01 },
      { ref: mountainsRef, mouseSpeed: -0.6, scrollSpeed: -0.02 },
      { ref: leavesRef, mouseSpeed: 5.0, scrollSpeed: 0.24 },
    ],
    [],
  );

  /* ---- mouse-driven parallax ---- */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      getLayers().forEach(({ ref, mouseSpeed }) => {
        if (ref.current) {
          gsap.to(ref.current, {
            x: x * mouseSpeed * -14,
            y: y * mouseSpeed * -8,
            duration: 1.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    },
    [getLayers],
  );

  /* ---- touch-driven parallax for mobile/tablet ---- */
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0]) return;
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width - 0.5;
      const y = (touch.clientY - rect.top) / rect.height - 0.5;

      lastTouchRef.current = { x, y };

      getLayers().forEach(({ ref, mouseSpeed }) => {
        if (ref.current) {
          gsap.to(ref.current, {
            x: x * mouseSpeed * -10,
            y: y * mouseSpeed * -6,
            duration: 1.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    },
    [getLayers],
  );

  const handleTouchEnd = useCallback(() => {
    // Smoothly return to center when touch ends
    lastTouchRef.current = null;
    getLayers().forEach(({ ref }) => {
      if (ref.current) {
        gsap.to(ref.current, {
          x: 0,
          y: 0,
          duration: 2.0,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    });
  }, [getLayers]);

  /* ---- gyroscope-driven parallax for mobile ---- */
  const handleDeviceOrientation = useCallback(
    (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      const x = (e.gamma / 45) * 0.5; // -1 to 1 range, clamped
      const y = ((e.beta - 45) / 45) * 0.5;

      getLayers().forEach(({ ref, mouseSpeed }) => {
        if (ref.current) {
          gsap.to(ref.current, {
            x: x * mouseSpeed * -8,
            y: y * mouseSpeed * -5,
            duration: 2.0,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    },
    [getLayers],
  );

  /* ---- scroll-driven parallax ---- */
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    getLayers().forEach(({ ref, scrollSpeed }) => {
      if (ref.current) {
        gsap.to(ref.current, {
          y: scrollY * scrollSpeed * -1,
          duration: 0.6,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
    });
  }, [getLayers]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Desktop: mouse
    container.addEventListener("mousemove", handleMouseMove);
    // Mobile/tablet: touch
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);
    // Scroll: all devices
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Gyroscope: mobile devices
    if (typeof DeviceOrientationEvent !== "undefined") {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [
    handleMouseMove,
    handleTouchMove,
    handleTouchEnd,
    handleScroll,
    handleDeviceOrientation,
  ]);

  /* ---- compositing layer style (sky / mountain / lake share this) ---- */
  const sceneLayerStyle = (zIndex: number): React.CSSProperties => ({
    position: "absolute",
    top: "-5%",
    left: "-5%",
    width: "110%",
    height: "110%",
    zIndex,
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
        background: "#7CB9D6",
      }}
    >
      {/* ===== LAYER 0 — Solid sky gradient (fallback behind sky.png) ===== */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background:
            "linear-gradient(180deg, #7CB9D6 0%, #8ec5de 15%, #a3d1e8 30%, #8ec5de 50%, #7CB9D6 70%, #5a9cb8 100%)",
        }}
      />

      {/* ===== LAYER 1 — Sky image ===== */}
      <div
        ref={skyRef}
        className="will-change-transform"
        style={{
          position: "absolute",
          top: "-8%",
          left: "-5%",
          width: "110%",
          height: isPortrait ? "55%" : isUltrawide ? "80%" : "70%",
          zIndex: 1,
        }}
      >
        <Image
          src="/img/parallax/sky.png"
          alt="Sky"
          fill
          sizes="110vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
          quality={90}
        />
      </div>

      {/* ===== LAYER 2 — Mountains =====
          Positioned to show snow peaks starting near the top,
          overlapping with sky. Mountain PNG has transparent top. */}
      <div
        ref={mountainsRef}
        className="will-change-transform"
        style={{
          position: "absolute",
          top: isPortrait ? "-5%" : isUltrawide ? "-30%" : "-32%",
          left: isPortrait ? "-8%" : "-15%",
          width: isPortrait ? "116%" : "130%",
          height: isPortrait ? "70%" : isUltrawide ? "100%" : "80%",
          zIndex: 2,
        }}
      >
        <Image
          src="/img/parallax/mountain.png"
          alt="Mountains"
          fill
          sizes="116vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
          quality={90}
        />
      </div>

      {/* ===== LAYER 3 — Lake =====
          Pushed DOWN so its opaque water (starts at ~44% of image)
          covers only the bottom half. The transparent top lets the
          mountain peaks show prominently. */}
      <div
        ref={lakeRef}
        className="will-change-transform"
        style={{
          position: "absolute",
          top: "-5%",
          left: "-5%",
          width: "110%",
          height: "120%",
          zIndex: 3,
        }}
      >
        <Image
          src="/img/parallax/lake.png"
          alt="Lake"
          fill
          sizes="110vw"
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
          priority
          quality={90}
        />
      </div>

      {/* ===== LAYER 4 — Rock =====
          Floating on lake water, center-aligned with can, IN FRONT of can */}
      <div
        ref={rockRef}
        style={{
          position: "absolute",
          bottom: isPortrait ? "-2%" : isUltrawide ? "0%" : "0%",
          left: isPortrait ? "55%" : isUltrawide ? "68%" : "68%",
          transform: "translateX(-50%)",
          width: isPortrait
            ? "min(460px, 85vw)"
            : isUltrawide
              ? "min(700px, 48vw)"
              : "min(660px, 56vw)",
          height: isPortrait
            ? "min(330px, 38vh)"
            : isUltrawide
              ? "min(430px, 40vh)"
              : "min(410px, 42vh)",
          zIndex: 14,
          transition:
            "left 0.3s ease, bottom 0.3s ease, width 0.3s ease, height 0.3s ease",
          display: "none",
        }}
      >
        <Image
          src="/img/parallax/rock.png"
          alt="Rock"
          fill
          sizes="(max-width: 768px) 70vw, 42vw"
          style={{ objectFit: "contain", objectPosition: "center bottom" }}
          quality={90}
        />
      </div>

      {/* ===== LAYER 5 — Leaves (foreground framing) ===== */}
      <div
        ref={leavesRef}
        className="will-change-transform"
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "120%",
          height: "120%",
          zIndex: 5,
        }}
      >
        <Image
          src="/img/parallax/leafs.png"
          alt="Leaves"
          fill
          sizes="116vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={90}
        />
      </div>

      {/* Subtle vignette overlay for depth */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 6,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)",
        }}
      />
    </div>
  );
}
