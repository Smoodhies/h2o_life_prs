"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Cylinder } from "@react-three/drei";
import { Group, TextureLoader, RepeatWrapping, CanvasTexture } from "three";
import * as THREE from "three";

interface CanModelProps {
  position?: [number, number, number];
  theme?: "light" | "dark";
  [key: string]: any;
}

export default function CanModel({ theme = "dark", ...props }: CanModelProps) {
  const group = useRef<Group>(null);
  const [spinProgress, setSpinProgress] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const prevTheme = useRef(theme);

  // Load light textures
  const [lightFront, lightBack, topTexture, bottomTexture] = useLoader(
    TextureLoader,
    [
      "/textures/front.png",
      "/textures/back.png",
      "/textures/top.jpg",
      "/textures/bottom.jpg",
    ],
  );

  // Load dark textures
  const [darkFront, darkBack] = useLoader(
    TextureLoader,
    ["/img/dark_can/dark_front.png", "/img/dark_can/dark_back.png"],
  );

  // Trigger spin on theme change
  useEffect(() => {
    if (prevTheme.current !== theme) {
      prevTheme.current = theme;
      setIsSpinning(true);
      setSpinProgress(0);
    }
  }, [theme]);

  // Select textures based on theme
  const frontTexture = theme === "dark" ? darkFront : lightFront;
  const backTexture = theme === "dark" ? darkBack : lightBack;

  // Neck/rim colors based on theme
  const neckColor = theme === "dark" ? "#2a2a2a" : "#dadada";
  const rimColor = theme === "dark" ? "#1a1a1a" : "#ffffff";
  const bottomRingColor = theme === "dark" ? "#222222" : "#c5c5c5";

  // Create combined texture for cylinder wrapping (front + back)
  const combinedTexture = useMemo(() => {
    if (!frontTexture.image || !backTexture.image) {
      return frontTexture;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return frontTexture;

    if (!frontTexture.image.complete || !backTexture.image.complete) {
      return frontTexture;
    }

    canvas.width = 2048;
    canvas.height = 2048;

    try {
      ctx.drawImage(frontTexture.image, 0, 0, 1230, 2048);
      ctx.drawImage(backTexture.image, 1230, 0, 818, 2048);
    } catch (error) {
      console.error("Error drawing textures:", error);
      return frontTexture;
    }

    const texture = new CanvasTexture(canvas);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.needsUpdate = true;

    return texture;
  }, [frontTexture, backTexture]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Gentle floating animation
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.12;

    // Smooth 360deg Y-axis spin on theme change (front to back rotation)
    if (isSpinning) {
      const duration = 1.2; // seconds for full rotation
      const newProgress = spinProgress + delta / duration;

      if (newProgress >= 1) {
        setIsSpinning(false);
        setSpinProgress(0);
        group.current.rotation.y = -0.3; // reset to default Y rotation
      } else {
        setSpinProgress(newProgress);
        // Cubic ease-in-out for buttery smooth feel
        const t = newProgress;
        const eased =
          t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        group.current.rotation.y = -0.3 + eased * Math.PI * 2;
      }
    }
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={1.1}
      rotation={[0, -0.3, 0]}
    >
      {/* Main Body */}
      <Cylinder args={[1, 1, 4.09, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          map={combinedTexture}
          roughness={0.15}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </Cylinder>

      {/* Top Neck */}
      <Cylinder args={[0.93, 1, 0.12, 32]} position={[0, 2.06, 0]}>
        <meshStandardMaterial
          color={neckColor}
          roughness={0.08}
          metalness={0.95}
          envMapIntensity={2.5}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </Cylinder>

      {/* Top Rim */}
      <Cylinder args={[0.93, 0.93, 0.04, 32]} position={[0, 2.14, 0]}>
        <meshStandardMaterial
          color={rimColor}
          roughness={0}
          metalness={1}
          envMapIntensity={3}
          polygonOffset={true}
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </Cylinder>

      {/* Top Cap */}
      <mesh position={[0, 2.165, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.96, 32]} />
        <meshStandardMaterial
          map={topTexture}
          roughness={0.03}
          metalness={1}
          envMapIntensity={2.5}
          polygonOffset={true}
          polygonOffsetFactor={-3}
          polygonOffsetUnits={-3}
        />
      </mesh>

      {/* Bottom Neck */}
      <Cylinder args={[0.93, 1, 0.12, 32]} position={[0, -2.075, 0]}>
        <meshStandardMaterial
          color={neckColor}
          roughness={0.1}
          metalness={0.93}
          envMapIntensity={2.2}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </Cylinder>

      {/* Bottom Ring */}
      <Cylinder args={[0.93, 0.93, 0.04, 32]} position={[0, -2.11, 0]}>
        <meshStandardMaterial
          color={bottomRingColor}
          roughness={0.08}
          metalness={0.95}
          envMapIntensity={2}
          polygonOffset={true}
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </Cylinder>

      {/* Bottom Cap */}
      <mesh position={[0, -2.135, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.91, 32]} />
        <meshStandardMaterial
          map={bottomTexture}
          roughness={0.05}
          metalness={1}
          envMapIntensity={2}
          polygonOffset={true}
          polygonOffsetFactor={-3}
          polygonOffsetUnits={-3}
        />
      </mesh>
    </group>
  );
}
