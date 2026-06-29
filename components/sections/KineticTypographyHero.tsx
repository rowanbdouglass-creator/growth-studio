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

const ROOMS: { title: string[]; desc: string }[] = [
  {
    title: ["BESPOKE", "SOFTWARE."],
    desc: "Custom ops platforms — quote-to-invoice, stock-per-line, customer portals — built for ambitious UK SMEs.",
  },
  {
    title: ["CUSTOM", "WEBSITES."],
    desc: "High-converting builds in WordPress and Next.js, designed to pass the credibility check in ninety seconds.",
  },
  {
    title: ["PAID", "TRAFFIC."],
    desc: "Performance acquisition on Meta and Google, run daily by the two operators who own the work.",
  },
  {
    title: ["FOR AMBITIOUS", "UK SMES."],
    desc: "Two operators. Direct line. AI-native. No retainers. No proposal decks. No account managers in between.",
  },
];

// Each room owns this much of the timeline before the next one starts.
// Higher = more uncontested scroll per room.
const ROOM_STRIDE = 0.55;

// Per-cube base rotation so the side walls are visible from the start
// (this is what creates the "letters in front of letters" ghost look
// even at scale 0.5 with cursor centred).
const ROOM_ROTATIONS = [
  { rotationX: 4, rotationY: 1 },
  { rotationX: -5, rotationY: 1 },
  { rotationX: 3, rotationY: -1 },
  { rotationX: -6, rotationY: 1 },
];

function RoomContent({
  title,
  desc,
}: {
  title: string[];
  desc: string;
}) {
  return (
    <div className="kt-room-content">
      <div className="kt-room-title">
        {title.map((line, idx) => (
          <div key={idx} className="kt-room-line">
            {line}
          </div>
        ))}
      </div>
      <p className="kt-room-desc">{desc}</p>
    </div>
  );
}

function Room({
  title,
  desc,
  index,
}: {
  title: string[];
  desc: string;
  index: number;
}) {
  return (
    <div className={`kt-room kt-room-${index}`}>
      <div className="kt-cube">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className={`kt-wall kt-w-${n}`}>
            <div className="kt-internal">
              <RoomContent title={title} desc={desc} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function KineticTypographyHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mouse-driven perspective-origin parallax (the "look around inside
  // the cube" effect). Smoothed with rAF lerp toward cursor target.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const section = sectionRef.current;
    if (!section) return;

    let targetX = 0.5;
    let targetY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = (e.clientY - rect.top) / rect.height;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      // Map 0..1 cursor to perspective-origin offset (~ ±30% / ±20%)
      const px = 50 + (0.5 - currentX) * 60;
      const py = 50 + (0.5 - currentY) * 40;
      section.style.setProperty("--kt-px", `${px}%`);
      section.style.setProperty("--kt-py", `${py}%`);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

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
      // Initial per-cube rotation so side walls are visible from start
      ROOM_ROTATIONS.forEach((r, i) => {
        gsap.set(`.kt-room-${i} .kt-cube`, {
          scale: 0.5,
          rotationX: r.rotationX,
          rotationY: r.rotationY,
        });
      });
      gsap.set(".kt-room", { opacity: 0 });
      gsap.set(".kt-final", { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=900%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      ROOMS.forEach((_, i) => {
        const start = i * ROOM_STRIDE;
        // Each room gets ~ROOM_STRIDE (0.55) units of dedicated zoom
        const zoomDuration = ROOM_STRIDE * 0.95; // 0.52

        tl.fromTo(
          `.kt-room-${i}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.12, ease: "power2.out" },
          start
        );

        // Scale: modest grow
        tl.to(
          `.kt-room-${i} .kt-cube`,
          { scale: 1.3, duration: zoomDuration, ease: "power2.in" },
          start
        );

        // Perspective: shrinks dramatically (this is the 3D fish-eye)
        tl.fromTo(
          `.kt-room-${i} .kt-cube`,
          { perspective: "350vmin" },
          { perspective: "90vmin", duration: zoomDuration, ease: "power2.in" },
          start
        );

        // Fade out at the very end of this room's window
        tl.to(
          `.kt-room-${i}`,
          { opacity: 0, duration: 0.15, ease: "power2.in" },
          start + zoomDuration - 0.05
        );
      });

      const finalStart = ROOMS.length * ROOM_STRIDE + 0.05;
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
      {ROOMS.map((room, i) => (
        <Room key={i} title={room.title} desc={room.desc} index={i} />
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

        /* The 70vmin perspective wrapper.
           perspective-origin tracks the cursor via CSS vars set
           from the rAF loop in JS — that's the "look around" effect.
           Rotation is set via GSAP per-room in the timeline init. */
        .kt-cube {
          position: relative;
          width: 70vmin;
          height: 70vmin;
          transform-style: preserve-3d;
          perspective: 350vmin;
          perspective-origin: var(--kt-px, 50%) var(--kt-py, 50%);
          will-change: transform, perspective, perspective-origin;
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

        /* Content fills the cube interior — title + description */
        .kt-room-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2vmin;
          text-align: center;
          padding: 2vmin;
          color: var(--color-paper);
          max-width: 44vmin;
        }

        .kt-room-title {
          display: flex;
          flex-direction: column;
        }

        .kt-room-line {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: 9vmin;
          letter-spacing: -0.05em;
          line-height: 0.88;
        }

        .kt-room-desc {
          font-family: var(--font-sans);
          font-weight: 400;
          font-size: 2vmin;
          letter-spacing: -0.005em;
          line-height: 1.35;
          color: rgba(243, 239, 230, 0.78);
          margin: 0;
          max-width: 30vmin;
        }
      `}</style>
    </section>
  );
}
