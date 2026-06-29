"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Kinetic Typography Hero — pinned scroll-driven sequence.
 *
 * Three service words zoom up through the viewport in sequence
 * (BESPOKE SOFTWARE → CUSTOM WEBSITES → PAID TRAFFIC). As each word
 * scales toward camera, a lime-on-black "live UI" graphic plays
 * behind it. At the end of the sequence, the static hero content
 * (subhead + CTAs) settles in.
 *
 * Built with GSAP ScrollTrigger pin + scrub. Honours prefers-reduced-
 * motion by skipping the timeline entirely.
 */

export function KineticTypographyHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) {
      // Skip the animation — settle directly on the final state
      gsap.set(".kt-final", { opacity: 1, y: 0 });
      gsap.set(".kt-word-1, .kt-word-2, .kt-word-3", { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial state — words ready to grow in, graphics hidden, final hidden
      gsap.set(".kt-word-1", { scale: 0.4, opacity: 0 });
      gsap.set(".kt-word-2", { scale: 0.4, opacity: 0 });
      gsap.set(".kt-word-3", { scale: 0.4, opacity: 0 });
      gsap.set(".kt-graphic", { opacity: 0, scale: 0.95 });
      gsap.set(".kt-final", { opacity: 0, y: 60 });
      gsap.set(".kt-scroll-cue", { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      // Hide scroll cue once scrolling begins
      tl.to(".kt-scroll-cue", { opacity: 0, duration: 0.15 }, 0);

      // PANEL 1 — Bespoke Software
      tl.to(".kt-word-1", { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
        .to(".kt-graphic-1", { opacity: 0.85, scale: 1, duration: 0.5 }, 0.4)
        .to(".kt-word-1", { scale: 11, opacity: 0, duration: 0.7, ease: "power2.in" }, 1.0)
        .to(".kt-graphic-1", { scale: 1.25, opacity: 0, duration: 0.5 }, 1.4);

      // PANEL 2 — Custom Websites
      tl.to(".kt-word-2", { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 1.8)
        .to(".kt-graphic-2", { opacity: 0.85, scale: 1, duration: 0.5 }, 2.2)
        .to(".kt-word-2", { scale: 11, opacity: 0, duration: 0.7, ease: "power2.in" }, 2.8)
        .to(".kt-graphic-2", { scale: 1.25, opacity: 0, duration: 0.5 }, 3.2);

      // PANEL 3 — Paid Traffic
      tl.to(".kt-word-3", { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 3.6)
        .to(".kt-graphic-3", { opacity: 0.85, scale: 1, duration: 0.5 }, 4.0)
        .to(".kt-word-3", { scale: 11, opacity: 0, duration: 0.7, ease: "power2.in" }, 4.6)
        .to(".kt-graphic-3", { scale: 1.25, opacity: 0, duration: 0.5 }, 5.0);

      // FINAL — settle hero content
      tl.to(".kt-final", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 5.4);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-bg="dark"
      data-hide-site-header
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        background: "#000",
        overflow: "hidden",
        color: "var(--color-paper)",
        zIndex: 1,
      }}
    >
      {/* Top-left index tag */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 32,
          zIndex: 30,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(243,239,230,0.6)",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--color-red)",
            boxShadow: "0 0 10px rgba(180,232,19,0.6)",
          }}
        />
        <span style={{ color: "var(--color-paper)", fontWeight: 700 }}>ylb</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span>v6 prototype</span>
      </div>

      {/* Top-right pagination indicator */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 32,
          zIndex: 30,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(243,239,230,0.45)",
          fontWeight: 600,
        }}
      >
        scroll · 01 → 03
      </div>

      {/* Graphics layer */}
      <div className="kt-graphic kt-graphic-1" style={layerStyle()}>
        <DashboardGraphic />
      </div>
      <div className="kt-graphic kt-graphic-2" style={layerStyle()}>
        <WireframeGraphic />
      </div>
      <div className="kt-graphic kt-graphic-3" style={layerStyle()}>
        <AdsGraphic />
      </div>

      {/* Type layer */}
      <div style={typeStackStyle()}>
        <div className="kt-word-1" style={wordStyle()}>
          <h1 style={hStyle()}>
            BESPOKE
            <br />
            SOFTWARE.
          </h1>
          <div style={tagStyle()}>01 · Custom ops platforms</div>
        </div>
        <div className="kt-word-2" style={wordStyle()}>
          <h1 style={hStyle()}>
            CUSTOM
            <br />
            WEBSITES.
          </h1>
          <div style={tagStyle()}>02 · High-converting builds</div>
        </div>
        <div className="kt-word-3" style={wordStyle()}>
          <h1 style={hStyle()}>
            PAID
            <br />
            TRAFFIC.
          </h1>
          <div style={tagStyle()}>03 · Performance acquisition</div>
        </div>
      </div>

      {/* Scroll cue — disappears after first scroll */}
      <div
        className="kt-scroll-cue"
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(243,239,230,0.6)",
          fontWeight: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        Scroll
        <span
          aria-hidden
          style={{
            width: 1,
            height: 36,
            background: "var(--color-red)",
            opacity: 0.7,
            animation: "kt-line 1.8s ease-in-out infinite",
            transformOrigin: "top",
          }}
        />
      </div>

      {/* Final hero — settles in last */}
      <div
        className="kt-final"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 clamp(24px, 4vw, 72px)",
          gap: 28,
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(2.4rem, 5vw, 5.4rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "var(--color-paper)",
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          Bespoke{" "}
          <span style={{ color: "var(--color-red)" }}>software.</span>{" "}
          Custom{" "}
          <span style={{ color: "var(--color-red)" }}>websites.</span> Paid{" "}
          <span style={{ color: "var(--color-red)" }}>traffic.</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.4vw, 19px)",
            color: "rgba(243,239,230,0.7)",
            maxWidth: "48ch",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          A UK studio. Two operators. Direct line. Built for ambitious SMEs.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            pointerEvents: "auto",
          }}
        >
          <Link href="/contact" style={primaryCta()}>
            Book a slot <span>→</span>
          </Link>
          <Link href="/work" style={secondaryCta()}>
            See the work
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes kt-line {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}

/* ============================================================ */
/* STYLE HELPERS                                                */
/* ============================================================ */

function layerStyle(): React.CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    willChange: "transform, opacity",
  };
}

function typeStackStyle(): React.CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    zIndex: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

function wordStyle(): React.CSSProperties {
  return {
    position: "absolute",
    textAlign: "center",
    transformOrigin: "center center",
    willChange: "transform, opacity",
  };
}

function hStyle(): React.CSSProperties {
  return {
    fontFamily: "var(--font-syne)",
    fontWeight: 800,
    fontSize: "clamp(60px, 13vw, 220px)",
    lineHeight: 0.92,
    letterSpacing: "-0.05em",
    color: "var(--color-red)",
    margin: 0,
    textShadow: "0 0 80px rgba(180,232,19,0.22)",
  };
}

function tagStyle(): React.CSSProperties {
  return {
    fontFamily: "var(--font-mono)",
    fontSize: "clamp(10px, 0.9vw, 13px)",
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: "rgba(243,239,230,0.7)",
    fontWeight: 600,
    marginTop: 18,
  };
}

function primaryCta(): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 28px",
    background: "var(--color-red)",
    color: "var(--color-night)",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 700,
    borderRadius: 999,
    textDecoration: "none",
  };
}

function secondaryCta(): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 28px",
    background: "rgba(243,239,230,0.06)",
    border: "1px solid rgba(243,239,230,0.18)",
    color: "var(--color-paper)",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 700,
    borderRadius: 999,
    textDecoration: "none",
  };
}

/* ============================================================ */
/* GRAPHIC COMPONENTS                                           */
/* ============================================================ */

function DashboardGraphic() {
  const ROWS = [
    { label: "Stock per line", value: "142 / 200" },
    { label: "Mockup approved", value: "✓" },
    { label: "Production scheduled", value: "● live" },
    { label: "QuickBooks synced", value: "£4,280" },
    { label: "Customer portal · sessions", value: "11 active" },
    { label: "Designer · multi-placement", value: "engaged" },
  ];
  return (
    <div
      style={{
        width: "min(90vw, 1100px)",
        padding: "32px",
        border: "1px solid rgba(180,232,19,0.28)",
        borderRadius: 4,
        background: "rgba(0,0,0,0.55)",
        boxShadow: "0 0 80px rgba(180,232,19,0.06)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-red)",
          fontWeight: 700,
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>● ops.ylb.studio · live</span>
        <span style={{ color: "rgba(243,239,230,0.5)" }}>last sync · 14s ago</span>
      </div>
      {ROWS.map((row, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: "1px solid rgba(180,232,19,0.1)",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "rgba(243,239,230,0.78)",
          }}
        >
          <span>{row.label}</span>
          <span style={{ color: "var(--color-red)" }}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function WireframeGraphic() {
  return (
    <div
      style={{
        width: "min(80vw, 950px)",
        height: "min(58vh, 580px)",
        border: "1px solid rgba(180,232,19,0.28)",
        borderRadius: 4,
        background: "rgba(0,0,0,0.55)",
        overflow: "hidden",
        boxShadow: "0 0 80px rgba(180,232,19,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 36,
          borderBottom: "1px solid rgba(180,232,19,0.15)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 4, background: "var(--color-red)", opacity: 0.7 }} />
        <span style={{ width: 8, height: 8, borderRadius: 4, background: "rgba(243,239,230,0.22)" }} />
        <span style={{ width: 8, height: 8, borderRadius: 4, background: "rgba(243,239,230,0.22)" }} />
        <span style={{ marginLeft: 16, fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(243,239,230,0.4)", letterSpacing: "0.16em" }}>
          jcsetton.com
        </span>
      </div>
      <div
        style={{
          margin: 24,
          height: 48,
          borderBottom: "1px solid rgba(180,232,19,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexShrink: 0,
        }}
      >
        <div style={{ width: 96, height: 14, background: "rgba(180,232,19,0.5)" }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 40, height: 10, background: "rgba(243,239,230,0.22)" }} />
          <div style={{ width: 60, height: 10, background: "rgba(243,239,230,0.22)" }} />
          <div style={{ width: 80, height: 28, background: "var(--color-red)", borderRadius: 14 }} />
        </div>
      </div>
      <div style={{ padding: "0 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: 24 }}>
        <div>
          <div style={{ width: "75%", height: 28, background: "rgba(243,239,230,0.45)", marginBottom: 8 }} />
          <div style={{ width: "55%", height: 28, background: "rgba(243,239,230,0.45)", marginBottom: 18 }} />
          <div style={{ width: "40%", height: 12, background: "rgba(243,239,230,0.18)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: "4/3",
                background: "rgba(180,232,19,0.08)",
                border: "1px solid rgba(180,232,19,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AdsGraphic() {
  const BARS = [22, 32, 30, 44, 52, 58, 56, 72, 78, 90, 98, 108];
  const METRICS = [
    { label: "Impressions · 30d", value: "284k" },
    { label: "Cost per lead", value: "£18.40" },
    { label: "ROAS", value: "4.2×" },
  ];
  return (
    <div
      style={{
        width: "min(90vw, 1100px)",
        padding: "32px",
        border: "1px solid rgba(180,232,19,0.28)",
        borderRadius: 4,
        background: "rgba(0,0,0,0.55)",
        boxShadow: "0 0 80px rgba(180,232,19,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-red)",
            fontWeight: 700,
          }}
        >
          ● campaign performance · last 30 days
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 52,
              color: "var(--color-red)",
              lineHeight: 0.95,
              fontWeight: 400,
              letterSpacing: "-0.03em",
            }}
          >
            £42,180
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(243,239,230,0.55)",
              marginTop: 4,
            }}
          >
            recovered spend
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          height: 180,
          marginBottom: 24,
          borderBottom: "1px solid rgba(180,232,19,0.15)",
          paddingBottom: 4,
        }}
      >
        {BARS.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}px`,
              background: "var(--color-red)",
              opacity: 0.32 + (i / BARS.length) * 0.62,
            }}
          />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
        {METRICS.map((m, i) => (
          <div key={i}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 28,
                color: "var(--color-paper)",
                lineHeight: 1,
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(243,239,230,0.5)",
                marginTop: 6,
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
