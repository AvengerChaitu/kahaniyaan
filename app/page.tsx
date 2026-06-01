"use client";

import { useState } from "react";
import { useUser, Show, SignInButton } from "@clerk/nextjs";

const LANGUAGES = ["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "English"];
const LANG_SCRIPTS = ["हिंदी", "తెలుగు", "தமிழ்", "ಕನ್ನಡ", "മലയാളം", "मराठी", "বাংলা", "ગુજરાતી", "ਪੰਜਾਬੀ", "English"];
const AGE_GROUPS = ["3–4 yrs", "5–6 yrs", "7–8 yrs", "9–10 yrs"];
const THEMES = ["Panchatantra", "Birbal", "Tenali Raman", "Festival", "Moral Story"];
const THEME_ICONS: Record<string, string> = { Panchatantra: "🐘", Birbal: "👑", "Tenali Raman": "🎭", Festival: "🪔", "Moral Story": "⭐" };
const THEME_COUNTS: Record<string, string> = { Panchatantra: "12 stories", Birbal: "8 stories", "Tenali Raman": "8 stories", Festival: "6 stories", "Moral Story": "6 stories" };

interface Story {
  title: string;
  body: string;
  language: string;
  theme: string;
  age: string;
  childName: string;
}

export default function KahaniyanLanding() {
  const { isSignedIn } = useUser();
  const [childName, setChildName] = useState("Arjun");
  const [selectedAge, setSelectedAge] = useState("5–6 yrs");
  const [selectedLang, setSelectedLang] = useState("Hindi");
  const [selectedTheme, setSelectedTheme] = useState("Panchatantra");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [story, setStory] = useState<Story | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function generateStory() {
    if (!childName.trim()) return;
    setLoading(true);
    setStory(null);
    setSaved(false);
    setError("");

    try {
      const ageValue = selectedAge.replace(" yrs", "");
      const res = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: childName.trim(), age: ageValue, language: selectedLang, theme: selectedTheme }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate story");
      setStory({ title: data.title, body: data.body, language: selectedLang, theme: selectedTheme, age: ageValue, childName: childName.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function saveStory() {
    if (!story || !isSignedIn) return;
    setSaving(true);
    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: story.title,
          body: story.body,
          language: story.language,
          theme: story.theme,
          child_name: story.childName,
          age: story.age,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save story");
    } finally {
      setSaving(false);
    }
  }

  const displayName = childName || "Arjun";
  const readingTime = story ? Math.max(1, Math.ceil(story.body.split(/\s+/).length / 200)) : 0;

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: "#FFF8F0", minHeight: "100vh" }}>
      <style>{`
        html { scroll-behavior: smooth; }

        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(160deg, #150827 0%, #2a1250 55%, #1a0d38 100%);
          padding: 72px 3rem 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(232,129,42,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(232,129,42,0.12);
          border: 1px solid rgba(232,129,42,0.3);
          color: #f0a75b;
          font-size: 11px;
          font-weight: 500;
          padding: 5px 16px;
          border-radius: 20px;
          margin-bottom: 28px;
          letter-spacing: 1.5px;
          position: relative;
          z-index: 2;
        }
        .hero-title {
          font-size: 52px;
          font-weight: 300;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -1px;
          position: relative;
          z-index: 2;
        }
        .hero-title-line1 { color: #FFF8F0; display: block; }
        .hero-title-line2 { color: #E8812A; display: block; font-weight: 500; }
        .hero-sub {
          font-size: 16px;
          color: #b09acc;
          max-width: 440px;
          margin: 0 auto 40px;
          line-height: 1.7;
          font-weight: 300;
          position: relative;
          z-index: 2;
        }
        .hero-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 52px;
          position: relative;
          z-index: 2;
        }
        .btn-primary {
          background: #E8812A;
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 32px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          font-family: inherit;
          display: flex; align-items: center; gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 4px 24px rgba(232,129,42,0.35);
        }
        .btn-primary:hover { background: #d4721f; transform: translateY(-1px); box-shadow: 0 6px 28px rgba(232,129,42,0.45); }
        .btn-ghost {
          background: transparent;
          color: #FFF8F0;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 15px 30px;
          border-radius: 32px;
          font-size: 15px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.07); }
        .lang-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          position: relative;
          z-index: 2;
        }
        .lang-pill {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: #d4bfea;
          padding: 7px 18px;
          border-radius: 20px;
          font-size: 14px;
          letter-spacing: 0.3px;
          transition: all 0.2s;
          cursor: default;
        }
        .lang-pill:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }

        .generator-section {
          padding: 80px 3rem;
          max-width: 1160px;
          margin: 0 auto;
        }
        .section-eyebrow {
          text-align: center;
          font-size: 11px;
          letter-spacing: 2.5px;
          color: #E8812A;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .section-title {
          text-align: center;
          font-size: 32px;
          font-weight: 400;
          color: #150827;
          margin-bottom: 48px;
          letter-spacing: -0.5px;
        }
        .generator-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .generator-grid { grid-template-columns: 1fr; }
          .generator-section { padding: 60px 1.5rem; }
          .hero-title { font-size: 36px; }
          .hero { padding: 60px 1.5rem; }
          .pricing-section { padding: 60px 1.5rem; }
          .themes-section { padding: 0 1.5rem 60px; }
          .themes-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .footer { flex-direction: column; gap: 8px; padding: 24px 1.5rem; }
        }

        .form-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          border: 1px solid #ede0d4;
          box-shadow: 0 2px 20px rgba(21,8,39,0.06);
        }
        .form-card-header {
          display: flex; align-items: center; gap: 12px;
          padding-bottom: 20px;
          margin-bottom: 24px;
          border-bottom: 1px solid #f5ece0;
        }
        .form-header-icon {
          width: 38px; height: 38px;
          background: #fff3e6;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          font-size: 19px;
        }
        .form-header-title { font-size: 15px; font-weight: 500; color: #150827; }
        .form-header-sub { font-size: 12px; color: #aaa; margin-top: 1px; }

        .field { margin-bottom: 22px; }
        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: #bbb;
          letter-spacing: 1px;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .name-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #ede0d4;
          border-radius: 14px;
          font-size: 15px;
          font-family: inherit;
          color: #150827;
          background: #fffaf6;
          outline: none;
          transition: border-color 0.2s;
        }
        .name-input:focus { border-color: #E8812A; }

        .chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip {
          padding: 8px 18px;
          border-radius: 22px;
          border: 1.5px solid #e8d5c4;
          background: white;
          color: #8a6550;
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.15s;
          font-weight: 400;
        }
        .chip:hover { border-color: #E8812A; color: #E8812A; }
        .chip-age-active { background: #150827; border-color: #150827; color: white; }
        .chip-lang-active { background: #150827; border-color: #150827; color: white; }
        .chip-theme-active { background: #E8812A; border-color: #E8812A; color: white; }

        .generate-btn {
          width: 100%;
          padding: 16px;
          background: #150827;
          color: #FFF8F0;
          border: none;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-top: 4px;
          transition: all 0.2s;
          letter-spacing: 0.2px;
        }
        .generate-btn:hover { background: #2a1250; transform: translateY(-1px); }
        .generate-btn .spark { font-size: 18px; }

        .story-card {
          background: #150827;
          border-radius: 24px;
          padding: 32px;
          min-height: 420px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .story-card::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(232,129,42,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .story-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 360px;
          gap: 16px;
        }
        .story-empty-icon { font-size: 48px; opacity: 0.3; }
        .story-empty-text { color: #6b5580; font-size: 14px; text-align: center; line-height: 1.6; }

        .story-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 20px;
        }
        .story-tag {
          background: rgba(232,129,42,0.15);
          border: 1px solid rgba(232,129,42,0.3);
          color: #f0a75b;
          font-size: 10px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 20px;
          letter-spacing: 1px;
        }
        .story-read-time { font-size: 12px; color: #7860a0; }
        .story-title {
          font-size: 24px;
          font-weight: 500;
          color: #FFF8F0;
          margin-bottom: 18px;
          line-height: 1.3;
          letter-spacing: -0.3px;
        }
        .story-title .name-highlight { color: #E8812A; }
        .story-body {
          font-size: 14px;
          line-height: 1.85;
          color: #b09acc;
          font-weight: 300;
        }
        .story-body strong { color: #E8812A; font-weight: 500; }
        .story-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin: 20px 0;
        }
        .story-moral { font-size: 13px; color: #8870a8; font-style: italic; }
        .story-moral .moral-label { color: #f0a75b; font-style: normal; font-weight: 500; }
        .story-actions { display: flex; gap: 10px; margin-top: 20px; }
        .story-action {
          flex: 1;
          padding: 10px 8px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: #9880b8;
          font-size: 12px;
          font-family: inherit;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: all 0.15s;
        }
        .story-action:hover { background: rgba(255,255,255,0.08); color: #FFF8F0; }

        .themes-section {
          padding: 0 3rem 80px;
          max-width: 1160px;
          margin: 0 auto;
        }
        .themes-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-top: 48px;
        }
        @media (max-width: 600px) {
          .themes-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .theme-card {
          background: white;
          border-radius: 20px;
          padding: 24px 16px;
          text-align: center;
          border: 1px solid #ede0d4;
          cursor: pointer;
          transition: all 0.2s;
        }
        .theme-card:hover {
          border-color: #E8812A;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(232,129,42,0.12);
        }
        .theme-emoji { font-size: 32px; margin-bottom: 12px; }
        .theme-name { font-size: 13px; font-weight: 500; color: #150827; margin-bottom: 4px; }
        .theme-count { font-size: 11px; color: #bbb; }

        .pricing-section {
          background: #150827;
          padding: 80px 3rem;
        }
        .pricing-inner { max-width: 900px; margin: 0 auto; }
        .pricing-section .section-title { color: #FFF8F0; }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        .pricing-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 28px 24px;
        }
        .pricing-card.featured {
          border-color: rgba(232,129,42,0.5);
          background: rgba(232,129,42,0.07);
          position: relative;
        }
        .featured-badge {
          position: absolute;
          top: -12px; left: 50%;
          transform: translateX(-50%);
          background: #E8812A;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 14px;
          border-radius: 12px;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        .plan-name { font-size: 11px; color: #8870a8; letter-spacing: 1.5px; font-weight: 600; margin-bottom: 14px; }
        .plan-price { font-size: 36px; font-weight: 400; color: #FFF8F0; margin-bottom: 4px; letter-spacing: -1px; }
        .plan-price sub { font-size: 15px; color: #7860a0; font-weight: 300; vertical-align: middle; }
        .plan-features { margin-top: 20px; }
        .plan-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: #b09acc;
          margin-bottom: 10px; font-weight: 300;
        }
        .plan-feature-check { color: #E8812A; font-size: 16px; }
        .plan-btn {
          width: 100%;
          margin-top: 24px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          color: #c9b8d8;
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }
        .plan-btn:hover { background: rgba(255,255,255,0.08); color: white; }
        .plan-btn.featured-btn {
          background: #E8812A;
          border-color: #E8812A;
          color: white;
        }
        .plan-btn.featured-btn:hover { background: #d4721f; }

        .footer {
          background: #0e0520;
          padding: 32px 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-logo { font-size: 16px; font-weight: 500; color: #6b5580; }
        .footer-logo span { color: #E8812A; }
        .footer-text { font-size: 12px; color: #4a3a60; }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">✦ 10+ INDIAN LANGUAGES</div>
        <h1 className="hero-title">
          <span className="hero-title-line1">Bedtime stories where</span>
          <span className="hero-title-line2">your child is the hero</span>
        </h1>
        <p className="hero-sub">
          Personalized Indian bedtime stories rooted in Panchatantra, Birbal & Tenali Raman — in your mother tongue.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" })}>
            ✨ Create a free story
          </button>
          <button className="btn-ghost">See how it works</button>
        </div>
        <div className="lang-row">
          {LANG_SCRIPTS.map((script) => (
            <div className="lang-pill" key={script}>{script}</div>
          ))}
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div style={{ maxWidth: 1160, margin: "16px auto 0", padding: "0 3rem" }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#b91c1c", display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span>⚠️</span>
            <span style={{ flex: 1 }}>{error}</span>
            <button onClick={() => setError("")} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>✕</button>
          </div>
        </div>
      )}

      {/* STORY GENERATOR */}
      <section id="stories" className="generator-section">
        <div className="section-eyebrow">✦ STORY GENERATOR</div>
        <h2 className="section-title">Create your child's story</h2>
        <div className="generator-grid">
          {/* FORM */}
          <div className="form-card">
            <div className="form-card-header">
              <div className="form-header-icon">✏️</div>
              <div>
                <div className="form-header-title">Tell us about your child</div>
                <div className="form-header-sub">We'll make them the hero</div>
              </div>
            </div>

            <div className="field">
              <label className="field-label">Child's Name</label>
              <input
                className="name-input"
                type="text"
                placeholder="Enter name"
                value={childName}
                maxLength={20}
                onChange={(e) => setChildName(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label">Age Group</label>
              <div className="chips">
                {AGE_GROUPS.map((age) => (
                  <button
                    key={age}
                    className={`chip ${selectedAge === age ? "chip-age-active" : ""}`}
                    onClick={() => setSelectedAge(age)}
                  >{age}</button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="field-label">Language</label>
              <div className="chips">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    className={`chip ${selectedLang === lang ? "chip-lang-active" : ""}`}
                    onClick={() => setSelectedLang(lang)}
                  >{lang}</button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="field-label">Theme</label>
              <div className="chips">
                {THEMES.map((theme) => (
                  <button
                    key={theme}
                    className={`chip ${selectedTheme === theme ? "chip-theme-active" : ""}`}
                    onClick={() => setSelectedTheme(theme)}
                  >{theme}</button>
                ))}
              </div>
            </div>

            <button className="generate-btn" disabled={loading} onClick={generateStory}>
              <span className="spark">{loading ? "⏳" : "✨"}</span>
              {loading ? "Weaving your story..." : `Generate ${childName ? `${childName}'s` : "your child's"} story`}
            </button>
          </div>

          {/* STORY DISPLAY */}
          <div className="story-card">
            {!story && !loading && (
              <div className="story-empty">
                <div className="story-empty-icon">📖</div>
                <div className="story-empty-text">
                  Fill in the details and click generate<br />to create your personalised story
                </div>
              </div>
            )}
            {loading && (
              <div className="story-empty">
                <div className="story-empty-icon" style={{ opacity: 0.5 }}>⏳</div>
                <div className="story-empty-text" style={{ color: "#8870a8" }}>
                  Weaving your story...<br />One moment please
                </div>
              </div>
            )}
            {story && !loading && (
              <>
                <div className="story-top">
                  <div className="story-tag">✦ {story.theme.toUpperCase()} · {story.language.toUpperCase()}</div>
                  <div className="story-read-time">~{readingTime} min read</div>
                </div>
                <div className="story-title">
                  <span className="name-highlight">{story.childName}</span> {story.title.replace(story.childName, "").trim()}
                </div>
                <div className="story-body" dangerouslySetInnerHTML={{ __html: story.body.replace(/\n/g, "<br/>") }} />
                <hr className="story-divider" />
                <div className="story-moral">
                  <span className="moral-label">🪔 Seekh: </span>
                  Always use your wit — the smartest answer wins.
                </div>
                <div className="story-actions">
                  <Show when="signed-in" fallback={
                    <SignInButton mode="modal">
                      <button className="story-action">🔖 Save</button>
                    </SignInButton>
                  }>
                    <button className="story-action" onClick={saveStory} disabled={saving || saved}>
                      {saved ? "✅ Saved" : saving ? "⏳..." : "🔖 Save"}
                    </button>
                  </Show>
                  <button className="story-action" onClick={() => window.print()}>⬇️ PDF</button>
                  <button className="story-action" onClick={() => { setStory(null); setError(""); }}>🔄 New</button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* THEMES */}
      <section className="themes-section">
        <div className="section-eyebrow">✦ STORY THEMES</div>
        <h2 className="section-title">Rooted in Indian tradition</h2>
        <div className="themes-grid">
          {THEMES.map((theme) => (
            <div
              className="theme-card"
              key={theme}
              onClick={() => {
                setSelectedTheme(theme);
                document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="theme-emoji">{THEME_ICONS[theme]}</div>
              <div className="theme-name">{theme}</div>
              <div className="theme-count">{THEME_COUNTS[theme]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="pricing-section">
        <div className="pricing-inner">
          <div className="section-eyebrow" style={{ color: "#f0a75b" }}>✦ PRICING</div>
          <h2 className="section-title" style={{ color: "#FFF8F0" }}>Simple, honest pricing</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="plan-name">FREE FOREVER</div>
              <div className="plan-price">₹0 <sub>/ month</sub></div>
              <div className="plan-features">
                {["3 stories per month", "All languages", "All themes", "Read on screen"].map((f) => (
                  <div className="plan-feature" key={f}>
                    <span className="plan-feature-check">✓</span> {f}
                  </div>
                ))}
              </div>
              <button className="plan-btn">Get started free</button>
            </div>

            <div className="pricing-card featured">
              <div className="featured-badge">MOST POPULAR</div>
              <div className="plan-name">MONTHLY</div>
              <div className="plan-price">₹99 <sub>/ month</sub></div>
              <div className="plan-features">
                {["Unlimited stories", "Save to library", "PDF download", "Cancel anytime"].map((f) => (
                  <div className="plan-feature" key={f}>
                    <span className="plan-feature-check">✓</span> {f}
                  </div>
                ))}
              </div>
              <button className="plan-btn featured-btn">Start for ₹99</button>
            </div>

            <div className="pricing-card">
              <div className="plan-name">STORYBOOK</div>
              <div className="plan-price">₹499 <sub>one-time</sub></div>
              <div className="plan-features">
                {["Print-ready PDF", "Illustrated book", "Any story", "Gift it forever"].map((f) => (
                  <div className="plan-feature" key={f}>
                    <span className="plan-feature-check">✓</span> {f}
                  </div>
                ))}
              </div>
              <button className="plan-btn">Order storybook</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Kahani<span>yaan</span></div>
        <div className="footer-text">© 2026 Kahaniyaan · Made with ❤️ for Indian parents</div>
      </footer>
    </div>
  );
}
