"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { getMoralLabel } from "@/lib/tts-terms";
import HeroSection from "@/components/HeroSection";
import FeelSection from "@/components/FeelSection";
import StoryForm from "@/components/StoryForm";
import StoryCard from "@/components/StoryCard";
import HowItWorks from "@/components/HowItWorks";
import ThemesGrid from "@/components/ThemesGrid";
import PricingCards from "@/components/PricingCards";
import Footer from "@/components/Footer";
import ErrorBanner from "@/components/ErrorBanner";

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

interface Story {
  title: string;
  body: string;
  ttsBody: string;
  language: string;
  theme: string;
  age: string;
  childName: string;
  moral?: string;
  moralLabel?: string;
  ttsUrl?: string;
}

export default function HomePage() {
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
  const [excludeIds, setExcludeIds] = useState<number[]>([]);

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
        body: JSON.stringify({ name: childName.trim(), age: ageValue, language: selectedLang, theme: selectedTheme, excludeIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate story");
      setStory({ title: data.title, body: data.body, ttsBody: data.ttsBody || data.body, language: selectedLang, theme: selectedTheme, age: ageValue, childName: childName.trim(), moral: data.moral, moralLabel: getMoralLabel(selectedLang), ttsUrl: data.ttsUrl || undefined });
      if (data.templateId) {
        setExcludeIds(prev => [data.templateId, ...prev].slice(0, 3));
      }
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
          moral: story.moral,
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
          <title>${story.title} — Dadima</title>
          <style>
            body { font-family: 'Georgia', serif; max-width: 600px; margin: 60px auto; padding: 0 40px; color: #3d2817; line-height: 1.8; }
            .story-header { border-bottom: 3px solid #c1440e; padding-bottom: 16px; margin-bottom: 32px; }
            .story-tag { font-size: 11px; letter-spacing: 1.5px; color: #c1440e; font-weight: 600; margin-bottom: 10px; }
            .story-title { font-size: 28px; font-weight: 600; color: #3d2817; margin: 0; }
            .story-title span { color: #c1440e; }
            .read-time { font-size: 12px; color: #8b7355; margin-top: 6px; }
            .story-body { font-size: 16px; line-height: 1.9; color: #3d2817; }
            .story-body b { color: #c1440e; font-weight: 600; }
            .moral { margin-top: 32px; padding: 16px 20px; background: #f5deb3; border-left: 4px solid #c1440e; font-style: italic; color: #5c3d2e; font-size: 14px; }
            .footer { margin-top: 48px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #ddd; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="story-header">
            <div class="story-tag">✦ ${story.theme.toUpperCase()} · ${story.language.toUpperCase()}</div>
            <h1 class="story-title"><span>${story.childName}</span> ${story.title.replace(story.childName, '').trim()}</h1>
            <div class="read-time">~${readingTime} min read</div>
          </div>
          <div class="story-body">${story.body.replace(/\n/g, '<br/>')}</div>
          ${story.moral ? `<div class="moral">🪔 <strong>${getMoralLabel(story.language)}:</strong> ${story.moral}</div>` : ''}
          <div class="footer">Generated with ❤️ on Dadima</div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  }

  const displayName = childName || "Arjun";
  const readingTime = story ? Math.max(1, Math.ceil(story.body.split(/\s+/).length / 150)) : 0;

  return (
    <div style={{
      fontFamily: "'Lora', serif",
      background: "linear-gradient(180deg, var(--night) 0%, var(--night2) 50%, var(--night) 100%)",
      minHeight: "100vh",
      color: "var(--text-dark)"
    }}>
      <HeroSection
        onExploreClick={() => document.getElementById("themes")?.scrollIntoView({ behavior: "smooth" })}
        onCreateClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}
      />

      <FeelSection />

      <ErrorBanner
        error={error}
        showComing={showComing}
        onCloseError={() => setError("")}
        onCloseComing={() => setShowComing("")}
      />

      <section id="generator" style={{ padding: "88px 24px", maxWidth: "1120px", margin: "0 auto" }}>
        <p style={{
          textAlign: "center", color: "var(--rust-light)", fontSize: "11px",
          letterSpacing: "2.5px", fontWeight: 700, marginBottom: "10px"
        }}>
          ✦ STORY GENERATOR
        </p>
        <h2 style={{
          textAlign: "center", fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 600,
          color: "var(--cream)", marginBottom: "52px", lineHeight: 1.25
        }}>
          What&apos;s your child&apos;s name?
        </h2>

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
              isLoading: tts.isLoading,
              stop: tts.stop,
              speak: (text, lang) => tts.speak(text, lang),
            }}
            onSave={saveStory}
            onPdf={downloadPDF}
            onNew={() => { tts.stop(); setStory(null); setError(""); }}
          />
        </div>
      </section>

      <HowItWorks />

      <ThemesGrid
        themes={THEMES}
        selectedTheme={selectedTheme}
        themeData={THEME_DATA}
        onSelect={(t) => { setSelectedTheme(t); document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" }); }}
      />

      <div className="paisley-divider" style={{
        textAlign: "center", padding: "1.2rem 0", fontSize: "1.1rem",
        color: "rgba(212,165,116,.5)", letterSpacing: "0.5rem"
      }}>
        — ✦ —
      </div>

      <PricingCards
        onStartFree={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}
        onShowComing={setShowComing}
      />

      <Footer />
    </div>
  );
}
