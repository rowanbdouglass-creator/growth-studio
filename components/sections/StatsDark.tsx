"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

/**
 * Stats panel — Trionn-style key facts. Four cards in an asymmetric grid
 * where one card is a hero stat with NumberTicker, one is a quote, and
 * the others are smaller proof points.
 */
export function StatsDark() {
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
            <span style={{ color: "var(--color-red)" }}>●</span> KEY FACTS
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
            A snapshot of{" "}
            <span className="serif-italic">our work.</span>
          </h2>
        </header>

        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 1,
            background: "var(--color-hairline)",
            border: "1px solid var(--color-hairline)",
          }}
        >
          <style>{`
            @media (max-width: 880px) { .stats-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; } .st-hero { grid-row: auto !important; grid-column: auto !important; } }
            .st-card { background: var(--color-night); padding: clamp(28px, 3vw, 44px); display: flex; flex-direction: column; min-height: 200px; }
            .st-card .lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-dim); margin-bottom: auto; }
            .st-card .val { font-family: var(--font-syne); font-weight: 700; font-size: clamp(48px, 6vw, 88px); line-height: 0.9; letter-spacing: -0.04em; color: var(--color-paper); margin-top: 28px; }
            .st-card .val em { font-style: italic; font-family: var(--font-serif); font-weight: 400; color: var(--color-red); }
            .st-card .sub { font-family: var(--font-sans); font-size: 13px; line-height: 1.5; color: var(--color-mute); margin-top: 12px; max-width: 32ch; }
            .st-hero { grid-row: span 2; background: var(--color-night-soft); position: relative; overflow: hidden; }
            .st-hero::before { content: ""; position: absolute; top: -40%; right: -20%; width: 70%; height: 80%; background: radial-gradient(circle, var(--color-red-glow) 0%, transparent 60%); pointer-events: none; }
            .st-hero .quote { font-family: var(--font-serif); font-style: italic; font-weight: 400; font-size: clamp(28px, 3.4vw, 52px); line-height: 1.15; letter-spacing: -0.02em; color: var(--color-paper); margin-top: 32px; }
            .st-hero .quote-mark { font-family: var(--font-serif); font-style: italic; color: var(--color-red); font-size: 1.4em; line-height: 0.5; }
            .st-hero .attribution { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-dim); margin-top: auto; padding-top: 32px; }
            .st-hero .attribution b { color: var(--color-paper); font-weight: 700; }
          `}</style>

          <div className="st-card st-hero">
            <span className="lbl">FEATURED · GSAP</span>
            <p className="quote">
              <span className="quote-mark">&ldquo;</span>
              Their work consistently ranks among the most considered
              implementations of motion we see — built for clients, not
              for awards, which is why it wins both.
              <span className="quote-mark">&rdquo;</span>
            </p>
            <span className="attribution">
              <b>GREENSOCK</b> · UNSOLICITED, 2026
            </span>
          </div>

          <div className="st-card">
            <span className="lbl">REVENUE TRACKED</span>
            <span className="val">
              £<NumberTicker value={128} className="text-paper" />k
            </span>
            <span className="sub">Through systems we built · 12 months</span>
          </div>

          <div className="st-card">
            <span className="lbl">PROJECTS DELIVERED</span>
            <span className="val">
              <NumberTicker value={12} className="text-paper" /> <em>/yr</em>
            </span>
            <span className="sub">Selective intake — quality over volume</span>
          </div>

          <div className="st-card">
            <span className="lbl">CLIENT RETENTION</span>
            <span className="val">
              <NumberTicker value={92} className="text-paper" />%
            </span>
            <span className="sub">Year-2 retention across active clients</span>
          </div>

          <div className="st-card">
            <span className="lbl">FASTEST RECOVERY</span>
            <span className="val">
              <NumberTicker value={11} className="text-paper" /> <em>days</em>
            </span>
            <span className="sub">Compromise → fully clean (Cape Kings)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
