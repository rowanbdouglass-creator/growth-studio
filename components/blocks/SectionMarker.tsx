"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

interface SectionMarkerProps {
  number: string;
  label: string;
  /**
   * Optional alignment: 'right' (default) puts the massive number on the
   * right, 'left' on the left, 'center' centred. Alternate per section
   * for visual variety as the visitor scrolls.
   */
  align?: "left" | "right" | "center";
  /** Optional very short subtitle line beneath the label */
  subtitle?: string;
}

/**
 * Massive numbered divider between major homepage sections.
 * Designed to be unmissable on a quick scroll — every visitor
 * registers "I'm at section 03 now". Cycles through three layout
 * orientations as the page progresses so it doesn't feel like the
 * same divider repeated.
 *
 * The number itself uses the silver-shine gradient and a scroll-
 * triggered scale-up so it has a tiny moment of theatre rather
 * than just sitting there.
 */
export function SectionMarker({
  number,
  label,
  align = "right",
  subtitle,
}: SectionMarkerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setShown(true);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const numberClass = `font-sans font-medium tracking-[-0.05em] leading-[0.85] silver-shine`;
  const numberStyle: React.CSSProperties = {
    fontSize: "clamp(7rem, 22vw, 22rem)",
    transform: shown ? "translateY(0)" : "translateY(40px)",
    opacity: shown ? 1 : 0,
    transition:
      "transform 900ms cubic-bezier(0.16,1,0.3,1), opacity 900ms cubic-bezier(0.16,1,0.3,1)",
  };
  const labelStyle: React.CSSProperties = {
    transform: shown ? "translateY(0)" : "translateY(20px)",
    opacity: shown ? 1 : 0,
    transition:
      "transform 700ms 200ms cubic-bezier(0.16,1,0.3,1), opacity 700ms 200ms cubic-bezier(0.16,1,0.3,1)",
  };

  return (
    <div
      ref={ref}
      className="relative py-32 md:py-48 lg:py-56 border-t border-rule"
    >
      <Container size="wide">
        {align === "right" && (
          <div className="flex flex-col gap-10 md:gap-16 items-end">
            <div className="w-full flex items-baseline justify-between gap-8">
              <div className="flex flex-col gap-2" style={labelStyle}>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
                  {label}
                </span>
                {subtitle && (
                  <span className="text-ink-soft text-base max-w-sm leading-snug">
                    {subtitle}
                  </span>
                )}
              </div>
              <span className={numberClass} style={numberStyle}>
                {number}
              </span>
            </div>
          </div>
        )}

        {align === "left" && (
          <div className="flex flex-col gap-10 md:gap-16">
            <div className="w-full flex items-baseline justify-between gap-8">
              <span className={numberClass} style={numberStyle}>
                {number}
              </span>
              <div className="flex flex-col gap-2 text-right" style={labelStyle}>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
                  {label}
                </span>
                {subtitle && (
                  <span className="text-ink-soft text-base max-w-sm leading-snug">
                    {subtitle}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {align === "center" && (
          <div className="flex flex-col gap-6 items-center text-center">
            <div className="flex flex-col gap-2 items-center" style={labelStyle}>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
                {label}
              </span>
              {subtitle && (
                <span className="text-ink-soft text-base max-w-md leading-snug">
                  {subtitle}
                </span>
              )}
            </div>
            <span className={numberClass} style={numberStyle}>
              {number}
            </span>
          </div>
        )}
      </Container>
    </div>
  );
}
