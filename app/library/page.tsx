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
  created_at: string;
}

export default function LibraryPage() {
  const { isSignedIn } = useUser();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/stories")
        .then((r) => r.json())
        .then((data) => {
          if (data.stories) setStories(data.stories);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <div className="p-4" style={{ maxWidth: "600px", margin: "80px auto 0" }}>
        <div style={{
          background: "white", border: "1px solid #ede0d4",
          borderRadius: "28px", padding: "3rem 2rem", textAlign: "center"
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "40px", height: "40px", color: "#bbb" }}><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            <p style={{ fontSize: "13px", color: "#8a8580" }}>Sign in to view your story library</p>
            <SignInButton mode="modal">
              <button style={{
                background: "var(--amber)", color: "var(--brown)", border: "none",
                padding: "10px 24px", borderRadius: "50px", fontSize: "13px",
                fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 2px 12px rgba(240,163,0,0.3)"
              }}>
                Sign in
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 flex justify-center pt-24">
        <span style={{
          width: "28px", height: "28px", border: "3px solid #f2ddb8",
          borderTopColor: "var(--amber)", borderRadius: "50%",
          animation: "spin 0.8s linear infinite", display: "inline-block"
        }} />
      </div>
    );
  }

  if (selectedStory) {
    return (
      <div className="p-4" style={{ maxWidth: "720px", margin: "80px auto 0" }}>
        <div style={{
          background: "linear-gradient(140deg,#110926 0%,#1c0d3a 60%,#150827 100%)",
          borderRadius: "28px", padding: "36px",
          border: "1px solid rgba(255,255,255,0.06)"
        }}>
          <button onClick={() => setSelectedStory(null)} style={{
            color: "#8870a8", fontSize: "12px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "4px",
            background: "none", border: "none", fontFamily: "inherit",
            marginBottom: "16px"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to library
          </button>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            <span style={{
              background: "rgba(240,163,0,0.18)", border: "1px solid rgba(240,163,0,0.35)",
              color: "#f0a75b", fontSize: "10px", fontWeight: 800,
              padding: "4px 12px", borderRadius: "999px"
            }}>
              {selectedStory.language}
            </span>
            <span style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#9b86c2", fontSize: "10px", fontWeight: 700,
              padding: "4px 10px", borderRadius: "999px"
            }}>
              {selectedStory.theme}
            </span>
            <span style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#6b5580", fontSize: "10px", fontWeight: 500,
              padding: "4px 10px", borderRadius: "999px"
            }}>
              {selectedStory.child_name} · {selectedStory.age} yrs
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "20px",
            fontWeight: 700, color: "var(--cream)", marginBottom: "16px"
          }}>
            <span style={{ color: "var(--amber)" }}>{selectedStory.child_name}</span>{" "}
            {selectedStory.title.replace(selectedStory.child_name, "").trim()}
          </h2>
          <div style={{
            fontSize: "14px", lineHeight: 1.9, color: "#c0a8e0",
            fontWeight: 300, whiteSpace: "pre-line"
          }}>
            {selectedStory.body}
          </div>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingTop: "16px", marginTop: "16px",
            borderTop: "1px solid rgba(255,255,255,0.07)"
          }}>
            <span style={{ fontSize: "11px", color: "#6b5580" }}>
              {new Date(selectedStory.created_at).toLocaleDateString()}
            </span>
            <button onClick={() => window.print()} style={{
              fontSize: "11px", padding: "8px 16px", borderRadius: "999px",
              border: "1px solid rgba(240,163,0,0.2)",
              background: "rgba(240,163,0,0.05)", color: "#f0a75b",
              cursor: "pointer", fontFamily: "inherit", fontWeight: 700,
              display: "flex", alignItems: "center", gap: "4px"
            }}>
              ⬇️ PDF
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4" style={{ maxWidth: "800px", margin: "80px auto 0", paddingBottom: "80px" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "20px"
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "24px",
          fontWeight: 600, color: "var(--brown)"
        }}>
          Your stories
        </h1>
        <span style={{
          background: "var(--parch)", color: "var(--brown3)", fontSize: "11px",
          fontWeight: 600, padding: "4px 14px", borderRadius: "999px"
        }}>
          {stories.length} saved
        </span>
      </div>

      {stories.length === 0 ? (
        <div style={{
          background: "white", border: "2px dashed #ede0d4",
          borderRadius: "28px", padding: "3rem 2rem", textAlign: "center"
        }}>
          <div style={{ fontSize: "48px", opacity: 0.2, marginBottom: "12px" }}>📖</div>
          <p style={{ fontSize: "13px", color: "#8a8580", fontStyle: "italic" }}>
            No stories saved yet. Generate a story and save it here!
          </p>
        </div>
      ) : (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: "12px"
        }}>
          {stories.map((s) => (
            <button key={s.id} onClick={() => setSelectedStory(s)} style={{
              background: "white", border: "1px solid #ede0d4",
              borderRadius: "22px", padding: "20px", textAlign: "left",
              cursor: "pointer", fontFamily: "inherit", width: "100%",
              transition: "all 0.2s", display: "block"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--amber)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#ede0d4"; e.currentTarget.style.transform = ""; }}>
              <span style={{
                fontSize: "10px", padding: "3px 10px", borderRadius: "999px",
                background: "rgba(240,163,0,0.1)", border: "1px solid rgba(240,163,0,0.25)",
                color: "var(--orange)", fontWeight: 700, display: "inline-block",
                marginBottom: "10px"
              }}>
                {s.language} · {s.theme}
              </span>
              <h3 style={{
                fontSize: "14px", fontWeight: 700, color: "var(--brown)",
                marginBottom: "6px", overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                {s.title}
              </h3>
              <p style={{
                fontSize: "12px", color: "#8a8580", lineHeight: 1.6,
                overflow: "hidden", textOverflow: "ellipsis",
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
              }}>
                {s.body}
              </p>
              <p style={{ fontSize: "11px", color: "#bbb", marginTop: "8px" }}>
                {s.child_name} · {s.age} yrs
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
