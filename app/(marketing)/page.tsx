import { HeroDark } from "@/components/sections/HeroDark";

/**
 * Home — CLONE BUILD IN PROGRESS.
 *
 * Section 1 (Hero) shipped. Subsequent sections being added one at a
 * time with per-section audits (frontend-design / ui-ux-pro-max /
 * a11y / perf / copywriting).
 *
 * Previous home preserved at /v5.
 */
export default function Home() {
  return (
    <main data-bg="dark" data-hide-site-header>
      <HeroDark />
    </main>
  );
}
