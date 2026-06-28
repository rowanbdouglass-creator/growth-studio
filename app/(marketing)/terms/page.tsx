import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Terms",
  description: `${brand.name} terms of service. Plain English, signed and dated.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      number="LEGAL"
      eyebrow="terms of service"
      title={
        <>
          The <em>terms</em>.
        </>
      }
      lastUpdated="27 June 2026"
    >
      <p>
        These terms govern your use of this website and any engagement
        with {brand.legalName} ({brand.name}). By using the site or
        engaging us, you agree to them.
      </p>
      <p>
        Companies House registration: <strong>{brand.companiesHouseNumber}</strong>.
        Registered office: England &amp; Wales. Contact:{" "}
        <a href={`mailto:${brand.email}`}>{brand.email}</a>.
      </p>

      <h2>What we offer</h2>
      <p>
        {brand.name} offers three services: custom operational systems,
        website design and build, and AI-optimised paid traffic. Detailed
        scope, deliverables and pricing for any specific engagement are
        agreed in writing before work begins — not on this page.
      </p>

      <h2>Engagement &amp; <em>scope</em></h2>
      <ul>
        <li>
          Every engagement is governed by a written statement of work
          (SoW) signed by both parties. The SoW defines deliverables,
          milestones, pricing, payment schedule, IP and termination terms
          for that engagement.
        </li>
        <li>
          Where the SoW conflicts with this page, the SoW prevails.
        </li>
        <li>
          Scope changes are quoted and agreed in writing before being
          actioned. No work is performed outside the SoW unless you
          confirm in writing.
        </li>
      </ul>

      <h2>Payment</h2>
      <ul>
        <li>Build projects: 50% on signing, 50% on delivery, unless a different schedule is agreed.</li>
        <li>Retainers: monthly in advance, paid by direct debit or bank transfer.</li>
        <li>Late payments accrue interest under the Late Payment of Commercial Debts (Interest) Act 1998.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        On full payment, all rights in deliverables created for you under
        an SoW transfer to you. Background IP (libraries, frameworks,
        tools, processes, methods) created or owned by {brand.name}
        outside the SoW remains ours, but we grant you a perpetual,
        non-exclusive licence to use it as embedded in your deliverables.
      </p>
      <p>
        We may reference work we&rsquo;ve done for you in case studies,
        portfolio, and pitches — including client name and outcome figures
        — unless your SoW specifies otherwise.
      </p>

      <h2>Confidentiality</h2>
      <p>
        We treat all client information as confidential. We&rsquo;ll
        sign a mutual NDA on request. We don&rsquo;t discuss your
        business with other clients, prospects, or publicly without your
        consent.
      </p>

      <h2>Warranty &amp; <em>liability</em></h2>
      <p>
        We provide services with the reasonable skill and care expected
        of a competent UK studio of our size and discipline. Software we
        build is provided &ldquo;as is&rdquo; after delivery; specific
        warranty terms (uptime, bug fix windows) are set in the SoW.
      </p>
      <p>
        Our maximum aggregate liability under any engagement is capped at
        the total fees paid to us under that engagement in the preceding
        12 months. Nothing in these terms excludes liability for death or
        personal injury caused by negligence, fraud, or any other
        liability that cannot lawfully be excluded.
      </p>

      <h2>Termination</h2>
      <ul>
        <li>
          Either party may terminate a retainer engagement with 30 days&rsquo; written notice.
        </li>
        <li>
          Build engagements run to completion of the SoW unless otherwise specified.
        </li>
        <li>
          On termination, you receive all work completed and paid for to that point. Outstanding fees become due.
        </li>
      </ul>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of England &amp; Wales.
        Disputes are subject to the exclusive jurisdiction of the English
        courts.
      </p>
    </LegalPage>
  );
}
