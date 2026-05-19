import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { CaseStudy } from "@/lib/payload/queries";

interface CaseStudyFeatureProps {
  caseStudy: CaseStudy;
}

export function CaseStudyFeature({ caseStudy }: CaseStudyFeatureProps) {
  return (
    <section className="py-20 md:py-28">
      <Container size="wide">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 items-start">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-6">
              Client · {caseStudy.client}
            </p>

            <h2 className="font-sans font-medium text-ink leading-[1.0] tracking-[-0.035em] text-4xl md:text-5xl lg:text-6xl mb-10 max-w-3xl">
              {caseStudy.title}
            </h2>

            <p className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl mb-10">
              {caseStudy.summary}
            </p>

            <Link
              href={`/work/${caseStudy.slug}`}
              className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors border-b border-rule hover:border-accent pb-1"
            >
              <span>Read the full case study</span>
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="md:pl-12 md:border-l md:border-rule">
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <dl className="space-y-10">
                {caseStudy.metrics.map((m, idx) => (
                  <div key={m.id ?? idx} className="pt-6 border-t border-rule first:border-t-0 first:pt-0">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute mb-3">
                      {m.label}
                    </dt>
                    <dd className="font-sans font-medium text-3xl md:text-4xl text-ink mb-2 leading-none tracking-[-0.025em]">
                      {m.value}
                    </dd>
                    {m.context && (
                      <p className="text-sm text-ink-soft leading-snug">
                        {m.context}
                      </p>
                    )}
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
