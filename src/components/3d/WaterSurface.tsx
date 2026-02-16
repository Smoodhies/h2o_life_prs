'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';

export default function WaterSurface() {
    const waterRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (waterRef.current) {
            // Subtle ripple effect using shader-like displacement
            const time = state.clock.elapsedTime;
            // Animate the material opacity for subtle shimmer
            (waterRef.current.material as THREE.MeshPhysicalMaterial).opacity =
                0.3 + Math.sin(time * 0.5) * 0.05;
        }
    });

    return (
        <Plane
            ref={waterRef}
            args={[20, 20, 32, 32]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -2.5, 0]}
        >
            <meshPhysicalMaterial
                color="#00a8cc"
                transparent
                opacity={0.3}
                roughness={0.1}
                metalness={0.2}
                transmission={0.6}
                thickness={0.3}
                envMapIntensity={1.2}
                clearcoat={0.5}
                clearcoatRoughness={0.1}
            />
        </Plane>
    );
}
