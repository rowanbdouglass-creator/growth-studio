/**
 * Section 05 — Stats / proof numbers.
 *
 * Modelled on Jesse's "30+ websites / 40+ clients / 10+ years" panel
 * and Tony Mak's stat callouts. Big serif italic figures + small mono
 * caption underneath. 4-up grid on desktop, 2-up on mobile.
 *
 * Figures pulled from real YLB case study outcomes.
 */

const STATS = [
  {
    figure: "£128k",
    label: "Revenue tracked through systems we built · 12 mo",
  },
  {
    figure: "£42,180",
    label: "Recovered from mis-allocated ad spend · 90 days",
  },
  {
    figure: "96 / mo",
    label: "Operational hours recovered for client teams",
  },
  {
    figure: "11 → 1",
    label: "Days to quote post-recovery · Cape Kings",
  },
];

export function Section05Stats() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        padding: "clamp(140px, 18vw, 240px) 0",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        borderTop: "1px solid var(--color-hairline)",
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
            05
          </span>
          <span
            style={{ width: 40, height: 1, background: "var(--color-hairline-strong)" }}
          />
          Proof, not promises
        </div>

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
          Numbers we{" "}
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--color-red)",
            }}
          >
            tracked.
          </span>{" "}
          Not figures we&rsquo;d like to claim.
        </h2>

        {/* 4-up grid */}
        <div
          className="stat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--color-hairline)",
            borderTop: "1px solid var(--color-hairline-strong)",
            borderBottom: "1px solid var(--color-hairline-strong)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="stat-cell"
              style={{
                padding: "clamp(40px, 5vw, 72px) clamp(20px, 2.4vw, 40px)",
                background: "var(--color-night)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(64px, 6.4vw, 112px)",
                  color: "var(--color-paper)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.04em",
                }}
              >
                {s.figure}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-mute)",
                  lineHeight: 1.5,
                  fontWeight: 600,
                  marginTop: "auto",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
