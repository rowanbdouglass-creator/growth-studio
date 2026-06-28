"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BracketLabel } from "@/components/brand/BracketLabel";
import { APPOINTMENTS } from "@/lib/content/appointments";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Past appointments — case studies formatted as calendar entries.
 * Massive Syne date numbers (80px), tag + client + headline + body,
 * outcome figure + scheduling metadata on the right.
 */
export function PastAppointments() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Cursor-proximity warp on date numbers
  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const nums = sectionRef.current.querySelectorAll<HTMLElement>(".ylb-appt .num");

    let rafId = 0;
    let cursorX = -10000;
    let cursorY = -10000;
    const targets: { el: HTMLElement; tx: number; ty: number; cx: number; cy: number }[] = [];
    nums.forEach((el) => {
      targets.push({ el, tx: 0, ty: 0, cx: 0, cy: 0 });
    });

    const onMove = (e: PointerEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    };

    const loop = () => {
      targets.forEach((t) => {
        const r = t.el.getBoundingClientRect();
        const ecx = r.left + r.width / 2;
        const ecy = r.top + r.height / 2;
        const dx = cursorX - ecx;
        const dy = cursorY - ecy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 280;
        if (dist < radius) {
          const f = (1 - dist / radius) * 24;
          t.tx = (dx / dist) * f;
          t.ty = (dy / dist) * f;
        } else {
          t.tx = 0;
          t.ty = 0;
        }
        t.cx += (t.tx - t.cx) * 0.12;
        t.cy += (t.ty - t.cy) * 0.12;
        t.el.style.transform = `translate(${t.cx}px, ${t.cy}px)`;
      });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-bg="light"
      style={{
        padding: "clamp(96px, 11vw, 160px) 0",
        background: "var(--color-paper)",
        color: "var(--color-ink)",
        position: "relative",
      }}
    >
      <style>{`
        .ylb-past-head {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 24px;
          align-items: end;
          margin-bottom: clamp(56px, 7vw, 96px);
        }
        @media (max-width: 880px) {
          .ylb-past-head { grid-template-columns: 1fr; }
        }
        .ylb-past-head h2 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(44px, 7vw, 110px);
          line-height: 0.95;
          letter-spacing: -0.035em;
        }
        .ylb-past-head h2 em {
          font-style: italic;
          color: var(--color-red);
          font-family: var(--font-syne);
        }
        .ylb-past-head .meta-r {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-pencil);
          text-align: right;
          line-height: 1.6;
        }
        .ylb-appts {
          display: flex;
          flex-direction: column;
          border-top: 2px solid var(--color-ink);
        }
        .ylb-appt {
          display: grid;
          grid-template-columns: 170px 1fr 260px;
          gap: clamp(28px, 4vw, 72px);
          padding: 40px 0;
          border-bottom: 1px solid var(--color-rule);
          align-items: start;
          transition: background 0.4s ease;
          color: inherit;
          text-decoration: none;
        }
        .ylb-appt:hover { background: var(--color-slip); }
        @media (max-width: 980px) {
          .ylb-appt { grid-template-columns: 1fr; gap: 20px; }
        }
        .ylb-appt .date {
          font-family: var(--font-mono);
          font-feature-settings: "tnum";
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ylb-appt .date .dow {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--color-red);
          font-weight: 700;
          text-transform: uppercase;
        }
        .ylb-appt .date .num {
          font-family: var(--font-syne);
          font-size: 80px;
          font-weight: 700;
          line-height: 0.9;
          color: var(--color-ink);
          letter-spacing: -0.045em;
          display: inline-block;
          will-change: transform;
          transition: transform 0.18s linear;
        }
        .ylb-appt .date .my {
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--color-pencil);
          text-transform: uppercase;
          font-weight: 500;
          margin-top: 2px;
        }
        .ylb-appt .date .duration-meta {
          font-size: 10px;
          letter-spacing: 0.14em;
          color: var(--color-pencil);
          margin-top: 18px;
          line-height: 1.8;
          text-transform: uppercase;
        }
        .ylb-appt .body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ylb-appt .body .tag {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-red);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ylb-appt .body .tag span {
          color: var(--color-pencil);
          font-weight: 500;
        }
        .ylb-appt .body h3 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(30px, 4.2vw, 60px);
          letter-spacing: -0.025em;
          line-height: 0.98;
        }
        .ylb-appt .body p {
          font-size: 15px;
          line-height: 1.55;
          color: var(--color-ink-soft);
          max-width: 58ch;
        }
        .ylb-appt .body .read {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.16em;
          color: var(--color-pencil);
          text-transform: uppercase;
          font-weight: 600;
          margin-top: 8px;
          transition: color 0.3s ease;
        }
        .ylb-appt:hover .body .read { color: var(--color-ink); }
        .ylb-appt .body .read .arrow {
          transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
          display: inline-block;
        }
        .ylb-appt:hover .body .read .arrow {
          transform: translateX(6px);
        }
        .ylb-appt .out {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ylb-appt .out .figure {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: clamp(32px, 4vw, 48px);
          color: var(--color-red);
          letter-spacing: -0.02em;
          font-feature-settings: "tnum";
          line-height: 0.95;
        }
        .ylb-appt .out .label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-pencil);
          line-height: 1.5;
        }
        .ylb-appt .out .schedule {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--color-ink-soft);
          line-height: 1.7;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--color-rule);
          text-transform: uppercase;
        }
        .ylb-appt .out .schedule b {
          color: var(--color-ink);
          font-weight: 700;
        }
      `}</style>

      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        <div className="ylb-past-head">
          <BracketLabel number="04">past appointments</BracketLabel>
          <h2>
            Twelve done.
            <br />
            Four <em>worth</em> showing.
          </h2>
          <div className="meta-r">
            2024 — 2026
            <br />
            UK · SELECTED
          </div>
        </div>

        <div className="ylb-appts">
          {APPOINTMENTS.map((a) => (
            <Link key={a.slug} href={`/work/${a.slug}`} className="ylb-appt" data-cur="case">
              <div className="date">
                <span className="dow">{a.dayOfWeek}</span>
                <span className="num">{a.day}</span>
                <span className="my">{a.monthYear}</span>
                <span className="duration-meta">
                  {a.durationMeta.map((m, i) => (
                    <span key={i}>
                      {m}
                      {i < a.durationMeta.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </div>
              <div className="body">
                <div className="tag">
                  {a.tag} <span>· {a.client}</span>
                </div>
                <h3>{a.headline}</h3>
                <p>{a.body}</p>
                <span className="read">
                  Read appointment notes{" "}
                  <span className="arrow">→</span>
                </span>
              </div>
              <div className="out">
                <span className="figure">{a.outcomeFigure}</span>
                <span className="label">{a.outcomeLabel}</span>
                <div className="schedule">
                  <b>Scheduled:</b> {a.scheduled}
                  <br />
                  <b>Next:</b> {a.next}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
