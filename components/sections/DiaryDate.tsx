"use client";

import { useEffect, useState } from "react";
import { isoWeekNumber } from "@/lib/availability";

/**
 * DiaryDate — the hero's diary-entry header line.
 *
 * "Wk {isoWeek} · {weekday} {dd} {month}", computed client-side after
 * mount to avoid hydration mismatch. Height is reserved so nothing
 * shifts when the real date lands.
 */
export function DiaryDate() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const weekday = now.toLocaleDateString("en-GB", { weekday: "long" });
    const dd = String(now.getDate()).padStart(2, "0");
    const month = now.toLocaleDateString("en-GB", { month: "long" });
    setLabel(`Wk ${isoWeekNumber(now)} · ${weekday} ${dd} ${month}`);
  }, []);

  return (
    <div className="min-h-[1.5em] font-mono text-xs uppercase tracking-[0.22em] text-text-3">
      {label ?? " "}
    </div>
  );
}
