"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/brand/Wordmark";
import { PressAndHold } from "@/components/fx/PressAndHold";
import { MobileNav } from "./MobileNav";

type Scheme = "light" | "dark" | "red";

/**
 * Sticky header that is colour-aware: detects the data-bg attribute on
 * the section it currently sits over and adjusts text + button colours.
 *
 * Uses a single passive scroll listener with rAF throttle.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scheme, setScheme] = useState<Scheme>("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const sections = () => document.querySelectorAll<HTMLElement>("[data-bg]");

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);

        const probeY = 60; // ~middle of header
        let active: Scheme = "light";
        sections().forEach((s) => {
          const r = s.getBoundingClientRect();
          if (r.top <= probeY && r.bottom >= probeY) {
            const bg = s.getAttribute("data-bg") as Scheme | null;
            if (bg === "dark" || bg === "red" || bg === "light") active = bg;
          }
        });
        setScheme(active);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = scheme === "dark";
  const isRed = scheme === "red";

  const textColor = isDark || isRed ? "var(--color-paper)" : "var(--color-ink)";

  const bgClass = scrolled
    ? isDark
      ? "bg-[rgba(27,26,23,0.82)]"
      : isRed
        ? "bg-[rgba(196,71,46,0.86)]"
        : "bg-[rgba(243,239,230,0.86)]"
    : "bg-transparent";

  const borderClass = scrolled
    ? isDark
      ? "border-[#3A3833]"
      : isRed
        ? "border-[rgba(255,255,255,0.15)]"
        : "border-[color:var(--color-rule-soft)]"
    : "border-transparent";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-5 transition-[background-color,backdrop-filter,border-color,color] duration-400 border-b ${bgClass} ${borderClass} ${scrolled ? "backdrop-blur-md" : ""}`}
      style={{ color: textColor }}
    >
      <Container size="wide">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="hover:opacity-70 transition-opacity"
            data-cur="pen"
          >
            <Wordmark
              size={26}
              letterColor={textColor}
              bColor={isRed ? "var(--color-ink)" : "var(--color-red)"}
            />
          </Link>

          <nav
            aria-label="Main"
            className="hidden md:flex items-center"
            style={{ gap: "clamp(18px, 2.6vw, 40px)" }}
          >
            <Link
              href="/work"
              className="text-[14px] font-medium relative hover:opacity-70 transition-opacity"
              data-cur="pen"
              style={{
                fontFamily: "var(--font-sans)",
              }}
            >
              Work
            </Link>
            <Link
              href="/services"
              className="text-[14px] font-medium relative hover:opacity-70 transition-opacity"
              data-cur="pen"
              style={{
                fontFamily: "var(--font-sans)",
              }}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-[14px] font-medium relative hover:opacity-70 transition-opacity"
              data-cur="pen"
              style={{
                fontFamily: "var(--font-sans)",
              }}
            >
              About
            </Link>
            <PressAndHold
              duration={600}
              variant="outline"
              showHint={false}
              trailing={null}
              onComplete={() => {
                window.location.href = "/contact";
              }}
            >
              Find a slot
            </PressAndHold>
          </nav>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
