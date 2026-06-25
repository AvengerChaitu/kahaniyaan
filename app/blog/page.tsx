"use client";

const POSTS = [
  {
    tag: "Language & Culture",
    tagColor: "#7C5CFC",
    title: "Why bedtime stories in your mother tongue matter more than you think",
    excerpt: "Research shows children develop stronger emotional vocabulary and cultural identity when stories are told in their first language. Here's what the science says — and how you can use it tonight.",
    date: "June 18, 2026",
    readTime: "5 min read",
  },
  {
    tag: "Parenting",
    tagColor: "#059669",
    title: "The Panchatantra is 2,500 years old. Here's why it still works for modern kids",
    excerpt: "From the crow and the snake to the monkey and the crocodile — the fables that shaped Indian childhoods for millennia are more relevant than ever. We explore why.",
    date: "June 10, 2026",
    readTime: "7 min read",
  },
  {
    tag: "Product",
    tagColor: "#EA580C",
    title: "How Dadima personalizes every story to your child",
    excerpt: "We don't just swap a name into a template. Here's a behind-the-scenes look at how our AI weaves your child's name, age, and language into a story that feels genuinely made for them.",
    date: "May 28, 2026",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <div style={{ background: "#FFFBF6", minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 32px" }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: "#7C5CFC", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>DADIMA BLOG</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#111827", letterSpacing: "-.03em", marginBottom: 8 }}>
          Stories, parenting, and language
        </h1>
        <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 56 }}>Ideas for raising curious, rooted, bilingual kids.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {POSTS.map(p => (
            <article key={p.title} style={{
              background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 20,
              padding: 32, cursor: "pointer", transition: "all .2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              <span style={{
                fontSize: 11, fontWeight: 800, color: p.tagColor,
                background: p.tagColor + "18", padding: "4px 12px",
                borderRadius: 999, letterSpacing: 1, display: "inline-block", marginBottom: 14,
              }}>
                {p.tag}
              </span>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 10, lineHeight: 1.35, letterSpacing: "-.02em" }}>
                {p.title}
              </h2>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, marginBottom: 18 }}>{p.excerpt}</p>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>
                <span>{p.date}</span>
                <span>·</span>
                <span>{p.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
