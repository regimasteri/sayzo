import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import { Phrase } from '../types';
import defaultPhrases from '../data/defaultPhrases';

const usePhrases = () => {
  const [phrases, setPhrases] = useLocalStorage<Phrase[]>('sayzo-phrases', defaultPhrases);

  // Add a new phrase
  const addPhrase = useCallback((phrase: Omit<Phrase, 'id' | 'usageCount' | 'lastUsed'>) => {
    setPhrases(prev => [
      ...prev, 
      { 
        ...phrase, 
        id: Date.now().toString(), 
        usageCount: 0,
        lastUsed: undefined
      }
    ]);
  }, [setPhrases]);

  // Update an existing phrase
  const updatePhrase = useCallback((id: string, updates: Partial<Omit<Phrase, 'id'>>) => {
    setPhrases(prev => 
      prev.map(phrase => 
        phrase.id === id ? { ...phrase, ...updates } : phrase
      )
    );
  }, [setPhrases]);

  // Delete a phrase
  const deletePhrase = useCallback((id: string) => {
    setPhrases(prev => prev.filter(phrase => phrase.id !== id));
  }, [setPhrases]);

  // Toggle favorite status
  const toggleFavorite = useCallback((id: string) => {
    setPhrases(prev => 
      prev.map(phrase => 
        phrase.id === id ? { ...phrase, isFavorite: !phrase.isFavorite } : phrase
      )
    );
  }, [setPhrases]);

  // Log phrase usage
  const logUsage = useCallback((id: string) => {
    setPhrases(prev => 
      prev.map(phrase => 
        phrase.id === id 
          ? { 
              ...phrase, 
              usageCount: phrase.usageCount + 1, 
              lastUsed: new Date() 
            } 
          : phrase
      )
    );
  }, [setPhrases]);

  // Get phrases by category
  const getPhrasesByCategory = useCallback((category: string) => {
    return phrases.filter(phrase => phrase.category === category);
  }, [phrases]);

  // Get favorite phrases
  const getFavorites = useCallback(() => {
    return phrases.filter(phrase => phrase.isFavorite);
  }, [phrases]);

  // Get recently used phrases
  const getRecentlyUsed = useCallback((limit = 5) => {
    return [...phrases]
      .filter(phrase => phrase.lastUsed)
      .sort((a, b) => {
        const dateA = a.lastUsed ? new Date(a.lastUsed).getTime() : 0;
        const dateB = b.lastUsed ? new Date(b.lastUsed).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit);
  }, [phrases]);

  // Get most used phrases
  const getMostUsed = useCallback((limit = 5) => {
    return [...phrases]
      .filter(phrase => phrase.usageCount > 0)
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, limit);
  }, [phrases]);

  return {
    phrases,
    addPhrase,
    updatePhrase,
    deletePhrase,
    toggleFavorite,
    logUsage,
    getPhrasesByCategory,
    getFavorites,
    getRecentlyUsed,
    getMostUsed
  };
};

export default usePhrases;