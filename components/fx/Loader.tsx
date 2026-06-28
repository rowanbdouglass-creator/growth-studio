"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Initial page loader. ~1.7s sequence:
 * 1) "Checking the diary" types in mono
 * 2) Three dots stagger in
 * 3) Wordmark "ylb" draws in beneath
 * 4) The whole loader screen wipes up (clip-path) revealing the page
 *
 * Runs once per browser session — sessionStorage flag stops it firing
 * on every internal navigation.
 */
export function Loader() {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const dotsRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("ylb-loader-seen");
    if (seen) return;
    setActive(true);
    document.body.style.overflow = "hidden";
    sessionStorage.setItem("ylb-loader-seen", "1");
  }, []);

  useEffect(() => {
    if (!active || !rootRef.current) return;

    const word = "Checking the diary";
    const typedEl = typedRef.current;
    const dotsEl = dotsRef.current;
    const markEl = markRef.current;
    if (!typedEl || !dotsEl || !markEl) return;

    typedEl.textContent = "";

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        if (rootRef.current) {
          gsap.to(rootRef.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.85,
            ease: "expo.inOut",
            onComplete: () => {
              setActive(false);
              document.body.style.overflow = "";
            },
          });
        }
      },
    });

    // 1) Type the word, char by char
    word.split("").forEach((c, i) => {
      tl.call(
        () => {
          typedEl.textContent = word.slice(0, i + 1);
        },
        [],
        i * 0.035 + 0.15
      );
    });

    // 2) Dots
    tl.fromTo(
      dotsEl.children,
      { opacity: 0 },
      { opacity: 1, stagger: 0.08, duration: 0.05 },
      "+=0.15"
    );

    // 3) Wordmark draws in (scale-y wipe)
    tl.fromTo(
      markEl,
      { clipPath: "inset(0 0 100% 0)", opacity: 0 },
      { clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 0.55 },
      "+=0.18"
    );

    // 4) Brief hold before clip-path wipe
    tl.to({}, { duration: 0.35 });

    return () => {
      tl.kill();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--color-paper)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        clipPath: "inset(0 0 0% 0)",
        willChange: "clip-path",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(14px, 1.4vw, 18px)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-pencil)",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <span ref={typedRef} aria-hidden="true" />
        <span
          ref={dotsRef}
          aria-hidden="true"
          style={{ display: "inline-flex", marginLeft: 4, color: "var(--color-red)" }}
        >
          <span style={{ opacity: 0 }}>.</span>
          <span style={{ opacity: 0 }}>.</span>
          <span style={{ opacity: 0 }}>.</span>
        </span>
      </div>
      <span
        ref={markRef}
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "clamp(96px, 16vw, 220px)",
          letterSpacing: "-0.05em",
          lineHeight: 0.84,
          color: "var(--color-ink)",
          display: "inline-flex",
          alignItems: "baseline",
          willChange: "clip-path, opacity",
        }}
      >
        <span>y</span>
        <span>l</span>
        <span style={{ color: "var(--color-red)" }}>b</span>
      </span>
    </div>
  );
}
