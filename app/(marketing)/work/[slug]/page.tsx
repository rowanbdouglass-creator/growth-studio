import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { CTASection } from "@/components/blocks/CTASection";
import { RichText } from "@/lib/lexical/RichText";
import {
  getCaseStudyBySlug,
  getCaseStudies,
} from "@/lib/payload/queries";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: cs.seo?.title ?? cs.title,
    description: cs.seo?.description ?? cs.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const allStudies = await getCaseStudies();
  const others = allStudies.filter((s) => s.slug !== cs.slug).slice(0, 3);

  return (
    <>
      <section className="py-24 md:py-32 border-b border-border">
        <Container size="wide">
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary hover:text-accent transition-colors mb-8 inline-block"
          >
            ← All case studies
          </Link>
          <Badge variant="accent" className="mb-6">
            Case study · {cs.client}
          </Badge>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] text-text-primary mb-8 tracking-tight max-w-4xl">
            {cs.title}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
            {cs.summary}
          </p>

          {cs.metrics && cs.metrics.length > 0 && (
            <dl className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-border">
              {cs.metrics.map((m, idx) => (
                <div key={m.id ?? idx}>
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary mb-3">
                    {m.label}
                  </dt>
                  <dd className="font-serif text-3xl md:text-4xl text-text-primary mb-1 leading-none">
                    {m.value}
                  </dd>
                  {m.context && (
                    <p className="text-sm text-text-secondary leading-snug mt-2">
                      {m.context}
                    </p>
                  )}
                </div>
              ))}
            </dl>
          )}
        </Container>
      </section>

      <section className="py-24">
        <Container size="default">
          <div className="space-y-16">
            {cs.problem ? (
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-6">
                  01 · The problem
                </p>
                <RichText data={cs.problem} className="text-lg" />
              </div>
            ) : null}
            {cs.approach ? (
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-6">
                  02 · Our approach
                </p>
                <RichText data={cs.approach} className="text-lg" />
              </div>
            ) : null}
            {cs.outcome ? (
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-6">
                  03 · Outcome
                </p>
                <RichText data={cs.outcome} className="text-lg" />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {cs.technologies && cs.technologies.length > 0 && (
        <section className="py-16 border-t border-border">
          <Container size="default">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary mb-6">
              Built with
            </p>
            <ul className="flex flex-wrap gap-3">
              {cs.technologies.map((t, idx) => (
                <li
                  key={t.id ?? idx}
                  className="font-mono text-sm px-3 py-1.5 rounded-sm border border-border text-text-secondary"
                >
                  {t.tech}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {others.length > 0 && (
        <section className="py-24 border-t border-border bg-surface/30">
          <Container size="wide">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-8">
              More work
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((o) => (
                <Link
                  key={o.id}
                  href={`/work/${o.slug}`}
                  className="block p-8 rounded-lg border border-border bg-background hover:border-border-strong hover:bg-surface-elevated transition-colors group/card"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary mb-3">
                    {o.client}
                  </p>
                  <h3 className="font-serif text-xl text-text-primary leading-tight group-hover/card:text-accent transition-colors">
                    {o.title}
                  </h3>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
