"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14,
    border: "1.5px solid #ECECEC", fontFamily: "inherit", background: "#fff",
    color: "#111827", outline: "none", marginTop: 6, transition: "border-color .2s",
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ background: "#FFFBF6", minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 32px" }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: "#7C5CFC", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>CONTACT US</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#111827", letterSpacing: "-.03em", marginBottom: 8 }}>
          We&apos;d love to hear from you
        </h1>
        <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 48 }}>
          Questions, feedback, or just want to say hello — write to us and we&apos;ll get back within 24 hours.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
          {[
            { icon: "✉️", label: "Email", value: "hello@dadima.app" },
            { icon: "📍", label: "Location", value: "Hyderabad, India" },
          ].map(c => (
            <div key={c.label} style={{ background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 16, padding: "20px 24px" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#9CA3AF", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{c.value}</div>
            </div>
          ))}
        </div>

        {sent ? (
          <div style={{ background: "#F0FDF4", border: "1.5px solid #BBF7D0", borderRadius: 16, padding: "32px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#15803D", marginBottom: 8 }}>Message sent!</div>
            <div style={{ fontSize: 14, color: "#6B7280" }}>We&apos;ll get back to you within 24 hours.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 20, padding: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>Your name</label>
                <input style={inputStyle} placeholder="Priya Sharma" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                  onFocus={e => e.currentTarget.style.borderColor = "#7C5CFC"}
                  onBlur={e => e.currentTarget.style.borderColor = "#ECECEC"} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>Email address</label>
                <input style={inputStyle} type="email" placeholder="priya@email.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                  onFocus={e => e.currentTarget.style.borderColor = "#7C5CFC"}
                  onBlur={e => e.currentTarget.style.borderColor = "#ECECEC"} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>Subject</label>
              <input style={inputStyle} placeholder="e.g. Question about Premium plan" value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required
                onFocus={e => e.currentTarget.style.borderColor = "#7C5CFC"}
                onBlur={e => e.currentTarget.style.borderColor = "#ECECEC"} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>Message</label>
              <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} placeholder="Tell us how we can help..."
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required
                onFocus={e => e.currentTarget.style.borderColor = "#7C5CFC"}
                onBlur={e => e.currentTarget.style.borderColor = "#ECECEC"} />
            </div>
            <button type="submit" style={{
              width: "100%", padding: "14px", borderRadius: 12,
              background: "#7C5CFC", color: "#fff", border: "none",
              fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 4px 16px rgba(124,92,252,.3)",
            }}>
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
