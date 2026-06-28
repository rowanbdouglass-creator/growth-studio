import type { Metadata } from "next";
import { BracketLabel } from "@/components/brand/BracketLabel";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Find a slot",
  description: `Book a 30-minute call with ${brand.name}. No pitch. Bring numbers.`,
};

/**
 * /contact — find a slot. Placeholder Calendly area, real email,
 * "what to bring" guidance, no form (we don't want low-quality leads
 * from contact forms; we want pre-qualified Calendly bookings).
 */
export default function ContactPage() {
  return (
    <main data-bg="light" style={{ background: "var(--color-paper)" }}>
      <style>{`
        .ct-wrap { max-width: 1480px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 72px); }
        .ct-narrow { max-width: 920px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 72px); }
        .ct-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(48px, 6vw, 96px);
          align-items: start;
        }
        @media (max-width: 980px) { .ct-grid { grid-template-columns: 1fr; } }
        .ct-bring {
          background: var(--color-ink);
          color: var(--color-paper);
          padding: clamp(40px, 5vw, 72px);
        }
        .ct-bring h2 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(28px, 3.6vw, 48px);
          line-height: 0.98;
          letter-spacing: -0.025em;
          margin-bottom: 24px;
        }
        .ct-bring h2 em { font-style: italic; color: var(--color-red); font-family: var(--font-syne); }
        .ct-bring ul { list-style: none; display: flex; flex-direction: column; gap: 0; border-top: 1px solid #3A3833; }
        .ct-bring li {
          padding: 18px 0;
          border-bottom: 1px solid #3A3833;
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 14px;
          align-items: baseline;
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.55;
        }
        .ct-bring li .n {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          color: var(--color-red);
          font-weight: 700;
        }
        .ct-bring p {
          font-family: var(--font-sans);
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-pencil-soft, #B2A99D);
          margin-top: 24px;
        }

        .ct-calendly {
          background: var(--color-slip);
          border: 1px dashed var(--color-rule-soft, #E8E0CE);
          padding: clamp(48px, 6vw, 80px) clamp(32px, 4vw, 56px);
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-height: 460px;
          align-items: flex-start;
          justify-content: center;
        }
        .ct-calendly .meta {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--color-pencil);
          font-weight: 600;
          text-transform: uppercase;
        }
        .ct-calendly h3 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(28px, 3.6vw, 44px);
          letter-spacing: -0.025em;
          line-height: 1;
        }
        .ct-calendly h3 em { font-style: italic; color: var(--color-red); font-family: var(--font-syne); }
        .ct-calendly p {
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.55;
          color: var(--color-ink-soft);
          max-width: 36ch;
        }
        .ct-calendly .row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          padding-top: 14px;
          margin-top: 8px;
          border-top: 1px solid var(--color-rule);
          width: 100%;
        }
        .ct-calendly .item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ct-calendly .item .k {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: var(--color-pencil);
          text-transform: uppercase;
          font-weight: 600;
        }
        .ct-calendly .item .v {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--color-ink);
          font-weight: 600;
          font-feature-settings: "tnum";
        }

        .ct-email {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(20px, 2vw, 28px);
          letter-spacing: -0.018em;
          color: var(--color-ink);
          border-bottom: 2px solid var(--color-ink);
          padding-bottom: 4px;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .ct-email:hover { color: var(--color-red); border-bottom-color: var(--color-red); }
      `}</style>

      {/* HERO */}
      <section
        style={{
          padding: "180px 0 60px",
          background: "var(--color-paper)",
          color: "var(--color-ink)",
        }}
        data-bg="light"
      >
        <div className="ct-wrap">
          <BracketLabel number="BOOK">find a slot</BracketLabel>
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(64px, 13vw, 220px)",
              lineHeight: 0.82,
              letterSpacing: "-0.05em",
              marginTop: 24,
              marginBottom: 32,
              maxWidth: "14ch",
            }}
          >
            book a{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-red)",
                fontFamily: "var(--font-syne)",
              }}
            >
              slot
            </em>
            .
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(17px, 1.9vw, 24px)",
              lineHeight: 1.45,
              color: "var(--color-ink-soft)",
              maxWidth: "52ch",
            }}
          >
            30 minutes. No pitch. No slides. We&rsquo;ll look at your numbers and
            tell you what we&rsquo;d do — <b style={{ color: "var(--color-ink)" }}>in writing</b>{" "}
            — before you pay anything.
          </p>
        </div>
      </section>

      {/* CALENDLY + WHAT TO BRING */}
      <section
        style={{
          padding: "clamp(48px, 6vw, 96px) 0 clamp(96px, 11vw, 160px)",
          background: "var(--color-paper)",
        }}
        data-bg="light"
      >
        <div className="ct-wrap">
          <div className="ct-grid">
            {/* Calendly placeholder */}
            <div className="ct-calendly">
              <span className="meta">SCHEDULE · CALENDLY</span>
              <h3>
                Next open <em>slot</em>.
              </h3>
              <p>
                Friday 14 July · 14:00–14:30 BST. Click below to confirm or
                pick a different time.
              </p>
              <a
                href={`mailto:${brand.email}?subject=YLB%20discovery%20call&body=Hi%20—%20I%27d%20like%20to%20book%20a%2030%20min%20discovery%20call.%20Here%27s%20what%27s%20going%20on%3A%0A%0A`}
                className="ct-email"
                data-cur="pen"
              >
                {brand.email}
                <span>→</span>
              </a>
              <div className="row">
                <div className="item">
                  <span className="k">DURATION</span>
                  <span className="v">30 MIN</span>
                </div>
                <div className="item">
                  <span className="k">FORMAT</span>
                  <span className="v">GOOGLE MEET</span>
                </div>
                <div className="item">
                  <span className="k">COST</span>
                  <span className="v">£0</span>
                </div>
                <div className="item">
                  <span className="k">RESPONSE</span>
                  <span className="v">SAME DAY</span>
                </div>
              </div>
            </div>

            {/* What to bring */}
            <div className="ct-bring">
              <BracketLabel number="01" scheme="dark">
                bring numbers
              </BracketLabel>
              <h2 style={{ marginTop: 24 }}>
                Here&rsquo;s what we&rsquo;ll <em>actually</em> use.
              </h2>
              <ul>
                <li>
                  <span className="n">01</span>
                  <span>
                    Last 3 months of <strong>paid ad spend + revenue</strong>{" "}
                    by channel (if you run paid).
                  </span>
                </li>
                <li>
                  <span className="n">02</span>
                  <span>
                    Last 3 months of <strong>net revenue</strong> + cost of
                    goods if you have it (rough is fine).
                  </span>
                </li>
                <li>
                  <span className="n">03</span>
                  <span>
                    A sentence or two on{" "}
                    <strong>where the operations bottleneck is</strong> right
                    now. &ldquo;Quoting takes too long&rdquo;, &ldquo;jobs slip&rdquo;,
                    whatever it actually is.
                  </span>
                </li>
                <li>
                  <span className="n">04</span>
                  <span>
                    A URL to your <strong>current website</strong> if relevant.
                    We&rsquo;ll have looked at it before the call.
                  </span>
                </li>
              </ul>
              <p>
                You don&rsquo;t need a deck. You don&rsquo;t need to prepare
                anything else. We&rsquo;ll do the prep on our side.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
