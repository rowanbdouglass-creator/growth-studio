import { Container } from "@/components/ui/Container";

const steps = [
  {
    n: "01",
    title: "Discover",
    body:
      "We pressure-test your funnel, ad accounts, and systems against vertical playbooks. You get a no-fluff report whether or not we end up working together.",
  },
  {
    n: "02",
    title: "Build",
    body:
      "Campaigns, conversion systems, internal tooling — whatever is most leveraged. Built to keep working when we step back.",
  },
  {
    n: "03",
    title: "Optimise",
    body:
      "Weekly sprints. Every test feeds the next quarter's plan. No recycled generic advice; we iterate on what's real for your numbers.",
  },
  {
    n: "04",
    title: "Scale",
    body:
      "Once a channel or system compounds, we put it on autopilot and turn to the next bottleneck. The intelligence layer keeps everything sharper.",
  },
];

export function ProcessSteps() {
  return (
    <section
      aria-labelledby="process-heading"
      className="py-32 md:py-44 border-t border-rule"
    >
      <Container size="wide">
        <div className="flex items-center gap-3 mb-16 md:mb-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            06 — How we work
          </span>
          <span className="flex-1 h-px bg-rule" />
        </div>

        <h2
          id="process-heading"
          className="font-sans font-medium text-ink leading-[0.98] tracking-[-0.035em] text-5xl md:text-6xl lg:text-7xl mb-20 max-w-3xl"
        >
          Four steps,{" "}
          <span className="italic-editorial font-normal text-ink-soft">
            repeated honestly.
          </span>
        </h2>

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {steps.map((step) => (
            <li
              key={step.n}
              className="anim-reveal pt-6 border-t border-rule"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-6 block">
                {step.n}
              </span>
              <h3 className="font-sans font-medium text-2xl md:text-3xl text-ink mb-4 leading-tight tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="text-ink-soft leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
