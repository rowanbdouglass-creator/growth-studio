"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import Link from "next/link";
import { Stop } from "@/components/brand/Stop";

/**
 * Signature Moment 2 — The WebGL Ledger.
 *
 * A scroll-pinned 3D scene. Six case-study receipts orbit through space
 * as the user scrolls. By scroll-end they stack into a pile, ready to
 * read. Hover any receipt -> it lifts toward camera. Click -> navigate
 * to its detail page.
 *
 * Performance: GPU layer only (transforms + opacity). Texture canvases
 * are pre-baked once. Reduced-motion + small viewports fall back to a
 * static vertical list.
 */

interface LedgerItem {
  client: string;
  scope: string;
  outcome: string;
  outcomeLabel?: string;
  ref: string;
  href: string;
}

const LEDGER: LedgerItem[] = [
  {
    client: "Nayim's Embroideries",
    scope: "Paid social + quote-to-order system",
    outcome: "£128,000",
    outcomeLabel: "ON INVOICE",
    ref: "RCPT-0001",
    href: "/work",
  },
  {
    client: "JC Setton Opticians",
    scope: "Recovered ad spend + booking CRM",
    outcome: "£42,180",
    outcomeLabel: "RECOVERED",
    ref: "RCPT-0023",
    href: "/work",
  },
  {
    client: "T-SHOT",
    scope: "Cold outreach engine + pipeline",
    outcome: "3.4× ROAS",
    outcomeLabel: "",
    ref: "RCPT-0024",
    href: "/work",
  },
  {
    client: "Forum Studios",
    scope: "Operations hub + automation",
    outcome: "96 HRS / MO",
    outcomeLabel: "BACK",
    ref: "RCPT-0029",
    href: "/work",
  },
  {
    client: "Cape Kings",
    scope: "Google + Meta account rebuild",
    outcome: "1.8 → 3.4",
    outcomeLabel: "ROAS, 60 DAYS",
    ref: "RCPT-0022",
    href: "/work",
  },
  {
    client: "Confidential",
    scope: "Security-incident revenue recovery",
    outcome: "11 → 1",
    outcomeLabel: "DAYS TO QUOTE",
    ref: "RCPT-0024",
    href: "/work",
  },
];

// Canvas-painted receipt texture
function buildReceiptTexture(item: LedgerItem, index: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  const W = 512;
  const H = 768;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Paper background
  ctx.fillStyle = "#F3EFE6";
  ctx.fillRect(0, 0, W, H);

  // Subtle paper grain
  for (let i = 0; i < 600; i++) {
    const a = Math.random() * 0.04;
    ctx.fillStyle = `rgba(27, 26, 23, ${a})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
  }

  // Top meta strip
  ctx.fillStyle = "#8C887D";
  ctx.font = "500 16px 'JetBrains Mono', monospace";
  ctx.fillText("RECEIPTS · UK", 32, 50);
  ctx.textAlign = "right";
  ctx.fillText(item.ref, W - 32, 50);
  ctx.textAlign = "left";

  // Hairline rule
  ctx.fillStyle = "#DACBB1";
  ctx.fillRect(32, 70, W - 64, 1);

  // CLIENT label
  ctx.fillStyle = "#8C887D";
  ctx.font = "600 13px 'JetBrains Mono', monospace";
  ctx.fillText("CLIENT", 32, 120);

  // Client name
  ctx.fillStyle = "#1B1A17";
  ctx.font = "900 36px 'Archivo', sans-serif";
  // Wrap client name if long
  const words = item.client.split(" ");
  let line = "";
  let y = 165;
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > W - 64 && line) {
      ctx.fillText(line.trim(), 32, y);
      line = word + " ";
      y += 42;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), 32, y);

  // SCOPE label + body
  ctx.fillStyle = "#8C887D";
  ctx.font = "600 13px 'JetBrains Mono', monospace";
  ctx.fillText("SCOPE", 32, y + 80);
  ctx.fillStyle = "#3A3833";
  ctx.font = "500 20px 'Archivo', sans-serif";
  const scopeWords = item.scope.split(" ");
  line = "";
  let scopeY = y + 115;
  for (const word of scopeWords) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > W - 64 && line) {
      ctx.fillText(line.trim(), 32, scopeY);
      line = word + " ";
      scopeY += 28;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), 32, scopeY);

  // OUTCOME label
  ctx.fillStyle = "#8C887D";
  ctx.font = "600 13px 'JetBrains Mono', monospace";
  ctx.fillText("OUTCOME", 32, H - 200);

  // Big outcome figure
  ctx.fillStyle = "#1B1A17";
  ctx.font = "700 52px 'JetBrains Mono', monospace";
  ctx.fillText(item.outcome, 32, H - 140);

  // Outcome label small
  if (item.outcomeLabel) {
    ctx.fillStyle = "#8C887D";
    ctx.font = "500 14px 'JetBrains Mono', monospace";
    ctx.fillText(item.outcomeLabel, 32, H - 110);
  }

  // Bottom rule + red stop
  ctx.fillStyle = "#1B1A17";
  ctx.fillRect(32, H - 70, W - 64, 1);

  // Red torn-corner stop (manual polygon)
  ctx.fillStyle = "#C4472E";
  const sx = 32;
  const sy = H - 50;
  const ss = 24;
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + ss, sy);
  ctx.lineTo(sx + ss, sy + ss * 0.58);
  ctx.lineTo(sx + ss * 0.58, sy + ss);
  ctx.lineTo(sx, sy + ss);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#1B1A17";
  ctx.font = "500 14px 'JetBrains Mono', monospace";
  ctx.fillText("SIGNED & DATED", sx + ss + 16, sy + ss - 6);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

interface ReceiptCardProps {
  item: LedgerItem;
  index: number;
  total: number;
  scrollProgress: React.MutableRefObject<number>;
  hovered: number | null;
  setHovered: (n: number | null) => void;
  onClick: (item: LedgerItem) => void;
}

function ReceiptCard({
  item,
  index,
  total,
  scrollProgress,
  hovered,
  setHovered,
  onClick,
}: ReceiptCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => buildReceiptTexture(item, index), [item, index]);

  useFrame(() => {
    if (!meshRef.current) return;
    const t = scrollProgress.current;

    // Each receipt has a personal phase offset
    const phase = index / total;

    // Phase A: entry from off-screen left (t = 0 -> 0.15)
    // Phase B: orbit around center (t = 0.15 -> 0.7)
    // Phase C: stack at center-right (t = 0.7 -> 1.0)

    // Entry
    const entry = THREE.MathUtils.clamp((t - phase * 0.04) / 0.18, 0, 1);

    // Orbit angle: spread around 270deg of arc
    const arcStart = -Math.PI * 0.55;
    const arcSpan = Math.PI * 1.7;
    const localPhase = (t - phase * 0.06) * 1.4;
    const angle = arcStart + arcSpan * THREE.MathUtils.clamp(localPhase, 0, 1);

    // Radius: shrinks as we orbit (drawing in to center)
    const radius =
      4.2 * (1 - THREE.MathUtils.clamp(localPhase, 0, 1) * 0.55);

    // Position on orbit
    let x = Math.cos(angle) * radius;
    let y = Math.sin(angle) * radius * 0.6;
    let z = -2 - localPhase * 1.5 + index * 0.15;

    // Stack phase: when t > 0.78, glide to a fanned stack on right
    const stackT = THREE.MathUtils.clamp((t - 0.78) / 0.2, 0, 1);
    if (stackT > 0) {
      const stackX = 2 + index * 0.04;
      const stackY = 0.6 - index * 0.18;
      const stackZ = -0.5 + index * 0.06;
      x = THREE.MathUtils.lerp(x, stackX, stackT);
      y = THREE.MathUtils.lerp(y, stackY, stackT);
      z = THREE.MathUtils.lerp(z, stackZ, stackT);
    }

    // Hover lift
    if (hovered === index) {
      z += 0.6;
    }

    // Apply with entry opacity
    meshRef.current.position.set(
      x * entry + (1 - entry) * -8,
      y,
      z
    );

    // Rotation: face the camera as it moves, slight tilt
    const baseTilt = -0.1;
    const stackTilt = THREE.MathUtils.lerp(angle * 0.4, 0.05, stackT);
    meshRef.current.rotation.y = stackTilt;
    meshRef.current.rotation.z = baseTilt + index * 0.02 - localPhase * 0.1;
    meshRef.current.rotation.x = -0.05;

    // Scale: small hover boost
    const scale = hovered === index ? 1.08 : 1.0;
    const lerpedScale = THREE.MathUtils.lerp(
      (meshRef.current.scale.x as number) || scale,
      scale,
      0.12
    );
    meshRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);

    // Opacity ramps in with entry
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    if (material) material.opacity = entry;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(index);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(null);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item);
      }}
    >
      <planeGeometry args={[1.6, 2.4]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Scene({
  scrollProgress,
  hovered,
  setHovered,
  onClick,
}: {
  scrollProgress: React.MutableRefObject<number>;
  hovered: number | null;
  setHovered: (n: number | null) => void;
  onClick: (item: LedgerItem) => void;
}) {
  const { size } = useThree();
  const zoom = useMemo(() => {
    const min = Math.min(size.width, size.height);
    return min * 0.16;
  }, [size]);

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 8]} zoom={zoom} />
      <ambientLight intensity={1} />
      {LEDGER.map((item, i) => (
        <ReceiptCard
          key={item.ref}
          item={item}
          index={i}
          total={LEDGER.length}
          scrollProgress={scrollProgress}
          hovered={hovered}
          setHovered={setHovered}
          onClick={onClick}
        />
      ))}
    </>
  );
}

export function WebGLLedger() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [reducedOrSmall, setReducedOrSmall] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    setReducedOrSmall(reduced || small);
  }, []);

  useGSAP(
    () => {
      if (reducedOrSmall) return;
      gsap.registerPlugin(ScrollTrigger);

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: sectionRef, dependencies: [reducedOrSmall] }
  );

  function handleClick(item: LedgerItem) {
    window.location.href = item.href;
  }

  if (reducedOrSmall) {
    return <StaticLedgerFallback />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
      style={{ height: "100vh" }}
      aria-label="The ledger: selected work"
    >
      {/* The Canvas fills the pinned viewport */}
      <div className="absolute inset-0">
        <Canvas
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: "transparent" }}
        >
          <Scene
            scrollProgress={scrollProgress}
            hovered={hovered}
            setHovered={setHovered}
            onClick={handleClick}
          />
        </Canvas>
      </div>

      {/* Overlay HUD */}
      <div className="relative h-full pointer-events-none">
        <div className="max-w-[1480px] mx-auto px-6 md:px-9 h-full flex flex-col py-12 md:py-16">
          {/* Top */}
          <div className="flex justify-between items-baseline pb-8 border-b border-[#3A3833]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-red)] mb-4 flex items-center gap-2">
                <Stop size={7} color="#C4472E" />
                SELECTED WORK
              </p>
              <h2
                className="font-sans font-black inline-flex items-end gap-3"
                style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.95 }}
              >
                The ledger
                <Stop size="0.36em" color="#C4472E" style={{ marginBottom: "0.08em" }} />
              </h2>
            </div>
            <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
              END OF FORTY-ONE · 2024-2026
            </p>
          </div>

          {/* Hovered receipt info */}
          <div className="flex-1 flex items-end pb-6">
            <div className="max-w-md min-h-[120px] pointer-events-auto">
              {hovered !== null ? (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-red)] mb-3 flex items-center gap-2">
                    <Stop size={6} color="#C4472E" />
                    {LEDGER[hovered].ref}
                  </p>
                  <h3 className="font-sans font-bold text-2xl md:text-3xl mb-2">
                    {LEDGER[hovered].client}
                  </h3>
                  <p className="text-sm md:text-base text-[#D4CFC2] mb-3">
                    {LEDGER[hovered].scope}
                  </p>
                  <p className="font-mono text-xl md:text-2xl font-bold">
                    {LEDGER[hovered].outcome}
                    {LEDGER[hovered].outcomeLabel && (
                      <span className="ml-3 text-[11px] tracking-[0.18em] text-[color:var(--color-pencil)] font-normal uppercase">
                        {LEDGER[hovered].outcomeLabel}
                      </span>
                    )}
                  </p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-pencil)]">
                    CLICK TO READ →
                  </p>
                </>
              ) : (
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)] max-w-sm">
                  Six receipts · hover any to inspect · scroll to fan and stack
                </p>
              )}
            </div>
          </div>

          {/* Scroll indicator at bottom */}
          <div className="flex justify-between items-center text-[color:var(--color-pencil)] font-mono text-[10px] uppercase tracking-[0.18em]">
            <span>SCROLL TO READ THE LEDGER</span>
            <span className="hidden md:inline">14 CLIENTS / 42 PROJECTS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Static vertical list fallback for reduced-motion + small viewports. */
function StaticLedgerFallback() {
  return (
    <section className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)] py-24 md:py-32">
      <div className="max-w-[1480px] mx-auto px-6 md:px-9">
        <div className="flex justify-between items-baseline pb-12 mb-12 border-b border-[#3A3833]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-red)] mb-3 flex items-center gap-2">
              <Stop size={7} color="#C4472E" />
              SELECTED WORK
            </p>
            <h2
              className="font-sans font-black inline-flex items-end gap-3"
              style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.95 }}
            >
              The ledger
              <Stop size="0.36em" color="#C4472E" style={{ marginBottom: "0.08em" }} />
            </h2>
          </div>
        </div>

        <ul className="divide-y divide-[#3A3833] border-t border-[#3A3833]">
          {LEDGER.map((row) => (
            <li key={row.ref}>
              <Link
                href={row.href}
                className="grid md:grid-cols-[1.4fr_2.2fr_1.2fr_1fr] gap-6 md:gap-9 py-6 md:py-8 items-center hover:bg-[#232220] transition-colors px-1 md:px-0"
              >
                <span className="flex items-center gap-3 font-sans font-semibold text-lg md:text-xl">
                  <Stop size={9} color="#C4472E" />
                  {row.client}
                </span>
                <span className="text-sm md:text-base text-[#D4CFC2] leading-snug">
                  {row.scope}
                </span>
                <span className="font-mono text-lg md:text-xl font-bold">
                  {row.outcome}
                  {row.outcomeLabel && (
                    <small className="block text-[10px] tracking-[0.18em] text-[color:var(--color-pencil)] mt-1 uppercase font-normal">
                      {row.outcomeLabel}
                    </small>
                  )}
                </span>
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-pencil)]">
                  {row.ref} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
