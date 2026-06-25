"use client";

import { useState, useEffect } from "react";

const GENERATE_MSGS = [
  "Grandma is picking the perfect tale…",
  "Sprinkling some magic dust…",
  "Weaving the story just for you…",
  "Adding the moral touch…",
  "Your adventure is almost here…",
];

interface Props {
  childName: string;
  selectedAge: string;
  selectedLang: string;
  selectedTheme: string;
  loading: boolean;
  ageGroups: string[];
  languages: string[];
  langScripts: string[];
  themes: string[];
  themeData: Record<string, { icon: string; color: string; desc: string; bg: string }>;
  onNameChange: (v: string) => void;
  onAgeChange: (v: string) => void;
  onLangChange: (v: string) => void;
  onThemeChange: (v: string) => void;
  onGenerate: () => void;
}

const label: React.CSSProperties = {
  display: "block", fontSize: 10, fontWeight: 800,
  color: "#6B7280", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10,
};

const pillBase: React.CSSProperties = {
  padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
  fontFamily: "inherit", cursor: "pointer", transition: "all .2s",
  border: "1.5px solid #ECECEC", background: "#fff", color: "#374151",
};

const pillActive: React.CSSProperties = {
  ...pillBase, background: "#7C5CFC", borderColor: "#7C5CFC", color: "#fff",
};

export default function StoryForm({
  childName, selectedAge, selectedLang, selectedTheme, loading,
  ageGroups, languages, themes,
  onNameChange, onAgeChange, onLangChange, onThemeChange, onGenerate,
}: Props) {
  const canGenerate = !loading && !!childName.trim();
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    if (!loading) { setMsgIdx(0); return; }
    const id = setInterval(() => setMsgIdx(i => (i + 1) % GENERATE_MSGS.length), 2200);
    return () => clearInterval(id);
  }, [loading]);

  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: 32,
      border: "1.5px solid #ECECEC",
      boxShadow: "0 2px 16px rgba(0,0,0,.04)",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: "1.5px solid #F3F4F6" }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
          About your child
        </div>
        <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 400 }}>
          We&apos;ll make them the star of the story ✦
        </div>
      </div>

      {/* Name */}
      <div style={{ marginBottom: 22 }}>
        <label style={label}>Child&apos;s Name</label>
        <input
          type="text" placeholder="e.g. Arjun" value={childName} maxLength={20}
          onChange={e => onNameChange(e.target.value)}
          style={{
            width: "100%", padding: "12px 16px",
            border: "1.5px solid #ECECEC", borderRadius: 10,
            fontSize: 15, fontFamily: "inherit", fontWeight: 500,
            color: "#111827", background: "#fff", outline: "none",
          }}
          onFocus={e => { e.currentTarget.style.borderColor = "#7C5CFC"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(124,92,252,.1)"; }}
          onBlur={e  => { e.currentTarget.style.borderColor = "#ECECEC";  e.currentTarget.style.boxShadow = "none"; }}
        />
      </div>

      {/* Age */}
      <div style={{ marginBottom: 22 }}>
        <label style={label}>Age Group</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ageGroups.map(a => (
            <button key={a} onClick={() => onAgeChange(a)}
              style={selectedAge === a ? pillActive : pillBase}>
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div style={{ marginBottom: 22 }}>
        <label style={label}>Language</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {languages.map(l => (
            <button key={l} onClick={() => onLangChange(l)}
              style={selectedLang === l ? pillActive : { ...pillBase, padding: "7px 14px", fontSize: 12 }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div style={{ marginBottom: 28 }}>
        <label style={label}>Theme</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {themes.map(t => (
            <button key={t} onClick={() => onThemeChange(t)}
              style={selectedTheme === t ? { ...pillActive, padding: "7px 14px", fontSize: 12 } : { ...pillBase, padding: "7px 14px", fontSize: 12 }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Generate */}
      <button
        disabled={!canGenerate}
        onClick={onGenerate}
        className={loading ? "dm-btn-shimmer" : ""}
        style={{
          width: "100%", padding: "14px 20px", borderRadius: 12,
          background: canGenerate ? "#7C5CFC" : "#F3F4F6",
          color: canGenerate ? "#fff" : "#9CA3AF",
          border: "none", fontSize: 15, fontWeight: 700,
          fontFamily: "inherit", cursor: canGenerate ? "pointer" : "not-allowed",
          transition: "background .2s, box-shadow .2s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          boxShadow: canGenerate ? "0 4px 16px rgba(124,92,252,.3)" : "none",
          minHeight: 50,
        }}
      >
        {loading ? (
          <>
            <span className="dm-spinner" />
            <span style={{ transition: "opacity .3s" }}>{GENERATE_MSGS[msgIdx]}</span>
          </>
        ) : (
          <>✨ Generate {childName.trim() ? `${childName.trim()}'s` : "your child's"} story</>
        )}
      </button>
    </div>
  );
}
