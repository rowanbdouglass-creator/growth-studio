import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { AIAuditDemo } from "@/components/fx/AIAuditDemo";
import { Magnetic } from "@/components/fx/Magnetic";
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
      <section className="relative isolate pt-16 md:pt-20 pb-24 md:pb-32 min-h-[100dvh] flex flex-col justify-center">
        {/* Subtle ambient background, no WebGL chrome */}
        <div aria-hidden className="absolute inset-0 overflow-hidden -z-10">
          <div
            className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-50"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.72 0.020 240 / 0.18), transparent 65%)",
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
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center">
            <div className="anim-hero-entry">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute mb-8">
                A growth studio for UK SMEs
              </p>

              <h1 className="font-sans font-medium text-ink leading-[1.05] tracking-[-0.04em] text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] mb-10 pb-4">
                Find out what your last agency missed.
              </h1>

              <p className="text-base md:text-lg text-ink-soft max-w-xl leading-relaxed mb-12">
                We rebuild paid traffic, custom operations systems, and the
                intelligence layer between them. Paste your URL on the right.
                We&rsquo;ll show you the gap in 90 seconds.
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
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
                  className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors border-b border-rule hover:border-accent pb-1"
                >
                  <span>See selected work</span>
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <AIAuditDemo />
            </div>
          </div>
        </Container>
      </section>

      {/* Audit demo gets its own section on mobile + tablet */}
      <section className="lg:hidden py-16 px-6 border-t border-rule">
        <div className="max-w-xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-4 text-center">
            Try the audit
          </p>
          <AIAuditDemo />
        </div>
      </section>

      {/* ============================ LOGOS ============================ */}
      <section className="border-t border-rule">
        <LogoGrid />
      </section>

      {/* ============================ SERVICES ============================ */}
      <section className="relative">
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
