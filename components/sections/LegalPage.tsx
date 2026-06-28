import { BracketLabel } from "@/components/brand/BracketLabel";

/**
 * Shared layout for legal pages (privacy, terms, accessibility). Editorial
 * narrow column, Syne headings, IBM Plex Sans body. No surprises.
 */
interface LegalPageProps {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPage({
  number,
  eyebrow,
  title,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <main data-bg="light" style={{ background: "var(--color-paper)" }}>
      <style>{`
        .lg-wrap { max-width: 880px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 72px); }
        .lg-meta {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-pencil);
          margin-bottom: 32px;
          font-weight: 600;
        }
        .lg-meta b { color: var(--color-ink); font-weight: 700; }
        .lg-title {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(48px, 8vw, 120px);
          line-height: 0.86;
          letter-spacing: -0.04em;
          margin-bottom: clamp(32px, 5vw, 56px);
          color: var(--color-ink);
        }
        .lg-title em { font-style: italic; color: var(--color-red); font-family: var(--font-syne); }
        .lg-body { font-family: var(--font-sans); color: var(--color-ink); }
        .lg-body h2 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(24px, 3vw, 38px);
          letter-spacing: -0.022em;
          line-height: 1.1;
          margin: clamp(48px, 6vw, 80px) 0 18px;
          color: var(--color-ink);
        }
        .lg-body h2 em { font-style: italic; color: var(--color-red); font-family: var(--font-syne); }
        .lg-body h2:first-child { margin-top: 0; }
        .lg-body h3 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(18px, 1.8vw, 22px);
          letter-spacing: -0.015em;
          line-height: 1.2;
          margin: 36px 0 10px;
          color: var(--color-ink);
        }
        .lg-body p, .lg-body li {
          font-family: var(--font-sans);
          font-size: 16px;
          line-height: 1.65;
          color: var(--color-ink-soft);
        }
        .lg-body p + p { margin-top: 14px; }
        .lg-body a {
          color: var(--color-red);
          font-weight: 600;
          text-decoration: underline;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 3px;
        }
        .lg-body a:hover { color: var(--color-red-deep, #A93A24); }
        .lg-body ul, .lg-body ol { padding-left: 24px; margin: 14px 0; display: flex; flex-direction: column; gap: 8px; }
        .lg-body li { padding-left: 4px; }
        .lg-body strong { color: var(--color-ink); font-weight: 700; }
        .lg-body code {
          font-family: var(--font-mono);
          font-size: 14px;
          background: var(--color-slip);
          padding: 1px 6px;
          border: 1px solid var(--color-rule);
          border-radius: 2px;
        }
      `}</style>

      <section
        style={{
          padding: "180px 0 clamp(96px, 11vw, 160px)",
          background: "var(--color-paper)",
        }}
        data-bg="light"
      >
        <div className="lg-wrap">
          <div style={{ marginBottom: 24 }}>
            <BracketLabel number={number}>{eyebrow}</BracketLabel>
          </div>
          <h1 className="lg-title">{title}</h1>
          <div className="lg-meta">
            <span>
              <b>Last updated:</b> {lastUpdated}
            </span>
            <span>UK · ENGLAND &amp; WALES</span>
          </div>
          <div className="lg-body">{children}</div>
        </div>
      </section>
    </main>
  );
}
