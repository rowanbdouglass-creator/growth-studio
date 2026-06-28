"use client";

import WarpDriveShader from "@/components/ui/warp-drive-shader";

/**
 * WarpSection — full-viewport WebGL tunnel effect (Three.js shader)
 * placed immediately after the hero. Acts as a transitional moment
 * between hero and the manifesto section.
 *
 * Mouse position warps the tunnel centre. Subtle text overlay sits
 * above the shader without blocking pointer events on it.
 */
export function WarpSection() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "var(--color-night)",
        color: "var(--color-paper)",
      }}
    >
      <WarpDriveShader />

      {/* Top + bottom gradient masks so the shader fades into adjacent
          dark sections rather than hard-cutting */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(14,13,11,1) 0%, rgba(14,13,11,0.2) 18%, rgba(14,13,11,0.2) 82%, rgba(14,13,11,1) 100%)",
        }}
      />

      {/* Centred text overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          zIndex: 2,
          pointerEvents: "none",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 900 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--color-mute)",
              marginBottom: 24,
              opacity: 0.85,
            }}
          >
            ● WARP IN
          </div>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 600,
              fontSize: "clamp(2.2rem, 5vw, 5.4rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "var(--color-paper)",
              margin: 0,
              textShadow: "0 2px 40px rgba(0,0,0,0.65)",
            }}
          >
            From quiet to{" "}
            <span className="serif-italic">sold out.</span>
          </h2>
          <p
            style={{
              marginTop: 28,
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              lineHeight: 1.5,
              color: "var(--color-paper-soft)",
              maxWidth: "44ch",
              marginLeft: "auto",
              marginRight: "auto",
              textShadow: "0 1px 20px rgba(0,0,0,0.6)",
            }}
          >
            We rebuild the website, the operations, and the paid acquisition
            — and the calendar fills.
          </p>
        </div>
      </div>
    </section>
  );
}
