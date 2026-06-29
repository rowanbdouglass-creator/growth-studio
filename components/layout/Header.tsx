"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";
import { AudioToggle } from "@/components/fx/AudioToggle";

/**
 * v4 dark header — wordmark in paper with red pulsing "available" dot,
 * mono nav, audio toggle, find-a-slot magnetic CTA. Glassy on scroll.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;

    // Pages can opt the global header out by setting data-hide-site-header
    // on their <main> element. Used by the home page (PrismaHero has its
    // own top-centre pill nav).
    const refreshHidden = () => {
      const home = document.querySelector("[data-hide-site-header]");
      const heroBottom = home
        ? home.getBoundingClientRect().top + window.innerHeight * 0.92
        : 0;
      setHidden(!!home && window.scrollY < heroBottom);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        refreshHidden();
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 py-5"
      aria-hidden={hidden}
      data-hidden={hidden}
      style={{
        color: "var(--color-paper)",
        background: scrolled ? "rgba(14,13,11,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--color-hairline)"
          : "1px solid transparent",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        transition:
          "opacity 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
      }}
    >
      <Container size="wide">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
            data-cur="pen"
            data-magnetic=""
          >
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: "-0.04em",
                color: "var(--color-paper)",
                lineHeight: 1,
              }}
            >
              ylb
            </span>
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-red)",
                boxShadow: "0 0 10px var(--color-red-glow)",
                animation: "ylb-pulse 2.4s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            <style>{`@keyframes ylb-pulse { 0%,100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } }`}</style>
          </Link>

          <nav
            aria-label="Main"
            className="hidden md:flex items-center"
            style={{ gap: "clamp(20px, 2.6vw, 36px)" }}
          >
            {[
              { href: "/work", label: "Work" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cur="pen"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--color-paper)",
                  opacity: 0.85,
                  transition: "opacity 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
              >
                {item.label}
              </Link>
            ))}

            <AudioToggle />

            <Link
              href="/contact"
              data-cur="hold"
              data-magnetic=""
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 18px",
                background: "var(--color-paper)",
                color: "var(--color-night)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700,
                borderRadius: 999,
                transition: "background 0.25s ease, color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-red)";
                e.currentTarget.style.color = "var(--color-night)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-paper)";
                e.currentTarget.style.color = "var(--color-night)";
              }}
            >
              Find a slot
              <span style={{ fontSize: 14 }}>↗</span>
            </Link>
          </nav>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
