"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Wraps children in an IntersectionObserver-based reveal. Fades up 40px
 * over 800ms with a snappy ease-out-quint curve. Respects
 * prefers-reduced-motion: instant final state.
 *
 * Use sparingly — one wrapper per "moment", not around every paragraph.
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  /** Delay before reveal starts, in ms. Default 0. */
  delay?: number;
  /** Translation amount in px. Default 40. */
  distance?: number;
  /** Threshold for triggering. Default 0.12. */
  threshold?: number;
  className?: string;
  style?: CSSProperties;
}

export function ScrollReveal({
  children,
  delay = 0,
  distance = 40,
  threshold = 0.12,
  className = "",
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      node.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            node.classList.add("is-in");
            io.unobserve(node);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  const computedStyle: CSSProperties = {
    opacity: 0,
    transform: `translateY(${distance}px)`,
    transition: `opacity 800ms var(--ease-out-quint), transform 800ms var(--ease-out-quint)`,
    transitionDelay: `${delay}ms`,
    ...style,
  };

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={computedStyle}
    >
      <style>{`.scroll-reveal.is-in { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
      {children}
    </div>
  );
}
