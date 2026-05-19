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

      {/* ============================ 01 HERO ============================ */}
      <section className="snap-section relative isolate overflow-hidden">
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

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="anim-hero-entry">
              <h1 className="font-sans font-medium text-ink leading-[1.0] tracking-[-0.035em] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8">
                Growth, engineered{" "}
                <span className="italic-editorial font-normal silver-shine">
                  for the long compound.
                </span>
              </h1>

              <p className="text-base md:text-lg text-ink-soft max-w-xl leading-relaxed mb-10">
                A two-person studio building paid traffic, custom operational
                systems, and AI tooling for established UK businesses. One
                engagement, one engine.
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
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

          <div className="hidden lg:flex items-center gap-3 mt-16 md:mt-24 text-ink-mute">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
              Scroll
            </span>
            <span aria-hidden className="text-accent">↓</span>
          </div>
        </Container>
      </section>

      {/* ============================ LOGOS ============================ */}
      <section className="snap-section snap-section--auto">
        <LogoGrid />
      </section>

      {/* ============================ 02 SERVICES ============================ */}
      <section className="snap-section relative">
        <ServiceGrid services={services} />
      </section>

      {/* ============================ 03 FEATURED WORK ============================ */}
      {featuredCaseStudy && (
        <section className="snap-section relative">
          <CaseStudyFeature caseStudy={featuredCaseStudy} />
        </section>
      )}

      {/* ============================ 04 INTELLIGENCE / TERMINAL ============================ */}
      <section className="snap-section relative overflow-hidden">
        <Container size="wide">
          <div className="flex items-center gap-3 mb-12 md:mb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              04 — The intelligence layer
            </span>
            <span className="flex-1 h-px bg-rule" />
          </div>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="anim-reveal-lg">
              <h2 className="font-sans font-medium text-ink mb-8 leading-[1.05] tracking-[-0.03em] text-4xl md:text-5xl lg:text-6xl max-w-2xl">
                Audits that find{" "}
                <span className="italic-editorial font-normal silver-shine">
                  what consultants miss.
                </span>
              </h2>
              <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md mb-8">
                Every prospect's account, website, and ops stack runs through
                our internal CLI before the first call. You'll never sit
                through a generic pitch.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors border-b border-rule hover:border-accent pb-1 w-fit"
              >
                <span>See all tools</span>
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="anim-reveal-lg">
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

      {/* ============================ 05 TOOLS ============================ */}
      <section className="snap-section relative">
        <ToolCTASection />
      </section>

      {/* ============================ 06 STATS ============================ */}
      <section className="snap-section relative">
        <StatRow />
      </section>

      {/* ============================ 07 PROCESS ============================ */}
      <section className="snap-section relative">
        <ProcessSteps />
      </section>

      {/* ============================ 08 TESTIMONIAL ============================ */}
      {featuredTestimonial && (
        <section className="snap-section relative">
          <Testimonial testimonial={featuredTestimonial} />
        </section>
      )}

      {/* ============================ 09 CTA ============================ */}
      <section className="snap-section relative">
        <CTASection />
      </section>
    </>
  );
}
