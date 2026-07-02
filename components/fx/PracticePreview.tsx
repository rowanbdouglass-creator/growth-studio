"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * PracticePreview — floating cursor-follow preview for the practice
 * docket. Renders the rows list (server children pass through) plus a
 * fixed 320x200 preview card that trails the cursor via gsap.quickTo
 * while the pointer is over the list; the image swaps per hovered row
 * (rows carry data-preview="{key}"). Desktop + motion only
 * (gsap.matchMedia); listeners live on the list element, never window.
 * Mobile / reduced motion: the preview never shows, rows are static.
 */
export function PracticePreview({
  images,
  className = "",
  children,
}: {
  images: Record<string, string>;
  className?: string;
  children: React.ReactNode;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    const img = imgRef.current;
    if (!list || !preview || !img) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.set(preview, { autoAlpha: 0, scale: 0.9, rotation: -3 });
        const xTo = gsap.quickTo(preview, "x", {
          duration: 0.5,
          ease: "power3",
        });
        const yTo = gsap.quickTo(preview, "y", {
          duration: 0.5,
          ease: "power3",
        });

        const place = (e: PointerEvent) => {
          // Offset so the card floats beside the cursor, not under it.
          return [e.clientX + 28, e.clientY - 100] as const;
        };

        const onMove = (e: PointerEvent) => {
          const [x, y] = place(e);
          xTo(x);
          yTo(y);
          const row = (e.target as HTMLElement).closest<HTMLElement>(
            "[data-preview]",
          );
          const key = row?.dataset.preview;
          if (key && images[key] && img.getAttribute("src") !== images[key]) {
            img.src = images[key];
          }
        };
        const onEnter = (e: PointerEvent) => {
          const [x, y] = place(e);
          gsap.set(preview, { x, y });
          gsap.to(preview, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const onLeave = () => {
          gsap.to(preview, {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        list.addEventListener("pointermove", onMove);
        list.addEventListener("pointerenter", onEnter);
        list.addEventListener("pointerleave", onLeave);
        return () => {
          list.removeEventListener("pointermove", onMove);
          list.removeEventListener("pointerenter", onEnter);
          list.removeEventListener("pointerleave", onLeave);
        };
      },
    );

    return () => mm.revert();
  }, [images]);

  const firstImage = Object.values(images)[0];

  return (
    <>
      <div ref={listRef} className={className}>
        {children}
      </div>
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[200px] w-[320px] overflow-hidden rounded-md border border-hairline opacity-0 lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={firstImage}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </>
  );
}
