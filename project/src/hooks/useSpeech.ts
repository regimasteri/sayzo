import { useState, useEffect, useCallback } from 'react';
import { VoiceSettings } from '../types';

const useSpeech = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [settings, setSettings] = useState<VoiceSettings>({
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: null
  });

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        // Set default voice (prefer English voices if available)
        const defaultVoice = availableVoices.find(voice => 
          voice.lang.includes('en-') && voice.localService
        ) || availableVoices[0];
        
        setSettings(prev => ({
          ...prev,
          voice: defaultVoice
        }));
      }
    };

    // Load voices on init
    loadVoices();

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Cleanup
    return () => {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  }, []);

  // Speak text
  const speak = useCallback((text: string) => {
    if (!text || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply settings
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    if (settings.voice) {
      utterance.voice = settings.voice;
    }

    // Set event handlers
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    // Speak
    window.speechSynthesis.speak(utterance);
  }, [settings]);

  // Stop speaking
  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return { 
    voices, 
    speaking, 
    settings, 
    updateSettings, 
    speak, 
    stop 
  };
};

export default useSpeech;