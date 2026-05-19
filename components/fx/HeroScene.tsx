"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import type { Mesh } from "three";

/**
 * Slowly rotating chrome blob. Now interactive: cursor position
 * influences both rotation drift and distortion intensity, so
 * moving your mouse over the hero has a felt-but-subtle effect.
 */
function ChromeBlob() {
  const meshRef = useRef<Mesh>(null);
  // Pointer expressed in normalised viewport coords (-1..1)
  const pointer = useRef({ x: 0, y: 0 });
  const distortTarget = useRef(0.38);
  // We mutate the material's `distort` uniform directly — typed loosely
  // because drei's DistortMaterialImpl type isn't exported.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onMove(e: PointerEvent) {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
      const dist = Math.hypot(pointer.current.x, pointer.current.y);
      distortTarget.current = 0.32 + Math.min(dist, 1) * 0.18;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.rotation.x += delta * 0.07;
    meshRef.current.rotation.y += pointer.current.x * delta * 0.4;
    meshRef.current.rotation.x += pointer.current.y * delta * 0.3;

    if (materialRef.current && typeof materialRef.current.distort === "number") {
      const cur = materialRef.current.distort;
      materialRef.current.distort = cur + (distortTarget.current - cur) * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.4}>
      <icosahedronGeometry args={[1, 32]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#9aa3b2"
        metalness={1}
        roughness={0.12}
        distort={0.38}
        speed={1.4}
        envMapIntensity={1.2}
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
