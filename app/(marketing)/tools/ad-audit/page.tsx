import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { AdAuditForm } from "@/components/forms/AdAuditForm";
import { CTASection } from "@/components/blocks/CTASection";

export const metadata: Metadata = {
  title: "Ad Audit · Free Meta + Google 90-day analysis",
  description:
    "Connect your Meta and Google ad accounts in five minutes. We surface 90 days of wastage, the three quick wins, and benchmarks against your vertical.",
};

const findings = [
  {
    label: "Wastage detection",
    body: "Audience overlap, broken pixels, broken UTMs, dead creatives that haven't been turned off, branded search bleed.",
  },
  {
    label: "Quick wins",
    body: "The three changes that would have moved the most ROAS this quarter. Ranked by impact and effort.",
  },
  {
    label: "Benchmarks",
    body: "How your CPM, CPC, and CTR compare to others in your vertical at your spend tier.",
  },
  {
    label: "Forecast",
    body: "Given current trajectory, a 90-day forward forecast and what would shift it.",
  },
];

export default function AdAuditPage() {
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
            Tool · Free · ~30 seconds
          </Badge>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
            Where is the{" "}
            <span className="italic text-text-secondary">wastage?</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12">
            Drop your URL. Our audit engine reads your site, scans the
            Meta Ad Library for active ads, and runs a vertical-specific
            playbook. You&rsquo;ll see findings, quick wins, and a 90-day
            forecast in under a minute.
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
                Free audit
              </p>
              <h2 className="font-serif text-2xl text-text-primary mb-4">
                Run yours now
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Takes about 30 seconds. We&rsquo;ll email you the full report
                and a calendar link if you want to talk it through.
              </p>
              <AdAuditForm />
            </aside>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
