"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

interface SectionMarkerProps {
  /** Short uppercase label e.g. "WHAT WE DO" */
  label: string;
  /** Optional very short subtitle line */
  subtitle?: string;
  /** Optional small index e.g. "02" rendered subtly to the left of the label */
  index?: string;
}

/**
 * Subtle horizontal divider between major homepage sections.
 *
 * Replaces the previous massive-numbered version which was visually
 * overpowering. This one is restrained: a hairline rule animates in
 * from the centre, a small mono label sits at one end. Confident but
 * not loud.
 */
export function SectionMarker({ label, subtitle, index }: SectionMarkerProps) {
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
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative py-14 md:py-20">
      <Container size="wide">
        <div className="flex items-baseline gap-4">
          {/* Animated rule */}
          <span
            aria-hidden
            className="h-px bg-rule"
            style={{
              flex: 1,
              transform: shown ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition:
                "transform 900ms cubic-bezier(0.16,1,0.3,1) 100ms",
            }}
          />
          <span
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute whitespace-nowrap"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(6px)",
              transition:
                "opacity 600ms 300ms cubic-bezier(0.16,1,0.3,1), transform 600ms 300ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {index && (
              <span className="text-ink-dim mr-3">{index}</span>
            )}
            {label}
          </span>
          {subtitle && (
            <span
              className="hidden md:inline text-sm text-ink-soft max-w-md whitespace-normal"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(6px)",
                transition:
                  "opacity 600ms 450ms cubic-bezier(0.16,1,0.3,1), transform 600ms 450ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      </Container>
    </div>
  );
}
