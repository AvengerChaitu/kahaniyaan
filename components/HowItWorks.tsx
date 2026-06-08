export default function HowItWorks() {
  const stepIcons = [
    "/illustrations/step-1-name.svg",
    "/illustrations/step-2-language.svg",
    "/illustrations/step-3-story.svg"
  ];

  return (
    <section id="how" style={{ background: "linear-gradient(135deg, #f5deb3 0%, #f4e4c1 50%, #ede5ce 100%)", padding: "6rem 2rem", position: "relative" }}>
      <p style={{
        fontFamily: "'Dancing Script', cursive", fontSize: "clamp(0.95rem, 2vw, 1.3rem)",
        textAlign: "center", color: "#c1440e", letterSpacing: "0.15em",
        marginBottom: "0.5rem"
      }}>
        ✦ Simple as a bedtime story ✦
      </p>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem,4vw,2.75rem)", lineHeight: 1.22,
        color: "#3d2817", marginBottom: "0.4rem", textAlign: "center"
      }}>
        How Dadima Works
      </h2>
      <p style={{
        fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
        color: "#5c3d2e", marginBottom: "3.5rem", textAlign: "center"
      }}>
        Three simple steps to story time magic
      </p>
      <div style={{
        maxWidth: "900px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: "2rem"
      }}>
        {[
          { title: "Enter your child's name", desc: "Type their name, pick their age — they'll be the hero of their own story." },
          { title: "Choose language & theme", desc: "Pick from 10 Indian languages and 5 timeless themes like Panchatantra and Birbal." },
          { title: "Get a unique story", desc: "AI crafts a personalized tale in seconds, ready to read aloud or save for later." },
        ].map((s, i) => (
          <div key={i} className="step-card warm-card magic-hover" style={{
            textAlign: "center", padding: "2rem 1.4rem",
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(245,222,179,0.6) 0%, rgba(244,228,193,0.5) 100%)",
            transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)"
          }}>
            {/* SVG Icon */}
            <div style={{
              width: "100%", height: "120px", marginBottom: "1.2rem",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <img
                src={stepIcons[i]}
                alt={s.title}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "#3d2817", marginBottom: "0.8rem", fontWeight: 600
            }}>
              {s.title}
            </h3>
            <p style={{
              fontSize: "clamp(0.85rem, 2vw, 0.95rem)", lineHeight: 1.6,
              color: "#5c3d2e"
            }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
