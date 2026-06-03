"use client";

interface Props {
  onStartFree: () => void;
  onShowComing: (msg: string) => void;
}

export default function PricingCards({ onStartFree, onShowComing }: Props) {
  const plans = [
    {
      tier: "FREE FOREVER", price: "₹0", sub: "/ month",
      features: ["3 stories per month", "All 10 languages", "All 5 themes", "Read on screen"],
      cta: "Start for free", primary: false, badge: "",
    },
    {
      tier: "MONTHLY", price: "₹99", sub: "/ month",
      features: ["Unlimited stories", "Save to library", "PDF download", "Cancel anytime"],
      cta: "Start for ₹99", primary: true, badge: "MOST POPULAR",
    },
    {
      tier: "STORYBOOK", price: "₹499", sub: "one-time",
      features: ["Print-ready PDF", "Illustrated book", "Gift-wrapped delivery", "Keep forever"],
      cta: "Order storybook", primary: false, badge: "",
    },
  ];

  return (
    <section id="pricing" style={{
      background: "linear-gradient(160deg,#0b0920 0%,#160d30 100%)",
      padding: "88px 24px"
    }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <p style={{
          textAlign: "center", color: "#f0a75b", fontSize: "11px",
          letterSpacing: "2.5px", fontWeight: 700, marginBottom: "10px"
        }}>
          ✦ PRICING
        </p>
        <h2 style={{
          textAlign: "center", fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(24px,3vw,38px)", fontWeight: 600,
          color: "var(--cream)", marginBottom: "52px"
        }}>
          Simple, honest pricing
        </h2>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "16px"
        }}>
          {plans.map(p => (
            <div key={p.tier} className="pricing-card magic-hover" style={{
              background: p.primary ? "rgba(240,163,0,0.08)" : "rgba(255,255,255,0.04)",
              border: p.primary ? "1px solid rgba(240,163,0,0.5)" : "1px solid rgba(255,255,255,0.09)",
              borderRadius: "22px", padding: "32px", position: "relative"
            }}>
              {p.badge && (
                <div style={{
                  position: "absolute", top: "-13px", left: "50%",
                  transform: "translateX(-50%)", background: "var(--amber)",
                  color: "white", fontSize: "10px", fontWeight: 800,
                  padding: "5px 16px", borderRadius: "999px",
                  whiteSpace: "nowrap", letterSpacing: "1px"
                }}>
                  {p.badge}
                </div>
              )}
              <div style={{
                fontSize: "10px", color: "#8870a8", letterSpacing: "2px",
                fontWeight: 800, marginBottom: "14px"
              }}>
                {p.tier}
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: "38px",
                color: "var(--cream)", fontWeight: 400, marginBottom: "4px"
              }}>
                {p.price}{" "}
                <span style={{
                  fontSize: "13px", color: "#7860a0",
                  fontFamily: "'Lora', serif"
                }}>
                  {p.sub}
                </span>
              </div>
              <div style={{ marginTop: "22px", display: "flex", flexDirection: "column", gap: "11px" }}>
                {p.features.map(f => (
                  <div key={f} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    fontSize: "13px", color: "#b09acc", fontWeight: 400
                  }}>
                    <span style={{ color: "var(--amber)", fontWeight: 800 }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <button onClick={() =>
                p.primary
                  ? onShowComing("Monthly plan — coming soon! 🚀")
                  : p.tier === "STORYBOOK"
                    ? onShowComing("Storybook printing — coming soon! 🚀")
                    : onStartFree()
              }
                className="magic-hover"
                style={{
                  width: "100%", marginTop: "28px", padding: "13px",
                  borderRadius: "16px",
                  background: p.primary ? "var(--amber)" : "transparent",
                  border: p.primary ? "none" : "1px solid rgba(255,255,255,0.18)",
                  color: p.primary ? "var(--brown)" : "#c9b8d8",
                  fontSize: "14px", fontWeight: 700, cursor: "pointer",
                  fontFamily: "inherit", transition: "all 0.2s"
                }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
