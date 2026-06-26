import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { MeshGradient } from "@/components/fx/MeshGradient";
import { AIAuditDemo } from "@/components/fx/AIAuditDemo";
import { AnimatedTerminal } from "@/components/fx/AnimatedTerminal";
import { Tilt3D } from "@/components/fx/Tilt3D";
import { Magnetic } from "@/components/fx/Magnetic";
import { HeroSceneLazy } from "@/components/fx/HeroSceneLazy";
import { EditorialInterstitial } from "@/components/blocks/EditorialInterstitial";
import { ChromeInterstitial } from "@/components/blocks/ChromeInterstitial";
import { SectionMarker } from "@/components/blocks/SectionMarker";
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
      <section className="relative isolate pt-12 md:pt-16 pb-24 md:pb-32 min-h-[100dvh] flex flex-col justify-center">
        <div aria-hidden className="absolute inset-0 overflow-hidden -z-10">
          <MeshGradient className="anim-hero-bg" />
          <div
            className="hidden md:block absolute inset-0 opacity-50"
            style={{ filter: "blur(20px) saturate(1.1)" }}
          >
            <HeroSceneLazy />
          </div>
        </div>

        <Container size="wide">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="anim-hero-entry">
              <h1 className="font-sans font-medium text-ink leading-[1.18] tracking-[-0.035em] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 pb-4">
                Find out what your last agency{" "}
                <span className="italic-editorial font-normal silver-shine">
                  missed.
                </span>
              </h1>

              <p className="text-base md:text-lg text-ink-soft max-w-xl leading-relaxed mb-10">
                A two-person studio rebuilding paid traffic, custom operations
                systems, and the intelligence layer between them. Run our free
                audit on your site and see the gap in 90 seconds.
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

      {/* On mobile + tablet the AI demo gets its own dedicated section */}
      <section className="lg:hidden py-16 px-6 border-t border-rule">
        <div className="max-w-xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-4 text-center">
            Try the audit
          </p>
          <AIAuditDemo />
        </div>
      </section>

      {/* ============================ LOGOS ============================ */}
      <section>
        <LogoGrid />
      </section>

      {/* ============================ SERVICES ============================ */}
      <section className="relative">
        <ServiceGrid services={services} />
      </section>

      <EditorialInterstitial
        beats={["Real systems.", "Real numbers.", "Real follow-through."]}
      />

      {/* ============================ FEATURED WORK ============================ */}
      {featuredCaseStudy && (
        <section className="relative py-20 md:py-32">
          <CaseStudyFeature caseStudy={featuredCaseStudy} />
        </section>
      )}

      <ChromeInterstitial
        headline="We build the systems"
        emphasis="your team will still use in 3 years."
        caption="Custom operations · 8 yrs · WP, WC, Next.js"
      />

      {/* ============================ INTELLIGENCE / TERMINAL ============================ */}
      <section className="relative py-20 md:py-32">
        <Container size="wide">
          <SectionMarker label="The intelligence layer" />

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center mt-16">
            <div className="anim-reveal-lg">
              <h2 className="font-sans font-medium text-ink mb-8 leading-[1.2] tracking-[-0.03em] text-4xl md:text-5xl lg:text-6xl max-w-2xl pb-4">
                We audit your stack{" "}
                <span className="italic-editorial font-normal silver-shine">
                  before we open our mouths.
                </span>
              </h2>
              <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md mb-8">
                Every prospect&rsquo;s account, website, and ops stack runs
                through our internal CLI before the first call. You&rsquo;ll
                never sit through a generic pitch.
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
              <Tilt3D maxTilt={5}>
                <AnimatedTerminal
                  lines={[
                    {
                      text: "growth audit https://your-store.co.uk",
                      output:
                        "▸ scanning site, headers, security\n▸ pulling Meta Ad Library + CrUX\n▸ screenshotting 4 key pages",
                    },
                    {
                      text: "growth audit --score",
                      output:
                        "▸ Lighthouse mobile · perf 64 · a11y 92 · SEO 81\n▸ 6 capability gaps mapped to industry\n▸ 4 bespoke questions queued",
                    },
                    {
                      text: "growth report --send",
                      output: "✓ report ready · book a discovery call to walk through it",
                    },
                  ]}
                />
              </Tilt3D>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim mt-3">
                Example output. Run yours at /tools/website-audit.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================ TOOLS ============================ */}
      <section className="relative py-20 md:py-32">
        <ToolCTASection />
      </section>

      {/* ============================ STATS ============================ */}
      <section className="relative py-20 md:py-32">
        <StatRow />
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="relative py-20 md:py-32">
        <ProcessSteps />
      </section>

      {featuredTestimonial && (
        <section className="relative py-20 md:py-32">
          <Testimonial testimonial={featuredTestimonial} />
        </section>
      )}

      {/* ============================ CTA ============================ */}
      <section className="relative py-20 md:py-32">
        <CTASection />
      </section>
    </>
  );
}
