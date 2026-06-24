"use client";

const THEME_IMAGES: Record<string, string> = {
  Panchatantra:   "/dadima/theme-panchatantra.png",
  Birbal:         "/dadima/theme-birbal.png",
  "Tenali Raman": "/dadima/theme-tenali.png",
  Festival:       "/dadima/theme-bedtime.png",
  "Moral Story":  "/dadima/theme-animals.png",
};

interface Props {
  themes: string[];
  selectedTheme: string;
  themeData: Record<string, { icon: string; color: string; desc: string; bg: string }>;
  onSelect: (t: string) => void;
}

export default function ThemesGrid({ themes, selectedTheme, themeData, onSelect }: Props) {
  return (
    <section id="themes" className="dm-themes">
      <div className="dm-section-head">
        <h2 className="dm-section-title">Popular themes</h2>
        <a href="#generator" className="dm-link-text">Try a theme →</a>
      </div>
      <div className="dm-theme-grid">
        {themes.map(t => (
          <div
            key={t}
            className={`dm-theme-card${selectedTheme === t ? " dm-theme-card--sel" : ""}`}
            onClick={() => onSelect(t)}
          >
            <img
              src={THEME_IMAGES[t] || "/dadima/theme-animals.png"}
              alt={t}
              className="dm-theme-img"
            />
            <span>{t}</span>
            {selectedTheme === t && (
              <span style={{ fontSize: 10, color: "var(--dm-primary)", fontWeight: 800, letterSpacing: 1 }}>
                SELECTED ✓
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
