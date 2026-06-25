"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How do I generate a story?",
    a: "On the home page, scroll to the \"Create a story\" section. Enter your child's name, select their age group, choose a language, pick a theme, and click \"Generate\". Your personalized story will appear in seconds.",
  },
  {
    q: "How many stories can I generate on the free plan?",
    a: "The free plan gives you 3 story generations per month. Each generation creates a unique story. If you need more, you can upgrade to the Premium plan for unlimited stories.",
  },
  {
    q: "Can I save my stories?",
    a: "Yes! Once a story is generated, click the \"Save\" button (you need to be signed in). Saved stories appear in your Library, which you can access anytime from the navigation bar.",
  },
  {
    q: "How do I listen to a story?",
    a: "After generating a story, click the \"Read\" button below it. The story will be read aloud using text-to-speech in the selected language. Click \"Stop\" to pause at any time.",
  },
  {
    q: "Can I download the story as a PDF?",
    a: "Yes. Click the \"PDF\" button below any generated story. Your browser will open a print-ready version of the story which you can save as a PDF or print directly.",
  },
  {
    q: "What languages are supported?",
    a: "Dadima currently supports Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi, and English. We are working on adding more languages.",
  },
  {
    q: "Why does my story sometimes feel similar to a previous one?",
    a: "Our stories are drawn from a library of over 680 story templates, personalized with your child's name and details. You can click \"New story\" to get a different one — we track the last 3 stories shown to you to avoid repetition.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Go to your Account page (click the user icon in the top right). Under \"Subscription\", you will find the option to cancel. Your subscription remains active until the end of the current billing period — you will not be charged again after that.",
  },
  {
    q: "I was charged but my plan did not upgrade. What do I do?",
    a: "Please email hello@dadima.app with your registered email and the date of the charge. We will investigate within 24 hours and resolve it immediately — this is almost always a sync issue we can fix instantly.",
  },
  {
    q: "Is Dadima safe for children?",
    a: "All stories are reviewed to ensure they are age-appropriate, culturally respectful, and positive in tone. We filter out any content that could be harmful. That said, the account is managed by a parent or guardian — children do not interact with Dadima directly.",
  },
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ background: "#FFFBF6", minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 32px" }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: "#7C5CFC", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>HELP CENTER</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#111827", letterSpacing: "-.03em", marginBottom: 8 }}>
          How can we help?
        </h1>
        <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 48 }}>
          Answers to the most common questions about Dadima.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 56 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 14,
              overflow: "hidden", transition: "border-color .2s",
              borderColor: open === i ? "#7C5CFC" : "#ECECEC",
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", padding: "18px 24px", background: "none", border: "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{faq.q}</span>
                <span style={{ fontSize: 18, color: "#7C5CFC", flexShrink: 0, marginLeft: 16, transform: open === i ? "rotate(45deg)" : "none", transition: "transform .2s" }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px", fontSize: 14, color: "#374151", lineHeight: 1.8 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 20, padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>💬</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Still have questions?</div>
          <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>We are happy to help. Write to us and we will respond within 24 hours.</div>
          <a href="/contact" style={{
            display: "inline-block", background: "#7C5CFC", color: "#fff",
            padding: "12px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700,
            textDecoration: "none", boxShadow: "0 4px 14px rgba(124,92,252,.3)",
          }}>
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
