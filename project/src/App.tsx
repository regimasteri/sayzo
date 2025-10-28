import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import QuickBar from './components/QuickBar';
import VoiceSettings from './components/VoiceSettings';
import { ThemeProvider } from './context/ThemeContext';
import useSpeech from './hooks/useSpeech';
import usePhrases from './hooks/usePhrases';
import defaultCategories from './data/defaultCategories';
import { Category } from './types';

function App() {
  // Speech hooks and state
  const { voices, speaking, settings, updateSettings, speak, stop } = useSpeech();
  const { 
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
  } = usePhrases();
  
  const [categories] = useState<Category[]>(defaultCategories);
  const [customText, setCustomText] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Get favorite and recent phrases
  const favorites = getFavorites();
  const recentlyUsed = getRecentlyUsed(4);
  
  // Find category by ID
  const getCategoryById = (id: string): Category | undefined => {
    return categories.find(cat => cat.id === id);
  };
  
  // Handle speaking a phrase
  const handleSpeak = useCallback((text: string) => {
    speak(text);
    
    // Find and log usage for this phrase
    const phrase = phrases.find(p => p.text === text);
    if (phrase) {
      logUsage(phrase.id);
    }
  }, [speak, phrases, logUsage]);
  
  // Handle speaking custom text
  const handleSpeakCustomText = useCallback(() => {
    if (!customText) return;
    
    speak(customText);
    
    // Check if this text already exists as a phrase
    const existingPhrase = phrases.find(p => p.text.toLowerCase() === customText.toLowerCase());
    
    if (existingPhrase) {
      // Log usage for existing phrase
      logUsage(existingPhrase.id);
    } else {
      // Add to custom category if it's not already a phrase
      addPhrase({
        text: customText,
        category: 'custom',
        isFavorite: false
      });
    }
  }, [customText, speak, phrases, logUsage, addPhrase]);
  
  // Add new phrase
  const handleAddPhrase = useCallback((text: string, category: string) => {
    addPhrase({
      text,
      category,
      isFavorite: false
    });
  }, [addPhrase]);
  
  // Test voice settings
  const handleTestVoice = useCallback(() => {
    speak("This is a test of your current voice settings.");
  }, [speak]);
  
  // Start listening (placeholder for speech recognition)
  const handleListenStart = useCallback(() => {
    setIsListening(true);
    
    // This would be where speech recognition would be implemented
    // For now, we'll just simulate it with a timeout
    setTimeout(() => {
      setIsListening(false);
      setCustomText("I'm listening to you");
    }, 2000);
  }, []);
  
  // Update document title
  useEffect(() => {
    document.title = "SayZo - Voice Communication App";
  }, []);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />
        
        <MainContent
          categories={categories}
          phrases={phrases}
          favorites={favorites}
          recentlyUsed={recentlyUsed}
          onSpeak={handleSpeak}
          onToggleFavorite={toggleFavorite}
          onDeletePhrase={deletePhrase}
          onAddPhrase={handleAddPhrase}
          getCategoryById={getCategoryById}
          getPhrasesByCategory={getPhrasesByCategory}
        />
        
        <QuickBar
          recentPhrases={getMostUsed(5)}
          onSpeak={handleSpeak}
          customText={customText}
          onCustomTextChange={setCustomText}
          onSpeakCustomText={handleSpeakCustomText}
          speaking={speaking}
          onListenStart={handleListenStart}
          isListening={isListening}
        />
        
        <VoiceSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          voices={voices}
          onUpdateSettings={updateSettings}
          onTestVoice={handleTestVoice}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;