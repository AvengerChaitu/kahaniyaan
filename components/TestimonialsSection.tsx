const TESTIMONIALS = [
  {
    quote:    "My daughter looks forward to her Dadima story every night. The stories are beautiful and in our own language!",
    author:   "Priya",
    location: "Hyderabad",
    qColor:   "#7C5CFC",
    initial:  "P",
    initialBg: "#7C5CFC",
  },
  {
    quote:    "Finally, screen time feels meaningful. The stories are educational and so engaging.",
    author:   "Arjun",
    location: "Bengaluru",
    qColor:   "#059669",
    initial:  "A",
    initialBg: "#059669",
  },
  {
    quote:    "As grandparents, we love how Dadima keeps our culture and languages alive for our grandchildren.",
    author:   "Sharma",
    location: "Pune",
    qColor:   "#EA580C",
    initial:  "S",
    initialBg: "#EA580C",
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
              <div
                className="dm-testimonial-avatar dm-testimonial-avatar--initials"
                style={{ background: t.initialBg }}
              >
                {t.initial}
              </div>
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
