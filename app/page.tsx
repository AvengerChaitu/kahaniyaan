"use client";

import { useState } from "react";
import { useUser, Show, SignInButton } from "@clerk/nextjs";

const ages = ["3–4", "5–6", "7–8", "9–10"];
const languages = ["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "English"];
const themes = ["Panchatantra", "Birbal", "Tenali Raman", "Festival", "Custom"];

interface Story {
  title: string;
  body: string;
  language: string;
  theme: string;
  age: string;
  childName: string;
}

export default function CreatePage() {
  const { isSignedIn } = useUser();
  const [name, setName] = useState("Arjun");
  const [age, setAge] = useState("5–6");
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
      const res = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), age, language, theme }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate story");
      setStory({ title: data.title, body: data.body, language, theme, age, childName: name.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Check that the API key is set.");
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

  function ChipGroup<T extends string>({ items, value, onChange }: { items: readonly T[]; value: T; onChange: (v: T) => void }) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-all cursor-pointer ${
              value === item
                ? "bg-[#fdf3e3] border-[#e8c882] text-[#7a4f10] font-medium"
                : "bg-white border-[#ddd8ce] text-[#8a8580] hover:border-[#c17f2a] hover:text-[#1a1a1a]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>{error}</span>
          <button onClick={() => setError("")} className="ml-auto text-red-400 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white border border-[#e2ddd4] rounded-xl p-4 space-y-3">
          <p className="text-xs font-semibold text-[#8a8580] uppercase tracking-widest">Create Story</p>
          <div className="space-y-1.5">
            <label className="text-xs text-[#8a8580]">Child&apos;s name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arjun"
              className="w-full border border-[#ddd8ce] rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-[#c17f2a] transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#8a8580]">Age</label>
            <ChipGroup items={ages} value={age} onChange={setAge} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#8a8580]">Language</label>
            <ChipGroup items={languages} value={language} onChange={setLanguage} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#8a8580]">Theme</label>
            <ChipGroup items={themes} value={theme} onChange={setTheme} />
          </div>
          <button
            onClick={generateStory}
            disabled={loading || !name.trim()}
            className="w-full bg-[#c17f2a] text-white rounded-lg py-3 text-sm font-medium hover:bg-[#a66c22] disabled:opacity-60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <span className="loading loading-spinner loading-sm" /> : "✨ Generate story"}
          </button>
        </div>

        <div className="bg-white border border-[#e2ddd4] rounded-xl p-5 min-h-[400px] flex flex-col">
          {!story && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 text-[#bbb5aa]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 opacity-50"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 19.5z"/><path d="M8 2v20"/><path d="M12 6h4"/><path d="M12 10h4"/><path d="M12 14h4"/></svg>
              <p className="text-sm max-w-40">Fill in the details and tap generate to create your story</p>
            </div>
          )}
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <span className="loading loading-spinner loading-md text-[#c17f2a]" />
              <p className="text-sm text-[#8a8580]">Weaving your story...</p>
            </div>
          )}
          {story && (
            <div className="flex flex-col h-full">
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="px-2.5 py-1 text-xs rounded-full bg-[#fdf3e3] border border-[#e8c882] text-[#7a4f10]">{story.language}</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-[#fdf3e3] border border-[#e8c882] text-[#7a4f10]">{story.theme}</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-[#fdf3e3] border border-[#e8c882] text-[#7a4f10]">{story.age} yrs</span>
              </div>
              <h2 className="text-base font-medium text-[#1a1a1a] mb-2 leading-snug">{story.title}</h2>
              <div className="flex-1 text-sm text-[#5a5550] leading-relaxed overflow-y-auto whitespace-pre-line">
                {story.body}
              </div>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#e2ddd4]">
                <span className="text-xs text-[#bbb5aa]">✨ Generated just now</span>
                <div className="flex gap-2">
                  <Show when="signed-in" fallback={
                    <SignInButton mode="modal">
                      <button className="text-xs px-3 py-1.5 rounded-lg border border-[#ddd8ce] text-[#8a8580] hover:border-[#c17f2a] hover:text-[#1a1a1a] flex items-center gap-1 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M12 2l2 7h7l-5 4 2 7-6-4-6 4 2-7-5-4h7z"/></svg>
                        Save
                      </button>
                    </SignInButton>
                  }>
                    <button
                      onClick={saveStory}
                      disabled={saving || saved}
                      className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1 cursor-pointer disabled:opacity-50 ${
                        saved ? "bg-[#fdf3e3] border-[#e8c882] text-[#7a4f10]" : "border-[#ddd8ce] text-[#8a8580] hover:border-[#c17f2a] hover:text-[#1a1a1a]"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M12 2l2 7h7l-5 4 2 7-6-4-6 4 2-7-5-4h7z"/></svg>
                      {saved ? "Saved" : saving ? "Saving..." : "Save"}
                    </button>
                  </Show>
                  <button onClick={() => window.print()} className="text-xs px-3 py-1.5 rounded-lg border border-[#ddd8ce] text-[#8a8580] hover:border-[#c17f2a] hover:text-[#1a1a1a] flex items-center gap-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
