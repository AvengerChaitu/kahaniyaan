"use client";
import { useState } from "react";

const LANGUAGES = ["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "English"];
const LANG_SCRIPTS = ["हिंदी", "తెలుగు", "தமிழ்", "ಕನ್ನಡ", "മലയാളം", "मराठी", "বাংলা", "ગુજરાતી", "ਪੰਜਾਬੀ", "English"];
const AGE_GROUPS = ["3–4 yrs", "5–6 yrs", "7–8 yrs", "9–10 yrs"];
const THEMES = ["Panchatantra", "Birbal", "Tenali Raman", "Festival", "Moral Story"];
const THEME_ICONS = { Panchatantra: "🐘", Birbal: "👑", "Tenali Raman": "🎭", Festival: "🪔", "Moral Story": "⭐" };
const THEME_COUNTS = { Panchatantra: "12 stories", Birbal: "8 stories", "Tenali Raman": "8 stories", Festival: "6 stories", "Moral Story": "6 stories" };

const SAMPLE_STORY = {
  title: (name) => `${name} aur Chalak Bandar`,
  tag: "PANCHATANTRA · HINDI",
  readTime: "~4 min read",
  body: (name) => `Ek sundar jungle mein, <b>${name}</b> naam ka ek sahasī bachcha rehta tha. Ek din, <b>${name}</b> jungle mein khelte-khelte ek ajeeb ped ke paas pahuncha jahan ek chalak bandar baitha tha.
<br/><br/>
Bandar ne kaha, "Arre <b>${name}</b>! Kya tum mujhse tez ho? Main tumhe ek paheli bataata hoon." <b>${name}</b> muskuraya aur bola, "Zaroor, batao!"
<br/><br/>
Bandar ne kaha, "Wo kaun si cheez hai jo sabke paas hoti hai, par koi usse dekh nahin sakta?" <b>${name}</b> ne thoda socha... aur phir bol utha — "Apni awaaz!"`,
  moral: "Dimag ka istemal karo, mushkil se mushkil sawaal ka jawab mil jaata hai.",
};

export default function KahaniyanLanding() {
  const [childName, setChildName] = useState("Arjun");
  const [selectedAge, setSelectedAge] = useState("5–6 yrs");
  const [selectedLang, setSelectedLang] = useState("Hindi");
  const [selectedTheme, setSelectedTheme] = useState("Panchatantra");
  const [showStory, setShowStory] = useState(false);
  const [storyName, setStoryName] = useState("Arjun");

  const handleGenerate = () => {
    setStoryName(childName || "Arjun");
    setShowStory(true);
  };

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: "#FFF8F0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=Tiro+Devanagari+Hindi&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .navbar {
          background: #150827;
          padding: 0 3rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo-box {
          width: 34px; height: 34px;
          background: #E8812A;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
        }
        .logo-wordmark { font-size: 19px; font-weight: 500; color: #FFF8F0; letter-spacing: 0.3px; }
        .logo-wordmark span { color: #E8812A; }
        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-link { color: #a890c4; font-size: 14px; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #FFF8F0; }
        .nav-signin {
          background: transparent;
          color: #FFF8F0;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 20px;
          border-radius: 22px;
          font-size: 14px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .nav-signin:hover { background: rgba(255,255,255,0.08); }

        .hero {
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
        }
        .hero-title {
          font-size: 52px;
          font-weight: 300;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -1px;
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
        }
        .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 52px; }
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
          .themes-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 36px; }
          .navbar { padding: 0 1.5rem; }
          .generator-section { padding: 60px 1.5rem; }
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

      {/* NAVBAR */}
      <nav className="navbar">
        <a className="logo" href="#">
          <div className="logo-box">📖</div>
          <div className="logo-wordmark">Kahani<span>yaan</span></div>
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#stories">Stories</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <a className="nav-link" href="#">Library</a>
          <button className="nav-signin">Sign in</button>
        </div>
      </nav>

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

            <button className="generate-btn" onClick={handleGenerate}>
              <span className="spark">✨</span>
              Generate {childName ? `${childName}'s` : "your child's"} story
            </button>
          </div>

          {/* STORY DISPLAY */}
          <div className="story-card">
            {!showStory ? (
              <div className="story-empty">
                <div className="story-empty-icon">📖</div>
                <div className="story-empty-text">
                  Fill in the details and click generate<br />to create your personalised story
                </div>
              </div>
            ) : (
              <>
                <div className="story-top">
                  <div className="story-tag">{SAMPLE_STORY.tag}</div>
                  <div className="story-read-time">{SAMPLE_STORY.readTime}</div>
                </div>
                <div className="story-title">
                  <span className="name-highlight">{storyName}</span> aur Chalak Bandar
                </div>
                <div
                  className="story-body"
                  dangerouslySetInnerHTML={{ __html: SAMPLE_STORY.body(storyName) }}
                />
                <hr className="story-divider" />
                <div className="story-moral">
                  <span className="moral-label">🪔 Seekh: </span>
                  {SAMPLE_STORY.moral}
                </div>
                <div className="story-actions">
                  <button className="story-action">🔖 Save</button>
                  <button className="story-action">⬇️ PDF</button>
                  <button className="story-action" onClick={() => setShowStory(false)}>🔄 New</button>
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
          <h2 className="section-title">Simple, honest pricing</h2>
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
