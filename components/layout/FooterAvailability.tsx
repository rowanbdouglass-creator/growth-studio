"use client";

import { useEffect, useState } from "react";
import { isoWeekNumber, openSlotCount } from "@/lib/availability";

/**
 * FooterAvailability — the footer's live availability line.
 *
 * Computes the real ISO week number (client-side after mount to avoid
 * hydration mismatch) and reads the open-slot count from
 * lib/availability.ts. Replaces the old hardcoded "AVAILABLE · WEEK n"
 * string.
 */

export function FooterAvailability() {
  const [weekNo, setWeekNo] = useState<number | null>(null);

  useEffect(() => {
    setWeekNo(isoWeekNumber(new Date()));
  }, []);

  const open = openSlotCount();

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--color-red)",
          animation: "ylb-pulse 2.4s ease-in-out infinite",
        }}
      />
      {weekNo === null ? "This week" : `Week ${weekNo}`} &middot; {open} slot
      {open === 1 ? "" : "s"} open
    </span>
  );
}
