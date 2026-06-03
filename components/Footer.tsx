export default function Footer() {
  return (
    <footer style={{
      background: "#060412", padding: "2.8rem 2rem", textAlign: "center",
      borderTop: "1px solid rgba(240,163,0,.08)"
    }}>
      <p style={{
        fontFamily: "'Playfair Display', serif", fontSize: "1.7rem",
        fontWeight: 700, color: "var(--amber-lt)", marginBottom: "0.5rem"
      }}>
        Dadi<em style={{ fontStyle: "italic", color: "var(--amber)" }}>ma</em>
      </p>
      <p style={{
        fontFamily: "'Dancing Script', cursive", fontSize: "0.95rem",
        color: "rgba(253,244,227,.35)", marginBottom: "1.8rem"
      }}>
        Come beta, it&apos;s story time.
      </p>
      <ul style={{
        display: "flex", gap: "2rem", justifyContent: "center",
        flexWrap: "wrap", listStyle: "none", marginBottom: "1.8rem",
        padding: 0
      }}>
        {["About Us", "Stories", "Blog", "Privacy", "Contact"].map(l => (
          <li key={l}>
            <a href="#" className="footer-link" style={{
              color: "rgba(253,244,227,.38)", fontSize: "0.82rem",
              textDecoration: "none"
            }}>
              {l}
            </a>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: "0.78rem", color: "rgba(253,244,227,.22)" }}>
        © 2026 Dadima. Made with love, for every child who deserves a story.
      </p>
    </footer>
  );
}
