"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { Stop } from "@/components/brand/Stop";

/**
 * The Print Hero — Session 1 signature moment.
 *
 * The page IS a receipt being printed. On load, the wordmark
 * "receipts." prints character-by-character with subtle paper-feed
 * shake. The subhead prints after. The audit bar slides up. The
 * trust strip fades in last.
 *
 * Under prefers-reduced-motion, everything collapses to the final
 * resting state instantly.
 */

const WORD = "receipts";
const CLIENTS = [
  "Nayim's Embroideries",
  "JC Setton Opticians",
  "T-SHOT",
  "Forum Studios",
  "Cape Kings",
  "Confidential",
];

export function PrintHero() {
  const containerRef = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const stopRef = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const eyebrowRuleRef = useRef<HTMLSpanElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const auditBarRef = useRef<HTMLFormElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const printerHeadRef = useRef<HTMLDivElement>(null);

  const [auditUrl, setAuditUrl] = useState("");

  useGSAP(
    () => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            charsRef.current,
            stopRef.current,
            eyebrowRef.current,
            eyebrowRuleRef.current,
            subheadRef.current,
            auditBarRef.current,
            trustRef.current,
          ],
          { opacity: 1, y: 0, clearProps: "all" }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // PHASE 1 — eyebrow prints
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
      tl.fromTo(
        eyebrowRuleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "expo.out" },
        "-=0.3"
      );

      // PHASE 2 — wordmark characters print with paper-feed shake
      const chars = charsRef.current.filter(Boolean);
      chars.forEach((char, i) => {
        // each character: rise + opacity + tiny rotation overshoot
        tl.fromTo(
          char,
          {
            opacity: 0,
            y: "100%",
            rotate: -2 + Math.random() * 4,
          },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.55,
            ease: "back.out(2.2)",
          },
          0.6 + i * 0.07
        );
        // paper-feed shake: the whole paper jitters as each char lands
        tl.to(
          paperRef.current,
          {
            y: "+=1.5",
            duration: 0.08,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          0.6 + i * 0.07 + 0.1
        );
        // printer head bobbles
        tl.to(
          printerHeadRef.current,
          {
            x: i * 4 - chars.length * 2,
            duration: 0.1,
            ease: "none",
          },
          0.6 + i * 0.07
        );
      });

      // PHASE 3 — stop punches in with overshoot
      tl.fromTo(
        stopRef.current,
        { opacity: 0, scale: 0.6, rotate: -20 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.55,
          ease: "back.out(3)",
        },
        0.6 + chars.length * 0.07 + 0.1
      );

      // PHASE 4 — subhead prints
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        "+=0.15"
      );

      // PHASE 5 — audit bar rises
      tl.fromTo(
        auditBarRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
        "-=0.4"
      );

      // PHASE 6 — printer head returns home
      tl.to(
        printerHeadRef.current,
        { x: 0, duration: 0.5, ease: "power2.inOut" },
        "-=0.5"
      );

      // PHASE 7 — trust strip fades in
      tl.fromTo(
        trustRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-20 md:pt-28 pb-16 md:pb-24"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 8px,
            rgba(27, 26, 23, 0.012) 8px,
            rgba(27, 26, 23, 0.012) 9px
          )`,
      }}
    >
      {/* THE PRINTER */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-[1480px] mx-auto px-6 md:px-9 flex justify-center">
          <div className="relative w-full max-w-[640px] h-10 md:h-12">
            {/* Printer body */}
            <div
              className="absolute inset-x-0 top-0 h-6 md:h-7 rounded-b-sm"
              style={{
                background:
                  "linear-gradient(180deg, #1B1A17 0%, #1B1A17 70%, #3A3833 100%)",
                boxShadow:
                  "0 4px 18px -4px rgba(27, 26, 23, 0.20), inset 0 -2px 0 rgba(255, 255, 255, 0.05)",
              }}
            />
            {/* Status LED */}
            <div
              className="absolute top-2 right-4 w-1.5 h-1.5 rounded-full"
              style={{
                background: "#C4472E",
                boxShadow: "0 0 6px rgba(196, 71, 46, 0.8)",
              }}
            />
            <div
              className="absolute top-2 right-8 w-1.5 h-1.5 rounded-full"
              style={{ background: "#3A3833" }}
            />
            {/* Paper slot */}
            <div
              className="absolute inset-x-6 md:inset-x-12 bottom-3 md:bottom-4 h-1.5 md:h-2 rounded-sm"
              style={{
                background:
                  "linear-gradient(180deg, #0A0908 0%, #1B1A17 100%)",
                boxShadow:
                  "inset 0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.06)",
              }}
            />
            {/* Printer head — moves on character print */}
            <div
              ref={printerHeadRef}
              className="absolute top-3 md:top-3.5 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-sm"
              style={{
                background: "#5A5650",
                boxShadow: "inset 0 -1px 0 rgba(0, 0, 0, 0.4)",
              }}
            />
          </div>
        </div>
      </div>

      {/* THE PAPER (the actual hero content) */}
      <div
        ref={paperRef}
        className="relative max-w-[1480px] mx-auto px-6 md:px-9 pt-16 md:pt-20"
      >
        {/* Top meta strip */}
        <div className="flex justify-between mb-12 md:mb-16 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
          <span>RECEIPTS · UK · TWO OPERATORS</span>
          <span className="hidden md:inline">EST. 2024 · NO MIDDLE LAYER</span>
        </div>

        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="flex items-center gap-4 mb-8 md:mb-10"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.28em] text-[color:var(--color-red)] font-bold">
            SHOW ME THE
          </span>
          <span
            ref={eyebrowRuleRef}
            className="block w-12 md:w-16 h-px bg-[color:var(--color-red)]"
            style={{ transformOrigin: "left", transform: "scaleX(0)" }}
          />
        </div>

        {/* MASSIVE WORDMARK */}
        <h1
          className="font-sans font-black text-[color:var(--color-ink)] mb-8 md:mb-10 flex items-end gap-[0.04em]"
          style={{
            fontSize: "clamp(80px, 18vw, 280px)",
            lineHeight: 0.82,
            letterSpacing: "-0.05em",
          }}
        >
          <span className="inline-block overflow-hidden" aria-label="receipts.">
            <span className="inline-flex items-end" aria-hidden>
              {WORD.split("").map((char, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    if (el) charsRef.current[i] = el;
                  }}
                  className="inline-block"
                  style={{ opacity: 0, transform: "translateY(100%)" }}
                >
                  {char}
                </span>
              ))}
            </span>
          </span>
          <span
            ref={stopRef}
            className="inline-block"
            style={{
              opacity: 0,
              width: "clamp(28px, 4.5vw, 70px)",
              height: "clamp(28px, 4.5vw, 70px)",
              background: "#C4472E",
              clipPath: "polygon(0 0, 100% 0, 100% 58%, 58% 100%, 0 100%)",
              marginBottom: "clamp(8px, 1.5vw, 22px)",
            }}
          />
        </h1>

        {/* Subhead */}
        <p
          ref={subheadRef}
          className="font-sans font-medium text-[color:var(--color-ink-soft)] max-w-[42ch] leading-[1.32] mb-10 md:mb-14"
          style={{ fontSize: "clamp(20px, 2.2vw, 30px)", opacity: 0 }}
        >
          A two-person UK agency that runs the traffic and builds the systems
          that hold the revenue.
        </p>

        {/* Audit input bar */}
        <form
          ref={auditBarRef}
          onSubmit={(e) => {
            e.preventDefault();
            if (auditUrl.trim()) {
              window.location.href = `/tools/website-audit?url=${encodeURIComponent(
                auditUrl
              )}`;
            }
          }}
          className="grid grid-cols-[1fr_auto] border-[1.5px] border-[color:var(--color-ink)] bg-[color:var(--color-slip)] max-w-[700px] mb-12 md:mb-16 overflow-hidden"
          style={{ opacity: 0 }}
        >
          <input
            type="text"
            value={auditUrl}
            onChange={(e) => setAuditUrl(e.target.value)}
            placeholder="paste your URL, get an audit in 90 seconds"
            className="bg-transparent border-none px-5 md:px-7 py-5 md:py-[22px] font-mono text-sm md:text-[15px] text-[color:var(--color-ink)] outline-none placeholder:text-[color:var(--color-ink-dim)]"
          />
          <button
            type="submit"
            className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)] font-mono font-bold text-xs uppercase tracking-[0.18em] px-6 md:px-10 flex items-center gap-2.5 transition-colors hover:bg-[color:var(--color-red)]"
          >
            Run audit
            <Stop size={6} color="#C4472E" />
          </button>
        </form>

        {/* Trust strip */}
        <div
          ref={trustRef}
          className="flex items-center gap-3 md:gap-7 font-mono text-[11px] md:text-[12px] tracking-[0.14em] text-[color:var(--color-pencil)] flex-wrap"
          style={{ opacity: 0 }}
        >
          <span className="text-[color:var(--color-ink)] font-bold tracking-[0.18em] uppercase flex items-center gap-2.5">
            Selected clients <Stop size={6} color="#1B1A17" />
          </span>
          {CLIENTS.map((c, i) => (
            <span key={c} className="flex items-center gap-3 md:gap-7">
              <span>{c}</span>
              {i < CLIENTS.length - 1 && (
                <span className="text-[color:var(--color-rule)]">/</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
