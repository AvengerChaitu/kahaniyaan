const sections = [
  {
    title: "Information we collect",
    body: `When you create an account, we collect your email address and name. When you generate a story, we store the child's name, age range, and selected language and theme — but never any personally identifiable information about the child beyond the first name you provide. We do not collect the child's full name, date of birth, school, or location.`,
  },
  {
    title: "How we use your information",
    body: `We use your information solely to provide and improve the Dadima service. Specifically: to generate personalized stories, to save your story library, to send transactional emails (account confirmation, password reset), and to improve our AI models in an anonymized, aggregated form. We do not sell your data. We do not share it with advertisers.`,
  },
  {
    title: "Children's privacy",
    body: `Dadima is a service used by parents on behalf of children. We do not knowingly collect information directly from children under 13. The account is held by the parent or guardian, who provides the child's first name purely for story personalization. If you believe we have inadvertently collected information from a child, please contact us immediately at hello@dadima.app and we will delete it.`,
  },
  {
    title: "Data storage and security",
    body: `Your data is stored on secure servers hosted in the European Union and India. We use industry-standard encryption (TLS) for data in transit and AES-256 for data at rest. We conduct regular security audits and maintain strict access controls. No system is 100% secure, but we take every reasonable measure to protect your information.`,
  },
  {
    title: "Cookies",
    body: `We use essential cookies to keep you logged in and to remember your preferences. We do not use third-party advertising cookies or tracking pixels. You may disable cookies in your browser settings, but some features of Dadima may not function correctly as a result.`,
  },
  {
    title: "Your rights",
    body: `You have the right to access, correct, or delete your personal data at any time. You can do this from your Account settings page, or by emailing hello@dadima.app. For users in the EU, you have additional rights under GDPR including the right to data portability and the right to lodge a complaint with a supervisory authority.`,
  },
  {
    title: "Changes to this policy",
    body: `We may update this Privacy Policy from time to time. When we make significant changes, we will notify you by email and update the "Last updated" date below. Continued use of Dadima after such changes constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ background: "#FFFBF6", minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 32px" }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: "#7C5CFC", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>LEGAL</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#111827", letterSpacing: "-.03em", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 48 }}>Last updated: June 25, 2026</p>

        <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.85, marginBottom: 48 }}>
          At Dadima, your family&apos;s privacy is fundamental to everything we do. This policy explains what information we collect, how we use it, and the choices you have. We have written it to be clear and readable — not filled with legal jargon.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 28, height: 28, background: "#F5F3FF", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#7C5CFC", flexShrink: 0 }}>{i + 1}</span>
                {s.title}
              </h2>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85 }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, padding: "24px 28px", background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Questions about this policy?</div>
          <div style={{ fontSize: 14, color: "#6B7280" }}>Email us at <a href="mailto:hello@dadima.app" style={{ color: "#7C5CFC", textDecoration: "none" }}>hello@dadima.app</a> — we respond within 24 hours.</div>
        </div>
      </div>
    </div>
  );
}
