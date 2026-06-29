"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * KineticTypographyHero3D — REAL extruded 3D letters.
 *
 * Letters are now actual 3D meshes with depth (height prop on
 * Text3D). When the camera passes close to a phrase, you see the
 * SIDE FACES of the letters — the black blocks the user pointed
 * out in the Spatial reference are the visible extrusion sides.
 *
 * Previous version used <Text> (troika SDF) — that's 2D text on a
 * plane, no real depth. Switched to <Text3D> + TextGeometry which
 * produces actual extruded meshes.
 *
 * Lighting added because MeshStandardMaterial needs lights to
 * render (would be black otherwise). Two directional lights +
 * ambient give shading that reveals the depth of the letters.
 *
 * Font: Helvetiker Bold (default Three.js font) for now. Bricolage
 * Grotesque needs to be converted from TTF to typeface.json format
 * (via facetype.js) — pending. The extrusion technique is the
 * headline change here; font face is the next iteration.
 */

const FONT_JSON = "/fonts/helvetiker-bold.typeface.json";

const PHRASES: string[][] = [
  ["Bespoke software", "for ambitious", "UK businesses."],
  ["Custom websites", "that pass the", "credibility check."],
  ["Paid traffic", "run by the", "operators themselves."],
  ["Direct line.", "Two operators.", "No managers."],
];

const PHRASE_SPACING = 50;

function ExtrudedLine({ text, y }: { text: string; y: number }) {
  return (
    <Center position={[0, y, 0]}>
      <Text3D
        font={FONT_JSON}
        size={3.6}
        height={1.4}
        curveSegments={8}
        bevelEnabled
        bevelThickness={0.06}
        bevelSize={0.05}
        bevelOffset={0}
        bevelSegments={2}
      >
        {text}
        <meshStandardMaterial
          color="#F3EFE6"
          metalness={0.0}
          roughness={0.65}
        />
      </Text3D>
    </Center>
  );
}

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
        <ExtrudedLine
          key={idx}
          text={line}
          y={(lines.length / 2 - idx - 0.5) * 4.6}
        />
      ))}
    </group>
  );
}

/**
 * Eased camera Z so the camera DWELLS at each phrase before
 * accelerating to the next — gives each phrase its dramatic
 * "fragments fill the screen" climax.
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

  const APPROACH = 0.5;
  const PASS = 0.35;

  if (local < APPROACH) {
    const t = local / APPROACH;
    const eased = 1 - Math.pow(1 - t, 2);
    return prevZ + (phraseZ + 3 - prevZ) * eased;
  } else if (local < APPROACH + PASS) {
    const t = (local - APPROACH) / PASS;
    const eased = t * t * (3 - 2 * t);
    return phraseZ + 3 + -5 * eased;
  } else {
    const t = (local - APPROACH - PASS) / (1 - APPROACH - PASS);
    const eased = t * t;
    return phraseZ - 2 + (nextZ + 3 - (phraseZ - 2)) * eased;
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
    const startZ = 10;
    const endZ = -PHRASE_SPACING * (PHRASES.length + 0.6);
    camera.position.z = easedCameraZ(
      scrollProgress,
      PHRASES.length,
      startZ,
      endZ,
      PHRASE_SPACING
    );

    targetOffset.current.x = (mouseX - 0.5) * 2.0;
    targetOffset.current.y = (0.5 - mouseY) * 1.2;
    camera.position.x += (targetOffset.current.x - camera.position.x) * 0.06;
    camera.position.y += (targetOffset.current.y - camera.position.y) * 0.06;

    camera.lookAt(0, 0, camera.position.z - 5);
  });

  return (
    <>
      {/* Lighting — Text3D uses MeshStandardMaterial which needs lights */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[8, 10, 10]} intensity={1.2} />
      <directionalLight position={[-8, -5, 6]} intensity={0.6} />
      <directionalLight position={[0, 0, 20]} intensity={0.5} />

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
          camera={{ position: [0, 0, 10], fov: 65, near: 0.1, far: 250 }}
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
              focalLength={0.04}
              bokehScale={3}
              height={480}
            />
            <Noise opacity={0.04} premultiply />
            <Vignette eskil={false} offset={0.15} darkness={0.6} />
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
