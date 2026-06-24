interface Props {
  onCreateClick: () => void;
}

export default function HeroSection({ onCreateClick }: Props) {
  return (
    <section className="dm-hero">
      <div className="dm-hero-text">
        <div className="dm-hero-badge">Magical stories for happy childhoods ✦</div>
        <h1 className="dm-hero-title">
          Stories your child<br />will love in their<br />own <span className="dm-accent-text">language.</span>
        </h1>
        <p className="dm-hero-sub">
          Personalized bedtime stories in Hindi, Telugu, Tamil and 10+ Indian languages — ready in seconds.
        </p>
        <button className="dm-btn-primary dm-btn-large" onClick={onCreateClick}>
          <span>🎧</span> Start story free <span>→</span>
        </button>
        <div className="dm-social-proof">
          <div className="dm-avatar-stack">
            <div className="dm-mini-avatar" style={{ background: "#7C5CFC" }}>P</div>
            <div className="dm-mini-avatar" style={{ background: "#059669" }}>A</div>
            <div className="dm-mini-avatar" style={{ background: "#EA580C" }}>R</div>
            <div className="dm-mini-avatar" style={{ background: "#FFB84D" }}>S</div>
          </div>
          <div>
            <div className="dm-rating">
              <span className="dm-stars">★★★★★</span>
              <span className="dm-rating-num">4.9/5</span>
            </div>
            <div className="dm-rating-sub">Trusted by 10,000+ parents</div>
          </div>
        </div>
      </div>

      <div className="dm-hero-art">
        <img src="/dadima/hero-grandma-reading.png" alt="Grandmother reading a storybook to a child" />
      </div>
    </section>
  );
}
