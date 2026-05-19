"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { buttonStyles } from "@/components/ui/Button";

const PANEL_BG = "#15131a"; // hardcoded equivalent of --color-canvas

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-border-strong text-ink hover:bg-surface transition-colors"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M3 7h14M3 13h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          style={{ backgroundColor: PANEL_BG }}
        >
          {/* Defensive backdrop (in case parent style strips) */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundColor: PANEL_BG }}
          />

          <div className="relative h-full flex flex-col">
            <div className="flex items-center justify-between px-6 h-14 border-b border-border">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-sans text-base font-medium text-ink tracking-tight"
              >
                {brand.name}
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center w-9 h-9 rounded-md border border-border-strong text-ink hover:bg-surface transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav
              aria-label="Main"
              className="flex-1 flex flex-col px-6 py-8 gap-0"
            >
              {site.mainNav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 py-4 border-b border-border text-ink hover:text-accent transition-colors"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute group-hover:text-accent transition-colors w-8">
                    0{i + 1}
                  </span>
                  <span className="font-sans text-xl font-medium tracking-tight">
                    {item.label}
                  </span>
                </Link>
              ))}

              <div className="mt-auto pt-8 space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={`${buttonStyles({ variant: "primary", size: "md" })} w-full`}
                >
                  Book a discovery call
                </Link>
                <a
                  href={`mailto:${brand.email}`}
                  onClick={() => setOpen(false)}
                  className="block text-center font-mono text-xs text-ink-mute hover:text-accent transition-colors py-2"
                >
                  {brand.email}
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
