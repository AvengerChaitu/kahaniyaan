"use client";

import { useEffect, useState, useMemo } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";

interface Story {
  id: number;
  title: string;
  body: string;
  language: string;
  theme: string;
  child_name: string;
  age: string;
  moral?: string;
  created_at: string;
}

const LANGUAGES = ["All", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "English"];
const THEMES    = ["All", "Panchatantra", "Birbal", "Tenali Raman", "Festival", "Moral Story"];

function shareOnWhatsApp(story: Story) {
  const text = `✨ ${story.title}\n\n${story.body.slice(0, 400)}…\n\n— Generated with Dadima 🪔 https://dadima.app`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

export default function LibraryPage() {
  const { isSignedIn } = useUser();
  const [stories,    setStories]    = useState<Story[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [selected,   setSelected]   = useState<Story | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search,     setSearch]     = useState("");
  const [langFilter, setLangFilter] = useState("All");
  const [themeFilter,setThemeFilter]= useState("All");

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/stories")
        .then(r => r.json())
        .then(data => { if (data.stories) setStories(data.stories); })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isSignedIn]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return stories.filter(s => {
      if (langFilter  !== "All" && s.language   !== langFilter)  return false;
      if (themeFilter !== "All" && s.theme       !== themeFilter) return false;
      if (q && !s.title.toLowerCase().includes(q) && !s.child_name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [stories, search, langFilter, themeFilter]);

  const handleDelete = async (e: React.MouseEvent, story: Story) => {
    e.stopPropagation();
    if (!confirm(`Delete "${story.title}"? This cannot be undone.`)) return;
    setDeletingId(story.id);
    const res = await fetch(`/api/stories/${story.id}`, { method: "DELETE" });
    if (res.ok) {
      setStories(prev => prev.filter(s => s.id !== story.id));
      if (selected?.id === story.id) setSelected(null);
    }
    setDeletingId(null);
  };

  if (!isSignedIn) {
    return (
      <div style={{ maxWidth: 500, margin: "80px auto 0", padding: "0 20px" }}>
        <div style={{ background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 20, padding: "48px 32px", textAlign: "center" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40, margin: "0 auto 12px", display: "block" }}><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
          <p style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 20 }}>Sign in to view your story library</p>
          <SignInButton mode="modal">
            <button style={{ background: "#7C5CFC", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(124,92,252,.3)" }}>Sign in</button>
          </SignInButton>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 120 }}>
        <span style={{ width: 28, height: 28, border: "3px solid #E0D9FF", borderTopColor: "#7C5CFC", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
      </div>
    );
  }

  /* ── Story reader ── */
  if (selected) {
    const readTime = Math.max(1, Math.ceil(selected.body.split(/\s+/).length / 150));
    return (
      <div style={{ maxWidth: 720, margin: "80px auto 0", padding: "40px 20px 80px" }}>
        <div style={{ background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 24, padding: "36px 40px" }}>
          <button onClick={() => setSelected(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#9CA3AF", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 24, padding: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to library
          </button>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            <span style={{ background: "#F5F3FF", color: "#7C5CFC", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999 }}>{selected.language}</span>
            <span style={{ background: "#F0FDF4", color: "#059669", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>{selected.theme}</span>
            <span style={{ background: "#F9FAFB", color: "#6B7280", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 999 }}>{selected.child_name} · {selected.age} yrs</span>
            <span style={{ background: "#F9FAFB", color: "#6B7280", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 999 }}>~{readTime} min read</span>
          </div>

          <h2 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, color: "#111827", letterSpacing: "-.02em", marginBottom: 20, lineHeight: 1.3 }}>
            <span style={{ color: "#7C5CFC" }}>{selected.child_name}</span>{" "}
            {selected.title.replace(selected.child_name, "").trim()}
          </h2>

          <div style={{ fontSize: 15, lineHeight: 1.9, color: "#374151", whiteSpace: "pre-line", marginBottom: 24 }}>
            {selected.body}
          </div>

          {selected.moral && (
            <div style={{ borderLeft: "4px solid #7C5CFC", background: "#F5F3FF", padding: "14px 18px", borderRadius: "0 12px 12px 0", marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#7C5CFC", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Moral</div>
              <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{selected.moral}</div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, paddingTop: 16, borderTop: "1px solid #F3F4F6" }}>
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>
              {new Date(selected.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => shareOnWhatsApp(selected)} style={{ background: "#DCFCE7", color: "#15803D", border: "1.5px solid #BBF7D0", padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                WhatsApp
              </button>
              <button onClick={() => window.print()} style={{ background: "#F5F3FF", color: "#7C5CFC", border: "1.5px solid #E0D9FF", padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                PDF
              </button>
              <button onClick={e => handleDelete(e, selected)} disabled={deletingId === selected.id} style={{ background: "#FEF2F2", color: "#EF4444", border: "1.5px solid #FECACA", padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {deletingId === selected.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Grid ── */
  return (
    <div style={{ maxWidth: 920, margin: "80px auto 0", padding: "40px 20px 80px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", letterSpacing: "-.02em" }}>Your stories</h1>
        <span style={{ background: "#F5F3FF", color: "#7C5CFC", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 999 }}>
          {filtered.length}{filtered.length !== stories.length ? ` / ${stories.length}` : ""} saved
        </span>
      </div>

      {/* Search + filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search by title or child's name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: "1 1 200px", border: "1.5px solid #ECECEC", borderRadius: 10, padding: "9px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff" }}
        />
        <select value={langFilter} onChange={e => setLangFilter(e.target.value)} style={{ border: "1.5px solid #ECECEC", borderRadius: 10, padding: "9px 14px", fontSize: 14, fontFamily: "inherit", background: "#fff", cursor: "pointer", outline: "none" }}>
          {LANGUAGES.map(l => <option key={l}>{l}</option>)}
        </select>
        <select value={themeFilter} onChange={e => setThemeFilter(e.target.value)} style={{ border: "1.5px solid #ECECEC", borderRadius: 10, padding: "9px 14px", fontSize: 14, fontFamily: "inherit", background: "#fff", cursor: "pointer", outline: "none" }}>
          {THEMES.map(t => <option key={t}>{t}</option>)}
        </select>
        {(search || langFilter !== "All" || themeFilter !== "All") && (
          <button onClick={() => { setSearch(""); setLangFilter("All"); setThemeFilter("All"); }} style={{ border: "1.5px solid #ECECEC", borderRadius: 10, padding: "9px 14px", fontSize: 13, fontWeight: 600, color: "#6B7280", background: "#fff", cursor: "pointer" }}>
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: "#fff", border: "2px dashed #ECECEC", borderRadius: 20, padding: "48px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 48, opacity: .25, marginBottom: 12 }}>📖</div>
          <p style={{ fontSize: 14, color: "#9CA3AF" }}>
            {stories.length === 0 ? "No stories saved yet. Generate one and save it here!" : "No stories match your search."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {filtered.map(s => (
            <div
              key={s.id}
              onClick={() => setSelected(s)}
              style={{ background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 18, padding: 20, cursor: "pointer", position: "relative", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C5CFC"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,92,252,.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#ECECEC"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              {/* WhatsApp share */}
              <button
                onClick={e => { e.stopPropagation(); shareOnWhatsApp(s); }}
                title="Share on WhatsApp"
                style={{ position: "absolute", top: 12, right: 44, width: 28, height: 28, borderRadius: 8, background: "#DCFCE7", border: "1px solid #BBF7D0", color: "#15803D", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                W
              </button>
              {/* Delete */}
              <button
                onClick={e => handleDelete(e, s)}
                disabled={deletingId === s.id}
                title="Delete story"
                style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: 8, background: "#FEF2F2", border: "1px solid #FECACA", color: "#EF4444", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: deletingId === s.id ? .5 : 1 }}
              >
                {deletingId === s.id ? "…" : "✕"}
              </button>

              <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 999, background: "#F5F3FF", color: "#7C5CFC", fontWeight: 700, display: "inline-block", marginBottom: 10 }}>
                {s.language} · {s.theme}
              </span>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 56 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {s.body}
              </p>
              <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 10 }}>
                {s.child_name} · {s.age} yrs · {new Date(s.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
