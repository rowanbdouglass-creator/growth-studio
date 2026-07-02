"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

const DESKTOP_MQ = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

type TrackingEyesProps = {
  className?: string;
  /** Tailwind sizing classes applied to each eye SVG. */
  size?: string;
  /** Optional element to listen for pointer movement on; defaults to document. */
  containerRef?: React.RefObject<HTMLElement | null>;
};

/**
 * Two side-by-side cartoon eyes. On desktop (pointer + full motion) the
 * pupils track the cursor via gsap.quickTo, clamped inside the sclera.
 * On mobile / reduced motion / 3s of pointer silence they drift on a
 * gentle repeating loop. Both eyes blink together on a randomised
 * 3.5 to 5s interval. Purely decorative: aria-hidden.
 */
export function TrackingEyes({
  className = "",
  size = "w-[16vw] max-w-[220px]",
  containerRef,
}: TrackingEyesProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const gid = useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const eyes = Array.from(root.querySelectorAll<SVGSVGElement>("svg[data-eye]"));
    const pupils = Array.from(root.querySelectorAll<SVGGElement>("g[data-pupil]"));
    if (!eyes.length || !pupils.length) return;

    let blinkCall: gsap.core.Tween | null = null;
    let blinkTween: gsap.core.Tween | null = null;
    let idleTl: gsap.core.Timeline | null = null;
    let idleCall: gsap.core.Tween | null = null;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const xTos = pupils.map((p) => gsap.quickTo(p, "x", { duration: 0.4, ease: "power3.out" }));
      const yTos = pupils.map((p) => gsap.quickTo(p, "y", { duration: 0.4, ease: "power3.out" }));

      // Max pupil travel: ~18% of the rendered eye width (a touch less
      // vertically since the eye is squatter than it is wide).
      const maxOffset = () => {
        const r = eyes[0].getBoundingClientRect();
        const w = r.width || 160;
        const h = r.height || w * 0.78;
        return { x: w * 0.18, y: h * 0.18 };
      };

      /** nx/ny are normalised -1..1 direction factors. */
      const moveAll = (nx: number, ny: number) => {
        const m = maxOffset();
        for (let i = 0; i < pupils.length; i++) {
          xTos[i](nx * m.x);
          yTos[i](ny * m.y);
        }
      };

      // Idle drift: gentle ~6s repeating loop between a few glances.
      const startIdle = () => {
        if (idleTl) return;
        const proxy = { x: 0, y: 0 };
        idleTl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "sine.inOut" },
          onUpdate: () => moveAll(proxy.x, proxy.y),
        });
        idleTl
          .to(proxy, { x: 0.45, y: -0.2, duration: 1.5 })
          .to(proxy, { x: -0.35, y: 0.15, duration: 1.5 })
          .to(proxy, { x: 0.15, y: 0.4, duration: 1.5 })
          .to(proxy, { x: 0, y: 0, duration: 1.5 });
      };
      const stopIdle = () => {
        idleTl?.kill();
        idleTl = null;
      };

      // Default state (mobile, reduced motion, or no pointer yet): drift.
      startIdle();

      // Blink: both eyes scaleY 1 -> 0.06 -> 1 (~120ms) on a random interval.
      const scheduleBlink = () => {
        blinkCall = gsap.delayedCall(gsap.utils.random(3.5, 5), () => {
          blinkTween = gsap.to(eyes, {
            scaleY: 0.06,
            transformOrigin: "50% 50%",
            duration: 0.06,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
            onComplete: scheduleBlink,
          });
        });
      };
      scheduleBlink();

      // Cursor tracking: desktop + full motion only. Listener lives on the
      // provided container (or document), never on window scroll.
      mm.add(DESKTOP_MQ, () => {
        const target: EventTarget = containerRef?.current ?? document;
        const onMove = (e: Event) => {
          const ev = e as PointerEvent;
          stopIdle();
          idleCall?.kill();
          idleCall = gsap.delayedCall(3, startIdle);

          const r = root.getBoundingClientRect();
          const dx = ev.clientX - (r.left + r.width / 2);
          const dy = ev.clientY - (r.top + r.height / 2);
          const dist = Math.hypot(dx, dy) || 1;
          const f = Math.min(1, dist / 320);
          moveAll((dx / dist) * f, (dy / dist) * f);
        };
        target.addEventListener("pointermove", onMove, { passive: true });
        return () => {
          target.removeEventListener("pointermove", onMove);
          idleCall?.kill();
          idleCall = null;
          startIdle();
        };
      });
    }, root);

    return () => {
      blinkCall?.kill();
      blinkTween?.kill();
      idleTl?.kill();
      idleCall?.kill();
      mm.revert();
      ctx.revert();
    };
  }, [containerRef]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`flex items-center justify-center gap-[2vw] ${className}`}
    >
      {[0, 1].map((i) => (
        <svg
          key={i}
          data-eye
          viewBox="0 0 100 78"
          className={`${size} h-auto`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id={`${gid}-shade-${i}`} cx="50%" cy="32%" r="80%">
              <stop offset="0%" stopColor="#0A0B0D" stopOpacity="0" />
              <stop offset="72%" stopColor="#0A0B0D" stopOpacity="0" />
              <stop offset="100%" stopColor="#0A0B0D" stopOpacity="0.28" />
            </radialGradient>
            <clipPath id={`${gid}-clip-${i}`}>
              <ellipse cx="50" cy="39" rx="48" ry="37" />
            </clipPath>
          </defs>
          {/* Sclera */}
          <ellipse cx="50" cy="39" rx="48" ry="37" fill="#EDEEF0" />
          {/* Iris + pupil, clipped so travel never escapes the sclera */}
          <g clipPath={`url(#${gid}-clip-${i})`}>
            <g data-pupil>
              <circle cx="50" cy="39" r="17" fill="var(--color-accent)" />
              <circle cx="50" cy="39" r="8.5" fill="#0A0B0D" />
              <circle cx="53.5" cy="35" r="2.6" fill="#FFFFFF" opacity="0.9" />
            </g>
          </g>
          {/* Subtle bottom inner shadow */}
          <ellipse cx="50" cy="39" rx="48" ry="37" fill={`url(#${gid}-shade-${i})`} />
        </svg>
      ))}
    </div>
  );
}
