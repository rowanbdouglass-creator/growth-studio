"use client";

import { BracketLabel } from "@/components/brand/BracketLabel";
import { PressAndHold } from "@/components/fx/PressAndHold";
import { Dashboard } from "@/components/ui/Dashboard";

/**
 * Hero 03 — OPERATIONS (ink bg). Same split layout: massive headline
 * left, dashboard mockup right. Dashboard cards cascade in; KPI
 * numbers count up; chart bars scale up sequentially.
 */
export function HeroOperations() {
  return (
    <section
      data-bg="dark"
      className="ylb-hero ylb-hero-ops"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        padding: "140px 0 56px",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-ink)",
        color: "var(--color-paper)",
      }}
    >
      <div className="h-top">
        <BracketLabel number="03" scheme="dark">
          operations under one roof
        </BracketLabel>
        <span className="h-top-label">
          <b>SYNCING NAYIM&rsquo;S HUB</b> · LAST RUN 14:02
        </span>
      </div>

      <div className="h-grid">
        <h1 className="ylb-hero-h">
          <span className="small">we make your operations</span>
          run like <em>this</em>.
        </h1>
        <Dashboard />
      </div>

      <div className="h-foot">
        <p className="h-foot-sub">
          Quoting, invoicing, production, customer portals, internal hubs —
          the operational software your business actually runs on.{" "}
          <b>Built end-to-end. Owned by you. Connects to QuickBooks, Stripe, WooCommerce.</b>
        </p>
        <PressAndHold
          duration={600}
          variant="on-ink"
          onComplete={() => {
            window.location.href = "/work";
          }}
        >
          See live builds
        </PressAndHold>
      </div>
    </section>
  );
}
