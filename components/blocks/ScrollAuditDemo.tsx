"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Scroll-pinned demonstration of the audit pipeline. The visitor scrolls,
 * the panel stays pinned at viewport top, and the pipeline animates
 * through its phases from "collecting signals" to "tailored report".
 *
 * This is a marketing-only visualisation. Numbers and screenshots are
 * representative and labeled as such. The real audit runs at
 * /tools/website-audit.
 */

const SIGNALS = [
  { label: "HTTP", value: "200 · TTFB 312ms · 487KB" },
  { label: "Stack", value: "WordPress + WooCommerce + Cloudflare" },
  { label: "Tracking", value: "GA4, GTM, Meta Pixel" },
  { label: "Security headers", value: "2 of 6 present" },
  { label: "Sitemap", value: "84 URLs" },
  { label: "Lighthouse mobile", value: "perf 64 · a11y 92 · SEO 81" },
  { label: "Real-user CWV", value: "LCP p75 3.2s · CLS 0.08" },
  { label: "Meta Ad Library", value: "3 active ads · UK" },
];

const PAGE_THUMBS = [
  { label: "home", hue: 245 },
  { label: "shop", hue: 215 },
  { label: "contact", hue: 295 },
  { label: "about", hue: 175 },
];

const REPORT_LINES = [
  "[INDUSTRY] E-commerce · Apparel · UK",
  "Signals: WooCommerce, GBP, UK address",
  "[GAPS] Online prescription glasses sales",
  "Eye-test booking widget",
  "Inventory-to-storefront sync",
  "[QUESTIONS] How are prescription orders handled today?",
];

function StreamProgress({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <motion.div
      className="absolute left-0 top-0 h-px bg-accent origin-left"
      style={{ width }}
    />
  );
}

export function ScrollAuditDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Phase windows (0 → 1 across the scroll range)
  // 0.00 → 0.30  collecting signals
  // 0.25 → 0.55  capturing screenshots
  // 0.50 → 0.80  synthesising report
  // 0.78 → 1.00  tailored CTA

  // For each of 8 signals, fade in across staggered windows
  const signalOpacities = SIGNALS.map((_, i) => {
    const start = i * 0.035;
    const end = start + 0.05;
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  });

  const screenshotsBaseOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.35],
    [0, 1]
  );
  const thumbOpacities = PAGE_THUMBS.map((_, i) => {
    const start = 0.3 + i * 0.04;
    const end = start + 0.06;
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  });
  const thumbScales = PAGE_THUMBS.map((_, i) => {
    const start = 0.3 + i * 0.04;
    const end = start + 0.06;
    return useTransform(scrollYProgress, [start, end], [0.9, 1]);
  });

  const reportLineOpacities = REPORT_LINES.map((_, i) => {
    const start = 0.55 + i * 0.035;
    const end = start + 0.05;
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  });

  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.96], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 0.96], [20, 0]);

  // Phase label cycles
  const phaseOpacity = (range: [number, number]) =>
    useTransform(scrollYProgress, range, [0, 1]);
  const phaseFadeOpacity = (range: [number, number]) =>
    useTransform(scrollYProgress, range, [1, 0]);

  const phaseCollecting = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25, 0.32],
    [1, 1, 1, 0]
  );
  const phaseCapturing = useTransform(
    scrollYProgress,
    [0.25, 0.32, 0.5, 0.56],
    [0, 1, 1, 0]
  );
  const phaseSynthesising = useTransform(
    scrollYProgress,
    [0.5, 0.56, 0.78, 0.84],
    [0, 1, 1, 0]
  );
  const phaseComplete = useTransform(
    scrollYProgress,
    [0.78, 0.84, 1, 1],
    [0, 1, 1, 1]
  );

  if (reduce) {
    return (
      <section className="relative py-24 md:py-32 border-t border-rule">
        <Container size="wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <StaticHero />
            <StaticPanel />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: "260vh" }}
      aria-label="How the audit works"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Subtle ambient halo */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
        >
          <div
            className="absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-50"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.72 0.020 240 / 0.20), transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
              backgroundSize: "96px 96px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
        </div>

        <Container size="wide">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
            {/* LEFT — narrative type */}
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute mb-6">
                What our audit actually does
              </p>

              {/* Phase labels stack — only one visible at a time */}
              <div className="relative h-[3.5rem] md:h-[4rem] mb-8">
                <motion.h2
                  style={{ opacity: phaseCollecting }}
                  className="absolute inset-0 font-sans font-medium text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] text-ink leading-tight"
                >
                  Collecting real signals.
                </motion.h2>
                <motion.h2
                  style={{ opacity: phaseCapturing }}
                  className="absolute inset-0 font-sans font-medium text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] text-ink leading-tight"
                >
                  Capturing the visual.
                </motion.h2>
                <motion.h2
                  style={{ opacity: phaseSynthesising }}
                  className="absolute inset-0 font-sans font-medium text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] text-ink leading-tight"
                >
                  Synthesising with vision.
                </motion.h2>
                <motion.h2
                  style={{ opacity: phaseComplete }}
                  className="absolute inset-0 font-sans font-medium text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] text-ink leading-tight"
                >
                  Tailored next steps.
                </motion.h2>
              </div>

              <div className="space-y-4 max-w-md mb-8 text-ink-soft text-base leading-relaxed">
                <motion.p style={{ opacity: phaseCollecting }} className="absolute-overlay">
                  HTTP, headers, stack fingerprint, real Lighthouse,
                  real-user Core Web Vitals, Meta Ad Library presence.
                </motion.p>
                <motion.p style={{ opacity: phaseCapturing }} className="absolute-overlay">
                  We screenshot four key pages and pass them to Claude vision.
                </motion.p>
                <motion.p style={{ opacity: phaseSynthesising }} className="absolute-overlay">
                  Claude infers your industry, surfaces capability gaps vs
                  typical competitors, and generates four bespoke questions.
                </motion.p>
                <motion.p style={{ opacity: phaseComplete }} className="absolute-overlay">
                  You get a tailored next-steps report and an honest answer
                  on whether we&rsquo;re the right fit.
                </motion.p>
              </div>

              <motion.div
                style={{ opacity: ctaOpacity, y: ctaY }}
                className="flex flex-wrap items-center gap-x-6 gap-y-4"
              >
                <Link
                  href="/tools/website-audit"
                  className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors"
                >
                  Run my free audit
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors border-b border-rule hover:border-accent pb-1"
                >
                  <span>See all tools</span>
                  <span aria-hidden>→</span>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT — the audit panel */}
            <div className="relative w-full">
              <div className="absolute -inset-8 rounded-3xl pointer-events-none opacity-60">
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "radial-gradient(50% 45% at 50% 50%, oklch(0.460 0.220 252 / 0.10), transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
              </div>

              <div
                className="relative rounded-xl border border-border-strong overflow-hidden bg-surface"
                style={{
                  boxShadow:
                    "0 28px 70px -22px oklch(0.20 0.020 60 / 0.18), 0 0 0 1px oklch(0.20 0.020 60 / 0.04) inset",
                }}
              >
                {/* Chrome */}
                <div className="relative flex items-center justify-between px-4 py-3 border-b border-border bg-canvas-2/40">
                  <StreamProgress scrollYProgress={scrollYProgress} />
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
                      <span className="relative w-2 h-2 rounded-full bg-accent" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                      Audit · running
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-ink-dim">
                    growth.studio/audit
                  </span>
                </div>

                <div className="p-5 min-h-[420px] md:min-h-[460px]">
                  {/* SIGNALS phase */}
                  <ul className="space-y-2 mb-4">
                    {SIGNALS.map((s, i) => (
                      <motion.li
                        key={s.label}
                        style={{ opacity: signalOpacities[i] }}
                        className="flex items-baseline gap-3 font-mono text-[11px]"
                      >
                        <span className="text-accent shrink-0">✓</span>
                        <span className="text-ink-mute w-[155px] shrink-0 truncate uppercase tracking-[0.12em] text-[10px]">
                          {s.label}
                        </span>
                        <span className="text-ink-soft truncate">
                          {s.value}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* SCREENSHOTS phase */}
                  <motion.div
                    style={{ opacity: screenshotsBaseOpacity }}
                    className="mb-5"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-2">
                      Captured · 4 pages
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {PAGE_THUMBS.map((t, i) => (
                        <motion.div
                          key={t.label}
                          style={{
                            opacity: thumbOpacities[i],
                            scale: thumbScales[i],
                          }}
                          className="rounded-md border border-border bg-canvas-2/60 aspect-[4/3] p-2 flex flex-col"
                        >
                          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-dim mb-1">
                            {t.label}
                          </span>
                          <div className="flex-1 flex flex-col gap-1">
                            <span
                              className="h-1 rounded-full"
                              style={{
                                background: `oklch(0.55 0.05 ${t.hue} / 0.6)`,
                              }}
                            />
                            <span
                              className="h-1 rounded-full w-3/4"
                              style={{
                                background: `oklch(0.55 0.05 ${t.hue} / 0.4)`,
                              }}
                            />
                            <span
                              className="h-1 rounded-full w-1/2"
                              style={{
                                background: `oklch(0.55 0.05 ${t.hue} / 0.3)`,
                              }}
                            />
                            <span className="flex-1" />
                            <span
                              className="h-3 rounded-sm self-end w-1/3"
                              style={{
                                background: `oklch(0.55 0.05 ${t.hue} / 0.5)`,
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* REPORT phase */}
                  <ul className="space-y-1.5">
                    {REPORT_LINES.map((line, i) => {
                      const isHeader = line.startsWith("[");
                      return (
                        <motion.li
                          key={line}
                          style={{ opacity: reportLineOpacities[i] }}
                          className={`font-mono text-[11px] ${
                            isHeader
                              ? "text-accent uppercase tracking-[0.14em] text-[10px] mt-2"
                              : "text-ink-soft pl-3"
                          }`}
                        >
                          {line}
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim mt-4">
                Representative output · run yours for real data
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function StaticHero() {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute mb-6">
        What our audit actually does
      </p>
      <h2 className="font-sans font-medium text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] text-ink leading-tight mb-6">
        Real signals. Real screenshots. Tailored answers.
      </h2>
      <p className="text-ink-soft text-base leading-relaxed max-w-md mb-8">
        HTTP, stack, real-user Core Web Vitals, vision over four
        screenshots, industry-aware gap analysis, and bespoke questions.
        90 seconds.
      </p>
      <Link
        href="/tools/website-audit"
        className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors"
      >
        Run my free audit
      </Link>
    </div>
  );
}

function StaticPanel() {
  return (
    <div className="relative">
      <div className="rounded-xl border border-border-strong bg-canvas-2/70 p-5">
        <ul className="space-y-2 font-mono text-[11px]">
          {SIGNALS.slice(0, 6).map((s) => (
            <li key={s.label} className="flex items-baseline gap-3">
              <span className="text-accent shrink-0">✓</span>
              <span className="text-ink-mute w-[155px] shrink-0 uppercase tracking-[0.12em] text-[10px]">
                {s.label}
              </span>
              <span className="text-ink-soft truncate">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
