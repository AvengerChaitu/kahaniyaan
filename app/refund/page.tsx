export default function RefundPage() {
  return (
    <div style={{ background: "#FFFBF6", minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 32px" }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: "#7C5CFC", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>LEGAL</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#111827", letterSpacing: "-.03em", marginBottom: 8 }}>Refund Policy</h1>
        <p style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 48 }}>Last updated: June 25, 2026</p>

        <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.85, marginBottom: 48 }}>
          We want you to love Dadima. If something is not working for you, we will always try to make it right. Here is our refund policy, written plainly.
        </p>

        {[
          {
            title: "7-day money-back guarantee",
            body: "If you upgrade to a paid plan and are not satisfied for any reason, you can request a full refund within 7 days of your first payment. No questions asked. Simply email hello@dadima.app with the subject line \"Refund request\" and we will process it within 2 business days.",
          },
          {
            title: "After 7 days",
            body: "After the 7-day window, we do not offer refunds for the current billing period. However, you can cancel your subscription at any time from your Account settings page, and you will not be charged for the next billing period. Your subscription remains active until the end of the period you have already paid for.",
          },
          {
            title: "Exceptions",
            body: "If there is a technical error on our side that prevented you from using the service — for example, a billing error that charged you twice, or a feature that was completely unavailable — we will refund the affected amount regardless of the 7-day window. Please contact us with details.",
          },
          {
            title: "Free plan",
            body: "The free plan has no charges, so no refunds apply. If you were charged unexpectedly, please contact us immediately — it may be a billing error we want to fix.",
          },
          {
            title: "How to request a refund",
            body: "Email hello@dadima.app with: your registered email address, the date of the charge, and a brief description of the issue. We respond within 24 hours and process approved refunds within 5–7 business days back to your original payment method.",
          },
        ].map((s, i) => (
          <div key={s.title} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, background: "#F5F3FF", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#7C5CFC", flexShrink: 0 }}>{i + 1}</span>
              {s.title}
            </h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85 }}>{s.body}</p>
          </div>
        ))}

        <div style={{ background: "#F5F3FF", border: "1.5px solid #E0D9FF", borderRadius: 16, padding: "24px 28px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#7C5CFC", marginBottom: 6 }}>We want you to be happy.</div>
          <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>
            If you are unhappy with Dadima for any reason, please reach out before requesting a refund. We may be able to help with a technical issue, suggest a better plan for your needs, or simply listen. Email us at <a href="mailto:hello@dadima.app" style={{ color: "#7C5CFC", fontWeight: 600 }}>hello@dadima.app</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
