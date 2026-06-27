"use client";

import { motion, useReducedMotion } from "motion/react";

interface KineticHeadlineProps {
  /** Words preceding the italic emphasis */
  lead: string;
  /** Word(s) rendered italic + silver-shine, optional */
  emphasis?: string;
  /** Tail words after the emphasis, optional */
  tail?: string;
  className?: string;
}

/**
 * Hero headline with staggered word reveal. Each word slides up
 * from below + fades in, italic emphasis arrives last with a
 * slight overshoot. Respects prefers-reduced-motion.
 */
export function KineticHeadline({
  lead,
  emphasis,
  tail,
  className = "",
}: KineticHeadlineProps) {
  const reduce = useReducedMotion();

  const leadWords = lead.split(/\s+/).filter(Boolean);
  const tailWords = (tail ?? "").split(/\s+/).filter(Boolean);

  const baseDelay = 0.06;
  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" };
  const animate = { opacity: 1, y: 0 };
  const transition = (i: number) => ({
    duration: reduce ? 0 : 0.7,
    delay: reduce ? 0 : 0.08 + i * baseDelay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  });

  let wordIdx = 0;

  return (
    <h1
      className={`font-sans font-medium text-ink leading-[0.96] tracking-[-0.045em] text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] mb-10 pb-4 ${className}`}
      style={{ textWrap: "balance" }}
    >
      {leadWords.map((word, i) => {
        const idx = wordIdx++;
        return (
          <span
            key={`l-${i}`}
            className="inline-block overflow-hidden align-baseline pb-2"
          >
            <motion.span
              className="inline-block"
              initial={initial}
              animate={animate}
              transition={transition(idx)}
            >
              {word}
              {i < leadWords.length - 1 || emphasis || tail ? " " : ""}
            </motion.span>
          </span>
        );
      })}

      {emphasis && (
        <span className="inline-block overflow-hidden align-baseline pb-2">
          <motion.span
            className="inline-block italic-editorial font-normal silver-shine"
            initial={initial}
            animate={animate}
            transition={{
              ...transition(wordIdx++),
              duration: reduce ? 0 : 0.9,
              ease: reduce
                ? "linear"
                : ([0.34, 1.56, 0.64, 1] as [number, number, number, number]),
            }}
          >
            {emphasis}
            {tail && tail.length > 0 ? " " : ""}
          </motion.span>
        </span>
      )}

      {tailWords.map((word, i) => {
        const idx = wordIdx++;
        return (
          <span
            key={`t-${i}`}
            className="inline-block overflow-hidden align-baseline pb-2"
          >
            <motion.span
              className="inline-block"
              initial={initial}
              animate={animate}
              transition={transition(idx)}
            >
              {word}
              {i < tailWords.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}
