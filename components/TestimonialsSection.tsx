const TESTIMONIALS = [
  {
    quote:    "My daughter looks forward to her Dadima story every night. The stories are beautiful and in our own language!",
    author:   "Priya",
    location: "Hyderabad",
    qColor:   "#7C5CFC",
    avatar:   "/dadima/avatar-priya.png",
  },
  {
    quote:    "Finally, screen time feels meaningful. The stories are educational and so engaging.",
    author:   "Arjun",
    location: "Bengaluru",
    qColor:   "#059669",
    avatar:   "/dadima/avatar-arjun.png",
  },
  {
    quote:    "As grandparents, we love how Dadima keeps our culture and languages alive for our grandchildren.",
    author:   "Sharma Family",
    location: "Pune",
    qColor:   "#EA580C",
    initials: "SF",
    initialsBg: "#EA580C",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="about" className="dm-testimonials">
      <h2 className="dm-h2-large">Why parents love Dadima</h2>
      <div className="dm-testimonial-grid">
        {TESTIMONIALS.map(t => (
          <div key={t.author} className="dm-testimonial-card">
            <span className="dm-quote-mark" style={{ color: t.qColor }}>&ldquo;</span>
            <p className="dm-quote-text">{t.quote}</p>
            <div className="dm-testimonial-footer">
              {t.avatar ? (
                <img src={t.avatar} alt={t.author} className="dm-testimonial-avatar" />
              ) : (
                <div
                  className="dm-testimonial-avatar dm-testimonial-avatar--initials"
                  style={{ background: t.initialsBg }}
                >
                  {t.initials}
                </div>
              )}
              <div>
                <div className="dm-testimonial-author">— {t.author}</div>
                <div className="dm-testimonial-location">{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
