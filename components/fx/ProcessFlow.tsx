"use client";

import { useEffect, useRef, useState } from "react";

interface ProcessFlowProps {
  /** 0-indexed step that should glow as active */
  active?: number;
  steps: { n: string; title: string }[];
}

/**
 * Animated horizontal flow diagram for the process section.
 * Four nodes connected by an SVG line that "draws" in as scrolled
 * into view. The active node gets a halo + larger ring.
 */
export function ProcessFlow({ active = 0, steps }: ProcessFlowProps) {
  const ref = useRef<SVGSVGElement>(null);
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
          if (e.isIntersecting) {
            setShown(true);
            obs.unobserve(el);
          }
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const width = 400;
  const height = 120;
  const stepWidth = width / (steps.length - 1);
  const cy = 60;
  const r = 14;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full overflow-visible"
      style={{ maxHeight: 180 }}
      aria-hidden
    >
      {/* Connecting line — draws in */}
      <line
        x1={0}
        y1={cy}
        x2={width}
        y2={cy}
        stroke="oklch(0.26 0.007 260)"
        strokeWidth="1"
        strokeDasharray={width}
        strokeDashoffset={shown ? 0 : width}
        style={{
          transition: "stroke-dashoffset 1400ms 100ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {/* Accent progress line up to active step */}
      <line
        x1={0}
        y1={cy}
        x2={shown ? active * stepWidth : 0}
        y2={cy}
        stroke="oklch(0.86 0.012 245)"
        strokeWidth="1.5"
        style={{
          transition: "x2 800ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {steps.map((s, i) => {
        const cx = i * stepWidth;
        const isActive = i === active;
        const isPast = i < active;
        return (
          <g
            key={s.n}
            style={{
              opacity: shown ? 1 : 0,
              transition: `opacity 500ms ${i * 120 + 300}ms`,
            }}
          >
            {/* Halo behind active node */}
            {isActive && (
              <circle
                cx={cx}
                cy={cy}
                r={r * 2.2}
                fill="oklch(0.86 0.012 245 / 0.10)"
                style={{
                  animation: "process-pulse 2s ease-in-out infinite",
                }}
              />
            )}
            {/* Outer ring */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="oklch(0.13 0.006 260)"
              stroke={
                isActive
                  ? "oklch(0.86 0.012 245)"
                  : isPast
                  ? "oklch(0.86 0.012 245 / 0.5)"
                  : "oklch(0.32 0.008 260)"
              }
              strokeWidth={isActive ? "1.5" : "1"}
            />
            {/* Inner dot */}
            <circle
              cx={cx}
              cy={cy}
              r={isActive ? 4 : 2.5}
              fill={
                isActive || isPast
                  ? "oklch(0.86 0.012 245)"
                  : "oklch(0.32 0.008 260)"
              }
            />
            {/* Step number above */}
            <text
              x={cx}
              y={cy - r - 12}
              textAnchor="middle"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fontWeight="500"
              letterSpacing="2"
              fill={
                isActive
                  ? "oklch(0.86 0.012 245)"
                  : "oklch(0.54 0.007 260)"
              }
              style={{ textTransform: "uppercase" }}
            >
              {s.n}
            </text>
            {/* Label below */}
            <text
              x={cx}
              y={cy + r + 22}
              textAnchor="middle"
              fontSize="14"
              fontFamily="var(--font-sans)"
              fontWeight="500"
              letterSpacing="-0.5"
              fill={
                isActive ? "oklch(0.97 0.003 260)" : "oklch(0.76 0.005 260)"
              }
            >
              {s.title}
            </text>
          </g>
        );
      })}

      <style>{`
        @keyframes process-pulse {
          0%, 100% { opacity: 0.4; transform-origin: center; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </svg>
  );
}
