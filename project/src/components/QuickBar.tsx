import React from 'react';
import { PlayCircle, Mic } from 'lucide-react';
import { Phrase } from '../types';

interface QuickBarProps {
  recentPhrases: Phrase[];
  onSpeak: (text: string) => void;
  customText: string;
  onCustomTextChange: (text: string) => void;
  onSpeakCustomText: () => void;
  speaking: boolean;
  onListenStart?: () => void;
  isListening?: boolean;
}

const QuickBar: React.FC<QuickBarProps> = ({
  recentPhrases,
  onSpeak,
  customText,
  onCustomTextChange,
  onSpeakCustomText,
  speaking,
  onListenStart,
  isListening
}) => {
  return (
    <div className="sticky bottom-0 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-800 py-3 transition-colors">
      <div className="container mx-auto px-4">
        {/* Recent phrases */}
        {recentPhrases.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {recentPhrases.map(phrase => (
              <button
                key={phrase.id}
                onClick={() => onSpeak(phrase.text)}
                className="flex-shrink-0 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm whitespace-nowrap hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
              >
                {phrase.text.length > 25 ? `${phrase.text.substring(0, 25)}...` : phrase.text}
              </button>
            ))}
          </div>
        )}
        
        {/* Input area */}
        <div className="flex items-center gap-2 mt-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={customText}
              onChange={(e) => onCustomTextChange(e.target.value)}
              placeholder="Type a custom message..."
              className="w-full px-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            
            <button
              onClick={onSpeakCustomText}
              disabled={!customText || speaking}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full 
                ${speaking ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400 animate-pulse' : 
                  customText ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50' : 
                  'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'} 
                transition-colors`}
              aria-label={speaking ? "Speaking..." : "Speak custom text"}
            >
              <PlayCircle className="h-5 w-5" />
            </button>
          </div>
          
          {onListenStart && (
            <button
              onClick={onListenStart}
              className={`p-3 rounded-full 
                ${isListening ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400 animate-pulse' : 
                  'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50'} 
                transition-colors`}
              aria-label={isListening ? "Listening..." : "Start listening"}
            >
              <Mic className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickBar;