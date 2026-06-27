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

// Real case study data (Session 2 will move this into the WebGL ledger)
const LEDGER = [
  {
    client: "Nayim's Embroideries",
    scope: "Paid social + quote-to-order system",
    outcome: "£128,000",
    outcomeLabel: "ON INVOICE",
    ref: "RCPT-0001",
  },
  {
    client: "JC Setton Opticians",
    scope: "Recovered ad spend + booking CRM",
    outcome: "£42,180",
    outcomeLabel: "RECOVERED",
    ref: "RCPT-0023",
  },
  {
    client: "T-SHOT",
    scope: "Cold outreach engine + pipeline",
    outcome: "3.4× ROAS",
    outcomeLabel: "",
    ref: "RCPT-0024",
  },
  {
    client: "Forum Studios",
    scope: "Operations hub + automation",
    outcome: "96 hrs / mo",
    outcomeLabel: "BACK",
    ref: "RCPT-0029",
  },
  {
    client: "Cape Kings",
    scope: "Google + Meta account rebuild",
    outcome: "1.8 → 3.4",
    outcomeLabel: "ROAS, 60 DAYS",
    ref: "RCPT-0022",
  },
  {
    client: "Confidential",
    scope: "Security-incident revenue recovery",
    outcome: "11 days → 1",
    outcomeLabel: "TO QUOTE",
    ref: "RCPT-0024",
  },
];

const PILLARS = [
  {
    n: "01",
    title: "Paid Traffic",
    body:
      "Meta, Google and cold outreach, run by the two people who read the numbers. No account managers between you and the work.",
    price: "FROM £8K",
    cadence: "MONTHLY RETAINER",
  },
  {
    n: "02",
    title: "Operational Systems",
    body:
      "CRMs, hub-platforms, audit tools and automation, built to hold the revenue once it lands, and to keep holding it.",
    price: "£15—25K",
    cadence: "FIXED SCOPE",
  },
  {
    n: "03",
    title: "Recovery & Audit",
    body:
      "We find the mis-tracked spend and the revenue leaking out the back, then close the gaps. You keep the findings either way.",
    price: "FROM £4K",
    cadence: "FIXED SCOPE",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Audit",
    body:
      "We start with your numbers. Where the spend goes, where it leaks, and what is actually working today.",
  },
  {
    n: "02",
    title: "Discover",
    body:
      "Two operators, your business, one room. We map the funnel and the back office to it and before we touch a thing.",
  },
  {
    n: "03",
    title: "Build",
    body:
      "Traffic campaigns and the systems to hold them. Shipped, documented, and yours to keep whatever happens next.",
  },
  {
    n: "04",
    title: "Operate",
    body:
      "We run it, read it, and report it, plain numbers you can defend on a board call, sent on the same day each month.",
  },
];

export default async function Home() {
  // Pre-fetch in parallel for future Session 2 ledger integration
  await Promise.all([
    getServices(),
    getFeaturedCaseStudy(),
    getFeaturedTestimonial(),
  ]);

  return (
    <>
      {/* SIGNATURE MOMENT 1 — The Print Hero */}
      <PrintHero />

      {/* MANIFESTO */}
      <section className="py-24 md:py-32 border-t border-[color:var(--color-rule)]">
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

      {/* THE LEDGER (placeholder pending Session 2 WebGL rebuild) */}
      <section className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)] py-24 md:py-32">
        <Container size="wide">
          <div className="flex justify-between items-baseline pb-12 mb-12 border-b border-[#3A3833]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-red)] mb-3 flex items-center gap-2">
                <Stop size={7} color="#C4472E" />
                SELECTED WORK
              </p>
              <h2
                className="font-sans font-black inline-flex items-end gap-3"
                style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.95 }}
              >
                The ledger
                <Stop size="0.36em" color="#C4472E" style={{ marginBottom: "0.08em" }} />
              </h2>
            </div>
            <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
              END OF FORTY-ONE · 2024-2026
            </p>
          </div>

          {/* column headers */}
          <div className="hidden md:grid grid-cols-[1.4fr_2.2fr_1.2fr_1fr] gap-9 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
            <span>CLIENT</span>
            <span>SCOPE</span>
            <span>OUTCOME</span>
            <span className="text-right">READ</span>
          </div>

          <ul className="divide-y divide-[#3A3833] border-t border-[#3A3833]">
            {LEDGER.map((row) => (
              <li
                key={row.ref}
                className="grid md:grid-cols-[1.4fr_2.2fr_1.2fr_1fr] gap-9 py-6 md:py-8 items-center cursor-pointer hover:bg-[#232220] transition-colors px-1 md:px-0"
              >
                <span className="flex items-center gap-3 font-sans font-semibold text-lg md:text-xl">
                  <Stop size={9} color="#C4472E" />
                  {row.client}
                </span>
                <span className="text-sm md:text-base text-[#D4CFC2] leading-snug">
                  {row.scope}
                </span>
                <span className="font-mono text-lg md:text-xl font-bold text-[color:var(--color-paper)]">
                  {row.outcome}
                  {row.outcomeLabel && (
                    <small className="block text-[10px] tracking-[0.18em] text-[color:var(--color-pencil)] mt-1 uppercase font-normal">
                      {row.outcomeLabel}
                    </small>
                  )}
                </span>
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-pencil)]">
                  {row.ref} →
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* WHAT COUNTS */}
      <section className="py-24 md:py-32 border-t border-[color:var(--color-rule)]">
        <Container size="wide">
          <div className="flex justify-between items-baseline pb-8 mb-12 border-b border-[color:var(--color-ink)]">
            <h2
              className="font-sans font-black inline-flex items-end gap-3"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1 }}
            >
              What counts
              <Stop size="0.32em" color="#C4472E" style={{ marginBottom: "0.08em" }} />
            </h2>
            <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-pencil)]">
              THREE PILLARS · ONE STUDIO
            </p>
          </div>

          <ul className="divide-y divide-dotted divide-[color:var(--color-rule)]">
            {PILLARS.map((p) => (
              <li
                key={p.n}
                className="grid md:grid-cols-[60px_280px_1fr_auto] gap-6 md:gap-9 py-8 md:py-10 items-baseline hover:bg-[color:var(--color-slip)] transition-colors px-2 md:px-0"
              >
                <span className="font-mono text-sm uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
                  {p.n}
                </span>
                <h3
                  className="font-sans font-extrabold tracking-[-0.02em]"
                  style={{ fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1 }}
                >
                  {p.title}
                </h3>
                <p className="text-base md:text-lg leading-[1.55] text-[color:var(--color-ink-soft)] max-w-[55ch]">
                  {p.body}
                </p>
                <div className="text-left md:text-right font-mono">
                  <p className="text-xl md:text-2xl font-bold text-[color:var(--color-ink)]">
                    {p.price}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)] mt-1">
                    {p.cadence}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* SUBTOTAL */}
      <section className="bg-[color:var(--color-slip)] py-24 md:py-32 border-t border-b border-[color:var(--color-ink)]">
        <Container size="wide">
          <div className="flex justify-between items-baseline pb-8 mb-14 border-b border-[color:var(--color-ink)]">
            <p className="font-mono text-sm uppercase tracking-[0.22em] font-bold">
              SUBTOTAL · 2024—2026
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-pencil)]">
              REV. 01 · 27.06.2026
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {[
              { label: "Recovered spend", value: "£4.82m", unit: "Across 14 clients" },
              { label: "Hours back", value: "18,400", unit: "Per quarter" },
              { label: "Projects shipped", value: "42", unit: "Signed & dated" },
              { label: "Years operating", value: "08", unit: "WP / WC / Next.js" },
            ].map((m) => (
              <div
                key={m.label}
                className="border-t border-[color:var(--color-ink)] pt-4 flex flex-col gap-3"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
                  {m.label}
                </span>
                <span
                  className="font-mono font-bold leading-[0.95] tracking-[-0.02em]"
                  style={{
                    fontSize: "clamp(36px, 5vw, 68px)",
                    fontFeatureSettings: "'tnum'",
                  }}
                >
                  {m.value}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
                  {m.unit}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-6 border-t border-[color:var(--color-ink)] flex justify-between font-mono text-xs uppercase tracking-[0.18em]">
            <span>END OF SUBTOTAL</span>
            <span className="text-[color:var(--color-red)] font-bold flex items-center gap-2.5">
              DELIVERED
              <Stop size={9} color="#C4472E" />
            </span>
          </div>
        </Container>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)] py-24 md:py-32">
        <Container size="wide">
          <div className="flex justify-between items-baseline pb-6 mb-16 border-b border-[#3A3833]">
            <h2
              className="font-sans font-black inline-flex items-end gap-3"
              style={{ fontSize: "clamp(36px, 5vw, 70px)", lineHeight: 1 }}
            >
              How we work
              <Stop size="0.32em" color="#C4472E" style={{ marginBottom: "0.08em" }} />
            </h2>
            <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pencil)]">
              FOUR STEPS · REPEATED HONESTLY
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {STEPS.map((s) => (
              <article
                key={s.n}
                className="border border-[#3A3833] p-7 md:p-8 min-h-[280px] flex flex-col gap-5 hover:bg-[#232220] transition-colors"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-pencil)]">
                  STEP {s.n}
                </p>
                <h3 className="font-sans font-extrabold text-[26px] md:text-[28px] tracking-[-0.02em] inline-flex items-end gap-2">
                  {s.title}
                  <Stop size={8} color="#C4472E" style={{ marginBottom: 4 }} />
                </h3>
                <p className="text-sm md:text-[15px] leading-[1.55] text-[#D4CFC2] mt-auto">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 md:py-32 border-t border-[color:var(--color-rule)]">
        <Container size="wide">
          <div className="grid md:grid-cols-[1fr_240px] gap-12 md:gap-16 items-start max-w-5xl mx-auto">
            <div>
              <p
                className="font-sans font-medium leading-[1.32] tracking-[-0.02em]"
                style={{ fontSize: "clamp(26px, 3vw, 42px)" }}
              >
                <span className="text-[color:var(--color-red)] font-black">&ldquo;</span>
                They didn&rsquo;t pitch us. They showed up, found £42,000 we&rsquo;d
                written off, and built the thing that stops it happening again. Then
                they sent the receipts.
                <span className="text-[color:var(--color-red)] font-black">&rdquo;</span>
              </p>
              <p className="mt-6 pt-3 border-t border-[color:var(--color-ink)] text-sm flex items-center gap-3">
                <Stop size={8} color="#C4472E" />
                <strong className="font-bold text-base">James Setton</strong>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-pencil)]">
                  JC SETTON OPTICIANS
                </span>
              </p>
            </div>
            <div className="flex justify-center md:justify-start pt-4">
              <div
                className="inline-block border-[2.5px] border-[color:var(--color-red)] text-[color:var(--color-red)] px-5 py-3 text-center font-mono font-bold uppercase"
                style={{
                  transform: "rotate(-6deg)",
                  fontSize: "13px",
                  letterSpacing: "0.18em",
                  lineHeight: 1.4,
                }}
              >
                SIGNED & DATED
                <div className="font-normal text-[9px] tracking-[0.22em] mt-1.5">
                  27 · 06 · 2026
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 md:py-44 border-t border-[color:var(--color-rule)]">
        <Container size="wide">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 items-center">
            <h2
              className="font-sans font-black inline-flex items-end gap-4 leading-[0.88]"
              style={{
                fontSize: "clamp(56px, 8vw, 130px)",
                letterSpacing: "-0.04em",
              }}
            >
              show us yours
              <Stop size="0.32em" color="#C4472E" style={{ marginBottom: "0.08em" }} />
            </h2>
            <div className="flex flex-col gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-between gap-7 bg-[color:var(--color-ink)] text-[color:var(--color-paper)] px-9 py-7 font-mono text-base font-bold uppercase tracking-[0.16em] hover:bg-[color:var(--color-red)] transition-colors"
              >
                <span>Book discovery call</span>
                <span className="text-2xl">→</span>
              </Link>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-pencil)]">
                30 MIN · NO PITCH · BRING NUMBERS
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
