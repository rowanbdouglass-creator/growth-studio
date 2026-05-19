import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { CaseStudy } from "@/lib/payload/queries";

interface CaseStudyFeatureProps {
  caseStudy: CaseStudy;
}

/**
 * Editorial-feel featured case study block — large, full-width.
 * For grid usage, see CaseStudyCard.
 */
export function CaseStudyFeature({ caseStudy }: CaseStudyFeatureProps) {
  return (
    <section className="py-24 md:py-32">
      <Container size="wide">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-6">
          Featured work
        </p>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] text-text-primary mb-8">
              {caseStudy.title}
            </h2>

            <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary mb-4">
              Client · {caseStudy.client}
            </p>

            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              {caseStudy.summary}
            </p>

            <Link
              href={`/work/${caseStudy.slug}`}
              className="inline-flex items-center gap-2 text-text-primary group/link"
            >
              <span className="border-b border-border-strong group-hover/link:border-accent group-hover/link:text-accent transition-colors">
                Read the full case study
              </span>
              <span
                aria-hidden
                className="text-accent transition-transform duration-200 group-hover/link:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <div>
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <dl className="space-y-8 border-l border-border-strong pl-8">
                {caseStudy.metrics.map((m, idx) => (
                  <div key={m.id ?? idx}>
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary mb-2">
                      {m.label}
                    </dt>
                    <dd className="font-serif text-3xl md:text-4xl text-text-primary mb-1 leading-none">
                      {m.value}
                    </dd>
                    {m.context && (
                      <p className="text-sm text-text-secondary leading-snug">
                        {m.context}
                      </p>
                    )}
                  </div>
                ))}
              </dl>
            )}

            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <div className="mt-10">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary mb-3">
                  Built with
                </p>
                <ul className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((t, idx) => (
                    <li
                      key={t.id ?? idx}
                      className="font-mono text-xs px-2 py-1 rounded-sm border border-border text-text-secondary"
                    >
                      {t.tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
