"use client";

import { brand } from "@/config/brand";
import { BracketLabel } from "@/components/brand/BracketLabel";
import { PressAndHold } from "@/components/fx/PressAndHold";
import { CalendarGrid } from "@/components/ui/CalendarGrid";
import { KineticHeading } from "@/components/fx/KineticHeading";
import { MagneticButton } from "@/components/fx/MagneticButton";

/**
 * Hero 01 — WEEK. Split layout on paper: massive italic-emphasis
 * headline left, calendar grid demo right. Calendar fills with red
 * BOOKED blocks on scroll. Counter ticks 0 → 42.
 */
export function HeroWeek() {
  return (
    <section
      data-bg="light"
      className="ylb-hero ylb-hero-week"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        padding: "120px 0 56px",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-paper)",
        color: "var(--color-ink)",
      }}
    >
      <style>{`
        @media (max-width: 880px) {
          .ylb-hero { height: auto !important; min-height: auto !important; padding: 120px 0 60px !important; }
        }
        .ylb-hero .h-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: flex-start;
          flex-wrap: wrap;
          padding: 0 clamp(24px, 4vw, 72px);
        }
        .ylb-hero .h-top-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: currentColor;
          opacity: 0.7;
          line-height: 1.6;
        }
        .ylb-hero .h-top-label b { opacity: 1; font-weight: 700; }
        .ylb-hero .h-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: center;
          padding: clamp(20px, 3vw, 40px) clamp(24px, 4vw, 72px);
          max-width: 1480px;
          margin: 0 auto;
          width: 100%;
        }
        @media (max-width: 880px) {
          .ylb-hero .h-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 32px 24px 60px;
          }
        }
        .ylb-hero .h-foot {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: end;
          padding: 24px clamp(24px, 4vw, 72px) 0;
          border-top: 1px solid currentColor;
          max-width: 1480px;
          margin: 0 auto;
          width: 100%;
        }
        @media (max-width: 760px) {
          .ylb-hero .h-foot { grid-template-columns: 1fr; }
        }
        .ylb-hero .h-foot-sub {
          font-size: clamp(15px, 1.5vw, 19px);
          line-height: 1.42;
          opacity: 0.8;
          max-width: 46ch;
        }
        .ylb-hero .h-foot-sub b { opacity: 1; font-weight: 600; }
        .ylb-hero-h {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(56px, 9.5vw, 180px);
          line-height: 0.84;
          letter-spacing: -0.045em;
          text-align: left;
        }
        .ylb-hero-h em {
          font-style: italic;
          font-weight: 700;
          color: var(--color-red);
          font-family: var(--font-syne);
        }
        .ylb-hero-h .small {
          font-family: var(--font-syne);
          font-style: italic;
          font-weight: 500;
          font-size: 0.32em;
          letter-spacing: -0.01em;
          color: currentColor;
          opacity: 0.55;
          display: block;
          margin-bottom: 0.6em;
          line-height: 1.1;
        }
      `}</style>

      <div className="h-top">
        <BracketLabel number="01">systems &amp; scheduling</BracketLabel>
        <span className="h-top-label">
          <b>WEEK 26 / 2026</b> · TUE 28 JUN · UK
        </span>
      </div>

      <div className="h-grid">
        <KineticHeading as="h1" className="ylb-hero-h" variant="fly" delay={1700}>
          <span className="small">we make your week</span>
          look like <em>this</em>.
        </KineticHeading>
        <CalendarGrid zoomTarget={{ day: 4, hour: 4 }} />
      </div>

      <div className="h-foot">
        <p className="h-foot-sub">
          {brand.shortTagline} We build the <b>custom software</b> that
          schedules, quotes, invoices, and ships the work — end-to-end,
          owned by you.
        </p>
        <MagneticButton>
          <PressAndHold
            duration={600}
            onComplete={() => {
              window.location.href = "/contact";
            }}
          >
            Hold to book a slot
          </PressAndHold>
        </MagneticButton>
      </div>
    </section>
  );
}
