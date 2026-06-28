/**
 * Process — 5 steps in a vertical hairline timeline. Each step has a
 * giant serif italic number, mono day label, headline, body.
 * Inspired by Monolog's "PROJECT JOURNEY" block.
 */
const STEPS = [
  {
    day: "DAY 01 · MON",
    label: "Audit",
    body: "We open your ad accounts, your CRM, your back office. We read the numbers. By Friday you have a written audit of what we found.",
  },
  {
    day: "DAY 02 · TUE",
    label: "Discovery",
    body: "Two operators, your business, one room. We map the funnel and the back office end to end — and find what's leaking.",
  },
  {
    day: "DAY 03 · WED",
    label: "Quote",
    body: "Written scope, fixed price for build work, retainer for traffic. In writing, before you pay anything.",
  },
  {
    day: "DAY 04 · THU",
    label: "Decide",
    body: "You sit with it. You ask the awkward questions. We answer them in writing. No follow-up pressure.",
  },
  {
    day: "DAY 05 · FRI",
    label: "Build",
    body: "If we're a fit, we start. Sprint planning, Loom updates, weekly reports. Stuff ships. You see it ship.",
  },
];

export function ProcessDark() {
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
        <header style={{ marginBottom: "clamp(56px, 7vw, 96px)" }}>
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
            HOW WE WORK
          </div>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 600,
              fontSize: "clamp(2.4rem, 7vw, 8rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              maxWidth: "12ch",
            }}
          >
            Five days.<br />
            <span className="serif-italic">No theatre.</span>
          </h2>
        </header>

        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {STEPS.map((s, i) => (
            <li
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 200px 1fr",
                gap: "clamp(20px, 3vw, 56px)",
                padding: "clamp(28px, 3.6vw, 56px) 0",
                borderTop: "1px solid var(--color-hairline)",
                alignItems: "start",
              }}
              className="proc-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(56px, 7vw, 116px)",
                  color: "var(--color-paper)",
                  lineHeight: 0.84,
                  letterSpacing: "-0.04em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    color: "var(--color-red)",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {s.day}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 600,
                    fontSize: "clamp(28px, 3vw, 44px)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1,
                    marginTop: 14,
                    color: "var(--color-paper)",
                  }}
                >
                  {s.label}
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(15px, 1.3vw, 18px)",
                  lineHeight: 1.6,
                  color: "var(--color-paper-soft)",
                  maxWidth: "52ch",
                }}
              >
                {s.body}
              </p>
            </li>
          ))}
        </ol>
        <style>{`
          @media (max-width: 880px) {
            .proc-row { grid-template-columns: 1fr !important; gap: 8px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
