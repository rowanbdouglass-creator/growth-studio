import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${brand.name} collects, uses, and protects personal data.`,
};

const LAST_UPDATED = "21 May 2026";

export default function PrivacyPage() {
  return (
    <section className="py-24 md:py-32">
      <Container size="default">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary mb-4">
            Last updated · {LAST_UPDATED}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-text-secondary leading-relaxed">
            <p>
              This Privacy Policy describes how {brand.legalName} (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; trading as {brand.name}) collects, uses, and shares
              personal information when you visit our website, use our tools, or
              engage our services. We act as the data controller under the UK
              GDPR and Data Protection Act 2018.
            </p>

            <Section heading="1. Who we are">
              <p>
                {brand.legalName} is a company registered in England and Wales
                under company number {brand.companiesHouseNumber}. You can
                contact us about anything in this policy at{" "}
                <a
                  href={`mailto:${brand.email}`}
                  className="text-accent hover:underline"
                >
                  {brand.email}
                </a>
                .
              </p>
            </Section>

            <Section heading="2. What we collect">
              <p>We collect personal data in three ways:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>
                  <strong className="text-text-primary">You give it to us</strong> —
                  when you submit a form (audit request, contact, waitlist), book a
                  call, or email us. Typical fields: name, work email, company
                  name, company website, role.
                </li>
                <li>
                  <strong className="text-text-primary">You connect an account</strong> —
                  if you authorise us to read your advertising or analytics
                  accounts (Meta Ads, Google Ads, GA4) for an audit, we receive
                  the data those platforms expose to authenticated apps. We
                  never receive your platform passwords.
                </li>
                <li>
                  <strong className="text-text-primary">Automatic</strong> — basic
                  request data (IP address, user agent, page accessed) and
                  anonymous traffic counts via Vercel Analytics. No advertising
                  cookies or cross-site tracking pixels.
                </li>
              </ul>
            </Section>

            <Section heading="3. Why we use it">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  To run the audit or tool you requested and deliver the
                  resulting report.
                </li>
                <li>
                  To follow up about a discovery call, proposal, or active
                  engagement.
                </li>
                <li>
                  To keep records required for legitimate business operation
                  (accounting, contracts, tax).
                </li>
                <li>
                  To improve our services — analysing which tools get used and
                  where they fall short.
                </li>
              </ul>
              <p className="mt-3">
                Our legal bases under UK GDPR are: <em>consent</em> (when you
                submit a form), <em>contract</em> (when delivering work to
                clients), and <em>legitimate interests</em> (operating and
                improving the business). We never sell personal data, and we
                don&rsquo;t use it for advertising profiling.
              </p>
            </Section>

            <Section heading="4. Third-party processors">
              <p>
                We use the following services to operate the website and tools.
                Each one processes data on our behalf under appropriate data
                processing terms.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>
                  <strong className="text-text-primary">Vercel</strong> (US/EU) —
                  hosting, analytics, file storage.
                </li>
                <li>
                  <strong className="text-text-primary">Neon</strong> (EU) —
                  PostgreSQL database for our CRM and audit records.
                </li>
                <li>
                  <strong className="text-text-primary">Clerk</strong> (US) —
                  authentication for our internal team-only platform.
                </li>
                <li>
                  <strong className="text-text-primary">Anthropic</strong> (US) —
                  large-language-model API used to synthesise audit findings
                  from data we&rsquo;ve already collected. We do not train
                  Anthropic&rsquo;s models on your data.
                </li>
                <li>
                  <strong className="text-text-primary">Meta Platforms</strong> and{" "}
                  <strong className="text-text-primary">Google</strong> — only when
                  you authorise us to read your advertising accounts. Data is
                  pulled live during an audit and not stored long-term beyond
                  the resulting report.
                </li>
                <li>
                  <strong className="text-text-primary">Resend</strong> (US/EU) —
                  transactional email (audit reports, booking confirmations).
                </li>
              </ul>
            </Section>

            <Section heading="5. How long we keep it">
              <p>
                Audit requests and the data collected during them are kept for{" "}
                <strong className="text-text-primary">24 months</strong> unless
                you ask us to delete them sooner, or unless you become a client
                (in which case we retain records for the duration of the
                engagement plus 7 years for accounting compliance). Cold leads
                (no engagement after 12 months) are anonymised or deleted.
              </p>
            </Section>

            <Section heading="6. International transfers">
              <p>
                Some processors (Anthropic, Clerk, Vercel) are based in the
                United States. Data transferred there is protected by{" "}
                <abbr title="Standard Contractual Clauses">SCCs</abbr> and the
                UK Addendum, as well as the UK Extension to the EU&ndash;US
                Data Privacy Framework where applicable.
              </p>
            </Section>

            <Section heading="7. Your rights">
              <p>Under UK GDPR you can:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Ask what personal data we hold about you.</li>
                <li>Ask us to correct or delete it.</li>
                <li>Withdraw consent for marketing follow-up at any time.</li>
                <li>
                  Object to processing based on legitimate interests, or
                  request restriction.
                </li>
                <li>Ask for a portable copy of the data you provided.</li>
                <li>
                  Complain to the ICO (
                  <a
                    href="https://ico.org.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    ico.org.uk
                  </a>
                  ) if you think we&rsquo;ve mishandled your data.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these, email{" "}
                <a
                  href={`mailto:${brand.email}`}
                  className="text-accent hover:underline"
                >
                  {brand.email}
                </a>
                . We aim to respond within 14 days.
              </p>
            </Section>

            <Section heading="8. Cookies and tracking">
              <p>
                We use a single first-party cookie for session management on
                our internal platform (signed-in staff only). The public
                marketing site uses Vercel Analytics, which does not set
                third-party cookies or identify individual visitors. We do
                not use advertising or retargeting pixels on this site.
              </p>
            </Section>

            <Section heading="9. Changes">
              <p>
                Material changes will be posted here with a new &ldquo;last
                updated&rdquo; date. For substantive changes affecting how we
                use data you&rsquo;ve already shared, we&rsquo;ll email you in
                advance.
              </p>
            </Section>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-text-primary mb-3 tracking-tight">
        {heading}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
