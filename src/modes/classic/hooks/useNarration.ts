/**
 * Audio Narration Hook using Web Speech API
 *
 * Provides text-to-speech functionality for storybook reading
 * Supports Korean and English narration with voice selection
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface NarrationOptions {
  language: 'ko' | 'en';
  rate?: number;    // 0.5 to 2.0 (default: 1.0)
  pitch?: number;   // 0 to 2.0 (default: 1.0)
  volume?: number;  // 0 to 1.0 (default: 1.0)
}

export interface NarrationState {
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  currentWordIndex: number;
  progress: number;
}

export function useNarration() {
  const [state, setState] = useState<NarrationState>({
    isPlaying: false,
    isPaused: false,
    isSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
    currentWordIndex: -1,
    progress: 0
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textRef = useRef<string>('');

  // Get available voices for the language
  const getVoice = useCallback((language: 'ko' | 'en'): SpeechSynthesisVoice | null => {
    if (!state.isSupported) return null;

    const voices = window.speechSynthesis.getVoices();

    // Priority order for voices
    const languageMap: Record<string, string[]> = {
      ko: ['ko-KR', 'ko_KR', 'Korean'],
      en: ['en-US', 'en-GB', 'en_US', 'English']
    };

    const priorities = languageMap[language] || [];

    // Try to find voice matching priorities
    for (const priority of priorities) {
      const voice = voices.find(v =>
        v.lang.includes(priority) || v.name.includes(priority)
      );
      if (voice) return voice;
    }

    // Fallback: any voice with matching language code
    return voices.find(v => v.lang.startsWith(language)) || voices[0] || null;
  }, [state.isSupported]);

  // Start narration
  const speak = useCallback((text: string, options: NarrationOptions) => {
    if (!state.isSupported || !text.trim()) {
      console.warn('Speech synthesis not supported or no text provided');
      return;
    }

    // Cancel any existing narration
    window.speechSynthesis.cancel();

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getVoice(options.language);

    if (voice) {
      utterance.voice = voice;
    }

    utterance.lang = options.language === 'ko' ? 'ko-KR' : 'en-US';
    utterance.rate = options.rate ?? 0.9; // Slightly slower for kids
    utterance.pitch = options.pitch ?? 1.0;
    utterance.volume = options.volume ?? 1.0;

    // Event listeners
    utterance.onstart = () => {
      setState(prev => ({ ...prev, isPlaying: true, isPaused: false, progress: 0 }));
    };

    utterance.onend = () => {
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        progress: 100,
        currentWordIndex: -1
      }));
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        currentWordIndex: -1
      }));
    };

    utterance.onpause = () => {
      setState(prev => ({ ...prev, isPaused: true }));
    };

    utterance.onresume = () => {
      setState(prev => ({ ...prev, isPaused: false }));
    };

    // Track progress (approximate)
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const words = text.split(/\s+/);
        const wordIndex = Math.floor((event.charIndex / text.length) * words.length);
        const progress = (event.charIndex / text.length) * 100;

        setState(prev => ({
          ...prev,
          currentWordIndex: wordIndex,
          progress: Math.min(progress, 99)
        }));
      }
    };

    utteranceRef.current = utterance;
    textRef.current = text;

    // Start speaking
    window.speechSynthesis.speak(utterance);
  }, [state.isSupported, getVoice]);

  // Pause narration
  const pause = useCallback(() => {
    if (state.isSupported && state.isPlaying) {
      window.speechSynthesis.pause();
    }
  }, [state.isSupported, state.isPlaying]);

  // Resume narration
  const resume = useCallback(() => {
    if (state.isSupported && state.isPaused) {
      window.speechSynthesis.resume();
    }
  }, [state.isSupported, state.isPaused]);

  // Stop narration
  const stop = useCallback(() => {
    if (state.isSupported) {
      window.speechSynthesis.cancel();
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        progress: 0,
        currentWordIndex: -1
      }));
    }
  }, [state.isSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [state.isSupported]);

  // Load voices (some browsers load voices asynchronously)
  useEffect(() => {
    if (state.isSupported) {
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };

      loadVoices();

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, [state.isSupported]);

  return {
    ...state,
    speak,
    pause,
    resume,
    stop,
    getAvailableVoices: () => state.isSupported ? window.speechSynthesis.getVoices() : []
  };
}
