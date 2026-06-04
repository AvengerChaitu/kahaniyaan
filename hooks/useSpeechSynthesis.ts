"use client";

import { useState, useCallback, useRef } from "react";

const TTS_API_BASE = "https://Chaitanyadasari99-daadima.hf.space";
const PRELOAD_AHEAD = 3;

function splitChunks(text: string, maxWords = 30): string[] {
  const sentences = text
    .split(/(?<=[.!?।])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const chunks: string[] = [];
  for (const s of sentences) {
    const words = s.split(/\s+/);
    if (words.length <= maxWords) {
      chunks.push(s);
    } else {
      for (let i = 0; i < words.length; i += maxWords) {
        chunks.push(words.slice(i, i + maxWords).join(" "));
      }
    }
  }
  return chunks;
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chunksRef = useRef<Map<number, string>>(new Map());
  const nextPlayIdxRef = useRef(0);
  const totalChunksRef = useRef(0);
  const langRef = useRef("");
  const stoppedRef = useRef(false);
  const pausedRef = useRef(false);
  const onEndRef = useRef<(() => void) | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlsRef = useRef<string[]>([]);

  const cleanup = useCallback(() => {
    stoppedRef.current = true;
    pausedRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    chunksRef.current.clear();
    nextPlayIdxRef.current = 0;
    totalChunksRef.current = 0;
    blobUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    blobUrlsRef.current = [];
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  }, []);

  const tryPlayNext = useCallback(() => {
    while (!stoppedRef.current && !pausedRef.current) {
      const url = chunksRef.current.get(nextPlayIdxRef.current);
      if (!url) return;

      chunksRef.current.delete(nextPlayIdxRef.current);
      nextPlayIdxRef.current++;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        URL.revokeObjectURL(url);
        if (!stoppedRef.current) tryPlayNext();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        if (!stoppedRef.current) tryPlayNext();
      };

      audio.play();
      setIsSpeaking(true);
      return;
    }

    if (nextPlayIdxRef.current >= totalChunksRef.current && !stoppedRef.current) {
      setIsSpeaking(false);
      onEndRef.current?.();
    }
  }, []);

  const speak = useCallback(
    async (text: string, language: string, onEnd?: () => void) => {
      cleanup();
      setIsLoading(true);
      setError(null);

      stoppedRef.current = false;
      pausedRef.current = false;
      langRef.current = language;
      onEndRef.current = onEnd || null;

      const chunks = splitChunks(text.replace(/<[^>]*>/g, ""));
      if (chunks.length === 0) {
        setIsLoading(false);
        setError("No text to speak");
        return;
      }

      totalChunksRef.current = chunks.length;
      let fetchIdx = 0;

      const fetchNext = async () => {
        if (stoppedRef.current || fetchIdx >= chunks.length) return;
        const idx = fetchIdx++;

        try {
          const sentence = chunks[idx];
          const url = `${TTS_API_BASE}/tts?text=${encodeURIComponent(sentence)}&lang=${encodeURIComponent(language)}`;
          const res = await fetch(url);
          const blob = await res.blob();
          const objUrl = URL.createObjectURL(blob);

          if (stoppedRef.current) {
            URL.revokeObjectURL(objUrl);
            return;
          }

          blobUrlsRef.current.push(objUrl);
          chunksRef.current.set(idx, objUrl);

          if (idx === 0) {
            setIsLoading(false);
            tryPlayNext();
          }

          fetchNext();
        } catch {
          if (!stoppedRef.current) fetchNext();
        }
      };

      for (let i = 0; i < Math.min(PRELOAD_AHEAD, chunks.length); i++) {
        fetchNext();
      }
    },
    [cleanup, tryPlayNext]
  );

  const pause = useCallback(() => {
    pausedRef.current = true;
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsPaused(false);
      });
    } else if (!audioRef.current && !stoppedRef.current) {
      tryPlayNext();
    }
  }, [tryPlayNext]);

  const stop = useCallback(() => {
    cleanup();
  }, [cleanup]);

  const togglePlay = useCallback(
    (text: string, language: string, onEnd?: () => void) => {
      if (isLoading) return;
      if (isSpeaking && !isPaused) {
        pause();
      } else if (isPaused) {
        resume();
      } else {
        speak(text, language, onEnd);
      }
    },
    [isLoading, isSpeaking, isPaused, speak, pause, resume]
  );

  return {
    isSpeaking,
    isPaused,
    isLoading,
    error,
    supported: true,
    speak,
    pause,
    resume,
    stop,
    togglePlay,
  };
}
