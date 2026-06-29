"use client";

import { useState } from "react";
import Link from "next/link";
import { APPOINTMENTS } from "@/lib/content/appointments";

/**
 * Section 04 — Selected work, Monolog-style single-case carousel.
 *
 * Solid full-black background (deliberate full stop to the video
 * backdrop). One case shown at a time inside a thin-bordered frame:
 *   - Left:  brand-coloured gradient placeholder (drop-in slot for a
 *            real screenshot when we have one)
 *   - Right: tag, headline, body, outcome figure, "Read case"
 *
 * Top row: numbered eyebrow + 01/04 pagination with prev/next arrows.
 * Bottom row: dot indicators + "All work" link.
 */

const STRIPES: Record<string, string> = {
  nayims: "linear-gradient(135deg, #C4472E 0%, #5C2114 100%)",
  "jc-setton": "linear-gradient(135deg, #4A7BA8 0%, #1A2530 100%)",
  "cape-kings": "linear-gradient(135deg, #A93A24 0%, #2A1A14 100%)",
  "forum-studios": "linear-gradient(135deg, #6C7896 0%, #1A1D2D 100%)",
};

export function Section04Work() {
  const [i, setI] = useState(0);
  const total = APPOINTMENTS.length;
  const a = APPOINTMENTS[i];

  const goPrev = () => setI((p) => (p - 1 + total) % total);
  const goNext = () => setI((p) => (p + 1) % total);

  const arrowBtn = (label: string, onClick: () => void, glyph: string) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid var(--color-hairline-strong)",
        background: "transparent",
        color: "var(--color-paper)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 16,
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(243,239,230,0.06)";
        e.currentTarget.style.borderColor = "var(--color-paper)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "var(--color-hairline-strong)";
      }}
    >
      {glyph}
    </button>
  );

  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(140px, 18vw, 240px) 0",
        background: "#000000",
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
        {/* Top: eyebrow left, pagination right */}
        <div
          className="case-top"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            marginBottom: "clamp(48px, 6vw, 80px)",
            flexWrap: "wrap",
          }}
        >
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
                lineHeight: 1,
              }}
            >
              04
            </span>
            <span
              style={{
                width: 40,
                height: 1,
                background: "var(--color-hairline-strong)",
              }}
            />
            Selected work
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            {arrowBtn("Previous case", goPrev, "←")}
            <span
              style={{
                minWidth: 72,
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.22em",
                color: "var(--color-paper-soft)",
                fontWeight: 600,
              }}
            >
              <span style={{ color: "var(--color-paper)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(total).padStart(2, "0")}
            </span>
            {arrowBtn("Next case", goNext, "→")}
          </div>
        </div>

        {/* The framed showcase */}
        <div
          className="case-frame"
          style={{
            border: "1px solid var(--color-hairline-strong)",
            borderRadius: 4,
            padding: "clamp(20px, 2.4vw, 36px)",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "clamp(28px, 3.5vw, 56px)",
            background: "rgba(18,17,15,0.6)",
          }}
        >
          {/* Visual — brand-gradient placeholder. Drop a real screenshot
              in here later by replacing with an <img> / next/image. */}
          <div
            style={{
              position: "relative",
              background: STRIPES[a.slug] ?? STRIPES.nayims,
              borderRadius: 2,
              overflow: "hidden",
              minHeight: 380,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "clamp(24px, 3vw, 44px)",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.20,
                mixBlendMode: "overlay",
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                backgroundSize: "240px",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 18,
                left: 18,
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(243,239,230,0.55)",
                fontWeight: 700,
              }}
            >
              Preview · {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(243,239,230,0.65)",
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                {a.client}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 600,
                  fontSize: "clamp(34px, 3.6vw, 56px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.035em",
                  color: "var(--color-paper)",
                  maxWidth: "12ch",
                  textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                }}
              >
                {a.tag.toLowerCase()}.
              </div>
            </div>
          </div>

          {/* Right: metadata sidebar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              padding: "clamp(8px, 1vw, 16px) 0",
              minHeight: 380,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-red)",
                fontWeight: 700,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-red)",
                  boxShadow: "0 0 8px var(--color-red-glow)",
                }}
              />
              {a.tag}
            </div>

            <h3
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "clamp(26px, 2.6vw, 38px)",
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
                fontSize: "clamp(14px, 1.05vw, 16px)",
                lineHeight: 1.55,
                color: "var(--color-paper-soft)",
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              {a.body}
            </p>

            <div
              style={{
                marginTop: "auto",
                paddingTop: 24,
                borderTop: "1px solid var(--color-hairline)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(40px, 4.4vw, 64px)",
                  color: "var(--color-red)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: 4,
                }}
              >
                {a.outcomeFigure}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  color: "var(--color-mute)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 24,
                }}
              >
                {a.outcomeLabel}
              </div>

              <Link
                href={`/work/${a.slug}`}
                data-cur="case"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-paper)",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderBottom: "1px solid var(--color-paper)",
                  paddingBottom: 4,
                }}
              >
                Read case
                <span style={{ fontSize: 14 }}>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: dot indicators + all work link */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 32,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {APPOINTMENTS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show case ${idx + 1}`}
                aria-current={idx === i ? "true" : undefined}
                style={{
                  width: idx === i ? 28 : 8,
                  height: 8,
                  borderRadius: 999,
                  background:
                    idx === i ? "var(--color-red)" : "var(--color-hairline-strong)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
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
              fontWeight: 700,
              textDecoration: "none",
              borderBottom: "1px solid var(--color-paper)",
              paddingBottom: 4,
            }}
          >
            All work →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .case-frame { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
