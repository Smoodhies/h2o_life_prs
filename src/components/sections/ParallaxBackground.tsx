"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

/* --------------------------------------------------------
   Fully CSS-painted alpine nature parallax background.
   All positioning uses inline styles to avoid TW4 inset bugs.
   -------------------------------------------------------- */

interface ParallaxLayer {
  ref: React.RefObject<HTMLDivElement | null>;
  speed: number;
}

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const mountainsFarRef = useRef<HTMLDivElement>(null);
  const mountainsMidRef = useRef<HTMLDivElement>(null);
  const mountainsNearRef = useRef<HTMLDivElement>(null);
  const lakeRef = useRef<HTMLDivElement>(null);
  const rockRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const leavesFrontLeftRef = useRef<HTMLDivElement>(null);
  const leavesFrontRightRef = useRef<HTMLDivElement>(null);
  const leavesBottomRef = useRef<HTMLDivElement>(null);

  /* ---- mouse-driven parallax ---- */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const layers: ParallaxLayer[] = [
      { ref: skyRef, speed: 0.5 },
      { ref: sunRef, speed: 0.8 },
      { ref: mountainsFarRef, speed: 1.2 },
      { ref: mountainsMidRef, speed: 2.0 },
      { ref: mountainsNearRef, speed: 3.0 },
      { ref: lakeRef, speed: 1.5 },
      { ref: rockRef, speed: 3.5 },
      { ref: mistRef, speed: 2.5 },
      { ref: raysRef, speed: 1.0 },
      { ref: leavesFrontLeftRef, speed: 6.0 },
      { ref: leavesFrontRightRef, speed: 5.5 },
      { ref: leavesBottomRef, speed: 5.0 },
    ];

    layers.forEach(({ ref, speed }) => {
      if (ref.current) {
        gsap.to(ref.current, {
          x: x * speed * -8,
          y: y * speed * -4,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* ---- shared inline-style helpers ---- */
  const full: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };
  const fullWithOverflow: React.CSSProperties = {
    position: "absolute",
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
  };

  return (
    <div ref={containerRef} style={{ ...full, overflow: "hidden", zIndex: 0 }}>
      {/* ───── SKY ───── */}
      <div
        ref={skyRef}
        className="will-change-transform"
        style={{
          ...fullWithOverflow,
          background: `linear-gradient(180deg,
                        #0a1628 0%, #0f2847 12%, #153a5e 22%, #1a5276 32%,
                        #2874a6 42%, #5dade2 55%, #85c1e9 65%, #aed6f1 75%,
                        #d4e6f1 85%, #e8d5b7 92%, #f0c27f 100%)`,
        }}
      />

      {/* ───── SUN GLOW (morning, top-left) ───── */}
      <div
        ref={sunRef}
        className="will-change-transform"
        style={{
          position: "absolute",
          top: "5%",
          left: "15%",
          width: 500,
          height: 500,
          background: `radial-gradient(circle,
                        rgba(255,236,179,0.7) 0%, rgba(255,213,128,0.4) 20%,
                        rgba(255,183,77,0.15) 45%, transparent 70%)`,
          filter: "blur(2px)",
          transform: "translate(-50%,-50%)",
        }}
      />
      {/* Sun core */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "18%",
          width: 60,
          height: 60,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,248,225,0.9) 0%, rgba(255,213,128,0.5) 50%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* ───── FAR MOUNTAINS (atmospheric, faded) ───── */}
      <div
        ref={mountainsFarRef}
        className="will-change-transform"
        style={{
          position: "absolute",
          bottom: "28%",
          left: -20,
          right: -20,
          height: "45%",
        }}
      >
        <svg
          viewBox="0 0 1920 500"
          preserveAspectRatio="none"
          style={{ ...full, filter: "blur(1.5px)" }}
        >
          <defs>
            <linearGradient id="fmG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a6d8c" stopOpacity={0.6} />
              <stop offset="40%" stopColor="#5a7d9c" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#6a8dac" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="snG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path
            d="M-50,500 L-50,350 Q100,180 200,220 Q300,150 400,100 Q480,60 560,120 Q650,80 720,50 Q800,30 880,80 Q960,40 1040,70 Q1120,30 1200,90 Q1300,50 1400,120 Q1500,80 1600,150 Q1700,100 1800,180 Q1900,130 1970,200 L1970,500 Z"
            fill="url(#fmG)"
          />
          {/* Snow caps */}
          <path
            d="M380,120 Q400,100 420,105 Q440,85 460,100 Q480,60 500,75 Q520,55 560,120 L540,130 Q520,100 500,110 Q480,80 460,105 Q440,90 420,110 Z"
            fill="url(#snG)"
            opacity={0.8}
          />
          <path
            d="M700,70 Q720,50 740,55 Q760,35 780,50 Q800,30 820,45 Q840,25 880,80 L860,90 Q840,60 820,65 Q800,42 780,58 Q760,40 740,60 Z"
            fill="url(#snG)"
            opacity={0.85}
          />
          <path
            d="M1020,85 Q1040,70 1060,65 Q1080,45 1100,55 Q1120,30 1140,50 L1130,70 Q1120,50 1100,60 Q1080,50 1060,70 Z"
            fill="url(#snG)"
            opacity={0.7}
          />
        </svg>
      </div>

      {/* ───── MID MOUNTAINS ───── */}
      <div
        ref={mountainsMidRef}
        className="will-change-transform"
        style={{
          position: "absolute",
          bottom: "22%",
          left: -20,
          right: -20,
          height: "45%",
        }}
      >
        <svg viewBox="0 0 1920 500" preserveAspectRatio="none" style={full}>
          <defs>
            <linearGradient id="mmG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c4a5e" />
              <stop offset="50%" stopColor="#1e3a4e" />
              <stop offset="100%" stopColor="#1a3040" />
            </linearGradient>
          </defs>
          <path
            d="M-50,500 L-50,380 Q50,280 150,320 Q250,200 350,250 Q450,150 550,200 Q650,100 750,160 Q850,80 950,180 Q1050,120 1150,200 Q1250,140 1350,210 Q1450,160 1550,240 Q1650,180 1750,280 Q1850,220 1970,300 L1970,500 Z"
            fill="url(#mmG)"
          />
          <path
            d="M430,170 Q450,150 470,155 Q490,130 510,150 Q530,115 550,200 L530,195 Q520,150 510,155 Q490,135 470,160 Z"
            fill="white"
            opacity={0.75}
          />
          <path
            d="M830,100 Q850,80 870,85 Q890,65 910,80 Q930,50 950,180 L935,170 Q930,100 910,90 Q890,70 870,90 Z"
            fill="white"
            opacity={0.8}
          />
        </svg>
      </div>

      {/* ───── NEAR MOUNTAINS / TREELINE ───── */}
      <div
        ref={mountainsNearRef}
        className="will-change-transform"
        style={{
          position: "absolute",
          bottom: "16%",
          left: -30,
          right: -30,
          height: "40%",
        }}
      >
        <svg viewBox="0 0 1920 400" preserveAspectRatio="none" style={full}>
          <defs>
            <linearGradient id="nmG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#152a38" />
              <stop offset="100%" stopColor="#0d1f2d" />
            </linearGradient>
          </defs>
          <path
            d="M-50,400 L-50,320 Q80,250 180,280 Q280,220 380,260 Q480,200 580,240 Q680,190 780,230 Q880,180 980,240 Q1080,200 1180,260 Q1280,220 1380,270 Q1480,230 1580,280 Q1680,240 1780,290 Q1880,260 1970,310 L1970,400 Z"
            fill="url(#nmG)"
          />
          {/* Tree silhouettes */}
          <path
            d="M100,280 l5,-20 l5,20 M140,278 l6,-25 l6,25 M180,276 l5,-22 l5,22 M320,260 l6,-28 l6,28 M380,256 l7,-30 l7,30 M520,238 l6,-26 l6,26 M720,228 l6,-28 l6,28 M920,238 l6,-26 l6,26 M1120,258 l6,-28 l6,28 M1320,268 l6,-26 l6,26 M1520,278 l5,-22 l5,22 M1720,288 l5,-20 l5,20"
            fill="#0d1f2d"
          />
        </svg>
      </div>

      {/* ───── LAKE / WATER ───── */}
      <div
        ref={lakeRef}
        className="will-change-transform"
        style={{
          position: "absolute",
          bottom: 0,
          left: -20,
          right: -20,
          height: "22%",
          background: `linear-gradient(180deg,
                        #0d2137 0%, #0e2540 15%, #102a48 30%,
                        #0c2035 50%, #091a2c 70%, #071522 100%)`,
        }}
      >
        {/* Water shimmer */}
        <div
          className="animate-lake-shimmer"
          style={{
            ...full,
            background: `repeating-linear-gradient(0deg,
                        transparent 0px, rgba(93,173,226,0.04) 1px,
                        transparent 2px, transparent 6px)`,
          }}
        />
        {/* Sun reflection on water */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            width: 300,
            height: "60%",
            background: `linear-gradient(180deg,
                        rgba(255,213,128,0.12) 0%, rgba(255,183,77,0.06) 40%, transparent 100%)`,
            filter: "blur(20px)",
            clipPath: "polygon(30% 0%, 70% 0%, 90% 100%, 10% 100%)",
          }}
        />
        {/* Water surface lines */}
        <div
          className="animate-water-flow"
          style={{
            ...full,
            background: `repeating-linear-gradient(90deg,
                        transparent 0px, rgba(133,193,233,0.03) 1px,
                        transparent 2px, transparent 40px)`,
          }}
        />
      </div>

      {/* ───── ROCK (center midground) ───── */}
      <div
        ref={rockRef}
        className="will-change-transform"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 260,
        }}
      >
        <svg
          viewBox="0 0 600 260"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <defs>
            <linearGradient id="rG" x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#2c3e50" />
              <stop offset="30%" stopColor="#1a2a3a" />
              <stop offset="60%" stopColor="#162430" />
              <stop offset="100%" stopColor="#0e1a24" />
            </linearGradient>
            <linearGradient id="rW" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(93,173,226,0.1)" />
              <stop offset="100%" stopColor="rgba(93,173,226,0)" />
            </linearGradient>
          </defs>
          <path
            d="M60,260 Q30,240 40,200 Q50,160 80,130 Q120,90 170,70 Q220,50 280,40 Q340,35 380,45 Q440,55 490,80 Q530,100 555,140 Q575,180 565,220 Q558,250 540,260 Z"
            fill="url(#rG)"
          />
          <path
            d="M100,220 Q120,170 170,130 Q220,100 280,85 Q340,80 390,90 Q440,105 480,140 Q510,170 520,220"
            fill="url(#rW)"
            opacity={0.5}
          />
          <path
            d="M150,180 Q200,160 260,150 Q320,145 370,155 Q410,165 440,185"
            fill="none"
            stroke="rgba(93,173,226,0.06)"
            strokeWidth={2}
          />
          <path
            d="M120,200 Q180,185 260,175 Q340,170 400,180 Q450,190 480,210"
            fill="none"
            stroke="rgba(93,173,226,0.04)"
            strokeWidth={1.5}
          />
        </svg>
        {/* Subtle water splash at rock base */}
        <div
          className="animate-splash-subtle"
          style={{
            position: "absolute",
            bottom: -10,
            left: "15%",
            right: "15%",
            height: 40,
            background:
              "radial-gradient(ellipse at center, rgba(174,214,241,0.1) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </div>

      {/* ───── VOLUMETRIC LIGHT RAYS ───── */}
      <div
        ref={raysRef}
        className="will-change-transform pointer-events-none"
        style={{ ...full, mixBlendMode: "screen" }}
      >
        <div
          className="animate-ray-pulse"
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            width: 300,
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(255,236,179,0.08) 0%, rgba(255,213,128,0.03) 40%, transparent 80%)",
            transform: "rotate(15deg) translateX(-50%)",
            transformOrigin: "top center",
            filter: "blur(30px)",
          }}
        />
        <div
          className="animate-ray-pulse-delayed"
          style={{
            position: "absolute",
            top: 0,
            left: "22%",
            width: 200,
            height: "90%",
            background:
              "linear-gradient(180deg, rgba(255,243,205,0.06) 0%, rgba(255,213,128,0.02) 50%, transparent 85%)",
            transform: "rotate(20deg) translateX(-50%)",
            transformOrigin: "top center",
            filter: "blur(25px)",
          }}
        />
        <div
          className="animate-ray-pulse"
          style={{
            position: "absolute",
            top: 0,
            left: "5%",
            width: 250,
            height: "85%",
            background:
              "linear-gradient(180deg, rgba(255,248,225,0.05) 0%, rgba(255,223,148,0.02) 45%, transparent 80%)",
            transform: "rotate(8deg) translateX(-50%)",
            transformOrigin: "top center",
            filter: "blur(35px)",
          }}
        />
      </div>

      {/* ───── MIST / FOG ───── */}
      <div
        ref={mistRef}
        className="will-change-transform pointer-events-none"
        style={full}
      >
        <div
          className="animate-mist-drift"
          style={{
            position: "absolute",
            bottom: "12%",
            left: 0,
            right: 0,
            height: "20%",
            background: `linear-gradient(90deg,
                        transparent 0%, rgba(174,214,241,0.06) 20%,
                        rgba(214,234,248,0.08) 40%, rgba(174,214,241,0.05) 60%, transparent 80%)`,
            filter: "blur(40px)",
          }}
        />
        <div
          className="animate-mist-drift-reverse"
          style={{
            position: "absolute",
            bottom: "25%",
            left: "-10%",
            right: "-10%",
            height: "15%",
            background: `linear-gradient(90deg,
                        transparent 0%, rgba(214,234,248,0.04) 30%,
                        rgba(174,214,241,0.06) 50%, rgba(214,234,248,0.03) 70%, transparent 100%)`,
            filter: "blur(50px)",
          }}
        />
        <div
          className="animate-mist-float"
          style={{
            position: "absolute",
            bottom: "30%",
            left: "5%",
            width: "40%",
            height: "10%",
            background:
              "radial-gradient(ellipse, rgba(214,234,248,0.07) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div
          className="animate-mist-float-delayed"
          style={{
            position: "absolute",
            bottom: "35%",
            right: "5%",
            width: "35%",
            height: "8%",
            background:
              "radial-gradient(ellipse, rgba(174,214,241,0.05) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />
      </div>

      {/* ───── FLOATING MIST PARTICLES ───── */}
      <div className="pointer-events-none" style={full}>
        {Array.from({ length: 20 }).map((_, i) => {
          const size = 2 + ((i * 7) % 5);
          const leftPos = (i * 37 + 13) % 100;
          const topPos = 30 + ((i * 23) % 50);
          const opacity = 0.15 + ((i * 11) % 25) / 100;
          const blur = 1 + (i % 3);
          const delay = (i * 1.3) % 15;
          const duration = 12 + ((i * 3) % 18);
          return (
            <div
              key={i}
              className="animate-mist-particle"
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                left: `${leftPos}%`,
                top: `${topPos}%`,
                background: `rgba(214, 234, 248, ${opacity})`,
                filter: `blur(${blur}px)`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>

      {/* ───── FOREGROUND LEAVES (top-left) ───── */}
      <div
        ref={leavesFrontLeftRef}
        className="will-change-transform pointer-events-none"
        style={{
          position: "absolute",
          top: -30,
          left: -40,
          width: 400,
          height: 350,
          filter: "blur(2px)",
          zIndex: 20,
        }}
      >
        <svg viewBox="0 0 400 350" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="l1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1a4d2e" />
              <stop offset="100%" stopColor="#0d2818" />
            </linearGradient>
            <linearGradient id="l2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2d6a4f" />
              <stop offset="100%" stopColor="#1a4d2e" />
            </linearGradient>
            <linearGradient id="l3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#245e3a" />
              <stop offset="100%" stopColor="#143d24" />
            </linearGradient>
          </defs>
          <path
            d="M-20,0 Q60,40 100,120 Q130,180 120,250 Q100,200 60,140 Q30,100 -10,60 Z"
            fill="url(#l1)"
            opacity={0.9}
          />
          <path
            d="M50,-10 Q120,30 160,100 Q180,150 170,220 Q155,170 120,110 Q90,70 60,30 Z"
            fill="url(#l2)"
            opacity={0.85}
          />
          <path
            d="M120,-20 Q170,20 200,80 Q220,130 210,180 Q195,140 170,90 Q145,50 125,10 Z"
            fill="url(#l3)"
            opacity={0.75}
          />
          <path
            d="M-30,80 Q40,100 80,160 Q110,210 130,280 Q95,230 60,170 Q30,130 -20,110 Z"
            fill="url(#l1)"
            opacity={0.8}
          />
          <path
            d="M180,-15 Q210,10 230,60 Q240,95 235,140 Q225,100 210,60 Q195,25 182,5 Z"
            fill="url(#l2)"
            opacity={0.6}
          />
        </svg>
      </div>

      {/* ───── FOREGROUND LEAVES (top-right) ───── */}
      <div
        ref={leavesFrontRightRef}
        className="will-change-transform pointer-events-none"
        style={{
          position: "absolute",
          top: -20,
          right: -40,
          width: 350,
          height: 300,
          filter: "blur(2.5px)",
          zIndex: 20,
          transform: "scaleX(-1)",
        }}
      >
        <svg viewBox="0 0 350 300" style={{ width: "100%", height: "100%" }}>
          <path
            d="M-20,0 Q50,35 90,100 Q120,155 110,220 Q95,175 60,120 Q30,80 -10,50 Z"
            fill="#1a4d2e"
            opacity={0.85}
          />
          <path
            d="M40,-10 Q100,25 140,85 Q165,135 155,200 Q140,155 110,100 Q85,60 50,25 Z"
            fill="#2d6a4f"
            opacity={0.75}
          />
          <path
            d="M-25,60 Q35,85 70,140 Q95,185 110,250 Q80,200 55,150 Q25,110 -15,85 Z"
            fill="#143d24"
            opacity={0.8}
          />
        </svg>
      </div>

      {/* ───── FOREGROUND LEAVES (bottom-left) ───── */}
      <div
        ref={leavesBottomRef}
        className="will-change-transform pointer-events-none"
        style={{
          position: "absolute",
          bottom: -20,
          left: -20,
          width: 350,
          height: 200,
          filter: "blur(3px)",
          zIndex: 20,
        }}
      >
        <svg viewBox="0 0 350 200" style={{ width: "100%", height: "100%" }}>
          <path
            d="M-10,200 Q20,150 70,120 Q130,90 180,100 Q140,110 90,130 Q50,155 10,190 Z"
            fill="#1a4d2e"
            opacity={0.7}
          />
          <path
            d="M30,200 Q55,160 100,135 Q150,115 200,120 Q160,130 120,145 Q80,165 45,195 Z"
            fill="#2d6a4f"
            opacity={0.6}
          />
        </svg>
      </div>

      {/* ───── ATMOSPHERIC DEPTH OVERLAY ───── */}
      <div
        className="pointer-events-none"
        style={{
          ...full,
          zIndex: 15,
          background: `radial-gradient(ellipse 80% 60% at 50% 45%,
                    transparent 0%, rgba(10,22,40,0.15) 60%, rgba(10,22,40,0.4) 100%)`,
        }}
      />

      {/* ───── TOP/BOTTOM VIGNETTE ───── */}
      <div
        className="pointer-events-none"
        style={{
          ...full,
          zIndex: 16,
          background: `linear-gradient(180deg,
                    rgba(10,22,40,0.3) 0%, transparent 15%, transparent 75%, rgba(7,15,25,0.5) 100%)`,
        }}
      />
    </div>
  );
}
