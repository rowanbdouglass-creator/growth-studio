import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

/**
 * Dynamic Open Graph image (1200x630) used for LinkedIn/Twitter/etc
 * social previews. Brand-aligned: massive ylb wordmark with red b,
 * descriptor and tagline below, "you look booked" eyebrow above.
 */

export const runtime = "edge";
export const alt = brand.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F3EFE6",
          display: "flex",
          flexDirection: "column",
          padding: "72px 72px 64px",
          fontFamily: "system-ui",
          position: "relative",
        }}
      >
        {/* Top meta strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8C887D",
            fontWeight: 600,
            paddingBottom: 24,
            borderBottom: "1px solid #DACBB1",
          }}
        >
          <span>
            <span style={{ color: "#C4472E", fontWeight: 700 }}>·</span>{" "}
            YOU LOOK BOOKED
          </span>
          <span>UK · EST. 2024</span>
        </div>

        {/* Main: massive wordmark */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 0,
              fontWeight: 900,
              fontSize: 340,
              letterSpacing: "-0.05em",
              lineHeight: 0.86,
              color: "#1B1A17",
            }}
          >
            <span>y</span>
            <span>l</span>
            <span style={{ color: "#C4472E" }}>b</span>
          </div>
        </div>

        {/* Bottom: tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            paddingTop: 24,
            borderTop: "1px solid #1B1A17",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#1B1A17",
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              maxWidth: 880,
            }}
          >
            {brand.shortTagline}
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8C887D",
              fontWeight: 600,
            }}
          >
            A GROWTH &amp; SYSTEMS STUDIO ·{" "}
            <span style={{ color: "#C4472E" }}>
              youlookbooked.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
