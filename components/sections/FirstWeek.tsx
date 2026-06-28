import { BracketLabel } from "@/components/brand/BracketLabel";

const DAYS = [
  {
    label: "DAY 01",
    name: "Monday",
    what: "Audit",
    body:
      "We open your ad accounts, your CRM, your back office. We read the numbers. By Friday you have a written audit.",
    when: "09:00 KICKOFF",
  },
  {
    label: "DAY 02",
    name: "Tuesday",
    what: "Discover",
    body:
      "Two operators, your business, one room. We map the funnel and the back office end to end — and find what's leaking.",
    when: "10:00 SESSION",
  },
  {
    label: "DAY 03",
    name: "Wednesday",
    what: "Quote",
    body:
      "Written scope, fixed price for build work, retainer for traffic. In writing, before you pay anything.",
    when: "EOD DELIVERY",
  },
  {
    label: "DAY 04",
    name: "Thursday",
    what: "Decide",
    body:
      "You sit with it. You ask the awkward questions. We answer them in writing. No follow-up pressure.",
    when: "YOUR PACE",
  },
  {
    label: "DAY 05",
    name: "Friday",
    what: "Build",
    body:
      "If we're a fit, we start. Sprint planning, Loom updates, weekly reports. Stuff ships. You see it ship.",
    when: "10:00 SPRINT 01",
  },
];

/**
 * Your first week — Mon→Fri 5-column grid showing the audit → build flow.
 */
export function FirstWeek() {
  return (
    <section
      data-bg="light"
      style={{
        padding: "clamp(96px, 11vw, 160px) 0",
        background: "var(--color-paper)",
        color: "var(--color-ink)",
      }}
    >
      <style>{`
        .ylb-week-head {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: end;
          margin-bottom: clamp(48px, 6vw, 80px);
        }
        @media (max-width: 880px) {
          .ylb-week-head { grid-template-columns: 1fr; }
        }
        .ylb-week-head h2 {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(44px, 7vw, 110px);
          line-height: 0.95;
          letter-spacing: -0.035em;
        }
        .ylb-week-head h2 em {
          font-style: italic;
          color: var(--color-red);
          font-family: var(--font-syne);
        }
        .ylb-firstweek {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: var(--color-ink);
          border: 1px solid var(--color-ink);
        }
        @media (max-width: 880px) {
          .ylb-firstweek { grid-template-columns: 1fr; }
        }
        .ylb-day {
          background: var(--color-paper);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-height: 280px;
          transition: background 0.35s ease;
        }
        .ylb-day:hover { background: var(--color-paper-soft); }
        .ylb-day .label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--color-pencil);
          font-weight: 600;
          text-transform: uppercase;
        }
        .ylb-day .dayname {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(22px, 2.4vw, 30px);
          letter-spacing: -0.02em;
          line-height: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ylb-day .dayname .ac {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: var(--color-red);
          clip-path: polygon(0 0, 100% 0, 100% 58%, 58% 100%, 0 100%);
        }
        .ylb-day .what {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(18px, 1.8vw, 22px);
          color: var(--color-red);
          letter-spacing: -0.01em;
          line-height: 1.1;
        }
        .ylb-day p {
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-ink-soft);
        }
        .ylb-day .when {
          margin-top: auto;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: var(--color-pencil);
          text-transform: uppercase;
        }
      `}</style>

      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        <div className="ylb-week-head">
          <BracketLabel number="05">your first week</BracketLabel>
          <h2>
            Five days.
            <br />
            No <em>theatre</em>.
          </h2>
        </div>

        <div className="ylb-firstweek">
          {DAYS.map((d) => (
            <div key={d.label} className="ylb-day">
              <div className="label">{d.label}</div>
              <div className="dayname">
                {d.name} <span className="ac" />
              </div>
              <div className="what">{d.what}</div>
              <p>{d.body}</p>
              <div className="when">{d.when}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
