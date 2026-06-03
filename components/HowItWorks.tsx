export default function HowItWorks() {
  return (
    <section id="how" style={{ background: "var(--parch)", padding: "6rem 2rem", position: "relative" }}>
      <p style={{
        fontFamily: "'Dancing Script', cursive", fontSize: "1.1rem",
        textAlign: "center", color: "var(--amber)", letterSpacing: "0.15em",
        marginBottom: "0.5rem"
      }}>
        Simple as a bedtime story
      </p>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem,4vw,2.75rem)", lineHeight: 1.22,
        color: "var(--brown)", marginBottom: "0.4rem", textAlign: "center"
      }}>
        How Dadima Works
      </h2>
      <p style={{
        fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "1rem",
        color: "var(--brown3)", marginBottom: "3.5rem", textAlign: "center"
      }}>
        Three simple steps to story time magic
      </p>
      <div style={{
        maxWidth: "880px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
        gap: "1.8rem"
      }}>
        {[
          { n: "01", icon: "✏️", title: "Enter your child's name", desc: "Type their name, pick their age — they'll be the hero of their own story." },
          { n: "02", icon: "🌐", title: "Choose language &amp; theme", desc: "Pick from 10 Indian languages and 5 timeless themes like Panchatantra and Birbal." },
          { n: "03", icon: "📖", title: "Get a unique story", desc: "AI crafts a personalized tale in seconds, ready to read aloud or save for later." },
        ].map((s, i) => (
          <div key={i} style={{
            textAlign: "center", padding: "2.5rem 1.4rem",
            background: "var(--cream)", borderRadius: "22px",
            border: "1px solid rgba(224,106,26,.14)",
            boxShadow: "0 3px 20px rgba(50,20,5,.06)",
            transition: "transform 0.3s, box-shadow 0.3s"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(50,20,5,.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: "3.2rem",
              fontWeight: 700, color: "rgba(240,163,0,.18)", lineHeight: 1,
              marginBottom: "0.6rem"
            }}>
              {s.n}
            </div>
            <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "0.9rem" }}>{s.icon}</span>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "var(--brown)", marginBottom: "0.65rem" }}>
              {s.title}
            </h3>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.72, color: "var(--brown3)" }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
