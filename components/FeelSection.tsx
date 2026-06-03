export default function FeelSection() {
  return (
    <section id="feel" style={{
      background: "var(--cream)", padding: "6rem 2rem", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: "linear-gradient(90deg,transparent,var(--amber),transparent)"
      }} />
      <div style={{
        maxWidth: "1080px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
        gap: "5rem", alignItems: "center"
      }}>
        <div>
          <span style={{
            fontFamily: "'Dancing Script', cursive", fontSize: "1.15rem",
            color: "var(--orange)", display: "block", marginBottom: "0.9rem"
          }}>
            ✦ The story behind us
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.85rem,3.8vw,2.75rem)", lineHeight: 1.22,
            color: "var(--brown)", marginBottom: "1.4rem"
          }}>
            Remember the warmth of <em style={{ fontStyle: "italic", color: "var(--orange)" }}>Nani&apos;s voice</em> at bedtime?
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--brown2)", marginBottom: "1.1rem" }}>
            There was something magical about it — the dim lamp on the table, the cool night breeze, the tales of faraway kingdoms and clever animals. Dadima&apos;s stories were never just stories. They were safety. They were love.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--brown2)", marginBottom: "1.1rem" }}>
            But today&apos;s families live in different cities. Children grow up without ever knowing the Panchatantra tales that shaped their parents, or the Ramayana adventures their grandparents told with wide gestures and funny voices.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--brown2)" }}>
            <strong>Dadima</strong> is here to bring that magic back — right into your home, every single night.
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg viewBox="0 0 370 370" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: "370px" }} aria-hidden="true">
            <defs>
              <radialGradient id="lampHalo" cx="28%" cy="62%" r="50%">
                <stop offset="0%" stopColor="rgba(255,200,50,.45)"/>
                <stop offset="100%" stopColor="rgba(255,200,50,0)"/>
              </radialGradient>
            </defs>
            <circle cx="185" cy="185" r="172" fill="#f2ddb8"/>
            <circle cx="185" cy="185" r="167" fill="none" stroke="rgba(224,106,26,.22)" strokeWidth="2"/>
            <circle cx="185" cy="185" r="158" fill="none" stroke="rgba(240,163,0,.14)" strokeWidth="11" strokeDasharray="7,5"/>
            <ellipse cx="185" cy="316" rx="152" ry="36" fill="rgba(180,110,50,.22)"/>
            <rect x="65" y="264" width="11" height="50" rx="4" fill="#7a4820"/>
            <rect x="294" y="264" width="11" height="50" rx="4" fill="#7a4820"/>
            <rect x="74" y="240" width="11" height="46" rx="4" fill="#7a4820"/>
            <rect x="285" y="240" width="11" height="46" rx="4" fill="#7a4820"/>
            <rect x="60" y="228" width="250" height="50" rx="9" fill="#c08848"/>
            <line x1="95" y1="228" x2="95" y2="278" stroke="rgba(160,100,40,.45)" strokeWidth=".9"/>
            <line x1="125" y1="228" x2="125" y2="278" stroke="rgba(160,100,40,.45)" strokeWidth=".9"/>
            <line x1="155" y1="228" x2="155" y2="278" stroke="rgba(160,100,40,.45)" strokeWidth=".9"/>
            <line x1="185" y1="228" x2="185" y2="278" stroke="rgba(160,100,40,.45)" strokeWidth=".9"/>
            <line x1="215" y1="228" x2="215" y2="278" stroke="rgba(160,100,40,.45)" strokeWidth=".9"/>
            <line x1="245" y1="228" x2="245" y2="278" stroke="rgba(160,100,40,.45)" strokeWidth=".9"/>
            <line x1="275" y1="228" x2="275" y2="278" stroke="rgba(160,100,40,.45)" strokeWidth=".9"/>
            <line x1="60" y1="244" x2="310" y2="244" stroke="rgba(160,100,40,.45)" strokeWidth=".9"/>
            <line x1="60" y1="259" x2="310" y2="259" stroke="rgba(160,100,40,.45)" strokeWidth=".9"/>
            <rect x="244" y="222" width="62" height="36" rx="12" fill="#e8c88a"/>
            <rect x="78" y="258" width="44" height="10" rx="4" fill="#7a4820"/>
            <rect x="82" y="268" width="5" height="30" rx="2" fill="#6a3818"/>
            <rect x="113" y="268" width="5" height="30" rx="2" fill="#6a3818"/>
            <circle cx="104" cy="242" r="56" fill="url(#lampHalo)"/>
            <path d="M 90 253 Q 96 244 104 244 Q 112 244 118 253 L 116 262 Q 110 267 104 267 Q 98 267 92 262 Z" fill="#7a4820"/>
            <ellipse cx="104" cy="245" rx="10" ry="4" fill="#c07030"/>
            <ellipse cx="104" cy="238" rx="3.5" ry="7" fill="rgba(255,175,40,.9)">
              <animate attributeName="rx" values="3.5;2.5;3.5" dur=".85s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="104" cy="234" rx="2.2" ry="5" fill="rgba(255,225,100,.95)"/>
            <rect x="238" y="58" width="96" height="118" rx="7" fill="#160c28" stroke="#7a4820" strokeWidth="3"/>
            <line x1="286" y1="58" x2="286" y2="176" stroke="#7a4820" strokeWidth="2.2"/>
            <line x1="238" y1="117" x2="334" y2="117" stroke="#7a4820" strokeWidth="2.2"/>
            <circle cx="256" cy="80" r="1.5" fill="white" opacity=".8"/>
            <circle cx="306" cy="74" r="1.1" fill="white" opacity=".7"/>
            <circle cx="320" cy="92" r="1.5" fill="white" opacity=".85"/>
            <circle cx="263" cy="100" r="1" fill="white" opacity=".6"/>
            <circle cx="300" cy="152" r="1.5" fill="white" opacity=".75"/>
            <circle cx="252" cy="148" r="1" fill="white" opacity=".65"/>
            <circle cx="316" cy="138" r="1" fill="white" opacity=".5"/>
            <circle cx="316" cy="145" r="19" fill="#ffe070" opacity=".82"/>
            <ellipse cx="174" cy="228" rx="38" ry="14" fill="#8a3040" opacity=".9"/>
            <path d="M140 198 Q142 214 140 228 Q162 238 185 236 Q204 232 206 222 Q200 205 185 196 Q166 188 140 198Z" fill="#a04060"/>
            <rect x="153" y="170" width="34" height="38" rx="9" fill="#a04060"/>
            <rect x="153" y="170" width="34" height="20" rx="8" fill="#7a2848"/>
            <rect x="163" y="155" width="18" height="18" rx="7" fill="#c88858"/>
            <ellipse cx="172" cy="145" rx="22" ry="23" fill="#c88858"/>
            <ellipse cx="172" cy="126" rx="15" ry="12" fill="#ece4d8"/>
            <ellipse cx="172" cy="123" rx="9" ry="7.5" fill="#f4eeea"/>
            <circle cx="163" cy="144" r="8.5" fill="none" stroke="#7a4820" strokeWidth="1.8"/>
            <circle cx="181" cy="144" r="8.5" fill="none" stroke="#7a4820" strokeWidth="1.8"/>
            <path d="M 171.5 144 L 172.5 144" stroke="#7a4820" strokeWidth="1.8"/>
            <path d="M 154.5 142 Q 149 140 147 142" stroke="#7a4820" strokeWidth="1.5" fill="none"/>
            <path d="M 189.5 142 Q 195 140 197 142" stroke="#7a4820" strokeWidth="1.5" fill="none"/>
            <circle cx="172" cy="138" r="2.2" fill="#cc1a1a" opacity=".75"/>
            <path d="M 162 153 Q 172 160 182 153" stroke="#3a1e0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M150 214 Q160 208 172 214 Q180 210 190 214" stroke="#e06a1a" strokeWidth="2.5" fill="none"/>
            <path d="M153 220 Q162 215 173 220 Q181 216 191 220" stroke="#f0a300" strokeWidth="2" fill="none"/>
            <text x="22" y="92" fontSize="16" fill="rgba(240,163,0,.42)" fontFamily="Georgia,serif">✦</text>
            <text x="328" y="80" fontSize="12" fill="rgba(240,163,0,.34)" fontFamily="Georgia,serif">✦</text>
            <text x="18" y="278" fontSize="10" fill="rgba(240,163,0,.28)" fontFamily="Georgia,serif">✦</text>
            <text x="333" y="285" fontSize="14" fill="rgba(240,163,0,.36)" fontFamily="Georgia,serif">✦</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
