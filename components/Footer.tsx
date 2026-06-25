export default function Footer() {
  return (
    <footer className="dm-footer">
      <div className="dm-footer-grid">
        <div>
          <div className="dm-logo dm-logo--footer">
            Dadi<span className="dm-logo-accent">Ma</span><span className="dm-logo-emoji">🪔</span>
          </div>
          <p className="dm-footer-desc">Magical stories. Timeless values. In your child&apos;s language.</p>
          <div className="dm-footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div className="dm-footer-col">
          <div className="dm-footer-heading">Product</div>
          <a href="#themes">Stories</a>
          <a href="#languages">Languages</a>
          <a href="#pricing">Pricing</a>
          <a href="/library">Library</a>
        </div>

        <div className="dm-footer-col">
          <div className="dm-footer-heading">Company</div>
          <a href="/about">About us</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy policy</a>
        </div>

        <div className="dm-footer-col">
          <div className="dm-footer-heading">Support</div>
          <a href="/help">Help center</a>
          <a href="/terms">Terms of service</a>
          <a href="/refund">Refund policy</a>
        </div>

        <div className="dm-footer-col">
          <div className="dm-footer-heading">Stay updated</div>
          <p className="dm-footer-desc">Get new stories and updates</p>
          <form className="dm-newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="dm-footer-bottom">
        <span>© 2026 Dadima. All rights reserved.</span>
        <span>Made with ❤️ for Indian families</span>
      </div>
    </footer>
  );
}
