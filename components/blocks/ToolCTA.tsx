import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ToolPreview } from "@/components/fx/ToolPreview";

interface ToolCTAItem {
  number: string;
  status: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  variant: "ad" | "site";
}

const tools: ToolCTAItem[] = [
  {
    number: "01",
    status: "Free · 5 min",
    title: "Ad Audit",
    description:
      "Connect Meta and Google. We surface 90 days of wastage, three quick wins, and benchmarks against your vertical.",
    ctaLabel: "Run my ad audit",
    href: "/tools/ad-audit",
    variant: "ad",
  },
  {
    number: "02",
    status: "Free · 10 min",
    title: "Website & Systems Audit",
    description:
      "Paste your URL. We crawl, screenshot, and run vertical playbooks against your funnel — visual diagnosis plus business-model audit.",
    ctaLabel: "Audit my site",
    href: "/tools/website-audit",
    variant: "site",
  },
];

export function ToolCTASection() {
  return (
    <section
      aria-labelledby="tools-heading"
      className="py-24 md:py-32"
    >
      <Container size="wide">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 mb-16 items-end">
          <h2
            id="tools-heading"
            className="font-sans font-medium text-ink leading-[1.05] tracking-[-0.035em] text-5xl md:text-6xl lg:text-7xl max-w-3xl"
          >
            Audits that find{" "}
            <span className="italic-editorial font-normal text-ink-soft">
              what consultants miss.
            </span>
          </h2>
          <p className="text-lg text-ink-soft leading-relaxed max-w-md">
            Two free tools built from our own playbooks. Run one before
            you book — we'll talk about real numbers, not hypotheticals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-10">
          {tools.map((tool) => (
            <article
              key={tool.href}
              className="anim-reveal pt-8 border-t border-rule flex flex-col gap-6"
            >
              {/* Live mock preview of the tool's UI */}
              <ToolPreview variant={tool.variant} />

              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  {tool.number}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {tool.status}
                </span>
              </div>

              <h3 className="font-sans font-medium text-3xl md:text-4xl text-ink leading-[1.05] tracking-[-0.025em]">
                {tool.title}
              </h3>

              <p className="text-ink-soft leading-relaxed max-w-md">
                {tool.description}
              </p>

              <Link
                href={tool.href}
                className="mt-auto pt-4 inline-flex items-center gap-2 text-ink hover:text-accent transition-colors w-fit"
              >
                <span>{tool.ctaLabel}</span>
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
