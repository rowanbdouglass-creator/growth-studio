"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { buttonStyles } from "@/components/ui/Button";

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
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border border-border-strong text-text-primary hover:bg-surface transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M3 6h14M3 10h14M3 14h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] md:hidden bg-background flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-border">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-serif text-xl font-medium text-text-primary"
            >
              {brand.name}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center w-10 h-10 rounded-md border border-border-strong text-text-primary hover:bg-surface transition-colors"
            >
              <svg
                width="20"
                height="20"
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
            className="flex-1 flex flex-col px-6 py-12 gap-2"
          >
            {site.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl text-text-primary hover:text-accent transition-colors py-3 border-b border-border"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`${buttonStyles({ variant: "primary", size: "lg" })} mt-8 w-full`}
            >
              Book a call
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
