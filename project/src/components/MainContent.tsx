import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import CategorySection from './CategorySection';
import AddPhraseModal from './AddPhraseModal';
import { Phrase, Category } from '../types';

interface MainContentProps {
  categories: Category[];
  phrases: Phrase[];
  favorites: Phrase[];
  recentlyUsed: Phrase[];
  onSpeak: (text: string) => void;
  onToggleFavorite: (id: string) => void;
  onDeletePhrase: (id: string) => void;
  onAddPhrase: (text: string, category: string) => void;
  getCategoryById: (id: string) => Category | undefined;
  getPhrasesByCategory: (category: string) => Phrase[];
}

const MainContent: React.FC<MainContentProps> = ({
  categories,
  phrases,
  favorites,
  recentlyUsed,
  onSpeak,
  onToggleFavorite,
  onDeletePhrase,
  onAddPhrase,
  getCategoryById,
  getPhrasesByCategory
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Find category for each phrase
  const getCategoryForPhrase = (phrase: Phrase): Category => {
    return getCategoryById(phrase.category) || categories[0];
  };

  return (
    <main className="container mx-auto px-4 py-6 pb-32">
      {/* Add phrase button */}
      <div className="fixed bottom-20 right-4 z-10">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
          aria-label="Add new phrase"
        >
          <PlusCircle className="h-6 w-6" />
        </button>
      </div>
      
      {/* Favorites section */}
      {favorites.length > 0 && (
        <CategorySection
          category={{ id: 'favorites', name: 'Favorites', color: 'bg-amber-500', icon: 'star' }}
          phrases={favorites}
          onSpeak={onSpeak}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDeletePhrase}
          limit={4}
          onShowAll={() => {/* Navigate to favorites view */}}
        />
      )}
      
      {/* Recently used section */}
      {recentlyUsed.length > 0 && (
        <CategorySection
          category={{ id: 'recent', name: 'Recently Used', color: 'bg-purple-500', icon: 'clock' }}
          phrases={recentlyUsed}
          onSpeak={onSpeak}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDeletePhrase}
          limit={4}
          onShowAll={() => {/* Navigate to recent view */}}
        />
      )}
      
      {/* Category sections */}
      {categories.map(category => {
        const categoryPhrases = getPhrasesByCategory(category.id);
        
        if (categoryPhrases.length === 0) return null;
        
        return (
          <CategorySection
            key={category.id}
            category={category}
            phrases={categoryPhrases}
            onSpeak={onSpeak}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDeletePhrase}
            limit={8}
            onShowAll={() => {/* Navigate to category view */}}
          />
        );
      })}
      
      {/* If no phrases, show empty state */}
      {phrases.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
            <PlusCircle className="h-12 w-12" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No phrases yet</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            Add your first phrase to get started with SayZo. You'll be able to speak it with just a tap.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Phrase
          </button>
        </div>
      )}
      
      {/* Add phrase modal */}
      <AddPhraseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPhrase={onAddPhrase}
        categories={categories}
      />
    </main>
  );
};

export default MainContent;