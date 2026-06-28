"use client";

import { useEffect, useRef } from "react";
import { Counter } from "@/components/fx/Counter";

/**
 * Week-view calendar grid with cells that fill red in cascade when the
 * grid enters viewport. The pattern of booked cells is intentional
 * (looks like a real busy operator's week, not random scatter).
 *
 * Counter ticks up to the total booked count.
 */

type CellState = 0 | 1; // 0 = open, 1 = booked

// Day × Hour pattern: 7 days, 11 hours (09:00 to 19:00).
// 1 = booked. Chosen to look like a real plausible-busy operator's
// week, not random.
const PATTERN: CellState[][] = [
  // 09  10  11  12  13  14  15  16  17  18  19
  [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // Mon
  [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1], // Tue
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0], // Wed
  [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0], // Thu
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1], // Fri
  [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0], // Sat
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Sun (always empty)
];

const HOURS = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
const DAYS = ["MON 24", "TUE 25", "WED 26", "THU 27", "FRI 28", "SAT 29", "SUN 30"];

interface CalendarGridProps {
  /** Highlight this cell as the "zoom target" — kept slightly larger. */
  zoomTarget?: { day: number; hour: number };
}

export function CalendarGrid({ zoomTarget }: CalendarGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const totalBooked = PATTERN.flat().filter((c) => c === 1).length;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      node.classList.add("cal-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            node.classList.add("cal-in");
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="ylb-cal-grid"
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(380px, 52vh, 560px)",
        display: "grid",
        gridTemplateColumns: "44px repeat(7, 1fr)",
        gridTemplateRows: "22px repeat(11, 1fr)",
        background: "var(--color-slip)",
        border: "1px solid var(--color-grid-line-strong, rgba(27,26,23,0.16))",
        fontFamily: "var(--font-mono)",
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
        }
        .ylb-cal-grid .cal-cell.re {
          border-right: 0;
        }
        .ylb-cal-grid .cal-booked {
          position: absolute;
          inset: 3px;
          background: var(--color-red);
          opacity: 0;
          transform: scaleY(0);
          transform-origin: top;
          transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--d, 0ms);
        }
        .ylb-cal-grid.cal-in .cal-booked {
          opacity: 0.92;
          transform: scaleY(1);
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
        }
        .ylb-cal-grid .cal-counter b {
          color: var(--color-red);
          font-size: 14px;
          letter-spacing: 0.04em;
          font-feature-settings: "tnum";
        }
      `}</style>

      {/* Top-left corner cell */}
      <div className="cal-corner" />

      {/* Day headers */}
      {DAYS.map((d, i) => (
        <div key={d} className={`cal-head ${i === 6 ? "last" : ""}`}>
          {d}
        </div>
      ))}

      {/* Rows: hour label + 7 cells */}
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
        // Stagger delay: front-loaded for visual rhythm, max 1200ms
        const delay = Math.min(1200, hIdx * 80 + dIdx * 50);
        return (
          <div
            key={`${hour}-${dIdx}`}
            className={`cal-cell ${isLast ? "re" : ""}`}
          >
            {isBooked && (
              <div
                className={`cal-booked ${isZoomTarget ? "zoom-target" : ""}`}
                style={{ ["--d" as string]: `${delay}ms` }}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
