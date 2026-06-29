import { VideoBackdrop } from "@/components/sections/VideoBackdrop";
import { HeroFinal } from "@/components/sections/HeroFinal";
import { Section02Philosophy } from "@/components/sections/Section02Philosophy";
import { Section03OperatingModel } from "@/components/sections/Section03OperatingModel";
import { Section04Work } from "@/components/sections/Section04Work";
import { Section05Stats } from "@/components/sections/Section05Stats";
import { Section06Clients } from "@/components/sections/Section06Clients";
import { Section07Cta } from "@/components/sections/Section07Cta";

/**
 * /v6 — same composition as /, used as the polish sandbox.
 */
export default function V6Page() {
  return (
    <main
      data-bg="dark"
      style={{ position: "relative", zIndex: 0 }}
    >
      <VideoBackdrop />
      <HeroFinal />
      <Section02Philosophy />
      <Section03OperatingModel />
      <Section04Work />
      <Section05Stats />
      <Section06Clients />
      <Section07Cta />
    </main>
  );
}
