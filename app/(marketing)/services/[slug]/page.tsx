import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { CTASection } from "@/components/blocks/CTASection";
import { RichText } from "@/lib/lexical/RichText";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/jsonLd";
import { getServiceBySlug, getServices } from "@/lib/payload/queries";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const pillarLabel = {
  "paid-growth": "Pillar · Paid Growth",
  "custom-systems": "Pillar · Custom Systems",
  "intelligence-layer": "Pillar · Intelligence Layer",
} as const;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seo?.title ?? service.title,
    description: service.seo?.description ?? service.summary,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const allServices = await getServices();
  const otherServices = allServices.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ])}
      />
      <section className="py-24 md:py-32 border-b border-border">
        <Container size="wide">
          <Link
            href="/services"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary hover:text-accent transition-colors mb-8 inline-block"
          >
            ← All services
          </Link>
          <Badge variant="accent" className="mb-6">
            {pillarLabel[service.pillar]}
          </Badge>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
            {service.summary}
          </p>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-16">
            <div>
              {service.description ? (
                <div className="mb-12">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-6">
                    The approach
                  </p>
                  <RichText data={service.description} className="text-lg" />
                </div>
              ) : null}

              {service.idealClient && (
                <div className="mb-12 p-8 rounded-lg border border-border bg-surface">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-4">
                    Ideal client
                  </p>
                  <p className="text-text-primary text-lg leading-relaxed">
                    {service.idealClient}
                  </p>
                </div>
              )}
            </div>

            <aside className="md:sticky md:top-24 self-start space-y-10">
              {service.capabilities && service.capabilities.length > 0 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary mb-4">
                    Capabilities
                  </p>
                  <ul className="space-y-3">
                    {service.capabilities.map((c, idx) => (
                      <li
                        key={c.id ?? idx}
                        className="text-text-secondary flex gap-2"
                      >
                        <span className="text-accent">·</span>
                        <span>{c.capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.pricing && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary mb-4">
                    Engagement
                  </p>
                  <p className="font-serif text-xl text-text-primary leading-snug">
                    {service.pricing}
                  </p>
                </div>
              )}

              <Link
                href="/contact"
                className={`${buttonStyles({ variant: "primary", size: "md" })} w-full`}
              >
                Start a conversation
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      {otherServices.length > 0 && (
        <section className="py-24 border-t border-border bg-surface/30">
          <Container size="wide">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-8">
              Other pillars
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="block p-8 rounded-lg border border-border bg-background hover:border-border-strong hover:bg-surface-elevated transition-colors group/card"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary mb-3">
                    {pillarLabel[s.pillar]}
                  </p>
                  <h3 className="font-serif text-2xl text-text-primary mb-3 group-hover/card:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {s.summary}
                  </p>
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
