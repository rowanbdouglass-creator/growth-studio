import { Container } from "@/components/ui/Container";

/**
 * Top-level marketing loading state. Shown briefly during dynamic
 * route data fetches. Uses skeleton-style placeholders that match
 * the visual rhythm of real content.
 */
export default function Loading() {
  return (
    <section className="py-24 md:py-32">
      <Container size="wide">
        <div className="max-w-3xl space-y-6 animate-pulse">
          <div className="h-6 w-32 rounded-sm bg-surface-elevated" />
          <div className="h-14 w-full max-w-2xl rounded-md bg-surface-elevated" />
          <div className="h-14 w-3/4 rounded-md bg-surface-elevated" />
          <div className="h-5 w-full max-w-xl rounded-md bg-surface mt-4" />
          <div className="h-5 w-2/3 max-w-xl rounded-md bg-surface" />
        </div>
      </Container>
    </section>
  );
}
