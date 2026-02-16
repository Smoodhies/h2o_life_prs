"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WaterParticles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lightMesh = useRef<THREE.InstancedMesh>(null);

  // Generate random positions and speeds — constrained near the can
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 2 + Math.random() * 6;
      const speed = 0.005 + Math.random() / 400;
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 4;
      temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y, z } = particle;

      // Update time
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      // Update position
      dummy.position.set(
        (particle.mx / 10) * a +
          x +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          y +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          z +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10,
      );

      // Create a gentle floating motion
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#00C2FF"
          transparent
          opacity={0.4}
          roughness={0}
          metalness={1}
        />
      </instancedMesh>
    </>
  );
}
