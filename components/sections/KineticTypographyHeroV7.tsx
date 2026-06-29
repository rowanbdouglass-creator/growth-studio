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

/**
 * KineticTypographyHeroV7 — text-cube technique.
 *
 * Each phrase is a 3D BoxGeometry (the "cube") with:
 *   - All 6 faces rendered as a dark solid material (lit by scene)
 *   - Flat 2D <Text> positioned just in front of the FRONT face
 *
 * The cube provides the 3D structure. The text is purely 2D, painted
 * onto the front face only. Camera flies past at an off-axis angle
 * (positive X) so the side and top faces of the cubes are visible as
 * dark blocks — exactly the "letters with visible 3D sides" effect
 * from the Spatial reference, which was never extruded letters but
 * always flat text on cubes.
 *
 * Stack 4 cubes at different Z depths, camera dollies through.
 */

const BRAND_FONT = "/fonts/bricolage-bold.ttf";

const PHRASES: string[][] = [
  ["Bespoke software", "for ambitious", "UK businesses."],
  ["Custom websites", "that pass the", "credibility check."],
  ["Paid traffic", "run by the", "operators themselves."],
  ["Direct line.", "Two operators.", "No managers."],
];

const CUBE_W = 14;
const CUBE_H = 7;
const CUBE_D = 5;
const CUBE_STRIDE = 24;

function TextCube({
  lines,
  position,
}: {
  lines: string[];
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* The cube — all 6 faces solid dark, lit by scene lights */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[CUBE_W, CUBE_H, CUBE_D]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.78}
          metalness={0.06}
        />
      </mesh>

      {/* Text sits just barely in front of the front face */}
      <group position={[0, 0, CUBE_D / 2 + 0.02]}>
        {lines.map((line, i) => (
          <Text
            key={i}
            font={BRAND_FONT}
            position={[0, (lines.length / 2 - i - 0.5) * 1.5, 0]}
            fontSize={1.3}
            color="#F3EFE6"
            anchorX="center"
            anchorY="middle"
            letterSpacing={-0.05}
            maxWidth={CUBE_W - 1}
          >
            {line}
          </Text>
        ))}
      </group>
    </group>
  );
}

/**
 * Camera Z mapping with dwell phase per cube — slow pass through
 * each so the side faces have time to read.
 */
function easedCameraZ(
  progress: number,
  n: number,
  startZ: number,
  endZ: number,
  spacing: number
) {
  const slice = 1 / n;
  const idx = Math.min(n - 1, Math.floor(progress / slice));
  const local = (progress - idx * slice) / slice;

  const phraseZ = -spacing * (idx + 1);
  const prevZ = idx === 0 ? startZ : -spacing * idx;
  const nextZ = idx === n - 1 ? endZ : -spacing * (idx + 2);

  const APPROACH = 0.45;
  const DWELL = 0.4;

  if (local < APPROACH) {
    const t = local / APPROACH;
    const eased = 1 - Math.pow(1 - t, 2);
    return prevZ + (phraseZ + 7 - prevZ) * eased;
  } else if (local < APPROACH + DWELL) {
    const t = (local - APPROACH) / DWELL;
    const eased = t * t * (3 - 2 * t);
    return phraseZ + 7 + -12 * eased;
  } else {
    const t = (local - APPROACH - DWELL) / (1 - APPROACH - DWELL);
    const eased = t * t;
    return phraseZ - 5 + (nextZ + 7 - (phraseZ - 5)) * eased;
  }
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
  const targetOffset = useRef({ x: 3, y: 0 });

  useFrame(() => {
    const startZ = 10;
    const endZ = -CUBE_STRIDE * (PHRASES.length + 0.8);
    camera.position.z = easedCameraZ(
      scrollProgress,
      PHRASES.length,
      startZ,
      endZ,
      CUBE_STRIDE
    );

    // Off-axis base position (X=3.5) so we see the cube side faces.
    // Mouse parallax adds more — peeking around.
    const baseX = 3.5;
    targetOffset.current.x = baseX + (mouseX - 0.5) * 4;
    targetOffset.current.y = (0.5 - mouseY) * 2.5;
    camera.position.x += (targetOffset.current.x - camera.position.x) * 0.06;
    camera.position.y += (targetOffset.current.y - camera.position.y) * 0.06;

    camera.lookAt(0, 0, camera.position.z - 5);
  });

  return (
    <>
      {/* Lighting — directional key gives cube faces strong contrast,
          ambient is very low so blacks stay deep */}
      <ambientLight intensity={0.16} />
      <directionalLight position={[10, 8, 6]} intensity={1.4} castShadow />
      <directionalLight position={[-5, -4, 3]} intensity={0.28} />

      {PHRASES.map((lines, i) => (
        <TextCube
          key={i}
          lines={lines}
          position={[0, 0, -CUBE_STRIDE * (i + 1)]}
        />
      ))}
    </>
  );
}

export function KineticTypographyHeroV7() {
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
          camera={{ position: [3.5, 0, 10], fov: 60, near: 0.1, far: 250 }}
          shadows
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
