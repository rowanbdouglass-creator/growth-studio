import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/blocks/CTASection";
import { getCaseStudies } from "@/lib/payload/queries";
import { brand } from "@/config/brand";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected case studies from ${brand.name} — operational hubs, conversion systems, and growth engineering for established UK businesses.`,
};

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <section className="py-24 md:py-32 border-b border-border">
        <Container size="wide">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-8">
              Selected work
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
              The receipts,{" "}
              <span className="italic text-text-secondary">in detail.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Each one is a real engagement. Real numbers, real edge cases,
              real reasons the off-the-shelf option didn't fit.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="wide">
          <ul className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((cs) => (
              <li key={cs.id}>
                <Link
                  href={`/work/${cs.slug}`}
                  className="group/card block p-8 md:p-10 rounded-lg border border-border bg-surface hover:border-border-strong hover:bg-surface-elevated transition-colors h-full"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary mb-4">
                    Client · {cs.client}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-medium text-text-primary leading-[1.15] mb-4 group-hover/card:text-accent transition-colors">
                    {cs.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {cs.summary}
                  </p>
                  {cs.technologies && cs.technologies.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mt-auto">
                      {cs.technologies.slice(0, 5).map((t, idx) => (
                        <li
                          key={t.id ?? idx}
                          className="font-mono text-xs px-2 py-1 rounded-sm border border-border text-text-tertiary"
                        >
                          {t.tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
