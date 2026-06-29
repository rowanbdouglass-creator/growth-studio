import { HeroDark } from "@/components/sections/HeroDark";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";

/**
 * Home — CLONE BUILD IN PROGRESS.
 *
 * Sections shipped: 1 (Hero), 2 (Dashboard showcase). More to come.
 * Per-section audit before each build. Previous home preserved at /v5.
 */
export default function Home() {
  return (
    <main data-bg="dark" data-hide-site-header>
      <HeroDark />
      <DashboardShowcase />
    </main>
  );
}
