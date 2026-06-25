"use client";

import { useState } from "react";

export default function Footer() {
  const [email,   setEmail]   = useState("");
  const [status,  setStatus]  = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errMsg,  setErrMsg]  = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrMsg("");
    try {
      const res  = await fetch("/api/newsletter", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setErrMsg(data.error || "Try again."); setStatus("error"); return; }
      setStatus("done");
      setEmail("");
    } catch {
      setErrMsg("Something went wrong."); setStatus("error");
    }
  }

  return (
    <footer className="dm-footer">
      <div className="dm-footer-grid">
        <div>
          <div className="dm-logo dm-logo--footer">
            Dadi<span className="dm-logo-accent">Ma</span><span className="dm-logo-emoji">🪔</span>
          </div>
          <p className="dm-footer-desc">Magical stories. Timeless values. In your child&apos;s language.</p>
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

          {status === "done" ? (
            <div style={{ fontSize: 13, color: "#059669", fontWeight: 600, padding: "10px 0" }}>
              ✓ You&apos;re subscribed!
            </div>
          ) : (
            <form className="dm-newsletter" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={status === "loading"}
                required
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "…" : "Subscribe"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p style={{ fontSize: 12, color: "#EF4444", marginTop: 6 }}>{errMsg}</p>
          )}
        </div>
      </div>

      <div className="dm-footer-bottom">
        <span>© 2026 Dadima. All rights reserved.</span>
        <span>Made with ❤️ for Indian families</span>
      </div>
    </footer>
  );
}
