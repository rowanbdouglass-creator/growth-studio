import { BracketLabel } from "@/components/brand/BracketLabel";
import { Waveform } from "@/components/ui/Waveform";

/**
 * Voice note testimonial — quote rendered as if it were a transcribed
 * voice memo, with animated waveform, timestamps, and attribution.
 */
export function VoiceNote() {
  return (
    <section
      data-bg="light"
      style={{
        padding: "clamp(96px, 11vw, 160px) 0",
        background: "var(--color-slip)",
        color: "var(--color-ink)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <BracketLabel number="03">on the record</BracketLabel>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--color-pencil)",
            marginBottom: 32,
          }}
        >
          <span>
            <b style={{ color: "var(--color-ink)", fontWeight: 700 }}>
              VOICE NOTE · 0:34
            </b>{" "}
            · received 14 may 2025
          </span>
          <span>FROM: J. SETTON</span>
        </div>

        <blockquote
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.8vw, 56px)",
            lineHeight: 1.2,
            letterSpacing: "-0.022em",
            color: "var(--color-ink)",
          }}
        >
          <span
            style={{
              color: "var(--color-red)",
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
            }}
          >
            &ldquo;
          </span>
          They didn&rsquo;t pitch us. They booked a call, looked at the numbers,
          and found{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--color-red)",
              fontFamily: "var(--font-syne)",
            }}
          >
            £42,000 we&rsquo;d already written off
          </em>
          . Then built the thing that stops it happening again. They&rsquo;re on
          next week&rsquo;s diary too.
          <span
            style={{
              color: "var(--color-red)",
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
            }}
          >
            &rdquo;
          </span>
        </blockquote>

        <Waveform />

        <div
          style={{
            display: "flex",
            gap: 18,
            alignItems: "center",
            flexWrap: "wrap",
            paddingTop: 22,
            borderTop: "1px solid var(--color-ink)",
          }}
        >
          <strong
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                background: "var(--color-red)",
                clipPath:
                  "polygon(0 0, 100% 0, 100% 58%, 58% 100%, 0 100%)",
              }}
            />
            James Setton
          </strong>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-pencil)",
            }}
          >
            JC Setton Opticians · London
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-pencil)",
            }}
          >
            RE-BOOKED · SEP 2026
          </span>
        </div>
      </div>
    </section>
  );
}
