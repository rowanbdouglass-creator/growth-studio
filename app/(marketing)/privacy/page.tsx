import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${brand.name} handles your data. Plain English, GDPR-compliant.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      number="LEGAL"
      eyebrow="privacy policy"
      title={
        <>
          Your <em>data</em>.
        </>
      }
      lastUpdated="27 June 2026"
    >
      <p>
        {brand.legalName} (&ldquo;{brand.name}&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates this website at{" "}
        <a href={brand.url}>{brand.url}</a>. This page tells you, in plain
        English, what data we collect, why, and what your rights are. We
        are the data controller.
      </p>
      <p>
        Companies House registration: <strong>{brand.companiesHouseNumber}</strong>.
        Registered in England &amp; Wales.
      </p>

      <h2>What we collect</h2>
      <p>We try to collect as little as possible. Specifically:</p>
      <ul>
        <li>
          <strong>Form submissions.</strong> If you email us or submit a
          contact form, we get your name, email, company name, and the
          content of your message.
        </li>
        <li>
          <strong>Calendar bookings.</strong> If you book a discovery call,
          our calendar provider (currently Calendly) stores your name,
          email, and any context you provide in the booking flow.
        </li>
        <li>
          <strong>Analytics.</strong> We do not run third-party analytics
          (no Google Analytics, no Facebook Pixel, no Hotjar). Server
          access logs at Vercel record IP addresses and request paths for
          security purposes; these are retained for 30 days.
        </li>
        <li>
          <strong>Cookies.</strong> We do not set advertising or tracking
          cookies. Strictly-necessary technical cookies from the hosting
          platform may be set; these do not require consent under UK ePR.
        </li>
      </ul>

      <h2>Why we collect it</h2>
      <ul>
        <li>
          To answer your message (lawful basis: legitimate interest,
          consent if you initiated the contact).
        </li>
        <li>
          To run a discovery call you&rsquo;ve asked us to run (lawful
          basis: consent / pre-contract).
        </li>
        <li>
          To keep the site secure and operational (lawful basis: legitimate
          interest).
        </li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We don&rsquo;t sell your data. We share it only with:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong> — our hosting provider. Their privacy
          policy is at <a href="https://vercel.com/legal/privacy-policy">vercel.com/legal/privacy-policy</a>.
        </li>
        <li>
          <strong>Calendly</strong> — for calendar bookings. Privacy
          policy at <a href="https://calendly.com/legal/privacy-policy">calendly.com/legal/privacy-policy</a>.
        </li>
        <li>
          <strong>Email providers</strong> we use to operate the business
          (currently Google Workspace).
        </li>
      </ul>
      <p>
        Some of these providers process data outside the UK. We rely on
        standard contractual clauses or adequacy decisions where required.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Email correspondence: as long as the working relationship is active, plus six years for tax/legal purposes.</li>
        <li>Form submissions where no engagement followed: 24 months.</li>
        <li>Server access logs: 30 days.</li>
      </ul>

      <h2>Your <em>rights</em></h2>
      <p>Under UK GDPR you have the right to:</p>
      <ul>
        <li>Ask what we hold about you.</li>
        <li>Ask us to correct it.</li>
        <li>Ask us to delete it (subject to legal retention obligations).</li>
        <li>Ask us to stop processing it for a specific purpose.</li>
        <li>Take a copy of it elsewhere (data portability).</li>
        <li>
          Complain to the Information Commissioner&rsquo;s Office (ICO) at{" "}
          <a href="https://ico.org.uk">ico.org.uk</a>.
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href={`mailto:${brand.email}`}>{brand.email}</a>. We will respond
        within 30 days.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we&rsquo;ll update the &ldquo;Last
        updated&rdquo; date at the top. Material changes will be notified
        to current clients by email.
      </p>
    </LegalPage>
  );
}
