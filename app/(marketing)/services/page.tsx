import Link from "next/link";
import type { Metadata } from "next";
import { BracketLabel } from "@/components/brand/BracketLabel";
import { FindASlot } from "@/components/sections/FindASlot";
import { SERVICES } from "@/lib/content/services";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Services",
  description: `Three services. Booked solid. Custom systems, websites, and AI-optimised paid traffic from ${brand.name}.`,
};

/**
 * /services — the docket. Same time-block layout as the home page
 * service section, but with full hero + per-service link.
 */
export default function ServicesPage() {
  return (
    <main data-bg="light" style={{ background: "var(--color-paper)" }}>
      {/* HERO */}
      <section
        style={{
          padding: "180px 0 80px",
          background: "var(--color-paper)",
          color: "var(--color-ink)",
        }}
        data-bg="light"
      >
        <div
          style={{
            maxWidth: 1480,
            margin: "0 auto",
            padding: "0 clamp(24px, 4vw, 72px)",
          }}
        >
          <BracketLabel number="DOCKET">this week&rsquo;s schedule</BracketLabel>
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(56px, 11vw, 200px)",
              lineHeight: 0.84,
              letterSpacing: "-0.045em",
              marginTop: 24,
              marginBottom: 40,
              maxWidth: "16ch",
            }}
          >
            Three services.<br />
            Booked{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-red)",
                fontFamily: "var(--font-syne)",
              }}
            >
              solid
            </em>
            .
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.8vw, 22px)",
              lineHeight: 1.45,
              color: "var(--color-ink-soft)",
              maxWidth: "52ch",
            }}
          >
            One studio, no middle layer. The two operators run paid traffic
            in the morning, build the systems that hold the revenue in the
            afternoon, and ship websites in between.{" "}
            <b style={{ color: "var(--color-ink)" }}>
              Click any service to read what we ship and who it&rsquo;s for.
            </b>
          </p>
        </div>
      </section>

      {/* DOCKET LIST */}
      <section
        style={{
          padding: "0 0 clamp(96px, 11vw, 160px)",
          background: "var(--color-paper)",
        }}
        data-bg="light"
      >
        <div
          style={{
            maxWidth: 1480,
            margin: "0 auto",
            padding: "0 clamp(24px, 4vw, 72px)",
          }}
        >
          <style>{`
            .sv-docket {
              border-top: 2px solid var(--color-ink);
            }
            .sv-row {
              display: grid;
              grid-template-columns: 200px 1fr 240px;
              gap: 0;
              align-items: stretch;
              border-bottom: 1px solid var(--color-rule);
              transition: background 0.35s ease;
              color: inherit;
              text-decoration: none;
            }
            .sv-row:hover { background: var(--color-slip); }
            @media (max-width: 880px) { .sv-row { grid-template-columns: 1fr; gap: 0; padding: 24px; } }
            .sv-time {
              padding: 36px 24px;
              background: var(--color-ink);
              color: var(--color-paper);
              font-family: var(--font-mono);
              font-size: 13px;
              font-weight: 600;
              letter-spacing: 0.06em;
              line-height: 1.5;
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 6px;
            }
            @media (max-width: 880px) { .sv-time { padding: 18px; flex-direction: row; justify-content: space-between; align-items: center; } }
            .sv-time .days {
              color: var(--color-red);
              font-weight: 700;
              font-size: 12px;
              letter-spacing: 0.16em;
              text-transform: uppercase;
            }
            .sv-time .clock {
              font-size: 18px;
              font-weight: 600;
              font-feature-settings: "tnum";
              letter-spacing: 0.02em;
            }
            .sv-time .note {
              font-size: 11px;
              color: var(--color-pencil-soft, #B2A99D);
              letter-spacing: 0.14em;
            }
            .sv-meat {
              padding: 36px 32px;
              display: flex;
              flex-direction: column;
              gap: 14px;
              justify-content: center;
            }
            .sv-meat .num {
              font-family: var(--font-mono);
              font-size: 11px;
              color: var(--color-pencil);
              letter-spacing: 0.16em;
              font-weight: 600;
              text-transform: uppercase;
            }
            .sv-meat h2 {
              font-family: var(--font-syne);
              font-weight: 700;
              font-size: clamp(32px, 4vw, 56px);
              letter-spacing: -0.025em;
              line-height: 1;
              display: flex;
              align-items: center;
              gap: 14px;
            }
            .sv-meat h2 .arrow {
              color: var(--color-red);
              font-size: 0.6em;
              transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s ease;
              opacity: 0;
              transform: translateX(-12px);
              display: inline-block;
            }
            .sv-row:hover .sv-meat h2 .arrow { opacity: 1; transform: translateX(0); }
            .sv-meat p {
              font-family: var(--font-sans);
              font-size: 15px;
              line-height: 1.55;
              color: var(--color-ink-soft);
              max-width: 54ch;
            }
            .sv-out {
              padding: 36px 24px 36px 0;
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 8px;
              text-align: right;
              border-left: 1px dashed var(--color-rule);
            }
            @media (max-width: 880px) {
              .sv-out { text-align: left; padding: 0; border: 0; }
            }
            .sv-out b {
              font-family: var(--font-mono);
              font-weight: 700;
              font-size: clamp(22px, 2.4vw, 30px);
              color: var(--color-red);
              letter-spacing: -0.01em;
              line-height: 1;
              font-feature-settings: "tnum";
            }
            .sv-out span {
              font-family: var(--font-mono);
              font-size: 11px;
              letter-spacing: 0.16em;
              text-transform: uppercase;
              color: var(--color-pencil);
              line-height: 1.4;
            }
          `}</style>

          <div className="sv-docket">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="sv-row">
                <div className="sv-time">
                  <span className="days">{s.cadence.split(" / ")[0]}</span>
                  <span className="clock">{s.cadence.split(" / ")[1]}</span>
                  <span className="note">{s.scheduleNote}</span>
                </div>
                <div className="sv-meat">
                  <span className="num">SERVICE {s.number}</span>
                  <h2>
                    {s.shortName} <span className="arrow">→</span>
                  </h2>
                  <p>{s.body}</p>
                </div>
                <div className="sv-out">
                  <b>{s.proofFigure}</b>
                  <span>{s.proofLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FindASlot />
    </main>
  );
}
