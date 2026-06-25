"use client";

import { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { openRazorpayCheckout } from "@/hooks/useRazorpay";

interface Props {
  onStartFree: () => void;
}

const PLANS = [
  {
    name: "FREE", price: "₹0", period: "/month", badge: null, highlighted: false,
    plan: null as null | "premium" | "family",
    features: ["3 stories per month", "Standard voices", "All themes & languages"],
    cta: "Start free",
  },
  {
    name: "PREMIUM", price: "₹199", period: "/month", badge: "Most popular", highlighted: true,
    plan: "premium" as const,
    features: ["Unlimited stories", "Premium voices", "All themes & languages", "Faster generation", "Download & listen offline"],
    cta: "Upgrade now",
  },
  {
    name: "FAMILY", price: "₹399", period: "/month", badge: null, highlighted: false,
    plan: "family" as const,
    features: ["Up to 4 children", "Unlimited stories", "Premium voices", "All themes & languages", "Priority support"],
    cta: "Get family plan",
  },
];

export default function PricingCards({ onStartFree }: Props) {
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  async function handleUpgrade(plan: "premium" | "family") {
    if (!isSignedIn) return; // SignInButton wrapper handles this
    setLoading(plan);
    setMsg("");
    await openRazorpayCheckout(
      plan,
      user?.primaryEmailAddress?.emailAddress ?? "",
      () => { setLoading(null); setMsg("🎉 You're now on Premium! Refresh to see your plan."); },
      (err) => { setLoading(null); setMsg(err); }
    );
    setLoading(null);
  }

  return (
    <section id="pricing" className="dm-pricing">
      <div className="dm-section-inner">
        <div className="dm-pricing-head">
          <h2 className="dm-h2-large" style={{ textAlign: "center" }}>Simple, honest pricing</h2>
          <p className="dm-pricing-sub">Start free. Upgrade when you love it.</p>
        </div>

        {msg && (
          <div style={{ maxWidth: 480, margin: "0 auto 24px", background: msg.startsWith("🎉") ? "#F0FDF4" : "#FEF2F2", border: `1.5px solid ${msg.startsWith("🎉") ? "#BBF7D0" : "#FECACA"}`, borderRadius: 12, padding: "12px 20px", fontSize: 14, color: msg.startsWith("🎉") ? "#166534" : "#991B1B", textAlign: "center" }}>
            {msg}
          </div>
        )}

        <div className="dm-pricing-grid">
          {PLANS.map(p => (
            <div key={p.name} className={`dm-price-card${p.highlighted ? " dm-price-card--highlighted" : ""}`}>
              {p.badge && <div className="dm-price-badge">{p.badge}</div>}
              <div className="dm-price-name">{p.name}</div>
              <div className="dm-price-amount">
                <span className="dm-price-value" style={{ color: p.highlighted ? "var(--dm-primary)" : "var(--dm-dark)" }}>{p.price}</span>
                <span className="dm-price-period">{p.period}</span>
              </div>
              <div className="dm-price-features">
                {p.features.map(f => (
                  <div key={f} className="dm-price-feature"><span>✓</span>{f}</div>
                ))}
              </div>

              {p.plan === null ? (
                <button className="dm-btn-outline" style={{ width: "100%" }} onClick={onStartFree}>
                  {p.cta}
                </button>
              ) : isSignedIn ? (
                <button
                  className="dm-btn-primary"
                  style={{ width: "100%", opacity: loading === p.plan ? .7 : 1 }}
                  disabled={!!loading}
                  onClick={() => handleUpgrade(p.plan!)}
                >
                  {loading === p.plan ? "Opening checkout…" : p.cta}
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className={p.highlighted ? "dm-btn-primary" : "dm-btn-outline"} style={{ width: "100%" }}>
                    {p.cta}
                  </button>
                </SignInButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
