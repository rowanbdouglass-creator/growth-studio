"use client";

import { useEffect, useRef, useState } from "react";

interface SparklineProps {
  /** 8-24 data points, any scale. Auto-normalised. */
  data: number[];
  /** Render as a line (default) or stacked bars */
  variant?: "line" | "bar";
  /** Stroke / fill colour. Defaults to accent silver. */
  color?: string;
  /** Width relative to parent (default 100%) */
  className?: string;
  /** Fill the area beneath the line for added weight */
  fill?: boolean;
}

/**
 * Small SVG chart used beneath stats. Animates the path/bars in
 * (left-to-right wipe) when scrolled into view. Decorative, low
 * ink. Pair with a big tabular-numbers stat.
 */
export function Sparkline({
  data,
  variant = "line",
  color = "oklch(0.86 0.012 245)",
  className = "",
  fill = false,
}: SparklineProps) {
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
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const width = 240;
  const height = 56;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const normalized = data.map((d) => (d - min) / range);

  if (variant === "bar") {
    const barWidth = width / data.length;
    const gap = barWidth * 0.25;
    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full h-12 overflow-visible ${className}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        {normalized.map((v, i) => {
          const h = Math.max(2, v * (height - 4));
          return (
            <rect
              key={i}
              x={i * barWidth + gap / 2}
              y={height - h}
              width={barWidth - gap}
              height={h}
              fill={color}
              opacity={0.85}
              style={{
                transformOrigin: `${i * barWidth + barWidth / 2}px ${height}px`,
                transform: shown ? "scaleY(1)" : "scaleY(0)",
                transition: `transform 700ms ${i * 35 + 200}ms cubic-bezier(0.16,1,0.3,1)`,
              }}
            />
          );
        })}
      </svg>
    );
  }

  // Line variant
  const stepX = width / (data.length - 1);
  const path = normalized
    .map((y, i) => `${i === 0 ? "M" : "L"}${i * stepX},${(1 - y) * (height - 4) + 2}`)
    .join(" ");
  const area = `${path} L${width},${height} L0,${height} Z`;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-12 overflow-visible ${className}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`spark-clip-${data.length}`}>
          <rect
            x="0"
            y="0"
            width={shown ? width : 0}
            height={height}
            style={{
              transition: "width 1100ms 100ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#spark-clip-${data.length})`}>
        {fill && <path d={area} fill="url(#sparkfill)" />}
        <path
          d={path}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* End dot */}
        <circle
          cx={width}
          cy={(1 - normalized[normalized.length - 1]) * (height - 4) + 2}
          r="2.5"
          fill={color}
        />
      </g>
    </svg>
  );
}
