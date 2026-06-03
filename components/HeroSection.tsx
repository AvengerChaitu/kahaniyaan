"use client";

import { useMemo } from "react";

interface Props {
  onExploreClick: () => void;
  onCreateClick: () => void;
}

export default function HeroSection({ onExploreClick, onCreateClick }: Props) {
  const stars = useMemo(() => Array.from({ length: 130 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 62}%`,
    size: `${Math.random() * 2.4 + 0.5}px`,
    d: `${(Math.random() * 3 + 1.4).toFixed(1)}s`,
    dl: `${(Math.random() * 5).toFixed(1)}s`,
    lo: (Math.random() * 0.18 + 0.06).toFixed(2),
    hi: (Math.random() * 0.5 + 0.5).toFixed(2),
  })), []);

  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 95%,#2e1800 0%,#1a0c2e 28%,#0d0920 60%,#060514 100%)",
      overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          left: s.left, top: s.top, width: s.size, height: s.size,
          "--d": s.d, "--dl": s.dl, "--lo": s.lo, "--hi": s.hi
        } as React.CSSProperties} />
      ))}

      <div className="moon" style={{
        position: "absolute", top: "9%", right: "11%",
        width: "76px", height: "76px", borderRadius: "50%",
        background: "radial-gradient(circle at 38% 42%,#fffbe8,#ffe070 55%,#f0a300 100%)",
        boxShadow: "0 0 28px rgba(255,220,80,0.5),0 0 80px rgba(255,200,40,0.18)"
      }} />

      <div className="hero-glow" style={{
        position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)",
        width: "680px", height: "420px",
        background: "radial-gradient(ellipse at 50% 88%,rgba(240,163,0,0.52) 0%,rgba(224,106,26,0.28) 28%,transparent 65%)",
        pointerEvents: "none"
      }} />

      <div className="hero-content" style={{
        position: "relative", zIndex: 10, textAlign: "center",
        padding: "5rem 2rem 2rem"
      }}>
        <p className="fade-up" style={{
          fontFamily: "'Dancing Script', cursive", fontSize: "clamp(1rem,2.5vw,1.35rem)",
          color: "var(--amber)", marginBottom: "0.9rem",
          animationDelay: "0.2s"
        }}>
          ✦ &nbsp; Come beta, sit down &nbsp; ✦
        </p>
        <h1 className="fade-up" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem,13vw,10rem)", fontWeight: 700,
          lineHeight: 0.9, letterSpacing: "-0.03em",
          color: "var(--cream)", marginBottom: "1.4rem",
          animationDelay: "0.4s"
        }}>
          Dadi<span style={{ fontStyle: "italic", color: "var(--amber)" }}>ma</span>
        </h1>
        <p className="fade-up" style={{
          fontSize: "clamp(0.9rem,2.2vw,1.2rem)",
          color: "rgba(253,244,227,0.68)",
          maxWidth: "460px", margin: "0 auto 2.4rem", lineHeight: 1.75,
          fontFamily: "'Lora', serif", animationDelay: "0.6s"
        }}>
          Where grandma never stopped telling stories. Every bedtime. Every night. Right here, for your family.
        </p>
        <div className="fade-up" style={{
          display: "flex", gap: "1rem", justifyContent: "center",
          flexWrap: "wrap", animationDelay: "0.8s"
        }}>
          <button onClick={onCreateClick} className="magic-hover glow-btn" style={{
            background: "var(--amber)", color: "var(--brown)",
            padding: "0.9rem 2.3rem", borderRadius: "50px",
            fontFamily: "'Lora', serif", fontWeight: 500, fontSize: "1rem",
            border: "none", cursor: "pointer",
            boxShadow: "0 4px 24px rgba(240,163,0,0.42)",
            transition: "all 0.3s"
          }}>
            Create a Story
          </button>
          <button onClick={onExploreClick} className="btn-b" style={{
            background: "transparent", color: "rgba(253,244,227,0.82)",
            padding: "0.9rem 2.3rem", borderRadius: "50px",
            border: "1px solid rgba(253,244,227,0.28)",
            fontFamily: "'Lora', serif", fontSize: "1rem", cursor: "pointer",
            transition: "all 0.3s"
          }}>
            Explore Stories →
          </button>
        </div>
      </div>

      <div className="scene-wrap" style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)", width: "min(760px,100vw)",
        pointerEvents: "none"
      }}>
        <svg viewBox="0 0 760 310" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }} aria-hidden="true">
          <ellipse cx="380" cy="295" rx="340" ry="28" fill="rgba(90,45,5,.35)"/>
          <ellipse cx="380" cy="298" rx="285" ry="18" fill="rgba(60,25,5,.4)"/>
          <ellipse cx="380" cy="292" rx="210" ry="16" fill="rgba(180,95,20,.28)" stroke="rgba(240,163,0,.28)" strokeWidth="1.2"/>
          <ellipse cx="380" cy="283" rx="68" ry="18" fill="rgba(255,185,55,.22)"/>
          <rect x="369" y="235" width="22" height="46" rx="5" fill="#4e2a0e"/>
          <ellipse cx="380" cy="284" rx="28" ry="8" fill="#6e3a18"/>
          <path d="M 357 248 Q 362 237 380 237 Q 398 237 403 248 L 401 260 Q 393 268 380 268 Q 367 268 359 260 Z" fill="#8a5530"/>
          <ellipse cx="380" cy="251" rx="17" ry="6" fill="#b06828"/>
          <ellipse cx="380" cy="239" rx="5.5" ry="11" fill="rgba(255,180,40,.88)">
            <animate attributeName="rx" values="5.5;4;5.5" dur="1.1s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="380" cy="235" rx="3.5" ry="8" fill="rgba(255,225,100,.95)">
            <animate attributeName="rx" values="3.5;2.5;3.5" dur=".9s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="380" cy="231" rx="2" ry="5" fill="rgba(255,255,210,1)">
            <animate attributeName="ry" values="5;3.5;5" dur=".7s" repeatCount="indefinite"/>
          </ellipse>
          <circle cx="268" cy="178" r="3.2" fill="rgba(255,205,55,.85)">
            <animate attributeName="opacity" values=".85;0;.85" dur="2.1s" repeatCount="indefinite"/>
            <animate attributeName="cy" values="178;148;178" dur="2.1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="254" cy="162" r="2.2" fill="rgba(255,225,80,.7)">
            <animate attributeName="opacity" values=".7;0;.7" dur="2.6s" repeatCount="indefinite" begin=".5s"/>
            <animate attributeName="cy" values="162;130;162" dur="2.6s" repeatCount="indefinite" begin=".5s"/>
          </circle>
          <circle cx="280" cy="152" r="2.8" fill="rgba(255,175,30,.9)">
            <animate attributeName="opacity" values=".9;0;.9" dur="1.9s" repeatCount="indefinite" begin=".9s"/>
            <animate attributeName="cy" values="152;118;152" dur="1.9s" repeatCount="indefinite" begin=".9s"/>
          </circle>
          <circle cx="490" cy="175" r="3" fill="rgba(255,205,55,.8)">
            <animate attributeName="opacity" values=".8;0;.8" dur="2.3s" repeatCount="indefinite" begin=".3s"/>
            <animate attributeName="cy" values="175;145;175" dur="2.3s" repeatCount="indefinite" begin=".3s"/>
          </circle>
          <circle cx="505" cy="158" r="2" fill="rgba(255,230,100,.65)">
            <animate attributeName="opacity" values=".65;0;.65" dur="2s" repeatCount="indefinite" begin="1.1s"/>
            <animate attributeName="cy" values="158;126;158" dur="2s" repeatCount="indefinite" begin="1.1s"/>
          </circle>
          <circle cx="478" cy="148" r="2.5" fill="rgba(255,200,50,.75)">
            <animate attributeName="opacity" values=".75;0;.75" dur="1.7s" repeatCount="indefinite" begin=".7s"/>
            <animate attributeName="cy" values="148;115;148" dur="1.7s" repeatCount="indefinite" begin=".7s"/>
          </circle>
          <g transform="translate(152,150)">
            <ellipse cx="34" cy="100" rx="34" ry="20" fill="#2e6080"/>
            <rect x="16" y="48" width="36" height="58" rx="9" fill="#3d7a9a"/>
            <rect x="26" y="34" width="16" height="18" rx="7" fill="#c27850"/>
            <ellipse cx="34" cy="23" rx="20" ry="21" fill="#c27850"/>
            <ellipse cx="34" cy="7" rx="20" ry="13" fill="#1e100a"/>
            <circle cx="26" cy="23" r="5.5" fill="#1e100a"/>
            <circle cx="42" cy="23" r="5.5" fill="#1e100a"/>
            <circle cx="27" cy="21.5" r="2.2" fill="white"/>
            <circle cx="43" cy="21.5" r="2.2" fill="white"/>
            <ellipse cx="34" cy="33" rx="5" ry="4" fill="#1e100a"/>
            <ellipse cx="34" cy="33.5" rx="3.5" ry="2.5" fill="#8a3028"/>
            <path d="M16 56 Q4 70 6 88" stroke="#c27850" strokeWidth="8" fill="none" strokeLinecap="round"/>
            <path d="M52 56 Q64 70 62 88" stroke="#c27850" strokeWidth="8" fill="none" strokeLinecap="round"/>
          </g>
          <g transform="translate(296,120)">
            <ellipse cx="48" cy="135" rx="56" ry="26" fill="#8a3040"/>
            <path d="M 5 100 Q 8 118 8 134 Q 28 148 48 150 Q 68 148 88 134 Q 88 118 91 100 Q 70 86 48 84 Q 26 86 5 100 Z" fill="#a04060"/>
            <path d="M 5 100 Q -2 114 1 134 Q 9 150 22 158" stroke="rgba(240,163,0,.65)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <rect x="26" y="54" width="44" height="52" rx="12" fill="#a04060"/>
            <rect x="26" y="54" width="44" height="26" rx="10" fill="#7a2848"/>
            <rect x="38" y="38" width="20" height="22" rx="9" fill="#d09060"/>
            <ellipse cx="48" cy="26" rx="24" ry="25" fill="#d09060"/>
            <ellipse cx="48" cy="6" rx="15" ry="12" fill="#e8e0d0"/>
            <ellipse cx="48" cy="3" rx="9.5" ry="8" fill="#f2ece4"/>
            <circle cx="52" cy="1" r="2.5" fill="rgba(240,163,0,.7)"/>
            <circle cx="48" cy="20" r="2.5" fill="#cc1a1a"/>
            <circle cx="39" cy="26" r="8" fill="none" stroke="#7a4820" strokeWidth="1.8"/>
            <circle cx="57" cy="26" r="8" fill="none" stroke="#7a4820" strokeWidth="1.8"/>
            <path d="M47 26 L49 26" stroke="#7a4820" strokeWidth="1.8"/>
            <path d="M31 24 Q26 22 24 24" stroke="#7a4820" strokeWidth="1.5" fill="none"/>
            <path d="M65 24 Q70 22 72 24" stroke="#7a4820" strokeWidth="1.5" fill="none"/>
            <path d="M34 27 Q39 24 44 27" stroke="#3a1e0a" strokeWidth="1.5" fill="none"/>
            <path d="M52 27 Q57 24 62 27" stroke="#3a1e0a" strokeWidth="1.5" fill="none"/>
            <path d="M 30 33 Q 28 37 30 40" stroke="rgba(180,110,70,.45)" strokeWidth="1.2" fill="none"/>
            <path d="M 66 33 Q 68 37 66 40" stroke="rgba(180,110,70,.45)" strokeWidth="1.2" fill="none"/>
            <path d="M 36 36 Q 48 44 60 36" stroke="#3a1e0a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M26 65 Q10 52 -8 42 Q-18 34 -14 26" stroke="#d09060" strokeWidth="9" fill="none" strokeLinecap="round"/>
            <circle cx="-14" cy="24" r="5" fill="#d09060"/>
            <path d="M70 65 Q86 50 98 38" stroke="#d09060" strokeWidth="9" fill="none" strokeLinecap="round"/>
            <circle cx="100" cy="36" r="5" fill="#d09060"/>
            <path d="M 32 55 Q 48 64 64 55" stroke="rgba(240,163,0,.55)" strokeWidth="1.5" fill="none"/>
            <ellipse cx="-12" cy="26" rx="6" ry="3" fill="none" stroke="rgba(240,163,0,.5)" strokeWidth="1.5" transform="rotate(-20,-12,26)"/>
            <ellipse cx="100" cy="37" rx="6" ry="3" fill="none" stroke="rgba(240,163,0,.5)" strokeWidth="1.5" transform="rotate(30,100,37)"/>
          </g>
          <g transform="translate(508,154)">
            <ellipse cx="34" cy="96" rx="30" ry="18" fill="#2e804a"/>
            <rect x="16" y="46" width="36" height="56" rx="9" fill="#3a9a58"/>
            <rect x="26" y="32" width="16" height="18" rx="7" fill="#c27850"/>
            <ellipse cx="34" cy="21" rx="19" ry="20" fill="#c27850"/>
            <ellipse cx="34" cy="6" rx="19" ry="12" fill="#1e100a"/>
            <ellipse cx="20" cy="8" rx="6" ry="5" fill="#1e100a"/>
            <ellipse cx="48" cy="8" rx="6" ry="5" fill="#1e100a"/>
            <circle cx="20" cy="4" r="3" fill="#cc1a5a"/>
            <circle cx="48" cy="4" r="3" fill="#cc1a5a"/>
            <path d="M 25 22 Q 29 18 33 22" stroke="#1e100a" strokeWidth="1.8" fill="rgba(30,16,10,.5)" strokeLinecap="round"/>
            <path d="M 35 22 Q 39 18 43 22" stroke="#1e100a" strokeWidth="1.8" fill="rgba(30,16,10,.5)" strokeLinecap="round"/>
            <line x1="26" y1="19" x2="24" y2="16" stroke="#1e100a" strokeWidth="1"/>
            <line x1="29" y1="18" x2="28" y2="15" stroke="#1e100a" strokeWidth="1"/>
            <line x1="36" y1="19" x2="35" y2="16" stroke="#1e100a" strokeWidth="1"/>
            <line x1="40" y1="18" x2="41" y2="15" stroke="#1e100a" strokeWidth="1"/>
            <path d="M 26 29 Q 34 36 42 29" stroke="#c24040" strokeWidth="1.5" fill="rgba(194,64,64,.4)" strokeLinecap="round"/>
            <ellipse cx="23" cy="28" rx="5" ry="3" fill="rgba(210,100,90,.22)"/>
            <ellipse cx="45" cy="28" rx="5" ry="3" fill="rgba(210,100,90,.22)"/>
            <path d="M52 56 Q62 62 65 76 Q67 88 60 90" stroke="#c27850" strokeWidth="8" fill="none" strokeLinecap="round"/>
            <circle cx="60" cy="92" r="6" fill="#c27850"/>
            <path d="M 16 56 Q 8 68 10 82" stroke="#c27850" strokeWidth="8" fill="none" strokeLinecap="round"/>
          </g>
          <text x="108" y="56" fontSize="13" fill="rgba(255,220,80,.45)" fontFamily="Georgia,serif">✦</text>
          <text x="620" y="50" fontSize="11" fill="rgba(255,220,80,.38)" fontFamily="Georgia,serif">✦</text>
          <text x="60" y="112" fontSize="9" fill="rgba(255,220,80,.28)" fontFamily="Georgia,serif">✦</text>
          <text x="672" y="105" fontSize="9" fill="rgba(255,220,80,.28)" fontFamily="Georgia,serif">✦</text>
          <text x="148" y="30" fontSize="7" fill="rgba(255,220,80,.3)" fontFamily="Georgia,serif">✦</text>
          <text x="580" y="28" fontSize="7" fill="rgba(255,220,80,.25)" fontFamily="Georgia,serif">✦</text>
        </svg>
      </div>
    </section>
  );
}
