import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HubMockup } from "@/components/fx/HubMockup";
import type { CaseStudy } from "@/lib/payload/queries";

interface CaseStudyFeatureProps {
  caseStudy: CaseStudy;
}

export function CaseStudyFeature({ caseStudy }: CaseStudyFeatureProps) {
  return (
    <section className="py-20 md:py-28">
      <Container size="wide">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT, copy */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-6">
              Client · {caseStudy.client}
            </p>

            <h2 className="font-sans font-medium text-ink leading-[1.05] tracking-[-0.035em] text-3xl md:text-4xl lg:text-5xl mb-8 max-w-2xl">
              {caseStudy.title}
            </h2>

            <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-xl mb-10">
              {caseStudy.summary}
            </p>

            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <dl className="grid grid-cols-3 gap-6 mb-10 max-w-xl">
                {caseStudy.metrics.slice(0, 3).map((m, idx) => (
                  <div key={m.id ?? idx} className="pt-4 border-t border-rule">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute mb-2">
                      {m.label}
                    </dt>
                    <dd
                      className="font-sans font-medium text-2xl text-ink leading-none mb-1 tracking-tight"
                      style={{ fontFeatureSettings: "'tnum'" }}
                    >
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <Link
              href={`/work/${caseStudy.slug}`}
              className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors border-b border-rule hover:border-accent pb-1"
            >
              <span>Read the full case study</span>
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* RIGHT, animated hub mockup */}
          <div>
            <HubMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
