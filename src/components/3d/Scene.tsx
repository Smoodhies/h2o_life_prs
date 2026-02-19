"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import CanModel from "./CanModel";
import WaterParticles from "./WaterParticles";
import IceCubes from "./IceCubes";
import { Suspense, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Initial mount delay
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      clearTimeout(timer);
    };
  }, []);

  // Handle 3D model loading complete
  const handle3DLoad = useCallback(() => {
    setTimeout(() => {
      setIs3DReady(true);
      setTimeout(() => setShowPlaceholder(false), 500);
    }, 300);
  }, []);

  const cameraFov = isMobile ? 48 : isTablet ? 46 : 44;
  const cameraPosition: [number, number, number] = isMobile
    ? [0, 0.5, 9.5]
    : isTablet
      ? [0, 0.5, 9]
      : [0, 0.5, 8.5];
  const particleCount = isMobile ? 15 : isTablet ? 25 : 40;

  const placeholderSrc =
    theme === "dark"
      ? "/hero_prd/black_front_can.png"
      : "/hero_prd/white_front_can.png";

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Image
          src={placeholderSrc}
          alt="H2O LIFES Can"
          width={400}
          height={600}
          priority
          style={{
            width: "auto",
            height: "90%",
            maxHeight: "520px",
            objectFit: "contain",
            filter:
              "drop-shadow(0 8px 25px rgba(0, 194, 255, 0.25)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))",
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      {/* PNG Placeholder - shown while 3D loads */}
      {showPlaceholder && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{
            opacity: is3DReady ? 0 : 1,
            transition: "opacity 0.5s ease-out",
          }}
        >
          <Image
            src={placeholderSrc}
            alt="H2O LIFES Can"
            width={400}
            height={600}
            priority
            style={{
              width: "auto",
              height: "90%",
              maxHeight: "520px",
              objectFit: "contain",
              filter:
                "drop-shadow(0 8px 25px rgba(0, 194, 255, 0.25)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))",
            }}
          />
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        camera={{
          position: cameraPosition,
          fov: cameraFov,
          near: 0.1,
          far: 100,
        }}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          sortObjects: true,
        }}
        style={{
          background: "transparent",
          opacity: is3DReady ? 1 : 0,
          transition: "opacity 0.5s ease-in",
        }}
        performance={{ min: 0.5 }}
        onCreated={() => handle3DLoad()}
      >
        <Suspense fallback={null}>
          {/* Natural morning sunlight from top-left */}
          <ambientLight intensity={0.5} color="#e8d5b7" />

          {/* Main sun light - warm, from top-left */}
          <directionalLight
            position={[-5, 10, 6]}
            intensity={2.5}
            color="#fff3e0"
            castShadow
          />

          {/* Cool fill light from right - sky bounce */}
          <directionalLight
            position={[6, 4, 3]}
            intensity={1.0}
            color="#b3d9ff"
          />

          {/* Rim light - from behind for depth */}
          <spotLight
            position={[0, 6, -6]}
            angle={0.4}
            penumbra={1}
            intensity={60}
            color="#aed6f1"
          />

          {/* Subtle aqua accent from below - reflected water */}
          <pointLight
            position={[0, -4, 3]}
            intensity={15}
            color="#4fc3f7"
            distance={12}
            decay={2}
          />

          {/* Can positioned center - theme passed for texture switching */}
          <CanModel position={[0, 0, 0]} theme={theme} />

          {/* Ice cubes revolving around the can */}
          <IceCubes position={[0, 0, 0]} />

          <WaterParticles count={particleCount} />

          <Environment preset="forest" />
          <OrbitControls
            enableZoom={false}
            autoRotate={true}
            autoRotateSpeed={0.6}
            enablePan={false}
            minPolarAngle={Math.PI / 2.8}
            maxPolarAngle={Math.PI / 1.8}
            target={[0, 0, 0]}
            enableDamping={true}
            dampingFactor={0.03}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
