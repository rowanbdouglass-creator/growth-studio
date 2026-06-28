import Link from "next/link";
import { APPOINTMENTS } from "@/lib/content/appointments";

/**
 * Selected work on dark. Four rows, hairline separators, big numbers,
 * outcome figure right-aligned. Each row links to its case study.
 *
 * No images — pure typographic editorial. The metric IS the visual.
 */
export function WorkDark() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        padding: "clamp(72px, 9vw, 140px) 0",
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
            marginBottom: "clamp(56px, 7vw, 96px)",
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
              SELECTED WORK
            </div>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "clamp(2.4rem, 5vw, 5.8rem)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                maxWidth: "18ch",
              }}
            >
              Four recent{" "}
              <span className="serif-italic">appointments.</span>
            </h2>
          </div>
          <Link
            href="/work"
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
            }}
          >
            ALL WORK →
          </Link>
        </header>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderTop: "1px solid var(--color-hairline-strong)",
          }}
        >
          {APPOINTMENTS.map((a) => (
            <li key={a.slug} style={{ borderBottom: "1px solid var(--color-hairline)" }}>
              <Link
                href={`/work/${a.slug}`}
                data-cur="case"
                className="wd-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 320px 60px",
                  alignItems: "center",
                  gap: 32,
                  padding: "32px 0",
                  color: "inherit",
                  textDecoration: "none",
                  position: "relative",
                  transition: "padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: "var(--color-dim)",
                    textTransform: "uppercase",
                  }}
                >
                  {a.dayOfWeek}
                  <br />
                  <span style={{ color: "var(--color-paper)", fontWeight: 700 }}>
                    {a.monthYear}
                  </span>
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: "var(--color-mute)",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {a.tag} · {a.client}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 500,
                      fontSize: "clamp(22px, 2.6vw, 38px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.022em",
                      color: "var(--color-paper)",
                      maxWidth: "32ch",
                    }}
                  >
                    {a.headline}
                  </h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(32px, 3.8vw, 56px)",
                      color: "var(--color-red)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {a.outcomeFigure}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      color: "var(--color-dim)",
                      textTransform: "uppercase",
                      marginTop: 6,
                    }}
                  >
                    {a.outcomeLabel}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 20,
                    color: "var(--color-paper)",
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "inline-block",
                    justifySelf: "end",
                  }}
                  className="wd-arrow"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <style>{`
          .wd-row:hover { padding-left: 20px !important; padding-right: 20px !important; background: var(--color-night-soft); }
          .wd-row:hover .wd-arrow { transform: translateX(10px); }
          @media (max-width: 880px) {
            .wd-row { grid-template-columns: 1fr !important; gap: 16px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
