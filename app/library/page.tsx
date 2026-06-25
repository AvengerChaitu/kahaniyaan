"use client";

import { useEffect, useState } from "react";
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

export default function LibraryPage() {
  const { isSignedIn } = useUser();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const handleDelete = async (e: React.MouseEvent, story: Story) => {
    e.stopPropagation();
    if (!confirm(`Delete "${story.title}"? This cannot be undone.`)) return;
    setDeletingId(story.id);
    const res = await fetch(`/api/stories/${story.id}`, { method: "DELETE" });
    if (res.ok) {
      setStories(prev => prev.filter(s => s.id !== story.id));
      if (selectedStory?.id === story.id) setSelectedStory(null);
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
            <button style={{ background: "#7C5CFC", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(124,92,252,.3)" }}>
              Sign in
            </button>
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

  if (selectedStory) {
    return (
      <div style={{ maxWidth: 720, margin: "80px auto 0", padding: "40px 20px 80px" }}>
        <div style={{ background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 24, padding: "36px 40px" }}>
          <button
            onClick={() => setSelectedStory(null)}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#9CA3AF", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 24, padding: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to library
          </button>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            <span style={{ background: "#F5F3FF", color: "#7C5CFC", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999 }}>{selectedStory.language}</span>
            <span style={{ background: "#F0FDF4", color: "#059669", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>{selectedStory.theme}</span>
            <span style={{ background: "#F9FAFB", color: "#6B7280", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 999 }}>{selectedStory.child_name} · {selectedStory.age} yrs</span>
          </div>

          <h2 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, color: "#111827", letterSpacing: "-.02em", marginBottom: 20, lineHeight: 1.3 }}>
            <span style={{ color: "#7C5CFC" }}>{selectedStory.child_name}</span>{" "}
            {selectedStory.title.replace(selectedStory.child_name, "").trim()}
          </h2>

          <div style={{ fontSize: 15, lineHeight: 1.9, color: "#374151", whiteSpace: "pre-line", marginBottom: 24 }}>
            {selectedStory.body}
          </div>

          {selectedStory.moral && (
            <div style={{ borderLeft: "4px solid #7C5CFC", background: "#F5F3FF", padding: "14px 18px", borderRadius: "0 12px 12px 0", marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#7C5CFC", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Moral</div>
              <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{selectedStory.moral}</div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #F3F4F6" }}>
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>
              {new Date(selectedStory.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={e => handleDelete(e, selectedStory)}
                disabled={deletingId === selectedStory.id}
                style={{ background: "#FEF2F2", color: "#EF4444", border: "1.5px solid #FECACA", padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                {deletingId === selectedStory.id ? "Deleting…" : "Delete"}
              </button>
              <button
                onClick={() => window.print()}
                style={{ background: "#F5F3FF", color: "#7C5CFC", border: "1.5px solid #E0D9FF", padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 880, margin: "80px auto 0", padding: "40px 20px 80px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", letterSpacing: "-.02em" }}>Your stories</h1>
        <span style={{ background: "#F5F3FF", color: "#7C5CFC", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 999 }}>
          {stories.length} saved
        </span>
      </div>

      {stories.length === 0 ? (
        <div style={{ background: "#fff", border: "2px dashed #ECECEC", borderRadius: 20, padding: "48px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 48, opacity: .25, marginBottom: 12 }}>📖</div>
          <p style={{ fontSize: 14, color: "#9CA3AF" }}>No stories saved yet. Generate a story and save it here!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {stories.map(s => (
            <div
              key={s.id}
              onClick={() => setSelectedStory(s)}
              style={{ background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 18, padding: 20, cursor: "pointer", position: "relative", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C5CFC"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,92,252,.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#ECECEC"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              {/* Delete button */}
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
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 24 }}>
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
