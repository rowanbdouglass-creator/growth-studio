import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { buttonStyles } from "@/components/ui/Button";

interface ToolCTAItem {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

const tools: ToolCTAItem[] = [
  {
    eyebrow: "Free · 5 min",
    title: "Ad Audit",
    description:
      "Connect Meta and Google. We surface 90 days of wastage, quick wins, and benchmarks against your vertical.",
    ctaLabel: "Run my ad audit",
    href: "/tools/ad-audit",
  },
  {
    eyebrow: "Free · 10 min",
    title: "Website & Systems Audit",
    description:
      "Paste your URL. We crawl, screenshot, and run vertical-specific playbooks against your funnel — visual diagnosis, business-model audit.",
    ctaLabel: "Audit my site",
    href: "/tools/website-audit",
  },
];

export function ToolCTASection() {
  return (
    <section
      aria-labelledby="tools-heading"
      className="py-24 md:py-32 bg-surface/30 border-y border-border"
    >
      <Container size="wide">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-6">
            The intelligence layer
          </p>
          <h2
            id="tools-heading"
            className="font-serif text-4xl md:text-5xl font-medium leading-[1.1] text-text-primary"
          >
            Audits that actually find{" "}
            <span className="italic text-text-secondary">the wastage.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mt-6">
            Two free tools built from our own playbooks. Run one before you
            book a call — we'll be able to talk about real numbers, not
            hypotheticals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Card
              key={tool.href}
              as="article"
              variant="elevated"
              className="flex flex-col gap-6 h-full"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {tool.eyebrow}
              </p>
              <h3 className="font-serif text-3xl font-medium text-text-primary">
                {tool.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {tool.description}
              </p>
              <Link
                href={tool.href}
                className={`${buttonStyles({ variant: "primary", size: "md" })} mt-auto self-start`}
              >
                {tool.ctaLabel}
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
