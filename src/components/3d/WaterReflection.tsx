"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, ShaderMaterial, DoubleSide } from "three";
import * as THREE from "three";

interface WaterReflectionProps {
  canPosition?: [number, number, number];
}

export default function WaterReflection({
  canPosition = [0, 0, 0],
}: WaterReflectionProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  // Custom shader for water reflection effect
  const shaderArgs = useMemo(() => {
    return {
      uniforms: {
        uTime: { value: 0 },
        uCanPosition: { value: new THREE.Vector3(...canPosition) },
        uOpacity: { value: 0.25 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uCanPosition;
        uniform float uOpacity;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Center UV coordinates
          vec2 centeredUV = vUv - 0.5;
          
          // Calculate distance from can position
          vec2 canUV = vec2(uCanPosition.x / 6.0, uCanPosition.z / 6.0);
          float distanceFromCan = length(centeredUV - canUV);
          
          // Animated ripple distortion
          float ripple = sin(distanceFromCan * 15.0 - uTime * 2.0) * 0.5 + 0.5;
          ripple *= exp(-distanceFromCan * 3.0); // Fade ripples outward
          
          // UV distortion for blur simulation
          vec2 distortedUV = centeredUV + vec2(
            sin(centeredUV.y * 20.0 + uTime) * 0.01,
            cos(centeredUV.x * 20.0 + uTime) * 0.01
          );
          
          // Opacity gradient: stronger near can, fading outward
          float fadeOut = 1.0 - smoothstep(0.0, 0.6, distanceFromCan);
          float finalOpacity = uOpacity * fadeOut * (0.85 + ripple * 0.15);
          
          // Water reflection color with subtle cyan tint
          vec3 waterColor = vec3(0.6, 0.85, 0.95); // Light blue-white
          vec3 reflectionColor = waterColor * (0.7 + ripple * 0.3);
          
          gl_FragColor = vec4(reflectionColor, finalOpacity);
        }
      `,
      transparent: true,
      side: DoubleSide,
      depthWrite: false,
    };
  }, [canPosition]);

  // Animate shader uniforms
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, -2.8, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[12, 12, 64, 64]} />
      <shaderMaterial ref={materialRef} attach="material" {...shaderArgs} />
    </mesh>
  );
}
