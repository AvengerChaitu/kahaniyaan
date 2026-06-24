"use client";

import { useState, useEffect, useRef } from "react";

const TRACK_DURATION = 480;

export default function AudioDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress,  setProgress]  = useState(32);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const togglePlay = () => {
    const playing = !isPlaying;
    if (timerRef.current) clearInterval(timerRef.current);
    if (playing) {
      timerRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(timerRef.current!); setIsPlaying(false); return 0; }
          return Math.min(100, p + 0.25);
        });
      }, 80);
    }
    setIsPlaying(playing);
  };

  const elapsed = Math.round((progress / 100) * TRACK_DURATION);
  const timeDisplay = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <section className="dm-audio-demo">
      <div className="dm-audio-card">
        <div className="dm-audio-header">
          <span><span>🎧</span> Listen before you create</span>
          <a href="#themes" className="dm-link-pill">View all stories →</a>
        </div>
        <div className="dm-audio-body">
          <div className="dm-audio-art">
            <img src="/dadima/audio-track-artwork.png" alt="The Clever Elephant story artwork" />
          </div>
          <div className="dm-audio-info">
            <div className="dm-audio-title">The Clever Elephant</div>
            <div className="dm-audio-meta">
              <span>Hindi</span>
              <span className="dm-dot" />
              <span>8 min</span>
              <span className="dm-dot" />
              <span>Bedtime</span>
            </div>
            <div className="dm-track">
              <div className="dm-track-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="dm-track-time">
              <span>{timeDisplay}</span>
              <span>08:00</span>
            </div>
          </div>
          <div className="dm-audio-controls">
            <button className="dm-skip-btn" aria-label="Previous">⏮</button>
            <button
              className={`dm-play-btn${isPlaying ? " dm-play-btn--playing" : ""}`}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <span style={{ marginLeft: isPlaying ? 0 : 2 }}>{isPlaying ? "⏸" : "▶"}</span>
            </button>
            <button className="dm-skip-btn" aria-label="Next">⏭</button>
          </div>
        </div>
      </div>
    </section>
  );
}
