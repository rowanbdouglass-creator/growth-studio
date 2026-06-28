/**
 * Empty dark full-page spacer. Sits between major sections to give
 * breathing room and absorb scroll after a pinned section releases.
 */
export function DarkSpacer({ children }: { children?: React.ReactNode }) {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        minHeight: "100vh",
        background: "var(--color-night)",
        position: "relative",
        display: "grid",
        placeItems: "center",
        padding: "0 clamp(24px, 4vw, 72px)",
      }}
    >
      {children ?? null}
    </section>
  );
}
