"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SceneStack — whole-page scene-based scrolling.
 *
 * Each child becomes a full-height scene. On desktop (and with motion
 * allowed) every scene except the last pins at the top of the viewport
 * while the next slides over it; the outgoing scene scales to 0.96 and
 * dims to 0.4. Scenes after the first carry a rounded top edge and
 * hairline border for the panel-sliding-over look.
 *
 * A scene whose root element carries data-no-pin (e.g. LedgerWork,
 * which runs its own internal pinned gallery) is never pinned, scaled
 * or dimmed by the stack — but the next scene still slides over it and
 * the previous scene still dims beneath it.
 *
 * Below 1024px or under prefers-reduced-motion: plain normal flow.
 */
export function SceneStack({ children }: { children: React.ReactNode[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const items = React.Children.toArray(children);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const scenes = gsap.utils.toArray<HTMLElement>(".scene", wrapper);
        scenes.forEach((scene, i) => {
          if (i === scenes.length - 1) return;
          const noPin = scene.firstElementChild?.hasAttribute("data-no-pin");
          if (noPin) return;
          ScrollTrigger.create({
            trigger: scene,
            // Scenes taller than the viewport scroll through fully
            // before pinning, so no content is trapped below the fold.
            start: () =>
              scene.offsetHeight > window.innerHeight
                ? "bottom bottom"
                : "top top",
            endTrigger: scenes[i + 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });
          gsap.to(scene, {
            scale: 0.96,
            opacity: 0.4,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: scenes[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      {items.map((child, i) => (
        <div
          key={i}
          data-scene-idx={i}
          style={{ zIndex: i + 1 }}
          className={`scene relative min-h-[100dvh] bg-surface-0${
            i > 0
              ? " overflow-clip rounded-t-3xl border-t border-hairline shadow-lg"
              : ""
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
