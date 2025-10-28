import React from 'react';
import { X } from 'lucide-react';
import { VoiceSettings as VoiceSettingsType } from '../types';

interface VoiceSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: VoiceSettingsType;
  voices: SpeechSynthesisVoice[];
  onUpdateSettings: (settings: Partial<VoiceSettingsType>) => void;
  onTestVoice: () => void;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  voices,
  onUpdateSettings,
  onTestVoice
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transition-colors">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Voice Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close settings"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Voice selection */}
          <div>
            <label htmlFor="voice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voice
            </label>
            <select
              id="voice"
              value={settings.voice?.voiceURI || ''}
              onChange={(e) => {
                const selectedVoice = voices.find(voice => voice.voiceURI === e.target.value);
                onUpdateSettings({ voice: selectedVoice || null });
              }}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
          
          {/* Rate slider */}
          <div>
            <label htmlFor="rate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Speech Rate: {settings.rate.toFixed(1)}
            </label>
            <input
              id="rate"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate}
              onChange={(e) => onUpdateSettings({ rate: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Slow</span>
              <span>Normal</span>
              <span>Fast</span>
            </div>
          </div>
          
          {/* Pitch slider */}
          <div>
            <label htmlFor="pitch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pitch: {settings.pitch.toFixed(1)}
            </label>
            <input
              id="pitch"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => onUpdateSettings({ pitch: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Low</span>
              <span>Normal</span>
              <span>High</span>
            </div>
          </div>
          
          {/* Volume slider */}
          <div>
            <label htmlFor="volume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Volume: {settings.volume.toFixed(1)}
            </label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => onUpdateSettings({ volume: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Quiet</span>
              <span>Medium</span>
              <span>Loud</span>
            </div>
          </div>
          
          {/* Test voice button */}
          <button
            onClick={onTestVoice}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Test Voice
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceSettings;