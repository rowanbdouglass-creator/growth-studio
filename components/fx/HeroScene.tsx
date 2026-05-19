"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

/**
 * Slowly rotating chrome blob with subtle organic distortion.
 * Sits as a decorative background behind the hero on lg+ screens.
 * Dynamically imported via HeroSceneLazy so the Three.js bundle
 * doesn't block initial paint.
 */
function ChromeBlob() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x += delta * 0.07;
  });

  return (
    <mesh ref={ref} scale={2.2}>
      <icosahedronGeometry args={[1, 32]} />
      <MeshDistortMaterial
        color="#9aa3b2"
        metalness={1}
        roughness={0.15}
        distort={0.38}
        speed={1.2}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <ChromeBlob />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
