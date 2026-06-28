import Link from "next/link";
import type { Metadata } from "next";
import { BracketLabel } from "@/components/brand/BracketLabel";
import { APPOINTMENTS } from "@/lib/content/appointments";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Past appointments",
  description: `Selected case studies from ${brand.name}. Operational systems, custom software, and conversion-focused websites for UK SMEs.`,
};

/**
 * /work — index of all past appointments. Same calendar-entry treatment
 * as the home page section, but full-page with hero header.
 */
export default function WorkPage() {
  return (
    <main data-bg="light" style={{ background: "var(--color-paper)" }}>
      {/* Hero header */}
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
          <BracketLabel number="WORK">past appointments</BracketLabel>
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
            Twelve done.<br />
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-red)",
                fontFamily: "var(--font-syne)",
              }}
            >
              Four
            </em>{" "}
            worth showing.
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
            Each appointment below is a real engagement with a real UK SME.
            Numbers are tracked, not estimated. Names are named where the
            client agreed.{" "}
            <b style={{ color: "var(--color-ink)" }}>
              Click any row to read the appointment notes.
            </b>
          </p>
        </div>
      </section>

      {/* Appointments list */}
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
            .work-list { display: flex; flex-direction: column; border-top: 2px solid var(--color-ink); }
            .work-row {
              display: grid;
              grid-template-columns: 170px 1fr 240px;
              gap: clamp(28px, 4vw, 72px);
              padding: 40px 0;
              border-bottom: 1px solid var(--color-rule);
              align-items: start;
              color: inherit;
              text-decoration: none;
              transition: background 0.4s ease;
            }
            .work-row:hover { background: var(--color-slip); }
            @media (max-width: 980px) {
              .work-row { grid-template-columns: 1fr; gap: 20px; }
            }
            .work-row .date { font-family: var(--font-mono); font-feature-settings: "tnum"; display: flex; flex-direction: column; gap: 4px; }
            .work-row .date .dow { font-size: 11px; letter-spacing: 0.2em; color: var(--color-red); font-weight: 700; text-transform: uppercase; }
            .work-row .date .num { font-family: var(--font-syne); font-size: 96px; font-weight: 700; line-height: 0.88; color: var(--color-ink); letter-spacing: -0.045em; }
            .work-row .date .my { font-size: 11px; letter-spacing: 0.18em; color: var(--color-pencil); text-transform: uppercase; font-weight: 500; margin-top: 2px; }
            .work-row .date .duration-meta { font-size: 10px; letter-spacing: 0.14em; color: var(--color-pencil); margin-top: 18px; line-height: 1.8; text-transform: uppercase; }
            .work-row .body { display: flex; flex-direction: column; gap: 14px; }
            .work-row .body .tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-red); font-weight: 700; display: flex; align-items: center; gap: 10px; }
            .work-row .body .tag span { color: var(--color-pencil); font-weight: 500; }
            .work-row .body h3 { font-family: var(--font-syne); font-weight: 700; font-size: clamp(30px, 4.4vw, 64px); letter-spacing: -0.025em; line-height: 0.98; }
            .work-row .body p { font-size: 15px; line-height: 1.55; color: var(--color-ink-soft); max-width: 64ch; }
            .work-row .body .read { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.16em; color: var(--color-pencil); text-transform: uppercase; font-weight: 600; margin-top: 8px; transition: color 0.3s ease; }
            .work-row:hover .body .read { color: var(--color-ink); }
            .work-row .body .read .arrow { transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1); display: inline-block; }
            .work-row:hover .body .read .arrow { transform: translateX(6px); }
            .work-row .out { display: flex; flex-direction: column; gap: 14px; }
            .work-row .out .figure { font-family: var(--font-mono); font-weight: 700; font-size: clamp(32px, 4vw, 48px); color: var(--color-red); letter-spacing: -0.02em; font-feature-settings: "tnum"; line-height: 0.95; }
            .work-row .out .label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-pencil); line-height: 1.5; }
            .work-row .out .schedule { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em; color: var(--color-ink-soft); line-height: 1.7; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--color-rule); text-transform: uppercase; }
            .work-row .out .schedule b { color: var(--color-ink); font-weight: 700; }
          `}</style>

          <div className="work-list">
            {APPOINTMENTS.map((a) => (
              <Link key={a.slug} href={`/work/${a.slug}`} className="work-row" data-cur="case">
                <div className="date">
                  <span className="dow">{a.dayOfWeek}</span>
                  <span className="num">{a.day}</span>
                  <span className="my">{a.monthYear}</span>
                  <span className="duration-meta">
                    {a.durationMeta.map((m, i) => (
                      <span key={i}>
                        {m}
                        {i < a.durationMeta.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="body">
                  <div className="tag">
                    {a.tag} <span>· {a.client}</span>
                  </div>
                  <h3>{a.headline}</h3>
                  <p>{a.body}</p>
                  <span className="read">
                    Read appointment notes{" "}
                    <span className="arrow">→</span>
                  </span>
                </div>
                <div className="out">
                  <span className="figure">{a.outcomeFigure}</span>
                  <span className="label">{a.outcomeLabel}</span>
                  <div className="schedule">
                    <b>Scheduled:</b> {a.scheduled}
                    <br />
                    <b>Next:</b> {a.next}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
