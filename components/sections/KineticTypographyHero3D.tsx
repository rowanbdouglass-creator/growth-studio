"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * KineticTypographyHero3D — actual 3D with Three.js / R3F.
 *
 * Replaces the CSS-3D approximation. Text is rendered as real 3D
 * meshes via troika-three-text (SDF — stays crisp at any scale).
 * Camera dolly is driven by scroll.
 *
 * This is the technique Spatial Festival uses (their bundle
 * contains THREE.*, WebGLRenderer, PerspectiveCamera, BufferGeometry,
 * shaders, etc). Pure CSS could not reach the same crispness +
 * depth — bitmap scaling will always blur transform: scale(big).
 *
 * Scene composition:
 *  - 4 phrase groups positioned at Z = 0, -25, -50, -75 (deep into
 *    the scene). Each phrase has 3 lines stacked vertically.
 *  - Camera starts at Z = 10, looking forward.
 *  - On scroll, camera Z animates from 10 -> -90, dollying forward
 *    through all four phrase groups.
 *  - Mouse moves camera rotation slightly for "look around" parallax.
 */

const PHRASES: string[][] = [
  ["Bespoke software", "for ambitious", "UK businesses."],
  ["Custom websites", "that pass the", "credibility check."],
  ["Paid traffic", "run by the", "operators themselves."],
  ["Direct line.", "Two operators.", "No managers."],
];

const PHRASE_SPACING = 25; // units between phrase groups in Z

const BRAND_FONT = "/fonts/bricolage-bold.ttf";

function PhraseGroup({
  lines,
  position,
}: {
  lines: string[];
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {lines.map((line, idx) => (
        <Text
          key={idx}
          font={BRAND_FONT}
          position={[0, (lines.length / 2 - idx - 0.5) * 2.4, 0]}
          fontSize={2.4}
          color="#F3EFE6"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.055}
          maxWidth={26}
        >
          {line}
        </Text>
      ))}
    </group>
  );
}

function Scene({
  scrollProgress,
  mouseX,
  mouseY,
}: {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}) {
  const { camera } = useThree();
  const targetOffset = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Camera dollies forward through all phrase groups + a bit past the last
    const totalDistance =
      PHRASES.length * PHRASE_SPACING + PHRASE_SPACING * 0.8;
    const startZ = 8;
    const endZ = startZ - totalDistance;
    camera.position.z = startZ + (endZ - startZ) * scrollProgress;

    // Mouse parallax: small camera POSITION offset (not rotation),
    // keeps the camera looking forward but shifts viewpoint
    targetOffset.current.x = (mouseX - 0.5) * 1.4;
    targetOffset.current.y = (0.5 - mouseY) * 0.8;
    camera.position.x += (targetOffset.current.x - camera.position.x) * 0.06;
    camera.position.y += (targetOffset.current.y - camera.position.y) * 0.06;

    // Always look at the centre point ahead of the camera
    camera.lookAt(0, 0, camera.position.z - 5);
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      {PHRASES.map((lines, i) => (
        <PhraseGroup
          key={i}
          lines={lines}
          position={[0, 0, -PHRASE_SPACING * (i + 1)]}
        />
      ))}
    </>
  );
}

export function KineticTypographyHero3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScrollProgress(1);
      setShowFinal(true);
      return;
    }

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / totalScrollable);
      setScrollProgress(progress);
      setShowFinal(progress > 0.92);
    };

    const onMouse = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth);
      setMouseY(e.clientY / window.innerHeight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "500vh",
        background: "#0E0D0B",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 65, near: 0.1, far: 200 }}
          style={{ width: "100%", height: "100%", background: "#0E0D0B" }}
          dpr={[1, 2]}
        >
          <Scene
            scrollProgress={scrollProgress}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </Canvas>

        {/* Final hero — overlays once scroll is nearly complete */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 clamp(24px, 4vw, 72px)",
            gap: 28,
            pointerEvents: showFinal ? "auto" : "none",
            opacity: showFinal ? 1 : 0,
            transition: "opacity 0.4s ease-out",
            background: showFinal ? "#0E0D0B" : "transparent",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 600,
              fontSize: "clamp(2.4rem, 5vw, 5.4rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "var(--color-paper)",
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Bespoke{" "}
            <span style={{ color: "var(--color-red)" }}>software.</span> Custom{" "}
            <span style={{ color: "var(--color-red)" }}>websites.</span> Paid{" "}
            <span style={{ color: "var(--color-red)" }}>traffic.</span>
          </h2>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 28px",
              background: "var(--color-red)",
              color: "var(--color-night)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Book a slot <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
