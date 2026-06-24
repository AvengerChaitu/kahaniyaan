const LANGUAGES = [
  { script: "हिंदी",    name: "Hindi",     color: "#7C5CFC" },
  { script: "తెలుగు",  name: "Telugu",    color: "#059669" },
  { script: "தமிழ்",   name: "Tamil",     color: "#7C3AED" },
  { script: "ಕನ್ನಡ",  name: "Kannada",   color: "#92400E" },
  { script: "മലയാളം", name: "Malayalam", color: "#EA580C" },
  { script: "मराठी",   name: "Marathi",   color: "#DC2626" },
  { script: "বাংলা",   name: "Bengali",   color: "#2563EB" },
  { script: "ગુજરાતી", name: "Gujarati",  color: "#0891B2" },
  { script: "ਪੰਜਾਬੀ", name: "Punjabi",   color: "#7C5CFC" },
  { script: "English",  name: "English",   color: "#374151" },
];

export default function LanguagesSection() {
  return (
    <section id="languages" className="dm-languages">
      <h2 className="dm-section-title">Available in</h2>
      <div className="dm-language-grid">
        {LANGUAGES.map(lang => (
          <div key={lang.name} className="dm-language-chip">
            <span className="dm-language-script" style={{ color: lang.color }}>{lang.script}</span>
            <span className="dm-language-name">{lang.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
