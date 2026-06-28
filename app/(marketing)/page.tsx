import { HeroWeek } from "@/components/sections/HeroWeek";
import { HeroWebsite } from "@/components/sections/HeroWebsite";
import { HeroOperations } from "@/components/sections/HeroOperations";
import { PastAppointments } from "@/components/sections/PastAppointments";
import { VoiceNote } from "@/components/sections/VoiceNote";
import { FirstWeek } from "@/components/sections/FirstWeek";
import { FindASlot } from "@/components/sections/FindASlot";

/**
 * Home page. Composes the three hero demonstrations (Week / Website /
 * Operations) and the supporting sections (Past appointments / Voice
 * note / First week / Find a slot).
 *
 * Direct colour hand-offs between sections — no zoom transitions.
 * Each section sets data-bg so the header switches colour cleanly.
 */
export default function Home() {
  return (
    <main>
      <HeroWeek />
      <HeroWebsite />
      <HeroOperations />
      <PastAppointments />
      <VoiceNote />
      <FirstWeek />
      <FindASlot />
    </main>
  );
}
