import Link from "next/link";
import { APPOINTMENTS } from "@/lib/content/appointments";

/**
 * Section 04 — Featured work.
 *
 * Modelled on Jesse's project cases + Tony Mak's curation grid. 2x2
 * grid of case study cards on desktop, 1-col on mobile. Each card:
 *   - thin gradient strip at top (brand-coloured per case)
 *   - mono tag · client
 *   - Bricolage headline
 *   - body excerpt
 *   - bottom strip with outcome figure (red serif italic) +
 *     'Read case →' link
 * Whole card is a Link with hover lift + lime border accent.
 *
 * No images — type and brand-coloured gradients carry the visual.
 */

const STRIPES: Record<string, string> = {
  nayims: "linear-gradient(90deg, #C4472E 0%, #5C2114 100%)",
  "jc-setton": "linear-gradient(90deg, #4A7BA8 0%, #1A2530 100%)",
  "cape-kings": "linear-gradient(90deg, #A93A24 0%, #2A1A14 100%)",
  "forum-studios": "linear-gradient(90deg, #6C7896 0%, #1A1D2D 100%)",
};

export function Section04Work() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(140px, 18vw, 240px) 0",
        background: "var(--color-night)",
        color: "var(--color-paper)",
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--color-mute)",
            marginBottom: "clamp(40px, 5vw, 64px)",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              color: "var(--color-red)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 28,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            04
          </span>
          <span
            style={{ width: 40, height: 1, background: "var(--color-hairline-strong)" }}
          />
          Selected work
        </div>

        {/* Section headline + view-all */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: "clamp(56px, 7vw, 96px)",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 500,
              fontSize: "clamp(2.4rem, 5.4vw, 6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "var(--color-paper)",
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            Twelve done.{" "}
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--color-red)",
              }}
            >
              Four
            </span>{" "}
            worth showing.
          </h2>
          <Link
            href="/work"
            data-cur="pen"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-paper)",
              fontWeight: 700,
              textDecoration: "none",
              borderBottom: "1px solid var(--color-paper)",
              paddingBottom: 4,
            }}
          >
            All work →
          </Link>
        </div>

        {/* 2x2 grid */}
        <div
          className="work-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            background: "var(--color-hairline)",
            border: "1px solid var(--color-hairline)",
          }}
        >
          {APPOINTMENTS.map((a) => (
            <Link
              key={a.slug}
              href={`/work/${a.slug}`}
              data-cur="case"
              className="work-card"
              style={{
                position: "relative",
                background: "rgba(22,21,18,0.6)",
                padding: "clamp(28px, 3vw, 44px)",
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                minHeight: 320,
                gap: 14,
                transition: "background 0.4s ease",
                overflow: "hidden",
              }}
            >
              {/* Top gradient strip */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: STRIPES[a.slug] ?? STRIPES.nayims,
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-red)",
                  fontWeight: 700,
                  marginTop: 8,
                }}
              >
                {a.tag} <span style={{ color: "var(--color-mute)" }}>· {a.client}</span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 600,
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--color-paper)",
                  margin: 0,
                }}
              >
                {a.headline}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--color-paper-soft)",
                  margin: 0,
                  marginBottom: "auto",
                  maxWidth: "48ch",
                }}
              >
                {a.body}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  paddingTop: 18,
                  borderTop: "1px solid var(--color-hairline)",
                  marginTop: 8,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(28px, 3vw, 40px)",
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
                      fontSize: 9,
                      letterSpacing: "0.16em",
                      color: "var(--color-dim)",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    {a.outcomeLabel}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-paper)",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Read case <span style={{ fontSize: 14 }}>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .work-card:hover { background: rgba(28,26,22,0.85) !important; }
        @media (max-width: 880px) {
          .work-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
