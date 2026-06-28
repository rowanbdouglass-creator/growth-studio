"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Counter } from "@/components/fx/Counter";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Week-view calendar grid. v2:
 * - Outer perspective wrapper tilts with mouse position (real 3D feel,
 *   no WebGL needed)
 * - Each booked cell fills via an SVG brushstroke clip-path animation,
 *   not a flat opacity reveal
 * - Cells are individually hoverable; cursor morphs to "cell" mode
 * - Counter ticks with the cascade
 */

type CellState = 0 | 1;

const PATTERN: CellState[][] = [
  // 09  10  11  12  13  14  15  16  17  18  19
  [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // Mon
  [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1], // Tue
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0], // Wed
  [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0], // Thu
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1], // Fri
  [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0], // Sat
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Sun
];

const HOURS = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
const DAYS = ["MON 24", "TUE 25", "WED 26", "THU 27", "FRI 28", "SAT 29", "SUN 30"];

interface CalendarGridProps {
  zoomTarget?: { day: number; hour: number };
}

export function CalendarGrid({ zoomTarget }: CalendarGridProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const totalBooked = PATTERN.flat().filter((c) => c === 1).length;

  // Mouse-parallax 3D tilt
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let rafId = 0;
    let tRx = 0;
    let tRy = 0;
    let rx = 0;
    let ry = 0;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      tRy = dx * 12; // rotateY
      tRx = -dy * 8; // rotateX
    };

    const loop = () => {
      rx += (tRx - rx) * 0.08;
      ry += (tRy - ry) * 0.08;
      if (gridRef.current) {
        gridRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Brushstroke cascade reveal
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cells = grid.querySelectorAll<HTMLElement>(".cal-booked");

    if (reduced) {
      gsap.set(cells, { clipPath: "inset(0 0 0 0)" });
      return;
    }

    gsap.set(cells, { clipPath: "inset(0 100% 0 0)" });

    const tween = gsap.to(cells, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.0,
      ease: "expo.out",
      stagger: { each: 0.045, from: "start" },
      scrollTrigger: {
        trigger: grid,
        start: "top 75%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        perspective: "1400px",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        ref={gridRef}
        className="ylb-cal-grid"
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(380px, 52vh, 560px)",
          display: "grid",
          gridTemplateColumns: "44px repeat(7, 1fr)",
          gridTemplateRows: "22px repeat(11, 1fr)",
          background: "var(--color-slip)",
          border: "1px solid rgba(27,26,23,0.16)",
          fontFamily: "var(--font-mono)",
          transformStyle: "preserve-3d",
          transition: "transform 0.05s linear",
          willChange: "transform",
          boxShadow:
            "0 30px 80px -20px rgba(27,26,23,0.18), 0 8px 24px -8px rgba(27,26,23,0.12)",
        }}
        aria-hidden
      >
        <style>{`
          .ylb-cal-grid .cal-head {
            font-size: 10px;
            letter-spacing: 0.16em;
            color: var(--color-pencil);
            font-weight: 600;
            text-transform: uppercase;
            display: flex;
            align-items: flex-end;
            padding: 0 8px 4px;
            border-bottom: 1px solid rgba(27,26,23,0.16);
            position: relative;
          }
          .ylb-cal-grid .cal-corner {
            border-right: 1px solid rgba(27,26,23,0.16);
            border-bottom: 1px solid rgba(27,26,23,0.16);
          }
          .ylb-cal-grid .cal-head:not(.last) {
            border-right: 1px solid rgba(27,26,23,0.08);
          }
          .ylb-cal-grid .cal-hour {
            font-size: 10px;
            color: var(--color-pencil-soft, #B2A99D);
            border-right: 1px solid rgba(27,26,23,0.16);
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 4px;
            font-weight: 600;
          }
          .ylb-cal-grid .cal-cell {
            border-right: 1px solid rgba(27,26,23,0.08);
            border-bottom: 1px solid rgba(27,26,23,0.08);
            position: relative;
            transition: background 0.25s ease;
          }
          .ylb-cal-grid .cal-cell:hover { background: rgba(196, 71, 46, 0.08); }
          .ylb-cal-grid .cal-cell.re { border-right: 0; }
          .ylb-cal-grid .cal-booked {
            position: absolute;
            inset: 3px;
            background: var(--color-red);
            will-change: clip-path, transform;
          }
          /* Brushstroke effect — radial gradient that simulates paint texture */
          .ylb-cal-grid .cal-booked::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0,0,0,0.12), transparent 55%);
            mix-blend-mode: overlay;
          }
          .ylb-cal-grid .cal-booked.zoom-target {
            outline: 1.5px solid var(--color-ink);
            outline-offset: 2px;
            z-index: 2;
          }
          .ylb-cal-grid .cal-counter {
            position: absolute;
            top: clamp(8px, 1.2vw, 16px);
            right: clamp(8px, 1.2vw, 16px);
            background: var(--color-ink);
            color: var(--color-paper);
            padding: 8px 12px;
            font-family: var(--font-mono);
            font-size: 10px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            font-weight: 600;
            display: flex;
            flex-direction: column;
            gap: 2px;
            z-index: 5;
            transform: translateZ(20px);
          }
          .ylb-cal-grid .cal-counter b {
            color: var(--color-red);
            font-size: 14px;
            letter-spacing: 0.04em;
            font-feature-settings: "tnum";
          }
        `}</style>

        <div className="cal-corner" />

        {DAYS.map((d, i) => (
          <div key={d} className={`cal-head ${i === 6 ? "last" : ""}`}>
            {d}
          </div>
        ))}

        {HOURS.map((hour, hIdx) => (
          <Row key={hour} hour={hour} hIdx={hIdx} zoomTarget={zoomTarget} />
        ))}

        <div className="cal-counter">
          <span>Slots booked</span>
          <b>
            <Counter to={totalBooked} duration={1400} /> / 42
          </b>
        </div>
      </div>
    </div>
  );
}

function Row({
  hour,
  hIdx,
  zoomTarget,
}: {
  hour: string;
  hIdx: number;
  zoomTarget?: { day: number; hour: number };
}) {
  return (
    <>
      <div className="cal-hour">{hour}</div>
      {DAYS.map((_, dIdx) => {
        const isBooked = PATTERN[dIdx]?.[hIdx] === 1;
        const isLast = dIdx === 6;
        const isZoomTarget =
          zoomTarget?.day === dIdx && zoomTarget?.hour === hIdx;
        return (
          <div
            key={`${hour}-${dIdx}`}
            className={`cal-cell ${isLast ? "re" : ""}`}
            data-cur={isBooked ? "cell" : undefined}
          >
            {isBooked && (
              <div
                className={`cal-booked ${isZoomTarget ? "zoom-target" : ""}`}
                data-d={dIdx}
                data-h={hIdx}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
