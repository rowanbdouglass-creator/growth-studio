import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of ${brand.name} tools and services.`,
};

const LAST_UPDATED = "21 May 2026";

export default function TermsPage() {
  return (
    <section className="py-24 md:py-32">
      <Container size="default">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary mb-4">
            Last updated · {LAST_UPDATED}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-8">
            Terms of Service
          </h1>

          <div className="space-y-8 text-text-secondary leading-relaxed">
            <p>
              These Terms govern your use of the website, free tools, and any
              services provided by {brand.legalName} (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; trading as {brand.name}). By using the site or
              submitting a form, you agree to these Terms. Paid engagements are
              additionally governed by a separately signed Statement of Work.
            </p>

            <Section heading="1. Who you&rsquo;re contracting with">
              <p>
                {brand.legalName}, a company registered in England and Wales
                under number {brand.companiesHouseNumber}. Contact:{" "}
                <a
                  href={`mailto:${brand.email}`}
                  className="text-accent hover:underline"
                >
                  {brand.email}
                </a>
                .
              </p>
            </Section>

            <Section heading="2. The free tools">
              <p>
                The audit tools (Ad Audit, Website Audit, and any future
                tools) are provided <strong>free of charge</strong>, on an
                &ldquo;as is&rdquo; basis, for informational and diagnostic
                purposes only. They are designed to surface plausible signals
                from publicly available data and, where you authorise it, from
                your own connected accounts.
              </p>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  Submit URLs or accounts you do not own or are not authorised
                  to audit.
                </li>
                <li>
                  Attempt to overwhelm, scrape, or reverse-engineer the tools
                  or the underlying APIs.
                </li>
                <li>
                  Use the tools to audit competitors&rsquo; accounts without
                  their permission, or for any unlawful purpose.
                </li>
                <li>
                  Resell, white-label, or republish the audit outputs as if
                  they were your own analysis.
                </li>
              </ul>
              <p className="mt-3">
                We may rate-limit, refuse, or revoke access at our discretion
                if we suspect misuse.
              </p>
            </Section>

            <Section heading="3. Accuracy of audit findings">
              <p>
                Audits combine real data we collect (HTML, public APIs, Core
                Web Vitals, ad library records, and — with your authorisation —
                advertising account data) with AI-synthesised commentary. The
                findings represent our best automated assessment at the time
                of generation. They are <strong>not</strong> a substitute for
                full professional advice, a manual audit by a specialist, or
                regulated financial or legal guidance. You are responsible for
                independently verifying any number before acting on it.
              </p>
            </Section>

            <Section heading="4. Authorised data access">
              <p>
                If you connect a third-party account (Meta Ads, Google Ads,
                Google Analytics, etc.), you confirm that you have the
                authority to grant access on behalf of the account owner.
                Access tokens are stored encrypted, used only for the purposes
                described in our Privacy Policy, and revocable at any time
                through the third-party platform or by emailing us.
              </p>
            </Section>

            <Section heading="5. Paid engagements">
              <p>
                Engaging us for paid work (retainers, projects, custom builds)
                is governed by a separately signed Statement of Work or
                Master Services Agreement. Those documents take precedence
                over these Terms in case of conflict. The free tools do not
                themselves constitute a paid engagement, an offer, or a
                binding proposal.
              </p>
            </Section>

            <Section heading="6. Intellectual property">
              <p>
                The site, tool outputs, designs, and code are owned by{" "}
                {brand.legalName}. Audit reports we generate for you are
                licensed for your internal use; you may share them with third
                parties (e.g. an in-house team, a board) but may not republish
                them. Anything you provide us (URLs, account data, brand
                assets) remains yours.
              </p>
            </Section>

            <Section heading="7. Disclaimer and liability">
              <p>
                Free tools are provided without warranty. To the maximum
                extent permitted by law, we exclude all implied warranties and
                are not liable for any indirect, consequential, or
                business-interruption losses arising from use of the tools or
                the website. Our total liability for any direct loss arising
                out of the free tools is limited to £100. This clause does not
                limit liability for death, personal injury caused by
                negligence, or fraud.
              </p>
              <p>
                For paid engagements, liability is governed by the relevant
                Statement of Work.
              </p>
            </Section>

            <Section heading="8. Suspension and termination">
              <p>
                We may suspend or terminate access to the tools at any time
                for misuse, abuse of rate limits, suspected fraud, or
                inactivity. You may stop using the tools at any time. On
                request, we will delete any personal data associated with
                your account in line with our Privacy Policy.
              </p>
            </Section>

            <Section heading="9. Governing law">
              <p>
                These Terms are governed by the laws of England and Wales.
                Any dispute will be resolved in the courts of England and
                Wales, subject to your statutory rights as a consumer where
                applicable.
              </p>
            </Section>

            <Section heading="10. Changes">
              <p>
                We may revise these Terms from time to time. The current
                version, dated above, is always at this URL. Material changes
                that affect existing relationships will be notified by email
                where we have one on file.
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
