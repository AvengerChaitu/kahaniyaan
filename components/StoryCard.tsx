"use client";

import { useState, useRef, useEffect } from "react";
import { Show, SignInButton } from "@clerk/nextjs";

const STORY_MSGS = [
  "Grandma is picking the perfect tale…",
  "Sprinkling some magic dust…",
  "Weaving the story just for you…",
  "Adding the moral touch…",
  "Your adventure is almost here…",
];

interface Story {
  title: string; body: string; language: string; theme: string;
  age: string; childName: string; moral?: string; moralLabel?: string; ttsUrl?: string;
}
interface TTSState {
  isSpeaking: boolean; isLoading: boolean;
  stop: () => void; speak: (text: string, lang: string) => void;
}
interface Props {
  story: Story | null; loading: boolean; displayName: string;
  readingTime: number; saved: boolean; saving: boolean;
  tts: TTSState; onSave: () => void; onPdf: () => void; onNew: () => void;
}

const cardBase: React.CSSProperties = {
  background: "#fff", borderRadius: 20, padding: 32, minHeight: 460,
  border: "1.5px solid #ECECEC", boxShadow: "0 2px 16px rgba(0,0,0,.04)",
};

const actionBtn: React.CSSProperties = {
  flex: 1, minWidth: 64, padding: "10px 6px", borderRadius: 10,
  border: "1.5px solid #ECECEC", background: "#fff", color: "#374151",
  fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
  transition: "all .2s",
};

export default function StoryCard({ story, loading, displayName, readingTime, saved, saving, tts, onSave, onPdf, onNew }: Props) {
  const [directPlaying, setDirectPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    if (!loading) { setMsgIdx(0); return; }
    const id = setInterval(() => setMsgIdx(i => (i + 1) % STORY_MSGS.length), 2200);
    return () => clearInterval(id);
  }, [loading]);

  function fallbackSpeak() {
    tts.speak((story?.body || "").replace(/<[^>]*>/g, ""), story?.language || "Hindi");
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
  useEffect(() => () => { stopDirect(); }, []);

  function handleRead() {
    if (directPlaying) { stopDirect(); return; }
    if (tts.isSpeaking) { tts.stop(); return; }
    if (story?.ttsUrl) { playDirect(story.ttsUrl); return; }
    fallbackSpeak();
  }

  /* ── Empty state ── */
  if (!story && !loading) {
    return (
      <div style={{ ...cardBase, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, background: "#F5F3FF",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontFamily: "Pacifico, cursive", color: "#7C5CFC", fontWeight: 400,
        }}>
          D
        </div>
        <p style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center", lineHeight: 1.7, margin: 0 }}>
          Fill in the details and click generate<br />to create your personalised story
        </p>
      </div>
    );
  }

  /* ── Loading state ── */
  if (loading) {
    return (
      <div style={{ ...cardBase, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
        {/* Spinning diya emoji */}
        <div style={{ position: "relative", width: 80, height: 80 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            border: "3px solid #F5F3FF",
            borderTop: "3px solid #7C5CFC",
            animation: "spin .9s linear infinite",
            position: "absolute",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36,
          }}>🪔</div>
        </div>

        {/* Rotating message */}
        <div style={{ textAlign: "center", maxWidth: 220 }}>
          <div style={{
            fontSize: 15, fontWeight: 700, color: "#7C5CFC",
            marginBottom: 8, minHeight: 24,
            transition: "opacity .3s",
          }}>
            {STORY_MSGS[msgIdx]}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, color: "#9CA3AF" }}>
            <span>Creating</span>
            <strong style={{ color: "#374151" }}>{displayName}&apos;s</strong>
            <span>adventure</span>
          </div>
        </div>

        {/* Animated dots progress */}
        <div className="dm-dots" style={{ color: "#C4B5FD" }}>
          <span /><span /><span />
        </div>
      </div>
    );
  }

  /* ── Story state ── */
  return (
    <div style={{ ...cardBase, position: "relative" }}>
      {/* Tags row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{
            background: "#F5F3FF", border: "1px solid #E0D9FF", color: "#7C5CFC",
            fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 999, letterSpacing: "1px",
          }}>
            {story!.theme.toUpperCase()}
          </span>
          <span style={{
            background: "#F9FAFB", border: "1px solid #ECECEC", color: "#6B7280",
            fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 999, letterSpacing: "1px",
          }}>
            {story!.language.toUpperCase()}
          </span>
        </div>
        <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>~{readingTime} min read</span>
      </div>

      {/* Title */}
      <h2 className="story-line" style={{
        fontSize: 20, fontWeight: 800, color: "#111827",
        marginBottom: 16, lineHeight: 1.3, letterSpacing: "-.02em",
      }}>
        <span style={{ color: "#7C5CFC" }}>{story!.childName}</span>{" "}
        {story!.title.replace(story!.childName, "").trim()}
      </h2>

      {/* Body */}
      <div className="story-line" style={{ fontSize: 14, lineHeight: 1.9, color: "#374151" }}
        dangerouslySetInnerHTML={{
          __html: story!.body.replace(/\n/g, "<br/>")
            .replace(/<strong>/g, '<strong style="color:#7C5CFC;font-weight:700;">') || ""
        }}
      />

      <hr style={{ border: "none", borderTop: "1.5px solid #F3F4F6", margin: "20px 0" }} />

      {/* Moral */}
      {story!.moral && (
        <div className="story-line" style={{
          fontSize: 13, color: "#6B7280", fontStyle: "italic", lineHeight: 1.65,
          background: "#F5F3FF", borderLeft: "3px solid #7C5CFC",
          padding: "10px 14px", borderRadius: "0 8px 8px 0", marginBottom: 20,
        }}>
          <span style={{ color: "#7C5CFC", fontStyle: "normal", fontWeight: 800 }}>
            🪔 {story!.moralLabel || "Moral"}:{" "}
          </span>
          {story!.moral}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Show when="signed-in" fallback={
          <SignInButton mode="modal">
            <button style={actionBtn}>🔖 Save</button>
          </SignInButton>
        }>
          <button style={{ ...actionBtn, opacity: saved || saving ? .6 : 1 }}
            onClick={onSave} disabled={saving || saved}>
            {saved ? "✅ Saved" : saving
              ? <><span className="dm-spinner dm-spinner--purple" />Saving</>
              : "🔖 Save"}
          </button>
        </Show>
        <button style={actionBtn} onClick={onPdf}>⬇️ PDF</button>
        <button style={{ ...actionBtn, opacity: tts.isLoading ? .6 : 1 }}
          disabled={tts.isLoading} onClick={handleRead}>
          {tts.isLoading
            ? <><span className="dm-spinner dm-spinner--purple" />Loading</>
            : directPlaying || tts.isSpeaking ? "⏹ Stop" : "🔊 Read"}
        </button>
        <button style={{ ...actionBtn, borderColor: "#7C5CFC", color: "#7C5CFC" }} onClick={onNew}>
          🔄 New story
        </button>
      </div>
    </div>
  );
}
