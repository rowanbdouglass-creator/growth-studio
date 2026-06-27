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
 * Signature Moment 2 - The Ledger (v2 - rebuilt).
 *
 * Receipts drop in from above as the user scrolls and land in a clean
 * fanned stack at bottom-center. One receipt per scroll-slot. By
 * scroll-end, all six are stacked and readable. Hover the top one
 * lifts. Click navigates to /work.
 *
 * Reduced-motion + small viewports fall back to a clean static list.
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
    ref: "RCPT-0024",
    href: "/work",
  },
  {
    client: "Forum Studios",
    scope: "Operations hub + automation",
    outcome: "96 hrs",
    outcomeLabel: "BACK / MONTH",
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

function buildReceiptTexture(item: LedgerItem): THREE.CanvasTexture {
  const W = 1024;
  const H = 1536;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = "#F3EFE6";
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 1400; i++) {
    const a = Math.random() * 0.05;
    ctx.fillStyle = `rgba(27, 26, 23, ${a})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
  }

  const M = 70;

  ctx.fillStyle = "#8C887D";
  ctx.font = "500 28px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText("RECEIPTS · UK", M, 100);
  ctx.textAlign = "right";
  ctx.fillText(item.ref, W - M, 100);
  ctx.textAlign = "left";

  ctx.fillStyle = "#1B1A17";
  ctx.fillRect(M, 130, W - M * 2, 2);

  ctx.fillStyle = "#8C887D";
  ctx.font = "600 22px 'JetBrains Mono', monospace";
  ctx.fillText("CLIENT", M, 200);

  ctx.fillStyle = "#1B1A17";
  ctx.font = "900 72px 'Archivo', sans-serif";
  const lineHeight = 84;
  const maxWidth = W - M * 2;
  const words = item.client.split(" ");
  let line = "";
  let y = 290;
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trim(), M, y);
      line = word + " ";
      y += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), M, y);

  const scopeStartY = y + 130;
  ctx.fillStyle = "#8C887D";
  ctx.font = "600 22px 'JetBrains Mono', monospace";
  ctx.fillText("SCOPE", M, scopeStartY);

  ctx.fillStyle = "#3A3833";
  ctx.font = "500 36px 'Archivo', sans-serif";
  const scopeLineH = 52;
  let scopeY = scopeStartY + 60;
  const scopeWords = item.scope.split(" ");
  line = "";
  for (const word of scopeWords) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trim(), M, scopeY);
      line = word + " ";
      scopeY += scopeLineH;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), M, scopeY);

  ctx.fillStyle = "#8C887D";
  ctx.font = "600 22px 'JetBrains Mono', monospace";
  ctx.fillText("OUTCOME", M, H - 320);

  ctx.fillStyle = "#1B1A17";
  ctx.font = "700 92px 'JetBrains Mono', monospace";
  ctx.fillText(item.outcome, M, H - 220);

  if (item.outcomeLabel) {
    ctx.fillStyle = "#8C887D";
    ctx.font = "600 22px 'JetBrains Mono', monospace";
    ctx.fillText(item.outcomeLabel, M, H - 170);
  }

  ctx.fillStyle = "#1B1A17";
  ctx.fillRect(M, H - 110, W - M * 2, 2);

  ctx.fillStyle = "#C4472E";
  const ss = 36;
  const sy = H - 80;
  ctx.beginPath();
  ctx.moveTo(M, sy);
  ctx.lineTo(M + ss, sy);
  ctx.lineTo(M + ss, sy + ss * 0.58);
  ctx.lineTo(M + ss * 0.58, sy + ss);
  ctx.lineTo(M, sy + ss);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#1B1A17";
  ctx.font = "700 22px 'JetBrains Mono', monospace";
  ctx.textAlign = "right";
  ctx.fillText("SIGNED", W - M, sy + ss - 4);
  ctx.textAlign = "left";

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.minFilter = THREE.LinearMipMapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
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
  const texture = useMemo(() => buildReceiptTexture(item), [item]);

  const finalX = useMemo(() => (index - (total - 1) / 2) * 0.42, [index, total]);
  const finalY = useMemo(() => -index * 0.08, [index]);
  const finalRotZ = useMemo(
    () => (index - (total - 1) / 2) * 0.11,
    [index, total]
  );

  useFrame(() => {
    if (!meshRef.current) return;
    const t = scrollProgress.current;

    const slotStart = index * (0.85 / total);
    const slotEnd = slotStart + 0.22;
    const slotT = THREE.MathUtils.clamp(
      (t - slotStart) / (slotEnd - slotStart),
      0,
      1
    );

    const startY = 6;
    const startRotZ = (index - (total - 1) / 2) * 0.4 + 0.6;
    const ease = 1 - Math.pow(1 - slotT, 3);

    const x = THREE.MathUtils.lerp(finalX * 0.3, finalX, ease);
    const y = THREE.MathUtils.lerp(startY, finalY, ease);
    const rotZ = THREE.MathUtils.lerp(startRotZ, finalRotZ, ease);
    const z = index * 0.04;

    let liftZ = 0;
    let liftScale = 1;
    if (hovered === index) {
      liftZ = 0.6;
      liftScale = 1.06;
    }

    meshRef.current.position.set(x, y, z + liftZ);
    meshRef.current.rotation.set(0, 0, rotZ);

    const currentScale = meshRef.current.scale.x || 1;
    const newScale = THREE.MathUtils.lerp(currentScale, liftScale, 0.15);
    meshRef.current.scale.set(newScale, newScale, newScale);

    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    if (material) material.opacity = slotT;
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
      <planeGeometry args={[1.5, 2.25]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        toneMapped={false}
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
    const ref = Math.min(size.width, size.height * 1.4);
    return ref * 0.14;
  }, [size]);

  return (
    <>
      <OrthographicCamera makeDefault position={[0, -0.4, 8]} zoom={zoom} />
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
        end: "+=2400",
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
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
      className="relative bg-[color:var(--color-ink)] text-[color:var(--color-paper)] overflow-hidden"
      style={{ height: "100vh" }}
      aria-label="The ledger: selected work"
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
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

      <div className="relative h-full pointer-events-none z-10">
        <div className="max-w-[1480px] mx-auto px-6 md:px-9 h-full flex flex-col py-12 md:py-16">
          <div className="flex justify-between items-baseline pb-7 border-b border-[#3A3833]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-red)] mb-3 flex items-center gap-2">
                <Stop size={7} color="#C4472E" />
                SELECTED WORK
              </p>
              <h2
                className="font-sans font-black inline-flex items-end gap-3"
                style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.95 }}
              >
                The ledger
                <Stop size="0.34em" color="#C4472E" style={{ marginBottom: "0.08em" }} />
              </h2>
            </div>
            <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
              END OF FORTY-ONE · 2024-2026
            </p>
          </div>

          <div className="flex-1" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="max-w-md min-h-[140px] pointer-events-auto">
              {hovered !== null ? (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-red)] mb-3 flex items-center gap-2">
                    <Stop size={6} color="#C4472E" />
                    {LEDGER[hovered].ref}
                  </p>
                  <h3 className="font-sans font-bold text-2xl md:text-3xl mb-2">
                    {LEDGER[hovered].client}
                  </h3>
                  <p className="text-sm text-[#D4CFC2] mb-3">
                    {LEDGER[hovered].scope}
                  </p>
                  <p className="font-mono text-xl font-bold flex items-baseline gap-3">
                    {LEDGER[hovered].outcome}
                    {LEDGER[hovered].outcomeLabel && (
                      <span className="text-[10px] tracking-[0.18em] text-[color:var(--color-pencil)] font-normal uppercase">
                        {LEDGER[hovered].outcomeLabel}
                      </span>
                    )}
                  </p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-pencil)]">
                    CLICK TO READ →
                  </p>
                </>
              ) : (
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)] mb-3 flex items-center gap-2">
                    <Stop size={6} color="#C4472E" />
                    INSTRUCTIONS
                  </p>
                  <p className="font-mono text-sm text-[color:var(--color-pencil)] max-w-sm leading-relaxed">
                    Scroll to deal the receipts. Hover any to inspect. Click to
                    read.
                  </p>
                </div>
              )}
            </div>

            <div className="text-right hidden md:flex flex-col gap-1 self-end">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
                14 CLIENTS / 42 PROJECTS
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
                SCROLL TO DEAL
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
