import type { Metadata } from "next";
import { BracketLabel } from "@/components/brand/BracketLabel";
import { FindASlot } from "@/components/sections/FindASlot";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "About",
  description: `${brand.name} is a UK growth & systems studio for owner-operated SMEs. We don't pitch; we ship.`,
};

/**
 * /about — philosophy + how we work + the boring legal stuff.
 * No founder faces, no team page, no "meet the experts" theatre.
 * The brand is the work; the work is the proof.
 */
export default function AboutPage() {
  return (
    <main data-bg="light" style={{ background: "var(--color-paper)" }}>
      <style>{`
        .ab-wrap { max-width: 1480px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 72px); }
        .ab-narrow { max-width: 780px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 72px); }
        .ab-section { padding: clamp(80px, 9vw, 140px) 0; border-top: 1px solid var(--color-rule); }
        .ab-section.dark { background: var(--color-ink); color: var(--color-paper); border-color: #3A3833; }
        .ab-section h2 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(36px, 5.5vw, 80px);
          line-height: 0.95;
          letter-spacing: -0.035em;
          margin-bottom: 32px;
        }
        .ab-section h2 em { font-style: italic; color: var(--color-red); font-family: var(--font-syne); }
        .ab-section.dark h2 em { color: var(--color-red); }
        .ab-section p {
          font-family: var(--font-sans);
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.6;
          opacity: 0.92;
        }
        .ab-section p + p { margin-top: 16px; }
        .ab-section p b { color: var(--color-red); font-weight: 600; opacity: 1; }
        .ab-section.dark p b { color: var(--color-red); }

        .ab-credo {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--color-rule);
          border: 1px solid var(--color-rule);
          margin-top: clamp(48px, 6vw, 80px);
        }
        @media (max-width: 880px) { .ab-credo { grid-template-columns: 1fr; } }
        .ab-credo .item {
          background: var(--color-paper);
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 240px;
        }
        .ab-credo .item h3 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: 22px;
          letter-spacing: -0.018em;
          line-height: 1.1;
        }
        .ab-credo .item h3 em { color: var(--color-red); font-style: italic; font-family: var(--font-syne); }
        .ab-credo .item p { font-size: 14px; line-height: 1.5; }

        .ab-legal {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          padding: 24px 0;
          border-bottom: 1px solid var(--color-rule);
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          line-height: 1.7;
        }
        @media (max-width: 880px) { .ab-legal { grid-template-columns: 1fr; gap: 6px; } }
        .ab-legal .l { color: var(--color-pencil); font-weight: 600; }
        .ab-legal .v { color: var(--color-ink); font-weight: 700; }
        .ab-legal .v small { display: block; color: var(--color-pencil); font-weight: 500; font-size: 10px; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.14em; }
      `}</style>

      {/* HERO */}
      <section
        style={{
          padding: "180px 0 80px",
          background: "var(--color-paper)",
          color: "var(--color-ink)",
        }}
        data-bg="light"
      >
        <div className="ab-wrap">
          <BracketLabel number="ABOUT">a growth &amp; systems studio</BracketLabel>
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(56px, 11vw, 200px)",
              lineHeight: 0.84,
              letterSpacing: "-0.045em",
              marginTop: 24,
              marginBottom: 40,
              maxWidth: "18ch",
            }}
          >
            We don&rsquo;t pitch.<br />
            We{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-red)",
                fontFamily: "var(--font-syne)",
              }}
            >
              ship
            </em>
            .
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(17px, 1.9vw, 24px)",
              lineHeight: 1.45,
              color: "var(--color-ink-soft)",
              maxWidth: "56ch",
            }}
          >
            {brand.name} is a UK growth &amp; systems studio for owner-operated
            SMEs. We build the operational software your business runs on,
            ship the websites that convert, and run the paid traffic that
            fills the diary. <b style={{ color: "var(--color-ink)" }}>One studio, no middle layer.</b>
          </p>
        </div>
      </section>

      {/* HOW WE GOT HERE */}
      <section className="ab-section" data-bg="light">
        <div className="ab-narrow">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="01">how we got here</BracketLabel>
          </div>
          <h2>
            Two operators. <em>Twelve</em> engagements. Zero decks.
          </h2>
          <p>
            We started by accident. One half of the studio was running paid
            traffic for a handful of UK SMEs; the other was building custom
            operations software for similar businesses. Clients kept asking
            for both. We kept handing each other clients. Eventually it made
            sense to stop pretending we were separate.
          </p>
          <p>
            What we noticed across every engagement: <b>the businesses with
            the best paid acquisition were the ones with the cleanest
            back-office systems</b>. The work compounds. Filling the funnel
            is easier when the funnel actually holds.
          </p>
          <p>
            We don&rsquo;t have a team page because we are the team. There&rsquo;s
            no junior strategist between you and the work, no account manager
            in the middle, no founders we&rsquo;ll introduce you to who then
            disappear after the kickoff call.
          </p>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="ab-section dark" data-bg="dark">
        <div className="ab-wrap">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="02" scheme="dark">what we believe</BracketLabel>
          </div>
          <h2 style={{ marginBottom: 0 }}>
            What this studio is{" "}
            <em>built</em> on.
          </h2>
          <div className="ab-credo">
            <div className="item">
              <h3>
                Outcomes <em>over</em> deliverables.
              </h3>
              <p style={{ color: "var(--color-pencil-soft, #B2A99D)" }}>
                We don&rsquo;t price by deck pages or lines of code. We agree on
                an outcome upfront, in writing, and we ship to it. If the
                outcome needs more work than we scoped, we eat it.
              </p>
            </div>
            <div className="item">
              <h3>
                <em>Written</em>, not pitched.
              </h3>
              <p style={{ color: "var(--color-pencil-soft, #B2A99D)" }}>
                Every recommendation, scope, and decision is in writing
                before you pay anything. No proposals deck. No
                consultative-sales theatre. Read it, sit with it, ask the
                awkward questions.
              </p>
            </div>
            <div className="item">
              <h3>
                You <em>own</em> the work.
              </h3>
              <p style={{ color: "var(--color-pencil-soft, #B2A99D)" }}>
                Code, documentation, accounts, credentials, runbooks — all
                yours from day one. If we&rsquo;re not the right partner in
                year three, you walk away with everything we built.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="ab-section" data-bg="light">
        <div className="ab-narrow">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="03">how we work</BracketLabel>
          </div>
          <h2>
            Five days. No <em>theatre</em>.
          </h2>
          <p>
            Day one: audit. We open your ad accounts, your CRM, your back
            office. We read the numbers. By Friday you have a written audit
            of what we found.
          </p>
          <p>
            Day two: discovery. Two operators, your business, one room. We
            map the funnel and the back office end to end — and find what&rsquo;s
            leaking.
          </p>
          <p>
            Day three: quote. Written scope, fixed price for build work,
            retainer for traffic. <b>In writing, before you pay anything.</b>
          </p>
          <p>
            Day four: decide. You sit with it. You ask the awkward questions.
            We answer them in writing. No follow-up pressure.
          </p>
          <p>
            Day five: build. If we&rsquo;re a fit, we start. Sprint planning,
            Loom updates, weekly reports. Stuff ships. You see it ship.
          </p>
        </div>
      </section>

      {/* THE BORING LEGAL */}
      <section
        className="ab-section"
        style={{ background: "var(--color-slip)" }}
        data-bg="light"
      >
        <div className="ab-narrow">
          <div style={{ marginBottom: 20 }}>
            <BracketLabel number="04">the boring legal</BracketLabel>
          </div>
          <h2>
            On the <em>record</em>.
          </h2>
          <div style={{ marginTop: 32 }}>
            <div className="ab-legal">
              <span className="l">Legal name</span>
              <span className="v">{brand.legalName}</span>
            </div>
            <div className="ab-legal">
              <span className="l">Companies House</span>
              <span className="v">{brand.companiesHouseNumber}</span>
            </div>
            <div className="ab-legal">
              <span className="l">Country of incorporation</span>
              <span className="v">United Kingdom</span>
            </div>
            <div className="ab-legal">
              <span className="l">Registered email</span>
              <span className="v">{brand.email}</span>
            </div>
            <div className="ab-legal">
              <span className="l">Trading since</span>
              <span className="v">2024</span>
            </div>
            <div className="ab-legal">
              <span className="l">Insurance</span>
              <span className="v">
                Professional indemnity + public liability
                <small>Hiscox · Policy details on request</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <FindASlot />
    </main>
  );
}
