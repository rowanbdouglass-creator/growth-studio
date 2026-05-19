import { brand } from "@/config/brand";

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl w-full">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-8">
          {brand.tagline}
        </p>

        <h1 className="text-5xl md:text-6xl font-serif font-medium leading-[1.05] text-text-primary mb-8">
          A growth studio for businesses{" "}
          <span className="italic text-text-secondary">ready to scale.</span>
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12">
          Paid traffic that performs. Custom operational systems that compound.
          An intelligence layer that makes both smarter every quarter.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-accent text-background font-medium text-base hover:bg-accent-hover transition-colors"
          >
            Run a free audit
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-border-strong text-text-primary font-medium text-base hover:bg-surface transition-colors"
          >
            See our work
          </a>
        </div>

        <p className="font-mono text-xs text-text-tertiary mt-24">
          Foundation — Phase 1 ✱ Design tokens, fonts, and brand abstraction wired.
        </p>
      </div>
    </main>
  );
}
