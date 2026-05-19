import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { CTASection } from "@/components/blocks/CTASection";

export const metadata: Metadata = {
  title: "Website & Systems Audit · Free crawl + visual diagnosis",
  description:
    "Paste your URL. We crawl, screenshot, and run our vertical-specific playbook against your funnel and operational stack. A real audit, not a Lighthouse report.",
};

const findings = [
  {
    label: "Conversion engineering",
    body: "Where users drop off, what's broken on mobile, which CTAs are pulling weight and which aren't.",
  },
  {
    label: "Funnel speed",
    body: "Real LCP/INP/CLS plus what specifically is dragging them down. We test on actual hardware, not server-side averages.",
  },
  {
    label: "Vertical playbook",
    body: "We check against the patterns we know work in your industry — embroidery, opticians, fashion, bookings — not generic SEO checklists.",
  },
  {
    label: "Systems audit",
    body: "Where the operational pain hides: checkout, support, fulfilment integration, staff workflows. Engineering-grade observations.",
  },
];

export default function WebsiteAuditPage() {
  return (
    <>
      <section className="py-24 md:py-32 border-b border-border">
        <Container size="wide">
          <Link
            href="/tools"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary hover:text-accent transition-colors mb-8 inline-block"
          >
            ← All tools
          </Link>
          <Badge variant="accent" className="mb-6">
            Tool · Free · 10 minutes
          </Badge>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
            What's actually{" "}
            <span className="italic text-text-secondary">leaking?</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12">
            Paste your URL. We crawl, screenshot, and run our vertical-specific
            playbook against your site and the operational stack behind it.
            A real audit, not a Lighthouse report.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container size="default">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-8">
                What you get
              </p>
              <dl className="space-y-8">
                {findings.map((f) => (
                  <div key={f.label}>
                    <dt className="font-serif text-xl text-text-primary mb-2">
                      {f.label}
                    </dt>
                    <dd className="text-text-secondary leading-relaxed">
                      {f.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="p-8 rounded-lg border border-border-strong bg-surface md:sticky md:top-24">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-4">
                Coming soon
              </p>
              <h2 className="font-serif text-2xl text-text-primary mb-4">
                Join the waitlist
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                We'll email you when it opens. Early access spots include a
                30-min walkthrough of your audit report.
              </p>
              <WaitlistForm tool="website-audit" />
            </aside>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
