"use client";

import { useEffect, useRef, useState } from "react";

const findings = [
  { label: "Audience overlap", value: "£1,840 / mo" },
  { label: "Broken UTM tags", value: "11 campaigns" },
  { label: "Dead creative", value: "£940 / mo" },
  { label: "Branded search bleed", value: "23%" },
];

/**
 * Animated audit card. Starts blank; when scrolled into view, the
 * number counts up from £0 → £4,832 and the findings appear one
 * by one with the progress bar filling. Restarts each entry so
 * scrolling back replays.
 */
export function MockDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [shownFindings, setShownFindings] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setActive(e.isIntersecting);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(node);

    if (reduced) {
      setCount(4832);
      setProgress(74);
      setShownFindings(findings.length);
    }

    return () => obs.disconnect();
  }, []);

  // Count animation
  useEffect(() => {
    if (!active) {
      setCount(0);
      setProgress(0);
      setShownFindings(0);
      return;
    }
    const target = 4832;
    const dur = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setCount(target * eased);
      setProgress(74 * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  // Findings appear one by one
  useEffect(() => {
    if (!active) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    findings.forEach((_, i) => {
      timers.push(setTimeout(() => setShownFindings(i + 1), 600 + i * 160));
    });
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      {/* Glow halo */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-3xl"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 50%, oklch(0.86 0.012 245 / 0.18), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="relative rounded-xl border border-border-strong overflow-hidden backdrop-blur-md"
        style={{
          backgroundColor: "oklch(0.13 0.006 260 / 0.92)",
          boxShadow:
            "0 30px 80px -20px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(1 0 0 / 0.04) inset",
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-canvas-2/60">
          <div className="flex items-center gap-2.5">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-50" />
              <span className="relative w-2 h-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              Audit · Live
            </span>
          </div>
          <span className="font-mono text-[10px] text-ink-dim">
            growth.studio/audit
          </span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-2">
              Wastage detected
            </p>
            <p
              className="font-sans font-medium text-ink leading-none tracking-[-0.04em] text-4xl md:text-5xl"
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              £
              {Math.round(count).toLocaleString("en-GB")}
              <span className="text-ink-mute text-xl ml-2 font-normal">
                / mo
              </span>
            </p>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent mt-3 transition-opacity duration-300"
              style={{ opacity: count > 4000 ? 1 : 0 }}
            >
              + 3 quick wins available
            </p>
          </div>

          <ul className="space-y-0">
            {findings.map((f, i) => (
              <li
                key={f.label}
                className="flex items-center justify-between py-3 border-t border-border/60 transition-all duration-500"
                style={{
                  opacity: i < shownFindings ? 1 : 0,
                  transform:
                    i < shownFindings ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <span className="text-sm text-ink-soft">{f.label}</span>
                <span
                  className="font-mono text-xs text-ink"
                  style={{ fontFeatureSettings: "'tnum'" }}
                >
                  {f.value}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 pt-1">
            <span className="flex-1 h-px bg-rule overflow-hidden relative">
              <span
                className="absolute inset-y-0 left-0 bg-accent transition-all duration-[1400ms]"
                style={{
                  width: `${progress}%`,
                  transitionTimingFunction: "var(--ease-out-quart)",
                }}
              />
            </span>
            <span
              className="font-mono text-[10px] text-ink-mute uppercase tracking-[0.14em]"
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              {Math.round(progress)}% reviewed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
