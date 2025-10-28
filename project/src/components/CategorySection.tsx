import React from 'react';
import { ChevronRight } from 'lucide-react';
import PhraseCard from './PhraseCard';
import { Phrase, Category } from '../types';

interface CategorySectionProps {
  category: Category;
  phrases: Phrase[];
  onSpeak: (text: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onShowAll?: () => void;
  limit?: number;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  phrases,
  onSpeak,
  onToggleFavorite,
  onDelete,
  onShowAll,
  limit
}) => {
  const displayPhrases = limit ? phrases.slice(0, limit) : phrases;
  
  if (phrases.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <span className={`inline-block w-3 h-3 rounded-full ${category.color} mr-2`}></span>
          {category.name}
        </h2>
        
        {onShowAll && phrases.length > (limit || 0) && (
          <button 
            onClick={onShowAll}
            className="text-sm text-blue-600 dark:text-blue-400 flex items-center hover:underline"
            aria-label={`Show all ${category.name}`}
          >
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayPhrases.map(phrase => (
          <PhraseCard
            key={phrase.id}
            phrase={phrase}
            onSpeak={onSpeak}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
            categoryColor={category.color}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;