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

const PHRASE_SPACING = 45; // units between phrase groups in Z — wide
                            // enough that the next phrase doesn't
                            // bleed into the current one

const BRAND_FONT = "/fonts/bricolage-bold.ttf";

// One wall's worth of stacked text lines
function TextLines({
  lines,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
}: {
  lines: string[];
  rotation?: [number, number, number];
  position?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {lines.map((line, idx) => (
        <Text
          key={idx}
          font={BRAND_FONT}
          position={[0, (lines.length / 2 - idx - 0.5) * 4.4, 0]}
          fontSize={4.4}
          color="#F3EFE6"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.055}
          maxWidth={50}
        >
          {line}
        </Text>
      ))}
    </group>
  );
}

// One big phrase positioned in 3D space. Camera flies toward it,
// it scales massively via natural perspective, then camera passes
// through. No walls — just one crisp 3D text plane per phrase.
// (Spatial's main scrolling pages use this, not the cube — that's
// only their intro loader.)
function PhraseGroup({
  lines,
  position,
}: {
  lines: string[];
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <TextLines lines={lines} position={[0, 0, 0]} />
    </group>
  );
}

/**
 * Map raw scroll progress (0..1) to camera-Z so the camera DWELLS
 * at each phrase plane briefly before accelerating to the next.
 *
 * Each phrase gets 1/N of the scroll. Within its slice:
 *   - 60% spent approaching (fast)
 *   - 40% spent passing through the phrase plane (slow — the
 *     "fragments fill the screen" moment)
 */
function easedCameraZ(progress: number, n: number, startZ: number, endZ: number, spacing: number) {
  const slice = 1 / n;
  const idx = Math.min(n - 1, Math.floor(progress / slice));
  const local = (progress - idx * slice) / slice; // 0..1 within this phrase

  const phraseZ = -spacing * (idx + 1);
  const prevZ = idx === 0 ? startZ : -spacing * idx;
  const nextZ = idx === n - 1 ? endZ : -spacing * (idx + 2);

  // Three sub-phases: approach -> close-pass -> recede
  const APPROACH = 0.50;
  const PASS = 0.35;
  // RECEDE = 0.15

  if (local < APPROACH) {
    // Approach: prev pos -> phrase + 2 (just in front)
    const t = local / APPROACH;
    const eased = 1 - Math.pow(1 - t, 2); // ease-out
    return prevZ + (phraseZ + 2 - prevZ) * eased;
  } else if (local < APPROACH + PASS) {
    // Close pass: phrase + 2 -> phrase - 1.5 (camera passes through plane slowly)
    const t = (local - APPROACH) / PASS;
    const eased = t * t * (3 - 2 * t); // smoothstep
    return (phraseZ + 2) + (-3.5) * eased;
  } else {
    // Recede: phrase - 1.5 -> next - 2 (approaching next phrase)
    const t = (local - APPROACH - PASS) / (1 - APPROACH - PASS);
    const eased = t * t; // ease-in
    return (phraseZ - 1.5) + (nextZ + 2 - (phraseZ - 1.5)) * eased;
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
  const targetOffset = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const startZ = 8;
    const endZ = -PHRASE_SPACING * (PHRASES.length + 0.6);
    camera.position.z = easedCameraZ(
      scrollProgress,
      PHRASES.length,
      startZ,
      endZ,
      PHRASE_SPACING
    );

    // Mouse parallax — camera position offset, look forward
    targetOffset.current.x = (mouseX - 0.5) * 1.4;
    targetOffset.current.y = (0.5 - mouseY) * 0.8;
    camera.position.x += (targetOffset.current.x - camera.position.x) * 0.06;
    camera.position.y += (targetOffset.current.y - camera.position.y) * 0.06;

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
          <EffectComposer>
            {/* Cinematic focal plane — text in focus is sharp,
                everything in front/behind softens */}
            <DepthOfField
              focusDistance={0.0}
              focalLength={0.04}
              bokehScale={3}
              height={480}
            />
            {/* Film grain for texture / tooth */}
            <Noise opacity={0.045} premultiply />
            {/* Pulls the eye to centre */}
            <Vignette eskil={false} offset={0.15} darkness={0.65} />
          </EffectComposer>
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
