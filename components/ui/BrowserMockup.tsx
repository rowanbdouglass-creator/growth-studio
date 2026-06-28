"use client";

import { useEffect, useRef } from "react";
import { Counter } from "@/components/fx/Counter";

/**
 * 3D-tilted browser frame with a fake landing page inside. Content
 * reveals in cascade when the mockup enters viewport; a red bar fills
 * the CTA button; a BOOKED stamp drops in last.
 *
 * Used inside HeroWebsite to demonstrate "we make your website feel
 * like this."
 */
export function BrowserMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      node.classList.add("br-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            node.classList.add("br-in");
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="ylb-browser"
      style={{
        background: "var(--color-paper)",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow:
          "0 30px 80px -20px rgba(27,26,23,0.45), 0 12px 30px -10px rgba(27,26,23,0.25)",
        transform: "perspective(1400px) rotateY(-5deg) rotateX(2deg)",
        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
      }}
    >
      <style>{`
        .ylb-browser:hover {
          transform: perspective(1400px) rotateY(-2deg) rotateX(1deg);
        }
        @media (max-width: 880px) {
          .ylb-browser {
            transform: none !important;
          }
        }
        .ylb-browser .br-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 12px;
          background: #E8E0CE;
          border-bottom: 1px solid var(--color-rule);
        }
        .ylb-browser .br-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .ylb-browser .br-dot.r { background: #E45B43; }
        .ylb-browser .br-dot.y { background: #E8B83A; }
        .ylb-browser .br-dot.g { background: #3DA958; }
        .ylb-browser .br-url {
          margin-left: 14px;
          background: var(--color-paper);
          padding: 4px 12px;
          border-radius: 3px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--color-pencil);
          letter-spacing: 0.05em;
          flex: 1;
          max-width: 300px;
          text-align: center;
        }
        .ylb-browser .br-body {
          padding: 24px 22px;
          min-height: 340px;
          background: var(--color-paper);
          position: relative;
        }
        @media (max-width: 880px) {
          .ylb-browser .br-body {
            min-height: 280px;
          }
        }
        .ylb-browser .br-eyebrow {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--color-pencil);
          text-transform: uppercase;
          margin-bottom: 10px;
          opacity: 0;
          transition: opacity 0.5s ease 0.2s;
        }
        .ylb-browser .br-head {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(20px, 2.4vw, 32px);
          line-height: 1;
          letter-spacing: -0.025em;
          color: var(--color-ink);
          margin-bottom: 14px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease 0.35s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s;
        }
        .ylb-browser .br-sub {
          font-size: 11px;
          line-height: 1.5;
          color: var(--color-ink-soft);
          margin-bottom: 20px;
          opacity: 0;
          transition: opacity 0.5s ease 0.55s;
        }
        .ylb-browser .br-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: var(--color-ink);
          color: var(--color-paper);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.5s ease 0.75s, transform 0.5s ease 0.75s;
          position: relative;
          overflow: hidden;
          border: 0;
        }
        .ylb-browser .br-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--color-red);
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 1.2s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .ylb-browser .br-cta > * {
          position: relative;
          z-index: 1;
        }
        .ylb-browser .br-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px dashed var(--color-rule);
        }
        .ylb-browser .br-stat {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .ylb-browser .br-stat:nth-child(1) { transition-delay: 1s; }
        .ylb-browser .br-stat:nth-child(2) { transition-delay: 1.15s; }
        .ylb-browser .br-stat:nth-child(3) { transition-delay: 1.3s; }
        .ylb-browser .br-stat-v {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 22px;
          color: var(--color-red);
          font-feature-settings: "tnum";
          letter-spacing: -0.01em;
          line-height: 1;
        }
        .ylb-browser .br-stat-l {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--color-pencil);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-top: 5px;
        }
        .ylb-browser .br-stamp {
          position: absolute;
          bottom: 18px;
          right: 18px;
          border: 2px solid var(--color-red);
          color: var(--color-red);
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.18em;
          padding: 8px 14px;
          transform: rotate(-8deg) scale(0);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s, opacity 0.4s ease 1.4s;
        }
        .ylb-browser.br-in .br-eyebrow,
        .ylb-browser.br-in .br-sub {
          opacity: 1;
        }
        .ylb-browser.br-in .br-head,
        .ylb-browser.br-in .br-cta {
          opacity: 1;
          transform: translateY(0);
        }
        .ylb-browser.br-in .br-cta::before {
          transform: scaleX(1);
        }
        .ylb-browser.br-in .br-stat {
          opacity: 1;
          transform: translateY(0);
        }
        .ylb-browser.br-in .br-stamp {
          transform: rotate(-8deg) scale(1);
          opacity: 1;
        }
      `}</style>

      <div className="br-bar">
        <span className="br-dot r" />
        <span className="br-dot y" />
        <span className="br-dot g" />
        <span className="br-url">https://nayims-embroideries.co.uk</span>
      </div>

      <div className="br-body">
        <div className="br-eyebrow">— EMBROIDERY · UK · SINCE 2009</div>
        <div className="br-head">
          Custom embroidery, on time, every time.
        </div>
        <div className="br-sub">
          Caps, jackets and uniforms for UK businesses. Quote in 24 hours,
          dispatch in 14 days.
        </div>
        <button className="br-cta">
          <span>Get a quote</span>
        </button>
        <div className="br-stats">
          <div className="br-stat">
            <div className="br-stat-v">
              <Counter to={34} suffix="×" duration={1200} />
            </div>
            <div className="br-stat-l">CONV. RATE LIFT</div>
          </div>
          <div className="br-stat">
            <div className="br-stat-v">0.8s</div>
            <div className="br-stat-l">LCP MOBILE</div>
          </div>
          <div className="br-stat">
            <div className="br-stat-v">
              <Counter to={128000} prefix="£" format="k" duration={1400} />
            </div>
            <div className="br-stat-l">TRACKED · 12 MO</div>
          </div>
        </div>
        <div className="br-stamp">BOOKED ✓</div>
      </div>
    </div>
  );
}
