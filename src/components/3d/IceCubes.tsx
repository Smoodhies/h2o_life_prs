"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Group, TextureLoader, MeshPhysicalMaterial, RepeatWrapping, Vector2, CylinderGeometry } from "three";
import * as THREE from "three";

export default function IceCubes(props: any) {
  const cubeRefs = useRef<(Group | null)[]>([]);

  // Load both base texture and normal map
  const [baseTexture, normalMap] = useLoader(TextureLoader, [
    "/textures/ice_cube.png",
    "/textures/ice/Material_25_normal.png"
  ]);

  // Configure textures
  if (baseTexture) {
    baseTexture.wrapS = RepeatWrapping;
    baseTexture.wrapT = RepeatWrapping;
    baseTexture.repeat.set(1, 1);
  }

  if (normalMap) {
    normalMap.wrapS = RepeatWrapping;
    normalMap.wrapT = RepeatWrapping;
    normalMap.repeat.set(1, 1);
  }

  // Create a stunning, realistic ice material using Physical rendering
  const iceMaterial = useMemo(() => {
    return new MeshPhysicalMaterial({
      map: baseTexture,
      color: "#e8f7ff",
      metalness: 0,
      roughness: 0.1,
      transmission: 0.78, // Balanced for visibility and ice look
      thickness: 1.5,     // Realistic depth
      ior: 1.31,           // Index of Refraction for real ice
      opacity: 1,
      transparent: true,
      envMapIntensity: 2.4,
      normalMap: normalMap,
      normalScale: new Vector2(1.5, 1.5),
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      side: THREE.DoubleSide,
      depthWrite: false, // Critical for transparent objects
      depthTest: true,
      alphaToCoverage: true, // Better transparency rendering
    });
  }, [baseTexture, normalMap]);

  // Create hexagonal ice cube geometry (6-sided cylinder)
  const iceGeometry = useMemo(() => {
    const geometry = new CylinderGeometry(
      1,      // radiusTop
      1,      // radiusBottom
      1.2,    // height - slightly taller for ice cube look
      6,      // radialSegments - 6 sides for hexagon
      1,      // heightSegments
      false   // openEnded
    );
    geometry.computeVertexNormals(); // Ensure proper normals for lighting
    return geometry;
  }, []);

  // Configuration for 6 revolving ice cubes
  const cubesData = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      orbitRadius: 2.4 + Math.random() * 0.8,
      orbitSpeed: 0.2 + Math.random() * 0.15,
      orbitOffset: (i / 6) * Math.PI * 2,
      yOffset: (Math.random() - 0.5) * 3.5,
      rotationSpeed: [
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
      ],
      scale: 0.22 + Math.random() * 0.14,
      floatSpeed: 0.5 + Math.random() * 0.5,
      floatAmplitude: 0.15 + Math.random() * 0.2,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    cubeRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const data = cubesData[i];

      // Calculate orbital position (Revolving around the can)
      const angle = time * data.orbitSpeed + data.orbitOffset;
      ref.position.x = Math.cos(angle) * data.orbitRadius;
      ref.position.z = Math.sin(angle) * data.orbitRadius;

      // Smooth vertical floating
      ref.position.y = data.yOffset + Math.sin(time * data.floatSpeed + data.orbitOffset) * data.floatAmplitude;

      // Constant chaotic rotation for realism
      ref.rotation.x += data.rotationSpeed[0];
      ref.rotation.y += data.rotationSpeed[1];
      ref.rotation.z += data.rotationSpeed[2];
    });
  });

  return (
    <group {...props}>
      {cubesData.map((data, i) => (
        <group key={i} ref={(el) => { cubeRefs.current[i] = el; }}>
          <mesh
            geometry={iceGeometry}
            material={iceMaterial}
            scale={data.scale}
            castShadow
            receiveShadow
            renderOrder={1}
            frustumCulled={false}
          />
        </group>
      ))}
    </group>
  );
}
