import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PrintHero } from "@/components/fx/PrintHero";
import { Stop } from "@/components/brand/Stop";
import {
  getServices,
  getFeaturedCaseStudy,
  getFeaturedTestimonial,
} from "@/lib/payload/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [, , ] = await Promise.all([
    getServices(),
    getFeaturedCaseStudy(),
    getFeaturedTestimonial(),
  ]);

  return (
    <>
      {/* SIGNATURE MOMENT 1 — The Print Hero */}
      <PrintHero />

      {/* Manifesto — placeholder for now, lives between hero and rest of page */}
      <section className="py-24 md:py-36 border-t border-[color:var(--color-rule)]">
        <Container size="wide">
          <div className="grid md:grid-cols-[11fr_9fr] gap-12 md:gap-20 items-end">
            <h2
              className="font-sans font-extrabold leading-[0.96] tracking-[-0.025em]"
              style={{ fontSize: "clamp(40px, 6vw, 90px)" }}
            >
              <span
                style={{
                  textDecoration: "line-through",
                  textDecorationColor: "#C4472E",
                  textDecorationThickness: "4px",
                  color: "#8C887D",
                }}
              >
                Most agencies ship decks.
              </span>
              <br />
              <span className="text-[color:var(--color-ink)] inline-flex items-end gap-3">
                We ship receipts
                <Stop size="0.5em" color="#C4472E" style={{ marginBottom: "0.08em" }} />
              </span>
            </h2>
            <div className="text-base md:text-lg leading-[1.65] text-[color:var(--color-ink-soft)] space-y-4">
              <p>
                We sit at both ends. Paid traffic, Meta, Google, cold outreach,
                brings the demand in.
              </p>
              <p>
                Then we build the systems that hold it: CRMs, hub platforms, audit
                tools and the automation that stops revenue leaking out the back.
              </p>
              <p>
                One studio, one invoice, no middle layer. Everything we promise
                lands in writing, signed and dated.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA card — placeholder, full sections come in Session 2+ */}
      <section className="py-24 md:py-32 border-t border-[color:var(--color-rule)]">
        <Container size="wide">
          <div className="flex flex-col items-center text-center gap-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-pencil)]">
              Session 1 / 8 · Print Hero shipped
            </p>
            <h2
              className="font-sans font-black inline-flex items-end gap-4"
              style={{
                fontSize: "clamp(56px, 8vw, 130px)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
              }}
            >
              show us yours
              <Stop size="0.36em" color="#C4472E" style={{ marginBottom: "0.08em" }} />
            </h2>
            <p className="max-w-[60ch] text-[color:var(--color-ink-soft)] text-lg leading-[1.55]">
              The hero you just scrolled is signature moment 1 of 8. Coming next
              sessions: split-flap subtotals, the WebGL ledger, marker
              annotations on scroll, live receipts ticker, stamp-press CTA
              transitions.
            </p>
            <Link
              href="/tools/website-audit"
              className="inline-flex items-center justify-between gap-7 bg-[color:var(--color-ink)] text-[color:var(--color-paper)] px-9 py-7 font-mono text-sm md:text-base font-bold uppercase tracking-[0.16em] hover:bg-[color:var(--color-red)] transition-colors"
            >
              <span>Run my audit</span>
              <span className="text-xl">→</span>
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-pencil)]">
              90 seconds · No card · Real data
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
