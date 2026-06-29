/**
 * Section 02 — Philosophy / belief statement.
 *
 * Modelled on Tony Mak's philosophy moment: a sharp contrast claim
 * that picks a fight with the industry, set in massive type with
 * the second half visually offset for rhythm. No imagery — words do
 * all the work. The statement IS the section.
 *
 * Headline: "Most agencies sell decks. We sell calendars that fill."
 * Layout: numbered eyebrow → two-line statement (line 2 right-offset
 * with italic emphasis) → supporting body → small signature line.
 */
export function Section02Philosophy() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(140px, 18vw, 240px) 0",
        background:
          "linear-gradient(180deg, rgba(14,13,11,0.45) 0%, rgba(14,13,11,0.78) 45%, rgba(14,13,11,0.88) 100%)",
        color: "var(--color-paper)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
          position: "relative",
        }}
      >
        {/* Numbered eyebrow top-left */}
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
            marginBottom: "clamp(56px, 7vw, 96px)",
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
            02
          </span>
          <span
            style={{
              width: 40,
              height: 1,
              background: "var(--color-hairline-strong)",
            }}
          />
          Philosophy
        </div>

        {/* Two-line contrast statement */}
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 500,
            fontSize: "clamp(2.4rem, 6vw, 7rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            color: "var(--color-paper)",
            margin: 0,
            marginBottom: "clamp(56px, 7vw, 96px)",
          }}
        >
          <span style={{ display: "block", maxWidth: "20ch" }}>
            Most agencies sell{" "}
            <span style={{ color: "var(--color-mute)" }}>decks.</span>
          </span>
          <span
            className="philo-line2"
            style={{
              display: "block",
              marginTop: "clamp(8px, 1.5vw, 24px)",
              paddingLeft: "clamp(0px, 12vw, 200px)",
              maxWidth: "22ch",
            }}
          >
            We sell{" "}
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--color-red)",
              }}
            >
              calendars
            </span>{" "}
            that fill.
          </span>
        </h2>

        {/* Supporting body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 5vw, 80px)",
            paddingTop: "clamp(32px, 4vw, 56px)",
            borderTop: "1px solid var(--color-hairline)",
          }}
          className="philo-body"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(16px, 1.5vw, 20px)",
                lineHeight: 1.55,
                color: "var(--color-paper-soft)",
                margin: 0,
                maxWidth: "48ch",
              }}
            >
              We don&rsquo;t pitch. We open your ad accounts, read the
              numbers, write the scope. The first invoice is for
              completed work — never for deferred promises.
            </p>
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-mute)",
              lineHeight: 1.8,
              fontWeight: 600,
            }}
          >
            ● No retainers held hostage
            <br />
            ● No proposal decks
            <br />
            ● No account managers in between
            <br />
            <span style={{ color: "var(--color-paper)" }}>
              ● Two operators. Direct line.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .philo-line2 { padding-left: 0 !important; }
          .philo-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
