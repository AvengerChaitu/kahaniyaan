"use client";

import { useState, useCallback, useRef } from "react";

const TTS_API_BASE = "https://Chaitanyadasari99-daadima.hf.space";

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const onEndRef = useRef<(() => void) | null>(null);

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const speak = useCallback(
    async (text: string, language: string, onEnd?: () => void) => {
      cleanup();
      setError(null);
      setIsLoading(true);

      onEndRef.current = onEnd || null;

      try {
        const url = `${TTS_API_BASE}/tts?text=${encodeURIComponent(text)}&lang=${encodeURIComponent(language)}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`TTS service error: ${res.statusText}`);
        }

        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        blobUrlRef.current = audioUrl;

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          cleanup();
          onEndRef.current?.();
        };
        audio.onerror = () => {
          setError("Audio playback failed");
          cleanup();
        };

        await audio.play();
        setIsSpeaking(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "TTS request failed");
      } finally {
        setIsLoading(false);
      }
    },
    [cleanup]
  );

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
      setIsPaused(false);
    }
  }, []);

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
