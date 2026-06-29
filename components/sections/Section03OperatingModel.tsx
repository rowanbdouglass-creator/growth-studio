import Link from "next/link";

/**
 * Section 03 — Operating Model.
 *
 * Modelled on Tony Mak's 3-column Code/Craft/Commercial block. For
 * YLB: Systems / Sites / Traffic — three disciplines run by the same
 * two operators. Each column has a serif italic number, a short
 * keyword name, a one-sentence definition, and a link to the service
 * detail page.
 *
 * No visuals — type carries everything (more editorial, less template).
 */

const COLUMNS = [
  {
    number: "01",
    name: "Systems",
    href: "/services/custom-systems",
    body:
      "Operations software that fits the shape of your business, not the other way round. End-to-end, owned by you, hosted where you want.",
  },
  {
    number: "02",
    name: "Sites",
    href: "/services/website-design",
    body:
      "Marketing sites and storefronts that pass the credibility check in 90 seconds, load in under a second, and turn referrals into booked calls.",
  },
  {
    number: "03",
    name: "Traffic",
    href: "/services/paid-traffic",
    body:
      "Paid acquisition that lands qualified, attributable leads. Run daily by the two operators who own the work — no account-manager layer.",
  },
];

export function Section03OperatingModel() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(140px, 18vw, 240px) 0",
        background:
          "linear-gradient(180deg, rgba(14,13,11,0.88) 0%, rgba(14,13,11,0.96) 55%, rgba(14,13,11,1) 100%)",
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
        {/* Top numbered eyebrow */}
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
            03
          </span>
          <span
            style={{
              width: 40,
              height: 1,
              background: "var(--color-hairline-strong)",
            }}
          />
          Operating model
        </div>

        {/* Section headline */}
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 500,
            fontSize: "clamp(2.4rem, 5.4vw, 6rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            color: "var(--color-paper)",
            margin: 0,
            marginBottom: "clamp(72px, 9vw, 120px)",
            maxWidth: "18ch",
          }}
        >
          Three disciplines.{" "}
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--color-red)",
            }}
          >
            One studio.
          </span>
        </h2>

        {/* Three-column grid */}
        <div
          className="om-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            borderTop: "1px solid var(--color-hairline)",
          }}
        >
          {COLUMNS.map((col, i) => (
            <article
              key={col.number}
              className="om-col"
              style={{
                padding: "clamp(40px, 5vw, 72px) clamp(20px, 2.4vw, 40px)",
                borderRight:
                  i < COLUMNS.length - 1
                    ? "1px solid var(--color-hairline)"
                    : "none",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(72px, 8vw, 120px)",
                  lineHeight: 0.84,
                  letterSpacing: "-0.04em",
                  color: "var(--color-paper)",
                  opacity: 0.92,
                }}
              >
                {col.number}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 600,
                  fontSize: "clamp(28px, 3vw, 44px)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  color: "var(--color-paper)",
                  margin: 0,
                }}
              >
                {col.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  lineHeight: 1.6,
                  color: "var(--color-paper-soft)",
                  margin: 0,
                  maxWidth: "36ch",
                  flex: 1,
                }}
              >
                {col.body}
              </p>
              <Link
                href={col.href}
                data-cur="pen"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-paper)",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  paddingTop: 18,
                  borderTop: "1px solid var(--color-hairline)",
                  marginTop: "auto",
                  width: "fit-content",
                  transition: "color 0.3s ease",
                }}
              >
                Read more <span style={{ fontSize: 14 }}>→</span>
              </Link>
            </article>
          ))}
        </div>

        <style>{`
          @media (max-width: 880px) {
            .om-grid { grid-template-columns: 1fr !important; border-top: 1px solid var(--color-hairline) !important; }
            .om-col { border-right: none !important; border-bottom: 1px solid var(--color-hairline); }
            .om-col:last-child { border-bottom: none; }
          }
        `}</style>
      </div>
    </section>
  );
}
