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
 * Sticky header. Starts fully transparent — no background, no border —
 * so it floats over the hero. Once the visitor has scrolled past a
 * small threshold, fades in a translucent canvas background + bottom
 * border + the live activity ticker.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onScroll() {
      setScrolled(window.scrollY > 24);
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
            className={`group/logo flex items-center gap-2.5 transition-colors hover:text-accent ${
              scrolled ? "text-ink" : "text-ink"
            }`}
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

            {/* Live activity ticker — moved here from the hero eyebrow */}
            <div className="hidden lg:block">
              <ActivityTicker />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={`${buttonStyles({ variant: "primary", size: "sm" })} hidden md:inline-flex`}
            >
              Book a call
            </Link>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
