"use client";

import { useEffect, useRef } from "react";
import { Counter } from "@/components/fx/Counter";

/**
 * Operations dashboard mockup — header strip, 3 KPI cards, 12-bar chart.
 * KPI cards animate in cascade and the numbers tick up; chart bars
 * scale up sequentially.
 */

const CHART_HEIGHTS = [30, 42, 38, 55, 48, 62, 58, 72, 68, 82, 88, 96];

export function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      node.classList.add("dash-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            node.classList.add("dash-in");
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="ylb-dash"
      style={{
        background: "#27261F",
        border: "1px solid #3A3833",
        padding: 18,
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridAutoRows: "minmax(60px, auto)",
        gap: 10,
        borderRadius: 4,
        position: "relative",
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5)",
      }}
      aria-hidden
    >
      <style>{`
        .ylb-dash .dash-head {
          grid-column: span 6;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-bottom: 14px;
          border-bottom: 1px solid #3A3833;
          margin-bottom: 6px;
        }
        .ylb-dash .dash-ttl {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: 16px;
          letter-spacing: -0.01em;
          color: var(--color-paper);
        }
        .ylb-dash .dash-meta {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.18em;
          color: var(--color-pencil-soft, #B2A99D);
          text-transform: uppercase;
        }
        .ylb-dash .dash-card {
          background: var(--color-ink);
          border: 1px solid #3A3833;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-radius: 3px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ylb-dash.dash-in .dash-card {
          opacity: 1;
          transform: translateY(0);
        }
        .ylb-dash.dash-in .dash-card:nth-child(2) { transition-delay: 0.15s; }
        .ylb-dash.dash-in .dash-card:nth-child(3) { transition-delay: 0.25s; }
        .ylb-dash.dash-in .dash-card:nth-child(4) { transition-delay: 0.35s; }
        .ylb-dash.dash-in .dash-card:nth-child(5) { transition-delay: 0.45s; }
        .ylb-dash .dash-card.kpi {
          grid-column: span 2;
          min-height: 90px;
        }
        .ylb-dash .dash-card.chart {
          grid-column: span 6;
          min-height: 140px;
        }
        @media (max-width: 760px) {
          .ylb-dash .dash-card.kpi {
            grid-column: span 6;
          }
        }
        .ylb-dash .dash-l {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.16em;
          color: var(--color-pencil-soft, #B2A99D);
          text-transform: uppercase;
          font-weight: 600;
        }
        .ylb-dash .dash-v {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: clamp(22px, 2.4vw, 32px);
          color: var(--color-paper);
          letter-spacing: -0.02em;
          font-feature-settings: "tnum";
          line-height: 1;
        }
        .ylb-dash .dash-v em {
          font-style: normal;
          color: var(--color-red);
        }
        .ylb-dash .dash-d {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--color-red);
          letter-spacing: 0.06em;
          font-feature-settings: "tnum";
          font-weight: 600;
        }
        .ylb-dash .dash-chart-bars {
          display: flex;
          align-items: end;
          gap: 4px;
          height: 90px;
          margin-top: 12px;
        }
        .ylb-dash .dash-chart-bars .b {
          flex: 1;
          background: var(--color-red);
          border-radius: 1px;
          transform-origin: bottom;
          transform: scaleY(0);
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ylb-dash.dash-in .dash-chart-bars .b {
          transform: scaleY(1);
        }
        ${CHART_HEIGHTS.map((_, i) =>
          `.ylb-dash.dash-in .dash-chart-bars .b:nth-child(${i + 1}) { transition-delay: ${0.5 + i * 0.05}s; }`
        ).join("\n")}
      `}</style>

      <div className="dash-head">
        <div className="dash-ttl">Nayim&rsquo;s Hub · Live</div>
        <div className="dash-meta">TUE 28 JUN · 14:02 · ALL SYSTEMS HEALTHY</div>
      </div>

      <div className="dash-card kpi">
        <div className="dash-l">REVENUE MTD</div>
        <div className="dash-v">
          <Counter to={128000} prefix="£" format="k" duration={1400} />
        </div>
        <div className="dash-d">↑ 31% VS LAST MO</div>
      </div>

      <div className="dash-card kpi">
        <div className="dash-l">JOBS IN PROD</div>
        <div className="dash-v">
          <Counter to={42} duration={1200} />
        </div>
        <div className="dash-d">↑ 8 NEW TODAY</div>
      </div>

      <div className="dash-card kpi">
        <div className="dash-l">HRS RECOVERED</div>
        <div className="dash-v">
          <Counter to={96} duration={1200} />
          <em>/mo</em>
        </div>
        <div className="dash-d">VS Q1 BASELINE</div>
      </div>

      <div className="dash-card chart">
        <div className="dash-l">BOOKINGS · LAST 12 WEEKS</div>
        <div className="dash-chart-bars">
          {CHART_HEIGHTS.map((h, i) => (
            <div key={i} className="b" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
