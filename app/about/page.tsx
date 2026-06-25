export default function AboutPage() {
  return (
    <div style={{ background: "#FFFBF6", minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 32px" }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: "#7C5CFC", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>OUR STORY</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#111827", letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: 24 }}>
          Built for every child who deserves a story in their own language
        </h1>
        <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.85, marginBottom: 48 }}>
          Dadima was born from a simple truth: the most magical stories are the ones told in the language of home. For millions of Indian families, that means Hindi, Telugu, Tamil, Kannada, and more — yet almost no bedtime story apps speak those languages.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginBottom: 56 }}>
          {[
            { num: "680+", label: "Stories generated" },
            { num: "10+", label: "Indian languages" },
            { num: "8",   label: "Story themes" },
            { num: "∞",   label: "Memories created" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 16, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: "#7C5CFC", letterSpacing: "-.04em", marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 16, letterSpacing: "-.02em" }}>Our mission</h2>
        <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.85, marginBottom: 32 }}>
          We believe every child should grow up hearing stories that feel like home — in the same tongue their grandparents used, filled with characters who look and sound like them. Dadima uses AI to make that possible, instantly, for any family anywhere in the world.
        </p>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 16, letterSpacing: "-.02em" }}>Why "Dadima"?</h2>
        <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.85, marginBottom: 32 }}>
          <em>Dadima</em> — दादीमा — is the Hindi word for paternal grandmother. She is the original storyteller. The one who sat with you on a rooftop under the stars, who knew exactly the right story for exactly the right moment. We named our app after her because that warmth, that wisdom, and that love is exactly what we want to bring to every bedtime.
        </p>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 16, letterSpacing: "-.02em" }}>The team</h2>
        <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.85 }}>
          We are a small team of parents, engineers, and storytellers based in India. We are passionate about language, childhood, and the extraordinary things AI can do when pointed at something that truly matters.
        </p>
      </div>
    </div>
  );
}
