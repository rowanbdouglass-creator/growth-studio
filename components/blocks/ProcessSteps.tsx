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
      "Campaigns, conversion systems, internal tooling — whatever is most leveraged for your business. Built to keep working when we step back.",
  },
  {
    n: "03",
    title: "Optimise",
    body:
      "Weekly sprints. Every test feeds the next quarter's plan. We don't recycle generic advice; we iterate on what's real for your numbers.",
  },
  {
    n: "04",
    title: "Scale",
    body:
      "Once a channel or system compounds, we put it on autopilot and turn to the next bottleneck. The intelligence layer keeps everything sharper over time.",
  },
];

export function ProcessSteps() {
  return (
    <section
      aria-labelledby="process-heading"
      className="py-24 md:py-32"
    >
      <Container size="wide">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-6">
            How we work
          </p>
          <h2
            id="process-heading"
            className="font-serif text-4xl md:text-5xl font-medium leading-[1.1] text-text-primary"
          >
            Four steps,{" "}
            <span className="italic text-text-secondary">repeated honestly.</span>
          </h2>
        </div>

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {steps.map((step) => (
            <li
              key={step.n}
              className="anim-reveal bg-background p-8 md:p-10 transition-colors duration-200 hover:bg-surface"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-6">
                {step.n}
              </p>
              <h3 className="font-serif text-2xl text-text-primary mb-4">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
