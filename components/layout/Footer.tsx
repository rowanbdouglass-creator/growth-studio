"use client";

import Link from "next/link";
import { brand } from "@/config/brand";
import { FooterAvailability } from "./FooterAvailability";

/**
 * v4 dark footer — Monolog-style nav panel. Big navigation list left,
 * studio details right, then bottom legal strip.
 */
export function Footer() {
  return (
    <footer
      data-bg="dark"
      data-surface="dark"
      style={{
        background: "var(--color-night)",
        color: "var(--color-paper)",
        padding: "clamp(96px, 12vw, 160px) 0 32px",
        borderTop: "1px solid var(--color-hairline)",
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        <div
          className="ft-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "clamp(40px, 6vw, 100px)",
            paddingBottom: "clamp(64px, 8vw, 120px)",
          }}
        >
          <style>{`@media (max-width: 880px) { .ft-grid { grid-template-columns: 1fr !important; } }`}</style>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-mute)",
                marginBottom: 36,
              }}
            >
              <span style={{ color: "var(--color-red)" }}>●</span> NAVIGATION
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { href: "/work", label: "Work" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((item, i, arr) => (
                <li
                  key={item.href}
                  style={{
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid var(--color-hairline)"
                        : "none",
                  }}
                >
                  <Link
                    href={item.href}
                    data-cur="pen"
                    style={{
                      display: "block",
                      padding: "20px 0",
                      fontFamily: "var(--font-syne)",
                      fontWeight: 600,
                      fontSize: "clamp(36px, 4.5vw, 64px)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      color: "var(--color-paper)",
                      textDecoration: "none",
                      transition: "padding 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingLeft = "16px";
                      e.currentTarget.style.color = "var(--color-red)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingLeft = "0px";
                      e.currentTarget.style.color = "var(--color-paper)";
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-mute)",
                marginBottom: 36,
              }}
            >
              STUDIO DETAILS
            </div>

            <div style={{ marginBottom: 36 }}>
              <Link
                href={`mailto:${brand.email}`}
                data-cur="pen"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                  color: "var(--color-paper)",
                  fontWeight: 500,
                  borderBottom: "1px solid var(--color-paper)",
                  paddingBottom: 4,
                  display: "inline-block",
                }}
              >
                ↳ {brand.email}
              </Link>
            </div>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--color-mute)",
                marginBottom: 36,
                maxWidth: "30ch",
              }}
            >
              Based in the United Kingdom. Working with owner-operated
              SMEs across the UK and Europe.
            </p>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-mute)",
                marginBottom: 18,
              }}
            >
              ON THE RECORD
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              {[
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
                { href: "/accessibility", label: "Accessibility" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-cur="pen"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      color: "var(--color-mute)",
                      textDecoration: "none",
                      borderBottom: "1px solid transparent",
                      paddingBottom: 2,
                      transition: "color 0.25s ease, border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-paper)";
                      e.currentTarget.style.borderColor = "var(--color-paper)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-mute)";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            paddingTop: 32,
            borderTop: "1px solid var(--color-hairline)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--color-dim)",
          }}
        >
          <span>
            © 2026 {brand.legalName} · Companies House{" "}
            {brand.companiesHouseNumber}
          </span>
          <FooterAvailability />
        </div>
      </div>
    </footer>
  );
}
