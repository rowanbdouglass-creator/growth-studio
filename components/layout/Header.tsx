"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";

/**
 * Header for You Look Booked. Sticky, transparent over hero, fades to
 * paper-tint once scrolled. Plain text wordmark until a logo is chosen.
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[color:var(--color-paper)]/85 backdrop-blur-md border-b border-[color:var(--color-rule-soft)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container size="wide">
        <div className="flex h-16 md:h-20 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="font-sans font-bold text-[color:var(--color-ink)] hover:opacity-70 transition-opacity"
            style={{ fontSize: 17, letterSpacing: "-0.01em" }}
          >
            {brand.name}
          </Link>

          <nav aria-label="Main" className="hidden md:flex items-center gap-9">
            <Link
              href="/work"
              className="text-sm font-medium text-[color:var(--color-ink)] hover:opacity-70 transition-opacity"
            >
              Work
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-[color:var(--color-ink)] hover:opacity-70 transition-opacity"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-[color:var(--color-ink)] hover:opacity-70 transition-opacity"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center border border-[color:var(--color-ink)] text-[color:var(--color-ink)] px-5 py-2.5 text-sm font-medium hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)] transition-colors"
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
