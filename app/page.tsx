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
  const [story, setStory] = useState<Story | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function generateStory() {
    if (!name.trim()) return;
    setLoading(true);
    setStory(null);
    setSaved(false);

    try {
      const res = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), age, language, theme }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStory({ title: data.title, body: data.body, language, theme, age, childName: name.trim() });
    } catch (err) {
      console.error(err);
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
      if (data.error) throw new Error(data.error);
      setSaved(true);
    } catch (err) {
      console.error(err);
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
                ? "bg-amber-50 border-amber-300 text-amber-800 font-medium"
                : "bg-base-100 border-base-300 text-base-content/60 hover:border-amber-300 hover:text-base-content"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="card bg-base-100 border border-base-300 rounded-xl p-4 space-y-3">
          <p className="text-xs font-medium text-base-content/60 uppercase tracking-wider">Create story</p>
          <div className="space-y-1.5">
            <label className="text-xs text-base-content/60">Child's name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arjun"
              className="input input-bordered input-sm w-full text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-base-content/60">Age</label>
            <ChipGroup items={ages} value={age} onChange={setAge} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-base-content/60">Language</label>
            <ChipGroup items={languages} value={language} onChange={setLanguage} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-base-content/60">Theme</label>
            <ChipGroup items={themes} value={theme} onChange={setTheme} />
          </div>
          <button
            onClick={generateStory}
            disabled={loading || !name.trim()}
            className="btn bg-[#c17f2a] text-white hover:bg-[#a66c22] border-none w-full disabled:opacity-60"
          >
            {loading ? <span className="loading loading-spinner loading-sm" /> : "✨ Generate story"}
          </button>
        </div>

        <div className="card bg-base-100 border border-base-300 rounded-xl p-5 min-h-[400px] flex flex-col">
          {!story && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 text-base-content/40">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 opacity-50"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 19.5z"/><path d="M8 2v20"/><path d="M12 6h4"/><path d="M12 10h4"/><path d="M12 14h4"/></svg>
              <p className="text-sm max-w-40">Fill in the details and tap generate to create your story</p>
            </div>
          )}
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <span className="loading loading-spinner loading-md text-amber-600" />
              <p className="text-sm text-base-content/60">Weaving your story...</p>
            </div>
          )}
          {story && (
            <div className="flex flex-col h-full">
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="px-2.5 py-1 text-xs rounded-full bg-amber-50 border border-amber-300 text-amber-800">{story.language}</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-amber-50 border border-amber-300 text-amber-800">{story.theme}</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-amber-50 border border-amber-300 text-amber-800">{story.age} yrs</span>
              </div>
              <h2 className="text-base font-medium text-base-content mb-2 leading-snug">{story.title}</h2>
              <div className="flex-1 text-sm text-base-content/70 leading-relaxed overflow-y-auto whitespace-pre-line">
                {story.body}
              </div>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-base-300">
                <span className="text-xs text-base-content/40">✨ Generated just now</span>
                <div className="flex gap-2">
                  <Show when="signed-in" fallback={
                    <SignInButton mode="modal">
                      <button className="btn btn-ghost btn-xs gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M12 2l2 7h7l-5 4 2 7-6-4-6 4 2-7-5-4h7z"/></svg>
                        Save
                      </button>
                    </SignInButton>
                  }>
                    <button
                      onClick={saveStory}
                      disabled={saving || saved}
                      className={`btn btn-xs gap-1 ${saved ? "bg-amber-50 border-amber-300 text-amber-800" : "btn-ghost"}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M12 2l2 7h7l-5 4 2 7-6-4-6 4 2-7-5-4h7z"/></svg>
                      {saved ? "Saved" : saving ? "Saving..." : "Save"}
                    </button>
                  </Show>
                  <button className="btn btn-ghost btn-xs gap-1" onClick={() => window.print()}>
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
