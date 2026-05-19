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
      {/*
        Hybrid: editorial restraint (index header, type-driven, big
        breathing room) + one visual moment (subtle mesh + mock
        dashboard on wide screens). Single accent only.
      */}
      <section className="relative isolate pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden">
        <MeshGradient className="anim-hero-bg" />

        <Container size="wide">
          <div className="flex items-center gap-3 mb-12 md:mb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              01 — Growth Studio
            </span>
            <span className="flex-1 h-px bg-rule" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              Est. 2024 · UK
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-12 items-center">
            <div className="anim-hero-entry">
              <h1 className="font-sans font-medium text-ink mb-10 md:mb-12 leading-[0.95] tracking-[-0.04em] text-5xl md:text-7xl lg:text-[7.5rem]">
                Growth, engineered{" "}
                <span className="italic-editorial font-normal text-ink-soft">
                  for the long compound.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed mb-12">
                A two-person studio building paid traffic, custom operational
                systems, and AI tooling for established UK businesses. One
                engagement, one engine — no junior hand-offs, no recycled
                decks.
              </p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/contact"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  Book a discovery call
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors border-b border-rule hover:border-accent pb-1"
                >
                  <span>See selected work</span>
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <MockDashboard />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================= LOGOS ============================= */}
      <LogoGrid />

      {/* ============================= SERVICES ============================= */}
      <ServiceGrid services={services} />

      {/* ============================= FEATURED WORK ============================= */}
      {featuredCaseStudy && <CaseStudyFeature caseStudy={featuredCaseStudy} />}

      {/* ============================= TERMINAL DEMO ============================= */}
      <section className="py-32 md:py-44 border-t border-rule relative overflow-hidden">
        <Container size="wide">
          <div className="flex items-center gap-3 mb-16 md:mb-20">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              04 — The intelligence layer
            </span>
            <span className="flex-1 h-px bg-rule" />
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
            <div className="anim-reveal">
              <h2 className="font-sans font-medium text-ink mb-10 leading-[0.98] tracking-[-0.035em] text-5xl md:text-6xl lg:text-7xl max-w-3xl">
                Audits that find{" "}
                <span className="italic-editorial font-normal text-ink-soft">
                  what consultants miss.
                </span>
              </h2>
              <p className="text-lg text-ink-soft leading-relaxed max-w-md mb-8">
                Every prospect's ad account, website, and ops stack runs
                through our internal CLI before the first call. You'll never
                sit through a generic pitch.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors border-b border-rule hover:border-accent pb-1 w-fit"
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

      {/* ============================= TOOLS ============================= */}
      <ToolCTASection />

      {/* ============================= STATS ============================= */}
      <StatRow />

      {/* ============================= PROCESS ============================= */}
      <ProcessSteps />

      {/* ============================= TESTIMONIAL ============================= */}
      {featuredTestimonial && <Testimonial testimonial={featuredTestimonial} />}

      {/* ============================= CTA ============================= */}
      <CTASection />
    </>
  );
}
