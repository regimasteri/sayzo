import React from 'react';
import { Star, Play, Trash } from 'lucide-react';
import { Phrase } from '../types';

interface PhraseCardProps {
  phrase: Phrase;
  onSpeak: (text: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  categoryColor: string;
}

const PhraseCard: React.FC<PhraseCardProps> = ({ 
  phrase, 
  onSpeak, 
  onToggleFavorite, 
  onDelete,
  categoryColor
}) => {
  const handleSpeak = () => {
    onSpeak(phrase.text);
  };

  return (
    <div 
      className={`relative group p-4 rounded-xl ${categoryColor} bg-opacity-10 dark:bg-opacity-20 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 flex flex-col`}
    >
      <div className="flex justify-between items-start mb-2">
        <button
          onClick={() => onToggleFavorite(phrase.id)}
          className={`p-1 rounded-full ${phrase.isFavorite ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'} transition-colors`}
          aria-label={phrase.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star className="h-4 w-4" fill={phrase.isFavorite ? "currentColor" : "none"} />
        </button>
        
        <button
          onClick={() => onDelete(phrase.id)}
          className="p-1 rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete phrase"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
      
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 flex-grow line-clamp-2">
        {phrase.text}
      </p>
      
      <button
        onClick={handleSpeak}
        className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 ${categoryColor} text-white font-medium hover:opacity-90 active:scale-95 transition-all`}
        aria-label={`Speak: ${phrase.text}`}
      >
        <Play className="h-4 w-4" />
        <span>Speak</span>
      </button>
    </div>
  );
};

export default PhraseCard;