"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import CanModel from "./CanModel";
import WaterParticles from "./WaterParticles";
import IceCubes from "./IceCubes";
import { Suspense, useState, useEffect } from "react";

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      clearTimeout(timer);
    };
  }, []);

  const cameraFov = isMobile ? 48 : isTablet ? 46 : 44;
  const cameraPosition: [number, number, number] = isMobile
    ? [0, 0.5, 9.5]
    : isTablet
      ? [0, 0.5, 9]
      : [0, 0.5, 8.5];
  const particleCount = isMobile ? 15 : isTablet ? 25 : 40;

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-white/30 text-sm">Loading 3D...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
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
        style={{ background: "transparent" }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Natural morning sunlight from top-left */}
          <ambientLight intensity={0.5} color="#e8d5b7" />

          {/* Main sun light — warm, from top-left */}
          <directionalLight
            position={[-5, 10, 6]}
            intensity={2.5}
            color="#fff3e0"
            castShadow
          />

          {/* Cool fill light from right — sky bounce */}
          <directionalLight
            position={[6, 4, 3]}
            intensity={1.0}
            color="#b3d9ff"
          />

          {/* Rim light — from behind for depth */}
          <spotLight
            position={[0, 6, -6]}
            angle={0.4}
            penumbra={1}
            intensity={60}
            color="#aed6f1"
          />

          {/* Subtle aqua accent from below — reflected water */}
          <pointLight
            position={[0, -4, 3]}
            intensity={15}
            color="#4fc3f7"
            distance={12}
            decay={2}
          />

          {/* Can positioned center */}
          <CanModel position={[0, 0, 0]} />

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
