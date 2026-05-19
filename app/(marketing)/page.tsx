import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
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
import { brand } from "@/config/brand";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [services, featuredCaseStudy, featuredTestimonial] = await Promise.all([
    getServices(),
    getFeaturedCaseStudy(),
    getFeaturedTestimonial(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center py-24 md:py-36 lg:py-44 overflow-hidden">
        {/* Subtle background gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at top left, oklch(0.22 0.06 50 / 0.35), transparent 50%), radial-gradient(ellipse at bottom right, oklch(0.22 0.03 280 / 0.4), transparent 55%)",
          }}
        />

        <Container size="wide">
          <div className="max-w-4xl">
            <Badge variant="accent" className="mb-8">
              {brand.tagline}
            </Badge>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
              A growth studio for businesses{" "}
              <span className="italic text-text-secondary">
                ready to scale.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12">
              Paid traffic that performs. Custom operational systems that
              compound. An intelligence layer that makes both smarter every
              quarter.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/tools/website-audit"
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                Run a free audit
              </Link>
              <Link
                href="/work"
                className={buttonStyles({ variant: "secondary", size: "lg" })}
              >
                See our work
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <LogoGrid />

      <ServiceGrid services={services} />

      {featuredCaseStudy && <CaseStudyFeature caseStudy={featuredCaseStudy} />}

      <ToolCTASection />

      <StatRow />

      <ProcessSteps />

      {featuredTestimonial && <Testimonial testimonial={featuredTestimonial} />}

      <CTASection />
    </>
  );
}
