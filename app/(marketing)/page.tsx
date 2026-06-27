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
      <section className="relative isolate pt-16 md:pt-24 pb-20 md:pb-28 flex flex-col justify-center min-h-[calc(100dvh-4rem)]">
        <div aria-hidden className="absolute inset-0 overflow-hidden -z-10">
          <div
            className="absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-60"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.460 0.220 252 / 0.10), transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
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
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute mb-8">
                A growth studio for UK SMEs
              </p>

              <KineticHeadline
                lead="Find out what your last agency"
                emphasis="missed."
              />

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

      {/* ============================ SCROLL-PINNED AUDIT WALKTHROUGH ============================ */}
      <ScrollAuditDemo />

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
