import Link from "next/link";

/**
 * Section 07 — Final CTA.
 *
 * Modelled on Tony Mak's "The right brief finds the right person"
 * + Ascend's "Ready to ascend your web3 project?" — a single
 * decisive closing statement with one CTA + supporting line.
 *
 * No imagery. Type-led close. Lime primary CTA + email link.
 */
export function Section07Cta() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        padding: "clamp(180px, 22vw, 280px) 0",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        borderTop: "1px solid var(--color-hairline)",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric lime glow bottom-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-15%",
          bottom: "-30%",
          width: "60%",
          height: "80%",
          background:
            "radial-gradient(circle, rgba(180,232,19,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
          position: "relative",
          zIndex: 1,
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
            marginBottom: "clamp(48px, 6vw, 80px)",
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
            07
          </span>
          <span
            style={{ width: 40, height: 1, background: "var(--color-hairline-strong)" }}
          />
          The brief
        </div>

        {/* Massive close statement */}
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 500,
            fontSize: "clamp(3rem, 8vw, 9rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            color: "var(--color-paper)",
            margin: 0,
            marginBottom: "clamp(56px, 7vw, 96px)",
            maxWidth: "16ch",
          }}
        >
          The right brief{" "}
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--color-red)",
            }}
          >
            finds
          </span>{" "}
          the right studio.
        </h2>

        {/* Body + CTA row */}
        <div
          className="cta-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "end",
            paddingTop: "clamp(40px, 5vw, 64px)",
            borderTop: "1px solid var(--color-hairline)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.6vw, 22px)",
              lineHeight: 1.5,
              color: "var(--color-paper-soft)",
              margin: 0,
              maxWidth: "44ch",
            }}
          >
            Bring numbers. We&rsquo;ll tell you what we&rsquo;d do — in
            writing, before you pay anything. 30 minutes. No pitch.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 16,
            }}
          >
            <Link
              href="/contact"
              data-cur="hold"
              data-magnetic=""
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "20px 36px",
                background: "var(--color-red)",
                color: "var(--color-night)",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                borderRadius: 999,
                textDecoration: "none",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-red-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-red)";
              }}
            >
              Book a slot
              <span style={{ fontSize: 18 }}>→</span>
            </Link>
            <a
              href="mailto:hello@youlookbooked.com"
              data-cur="pen"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-paper-soft)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-hairline-strong)",
                paddingBottom: 2,
              }}
            >
              hello@youlookbooked.com
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .cta-row { grid-template-columns: 1fr !important; align-items: start !important; }
        }
      `}</style>
    </section>
  );
}
