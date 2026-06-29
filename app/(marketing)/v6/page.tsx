import { HeroFinal } from "@/components/sections/HeroFinal";

/**
 * /v6 — clean static hero polished with the original inspiration
 * set (Ascend / Code by Jesse / Monolog). No Three.js, no kinetic,
 * no Spatial-recreation attempt. The restraint is the move.
 */
export default function V6Page() {
  return (
    <main
      data-bg="dark"
      style={{ position: "relative", zIndex: 0, background: "#0E0D0B" }}
    >
      <HeroFinal />
    </main>
  );
}
