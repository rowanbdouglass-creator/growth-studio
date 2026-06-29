/**
 * Section 2 — "The Product" dashboard showcase. Mirrors the reference
 * site's "Streamline complex tasks" pattern: centered eyebrow +
 * headline above a glassy dashboard mockup card built from real DOM
 * (no image) so it's pin-sharp, accessible, and adds zero LCP weight.
 *
 * Visuals: glass card on the dark night background, lime accents,
 * SVG line chart, KPI tiles, recent-activity sidebar.
 * Aesthetic: dark + lime (option B — keep brand, clone structure).
 */
export function DashboardShowcase() {
  return (
    <section
      data-bg="dark"
      data-surface="dark"
      style={{
        position: "relative",
        padding: "clamp(96px, 12vw, 180px) 0",
        background: "var(--color-night)",
        color: "var(--color-paper)",
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
        overflow: "hidden",
      }}
    >
      {/* Top centered eyebrow + headline */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 72px)",
          textAlign: "center",
          marginBottom: "clamp(56px, 7vw, 96px)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--color-mute)",
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          <span style={{ color: "var(--color-red)" }}>●</span>{" "}
          THE PRODUCT
        </div>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(2.4rem, 5vw, 5.4rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            color: "var(--color-paper)",
            margin: 0,
            maxWidth: "20ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          One dashboard. Every metric{" "}
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--color-red)",
            }}
          >
            that matters.
          </span>
        </h2>
      </div>

      {/* Glass dashboard card */}
      <div
        aria-hidden
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(16px, 3vw, 48px)",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "rgba(22,21,18,0.6)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: "1px solid rgba(243,239,230,0.10)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.7), 0 12px 32px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(243,239,230,0.04) inset",
          }}
        >
          {/* Dashboard tab bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "16px 20px",
              borderBottom: "1px solid var(--color-hairline)",
              background: "rgba(14,13,11,0.4)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "rgba(243,239,230,0.18)",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "rgba(243,239,230,0.18)",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "rgba(243,239,230,0.18)",
              }}
            />
            <div
              style={{
                marginLeft: 16,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                color: "var(--color-mute)",
                textTransform: "uppercase",
              }}
            >
              ylb-hub.app / dashboard
            </div>
            <div style={{ flex: 1 }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                background: "rgba(180,232,19,0.12)",
                border: "1px solid rgba(180,232,19,0.3)",
                borderRadius: 999,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.16em",
                color: "var(--color-red)",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-red)",
                  boxShadow: "0 0 8px var(--color-red-glow)",
                }}
              />
              Live
            </div>
          </div>

          {/* Dashboard nav strip */}
          <div
            style={{
              display: "flex",
              gap: 0,
              padding: "12px 24px",
              borderBottom: "1px solid var(--color-hairline)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-mute)",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                color: "var(--color-paper)",
                padding: "8px 16px",
                background: "rgba(243,239,230,0.06)",
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              Overview
            </span>
            <span style={{ padding: "8px 16px", marginRight: 8 }}>
              Customers
            </span>
            <span style={{ padding: "8px 16px", marginRight: 8 }}>Jobs</span>
            <span style={{ padding: "8px 16px" }}>Reports</span>
          </div>

          {/* Dashboard body grid */}
          <div
            className="dash-body"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 1,
              background: "var(--color-hairline)",
            }}
          >
            {/* MAIN — chart + figure */}
            <div
              style={{
                background: "rgba(14,13,11,0.5)",
                padding: "clamp(20px, 2.4vw, 36px)",
                minHeight: 320,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: "var(--color-mute)",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Revenue · MTD
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 700,
                      fontSize: "clamp(32px, 3.6vw, 52px)",
                      letterSpacing: "-0.02em",
                      color: "var(--color-paper)",
                      lineHeight: 1,
                    }}
                  >
                    £128,400
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--color-red)",
                      marginTop: 8,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                    }}
                  >
                    ▲ 31% vs last month
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  {["7D", "30D", "90D", "YTD"].map((p, i) => (
                    <span
                      key={p}
                      style={{
                        padding: "4px 10px",
                        background: i === 1 ? "rgba(243,239,230,0.08)" : "transparent",
                        color: i === 1 ? "var(--color-paper)" : "var(--color-mute)",
                        borderRadius: 4,
                        fontWeight: 600,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* SVG line chart */}
              <svg
                viewBox="0 0 600 200"
                style={{ width: "100%", height: "auto", display: "block" }}
                preserveAspectRatio="none"
              >
                {/* Horizontal gridlines */}
                {[40, 80, 120, 160].map((y) => (
                  <line
                    key={y}
                    x1={0}
                    x2={600}
                    y1={y}
                    y2={y}
                    stroke="rgba(243,239,230,0.06)"
                    strokeWidth={1}
                  />
                ))}
                {/* Lime area fill */}
                <path
                  d="M 0 160 L 50 145 L 100 150 L 150 130 L 200 138 L 250 115 L 300 120 L 350 100 L 400 92 L 450 75 L 500 70 L 550 50 L 600 40 L 600 200 L 0 200 Z"
                  fill="url(#chartGradient)"
                  opacity={0.45}
                />
                {/* Line */}
                <path
                  d="M 0 160 L 50 145 L 100 150 L 150 130 L 200 138 L 250 115 L 300 120 L 350 100 L 400 92 L 450 75 L 500 70 L 550 50 L 600 40"
                  fill="none"
                  stroke="var(--color-red)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* End dot */}
                <circle cx={600} cy={40} r={5} fill="var(--color-red)" />
                <circle
                  cx={600}
                  cy={40}
                  r={10}
                  fill="none"
                  stroke="var(--color-red)"
                  strokeWidth={1}
                  opacity={0.4}
                />
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-red)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-red)" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>

              {/* Chart x-axis labels */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 12,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: "var(--color-dim)",
                  textTransform: "uppercase",
                }}
              >
                {["1 Jun", "8", "15", "22", "29"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>

            {/* RIGHT — recent activity feed */}
            <div
              style={{
                background: "rgba(14,13,11,0.5)",
                padding: "clamp(20px, 2vw, 28px)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "var(--color-mute)",
                    textTransform: "uppercase",
                  }}
                >
                  Recent activity
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-dim)",
                  }}
                >
                  Live
                </div>
              </div>
              {[
                { title: "Order #1247", meta: "£840 · paid", time: "2m" },
                { title: "Restock alert", meta: "Caps · Black", time: "8m" },
                { title: "New booking", meta: "Fri 14 Jul", time: "14m" },
                { title: "AI agent reply", meta: "Customer #842", time: "22m" },
                { title: "Invoice sent", meta: "Forum Studios", time: "31m" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 12,
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom:
                      i < 4 ? "1px solid var(--color-hairline)" : "none",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--color-paper)",
                        marginBottom: 2,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.12em",
                        color: "var(--color-mute)",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.meta}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--color-dim)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom KPI strip */}
          <div
            className="dash-kpis"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              background: "var(--color-hairline)",
              borderTop: "1px solid var(--color-hairline)",
            }}
          >
            {[
              { label: "Jobs in production", value: "42", delta: "+8" },
              { label: "Active customers", value: "187", delta: "+12" },
              { label: "Hours recovered / mo", value: "96", delta: "↑" },
              { label: "Pipeline value", value: "£72k", delta: "▲" },
            ].map((k) => (
              <div
                key={k.label}
                style={{
                  background: "rgba(14,13,11,0.5)",
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    color: "var(--color-mute)",
                    textTransform: "uppercase",
                  }}
                >
                  {k.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 700,
                      fontSize: 28,
                      letterSpacing: "-0.02em",
                      color: "var(--color-paper)",
                      lineHeight: 1,
                    }}
                  >
                    {k.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--color-red)",
                      fontWeight: 700,
                    }}
                  >
                    {k.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .dash-body { grid-template-columns: 1fr !important; }
          .dash-kpis { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
