"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Stop } from "@/components/brand/Stop";
import { MobileNav } from "./MobileNav";

/**
 * Receipts header. Sticky, transparent over hero, fades to paper-tint
 * background once scrolled. Wordmark on left, nav center-right,
 * stamp-pill "Book" CTA on right.
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
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="receipts. home"
            className="group flex items-end gap-1.5 text-[color:var(--color-ink)] hover:text-[color:var(--color-red)] transition-colors"
          >
            <span
              className="font-sans font-black"
              style={{
                fontSize: "26px",
                lineHeight: 0.85,
                letterSpacing: "-0.045em",
              }}
            >
              receipts
            </span>
            <Stop size={7} color="#C4472E" style={{ marginBottom: 2 }} />
          </Link>

          {/* Nav */}
          <nav
            aria-label="Main"
            className="hidden md:flex items-center gap-9"
          >
            <Link
              href="/work"
              className="text-sm font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-red)] transition-colors"
            >
              Work
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-red)] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/tools"
              className="text-sm font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-red)] transition-colors"
            >
              Tools
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-red)] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Book CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2.5 border-[1.5px] border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] hover:bg-[color:var(--color-red)] hover:border-[color:var(--color-red)] transition-colors"
            >
              Book
              <Stop size={6} color="#C4472E" />
            </Link>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
