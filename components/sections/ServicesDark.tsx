import Link from "next/link";
import { SERVICES } from "@/lib/content/services";

/**
 * Services on dark — three editorial cards in a tight grid. Hairline
 * 1px borders, no shadows, no radius. Service number is huge serif.
 * Hover lifts the card with a subtle warm wash.
 */
export function ServicesDark() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        padding: "clamp(96px, 12vw, 180px) 0",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: clampSize(56, 7, 96),
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-mute)",
                marginBottom: 24,
              }}
            >
              <span style={{ color: "var(--color-red)" }}>●</span>{" "}
              WHAT WE DO
            </div>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "clamp(2.4rem, 5vw, 5.8rem)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                maxWidth: "14ch",
              }}
            >
              Three things.{" "}
              <span className="serif-italic">Done well.</span>
            </h2>
          </div>
          <Link
            href="/services"
            data-cur="pen"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-paper)",
              fontWeight: 600,
              borderBottom: "1px solid var(--color-paper)",
              paddingBottom: 4,
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
          >
            ALL SERVICES →
          </Link>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "var(--color-hairline)",
            border: "1px solid var(--color-hairline)",
          }}
          className="ylb-services-grid"
        >
          <style>{`
            @media (max-width: 880px) {
              .ylb-services-grid { grid-template-columns: 1fr !important; }
            }
            .sv-card {
              background: var(--color-night);
              padding: clamp(28px, 3.4vw, 48px);
              display: flex;
              flex-direction: column;
              gap: 18px;
              min-height: 360px;
              color: inherit;
              text-decoration: none;
              transition: background 0.45s cubic-bezier(0.16, 1, 0.3, 1);
              position: relative;
            }
            .sv-card:hover { background: var(--color-night-soft); }
            .sv-card .num {
              font-family: var(--font-serif);
              font-style: italic;
              font-weight: 400;
              font-size: clamp(72px, 8vw, 124px);
              color: var(--color-red);
              line-height: 0.84;
              letter-spacing: -0.04em;
            }
            .sv-card h3 {
              font-family: var(--font-syne);
              font-weight: 600;
              font-size: clamp(24px, 2.4vw, 34px);
              letter-spacing: -0.02em;
              line-height: 1.05;
              margin-top: auto;
            }
            .sv-card p {
              font-family: var(--font-sans);
              font-size: 14px;
              line-height: 1.55;
              color: var(--color-mute);
              max-width: 38ch;
            }
            .sv-card .more {
              font-family: var(--font-mono);
              font-size: 11px;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              color: var(--color-dim);
              padding-top: 14px;
              margin-top: 8px;
              border-top: 1px solid var(--color-hairline);
              display: flex;
              justify-content: space-between;
              align-items: center;
              transition: color 0.3s ease;
            }
            .sv-card:hover .more { color: var(--color-paper); }
            .sv-card .more .arrow {
              transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
              display: inline-block;
            }
            .sv-card:hover .more .arrow { transform: translateX(8px); }
          `}</style>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="sv-card" data-cur="case">
              <span className="num">{s.number}</span>
              <h3>{s.shortName}</h3>
              <p>{s.body}</p>
              <div className="more">
                <span>READ MORE</span>
                <span className="arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function clampSize(min: number, vw: number, max: number) {
  return `clamp(${min}px, ${vw}vw, ${max}px)`;
}
