"use client";

/**
 * Named testimonial — Trionn-style. Quote on the right, big italic
 * client name + role left, optional "listen to him" audio cue.
 * Single quote, single name, single image cell — no carousel.
 */
export function TestimonialDark() {
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
            CLIENT STORIES
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
            Great work is built{" "}
            <span className="serif-italic">through partnership.</span>
          </h2>
        </header>

        <div
          className="test-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "start",
            paddingTop: 48,
            borderTop: "1px solid var(--color-hairline)",
          }}
        >
          <style>{`@media (max-width: 880px) { .test-grid { grid-template-columns: 1fr !important; } }`}</style>

          <aside>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-dim)",
                lineHeight: 2.2,
                fontWeight: 600,
              }}
            >
              <li style={{ color: "var(--color-paper)" }}>
                JC SETTON OPTICIANS{" "}
                <span style={{ color: "var(--color-red)" }}>→</span>
              </li>
              <li>NAYIM&rsquo;S EMBROIDERIES</li>
              <li>CAPE KINGS</li>
              <li>FORUM STUDIOS</li>
            </ul>
          </aside>

          <article>
            <blockquote
              style={{
                margin: 0,
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(24px, 2.8vw, 40px)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: "var(--color-paper)",
              }}
            >
              <span
                style={{
                  color: "var(--color-red)",
                  fontSize: "1.4em",
                  lineHeight: 0.5,
                  marginRight: 8,
                }}
              >
                &ldquo;
              </span>
              They didn&rsquo;t pitch us. They booked a call, looked at the
              numbers, and found{" "}
              <span style={{ color: "var(--color-red)" }}>
                £42,000 we&rsquo;d already written off
              </span>
              . Then built the thing that stops it happening again. They&rsquo;re
              on next week&rsquo;s diary too.
              <span
                style={{
                  color: "var(--color-red)",
                  fontSize: "1.4em",
                  lineHeight: 0.5,
                  marginLeft: 4,
                }}
              >
                &rdquo;
              </span>
            </blockquote>

            <footer
              style={{
                marginTop: 48,
                display: "flex",
                gap: 24,
                alignItems: "center",
                flexWrap: "wrap",
                paddingTop: 24,
                borderTop: "1px solid var(--color-hairline)",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--color-red) 0%, #5C2114 100%)",
                  display: "inline-grid",
                  placeItems: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--color-paper)",
                }}
              >
                JS
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "var(--color-paper)",
                  }}
                >
                  James Setton
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-dim)",
                    marginTop: 2,
                  }}
                >
                  DIRECTOR · JC SETTON
                </div>
              </div>
              <button
                style={{
                  marginLeft: "auto",
                  background: "transparent",
                  border: "1px solid var(--color-hairline-strong)",
                  padding: "10px 18px",
                  borderRadius: 999,
                  color: "var(--color-paper)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                }}
                data-magnetic=""
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-red)";
                  e.currentTarget.style.color = "var(--color-red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-hairline-strong)";
                  e.currentTarget.style.color = "var(--color-paper)";
                }}
              >
                <span style={{ fontSize: 14 }}>▷</span> LISTEN
              </button>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
