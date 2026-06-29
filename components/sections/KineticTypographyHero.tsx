"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * KineticTypographyHero — CSS 3D room fly-through.
 *
 * Faithful adaptation of the loader technique from
 * spatial-festival.program.studio. Five wall children form a
 * virtual room around the camera:
 *
 *   .kt-w-1  front face          no transform
 *   .kt-w-2  left wall           rotateY( 80deg)
 *   .kt-w-3  right wall          rotateY(-80deg)
 *   .kt-w-4  ceiling             rotateX(-80deg)
 *   .kt-w-5  floor               rotateX( 80deg)
 *
 * Each wall carries the same content. Each `.kt-internal` is
 * clip-pathed so only the strip closest to the camera is visible
 * AND counter-rotated so the text stays oriented to the viewer.
 * The wrapper has perspective: 350vmin. The `.kt-cube` container
 * starts at scale(0.5).
 *
 * On scroll, GSAP scales the cube from 0.5 → 1.5 → 2.6 + fade
 * out. As scale grows, the room expands AROUND the camera —
 * creating the fly-through perspective effect (you appear to
 * move forward into / through the text on the walls).
 *
 * After the fly-through, the static hero settles in.
 *
 * Honours prefers-reduced-motion: skips timeline, renders the
 * static hero immediately.
 */

const ROOM = {
  title: "ylb",
  lines: ["Bespoke software.", "Custom websites.", "Paid traffic."],
};

function RoomContent() {
  return (
    <div className="kt-room-content">
      <div className="kt-room-title">{ROOM.title}</div>
      <div className="kt-room-lines">
        {ROOM.lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}

export function KineticTypographyHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) {
      gsap.set(".kt-cube", { scale: 1 });
      gsap.set(".kt-final", { opacity: 1, y: 0 });
      gsap.set(".kt-scroll-cue", { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".kt-cube", { scale: 0.5, opacity: 1 });
      gsap.set(".kt-final", { opacity: 0, y: 40 });
      gsap.set(".kt-scroll-cue", { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.to(".kt-scroll-cue", { opacity: 0, duration: 0.08 }, 0);
      tl.to(".kt-cube", { scale: 1.5, duration: 0.55, ease: "power2.in" }, 0);
      tl.to(".kt-cube", { scale: 2.6, opacity: 0, duration: 0.2 }, 0.55);
      tl.to(
        ".kt-final",
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        0.78
      );
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
        background: "#0E0D0B",
        overflow: "hidden",
        zIndex: 1,
        color: "var(--color-paper)",
      }}
    >
      {/* 3D ROOM */}
      <div className="kt-wrapper">
        <div className="kt-cube">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={`kt-wall kt-w-${n}`}>
              <div className="kt-internal">
                <RoomContent />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top-left tag */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 32,
          zIndex: 50,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--color-paper)",
          mixBlendMode: "difference",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 10,
          pointerEvents: "none",
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
        ylb · v6
      </div>

      <div
        style={{
          position: "absolute",
          top: 28,
          right: 32,
          zIndex: 50,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--color-paper)",
          mixBlendMode: "difference",
          fontWeight: 600,
          opacity: 0.65,
          pointerEvents: "none",
        }}
      >
        scroll · fly through
      </div>

      {/* Scroll cue */}
      <div
        className="kt-scroll-cue"
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--color-paper)",
          mixBlendMode: "difference",
          fontWeight: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          pointerEvents: "none",
        }}
      >
        Scroll
        <span
          aria-hidden
          style={{
            width: 1,
            height: 36,
            background: "currentColor",
            opacity: 0.7,
            animation: "kt-line 1.8s ease-in-out infinite",
            transformOrigin: "top",
          }}
        />
      </div>

      {/* Final hero — settles after the fly-through */}
      <div
        className="kt-final"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 100,
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
          <span style={{ color: "var(--color-red)" }}>software.</span> Custom{" "}
          <span style={{ color: "var(--color-red)" }}>websites.</span> Paid{" "}
          <span style={{ color: "var(--color-red)" }}>traffic.</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.4vw, 19px)",
            color: "rgba(243,239,230,0.75)",
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
          <Link
            href="/contact"
            style={{
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
            }}
          >
            Book a slot <span>→</span>
          </Link>
          <Link
            href="/work"
            style={{
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
            }}
          >
            See the work
          </Link>
        </div>
      </div>

      <style>{`
        /* ============================================================ */
        /* 3D ROOM TECHNIQUE                                            */
        /* ============================================================ */

        .kt-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 70vmin;
          height: 70vmin;
          perspective: 350vmin;
          transform: translate(-50%, -50%);
          z-index: 5;
        }

        .kt-cube {
          position: relative;
          width: 100%;
          height: 100%;
          transform: scale(0.5);
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }

        /* Masking frame at depth — hides everything outside the
           cube interior. 46vmin square at 70vmin depth, with a
           100vmin solid outline acting as the surround. */
        .kt-cube::before {
          content: "";
          position: absolute;
          height: 46vmin;
          width: 46vmin;
          left: 50%;
          top: 50%;
          outline: 100vmin solid #0E0D0B;
          transform: translate3d(-50%, -50%, 70vmin);
          z-index: 1;
        }

        .kt-wall {
          width: 70vmin;
          height: 70vmin;
          perspective: 350vmin;
        }

        .kt-wall,
        .kt-wall .kt-internal {
          align-items: center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          background-color: #0E0D0B;
          display: flex;
          justify-content: center;
        }

        .kt-wall .kt-internal {
          position: relative;
          height: 100%;
          width: 100%;
        }

        .kt-wall:not(.kt-w-1) {
          position: absolute;
          left: 0;
          top: 0;
        }

        /* LEFT WALL */
        .kt-w-2 {
          perspective: 71.1173vmin;
          perspective-origin: -318.3594vmin 50%;
          transform: rotateY(80deg);
          transform-origin: 24.5vmin 50%;
        }
        .kt-w-2 .kt-internal {
          clip-path: polygon(0 0, 36% 0, 36% 100%, 0 100%);
          transform: rotateY(-80deg);
          transform-origin: 24.5vmin 50%;
        }

        /* RIGHT WALL */
        .kt-w-3 {
          perspective: 70.4280vmin;
          perspective-origin: 387.7810vmin 50%;
          transform: rotateY(-80deg);
          transform-origin: 44.8vmin 50%;
        }
        .kt-w-3 .kt-internal {
          clip-path: polygon(63% 0, 100% 0, 100% 100%, 63% 100%);
          transform: rotateY(80deg);
          transform-origin: 44.8vmin 50%;
        }

        /* CEILING */
        .kt-w-4 {
          perspective: 71.7603vmin;
          perspective-origin: 50% -322.0060vmin;
          transform: rotateX(-80deg);
          transform-origin: 50% 24.5vmin;
        }
        .kt-w-4 .kt-internal {
          clip-path: polygon(0 0, 100% 0, 100% 36%, 0 36%);
          transform: rotateX(80deg);
          transform-origin: 50% 24.5vmin;
        }

        /* FLOOR */
        .kt-w-5 {
          perspective: 71.0281vmin;
          perspective-origin: 50% 391.1845vmin;
          transform: rotateX(80deg);
          transform-origin: 50% 44.8vmin;
        }
        .kt-w-5 .kt-internal {
          clip-path: polygon(0 63%, 100% 63%, 100% 100%, 0 100%);
          transform: rotateX(-80deg);
          transform-origin: 50% 44.8vmin;
        }

        /* ============================================================ */
        /* ROOM CONTENT TYPOGRAPHY                                      */
        /* ============================================================ */

        .kt-room-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3.5vmin;
          text-align: center;
          padding: 4vmin;
          color: var(--color-paper);
        }

        .kt-room-title {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: 16vmin;
          letter-spacing: -0.05em;
          line-height: 0.88;
          color: var(--color-red);
        }

        .kt-room-lines {
          font-family: var(--font-syne);
          font-weight: 500;
          font-size: 4.4vmin;
          letter-spacing: -0.02em;
          line-height: 1.18;
        }

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
