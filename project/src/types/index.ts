export interface Phrase {
  id: string;
  text: string;
  category: string;
  isFavorite: boolean;
  lastUsed?: Date;
  usageCount: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
}

export type ThemeMode = 'light' | 'dark';