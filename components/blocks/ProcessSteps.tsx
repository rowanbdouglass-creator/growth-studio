"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProcessFlow } from "@/components/fx/ProcessFlow";

const steps = [
  {
    n: "01",
    title: "Discover",
    body:
      "We pressure-test your funnel, ad accounts, and operational systems against vertical playbooks. You get a no-fluff report whether or not we end up working together — the audit is free either way.",
    detail:
      "Outputs: a 6-page diagnostic report, 3 highest-leverage opportunities ranked by impact and effort, benchmarks against your vertical.",
  },
  {
    n: "02",
    title: "Build",
    body:
      "Campaigns, conversion systems, internal tooling — whatever is most leveraged for the next 90 days. Built to keep working when we step back, not to keep us on retainer.",
    detail:
      "Outputs: working campaigns or working software, hand-off documentation, training for your team if needed.",
  },
  {
    n: "03",
    title: "Optimise",
    body:
      "Weekly sprints. Every test feeds the next quarter's plan. We don't recycle generic advice — we iterate on what's real for your numbers and your customers.",
    detail:
      "Outputs: weekly digest, monthly retrospective, a quarterly plan that holds up to scrutiny from your board.",
  },
  {
    n: "04",
    title: "Scale",
    body:
      "Once a channel or system compounds, we put it on autopilot and turn to the next bottleneck. The intelligence layer keeps everything sharper over time.",
    detail:
      "Outputs: documented playbooks, automated reporting, a continuous feedback loop that survives team changes.",
  },
];

/**
 * Pinned-scroll choreography. The left column sticks while the right
 * column scrolls. Each step in the right column triggers the left
 * column to update to that step's content. Apple-product-page style.
 *
 * On mobile this degrades to a stacked layout — pinning a left column
 * when the screen is too narrow makes no sense.
 */
export function ProcessSteps() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = stepRefs.current.findIndex((n) => n === e.target);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );
    stepRefs.current.forEach((n) => n && obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const current = steps[active];

  return (
    <section aria-labelledby="process-heading" className="py-24 md:py-32">
      <Container size="wide">
        {/* Flow diagram — gives the section a strong visual moment */}
        <div className="mb-20 md:mb-28">
          <ProcessFlow
            active={active}
            steps={steps.map((s) => ({ n: s.n, title: s.title }))}
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
          {/* PINNED LEFT */}
          <div className="lg:sticky lg:top-32 lg:self-start lg:h-fit">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-6">
              {String(active + 1).padStart(2, "0")} / 04
            </p>

            {/* The display number transitions */}
            <div className="relative h-20 md:h-24 mb-4 overflow-hidden">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: `translateY(${(i - active) * 30}px)`,
                  }}
                >
                  <span className="font-sans font-medium text-ink leading-none tracking-[-0.04em] text-7xl md:text-8xl silver-shine">
                    {s.n}
                  </span>
                </div>
              ))}
            </div>

            <h2
              id="process-heading"
              className="font-sans font-medium text-ink mb-6 leading-[1.05] tracking-[-0.03em] text-4xl md:text-5xl"
            >
              Four steps,{" "}
              <span className="italic-editorial font-normal text-ink-soft">
                repeated honestly.
              </span>
            </h2>

            <div className="relative min-h-[160px]">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    opacity: i === active ? 1 : 0,
                    pointerEvents: i === active ? "auto" : "none",
                    transform: `translateY(${i === active ? 0 : 12}px)`,
                  }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent mb-3">
                    {current.title === s.title ? s.title : s.title}
                  </p>
                  <p className="text-ink-soft leading-relaxed max-w-md">
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SCROLLING RIGHT */}
          <ol className="space-y-16 lg:space-y-32">
            {steps.map((step, i) => (
              <li
                key={step.n}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative pt-8 border-t border-rule"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-6 block">
                  {step.n}
                </span>
                <h3 className="font-sans font-medium text-2xl md:text-3xl text-ink mb-4 leading-tight tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="text-ink-soft leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
