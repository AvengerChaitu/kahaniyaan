"use client";

import Image from "next/image";

interface Props {
  themes: string[];
  selectedTheme: string;
  themeData: Record<string, { icon: string; color: string; desc: string; bg: string }>;
  onSelect: (t: string) => void;
}

const themeIllustrations: Record<string, string> = {
  Panchatantra: "/illustrations/theme-panchatantra.svg",
  Birbal: "/illustrations/theme-birbal.svg",
  "Tenali Raman": "/illustrations/theme-tenali-raman.svg",
  Festival: "/illustrations/theme-festival.svg",
  "Moral Story": "/illustrations/theme-moral-story.svg",
};

export default function ThemesGrid({ themes, selectedTheme, themeData, onSelect }: Props) {
  return (
    <section id="themes" style={{ padding: "0 24px 88px", maxWidth: "1120px", margin: "0 auto" }}>
      <p style={{
        textAlign: "center", color: "var(--amber)", fontSize: "11px",
        letterSpacing: "2.5px", fontWeight: 700, marginBottom: "10px"
      }}>
        ✦ STORY THEMES
      </p>
      <h2 style={{
        textAlign: "center", fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(24px,3vw,38px)", fontWeight: 600, color: "var(--brown)",
        marginBottom: "52px"
      }}>
        Rooted in Indian tradition
      </h2>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
        gap: "16px"
      }}>
        {themes.map(t => {
          const d = themeData[t];
          return (
            <div key={t} className="theme-card magic-hover"
              onClick={() => onSelect(t)}
              style={{
                background: selectedTheme === t ? d.bg : "white",
                borderRadius: "22px", padding: "32px 18px", textAlign: "center",
                border: `2px solid ${selectedTheme === t ? d.color : "#ede0d4"}`,
                boxShadow: selectedTheme === t ? `0 8px 28px ${d.bg}` : "none"
              }}>
              <div style={{ width: "100%", height: "100px", marginBottom: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={themeIllustrations[t] || d.icon}
                  alt={t}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--brown)", marginBottom: "5px" }}>
                {t}
              </div>
              <div style={{ fontSize: "11px", color: "#bbb", lineHeight: 1.5 }}>
                {d.desc}
              </div>
              {selectedTheme === t && (
                <div style={{
                  fontSize: "10px", color: d.color, fontWeight: 800,
                  marginTop: "10px", letterSpacing: "1px"
                }}>
                  SELECTED ✓
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
