import { APPOINTMENTS } from "@/lib/content/appointments";
import { StampReveal } from "./StampReveal";

/**
 * ReBooked — proof by repeat business. Three quote cards from clients
 * who finished one engagement and booked the next, each carrying a
 * stamped re-booking date that stamps in on scroll.
 */

/** Strip dashes from source copy and trim to a sentence boundary near maxLen. */
function trimQuote(text: string, maxLen = 160): string {
  const clean = text.replace(/\s*[—–]\s*/g, ", ").trim();
  if (clean.length <= maxLen) return clean;
  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [clean];
  let out = "";
  for (const s of sentences) {
    if (out.length + s.length > maxLen) break;
    out += s;
  }
  return (out.trim() || clean.slice(0, maxLen).trim()).trim();
}

/** "RE-BOOKED · Q3 2026 — AI CALLING AGENT" -> "Q3 2026, AI Calling Agent" detail. */
function stampDetail(rebookedAt: string): string {
  return rebookedAt
    .replace(/^RE-BOOKED\s*·\s*/i, "")
    .replace(/^RETAINED\s*·\s*/i, "")
    .replace(/\s*[—–]\s*/g, ", ")
    .trim();
}

export function ReBooked() {
  const cards = APPOINTMENTS.filter(
    (a) => a.quote && a.quote.rebookedAt,
  ).slice(0, 3);

  return (
    <section className="bg-surface-0">
      <div className="container mx-auto max-w-[1400px] px-6 py-28 md:px-10">
        <h2 className="m-0 text-5xl">They came back.</h2>
        <p className="mt-4 max-w-[44ch] text-lg text-text-2">
          Clients who finished one engagement and booked the next. The stamps
          are real.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((appointment, i) => {
            const quote = appointment.quote!;
            return (
              <article
                key={appointment.slug}
                className="relative rounded-lg border border-hairline bg-surface-1 p-8 pt-10"
              >
                <StampReveal
                  className="absolute -top-3 right-6"
                  delayMs={i * 120}
                  label={`Re-booked · ${stampDetail(quote.rebookedAt!)}`}
                />
                <p className="m-0 text-base leading-relaxed text-text-1">
                  &ldquo;{trimQuote(quote.text)}&rdquo;
                </p>
                <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                  {quote.author}, {quote.role}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
