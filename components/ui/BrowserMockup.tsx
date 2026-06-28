"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Counter } from "@/components/fx/Counter";

/**
 * v2 BrowserMockup. Same fake landing page content; upgraded with:
 * - Pointer-drag rotation (drag the card to spin it; releases spring back)
 * - Mouse-parallax tilt when not dragging
 * - Particle burst when stats reveal
 * - RGB-split glitch on the BOOKED stamp drop
 */
export function BrowserMockup() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  // Cursor-driven tilt + drag
  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let rafId = 0;
    let rx = 2;
    let ry = -5;
    let tRx = 2;
    let tRy = -5;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        tRy += dx * 0.45;
        tRx -= dy * 0.45;
        tRx = Math.max(-30, Math.min(30, tRx));
        tRy = Math.max(-50, Math.min(40, tRy));
        lastX = e.clientX;
        lastY = e.clientY;
      } else {
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        tRy = -5 + dx * 14;
        tRx = 2 - dy * 8;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      card.style.cursor = "grabbing";
      card.setPointerCapture(e.pointerId);
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      card.style.cursor = "grab";
      try {
        card.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const loop = () => {
      const easeFactor = dragging ? 0.25 : 0.08;
      rx += (tRx - rx) * easeFactor;
      ry += (tRy - ry) * easeFactor;
      card.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      rafId = requestAnimationFrame(loop);
    };

    card.style.cursor = "grab";
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    card.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  // Cascade reveal + particle burst on stats
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        card.classList.add("br-in");

        if (reduced) {
          io.disconnect();
          return;
        }

        // Particle burst from stamp area after the stamp drops
        const canvas = particlesRef.current;
        const stamp = stampRef.current;
        if (canvas && stamp) {
          setTimeout(() => burst(canvas, stamp), 1500);
        }

        // RGB split flicker on stamp
        if (stamp) {
          gsap.fromTo(
            stamp,
            { textShadow: "0 0 transparent" },
            {
              keyframes: {
                textShadow: [
                  "-4px 0 0 rgba(196,71,46,1), 4px 0 0 rgba(27,26,23,1)",
                  "2px 0 0 rgba(196,71,46,1), -2px 0 0 rgba(27,26,23,1)",
                  "0 0 transparent",
                ],
              },
              duration: 0.6,
              delay: 1.45,
              ease: "steps(3)",
            }
          );
        }

        io.disconnect();
      },
      { threshold: 0.35 }
    );
    io.observe(card);

    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ perspective: "1400px", position: "relative", width: "100%" }}
    >
      <div
        ref={cardRef}
        className="ylb-browser"
        style={{
          background: "var(--color-paper)",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow:
            "0 30px 80px -20px rgba(27,26,23,0.45), 0 12px 30px -10px rgba(27,26,23,0.25)",
          transform: "perspective(1400px) rotateY(-5deg) rotateX(2deg)",
          position: "relative",
          willChange: "transform",
          transformStyle: "preserve-3d",
          touchAction: "none",
        }}
      >
        <style>{`
          @media (max-width: 880px) {
            .ylb-browser { transform: none !important; }
          }
          .ylb-browser .br-bar { display: flex; align-items: center; gap: 6px; padding: 10px 12px; background: #E8E0CE; border-bottom: 1px solid var(--color-rule); }
          .ylb-browser .br-dot { width: 10px; height: 10px; border-radius: 50%; }
          .ylb-browser .br-dot.r { background: #E45B43; }
          .ylb-browser .br-dot.y { background: #E8B83A; }
          .ylb-browser .br-dot.g { background: #3DA958; }
          .ylb-browser .br-url { margin-left: 14px; background: var(--color-paper); padding: 4px 12px; border-radius: 3px; font-family: var(--font-mono); font-size: 10px; color: var(--color-pencil); letter-spacing: 0.05em; flex: 1; max-width: 300px; text-align: center; }
          .ylb-browser .br-body { padding: 24px 22px; min-height: 340px; background: var(--color-paper); position: relative; }
          @media (max-width: 880px) { .ylb-browser .br-body { min-height: 280px; } }
          .ylb-browser .br-eyebrow { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.2em; color: var(--color-pencil); text-transform: uppercase; margin-bottom: 10px; opacity: 0; transition: opacity 0.5s ease 0.2s; }
          .ylb-browser .br-head { font-family: var(--font-syne); font-weight: 700; font-size: clamp(20px, 2.4vw, 32px); line-height: 1; letter-spacing: -0.025em; color: var(--color-ink); margin-bottom: 14px; opacity: 0; transform: translateY(12px); transition: opacity 0.6s ease 0.35s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s; }
          .ylb-browser .br-sub { font-size: 11px; line-height: 1.5; color: var(--color-ink-soft); margin-bottom: 20px; opacity: 0; transition: opacity 0.5s ease 0.55s; }
          .ylb-browser .br-cta { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; background: var(--color-ink); color: var(--color-paper); font-family: var(--font-mono); font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0; transform: translateY(8px); transition: opacity 0.5s ease 0.75s, transform 0.5s ease 0.75s; position: relative; overflow: hidden; border: 0; }
          .ylb-browser .br-cta::before { content: ""; position: absolute; inset: 0; background: var(--color-red); transform-origin: left; transform: scaleX(0); transition: transform 1.2s cubic-bezier(0.65, 0, 0.35, 1); }
          .ylb-browser .br-cta > * { position: relative; z-index: 1; }
          .ylb-browser .br-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 24px; padding-top: 20px; border-top: 1px dashed var(--color-rule); }
          .ylb-browser .br-stat { opacity: 0; transform: translateY(8px); transition: opacity 0.4s ease, transform 0.4s ease; }
          .ylb-browser .br-stat:nth-child(1) { transition-delay: 1s; }
          .ylb-browser .br-stat:nth-child(2) { transition-delay: 1.15s; }
          .ylb-browser .br-stat:nth-child(3) { transition-delay: 1.3s; }
          .ylb-browser .br-stat-v { font-family: var(--font-mono); font-weight: 700; font-size: 22px; color: var(--color-red); font-feature-settings: "tnum"; letter-spacing: -0.01em; line-height: 1; }
          .ylb-browser .br-stat-l { font-family: var(--font-mono); font-size: 9px; color: var(--color-pencil); letter-spacing: 0.14em; text-transform: uppercase; margin-top: 5px; }
          .ylb-browser .br-stamp { position: absolute; bottom: 18px; right: 18px; border: 2px solid var(--color-red); color: var(--color-red); font-family: var(--font-mono); font-weight: 700; font-size: 11px; letter-spacing: 0.18em; padding: 8px 14px; transform: rotate(-8deg) scale(0); opacity: 0; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s, opacity 0.4s ease 1.4s; }
          .ylb-browser.br-in .br-eyebrow, .ylb-browser.br-in .br-sub { opacity: 1; }
          .ylb-browser.br-in .br-head, .ylb-browser.br-in .br-cta { opacity: 1; transform: translateY(0); }
          .ylb-browser.br-in .br-cta::before { transform: scaleX(1); }
          .ylb-browser.br-in .br-stat { opacity: 1; transform: translateY(0); }
          .ylb-browser.br-in .br-stamp { transform: rotate(-8deg) scale(1); opacity: 1; }
          .ylb-browser .br-particles { position: absolute; inset: 0; pointer-events: none; width: 100%; height: 100%; }
          .ylb-browser .br-drag-hint { position: absolute; top: 12px; right: 12px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.18em; color: rgba(27,26,23,0.4); text-transform: uppercase; pointer-events: none; }
        `}</style>

        <div className="br-bar">
          <span className="br-dot r" />
          <span className="br-dot y" />
          <span className="br-dot g" />
          <span className="br-url">https://nayims-embroideries.co.uk</span>
        </div>

        <div className="br-body">
          <div className="br-drag-hint">DRAG ⤧</div>
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
          <div ref={stampRef} className="br-stamp">BOOKED ✓</div>
          <canvas ref={particlesRef} className="br-particles" />
        </div>
      </div>
    </div>
  );
}

/** Particle burst from the rect of a child element */
function burst(canvas: HTMLCanvasElement, source: HTMLElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  const sourceRect = source.getBoundingClientRect();
  const cx = sourceRect.left - rect.left + sourceRect.width / 2;
  const cy = sourceRect.top - rect.top + sourceRect.height / 2;

  type P = { x: number; y: number; vx: number; vy: number; life: number; size: number };
  const particles: P[] = [];
  for (let i = 0; i < 38; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 4;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      life: 1,
      size: 1 + Math.random() * 2.5,
    });
  }

  let rafId = 0;
  const tick = () => {
    ctx.clearRect(0, 0, rect.width, rect.height);
    let alive = false;
    particles.forEach((p) => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravity
      p.life -= 0.018;
      ctx.fillStyle = `rgba(196, 71, 46, ${Math.max(0, p.life)})`;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    if (alive) rafId = requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, rect.width, rect.height);
  };
  rafId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(rafId);
}
