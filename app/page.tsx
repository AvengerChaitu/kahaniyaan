"use client";

import { useState } from "react";
import { useUser, Show, SignInButton } from "@clerk/nextjs";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

const LANGUAGES = ["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "English"];
const LANG_SCRIPTS = ["हिंदी", "తెలుగు", "தமிழ்", "ಕನ್ನಡ", "മലയാളം", "मराठी", "বাংলা", "ગુજરાતી", "ਪੰਜਾਬੀ", "English"];
const AGE_GROUPS = ["3–4 yrs", "5–6 yrs", "7–8 yrs", "9–10 yrs"];
const THEMES = ["Panchatantra", "Birbal", "Tenali Raman", "Festival", "Moral Story"];

const THEME_DATA: Record<string, { icon: string; color: string; desc: string; bg: string }> = {
  Panchatantra:  { icon:"🐘", color:"#2d6a4f", desc:"Ancient wisdom tales",   bg:"rgba(45,106,79,0.12)"  },
  Birbal:        { icon:"👑", color:"#9b2226", desc:"Witty court stories",     bg:"rgba(155,34,38,0.12)"  },
  "Tenali Raman":{ icon:"🎭", color:"#7b2d8b", desc:"South Indian wit",        bg:"rgba(123,45,139,0.12)" },
  Festival:      { icon:"🪔", color:"#e07c24", desc:"Cultural celebrations",   bg:"rgba(224,124,36,0.12)" },
  "Moral Story": { icon:"⭐", color:"#1b5299", desc:"Life lessons for kids",   bg:"rgba(27,82,153,0.12)"  },
};

const STARS = Array.from({length:50},(_,i)=>({
  id:i,
  left:`${Math.random()*100}%`,
  top:`${Math.random()*100}%`,
  size:`${Math.random()*3+1}px`,
  d:`${Math.random()*3+1.5}s`,
  delay:`${Math.random()*5}s`,
}));

const STATS = [
  { n:"10+",  label:"Languages" },
  { n:"100+", label:"Stories daily" },
  { n:"5",    label:"Themes" },
  { n:"Free", label:"To start" },
];

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
  const [showComing, setShowComing] = useState("");

  const tts = useSpeechSynthesis();

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

  function downloadPDF() {
    if (!story) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>${story.title} — Kahaniyaan</title>
          <style>
            body { font-family: 'Georgia', serif; max-width: 600px; margin: 60px auto; padding: 0 40px; color: #1a0a2e; line-height: 1.8; }
            .story-header { border-bottom: 2px solid #E8812A; padding-bottom: 16px; margin-bottom: 32px; }
            .story-tag { font-size: 11px; letter-spacing: 1.5px; color: #E8812A; font-weight: 600; margin-bottom: 10px; }
            .story-title { font-size: 28px; font-weight: 600; color: #1a0a2e; margin: 0; }
            .story-title span { color: #E8812A; }
            .read-time { font-size: 12px; color: #999; margin-top: 6px; }
            .story-body { font-size: 16px; line-height: 1.9; color: #2d1558; }
            .story-body b { color: #E8812A; font-weight: 600; }
            .moral { margin-top: 32px; padding: 16px 20px; background: #fff8f0; border-left: 4px solid #E8812A; font-style: italic; color: #7a5540; font-size: 14px; }
            .footer { margin-top: 48px; text-align: center; font-size: 11px; color: #ccc; border-top: 1px solid #eee; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="story-header">
            <div class="story-tag">✦ ${story.theme.toUpperCase()} · ${story.language.toUpperCase()}</div>
            <h1 class="story-title"><span>${story.childName}</span> ${story.title.replace(story.childName, '').trim()}</h1>
            <div class="read-time">~${readingTime} min read</div>
          </div>
          <div class="story-body">${story.body.replace(/\n/g, '<br/>')}</div>
          <div class="moral">🪔 <strong>Seekh:</strong> Always use your wit — the smartest answer wins.</div>
          <div class="footer">Generated with ❤️ on Kahaniyaan.vercel.app</div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  }

  const displayName = childName || "Arjun";
  const readingTime = story ? Math.max(1, Math.ceil(story.body.split(/\s+/).length / 200)) : 0;

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#fdf7f0", minHeight: "100vh" }}>

      {/* ══ HERO ══ */}
      <section style={{ background: "linear-gradient(160deg,#0d0a1e 0%,#18093a 55%,#0f0820 100%)", color: "#FFF8F0", padding: "100px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {STARS.map(s => (
          <div key={s.id} className="star" style={{ left: s.left, top: s.top, width: s.size, height: s.size, "--d": s.d, "--delay": s.delay } as React.CSSProperties} />
        ))}
        <div className="orb" style={{ position: "absolute", top: "-80px", left: "20%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(232,129,42,0.08) 0%,transparent 70%)", "--d": "9s", "--delay": "0s", pointerEvents: "none" } as React.CSSProperties} />
        <div className="orb" style={{ position: "absolute", bottom: "-60px", right: "15%", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle,rgba(100,40,200,0.1) 0%,transparent 70%)", "--d": "11s", "--delay": "3s", pointerEvents: "none" } as React.CSSProperties} />

        <div className="floater" style={{ position: "absolute", top: "50px", right: "8%", fontSize: "52px", "--d": "5s", "--delay": "0s", opacity: 0.55 } as React.CSSProperties}>🌙</div>
        <div className="floater" style={{ position: "absolute", top: "80px", left: "7%", fontSize: "36px", "--d": "6s", "--delay": "1.2s", opacity: 0.4 } as React.CSSProperties}>✨</div>
        <div className="floater" style={{ position: "absolute", bottom: "60px", left: "10%", fontSize: "30px", "--d": "4s", "--delay": "0.5s", opacity: 0.35 } as React.CSSProperties}>📖</div>
        <div className="floater" style={{ position: "absolute", bottom: "80px", right: "12%", fontSize: "28px", "--d": "7s", "--delay": "2s", opacity: 0.3 } as React.CSSProperties}>🌟</div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "720px", margin: "0 auto" }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(232,129,42,0.1)", border: "1px solid rgba(232,129,42,0.3)", color: "#f0a75b", fontSize: "11px", fontWeight: 700, padding: "7px 18px", borderRadius: "999px", marginBottom: "28px", letterSpacing: "2px" }}>
            ✦ 10 INDIAN LANGUAGES · AI-POWERED STORIES
          </div>

          <h1 className="fade-up" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px,7vw,72px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "24px" }}>
            <span style={{ display: "block", fontWeight: 400, color: "#e8deff", marginBottom: "6px" }}>Bedtime stories where</span>
            <span className="shimmer-text">your child is the hero</span>
          </h1>

          <p className="fade-up" style={{ color: "#9b86c2", maxWidth: "440px", margin: "0 auto 40px", lineHeight: 1.85, fontSize: "15px", fontWeight: 300 }}>
            Personalized Indian bedtime stories in your mother tongue — Panchatantra, Birbal & Tenali Raman style, with your child at the centre.
          </p>

          <div className="fade-up" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "56px" }}>
            <button className="glow-btn" onClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "#E8812A", color: "white", border: "none", borderRadius: "999px", padding: "16px 36px", fontSize: "16px", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.2px" }}>
              ✨ Create a free story
            </button>
            <button onClick={() => document.getElementById("themes")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "transparent", color: "#FFF8F0", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", padding: "16px 36px", fontSize: "15px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
              See how it works →
            </button>
          </div>

          <div className="fade-up" style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {LANG_SCRIPTS.map(s => (
              <span key={s} className="lang-pill" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#c0a8e0", padding: "6px 18px", borderRadius: "999px", fontSize: "13px", background: "rgba(255,255,255,0.05)", display: "inline-block" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "center", gap: "0", maxWidth: "640px", margin: "56px auto 0", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "36px", flexWrap: "wrap" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ flex: "1", minWidth: "100px", padding: "0 24px", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "#E8812A" }}>{s.n}</div>
              <div style={{ fontSize: "11px", color: "#6b5580", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ERROR / COMING SOON ══ */}
      {(error || showComing) && (
        <div style={{ maxWidth: "1120px", margin: "24px auto 0", padding: "0 24px" }}>
          {error && (
            <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: "14px", padding: "12px 16px", marginBottom: "12px", color: "#b91c1c", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠️</span>{error}
              <button onClick={() => setError("")} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: "18px", lineHeight: 1 }}>✕</button>
            </div>
          )}
          {showComing && (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "14px", padding: "12px 16px", marginBottom: "12px", color: "#166534", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🚀</span>{showComing}
              <button onClick={() => setShowComing("")} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#16a34a", fontSize: "18px", lineHeight: 1 }}>✕</button>
            </div>
          )}
        </div>
      )}

      {/* ══ GENERATOR ══ */}
      <section id="generator" style={{ padding: "88px 24px", maxWidth: "1120px", margin: "0 auto" }}>
        <p style={{ textAlign: "center", color: "#E8812A", fontSize: "11px", letterSpacing: "2.5px", fontWeight: 700, marginBottom: "10px" }}>✦ STORY GENERATOR</p>
        <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 600, color: "#150827", marginBottom: "52px", lineHeight: 1.25 }}>
          What&apos;s your child&apos;s name?
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "28px", alignItems: "start" }}>

          {/* ── FORM ── */}
          <div style={{ background: "white", borderRadius: "28px", padding: "36px", border: "1px solid #ede0d4", boxShadow: "0 8px 40px rgba(232,129,42,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingBottom: "22px", marginBottom: "28px", borderBottom: "1px solid #f5ece0" }}>
              <div style={{ width: "46px", height: "46px", background: "linear-gradient(135deg,#fff3e6,#ffe4c4)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>✏️</div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#150827" }}>About your child</div>
                <div style={{ fontSize: "12px", color: "#bbb", marginTop: "3px", fontWeight: 400 }}>                We&apos;ll make them the star of the story ✨</div>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 800, color: "#ccc", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>Child&apos;s Name</label>
              <input type="text" placeholder="Enter name..." value={childName} maxLength={20}
                onChange={e => setChildName(e.target.value)}
                style={{ width: "100%", padding: "13px 18px", border: "2px solid #ede0d4", borderRadius: "16px", fontSize: "16px", color: "#150827", background: "#fffaf6", fontFamily: "inherit", fontWeight: 600 }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 800, color: "#ccc", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>Age Group</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {AGE_GROUPS.map(a => (
                  <button key={a} className={`pill-btn${selectedAge === a ? " active" : ""}`} onClick={() => setSelectedAge(a)}
                    style={{ padding: "9px 20px", borderRadius: "999px", border: `2px solid ${selectedAge === a ? "#150827" : "#e8d5c4"}`, background: selectedAge === a ? "#150827" : "white", color: selectedAge === a ? "white" : "#8a6550", fontSize: "13px", fontWeight: 700, fontFamily: "inherit" }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 800, color: "#ccc", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>Language</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {LANGUAGES.map(l => (
                  <button key={l} className={`pill-btn${selectedLang === l ? " active" : ""}`} onClick={() => setSelectedLang(l)}
                    style={{ padding: "8px 16px", borderRadius: "999px", border: `2px solid ${selectedLang === l ? "#150827" : "#e8d5c4"}`, background: selectedLang === l ? "#150827" : "white", color: selectedLang === l ? "white" : "#8a6550", fontSize: "12px", fontWeight: 700, fontFamily: "inherit" }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 800, color: "#ccc", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>Theme</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {THEMES.map(t => (
                  <button key={t} className={`pill-btn${selectedTheme === t ? " active" : ""}`} onClick={() => setSelectedTheme(t)}
                    style={{ padding: "8px 16px", borderRadius: "999px", border: `2px solid ${selectedTheme === t ? "#E8812A" : "#e8d5c4"}`, background: selectedTheme === t ? "#E8812A" : "white", color: selectedTheme === t ? "white" : "#8a6550", fontSize: "12px", fontWeight: 700, fontFamily: "inherit" }}>
                    {THEME_DATA[t].icon} {t}
                  </button>
                ))}
              </div>
            </div>

            <button className="gen-btn" disabled={loading || !childName.trim()} onClick={generateStory}
              style={{ width: "100%", padding: "17px", background: loading || !childName.trim() ? "#d1c4e9" : "#150827", color: "white", border: "none", borderRadius: "18px", fontSize: "16px", fontWeight: 800, cursor: loading || !childName.trim() ? "not-allowed" : "pointer", fontFamily: "inherit", letterSpacing: "0.3px", boxShadow: "0 8px 24px rgba(21,8,39,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              {loading
                ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>🔮</span> Weaving magic...</>
                : <><span>✨</span> Generate {childName ? `${childName}&apos;s` : "your child&apos;s"} story</>
              }
            </button>
          </div>

          {/* ── STORY CARD ── */}
          <div style={{ background: "linear-gradient(140deg,#110926 0%,#1c0d3a 60%,#150827 100%)", borderRadius: "28px", padding: "36px", minHeight: "460px", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "250px", height: "250px", background: "radial-gradient(circle,rgba(232,129,42,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-40px", left: "-30px", width: "200px", height: "200px", background: "radial-gradient(circle,rgba(100,50,210,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />

            {!story && !loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "380px", gap: "20px", position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "64px", opacity: 0.18, lineHeight: 1 }}>📖</div>
                <div style={{ color: "#6b5580", fontSize: "14px", textAlign: "center", lineHeight: 1.8, fontWeight: 400 }}>
                  Fill in the details and click generate<br />to create your personalised story
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: "7px", height: "7px", background: "#E8812A", borderRadius: "50%", animation: "twinkle 1.4s ease-in-out infinite", animationDelay: `${i * 0.25}s`, opacity: 0.7 }} />
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "380px", gap: "24px", position: "relative", zIndex: 1 }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <div style={{ fontSize: "72px", animation: "float 2s ease-in-out infinite" }}>🔮</div>
                  <div style={{ position: "absolute", top: "-8px", right: "-8px", fontSize: "22px", animation: "spin 2s linear infinite" }}>✨</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#9b86c2", fontSize: "15px", fontWeight: 600, marginBottom: "6px" }}>Weaving your magic story...</div>
                  <div style={{ color: "#5a4470", fontSize: "12px", fontWeight: 400 }}>Creating {displayName}&apos;s adventure in {selectedLang}</div>
                </div>
              </div>
            )}

            {story && !loading && (
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <span style={{ background: "rgba(232,129,42,0.18)", border: "1px solid rgba(232,129,42,0.35)", color: "#f0a75b", fontSize: "10px", fontWeight: 800, padding: "4px 12px", borderRadius: "999px", letterSpacing: "1.2px" }}>
                      ✦ {story.theme.toUpperCase()}
                    </span>
                    <span style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#9b86c2", fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", letterSpacing: "1px" }}>
                      {story.language.toUpperCase()}
                    </span>
                  </div>
                  <span style={{ fontSize: "12px", color: "#6b5580", fontWeight: 500 }}>~{readingTime} min read</span>
                </div>

                <div className="story-line" style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#FFF8F0", marginBottom: "18px", lineHeight: 1.35 }}>
                  <span style={{ color: "#E8812A" }}>{story.childName}</span> {story.title.replace(story.childName, "").trim()}
                </div>

                <div className="story-line" style={{ fontSize: "14px", lineHeight: 1.9, color: "#c0a8e0", fontWeight: 300 }}
                  dangerouslySetInnerHTML={{ __html: story.body.replace(/\n/g, "<br/>").replace(/<strong>/g, '<strong style="color:#f0a75b;font-weight:700;">') || "" }}
                />

                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.07)", margin: "22px 0" }} />

                <div className="story-line" style={{ fontSize: "13px", color: "#8870a8", fontStyle: "italic", lineHeight: 1.6 }}>
                  <span style={{ color: "#f0a75b", fontStyle: "normal", fontWeight: 800 }}>🪔 Seekh: </span>
                  Always use your wit — the smartest answer wins.
                </div>

                <div style={{ display: "flex", gap: "8px", marginTop: "22px", flexWrap: "wrap" }}>
                  <Show when="signed-in" fallback={
                    <SignInButton mode="modal">
                      <button className="action-btn" style={{ flex: 1, minWidth: "72px", borderRadius: "14px", border: "1px solid rgba(232,129,42,0.2)", background: "rgba(232,129,42,0.05)", color: "#f0a75b", fontSize: "12px", padding: "11px 6px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                        🔖 Save
                      </button>
                    </SignInButton>
                  }>
                    <button className="action-btn" onClick={saveStory} disabled={saving || saved}
                      style={{ flex: 1, minWidth: "72px", borderRadius: "14px", border: "1px solid rgba(232,129,42,0.2)", background: "rgba(232,129,42,0.05)", color: "#f0a75b", fontSize: "12px", padding: "11px 6px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                      {saved ? "✅ Saved" : saving ? "⏳..." : "🔖 Save"}
                    </button>
                  </Show>
                  <button className="action-btn" onClick={downloadPDF}
                    style={{ flex: 1, minWidth: "72px", borderRadius: "14px", border: "1px solid rgba(232,129,42,0.2)", background: "rgba(232,129,42,0.05)", color: "#f0a75b", fontSize: "12px", padding: "11px 6px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                    ⬇️ PDF
                  </button>
                  <button className="action-btn" onClick={() => { if (tts.isSpeaking) tts.stop(); else tts.speak(story.body.replace(/<[^>]*>/g, ""), story.language); }}
                    style={{ flex: 1, minWidth: "72px", borderRadius: "14px", border: "1px solid rgba(232,129,42,0.2)", background: "rgba(232,129,42,0.05)", color: "#f0a75b", fontSize: "12px", padding: "11px 6px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                    {tts.isSpeaking ? "⏹ Stop" : "🔊 Read"}
                  </button>
                  <button className="action-btn" onClick={() => { tts.stop(); setStory(null); setError(""); }}
                    style={{ flex: 1, minWidth: "72px", borderRadius: "14px", border: "1px solid rgba(232,129,42,0.2)", background: "rgba(232,129,42,0.05)", color: "#f0a75b", fontSize: "12px", padding: "11px 6px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                    🔄 New
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section style={{ padding: "0 24px 88px", maxWidth: "1000px", margin: "0 auto" }}>
        <p style={{ textAlign: "center", color: "#E8812A", fontSize: "11px", letterSpacing: "2.5px", fontWeight: 700, marginBottom: "10px" }}>✦ HOW IT WORKS</p>
        <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 600, color: "#150827", marginBottom: "52px" }}>Three steps to bedtime magic</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "24px" }}>
          {[
            { n: "01", icon: "✏️", title: "Name your child", desc: "Type their name and pick their age — they'll be the hero." },
            { n: "02", icon: "🌐", title: "Choose language & theme", desc: "Pick from 10 languages and 5 timeless Indian themes." },
            { n: "03", icon: "📖", title: "Get a unique story", desc: "AI crafts a personalized tale in seconds, ready to read aloud." },
          ].map((s, i) => (
            <div key={i} style={{ background: "white", borderRadius: "24px", padding: "32px 28px", border: "1px solid #ede0d4", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "16px", right: "20px", fontFamily: "'Playfair Display', serif", fontSize: "48px", fontWeight: 700, color: "rgba(232,129,42,0.08)", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{s.icon}</div>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "#150827", marginBottom: "8px" }}>{s.title}</div>
              <div style={{ fontSize: "13px", color: "#9a8090", lineHeight: 1.7, fontWeight: 400 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ THEMES ══ */}
      <section id="themes" style={{ padding: "0 24px 88px", maxWidth: "1120px", margin: "0 auto" }}>
        <p style={{ textAlign: "center", color: "#E8812A", fontSize: "11px", letterSpacing: "2.5px", fontWeight: 700, marginBottom: "10px" }}>✦ STORY THEMES</p>
        <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 600, color: "#150827", marginBottom: "52px" }}>Rooted in Indian tradition</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "16px" }}>
          {THEMES.map(t => (
            <div key={t} className="theme-card"
              onClick={() => { setSelectedTheme(t); document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ background: selectedTheme === t ? THEME_DATA[t].bg : "white", borderRadius: "22px", padding: "32px 18px", textAlign: "center", border: `2px solid ${selectedTheme === t ? THEME_DATA[t].color : "#ede0d4"}`, boxShadow: selectedTheme === t ? `0 8px 28px ${THEME_DATA[t].bg}` : "none" }}>
              <div style={{ fontSize: "40px", marginBottom: "14px", lineHeight: 1 }}>{THEME_DATA[t].icon}</div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#150827", marginBottom: "5px" }}>{t}</div>
              <div style={{ fontSize: "11px", color: "#bbb", lineHeight: 1.5 }}>{THEME_DATA[t].desc}</div>
              {selectedTheme === t && <div style={{ fontSize: "10px", color: THEME_DATA[t].color, fontWeight: 800, marginTop: "10px", letterSpacing: "1px" }}>SELECTED ✓</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ background: "linear-gradient(160deg,#0d0a1e 0%,#1a0d38 100%)", padding: "88px 24px" }}>
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", color: "#f0a75b", fontSize: "11px", letterSpacing: "2.5px", fontWeight: 700, marginBottom: "10px" }}>✦ PRICING</p>
          <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 600, color: "#FFF8F0", marginBottom: "52px" }}>Simple, honest pricing</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "16px" }}>
            {[
              { tier: "FREE FOREVER", price: "₹0", sub: "/ month", features: ["3 stories per month", "All 10 languages", "All 5 themes", "Read on screen"], cta: "Start for free", primary: false, badge: "" },
              { tier: "MONTHLY", price: "₹99", sub: "/ month", features: ["Unlimited stories", "Save to library", "PDF download", "Cancel anytime"], cta: "Start for ₹99", primary: true, badge: "MOST POPULAR" },
              { tier: "STORYBOOK", price: "₹499", sub: "one-time", features: ["Print-ready PDF", "Illustrated book", "Gift-wrapped delivery", "Keep forever"], cta: "Order storybook", primary: false, badge: "" },
            ].map(p => (
              <div key={p.tier} style={{ background: p.primary ? "rgba(232,129,42,0.08)" : "rgba(255,255,255,0.04)", border: p.primary ? "1px solid rgba(232,129,42,0.5)" : "1px solid rgba(255,255,255,0.09)", borderRadius: "22px", padding: "32px", position: "relative" }}>
                {p.badge && <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", background: "#E8812A", color: "white", fontSize: "10px", fontWeight: 800, padding: "5px 16px", borderRadius: "999px", whiteSpace: "nowrap", letterSpacing: "1px" }}>{p.badge}</div>}
                <div style={{ fontSize: "10px", color: "#8870a8", letterSpacing: "2px", fontWeight: 800, marginBottom: "14px" }}>{p.tier}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "38px", color: "#FFF8F0", fontWeight: 400, marginBottom: "4px" }}>
                  {p.price} <span style={{ fontSize: "13px", color: "#7860a0", fontFamily: "'Nunito', sans-serif" }}>{p.sub}</span>
                </div>
                <div style={{ marginTop: "22px", display: "flex", flexDirection: "column", gap: "11px" }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#b09acc", fontWeight: 400 }}>
                      <span style={{ color: "#E8812A", fontWeight: 800 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <button onClick={() => p.primary ? setShowComing("Monthly plan — coming soon! 🚀") : p.tier === "STORYBOOK" ? setShowComing("Storybook printing — coming soon! 🚀") : document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ width: "100%", marginTop: "28px", padding: "13px", borderRadius: "16px", background: p.primary ? "#E8812A" : "transparent", border: p.primary ? "none" : "1px solid rgba(255,255,255,0.18)", color: p.primary ? "white" : "#c9b8d8", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#09061a", padding: "28px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#4a3a60", fontWeight: 700 }}>
          Kahani<span style={{ color: "#E8812A" }}>yaan</span>
        </span>
        <span style={{ fontSize: "12px", color: "#2e2040" }}>© 2026 Kahaniyaan · Made with ❤️ for Indian parents</span>
        <span style={{ fontSize: "12px", color: "#3a2a55" }}>
          Made by{" "}
          <span style={{ color: "#E8812A", fontWeight: 800, cursor: "pointer" }}>Chaitanya</span>
        </span>
      </footer>
    </div>
  );
}
