import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Category } from '../types';

interface AddPhraseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhrase: (text: string, category: string) => void;
  categories: Category[];
}

const AddPhraseModal: React.FC<AddPhraseModalProps> = ({
  isOpen,
  onClose,
  onAddPhrase,
  categories
}) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || '');
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && category) {
      onAddPhrase(text.trim(), category);
      setText('');
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md transition-colors">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Phrase</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="phrase-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phrase
            </label>
            <textarea
              id="phrase-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your phrase here..."
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label htmlFor="phrase-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              id="phrase-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Add Phrase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPhraseModal;