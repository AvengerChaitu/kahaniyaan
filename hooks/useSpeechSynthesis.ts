"use client";

import { useState, useCallback, useRef } from "react";

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlsRef = useRef<string[]>([]);
  const nextPlayIdxRef = useRef(0);
  const totalChunksRef = useRef(0);
  const stoppedRef = useRef(false);
  const pausedRef = useRef(false);
  const onEndRef = useRef<(() => void) | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cleanup = useCallback(() => {
    stoppedRef.current = true;
    pausedRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    urlsRef.current = [];
    nextPlayIdxRef.current = 0;
    totalChunksRef.current = 0;
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  }, []);

  const tryPlayNext = useCallback(function tryPlay() {
    while (!stoppedRef.current && !pausedRef.current) {
      const url = urlsRef.current[nextPlayIdxRef.current];
      if (!url) return;

      nextPlayIdxRef.current++;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        if (!stoppedRef.current) tryPlay();
      };
      audio.onerror = () => {
        if (!stoppedRef.current) tryPlay();
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
      onEndRef.current = onEnd || null;

      try {
        const params = new URLSearchParams({ text, lang: language });
        const res = await fetch(`/api/tts-audio?${params}`);

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "TTS failed");
        }

        const data = await res.json();
        const urls = (data.urls || []).filter((u: string) => u);

        if (urls.length === 0) {
          setIsLoading(false);
          setError("No audio generated");
          return;
        }

        urlsRef.current = urls;
        totalChunksRef.current = urls.length;
        setIsLoading(false);
        tryPlayNext();
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : "TTS failed");
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
    } else if (!audioRef.current && !stoppedRef.current && urlsRef.current.length > 0) {
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
