import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `${brand.name}'s accessibility statement. We build to WCAG 2.2 AA.`,
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      number="LEGAL"
      eyebrow="accessibility statement"
      title={
        <>
          Built to <em>WCAG 2.2 AA</em>.
        </>
      }
      lastUpdated="27 June 2026"
    >
      <p>
        {brand.legalName} is committed to making this website usable for
        everyone, including people who rely on assistive technology. We
        build to <strong>Web Content Accessibility Guidelines (WCAG) 2.2,
        Level AA</strong> as our target standard.
      </p>

      <h2>What we&rsquo;ve done</h2>
      <ul>
        <li>Semantic HTML with proper landmark regions on every page.</li>
        <li>
          Skip-to-content link as the first focusable element on every page.
        </li>
        <li>
          Keyboard accessibility throughout — every interactive element,
          including the press-and-hold CTAs, has a keyboard-only fallback
          (press Enter or Space to confirm instead of holding).
        </li>
        <li>
          Visible focus indicators on every interactive element. We do not
          remove the browser focus ring.
        </li>
        <li>
          Reduced-motion respect: scroll-triggered animations, the custom
          cursor, and the pen trail are all disabled if{" "}
          <code>prefers-reduced-motion: reduce</code> is set.
        </li>
        <li>
          Colour contrast: all text meets or exceeds WCAG AA contrast
          ratios against its background. Brand red is reserved for
          interactive accents and emphasis on high-contrast surfaces.
        </li>
        <li>
          Form fields (where present) have associated labels, not just
          placeholders.
        </li>
        <li>
          No auto-playing audio or video. The voice-note waveform on the
          home page is a static animation, not real audio playback.
        </li>
      </ul>

      <h2>Known issues</h2>
      <p>
        We know of the following limitations as of the last review:
      </p>
      <ul>
        <li>
          The animated calendar grid and scroll-reveal effects on the home
          page may cause minor focus-order shift on first paint. We&rsquo;re
          monitoring and will fix any reported issues.
        </li>
      </ul>

      <h2>How we <em>test</em></h2>
      <ul>
        <li>
          Automated testing with{" "}
          <a href="https://github.com/dequelabs/axe-core">axe-core</a>{" "}
          (open-source) on every page before deploy.
        </li>
        <li>Manual keyboard-only testing on each page after material changes.</li>
        <li>
          Screen reader spot-checks with VoiceOver (macOS / iOS) and NVDA (Windows).
        </li>
        <li>
          Colour contrast verification against WCAG ratios using the{" "}
          <a href="https://webaim.org/resources/contrastchecker/">WebAIM contrast checker</a>.
        </li>
      </ul>

      <h2>How to <em>report</em> an issue</h2>
      <p>
        If you encounter an accessibility barrier on this site — anywhere,
        on any page, on any device, with any assistive technology — please
        email <a href={`mailto:${brand.email}`}>{brand.email}</a> and tell
        us:
      </p>
      <ul>
        <li>The page URL.</li>
        <li>What you were trying to do.</li>
        <li>What went wrong.</li>
        <li>What assistive technology you&rsquo;re using, if relevant.</li>
      </ul>
      <p>
        We aim to acknowledge within two working days and to fix or schedule
        a fix within ten working days. If we can&rsquo;t fix something
        quickly, we&rsquo;ll tell you why and offer an alternative way to
        get whatever you needed from us.
      </p>

      <h2>Wider commitment</h2>
      <p>
        Accessibility is part of every engagement we deliver. Sites and
        applications we build for clients are tested to the same standard
        and the same automated tooling. If you&rsquo;re hiring us to build
        something and you need a stricter target than WCAG 2.2 AA — for
        example, public sector procurement requiring AAA on specific
        criteria — say so in the SoW and we&rsquo;ll cost and meet it.
      </p>
    </LegalPage>
  );
}
