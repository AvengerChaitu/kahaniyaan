"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { getMoralLabel } from "@/lib/tts-terms";
import HeroSection        from "@/components/HeroSection";
import AudioDemo          from "@/components/AudioDemo";
import LanguagesSection   from "@/components/LanguagesSection";
import StoryForm          from "@/components/StoryForm";
import StoryCard          from "@/components/StoryCard";
import ThemesGrid         from "@/components/ThemesGrid";
import HowItWorks         from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingCards       from "@/components/PricingCards";
import Footer             from "@/components/Footer";
import ErrorBanner        from "@/components/ErrorBanner";

const LANGUAGES   = ["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "English"];
const LANG_SCRIPTS= ["हिंदी", "తెలుగు", "தமிழ்", "ಕನ್ನಡ", "മലയാളം", "मराठी", "বাংলা", "ગુજરાતી", "ਪੰਜਾਬੀ", "English"];
const AGE_GROUPS  = ["3–4 yrs", "5–6 yrs", "7–8 yrs", "9–10 yrs"];
const THEMES      = ["Panchatantra", "Birbal", "Tenali Raman", "Festival", "Moral Story"];

const THEME_DATA: Record<string, { icon: string; color: string; desc: string; bg: string }> = {
  Panchatantra:   { icon: "🐘", color: "#2d6a4f", desc: "Ancient wisdom tales",   bg: "rgba(45,106,79,0.12)"   },
  Birbal:         { icon: "👑", color: "#9b2226", desc: "Witty court stories",     bg: "rgba(155,34,38,0.12)"   },
  "Tenali Raman": { icon: "🎭", color: "#7b2d8b", desc: "South Indian wit",        bg: "rgba(123,45,139,0.12)"  },
  Festival:       { icon: "🪔", color: "#e07c24", desc: "Cultural celebrations",   bg: "rgba(224,124,36,0.12)"  },
  "Moral Story":  { icon: "⭐", color: "#1b5299", desc: "Life lessons for kids",   bg: "rgba(27,82,153,0.12)"   },
};

interface Story {
  title: string; body: string; language: string; theme: string;
  age: string; childName: string; moral?: string; moralLabel?: string; ttsUrl?: string;
}

// localStorage helpers — persist which story IDs the user has already seen per combo
function seenKey(lang: string, theme: string) { return `dadima_seen_${lang}_${theme}`; }
function getSeenIds(lang: string, theme: string): number[] {
  try { return JSON.parse(localStorage.getItem(seenKey(lang, theme)) ?? "[]"); } catch { return []; }
}
function markSeen(lang: string, theme: string, id: number, cycled: boolean) {
  const ids = cycled ? [id] : [...new Set([...getSeenIds(lang, theme), id])];
  localStorage.setItem(seenKey(lang, theme), JSON.stringify(ids));
}

export default function HomePage() {
  const { isSignedIn } = useUser();
  const [childName,     setChildName]     = useState("Arjun");
  const [selectedAge,   setSelectedAge]   = useState("5–6 yrs");
  const [selectedLang,  setSelectedLang]  = useState("Hindi");
  const [selectedTheme, setSelectedTheme] = useState("Panchatantra");
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState("");
  const [story,         setStory]         = useState<Story | null>(null);
  const [saved,         setSaved]         = useState(false);
  const [saving,        setSaving]        = useState(false);
  const [showComing,    setShowComing]    = useState("");

  const tts = useSpeechSynthesis();

  async function generateStory() {
    if (!childName.trim()) return;
    setLoading(true); setStory(null); setSaved(false); setError("");
    try {
      const ageValue = selectedAge.replace(" yrs", "");
      const excludeIds = getSeenIds(selectedLang, selectedTheme);
      const res  = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: childName.trim(), age: ageValue, language: selectedLang, theme: selectedTheme, excludeIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate story");
      setStory({ title: data.title, body: data.body, language: selectedLang, theme: selectedTheme, age: ageValue, childName: childName.trim(), moral: data.moral, moralLabel: getMoralLabel(selectedLang), ttsUrl: data.ttsUrl || undefined });
      if (data.templateId) markSeen(selectedLang, selectedTheme, data.templateId, data.cycled ?? false);
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
      const res  = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: story.title, body: story.body, language: story.language, theme: story.theme, child_name: story.childName, age: story.age, moral: story.moral }),
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
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head>
        <title>${story.title} — Dadima</title>
        <style>
          body { font-family: Georgia, serif; max-width: 600px; margin: 60px auto; padding: 0 40px; color: #111827; line-height: 1.8; }
          .story-header { border-bottom: 3px solid #7C5CFC; padding-bottom: 16px; margin-bottom: 32px; }
          .story-tag { font-size: 11px; letter-spacing: 1.5px; color: #7C5CFC; font-weight: 600; margin-bottom: 10px; }
          .story-title { font-size: 28px; font-weight: 600; color: #111827; margin: 0; }
          .story-title span { color: #7C5CFC; }
          .read-time { font-size: 12px; color: #6B7280; margin-top: 6px; }
          .story-body { font-size: 16px; line-height: 1.9; color: #111827; }
          .moral { margin-top: 32px; padding: 16px 20px; background: #F5F3FF; border-left: 4px solid #7C5CFC; font-style: italic; color: #374151; font-size: 14px; }
          .footer { margin-top: 48px; text-align: center; font-size: 11px; color: #9CA3AF; border-top: 1px solid #ECECEC; padding-top: 16px; }
        </style>
      </head><body>
        <div class="story-header">
          <div class="story-tag">✦ ${story.theme.toUpperCase()} · ${story.language.toUpperCase()}</div>
          <h1 class="story-title"><span>${story.childName}</span> ${story.title.replace(story.childName, "").trim()}</h1>
          <div class="read-time">~${readingTime} min read</div>
        </div>
        <div class="story-body">${story.body.replace(/\n/g, "<br/>")}</div>
        ${story.moral ? `<div class="moral">🪔 <strong>${getMoralLabel(story.language)}:</strong> ${story.moral}</div>` : ""}
        <div class="footer">Generated with ❤️ on Dadima</div>
      </body></html>
    `);
    win.document.close();
    win.print();
  }

  const displayName = childName || "Arjun";
  const readingTime = story ? Math.max(1, Math.ceil(story.body.split(/\s+/).length / 150)) : 0;

  return (
    <div style={{ background: "#FFFBF6", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <HeroSection
        onCreateClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* ── Audio Demo ── */}
      <AudioDemo />

      {/* ── Languages ── */}
      <LanguagesSection />

      {/* ── Story Generator ── */}
      <section id="generator" style={{ background: "#F9FAFB", borderTop: "1.5px solid #ECECEC", borderBottom: "1.5px solid #ECECEC" }}>
        <div className="dm-generator">
          <h2 className="dm-generator-heading">Create a story</h2>
          <p className="dm-generator-sub">Personalized for your child — in seconds.</p>

          <ErrorBanner
            error={error}
            showComing={showComing}
            onCloseError={() => setError("")}
            onCloseComing={() => setShowComing("")}
          />

          <div className="generator-grid">
            <StoryForm
              childName={childName}
              selectedAge={selectedAge}
              selectedLang={selectedLang}
              selectedTheme={selectedTheme}
              loading={loading}
              ageGroups={AGE_GROUPS}
              languages={LANGUAGES}
              langScripts={LANG_SCRIPTS}
              themes={THEMES}
              themeData={THEME_DATA}
              onNameChange={setChildName}
              onAgeChange={setSelectedAge}
              onLangChange={setSelectedLang}
              onThemeChange={setSelectedTheme}
              onGenerate={generateStory}
            />
            <StoryCard
              story={story}
              loading={loading}
              displayName={displayName}
              readingTime={readingTime}
              saved={saved}
              saving={saving}
              tts={{
                isSpeaking: tts.isSpeaking,
                isLoading:  tts.isLoading,
                stop:       tts.stop,
                speak:      (text, lang) => tts.speak(text, lang),
              }}
              onSave={saveStory}
              onPdf={downloadPDF}
              onNew={() => { tts.stop(); setStory(null); setError(""); }}
            />
          </div>
        </div>
      </section>

      {/* ── Themes ── */}
      <div style={{ paddingTop: 80 }}>
        <ThemesGrid
          themes={THEMES}
          selectedTheme={selectedTheme}
          themeData={THEME_DATA}
          onSelect={(t) => {
            setSelectedTheme(t);
            document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>

      {/* ── How It Works ── */}
      <HowItWorks />

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── Pricing ── */}
      <PricingCards
        onStartFree={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
