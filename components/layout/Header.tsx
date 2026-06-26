"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { Logomark } from "@/components/brand/Logomark";
import { ActivityTicker } from "@/components/fx/ActivityTicker";
import { MobileNav } from "./MobileNav";

/**
 * Sticky header. Starts transparent over the hero, fades in a
 * translucent canvas background and bottom border once the user has
 * scrolled past the threshold. Uses a passive scroll listener and
 * only re-renders when the boolean threshold flips.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-[background-color,border-color,backdrop-filter,box-shadow]
        duration-300 ease-[var(--ease-out-quint)]
        ${
          scrolled
            ? "bg-canvas/75 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <Container size="wide">
        <div className="flex h-14 md:h-16 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="group/logo flex items-center gap-2.5 transition-colors hover:text-accent text-ink"
          >
            <Logomark animate />
            <span className="font-sans text-sm md:text-base font-medium tracking-tight">
              {brand.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <nav aria-label="Main" className="flex items-center gap-7">
              {site.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors hover:text-ink ${
                    scrolled ? "text-ink-soft" : "text-ink/85"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <ActivityTicker />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tools/website-audit"
              className={`${buttonStyles({ variant: "primary", size: "sm" })} hidden md:inline-flex`}
            >
              Run my free audit
            </Link>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
