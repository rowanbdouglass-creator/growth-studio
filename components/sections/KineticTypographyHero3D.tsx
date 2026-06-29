"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * KineticTypographyHero3D — flat 2D text inside 3D BOX rooms.
 *
 * Each phrase is a literal ROOM built from BoxGeometry walls
 * (with thickness), and the text is rendered flat on the inner
 * surfaces. Camera flies through the rooms in sequence.
 *
 * The walls have real thickness — the visible edges/corners of
 * the boxes are what the user identified as "blocks" in the
 * Spatial reference. The text itself stays 2D (no extrusion);
 * it's just painted flat on the inner wall surfaces.
 *
 * Room dimensions are wider/taller than they are deep so when
 * the camera passes through, you see text on left/right/top/
 * bottom walls clearly, not just the front.
 */

const BRAND_FONT = "/fonts/bricolage-bold.ttf";

const PHRASES: string[][] = [
  ["Bespoke software", "for ambitious", "UK businesses."],
  ["Custom websites", "that pass the", "credibility check."],
  ["Paid traffic", "run by the", "operators themselves."],
  ["Direct line.", "Two operators.", "No managers."],
];

const ROOM_W = 22; // room width (X)
const ROOM_H = 14; // room height (Y)
const ROOM_D = 18; // room depth (Z)
const WALL_T = 0.4; // wall thickness

const ROOM_STRIDE = 28; // distance between room centres in Z

// One wall — a box geometry with text painted on its inner face
function Wall({
  size,
  position,
  textRotation = [0, 0, 0],
  textPosition,
  lines,
}: {
  size: [number, number, number];
  position: [number, number, number];
  textRotation?: [number, number, number];
  textPosition: [number, number, number];
  lines: string[];
}) {
  return (
    <group>
      <mesh position={position}>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#0E0D0B" roughness={0.85} />
      </mesh>
      <group position={textPosition} rotation={textRotation}>
        {lines.map((line, idx) => (
          <Text
            key={idx}
            font={BRAND_FONT}
            position={[0, (lines.length / 2 - idx - 0.5) * 1.6, 0]}
            fontSize={1.5}
            color="#F3EFE6"
            anchorX="center"
            anchorY="middle"
            letterSpacing={-0.04}
            maxWidth={ROOM_W * 0.85}
          >
            {line}
          </Text>
        ))}
      </group>
    </group>
  );
}

function PhraseRoom({
  lines,
  position,
}: {
  lines: string[];
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Floor — box across full width × depth, thin in Y */}
      <Wall
        size={[ROOM_W, WALL_T, ROOM_D]}
        position={[0, -ROOM_H / 2, 0]}
        textRotation={[-Math.PI / 2, 0, 0]}
        textPosition={[0, -ROOM_H / 2 + WALL_T / 2 + 0.01, 0]}
        lines={lines}
      />
      {/* Ceiling */}
      <Wall
        size={[ROOM_W, WALL_T, ROOM_D]}
        position={[0, ROOM_H / 2, 0]}
        textRotation={[Math.PI / 2, 0, 0]}
        textPosition={[0, ROOM_H / 2 - WALL_T / 2 - 0.01, 0]}
        lines={lines}
      />
      {/* Left wall */}
      <Wall
        size={[WALL_T, ROOM_H, ROOM_D]}
        position={[-ROOM_W / 2, 0, 0]}
        textRotation={[0, Math.PI / 2, 0]}
        textPosition={[-ROOM_W / 2 + WALL_T / 2 + 0.01, 0, 0]}
        lines={lines}
      />
      {/* Right wall */}
      <Wall
        size={[WALL_T, ROOM_H, ROOM_D]}
        position={[ROOM_W / 2, 0, 0]}
        textRotation={[0, -Math.PI / 2, 0]}
        textPosition={[ROOM_W / 2 - WALL_T / 2 - 0.01, 0, 0]}
        lines={lines}
      />
      {/* Back wall — text faces incoming camera */}
      <Wall
        size={[ROOM_W, ROOM_H, WALL_T]}
        position={[0, 0, -ROOM_D / 2]}
        textRotation={[0, 0, 0]}
        textPosition={[0, 0, -ROOM_D / 2 + WALL_T / 2 + 0.01]}
        lines={lines}
      />
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
    // Camera path: starts in front of first room, flies all the way through
    const totalDistance = ROOM_STRIDE * PHRASES.length + ROOM_STRIDE;
    const startZ = 10;
    const endZ = startZ - totalDistance;
    camera.position.z = startZ + (endZ - startZ) * scrollProgress;

    // Mouse parallax — small position offset (kept inside the room)
    targetOffset.current.x = (mouseX - 0.5) * 4;
    targetOffset.current.y = (0.5 - mouseY) * 2.5;
    camera.position.x += (targetOffset.current.x - camera.position.x) * 0.06;
    camera.position.y += (targetOffset.current.y - camera.position.y) * 0.06;

    camera.lookAt(0, 0, camera.position.z - 5);
  });

  return (
    <>
      {/* Lighting so the wall surfaces (and text on them) are visible */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} />
      {/* Point light that travels with the camera so the current room
          is always lit from inside */}
      <pointLight position={[0, 0, 0]} intensity={1.0} distance={30} />

      {PHRASES.map((lines, i) => (
        <PhraseRoom
          key={i}
          lines={lines}
          position={[0, 0, -ROOM_STRIDE * (i + 1)]}
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
          camera={{ position: [0, 0, 10], fov: 70, near: 0.1, far: 250 }}
          style={{ width: "100%", height: "100%", background: "#0E0D0B" }}
          dpr={[1, 2]}
        >
          <Scene
            scrollProgress={scrollProgress}
            mouseX={mouseX}
            mouseY={mouseY}
          />
          <EffectComposer>
            <DepthOfField
              focusDistance={0.0}
              focalLength={0.05}
              bokehScale={2.5}
              height={480}
            />
            <Noise opacity={0.04} premultiply />
            <Vignette eskil={false} offset={0.18} darkness={0.55} />
          </EffectComposer>
        </Canvas>

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
