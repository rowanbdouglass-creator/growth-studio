"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth-scroll provider. Wraps the entire app and provides
 * mechanical-paper-feed feel rather than silk-skating. Honors
 * prefers-reduced-motion: disables Lenis entirely under reduced
 * motion preference, restoring native scroll.
 *
 * Wired to GSAP the standard way: Lenis drives ScrollTrigger.update
 * on scroll, and gsap.ticker drives lenis.raf (lagSmoothing off) so
 * pinned scenes and scrubbed timelines stay in lockstep with scroll.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
