import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { buttonStyles } from "@/components/ui/Button";
import { CTASection } from "@/components/blocks/CTASection";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Tools",
  description: `Free audit tools from ${brand.name} that surface real wastage and quick wins in your ads, website, and operational systems.`,
};

const tools = [
  {
    slug: "ad-audit",
    title: "Ad Audit",
    eyebrow: "Free · 5 minutes",
    description:
      "Connect Meta and Google. We surface 90 days of wastage, quick wins, and benchmarks against your vertical.",
    status: "Coming soon",
  },
  {
    slug: "website-audit",
    title: "Website & Systems Audit",
    eyebrow: "Free · 10 minutes",
    description:
      "Paste your URL. We crawl, screenshot, and run vertical-specific playbooks against your funnel, visual diagnosis, business-model audit.",
    status: "Coming soon",
  },
  {
    slug: "discovery-hub",
    title: "Discovery Hub",
    eyebrow: "Per engagement",
    description:
      "AI-transcribed strategy notes, proposal cards, and embedded Q&A. The thinking compounds across every meeting.",
    status: "Available with engagements",
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="py-24 md:py-32 border-b border-border">
        <Container size="wide">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-8">
              The intelligence layer
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
              Tools we built{" "}
              <span className="italic text-text-secondary">for ourselves first.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              We run every prospect's account through these before discovery
              calls. Now you can run them yourself, free, no strings.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card
                key={tool.slug}
                as="article"
                variant="default"
                className="flex flex-col gap-5 h-full hover:border-border-strong hover:bg-surface-elevated transition-colors"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {tool.eyebrow}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-text-primary">
                  {tool.title}
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {tool.description}
                </p>
                <p className="font-mono text-xs text-text-tertiary uppercase tracking-[0.14em] mt-2">
                  {tool.status}
                </p>
                <Link
                  href={`/tools/${tool.slug}`}
                  className={`${buttonStyles({ variant: "secondary", size: "md" })} mt-auto self-start`}
                >
                  Read more
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
