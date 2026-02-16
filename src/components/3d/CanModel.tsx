"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Cylinder } from "@react-three/drei";
import { Group, TextureLoader, RepeatWrapping, CanvasTexture } from "three";
import * as THREE from "three";

export default function CanModel(props: any) {
  const group = useRef<Group>(null);

  // Load textures
  const [frontTexture, backTexture, topTexture, bottomTexture] = useLoader(
    TextureLoader,
    [
      "/textures/front.png",
      "/textures/back.png",
      "/textures/top.jpg",
      "/textures/bottom.jpg",
    ],
  );

  // Create combined texture for cylinder wrapping (front + back)
  const combinedTexture = useMemo(() => {
    // Check if textures are loaded
    if (!frontTexture.image || !backTexture.image) {
      console.warn("Textures not fully loaded yet");
      return frontTexture;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return frontTexture;

    // Wait for images to be complete
    if (!frontTexture.image.complete || !backTexture.image.complete) {
      console.warn("Images not complete");
      return frontTexture;
    }

    // Set canvas size - preserve square aspect ratio for each texture
    canvas.width = 2048;
    canvas.height = 2048;

    try {
      // Draw front texture taking more space (60% of canvas width)
      ctx.drawImage(frontTexture.image, 0, 0, 1230, 2048);

      // Draw back texture taking less space (40% of canvas width)
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

  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
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
      {/* Main Body - Using combined front + back texture */}
      <Cylinder args={[1, 1, 4.09, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          map={combinedTexture}
          roughness={0.15}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </Cylinder>

      {/* Top Neck - VERY minimal, barely visible */}
      <Cylinder args={[0.93, 1, 0.12, 32]} position={[0, 2.06, 0]}>
        <meshStandardMaterial
          color="#dadada"
          roughness={0.08}
          metalness={0.95}
          envMapIntensity={2.5}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </Cylinder>

      {/* Top Rim - Ultra thin chrome */}
      <Cylinder args={[0.93, 0.93, 0.04, 32]} position={[0, 2.14, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          roughness={0}
          metalness={1}
          envMapIntensity={3}
          polygonOffset={true}
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </Cylinder>

      {/* Top Cap - Sized to fully cover rim opening */}
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

      {/* Bottom Neck - Positioned very close to body */}
      <Cylinder args={[0.93, 1, 0.12, 32]} position={[0, -2.075, 0]}>
        <meshStandardMaterial
          color="#dadada"
          roughness={0.1}
          metalness={0.93}
          envMapIntensity={2.2}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </Cylinder>

      {/* Bottom Ring - Very close positioning */}
      <Cylinder args={[0.93, 0.93, 0.04, 32]} position={[0, -2.11, 0]}>
        <meshStandardMaterial
          color="#c5c5c5"
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
