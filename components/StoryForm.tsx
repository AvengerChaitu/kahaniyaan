"use client";

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
  themeData: Record<string, { icon: string; color: string; desc: string }>;
  onNameChange: (v: string) => void;
  onAgeChange: (v: string) => void;
  onLangChange: (v: string) => void;
  onThemeChange: (v: string) => void;
  onGenerate: () => void;
}

export default function StoryForm({
  childName, selectedAge, selectedLang, selectedTheme, loading,
  ageGroups, languages, themes, themeData,
  onNameChange, onAgeChange, onLangChange, onThemeChange, onGenerate,
}: Props) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #f5deb3 0%, #f4e4c1 50%, #ede5ce 100%)",
      borderRadius: "16px", padding: "36px",
      border: "3px solid #8b5a3c",
      boxShadow: "0 12px 32px rgba(92,61,46,0.25), inset 0 1px 0 rgba(255,255,255,0.5)"
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "14px",
        paddingBottom: "22px", marginBottom: "28px",
        borderBottom: "2px solid rgba(92,61,46,0.3)"
      }}>
        <div style={{
          width: "46px", height: "46px",
          background: "linear-gradient(135deg, #dc8033 0%, #c1440e 100%)",
          borderRadius: "12px", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "22px", flexShrink: 0,
          boxShadow: "0 4px 12px rgba(193,68,14,0.25)"
        }}>✏️</div>
        <div>
          <div style={{ fontSize: "15px", fontWeight: 800, color: "#3d2817" }}>
            About your child
          </div>
          <div style={{ fontSize: "12px", color: "#8b7355", marginTop: "3px", fontWeight: 400 }}>
            We&apos;ll make them the star of the story ✨
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label style={{
          display: "block", fontSize: "10px", fontWeight: 800,
          color: "#5c3d2e", letterSpacing: "1.5px", textTransform: "uppercase",
          marginBottom: "10px"
        }}>
          Child&apos;s Name
        </label>
        <input type="text" placeholder="Enter name..." value={childName} maxLength={20}
          onChange={e => onNameChange(e.target.value)}
          style={{
            width: "100%", padding: "13px 18px", border: "2px solid rgba(139,90,60,0.3)",
            borderRadius: "12px", fontSize: "16px", color: "#3d2817",
            background: "rgba(255,255,255,0.6)", fontFamily: "inherit", fontWeight: 600,
            transition: "all 0.2s ease"
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#c1440e";
            e.currentTarget.style.background = "rgba(255,255,255,0.9)";
            e.currentTarget.style.boxShadow = "0 0 0 4px rgba(193,68,14,0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(139,90,60,0.3)";
            e.currentTarget.style.background = "rgba(255,255,255,0.6)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label style={{
          display: "block", fontSize: "10px", fontWeight: 800, color: "#5c3d2e",
          letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px"
        }}>
          Age Group
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {ageGroups.map(a => (
            <button key={a} className={`pill-btn${selectedAge === a ? " active" : ""}`}
              onClick={() => onAgeChange(a)}
              style={{
                padding: "9px 20px", borderRadius: "999px",
                border: `2px solid ${selectedAge === a ? "var(--brown)" : "#e8d5c4"}`,
                background: selectedAge === a ? "var(--brown)" : "white",
                color: selectedAge === a ? "white" : "#8a6550",
                fontSize: "13px", fontWeight: 700, fontFamily: "inherit"
              }}>
              {a}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label style={{
          display: "block", fontSize: "10px", fontWeight: 800, color: "#ccc",
          letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px"
        }}>
          Language
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {languages.map(l => (
            <button key={l} className={`pill-btn${selectedLang === l ? " active" : ""}`}
              onClick={() => onLangChange(l)}
              style={{
                padding: "8px 16px", borderRadius: "999px",
                border: `2px solid ${selectedLang === l ? "var(--brown)" : "#e8d5c4"}`,
                background: selectedLang === l ? "var(--brown)" : "white",
                color: selectedLang === l ? "white" : "#8a6550",
                fontSize: "12px", fontWeight: 700, fontFamily: "inherit"
              }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "28px" }}>
        <label style={{
          display: "block", fontSize: "10px", fontWeight: 800, color: "#ccc",
          letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px"
        }}>
          Theme
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {themes.map(t => (
            <button key={t} className={`pill-btn${selectedTheme === t ? " active" : ""}`}
              onClick={() => onThemeChange(t)}
              style={{
                padding: "8px 16px", borderRadius: "999px",
                border: `2px solid ${selectedTheme === t ? "var(--amber)" : "#e8d5c4"}`,
                background: selectedTheme === t ? "var(--amber)" : "white",
                color: selectedTheme === t ? "var(--brown)" : "#8a6550",
                fontSize: "12px", fontWeight: 700, fontFamily: "inherit"
              }}>
              {themeData[t]?.icon} {t}
            </button>
          ))}
        </div>
      </div>

      <button className="gen-btn magic-hover" disabled={loading || !childName.trim()} onClick={onGenerate}
        style={{
          width: "100%", padding: "17px",
          background: loading || !childName.trim() ? "#d1c4e9" : "var(--brown)",
          color: "white", border: "none", borderRadius: "18px",
          fontSize: "16px", fontWeight: 800,
          cursor: loading || !childName.trim() ? "not-allowed" : "pointer",
          fontFamily: "inherit", letterSpacing: "0.3px",
          boxShadow: "0 8px 24px rgba(11,9,32,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
        }}>
        {loading
          ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>🔮</span> Weaving magic...</>
          : <><span>✨</span> Generate {childName ? `${childName}'s` : "your child's"} story</>
        }
      </button>
    </div>
  );
}
