import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { WebsiteAuditForm } from "@/components/forms/WebsiteAuditForm";
import { CTASection } from "@/components/blocks/CTASection";

export const metadata: Metadata = {
  title: "Website & Systems Audit · Free crawl + visual diagnosis",
  description:
    "Paste your URL. We crawl, screenshot, and run our vertical-specific playbook against your funnel and operational stack. A real audit, not a Lighthouse report.",
};

const findings = [
  {
    label: "Real measurements",
    body: "Actual Lighthouse scores, real-user Core Web Vitals from Chrome telemetry, page weight, response time. No simulated numbers.",
  },
  {
    label: "Visual diagnosis",
    body: "We screenshot your home, services, contact, and shop pages and run Claude vision over each. Hero clarity, trust signals, primary CTA strength, mobile-readiness.",
  },
  {
    label: "Industry context",
    body: "We infer your industry from the page and surface capabilities competitors typically have. Opticians? Online prescription glasses. Physio? Online booking with deposit. Each output tailored, not templated.",
  },
  {
    label: "Bespoke questions",
    body: "After the audit, we ask 4–6 questions specific to gaps we found — what CRM/spreadsheets you use, what could integrate with what, and the one capability missing that would change your conversion rate.",
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
            Tool · Free · ~90 seconds
          </Badge>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-text-primary mb-8 tracking-tight">
            What&rsquo;s actually{" "}
            <span className="italic text-text-secondary">leaking?</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12">
            Paste your URL. We fetch your site, screenshot up to four key
            pages, run real Lighthouse + Core Web Vitals, fingerprint your
            stack, and Claude-vision your screenshots against industry
            playbooks for what businesses like yours typically offer. Real
            data, no theatre.
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
                You&rsquo;ll watch the audit run live — every signal we
                check, every page we screenshot — then read the synthesised
                report and the bespoke follow-up questions.
              </p>
              <WebsiteAuditForm />
            </aside>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
