"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import type { Mesh } from "three";

interface HeroSceneProps {
  /** External 0..1 signal (e.g. scroll progress). Controls scale + distortion. */
  externalProgress?: number;
  /** Base scale for the blob (multiplied by 1 + externalProgress * factor) */
  baseScale?: number;
  scaleFactor?: number;
  /** Whether the blob should also lean toward the cursor */
  cursorReactive?: boolean;
}

function ChromeBlob({
  externalProgress,
  baseScale,
  scaleFactor,
  cursorReactive,
}: Required<HeroSceneProps>) {
  const meshRef = useRef<Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  // We mutate material.distort directly — the type isn't exported by drei.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  // Smoothed external progress so any jumps get eased away rather than
  // causing visible "jumps" in scale.
  const smoothedProgress = useRef(0);

  useEffect(() => {
    if (!cursorReactive) return;
    if (typeof window === "undefined") return;
    function onMove(e: PointerEvent) {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [cursorReactive]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Autonomous slow rotation
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.rotation.x += delta * 0.07;

    if (cursorReactive) {
      meshRef.current.rotation.y += pointer.current.x * delta * 0.4;
      meshRef.current.rotation.x += pointer.current.y * delta * 0.3;
    }

    // Ease smoothed progress toward target
    smoothedProgress.current +=
      (externalProgress - smoothedProgress.current) * 0.10;

    // Apply scale via mesh (smooth, GPU-friendly)
    const targetScale = baseScale * (1 + smoothedProgress.current * scaleFactor);
    meshRef.current.scale.setScalar(
      meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.15
    );

    // Adjust distortion target — bigger when "in view" / progress mid-section
    if (materialRef.current && typeof materialRef.current.distort === "number") {
      const wantDistort = 0.32 + smoothedProgress.current * 0.22;
      const cur = materialRef.current.distort;
      materialRef.current.distort = cur + (wantDistort - cur) * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} scale={baseScale}>
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

export default function HeroScene({
  externalProgress = 0,
  baseScale = 2.4,
  scaleFactor = 0,
  cursorReactive = true,
}: HeroSceneProps) {
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
        <ChromeBlob
          externalProgress={externalProgress}
          baseScale={baseScale}
          scaleFactor={scaleFactor}
          cursorReactive={cursorReactive}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
