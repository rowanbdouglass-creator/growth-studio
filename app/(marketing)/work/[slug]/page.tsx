import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BracketLabel } from "@/components/brand/BracketLabel";
import { Waveform } from "@/components/ui/Waveform";
import { FindASlot } from "@/components/sections/FindASlot";
import {
  APPOINTMENTS,
  getAppointment,
  getOtherAppointments,
} from "@/lib/content/appointments";

export async function generateStaticParams() {
  return APPOINTMENTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getAppointment(slug);
  if (!a) return { title: "Not found" };
  return {
    title: `${a.client.toLowerCase().replace(/'/g, "'")} — ${a.outcomeFigure}`,
    description: a.headline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getAppointment(slug);
  if (!a) notFound();
  const others = getOtherAppointments(slug).slice(0, 3);

  return (
    <main data-bg="light" style={{ background: "var(--color-paper)" }}>
      <style>{`
        .cs-wrap { max-width: 1480px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 72px); }
        .cs-narrow { max-width: 780px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 72px); }

        /* TOP META */
        .cs-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--color-pencil); font-weight: 600;
          margin-bottom: 32px; transition: color 0.2s ease;
        }
        .cs-back:hover { color: var(--color-red); }

        /* TITLE BLOCK */
        .cs-title-block {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: end;
          margin-bottom: clamp(64px, 8vw, 120px);
        }
        @media (max-width: 880px) { .cs-title-block { grid-template-columns: 1fr; gap: 24px; } }
        .cs-date {
          font-family: var(--font-mono); font-feature-settings: "tnum";
          display: flex; flex-direction: column; gap: 6px;
        }
        .cs-date .dow { font-size: 11px; letter-spacing: 0.2em; color: var(--color-red); font-weight: 700; text-transform: uppercase; }
        .cs-date .num { font-family: var(--font-syne); font-size: 120px; font-weight: 700; line-height: 0.88; color: var(--color-ink); letter-spacing: -0.045em; }
        .cs-date .my { font-size: 11px; letter-spacing: 0.18em; color: var(--color-pencil); text-transform: uppercase; font-weight: 500; }
        .cs-date .meta { font-size: 10px; letter-spacing: 0.14em; color: var(--color-pencil); margin-top: 16px; line-height: 1.8; text-transform: uppercase; }
        .cs-title h1 { font-family: var(--font-syne); font-weight: 700; font-size: clamp(40px, 6vw, 96px); line-height: 0.92; letter-spacing: -0.035em; }
        .cs-title .tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-red); font-weight: 700; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
        .cs-title .tag span { color: var(--color-pencil); font-weight: 500; }

        /* INTRO + STATS row */
        .cs-intro-row {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: clamp(48px, 6vw, 96px);
          padding: clamp(56px, 7vw, 100px) 0;
          border-top: 1px solid var(--color-rule);
          border-bottom: 1px solid var(--color-rule);
        }
        @media (max-width: 880px) { .cs-intro-row { grid-template-columns: 1fr; gap: 40px; } }
        .cs-intro p { font-family: var(--font-sans); font-size: clamp(18px, 1.9vw, 26px); line-height: 1.45; color: var(--color-ink); }
        .cs-intro p b { color: var(--color-red); font-weight: 600; }
        .cs-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-self: start; }
        .cs-stat { border-top: 1px solid var(--color-ink); padding-top: 14px; display: flex; flex-direction: column; gap: 8px; }
        .cs-stat .v { font-family: var(--font-mono); font-weight: 700; font-size: clamp(24px, 2.8vw, 36px); color: var(--color-red); letter-spacing: -0.02em; font-feature-settings: "tnum"; line-height: 1; }
        .cs-stat .l { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-pencil); line-height: 1.5; font-weight: 600; }

        /* LONG-FORM SECTIONS */
        .cs-section { padding: clamp(64px, 8vw, 120px) 0; border-bottom: 1px solid var(--color-rule); }
        .cs-section.dark { background: var(--color-ink); color: var(--color-paper); border-color: #3A3833; }
        .cs-section.red  { background: var(--color-red); color: var(--color-paper); border-color: rgba(255,255,255,0.18); }
        .cs-section h2 {
          font-family: var(--font-syne); font-weight: 700;
          font-size: clamp(32px, 4.8vw, 64px);
          line-height: 0.98; letter-spacing: -0.03em; margin-bottom: 32px;
        }
        .cs-section h2 em { font-style: italic; color: var(--color-red); font-family: var(--font-syne); }
        .cs-section.red h2 em, .cs-section.dark h2 em { color: var(--color-paper); }
        .cs-section.dark h2 em { color: var(--color-red); }
        .cs-section p {
          font-family: var(--font-sans);
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.6;
          color: inherit;
          opacity: 0.92;
        }
        .cs-section p + p { margin-top: 16px; }
        .cs-shipped { display: grid; grid-template-columns: 1fr; gap: 0; margin-top: 24px; border-top: 1px solid currentColor; }
        .cs-shipped li {
          list-style: none;
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid currentColor;
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.5;
        }
        .cs-shipped li .n { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.16em; color: var(--color-red); font-weight: 700; }

        /* QUOTE */
        .cs-quote { padding: clamp(64px, 8vw, 120px) 0; background: var(--color-slip); }
        .cs-quote .timestamp-row { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-pencil); margin-bottom: 32px; }
        .cs-quote .timestamp-row b { color: var(--color-ink); font-weight: 700; }
        .cs-quote blockquote {
          font-family: var(--font-syne); font-weight: 600;
          font-size: clamp(24px, 3vw, 42px); line-height: 1.22;
          letter-spacing: -0.022em; color: var(--color-ink);
        }
        .cs-quote blockquote em { font-style: italic; color: var(--color-red); font-family: var(--font-syne); }
        .cs-quote .attr { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; padding-top: 22px; border-top: 1px solid var(--color-ink); margin-top: 28px; }
        .cs-quote .attr b { font-family: var(--font-sans); font-weight: 700; font-size: 18px; display: flex; align-items: center; gap: 10px; }
        .cs-quote .attr b::before { content: ""; display: inline-block; width: 9px; height: 9px; background: var(--color-red); clip-path: polygon(0 0, 100% 0, 100% 58%, 58% 100%, 0 100%); }
        .cs-quote .attr span { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-pencil); }
        .cs-quote .attr .meta-r { margin-left: auto; }

        /* OTHER APPOINTMENTS */
        .cs-other { padding: clamp(64px, 8vw, 120px) 0; background: var(--color-paper); }
        .cs-other-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--color-rule); border: 1px solid var(--color-rule); margin-top: 32px; }
        @media (max-width: 880px) { .cs-other-grid { grid-template-columns: 1fr; } }
        .cs-other-card {
          background: var(--color-paper); padding: 32px 28px;
          display: flex; flex-direction: column; gap: 14px;
          min-height: 240px; color: inherit; text-decoration: none;
          transition: background 0.35s ease;
        }
        .cs-other-card:hover { background: var(--color-paper-soft); }
        .cs-other-card .ot-date { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; color: var(--color-pencil); text-transform: uppercase; font-weight: 600; }
        .cs-other-card .ot-tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.16em; color: var(--color-red); font-weight: 700; text-transform: uppercase; }
        .cs-other-card .ot-client { font-family: var(--font-syne); font-weight: 700; font-size: 24px; letter-spacing: -0.02em; line-height: 1.04; }
        .cs-other-card .ot-out { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--color-rule); display: flex; gap: 14px; align-items: baseline; }
        .cs-other-card .ot-out .v { font-family: var(--font-mono); font-weight: 700; font-size: 22px; color: var(--color-red); letter-spacing: -0.01em; font-feature-settings: "tnum"; }
        .cs-other-card .ot-out .l { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; color: var(--color-pencil); text-transform: uppercase; line-height: 1.4; }
      `}</style>

      {/* TOP META + TITLE BLOCK */}
      <section
        style={{ padding: "140px 0 0", background: "var(--color-paper)" }}
        data-bg="light"
      >
        <div className="cs-wrap">
          <Link href="/work" className="cs-back" data-cur="pen">
            ← Back to past appointments
          </Link>
          <div style={{ marginBottom: 32 }}>
            <BracketLabel number="NOTE">appointment notes</BracketLabel>
          </div>
          {/* Shared-element morph target: pairs with the home gallery's
              media wrapper (viewTransitionName work-{slug}). This page
              has no hero media, so the title block carries the name. */}
          <div
            className="cs-title-block"
            style={{ ["viewTransitionName" as string]: `work-${slug}` }}
          >
            <div className="cs-date">
              <span className="dow">{a.dayOfWeek}</span>
              <span className="num">{a.day}</span>
              <span className="my">{a.monthYear}</span>
              <span className="meta">
                {a.durationMeta.map((m, i) => (
                  <span key={i}>
                    {m}
                    {i < a.durationMeta.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </div>
            <div className="cs-title">
              <div className="tag">
                {a.tag} <span>· {a.client}</span>
              </div>
              <h1>{a.headline}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO + AT-A-GLANCE STATS */}
      <section style={{ background: "var(--color-paper)" }} data-bg="light">
        <div className="cs-wrap">
          <div className="cs-intro-row">
            <div className="cs-intro">
              <p>{a.intro}</p>
            </div>
            <div className="cs-stats">
              {a.stats.map((s, i) => (
                <div key={i} className="cs-stat">
                  <span className="v">{s.figure}</span>
                  <span className="l">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="cs-section" style={{ background: "var(--color-paper)" }} data-bg="light">
        <div className="cs-narrow">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="01">the problem</BracketLabel>
          </div>
          <h2>
            What we found <em>before</em> we shipped.
          </h2>
          <p>{a.problem}</p>
        </div>
      </section>

      {/* APPROACH */}
      <section className="cs-section dark" data-bg="dark">
        <div className="cs-narrow">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="02" scheme="dark">how we shipped</BracketLabel>
          </div>
          <h2>
            The <em>approach</em>.
          </h2>
          <p>{a.approach}</p>
          <ul className="cs-shipped">
            {a.whatWeShipped.map((s, i) => (
              <li key={i}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="cs-section" style={{ background: "var(--color-paper)" }} data-bg="light">
        <div className="cs-narrow">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="03">outcome</BracketLabel>
          </div>
          <h2>
            What it does <em>now</em>.
          </h2>
          <p>{a.outcomeBody}</p>
        </div>
      </section>

      {/* QUOTE */}
      {a.quote && (
        <section className="cs-quote" data-bg="light">
          <div className="cs-narrow">
            <div style={{ marginBottom: 20 }}>
              <BracketLabel number="04">on the record</BracketLabel>
            </div>
            <div className="timestamp-row">
              <span>
                <b>VOICE NOTE</b> · {a.quote.receivedAt}
              </span>
              <span>{a.quote.rebookedAt}</span>
            </div>
            <blockquote>
              <span
                style={{
                  color: "var(--color-red)",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                }}
              >
                &ldquo;
              </span>
              {a.quote.text}
              <span
                style={{
                  color: "var(--color-red)",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                }}
              >
                &rdquo;
              </span>
            </blockquote>
            <Waveform />
            <div className="attr">
              <b>{a.quote.author}</b>
              <span>{a.quote.role}</span>
              {a.quote.rebookedAt && (
                <span className="meta-r">{a.quote.rebookedAt}</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* OTHER APPOINTMENTS */}
      <section className="cs-other" data-bg="light">
        <div className="cs-wrap">
          <div style={{ marginBottom: 24 }}>
            <BracketLabel number="05">also on the books</BracketLabel>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4.8vw, 64px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              marginBottom: 8,
            }}
          >
            Other{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-red)",
                fontFamily: "var(--font-syne)",
              }}
            >
              past
            </em>{" "}
            appointments.
          </h2>
          <div className="cs-other-grid">
            {others.map((o) => (
              <Link key={o.slug} href={`/work/${o.slug}`} className="cs-other-card">
                <span className="ot-date">
                  {o.dayOfWeek} · {o.day} {o.monthYear}
                </span>
                <span className="ot-tag">{o.tag}</span>
                <span className="ot-client">{o.client}</span>
                <div className="ot-out">
                  <span className="v">{o.outcomeFigure}</span>
                  <span className="l">{o.outcomeLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FIND A SLOT CTA */}
      <FindASlot />
    </main>
  );
}
