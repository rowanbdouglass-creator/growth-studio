"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_MEDIA, type BeatMedia } from "@/lib/heroMedia";
import { TrackingEyes } from "@/components/fx/TrackingEyes";

const DESKTOP_MQ = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

const WORD_CLASS =
  "font-display font-black leading-none text-[clamp(5rem,18vw,16rem)]";

// Gentle walking bob for still images standing in for video. Scoped to
// full-motion contexts only.
const BOB_CSS = `
@media (prefers-reduced-motion: no-preference) {
  @keyframes hero-crowd-bob {
    from { transform: translateY(0); }
    to { transform: translateY(5px); }
  }
  .hero-crowd-bob { animation: hero-crowd-bob 1.4s ease-in-out infinite alternate; }
}
`;

type SlotProps = {
  media: BeatMedia;
  loop: boolean;
  bob: boolean;
  autoPlay?: boolean;
  videoRef?: React.Ref<HTMLVideoElement>;
  slotRef?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
};

/**
 * One crowd-media beat: video if configured, else still image (with an
 * optional walking bob), else a labelled placeholder strip.
 */
function MediaSlot({ media, loop, bob, autoPlay, videoRef, slotRef, style }: SlotProps) {
  return (
    <div ref={slotRef} className="absolute inset-0" style={style}>
      {media.video ? (
        <video
          ref={videoRef}
          src={media.video}
          muted
          playsInline
          preload="auto"
          loop={loop}
          autoPlay={autoPlay}
          className="h-full w-full object-contain object-bottom"
        />
      ) : media.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.image}
          alt=""
          className={`h-full w-full object-contain object-bottom${bob ? " hero-crowd-bob" : ""}`}
        />
      ) : (
        <div className="flex h-full w-full items-end justify-center">
          <span className="px-6 pb-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-text-3">
            Crowd media pending, drop files in public/hero
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Pinned brand-name hero: the crowd walks under "YOU", stops and looks
 * up at a pair of cursor-tracking eyes, then resumes walking as
 * "BOOKED" stamps in. 400vh scrub on desktop; a static single-viewport
 * "You look booked." variant everywhere else (and on the server, so
 * hydration never flashes the tall section).
 */
export function HeroCrowd() {
  // SSR + first client paint render the static variant; upgrade to the
  // pinned scene only once the desktop media query confirms after mount.
  const [pinned, setPinned] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const walkSlotRef = useRef<HTMLDivElement>(null);
  const lookSlotRef = useRef<HTMLDivElement>(null);
  const resumeSlotRef = useRef<HTMLDivElement>(null);
  const walkVideoRef = useRef<HTMLVideoElement>(null);
  const lookVideoRef = useRef<HTMLVideoElement>(null);
  const resumeVideoRef = useRef<HTMLVideoElement>(null);
  const youRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const bookedRef = useRef<HTMLDivElement>(null);

  const walk = HERO_MEDIA.walk;
  const lookUp = HERO_MEDIA.lookUp;
  // resume falls back to the walk media (and, when it does, the timeline
  // simply re-lights the walk element rather than duplicating it).
  const resumeIsWalk = !HERO_MEDIA.resume.video && !HERO_MEDIA.resume.image;
  const resume = resumeIsWalk ? walk : HERO_MEDIA.resume;

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const walkEl = walkSlotRef.current;
    const lookEl = lookSlotRef.current;
    const resumeEl = resumeIsWalk ? null : resumeSlotRef.current;
    const you = youRef.current;
    const eyes = eyesRef.current;
    const booked = bookedRef.current;
    if (!section || !walkEl || !lookEl || !you || !eyes || !booked) return;

    let lastBeat = -1;
    const videoFor = (beat: number): HTMLVideoElement | null =>
      beat === 0
        ? walkVideoRef.current
        : beat === 1
          ? lookVideoRef.current
          : resumeIsWalk
            ? walkVideoRef.current
            : resumeVideoRef.current;

    const syncVideos = (beat: number) => {
      const active = videoFor(beat);
      for (const v of [walkVideoRef.current, lookVideoRef.current, resumeVideoRef.current]) {
        if (!v) continue;
        if (v === active) {
          const p = v.play();
          if (p) p.catch(() => {});
        } else {
          v.pause();
        }
      }
    };

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(DESKTOP_MQ, () => {
        gsap.set([you, eyes, booked], { willChange: "transform, opacity, filter" });
        gsap.set(you, { opacity: 1, scale: 1, filter: "blur(0px)" });
        gsap.set(eyes, { opacity: 0, scale: 0.85 });
        gsap.set(booked, { opacity: 0, scale: 1.3, filter: "blur(6px)" });
        gsap.set(lookEl, { opacity: 0 });
        if (resumeEl) gsap.set(resumeEl, { opacity: 0 });

        // Timeline positions are scroll-progress fractions; the trailing
        // padding tween pins total duration at exactly 1.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              const p = self.progress;
              const beat = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
              if (beat !== lastBeat) {
                lastBeat = beat;
                syncVideos(beat);
              }
            },
          },
        });

        // Media beats: walk 0-0.34, lookUp 0.34-0.67, resume 0.67-1,
        // with 0.06-wide crossfades centred on the boundaries.
        tl.to(walkEl, { opacity: 0, duration: 0.06 }, 0.31);
        tl.to(lookEl, { opacity: 1, duration: 0.06 }, 0.31);
        tl.to(lookEl, { opacity: 0, duration: 0.06 }, 0.64);
        tl.to(resumeEl ?? walkEl, { opacity: 1, duration: 0.06 }, 0.64);

        // YOU dissolves out.
        tl.to(
          you,
          { opacity: 0, filter: "blur(14px)", scale: 1.06, duration: 0.08, ease: "power1.in" },
          0.28,
        );
        // Eyes in, hold, out.
        tl.to(eyes, { opacity: 1, scale: 1, duration: 0.08, ease: "power2.out" }, 0.32);
        tl.to(eyes, { opacity: 0, duration: 0.08, ease: "power1.in" }, 0.6);
        // BOOKED stamps in with a tiny overshoot, holds to the end.
        tl.to(
          booked,
          { opacity: 1, scale: 0.97, filter: "blur(0px)", duration: 0.05, ease: "power3.in" },
          0.68,
        );
        tl.to(booked, { scale: 1, duration: 0.03, ease: "back.out(2)" }, 0.73);
        tl.to({}, { duration: 0.24 }, 0.76);

        syncVideos(0);
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [pinned, resumeIsWalk]);

  if (!pinned) {
    // Static fallback: mobile, reduced motion, and SSR.
    return (
      <section ref={sectionRef} className="relative" style={{ backgroundColor: "#000" }}>
        <style>{BOB_CSS}</style>
        <div className="relative flex min-h-[100dvh] flex-col justify-center overflow-clip">
          <div className="relative z-10 px-6 text-center">
            <h1 className="font-display text-6xl font-black leading-none text-text-1">
              You look <span className="text-accent-text">booked.</span>
            </h1>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[38%]">
            <MediaSlot media={walk} loop bob autoPlay />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: "#000", height: "400vh" }}
    >
      <style>{BOB_CSS}</style>
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-clip">
        {/* Media layer: three stacked beats along the bottom strip */}
        <div className="absolute inset-x-0 bottom-0 h-[46%]">
          <MediaSlot media={walk} loop bob slotRef={walkSlotRef} videoRef={walkVideoRef} />
          <MediaSlot
            media={lookUp}
            loop={false}
            bob={false}
            slotRef={lookSlotRef}
            videoRef={lookVideoRef}
            style={{ opacity: 0 }}
          />
          {!resumeIsWalk && (
            <MediaSlot
              media={resume}
              loop
              bob
              slotRef={resumeSlotRef}
              videoRef={resumeVideoRef}
              style={{ opacity: 0 }}
            />
          )}
        </div>
        {/* Word layer: YOU, eyes, BOOKED stacked in the same cell */}
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
          <div ref={youRef} className={`[grid-area:1/1] ${WORD_CLASS} text-text-1`}>
            YOU
          </div>
          <div ref={eyesRef} className="[grid-area:1/1]" style={{ opacity: 0 }}>
            <TrackingEyes />
          </div>
          <div
            ref={bookedRef}
            className={`[grid-area:1/1] ${WORD_CLASS} text-accent-text`}
            style={{ opacity: 0 }}
          >
            BOOKED
          </div>
        </div>
      </div>
    </section>
  );
}
