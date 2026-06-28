import Link from "next/link";
import { brand } from "@/config/brand";
import { Wordmark } from "@/components/brand/Wordmark";
import { BracketLabel } from "@/components/brand/BracketLabel";
import { BookedStamp } from "@/components/brand/BookedStamp";
import { PressAndHold } from "@/components/fx/PressAndHold";
import { ScrollReveal } from "@/components/fx/ScrollReveal";
import { Counter } from "@/components/fx/Counter";

export const dynamic = "force-dynamic";

/**
 * Session 1 — Foundation verification page.
 *
 * Shows: brand (Wordmark in 4 sizes), BracketLabel in 3 schemes,
 * BookedStamp in 3 sizes, PressAndHold in 4 variants, Counter,
 * ScrollReveal, Header colour-switching (scroll past sections to test).
 *
 * Session 2 replaces this with the 3 hero compositions.
 */
export default function Home() {
  return (
    <main data-bg="light">
      {/* Hero placeholder — establishes paper canvas for header probe */}
      <section
        className="min-h-screen flex items-center pt-32 pb-20"
        data-bg="light"
      >
        <div
          className="max-w-[1480px] mx-auto px-5 md:px-16 w-full"
          style={{ paddingLeft: "clamp(20px,4vw,72px)", paddingRight: "clamp(20px,4vw,72px)" }}
        >
          <BracketLabel number="00">SESSION 1 · FOUNDATION VERIFIED</BracketLabel>

          <h1
            className="mt-7 mb-7"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(56px, 9.5vw, 180px)",
              lineHeight: 0.84,
              letterSpacing: "-0.045em",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "0.32em",
                color: "var(--color-pencil)",
                display: "block",
                marginBottom: "0.4em",
                lineHeight: 1.1,
              }}
            >
              you look
            </span>
            booked<em
              style={{
                color: "var(--color-red)",
                fontStyle: "italic",
                fontFamily: "var(--font-syne)",
              }}
            >.</em>
          </h1>

          <p
            className="max-w-[46ch] mb-10"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px,1.7vw,22px)",
              lineHeight: 1.45,
              color: "var(--color-ink-soft)",
            }}
          >
            {brand.shortTagline}{" "}
            <b style={{ color: "var(--color-ink)" }}>
              Foundation built. Hero compositions land in Session 2.
            </b>
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/contact" data-cur="pen">
              <PressAndHold
                duration={600}
                onComplete={() => {
                  // placeholder
                }}
              >
                Hold to book
              </PressAndHold>
            </Link>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--color-pencil)",
                textTransform: "uppercase",
              }}
            >
              30 min · no pitch · bring numbers
            </span>
          </div>
        </div>
      </section>

      {/* Component check on red */}
      <section
        className="py-24"
        data-bg="red"
        style={{ background: "var(--color-red)", color: "var(--color-paper)" }}
      >
        <div
          className="max-w-[1480px] mx-auto"
          style={{ paddingLeft: "clamp(20px,4vw,72px)", paddingRight: "clamp(20px,4vw,72px)" }}
        >
          <BracketLabel number="A" scheme="on-red">
            on red surface
          </BracketLabel>

          <ScrollReveal>
            <h2
              className="mt-6 mb-6"
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "clamp(40px,6vw,90px)",
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
              }}
            >
              Wordmark holds on{" "}
              <em
                style={{
                  color: "var(--color-ink)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-syne)",
                }}
              >
                red
              </em>
              .
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="flex flex-wrap items-end gap-10 mb-10">
              <Wordmark size={64} bColor="var(--color-ink)" />
              <Wordmark size={48} bColor="var(--color-ink)" />
              <Wordmark size={32} bColor="var(--color-ink)" />
              <Wordmark size={20} bColor="var(--color-ink)" />
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap items-center gap-6">
            <PressAndHold variant="on-red" duration={600}>
              Hold on red
            </PressAndHold>
            <BookedStamp top="BOOKED" bottom="27 · 06 · 2026" rotate={-6} />
          </div>
        </div>
      </section>

      {/* Component check on ink */}
      <section
        className="py-24"
        data-bg="dark"
        style={{ background: "var(--color-ink)", color: "var(--color-paper)" }}
      >
        <div
          className="max-w-[1480px] mx-auto"
          style={{ paddingLeft: "clamp(20px,4vw,72px)", paddingRight: "clamp(20px,4vw,72px)" }}
        >
          <BracketLabel number="B" scheme="dark">
            on ink surface
          </BracketLabel>

          <ScrollReveal>
            <h2
              className="mt-6 mb-10"
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "clamp(40px,6vw,90px)",
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
              }}
            >
              Counters tick to{" "}
              <em
                style={{
                  color: "var(--color-red)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-syne)",
                }}
              >
                real numbers
              </em>
              .
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "var(--color-pencil-soft, #B2A99D)",
                    marginBottom: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Revenue tracked
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: 48,
                    color: "var(--color-red)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  <Counter to={128000} prefix="£" format="k" />
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "var(--color-pencil-soft, #B2A99D)",
                    marginBottom: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Spend recovered
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: 48,
                    color: "var(--color-red)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  <Counter to={42180} prefix="£" format="comma" />
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "var(--color-pencil-soft, #B2A99D)",
                    marginBottom: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Hours recovered / mo
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: 48,
                    color: "var(--color-red)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  <Counter to={96} />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <PressAndHold variant="on-ink" duration={600}>
            Hold on ink
          </PressAndHold>
        </div>
      </section>

      {/* Session 2 marker */}
      <section
        className="py-24"
        data-bg="light"
        style={{ background: "var(--color-slip)" }}
      >
        <div
          className="max-w-[1480px] mx-auto"
          style={{ paddingLeft: "clamp(20px,4vw,72px)", paddingRight: "clamp(20px,4vw,72px)" }}
        >
          <BracketLabel number="C">next up</BracketLabel>
          <h2
            className="mt-6"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(40px,6vw,90px)",
              lineHeight: 0.96,
              letterSpacing: "-0.035em",
            }}
          >
            Session 2 ships the{" "}
            <em
              style={{
                color: "var(--color-red)",
                fontStyle: "italic",
                fontFamily: "var(--font-syne)",
              }}
            >
              three hero
            </em>{" "}
            compositions.
          </h2>
        </div>
      </section>
    </main>
  );
}
