"use client";

import { useState } from "react";
import { useUser, Show, SignInButton } from "@clerk/nextjs";

const ages = ["3–4 yrs", "5–6 yrs", "7–8 yrs", "9–10 yrs"];
const languages = ["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "English"];
const themes = ["Panchatantra", "Birbal", "Tenali Raman", "Festival", "Moral Story"];

interface Story {
  title: string;
  body: string;
  language: string;
  theme: string;
  age: string;
  childName: string;
}

function SparkleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M12 2l2 7h7l-5 4 2 7-6-4-6 4 2-7-5-4h7z"/></svg>
  );
}

function WandIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-[#E8812A]"><polyline points="20 6 9 17 4 12"/></svg>
  );
}

function BookmarkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  );
}

function RefreshIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
  );
}

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const [name, setName] = useState("Arjun");
  const [age, setAge] = useState("5–6 yrs");
  const [language, setLanguage] = useState("Hindi");
  const [theme, setTheme] = useState("Panchatantra");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [story, setStory] = useState<Story | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function generateStory() {
    if (!name.trim()) return;
    setLoading(true);
    setStory(null);
    setSaved(false);
    setError("");

    try {
      const ageValue = age.replace(" yrs", "");
      const res = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), age: ageValue, language, theme }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate story");
      setStory({ title: data.title, body: data.body, language, theme, age: ageValue, childName: name.trim() });
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

  function ChipGroup<T extends string>({ items, value, onChange, variant }: { items: readonly T[]; value: T; onChange: (v: T) => void; variant?: "theme" }) {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`px-4 py-1.5 rounded-full text-sm cursor-pointer transition-all ${
              value === item
                ? variant === "theme"
                  ? "bg-[#E8812A] text-white border border-[#E8812A]"
                  : "bg-[#1a0a2e] text-white border border-[#1a0a2e]"
                : "bg-white text-[#7a5540] border border-[#e8d5c4] hover:border-[#E8812A]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    );
  }

  const readingTime = story ? Math.max(1, Math.ceil(story.body.split(/\s+/).length / 200)) : 0;

  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient(160deg, #1a0a2e 0%, #2d1558 60%, #1a0a2e 100%) px-4 md:px-8 py-16 md:py-20 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[rgba(232,129,42,0.2)] border border-[rgba(232,129,42,0.4)] text-[#f0a75b] text-xs px-3.5 py-1 rounded-full mb-5 tracking-wider">
            ✦ 10+ INDIAN LANGUAGES
          </div>
          <h1 className="text-[2.5rem] md:text-[42px] font-medium text-[#FFF8F0] leading-tight mb-4">
            Bedtime stories where<br />
            <span className="text-[#E8812A]">your child is the hero</span>
          </h1>
          <p className="text-base text-[#c9b8d8] max-w-[480px] mx-auto mb-8 leading-relaxed">
            Personalized Indian bedtime stories rooted in Panchatantra, Birbal &amp; Tenali Raman — in your mother tongue.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#generator" className="inline-flex items-center gap-2 bg-[#E8812A] text-white border-none px-7 py-3.5 rounded-full text-sm cursor-pointer font-medium no-underline hover:bg-[#d07222] transition-colors">
              <WandIcon /> Create a free story
            </a>
            <a href="#how-it-works" className="inline-flex items-center gap-2 bg-transparent text-[#FFF8F0] border border-[rgba(255,248,240,0.3)] px-7 py-3.5 rounded-full text-sm cursor-pointer no-underline hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              See how it works
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {["हिंदी", "తెలుగు", "தமிழ்", "ಕನ್ನಡ", "മലയാളം", "मराठी", "বাংলা", "ગુજરાતી", "ਪੰਜਾਬੀ", "English"].map((l) => (
              <span key={l} className="px-3.5 py-1.5 text-sm bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-[#e8d5ff] rounded-full">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Error banner */}
      {error && (
        <div className="max-w-3xl mx-auto px-4 pt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-start gap-2">
            <span className="shrink-0 mt-0.5">⚠️</span>
            <span className="flex-1">{error}</span>
            <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 cursor-pointer bg-transparent border-none shrink-0">✕</button>
          </div>
        </div>
      )}

      {/* Generator */}
      <section id="generator" className="max-w-[1100px] mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[2px] text-[#E8812A] mb-2">✦ STORY GENERATOR</div>
          <h2 className="text-2xl md:text-[28px] font-medium text-[#1a0a2e]">Create your child&apos;s story</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Form */}
          <div className="bg-white rounded-[20px] p-7 border border-[#f0e0d0]">
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#f5ece0]">
              <div className="w-9 h-9 bg-[#fff0e0] rounded-[10px] flex items-center justify-center text-[#E8812A] text-lg">
                ✏️
              </div>
              <span className="text-base font-medium text-[#1a0a2e]">Tell us about your child</span>
            </div>

            <div className="mb-5">
              <label className="block text-[11px] font-semibold text-[#888] tracking-[0.5px] mb-2">CHILD&apos;S NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#ede0d4] rounded-xl text-sm text-[#1a0a2e] bg-[#fffaf6] outline-none focus:border-[#E8812A] transition-colors"
              />
            </div>

            <div className="mb-5">
              <label className="block text-[11px] font-semibold text-[#888] tracking-[0.5px] mb-2">AGE GROUP</label>
              <ChipGroup items={ages} value={age} onChange={setAge} />
            </div>

            <div className="mb-5">
              <label className="block text-[11px] font-semibold text-[#888] tracking-[0.5px] mb-2">LANGUAGE</label>
              <ChipGroup items={languages} value={language} onChange={setLanguage} />
            </div>

            <div className="mb-5">
              <label className="block text-[11px] font-semibold text-[#888] tracking-[0.5px] mb-2">THEME</label>
              <ChipGroup items={themes as readonly string[]} value={theme} onChange={setTheme} variant="theme" />
            </div>

            <button
              onClick={generateStory}
              disabled={loading || !name.trim()}
              className="w-full py-4 bg-[#1a0a2e] text-[#FFF8F0] border-none rounded-xl text-base cursor-pointer flex items-center justify-center gap-2.5 mt-1 disabled:opacity-50 hover:bg-[#2d1558] transition-colors"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <SparkleIcon />
              )}
              {loading ? "Weaving your story..." : `Generate ${name.trim()}'s story`}
            </button>
          </div>

          {/* Story Card */}
          <div className="bg-[#1a0a2e] rounded-[20px] p-7 min-h-[400px] relative overflow-hidden">
            {!story && !loading && (
              <div className="flex flex-col items-center justify-center h-full min-h-[360px] text-center gap-3">
                <div className="text-4xl">📖</div>
                <p className="text-sm text-[#9980bb] max-w-56">Fill in the details and tap generate to create your story</p>
              </div>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center h-full min-h-[360px] gap-4">
                <span className="loading loading-spinner loading-lg text-[#E8812A]" />
                <p className="text-sm text-[#c9b8d8]">Weaving your story...</p>
              </div>
            )}
            {story && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center px-3 py-1 text-[11px] bg-[rgba(232,129,42,0.2)] border border-[rgba(232,129,42,0.4)] text-[#f0a75b] rounded-full tracking-[0.5px]">
                    ✦ {story.theme.toUpperCase()} · {story.language.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#9980bb]">~{readingTime} min read</span>
                </div>
                <h3 className="text-xl md:text-[22px] font-medium text-[#FFF8F0] mb-4 leading-snug">
                  <span className="text-[#E8812A]">{story.childName}</span> {story.title.replace(story.childName, "").trim()}
                </h3>
                <div className="text-sm leading-relaxed text-[#c9b8d8] whitespace-pre-line">
                  {story.body}
                </div>
                <hr className="border-none border-t border-[rgba(255,255,255,0.1)] my-5" />
                <p className="text-xs text-[#9980bb] italic">
                  <span className="text-[#f0a75b] not-italic font-medium">🪔 Seekh:</span> Always use your wit — the smartest answer wins.
                </p>
                <div className="flex gap-2.5 mt-5">
                  <Show when="signed-in" fallback={
                    <SignInButton mode="modal">
                      <button className="flex-1 py-2.5 rounded-[10px] border border-[rgba(255,255,255,0.15)] bg-transparent text-[#c9b8d8] text-xs cursor-pointer flex items-center justify-center gap-1.5 hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                        <BookmarkIcon /> Save
                      </button>
                    </SignInButton>
                  }>
                    <button
                      onClick={saveStory}
                      disabled={saving || saved}
                      className={`flex-1 py-2.5 rounded-[10px] border text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 ${
                        saved
                          ? "bg-[rgba(232,129,42,0.2)] border-[rgba(232,129,42,0.4)] text-[#f0a75b]"
                          : "border-[rgba(255,255,255,0.15)] bg-transparent text-[#c9b8d8] hover:bg-[rgba(255,255,255,0.05)]"
                      }`}
                    >
                      <BookmarkIcon /> {saved ? "Saved" : saving ? "Saving..." : "Save"}
                    </button>
                  </Show>
                  <button className="flex-1 py-2.5 rounded-[10px] border border-[rgba(255,255,255,0.15)] bg-transparent text-[#c9b8d8] text-xs cursor-pointer flex items-center justify-center gap-1.5 hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <DownloadIcon /> PDF
                  </button>
                  <button onClick={() => { setStory(null); setError(""); }} className="flex-1 py-2.5 rounded-[10px] border border-[rgba(255,255,255,0.15)] bg-transparent text-[#c9b8d8] text-xs cursor-pointer flex items-center justify-center gap-1.5 hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <RefreshIcon /> New
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Themes */}
      <section id="themes" className="max-w-[1100px] mx-auto px-4 md:px-8 pb-16 md:pb-20">
        <div className="text-center mb-8">
          <div className="text-xs tracking-[2px] text-[#E8812A] mb-2">✦ STORY THEMES</div>
          <h2 className="text-2xl md:text-[28px] font-medium text-[#1a0a2e]">Rooted in Indian tradition</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { emoji: "🐘", name: "Panchatantra", count: "12 stories" },
            { emoji: "👑", name: "Birbal", count: "8 stories" },
            { emoji: "🎭", name: "Tenali Raman", count: "8 stories" },
            { emoji: "🪔", name: "Festivals", count: "6 stories" },
            { emoji: "⭐", name: "Moral Stories", count: "6 stories" },
          ].map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-5 text-center border border-[#f0e0d0] cursor-pointer hover:shadow-sm transition-shadow">
              <div className="text-[28px] mb-2.5">{t.emoji}</div>
              <div className="text-sm font-medium text-[#1a0a2e] mb-1">{t.name}</div>
              <div className="text-[11px] text-[#aaa]">{t.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-[#1a0a2e] px-4 md:px-8 py-16 md:py-20 text-center">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-xs tracking-[2px] text-[#f0a75b] mb-2">✦ PRICING</div>
          <h2 className="text-2xl md:text-[28px] font-medium text-[#FFF8F0] mb-10">Simple, honest pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[800px] mx-auto">
            {[
              { plan: "FREE FOREVER", price: "₹0", period: "/ month", featured: false, features: ["3 stories/month", "All languages", "All themes"] },
              { plan: "MONTHLY", price: "₹99", period: "/ month", featured: true, features: ["Unlimited stories", "Save to library", "PDF download"] },
              { plan: "STORYBOOK", price: "₹499", period: "one-time", featured: false, features: ["Print-ready PDF", "Illustrated book", "Any story"] },
            ].map((p) => (
              <div
                key={p.plan}
                className={`rounded-2xl p-6 text-left ${
                  p.featured
                    ? "bg-[rgba(232,129,42,0.1)] border border-[#E8812A]"
                    : "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)]"
                }`}
              >
                <div className="text-[11px] text-[#9980bb] tracking-[1px] mb-3">{p.plan}</div>
                <div className="text-[28px] font-medium text-[#FFF8F0] mb-1">
                  {p.price} <span className="text-sm text-[#9980bb] font-normal">{p.period}</span>
                </div>
                <div className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-[#c9b8d8]">
                      <CheckIcon /> {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
