"use client";

import Link from "next/link";

/**
 * HeroFinal — clean static hero, polished with the inspiration set
 * we agreed on BEFORE the Spatial Festival 3D detour:
 *
 *   Ascend     — centred composition, two CTAs, scroll cue,
 *                small status pill, atmospheric restraint
 *   Code Jesse — typography-led, lots of negative space
 *   Monolog    — refined centred type
 *
 * Composition:
 *   - Status pill top-right ("Available Week 27" with pulse dot)
 *   - Big 3-line service statement, lime nouns
 *   - Single-sentence subhead
 *   - Lime primary CTA + glass secondary CTA
 *   - "Scroll" cue bottom-left with animated hairline
 *   - Subtle grain overlay for analog tooth
 *
 * No video, no Three.js, no kinetic — the restraint IS the move.
 */
export function HeroFinal() {
  return (
    <section
      data-bg="dark"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100svh",
        background: "transparent",
        color: "var(--color-paper)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // Push the vertically-centred content down so it never sits
        // right up against the transition seam
        paddingTop: "clamp(80px, 12vh, 160px)",
      }}
    >
      {/* Top-fade — seamlessly bleeds the black intro video into the
          lime-lightning backdrop. Solid black at the very top (matches
          intro), fades to transparent over ~35vh so lightning reveals
          gradually with no hard seam. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40vh",
          pointerEvents: "none",
          zIndex: 2,
          background:
            "linear-gradient(180deg, rgba(14,13,11,1) 0%, rgba(14,13,11,0.95) 25%, rgba(14,13,11,0.65) 55%, rgba(14,13,11,0.25) 80%, rgba(14,13,11,0) 100%)",
        }}
      />

      {/* Radial vignette over centre — keeps hero text legible
          against the page-wide lime-lightning backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, rgba(14,13,11,0.75) 0%, rgba(14,13,11,0.5) 35%, rgba(14,13,11,0.18) 70%, rgba(14,13,11,0) 100%)",
        }}
      />

      {/* Status pill top-right */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 32,
          zIndex: 5,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 14px",
          background: "rgba(243,239,230,0.06)",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
          border: "1px solid rgba(243,239,230,0.18)",
          borderRadius: 999,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--color-paper)",
          fontWeight: 600,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--color-red)",
            boxShadow: "0 0 10px rgba(180,232,19,0.55)",
            animation: "hf-pulse 2.4s ease-in-out infinite",
          }}
        />
        Available Week 27
      </div>

      {/* Centre content */}
      <div
        style={{
          textAlign: "center",
          padding: "0 clamp(24px, 4vw, 72px)",
          maxWidth: 1400,
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "clamp(2.6rem, 7vw, 6.6rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            margin: 0,
            marginBottom: "clamp(28px, 3vw, 40px)",
          }}
        >
          Bespoke{" "}
          <span style={{ color: "var(--color-red)" }}>software.</span>
          <br />
          Custom{" "}
          <span style={{ color: "var(--color-red)" }}>websites.</span>
          <br />
          Paid{" "}
          <span style={{ color: "var(--color-red)" }}>traffic.</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(16px, 1.4vw, 19px)",
            lineHeight: 1.5,
            color: "rgba(243,239,230,0.72)",
            maxWidth: "48ch",
            margin: "0 auto",
            marginBottom: "clamp(36px, 4vw, 56px)",
          }}
        >
          A UK studio building the systems, sites and traffic that grow
          ambitious SMEs.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 28px",
              background: "var(--color-red)",
              color: "var(--color-night)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: 999,
              textDecoration: "none",
              transition: "background 0.25s ease",
            }}
          >
            Book a slot <span>→</span>
          </Link>
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 28px",
              background: "rgba(243,239,230,0.06)",
              backdropFilter: "blur(14px) saturate(150%)",
              WebkitBackdropFilter: "blur(14px) saturate(150%)",
              border: "1px solid rgba(243,239,230,0.18)",
              color: "var(--color-paper)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: 999,
              textDecoration: "none",
              transition: "background 0.25s ease, border-color 0.25s ease",
            }}
          >
            See the work
          </Link>
        </div>
      </div>

      {/* Scroll cue bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 32,
          zIndex: 5,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(243,239,230,0.65)",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 16,
          pointerEvents: "none",
        }}
      >
        Scroll
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 32,
            height: 1,
            background: "var(--color-paper)",
            opacity: 0.5,
            animation: "hf-line 2.2s ease-in-out infinite",
            transformOrigin: "left",
          }}
        />
      </div>

      <style>{`
        @keyframes hf-line {
          0%   { transform: scaleX(0); transform-origin: left; }
          50%  { transform: scaleX(1); transform-origin: left; }
          51%  { transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        @keyframes hf-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.55; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}
