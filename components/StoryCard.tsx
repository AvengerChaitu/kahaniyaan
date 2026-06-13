"use client";

import { useState, useRef, useEffect } from "react";
import { Show, SignInButton } from "@clerk/nextjs";

interface Story {
  title: string;
  body: string;
  language: string;
  theme: string;
  age: string;
  childName: string;
  moral?: string;
  moralLabel?: string;
  ttsUrl?: string;
}

interface TTSState {
  isSpeaking: boolean;
  isLoading: boolean;
  stop: () => void;
  speak: (text: string, lang: string) => void;
}

interface Props {
  story: Story | null;
  loading: boolean;
  displayName: string;
  readingTime: number;
  saved: boolean;
  saving: boolean;
  tts: TTSState;
  onSave: () => void;
  onPdf: () => void;
  onNew: () => void;
}

export default function StoryCard({ story, loading, displayName, readingTime, saved, saving, tts, onSave, onPdf, onNew }: Props) {
  const [directPlaying, setDirectPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function fallbackSpeak() {
    tts.speak(
      (story?.body || "").replace(/<[^>]*>/g, ""),
      story?.language || "Hindi"
    );
  }

  function playDirect(url: string) {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => setDirectPlaying(false);
    audio.onerror = () => { setDirectPlaying(false); fallbackSpeak(); };
    audio.play().then(() => setDirectPlaying(true)).catch(() => { setDirectPlaying(false); fallbackSpeak(); });
  }

  function stopDirect() {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; audioRef.current = null; }
    setDirectPlaying(false);
  }

  useEffect(() => { return () => { stopDirect(); }; }, []);

  function handleRead() {
    if (directPlaying) { stopDirect(); return; }
    if (tts.isSpeaking) { tts.stop(); return; }
    if (story?.ttsUrl) { playDirect(story.ttsUrl); return; }
    fallbackSpeak();
  }
  if (!story) {
    return (
    <div className="story-card-glow" style={{
      background: "linear-gradient(140deg, rgba(245,222,179,0.08) 0%, rgba(212,165,116,0.06) 60%, rgba(245,222,179,0.04) 100%)",
      borderRadius: "28px", padding: "36px", minHeight: "460px",
      position: "relative", overflow: "hidden",
      border: "2px solid rgba(212,165,116,0.25)",
      boxShadow: "inset 0 0 30px rgba(0,0,0,0.2), 0 8px 24px rgba(193,68,14,0.15)"
    }}>
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "250px", height: "250px",
        background: "radial-gradient(circle,rgba(193,68,14,0.1) 0%,transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "-40px", left: "-30px",
        width: "200px", height: "200px",
        background: "radial-gradient(circle,rgba(212,165,116,0.08) 0%,transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", height: "380px", gap: "20px",
        position: "relative", zIndex: 1
      }}>
        <div style={{ fontSize: "64px", opacity: 0.18, lineHeight: 1 }}>📖</div>
        <div style={{ color: "#6b5580", fontSize: "14px", textAlign: "center", lineHeight: 1.8, fontWeight: 400 }}>
          Fill in the details and click generate<br />to create your personalised story
        </div>
        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: "7px", height: "7px", background: "var(--amber)",
              borderRadius: "50%", animation: "twinkle 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.25}s`, opacity: 0.7
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

  if (loading) {
    return (
      <div className="story-card-glow" style={{
        background: "linear-gradient(140deg, rgba(245,222,179,0.08) 0%, rgba(212,165,116,0.06) 60%, rgba(245,222,179,0.04) 100%)",
        borderRadius: "28px", padding: "36px", minHeight: "460px",
        position: "relative", overflow: "hidden",
        border: "2px solid rgba(212,165,116,0.25)",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.2), 0 8px 24px rgba(193,68,14,0.15)"
      }}>
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "250px", height: "250px",
          background: "radial-gradient(circle,rgba(193,68,14,0.15) 0%,transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "-40px", left: "-30px",
          width: "200px", height: "200px",
          background: "radial-gradient(circle,rgba(212,165,116,0.1) 0%,transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", height: "380px", gap: "24px",
          position: "relative", zIndex: 1
        }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{ fontSize: "72px", animation: "float 2s ease-in-out infinite" }}>🔮</div>
            <div style={{
              position: "absolute", top: "-8px", right: "-8px", fontSize: "22px",
              animation: "spin 2s linear infinite"
            }}>✨</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#9b86c2", fontSize: "15px", fontWeight: 600, marginBottom: "6px" }}>
              Weaving your magic story...
            </div>
            <div style={{ color: "#5a4470", fontSize: "12px", fontWeight: 400 }}>
              Creating {displayName}&apos;s adventure...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="story-wood-frame story-card-glow" style={{
      background: "linear-gradient(140deg, rgba(245,222,179,0.1) 0%, rgba(212,165,116,0.08) 60%, rgba(245,222,179,0.06) 100%)",
      borderRadius: "12px", padding: "32px", minHeight: "460px",
      position: "relative", overflow: "hidden",
      border: "6px solid",
      borderImage: "linear-gradient(135deg, #5c3d2e 0%, #8b5a3c 50%, #5c3d2e 100%) 1",
      boxShadow: "inset 0 0 30px rgba(0,0,0,0.15), 0 12px 32px rgba(193,68,14,0.2)"
    }}>
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "250px", height: "250px",
        background: "radial-gradient(circle,rgba(193,68,14,0.12) 0%,transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "-40px", left: "-30px",
        width: "200px", height: "200px",
        background: "radial-gradient(circle,rgba(212,165,116,0.08) 0%,transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <span style={{
              background: "rgba(240,163,0,0.18)", border: "1px solid rgba(240,163,0,0.35)",
              color: "#f0a75b", fontSize: "10px", fontWeight: 800,
              padding: "4px 12px", borderRadius: "999px", letterSpacing: "1.2px"
            }}>
              ✦ {story.theme.toUpperCase()}
            </span>
            <span style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#9b86c2", fontSize: "10px", fontWeight: 700,
              padding: "4px 10px", borderRadius: "999px", letterSpacing: "1px"
            }}>
              {story.language.toUpperCase()}
            </span>
          </div>
          <span style={{ fontSize: "12px", color: "#6b5580", fontWeight: 500 }}>
            ~{readingTime} min read
          </span>
        </div>

        <div className="story-line" style={{
          fontFamily: "'Playfair Display', serif", fontSize: "22px",
          fontWeight: 700, color: "var(--cream)", marginBottom: "18px", lineHeight: 1.35
        }}>
          <span style={{ color: "var(--amber)" }}>{story.childName}</span>{" "}
          {story.title.replace(story.childName, "").trim()}
        </div>

        <div className="story-line" style={{
          fontSize: "14px", lineHeight: 1.9, color: "#c0a8e0", fontWeight: 300
        }}
          dangerouslySetInnerHTML={{
            __html: story.body.replace(/\n/g, "<br/>")
              .replace(/<strong>/g, '<strong style="color:#f0a75b;font-weight:700;">') || ""
          }}
        />

        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.07)", margin: "22px 0" }} />

        {story.moral && <div className="story-line" style={{
          fontSize: "13px", color: "#8870a8", fontStyle: "italic", lineHeight: 1.6
        }}>
          <span style={{ color: "#f0a75b", fontStyle: "normal", fontWeight: 800 }}>
            🪔 {story.moralLabel || "Moral"}:{" "}
          </span>
          {story.moral}
        </div>}

        <div style={{ display: "flex", gap: "8px", marginTop: "22px", flexWrap: "wrap" }}>
          <Show when="signed-in" fallback={
            <SignInButton mode="modal">
              <button className="action-btn magic-hover" style={{
                flex: 1, minWidth: "72px", borderRadius: "14px",
                border: "1px solid rgba(240,163,0,0.2)",
                background: "rgba(240,163,0,0.05)", color: "#f0a75b",
                fontSize: "12px", padding: "11px 6px", cursor: "pointer",
                fontFamily: "inherit", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"
              }}>
                🔖 Save
              </button>
            </SignInButton>
          }>
            <button className="action-btn magic-hover" onClick={onSave} disabled={saving || saved}
              style={{
                flex: 1, minWidth: "72px", borderRadius: "14px",
                border: "1px solid rgba(240,163,0,0.2)",
                background: "rgba(240,163,0,0.05)", color: "#f0a75b",
                fontSize: "12px", padding: "11px 6px", cursor: "pointer",
                fontFamily: "inherit", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"
              }}>
              {saved ? "✅ Saved" : saving ? "⏳..." : "🔖 Save"}
            </button>
          </Show>
          <button className="action-btn magic-hover" onClick={onPdf}
            style={{
              flex: 1, minWidth: "72px", borderRadius: "14px",
              border: "1px solid rgba(240,163,0,0.2)",
              background: "rgba(240,163,0,0.05)", color: "#f0a75b",
              fontSize: "12px", padding: "11px 6px", cursor: "pointer",
              fontFamily: "inherit", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"
            }}>
            ⬇️ PDF
          </button>
          <button className="action-btn magic-hover" disabled={tts.isLoading}
            onClick={handleRead}
            style={{
              flex: 1, minWidth: "72px", borderRadius: "14px",
              border: "1px solid rgba(240,163,0,0.2)",
              background: "rgba(240,163,0,0.05)", color: "#f0a75b",
              fontSize: "12px", padding: "11px 6px", cursor: "pointer",
              fontFamily: "inherit", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"
            }}>
            {tts.isLoading ? "🎧..." : directPlaying || tts.isSpeaking ? "⏹ Stop" : "🔊 Read"}
          </button>
          <button className="action-btn magic-hover" onClick={onNew}
            style={{
              flex: 1, minWidth: "72px", borderRadius: "14px",
              border: "1px solid rgba(240,163,0,0.2)",
              background: "rgba(240,163,0,0.05)", color: "#f0a75b",
              fontSize: "12px", padding: "11px 6px", cursor: "pointer",
              fontFamily: "inherit", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px"
            }}>
            🔄 New
          </button>
        </div>
      </div>
    </div>
 );
}
