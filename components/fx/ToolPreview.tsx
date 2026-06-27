"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small mock UI preview rendered at the top of a tool card.
 * Two variants, "ad" shows a dashboard-style metric grid, "site"
 * shows a Lighthouse-style score gauge. Both animate in once on
 * scroll: bars fill, score number counts up.
 */

interface ToolPreviewProps {
  variant: "ad" | "site";
}

export function ToolPreview({ variant }: ToolPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setActive(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            obs.unobserve(el);
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative rounded-lg overflow-hidden border border-border bg-surface"
      style={{
        boxShadow:
          "0 18px 50px -20px oklch(0.20 0.020 60 / 0.14), 0 0 0 1px oklch(0.20 0.020 60 / 0.03) inset",
        aspectRatio: "16 / 9",
      }}
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-canvas-2/60">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-ink-mute/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-ink-mute/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-ink-mute/40" />
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink-dim">
          {variant === "ad" ? "audit.live" : "site.audit"}
        </span>
      </div>

      <div className="p-4">
        {variant === "ad" ? <AdAuditPreview active={active} /> : <SiteAuditPreview active={active} />}
      </div>
    </div>
  );
}

function AdAuditPreview({ active }: { active: boolean }) {
  const bars = [78, 92, 64, 88, 45, 72, 60, 81, 55, 70];
  return (
    <div className="flex gap-3 h-full">
      {/* Mini metric */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-ink-dim mb-1">
            Wastage
          </p>
          <p
            className="font-sans font-medium text-ink leading-none tracking-tight text-2xl"
            style={{ fontFeatureSettings: "'tnum'" }}
          >
            £{active ? "4,832" : "0"}
            <span className="text-ink-mute text-[9px] ml-0.5 font-normal">
              /mo
            </span>
          </p>
          <p
            className="font-mono text-[7px] uppercase tracking-[0.16em] text-accent mt-1 transition-opacity duration-500"
            style={{ opacity: active ? 1 : 0 }}
          >
            + 3 wins
          </p>
        </div>
        <div className="space-y-1">
          {["Audience overlap", "Dead creative", "UTM tags"].map((label, i) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-[8px] text-ink-mute"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateX(0)" : "translateX(-6px)",
                transition: `opacity 500ms ${300 + i * 100}ms, transform 500ms ${300 + i * 100}ms cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              <span className="w-1 h-1 rounded-full bg-accent" />
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex-1 flex items-end gap-0.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: active ? `${h}%` : "0%",
              backgroundColor:
                i === 4 || i === 8
                  ? "oklch(0.460 0.220 252)"
                  : "oklch(0.760 0.006 75)",
              transition: `height 700ms ${i * 50 + 100}ms cubic-bezier(0.16,1,0.3,1)`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SiteAuditPreview({ active }: { active: boolean }) {
  // Build a score gauge that fills to 87
  const score = active ? 87 : 0;
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex gap-4 items-center h-full">
      {/* Score gauge */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="18"
            fill="none"
            stroke="oklch(0.880 0.005 75)"
            strokeWidth="3"
          />
          <circle
            cx="24"
            cy="24"
            r="18"
            fill="none"
            stroke="oklch(0.460 0.220 252)"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition:
                "stroke-dashoffset 1200ms 200ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-sans font-medium text-ink text-base leading-none tracking-tight"
            style={{ fontFeatureSettings: "'tnum'" }}
          >
            {score}
          </span>
          <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-ink-dim mt-0.5">
            /100
          </span>
        </div>
      </div>

      {/* Vitals */}
      <div className="flex-1 space-y-1.5">
        {[
          { k: "LCP", v: "1.1s", good: true },
          { k: "CLS", v: "0.04", good: true },
          { k: "INP", v: "182ms", good: false },
          { k: "SEO", v: "94", good: true },
        ].map((v, i) => (
          <div
            key={v.k}
            className="flex items-center justify-between gap-2"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(4px)",
              transition: `opacity 500ms ${400 + i * 90}ms, transform 500ms ${400 + i * 90}ms cubic-bezier(0.16,1,0.3,1)`,
            }}
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1 h-1 rounded-full ${v.good ? "bg-accent" : "bg-ink-mute"}`}
              />
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-mute">
                {v.k}
              </span>
            </div>
            <span
              className="font-mono text-[9px] text-ink"
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              {v.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
