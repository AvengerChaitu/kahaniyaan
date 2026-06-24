"use client";

interface Props {
  onStartFree: () => void;
  onShowComing: (msg: string) => void;
}

const PLANS = [
  {
    name: "FREE", price: "₹0", period: "/month", badge: null, highlighted: false,
    features: ["3 stories per month", "Standard voices", "All themes & languages"],
    cta: "Start free",
  },
  {
    name: "PREMIUM", price: "₹199", period: "/month", badge: "Most popular", highlighted: true,
    features: ["Unlimited stories", "Premium voices", "All themes & languages", "Faster generation", "Download & listen offline"],
    cta: "Upgrade now",
  },
  {
    name: "FAMILY", price: "₹399", period: "/month", badge: null, highlighted: false,
    features: ["Up to 4 children", "Unlimited stories", "Premium voices", "All themes & languages", "Priority support"],
    cta: "Get family plan",
  },
];

export default function PricingCards({ onStartFree, onShowComing }: Props) {
  return (
    <section id="pricing" className="dm-pricing">
      <div className="dm-section-inner">
        <div className="dm-pricing-head">
          <h2 className="dm-h2-large" style={{ textAlign: "center" }}>Simple, honest pricing</h2>
          <p className="dm-pricing-sub">Start free. Upgrade when you love it.</p>
        </div>
        <div className="dm-pricing-grid">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`dm-price-card${plan.highlighted ? " dm-price-card--highlighted" : ""}`}
            >
              {plan.badge && <div className="dm-price-badge">{plan.badge}</div>}
              <div className="dm-price-name">{plan.name}</div>
              <div className="dm-price-amount">
                <span
                  className="dm-price-value"
                  style={{ color: plan.highlighted ? "var(--dm-primary)" : "var(--dm-dark)" }}
                >
                  {plan.price}
                </span>
                <span className="dm-price-period">{plan.period}</span>
              </div>
              <div className="dm-price-features">
                {plan.features.map(f => (
                  <div key={f} className="dm-price-feature">
                    <span>✓</span>{f}
                  </div>
                ))}
              </div>
              <button
                className={plan.highlighted ? "dm-btn-primary" : "dm-btn-outline"}
                style={{ width: "100%" }}
                onClick={() =>
                  plan.name === "FREE"
                    ? onStartFree()
                    : onShowComing(`${plan.name} plan — coming soon! 🚀`)
                }
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
