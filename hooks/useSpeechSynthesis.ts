"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const LANG_TO_BEST_VOICE: Record<string, (voices: SpeechSynthesisVoice[]) => SpeechSynthesisVoice | null> = {
  Hindi: (vs) => vs.find((v) => v.lang.startsWith("hi")) || null,
  Telugu: (vs) => vs.find((v) => v.lang.startsWith("te")) || null,
  Tamil: (vs) => vs.find((v) => v.lang.startsWith("ta")) || null,
  English: (vs) =>
    vs.find((v) => v.lang.startsWith("en-IN")) ||
    vs.find((v) => v.lang.startsWith("en-GB")) ||
    vs.find((v) => v.lang.startsWith("en-US") && v.name.includes("Mark")) ||
    vs.find((v) => v.lang.startsWith("en-US")) ||
    null,
};

function pickVoice(language: string, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const finder = LANG_TO_BEST_VOICE[language] || LANG_TO_BEST_VOICE.English;
  return finder(voices) || voices.find((v) => v.lang.startsWith(language.slice(0, 2))) || voices[0] || null;
}

function getLangTag(language: string): string {
  const map: Record<string, string> = { Hindi: "hi-IN", Telugu: "te-IN", Tamil: "ta-IN", English: "en-US" };
  return map[language] || "en-US";
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentTextRef = useRef("");

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }
    const synth = window.speechSynthesis;
    const updateVoices = () => setVoices(synth.getVoices());
    updateVoices();
    synth.addEventListener("voiceschanged", updateVoices);
    return () => synth.removeEventListener("voiceschanged", updateVoices);
  }, []);

  const speak = useCallback(
    (text: string, language: string, onEnd?: () => void) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      currentTextRef.current = text;

      const langTag = getLangTag(language);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langTag;
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      const selected = pickVoice(language, voices);
      if (selected) utterance.voice = selected;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onpause = () => setIsPaused(true);
      utterance.onresume = () => setIsPaused(false);
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
        onEnd?.();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      synth.speak(utterance);
    },
    [voices]
  );

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    utteranceRef.current = null;
  }, []);

  const togglePlay = useCallback(
    (text: string, language: string, onEnd?: () => void) => {
      if (isSpeaking && !isPaused) {
        pause();
      } else if (isPaused) {
        resume();
      } else {
        speak(text, language, onEnd);
      }
    },
    [isSpeaking, isPaused, speak, pause, resume]
  );

  return { isSpeaking, isPaused, supported, speak, pause, resume, stop, togglePlay };
}
