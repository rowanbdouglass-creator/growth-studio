import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { AIAuditDemo } from "@/components/fx/AIAuditDemo";
import { Magnetic } from "@/components/fx/Magnetic";
import { KineticHeadline } from "@/components/fx/KineticHeadline";
import { ScrollAuditDemo } from "@/components/blocks/ScrollAuditDemo";
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
      {/* ============================ HERO ============================ */}
      <section className="relative isolate pt-20 md:pt-28 pb-16 md:pb-20">
        <div aria-hidden className="absolute inset-0 overflow-hidden -z-10">
          <div
            className="absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-60"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.460 0.220 252 / 0.10), transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.20 0.020 60 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(0.20 0.020 60 / 0.6) 1px, transparent 1px)",
              backgroundSize: "96px 96px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
        </div>

        <Container size="wide">
          <div className="grid lg:grid-cols-[1fr_auto] gap-x-12 gap-y-6 items-end mb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
              A growth studio for UK SMEs
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim hidden lg:block">
              Est. 2024 · Two operators · No middle layer
            </p>
          </div>

          {/* MASSIVE HEADLINE — full width */}
          <div className="max-w-[1400px]">
            <KineticHeadline
              lead="Find out what your last agency"
              emphasis="missed."
            />
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start mt-12">
            <div>
              <p className="text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed mb-12">
                We rebuild paid traffic, custom operations systems, and the
                intelligence layer between them. Run our audit. We&rsquo;ll
                show you the gap in 90 seconds.
              </p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Magnetic>
                  <Link
                    href="/tools/website-audit"
                    className={buttonStyles({ variant: "primary", size: "lg" })}
                  >
                    Run my free audit
                  </Link>
                </Magnetic>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors border-b-2 border-rule hover:border-accent pb-1 text-base"
                >
                  <span>See selected work</span>
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <AIAuditDemo />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================ LOGOS ============================ */}
      <section className="border-t border-rule">
        <LogoGrid />
      </section>

      {/* ============================ SCROLL-PINNED AUDIT WALKTHROUGH ============================ */}
      <ScrollAuditDemo />

      {/* ============================ SERVICES ============================ */}
      <section className="relative border-t border-rule">
        <ServiceGrid services={services} />
      </section>

      {/* ============================ FEATURED WORK ============================ */}
      {featuredCaseStudy && (
        <section className="relative py-20 md:py-32 border-t border-rule">
          <CaseStudyFeature caseStudy={featuredCaseStudy} />
        </section>
      )}

      {/* ============================ TOOLS ============================ */}
      <section className="relative py-20 md:py-32 border-t border-rule">
        <ToolCTASection />
      </section>

      {/* ============================ STATS ============================ */}
      <section className="relative py-20 md:py-32 border-t border-rule">
        <StatRow />
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="relative py-20 md:py-32 border-t border-rule">
        <ProcessSteps />
      </section>

      {featuredTestimonial && (
        <section className="relative py-20 md:py-32 border-t border-rule">
          <Testimonial testimonial={featuredTestimonial} />
        </section>
      )}

      {/* ============================ CTA ============================ */}
      <section className="relative py-20 md:py-32 border-t border-rule">
        <CTASection />
      </section>
    </>
  );
}
