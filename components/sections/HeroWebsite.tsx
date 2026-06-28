"use client";

import { BracketLabel } from "@/components/brand/BracketLabel";
import { PressAndHold } from "@/components/fx/PressAndHold";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { KineticHeading } from "@/components/fx/KineticHeading";
import { MagneticButton } from "@/components/fx/MagneticButton";

/**
 * Hero 02 — WEBSITE (red bg). Same split layout: massive headline left,
 * 3D-tilted browser mockup right. Browser content reveals in cascade
 * with a BOOKED stamp drop at the end.
 */
export function HeroWebsite() {
  return (
    <section
      data-bg="red"
      className="ylb-hero ylb-hero-web"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        padding: "140px 0 56px",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-red)",
        color: "var(--color-paper)",
      }}
    >
      <div className="h-top">
        <BracketLabel number="02" scheme="on-red">
          websites that convert
        </BracketLabel>
        <span className="h-top-label">
          <b>SESSION 0247</b> · USER 7.21 · LIVE
        </span>
      </div>

      <div className="h-grid">
        <KineticHeading as="h1" className="ylb-hero-h" variant="fly">
          <span className="small">we make your website</span>
          feel like{" "}
          <em style={{ color: "var(--color-ink)" }}>this</em>.
        </KineticHeading>
        <BrowserMockup />
      </div>

      <div className="h-foot">
        <p className="h-foot-sub">
          Fast. Real. Trusted. Conversion-focused storefronts built on Next.js,
          WordPress or Shopify — whichever fits the job.{" "}
          <b>Speed scores 95+, accessibility scores AA, bookings land in your inbox.</b>
        </p>
        <MagneticButton>
          <PressAndHold
            duration={600}
            variant="on-red"
            onComplete={() => {
              window.location.href = "/work";
            }}
          >
            See live builds
          </PressAndHold>
        </MagneticButton>
      </div>
    </section>
  );
}
