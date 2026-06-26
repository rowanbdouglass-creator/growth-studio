"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Decorative mockup of a workflow operations hub. Used as the
 * visual anchor for the featured case study (Nayim's Embroideries).
 * Multiple "stations" highlight in sequence to suggest real workflow
 * movement. Not a real product screenshot, until we have one this
 * communicates "we build software" credibly.
 */
export function HubMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setActive(true);
      setStage(2);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            obs.unobserve(el);
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Cycle through workflow stages every 2.5s once active
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setStage((s) => (s + 1) % 4);
    }, 2400);
    return () => clearInterval(id);
  }, [active]);

  const stations = [
    { key: "estimate", label: "Estimate", count: "47", state: "live" },
    { key: "artwork", label: "Artwork", count: "12", state: "live" },
    { key: "production", label: "Production", count: "9", state: "live" },
    { key: "dispatch", label: "Dispatch", count: "23", state: "live" },
  ];

  const orders = [
    { ref: "NE-2034", client: "Forum FC", method: "Embroidery", qty: 24, status: "Mockup approved" },
    { ref: "NE-2035", client: "Westend Tees", method: "Print", qty: 80, status: "In production" },
    { ref: "NE-2036", client: "Stage Crew", method: "Vinyl", qty: 12, status: "Awaiting stock" },
    { ref: "NE-2037", client: "Confidential", method: "Embroidery", qty: 6, status: "Quoted" },
  ];

  return (
    <div ref={ref} className="relative w-full">
      {/* Halo */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 50%, oklch(0.86 0.012 245 / 0.16), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div
        className="relative rounded-xl border border-border-strong overflow-hidden backdrop-blur-xl"
        style={{
          background:
            "linear-gradient(155deg, oklch(0.18 0.008 260 / 0.65) 0%, oklch(0.13 0.006 260 / 0.92) 70%)",
          boxShadow:
            "0 30px 80px -20px oklch(0 0 0 / 0.55), 0 0 0 1px oklch(1 0 0 / 0.04) inset",
          aspectRatio: "4 / 3",
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-canvas-2/40">
          <div className="flex items-center gap-2">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-mute">
              Nayim's Hub · Live
            </span>
          </div>
          <span className="font-mono text-[9px] text-ink-dim">
            nayims-hub.local
          </span>
        </div>

        <div className="p-4 grid grid-rows-[auto_1fr] gap-3 h-[calc(100%-32px)]">
          {/* Stations row */}
          <div className="grid grid-cols-4 gap-2">
            {stations.map((station, i) => (
              <div
                key={station.key}
                className="rounded border border-border bg-canvas/60 p-2 transition-all duration-500"
                style={{
                  borderColor:
                    i === stage
                      ? "oklch(0.86 0.012 245 / 0.7)"
                      : "oklch(0.22 0.006 260)",
                  backgroundColor:
                    i === stage
                      ? "oklch(0.86 0.012 245 / 0.06)"
                      : "oklch(0.13 0.006 260 / 0.5)",
                }}
              >
                <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-ink-mute mb-0.5">
                  {station.label}
                </p>
                <p
                  className="font-sans font-medium text-ink text-base leading-none"
                  style={{ fontFeatureSettings: "'tnum'" }}
                >
                  {station.count}
                </p>
              </div>
            ))}
          </div>

          {/* Orders table */}
          <div className="rounded border border-border bg-canvas/30 overflow-hidden">
            <div className="grid grid-cols-[1fr_1.2fr_1fr_0.5fr_1.4fr] gap-3 px-3 py-1.5 border-b border-border bg-canvas-2/50">
              {["Ref", "Client", "Method", "Qty", "Status"].map((h) => (
                <span
                  key={h}
                  className="font-mono text-[7px] uppercase tracking-[0.18em] text-ink-mute"
                >
                  {h}
                </span>
              ))}
            </div>
            <div className="divide-y divide-border/60">
              {orders.map((o, i) => (
                <div
                  key={o.ref}
                  className="grid grid-cols-[1fr_1.2fr_1fr_0.5fr_1.4fr] gap-3 px-3 py-2 items-center"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "translateY(0)" : "translateY(6px)",
                    transition: `opacity 500ms ${500 + i * 110}ms, transform 500ms ${500 + i * 110}ms cubic-bezier(0.16,1,0.3,1)`,
                  }}
                >
                  <span className="font-mono text-[9px] text-ink">{o.ref}</span>
                  <span className="text-[10px] text-ink-soft truncate">
                    {o.client}
                  </span>
                  <span className="font-mono text-[9px] text-ink-mute">
                    {o.method}
                  </span>
                  <span
                    className="font-mono text-[9px] text-ink"
                    style={{ fontFeatureSettings: "'tnum'" }}
                  >
                    {o.qty}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1 h-1 rounded-full ${
                        i === stage % orders.length ? "bg-accent" : "bg-ink-mute"
                      }`}
                    />
                    <span className="text-[10px] text-ink-mute truncate">
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
