import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { MeshGradient } from "@/components/fx/MeshGradient";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { MockDashboard } from "@/components/fx/MockDashboard";
import { AnimatedTerminal } from "@/components/fx/AnimatedTerminal";
import { LogoGrid } from "@/components/blocks/LogoGrid";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { CaseStudyFeature } from "@/components/blocks/CaseStudyCard";
import { ToolCTASection } from "@/components/blocks/ToolCTA";
import { StatRow } from "@/components/blocks/StatBlock";
import { ProcessSteps } from "@/components/blocks/ProcessSteps";
import { Testimonial } from "@/components/blocks/Testimonial";
import { CTASection } from "@/components/blocks/CTASection";
import {
  getServices,
  getFeaturedCaseStudy,
  getFeaturedTestimonial,
} from "@/lib/payload/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [services, featuredCaseStudy, featuredTestimonial] = await Promise.all([
    getServices(),
    getFeaturedCaseStudy(),
    getFeaturedTestimonial(),
  ]);

  return (
    <>
      <CursorGlow />

      {/* ============================= HERO ============================= */}
      <section className="relative isolate pt-20 md:pt-28 pb-24 md:pb-32 overflow-hidden">
        <MeshGradient className="anim-hero-bg" />

        <Container size="wide">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-12 items-center">
            <div className="anim-hero-entry">
              {/* Live status pill */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border-strong bg-canvas-2/60 backdrop-blur-md mb-10">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald animate-ping opacity-75" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-emerald" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  Now booking · Q3 2026
                </span>
              </div>

              {/* Display headline — mixed type lockup */}
              <h1 className="font-display font-medium text-ink mb-8 leading-[0.92] tracking-[-0.04em] text-6xl md:text-7xl lg:text-[7.5rem]">
                Compound{" "}
                <span
                  className="italic-editorial font-normal text-ink-soft"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  growth.
                </span>
                <br />
                <span className="text-ink-mute">Engineered, not</span>
                <br />
                <span className="text-ink">guessed.</span>
              </h1>

              <p className="text-lg md:text-xl text-ink-soft max-w-xl leading-relaxed mb-10">
                A two-person growth studio combining{" "}
                <span className="text-amber">paid traffic</span>,{" "}
                <span className="text-indigo">custom operational systems</span>,
                and an{" "}
                <span className="text-magenta">AI intelligence layer</span> for
                established UK businesses ready to scale.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  href="/tools/website-audit"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  Run a free audit
                  <span aria-hidden className="ml-1">↗</span>
                </Link>
                <Link
                  href="/work"
                  className={buttonStyles({ variant: "secondary", size: "lg" })}
                >
                  See the work
                </Link>
              </div>

              {/* Three-pillar callout row */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-lg pt-8 border-t border-border">
                {[
                  { label: "Paid", color: "bg-amber", text: "text-amber" },
                  { label: "Systems", color: "bg-indigo", text: "text-indigo" },
                  { label: "Intel", color: "bg-magenta", text: "text-magenta" },
                ].map((p, i) => (
                  <div key={p.label}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${p.color}`} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                        0{i + 1}
                      </span>
                    </div>
                    <p className={`font-display text-xl ${p.text}`}>{p.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <MockDashboard />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================= LOGO GRID ============================= */}
      <LogoGrid />

      {/* ============================= TERMINAL DEMO ============================= */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <MeshGradient className="opacity-30" />
        <Container size="wide">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
            <div className="anim-reveal">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-magenta mb-6">
                The intelligence layer · live
              </p>
              <h2 className="font-display font-medium text-ink mb-8 leading-[0.95] tracking-[-0.035em] text-5xl md:text-6xl lg:text-7xl">
                Audits that{" "}
                <span
                  className="italic-editorial font-normal text-magenta"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  find what
                </span>{" "}
                consultants miss.
              </h2>
              <p className="text-lg text-ink-soft leading-relaxed max-w-md mb-8">
                Every prospect's ad account, website, and ops stack runs through
                our internal CLI before the first call. You'll never sit through
                a generic pitch.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-ink font-medium border-b border-border-strong hover:border-magenta hover:text-magenta transition-colors pb-1"
              >
                <span>See all tools</span>
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="anim-reveal">
              <AnimatedTerminal
                lines={[
                  {
                    text: "growth audit https://client.co.uk --90d",
                    output:
                      "▸ scanning Meta + Google ad accounts...\n▸ pulling 90d of spend, impressions, conversions\n✓ £4,832/mo wastage detected across 11 campaigns",
                  },
                  {
                    text: "growth audit --suggest-wins",
                    output:
                      "▸ ranking opportunities by impact / effort\n✓ 3 quick wins · projected ROAS lift 1.6×",
                  },
                  {
                    text: "growth report --send",
                    output: "✓ report sent to rowan@youlookbooked.com",
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================= SERVICES ============================= */}
      <ServiceGrid services={services} />

      {/* ============================= FEATURED CASE STUDY ============================= */}
      {featuredCaseStudy && <CaseStudyFeature caseStudy={featuredCaseStudy} />}

      {/* ============================= TOOL CTAS ============================= */}
      <ToolCTASection />

      {/* ============================= STATS ============================= */}
      <StatRow />

      {/* ============================= PROCESS ============================= */}
      <ProcessSteps />

      {/* ============================= TESTIMONIAL ============================= */}
      {featuredTestimonial && <Testimonial testimonial={featuredTestimonial} />}

      {/* ============================= FINAL CTA ============================= */}
      <CTASection />
    </>
  );
}
