"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * KineticTypographyHero — 5-wall CSS 3D rooms.
 *
 * Each "room" = 5 walls of a virtual cube (front + left + right +
 * ceiling + floor, all rotated 80deg). Same text painted on every
 * wall. The 80deg rotations produce the "side face of a 3D letter"
 * look when the camera enters the room — that's where the
 * extruded-letter aesthetic in the reference comes from.
 *
 * Multiple rooms stacked at different Z. Each room individually
 * scales 0.5 -> 2.5 -> 4 as the scroll progresses through its
 * window. As one finishes (camera has passed through it), the
 * next behind starts.
 *
 * Text is sized to fit inside the 46vmin window that the
 * `::before` outline mask creates. No tags, no scroll cue, no
 * extras.
 */

const ROOMS = [
  ["BESPOKE", "SOFTWARE."],
  ["CUSTOM", "WEBSITES."],
  ["PAID", "TRAFFIC."],
  ["FOR AMBITIOUS", "UK SMES."],
];

const ROOM_STRIDE = 0.34;

function RoomContent({ lines }: { lines: string[] }) {
  return (
    <div className="kt-room-content">
      {lines.map((line, idx) => (
        <div key={idx} className="kt-room-line">
          {line}
        </div>
      ))}
    </div>
  );
}

function Room({ lines, index }: { lines: string[]; index: number }) {
  return (
    <div className={`kt-room kt-room-${index}`}>
      <div className="kt-cube">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className={`kt-wall kt-w-${n}`}>
            <div className="kt-internal">
              <RoomContent lines={lines} />
            </div>
          </div>
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
      gsap.set(".kt-final", { opacity: 1, y: 0 });
      gsap.set(".kt-room", { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".kt-cube", { scale: 0.5 });
      gsap.set(".kt-room", { opacity: 0 });
      gsap.set(".kt-final", { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      ROOMS.forEach((_, i) => {
        const start = i * ROOM_STRIDE;

        // Room emerges
        tl.fromTo(
          `.kt-room-${i}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.12, ease: "power2.out" },
          start
        );

        // Cube scales up — camera dives through the room
        tl.fromTo(
          `.kt-room-${i} .kt-cube`,
          { scale: 0.5 },
          { scale: 4, duration: 0.55, ease: "power2.in" },
          start
        );

        // Room fades as the camera passes through it
        tl.to(
          `.kt-room-${i}`,
          { opacity: 0, duration: 0.18, ease: "power2.in" },
          start + 0.42
        );
      });

      const finalStart = (ROOMS.length - 1) * ROOM_STRIDE + 0.65;
      tl.to(
        ".kt-final",
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
        finalStart
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
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
      {ROOMS.map((lines, i) => (
        <Room key={i} lines={lines} index={i} />
      ))}

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
        </div>
      </div>

      <style>{`
        /* Room positioning */
        .kt-room {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: opacity;
        }

        /* The 70vmin perspective wrapper */
        .kt-cube {
          position: relative;
          width: 70vmin;
          height: 70vmin;
          transform: scale(0.5);
          transform-style: preserve-3d;
          perspective: 350vmin;
          will-change: transform;
        }

        /* Outline mask at depth — hides everything outside the cube
           interior. Same color as section bg so it blends. */
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

        /* Content sized to fit inside the 46vmin window */
        .kt-room-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1vmin;
          text-align: center;
          padding: 3vmin;
          color: var(--color-paper);
          max-width: 42vmin;
        }

        .kt-room-line {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: 6vmin;
          letter-spacing: -0.04em;
          line-height: 0.95;
        }
      `}</style>
    </section>
  );
}
