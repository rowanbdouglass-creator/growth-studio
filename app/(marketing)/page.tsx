import Link from "next/link";
import { brand } from "@/config/brand";

export const dynamic = "force-dynamic";

/**
 * Minimal placeholder home. Replaced by the real credibility-check site
 * once a logo direction is locked from /logos.html.
 */
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)] mb-8">
          In build
        </p>
        <h1
          className="font-sans font-extrabold leading-[1.02] tracking-[-0.02em] text-[color:var(--color-ink)] mb-6"
          style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
        >
          {brand.name}
        </h1>
        <p
          className="font-sans text-[color:var(--color-ink-soft)] leading-[1.5] mb-10 max-w-xl mx-auto"
          style={{ fontSize: "clamp(17px, 1.6vw, 21px)" }}
        >
          {brand.shortTagline} AI calling agents, custom software, websites and
          AI-optimised paid traffic. Built for UK SMEs by people who ship.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/logos.html"
            className="inline-flex items-center justify-center bg-[color:var(--color-ink)] text-[color:var(--color-paper)] px-7 py-4 font-medium text-sm hover:opacity-90 transition-opacity"
          >
            View logo concepts
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-[color:var(--color-ink)] text-[color:var(--color-ink)] px-7 py-4 font-medium text-sm hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)] transition-colors"
          >
            Book a call
          </Link>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)] mt-16">
          Site in build · Logo concepts at /logos.html
        </p>
      </div>
    </main>
  );
}
