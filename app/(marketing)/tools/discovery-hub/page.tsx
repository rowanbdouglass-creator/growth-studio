import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { CTASection } from "@/components/blocks/CTASection";

export const metadata: Metadata = {
  title: "Discovery Hub · Per-client portals that compound",
  description:
    "AI-transcribed strategy notes, living proposal cards, and embedded Claude Q&A. Every meeting builds on the last instead of restarting.",
};

const features = [
  {
    label: "Transcribed sessions",
    body: "Every strategy call recorded, transcribed, and indexed. Search anything we ever said about your business.",
  },
  {
    label: "Living proposals",
    body: "Proposal cards update as we work. No more 30-page PDFs that go stale on day one.",
  },
  {
    label: "Embedded Q&A",
    body: "Ask Claude anything about your account, your campaigns, or our last call. It has the full context.",
  },
  {
    label: "Document vault",
    body: "Briefs, brand guidelines, audit reports, creative — all together, all searchable.",
  },
];

export default function DiscoveryHubPage() {
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
            Per engagement · Included with retainer
          </Badge>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
            Every meeting{" "}
            <span className="italic text-text-secondary">compounds.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12">
            Your private portal where strategy notes, proposals, and Claude
            Q&A live in one place — searchable, durable, and built around your
            engagement.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container size="default">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-8">
                What's inside
              </p>
              <dl className="space-y-8">
                {features.map((f) => (
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
                Want early access?
              </p>
              <h2 className="font-serif text-2xl text-text-primary mb-4">
                Join the waitlist
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                We're rolling out Discovery Hub to new clients first. Tell us
                a bit about your business and we'll be in touch.
              </p>
              <WaitlistForm tool="discovery-hub" ctaLabel="Request access" />
            </aside>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
