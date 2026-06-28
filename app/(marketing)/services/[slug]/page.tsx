import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BracketLabel } from "@/components/brand/BracketLabel";
import { FindASlot } from "@/components/sections/FindASlot";
import { SERVICES, getService } from "@/lib/content/services";
import { getAppointment } from "@/lib/content/appointments";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Not found" };
  return {
    title: s.fullName,
    description: s.headline,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const proofCase = getAppointment(s.proofCaseSlug);

  return (
    <main data-bg="light" style={{ background: "var(--color-paper)" }}>
      <style>{`
        .sv-wrap { max-width: 1480px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 72px); }
        .sv-narrow { max-width: 780px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 72px); }
        .sv-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--color-pencil); font-weight: 600;
          margin-bottom: 32px; transition: color 0.2s ease;
        }
        .sv-back:hover { color: var(--color-red); }

        .sv-title-block {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: end;
          margin-bottom: clamp(56px, 7vw, 96px);
        }
        @media (max-width: 880px) { .sv-title-block { grid-template-columns: 1fr; gap: 16px; } }
        .sv-num {
          font-family: var(--font-syne);
          font-size: clamp(110px, 14vw, 200px);
          font-weight: 700;
          line-height: 0.85;
          color: var(--color-red);
          letter-spacing: -0.045em;
        }
        .sv-title h1 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(36px, 5.5vw, 80px);
          line-height: 0.95;
          letter-spacing: -0.035em;
        }
        .sv-title .tag {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-red);
          font-weight: 700;
          margin-bottom: 16px;
        }
        .sv-title .cadence {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-pencil);
          margin-top: 18px;
          line-height: 1.7;
        }
        .sv-title .cadence b { color: var(--color-ink); font-weight: 700; }

        .sv-section { padding: clamp(64px, 8vw, 120px) 0; border-top: 1px solid var(--color-rule); }
        .sv-section.dark { background: var(--color-ink); color: var(--color-paper); border-color: #3A3833; }
        .sv-section h2 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(32px, 4.8vw, 64px);
          line-height: 0.98; letter-spacing: -0.03em; margin-bottom: 32px;
        }
        .sv-section h2 em { font-style: italic; color: var(--color-red); font-family: var(--font-syne); }
        .sv-section.dark h2 em { color: var(--color-red); }
        .sv-section p {
          font-family: var(--font-sans);
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.6;
          opacity: 0.92;
        }
        .sv-section p + p { margin-top: 16px; }

        .sv-deliv {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          margin-top: 32px;
          border-top: 1px solid currentColor;
        }
        .sv-deliv-item {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 24px;
          padding: 28px 0;
          border-bottom: 1px solid currentColor;
        }
        .sv-deliv-item .n {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--color-red);
          font-weight: 700;
        }
        .sv-deliv-item h3 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(20px, 2.2vw, 28px);
          letter-spacing: -0.018em;
          margin-bottom: 8px;
          line-height: 1.1;
        }
        .sv-deliv-item p { font-size: 15px; line-height: 1.55; }

        .sv-fit {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--color-rule);
          border: 1px solid var(--color-rule);
          margin-top: 24px;
        }
        @media (max-width: 880px) { .sv-fit { grid-template-columns: 1fr; } }
        .sv-fit .col {
          background: var(--color-paper);
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .sv-fit .col h4 {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .sv-fit .col.yes h4 { color: var(--color-red); }
        .sv-fit .col.no  h4 { color: var(--color-pencil); }
        .sv-fit .col p { font-size: 15px; line-height: 1.55; color: var(--color-ink-soft); }

        .sv-proof {
          background: var(--color-red);
          color: var(--color-paper);
          padding: clamp(56px, 7vw, 96px) clamp(28px, 4vw, 56px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: center;
        }
        @media (max-width: 880px) { .sv-proof { grid-template-columns: 1fr; gap: 32px; } }
        .sv-proof .meta {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--color-paper);
          opacity: 0.85;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .sv-proof .figure {
          font-family: var(--font-syne);
          font-size: clamp(72px, 10vw, 156px);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.045em;
          color: var(--color-paper);
        }
        .sv-proof .figure em { color: var(--color-ink); font-style: italic; font-family: var(--font-syne); }
        .sv-proof .label {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-top: 14px;
          color: var(--color-paper);
        }
        .sv-proof .right h3 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(24px, 3vw, 38px);
          letter-spacing: -0.022em;
          line-height: 1.1;
          margin-bottom: 18px;
        }
        .sv-proof .right p {
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.55;
          color: var(--color-paper);
          opacity: 0.92;
          margin-bottom: 24px;
        }
        .sv-proof .read {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          background: var(--color-ink);
          color: var(--color-paper);
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: background 0.3s ease;
        }
        .sv-proof .read:hover { background: var(--color-paper); color: var(--color-ink); }
      `}</style>

      {/* TOP META + TITLE */}
      <section
        style={{ padding: "140px 0 0", background: "var(--color-paper)" }}
        data-bg="light"
      >
        <div className="sv-wrap">
          <Link href="/services" className="sv-back" data-cur="pen">
            ← Back to services
          </Link>
          <div style={{ marginBottom: 32 }}>
            <BracketLabel number="SERVICE">{`service ${s.number}`}</BracketLabel>
          </div>
          <div className="sv-title-block">
            <div className="sv-num">{s.number}</div>
            <div className="sv-title">
              <div className="tag">{s.fullName}</div>
              <h1>{s.headline}</h1>
              <div className="cadence">
                <b>Cadence:</b> {s.cadence}
                <br />
                {s.scheduleNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section
        className="sv-section"
        style={{ background: "var(--color-paper)", borderTop: 0 }}
        data-bg="light"
      >
        <div className="sv-narrow">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="01">what it is</BracketLabel>
          </div>
          <h2>
            What we&rsquo;ll <em>actually</em> build.
          </h2>
          <p>{s.intro}</p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="sv-section dark" data-bg="dark">
        <div className="sv-narrow">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="02" scheme="dark">why now</BracketLabel>
          </div>
          <h2>
            What you&rsquo;re probably <em>fighting</em> right now.
          </h2>
          <p>{s.problem}</p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section
        className="sv-section"
        style={{ background: "var(--color-paper)" }}
        data-bg="light"
      >
        <div className="sv-narrow">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="03">what you get</BracketLabel>
          </div>
          <h2>
            What we <em>ship</em>.
          </h2>
          <div className="sv-deliv">
            {s.whatYouGet.map((d, i) => (
              <div key={i} className="sv-deliv-item">
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      {proofCase && (
        <section
          style={{ padding: "0", background: "var(--color-paper)" }}
          data-bg="red"
        >
          <div className="sv-proof">
            <div>
              <div className="meta">PROOF · {proofCase.client}</div>
              <div className="figure">{s.proofFigure}</div>
              <div className="label">{s.proofLabel}</div>
            </div>
            <div className="right">
              <h3>{proofCase.headline}</h3>
              <p>{proofCase.body}</p>
              <Link href={`/work/${proofCase.slug}`} className="read" data-cur="pen">
                Read appointment notes <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FIT FOR / NOT FIT FOR */}
      <section
        className="sv-section"
        style={{ background: "var(--color-paper)" }}
        data-bg="light"
      >
        <div className="sv-wrap">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="04">honest fit</BracketLabel>
          </div>
          <h2>
            Who this is — and{" "}
            <em>isn&rsquo;t</em> — for.
          </h2>
          <div className="sv-fit">
            <div className="col yes">
              <h4>FIT FOR</h4>
              <p>{s.fitFor}</p>
            </div>
            <div className="col no">
              <h4>NOT FIT FOR</h4>
              <p>{s.notFitFor}</p>
            </div>
          </div>
        </div>
      </section>

      <FindASlot />
    </main>
  );
}
