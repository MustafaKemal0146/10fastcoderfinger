import React from 'react';
import { motion } from 'framer-motion';

interface LanguageSelectorProps {
  selectedLanguage: string;
  selectedDifficulty: string;
  onLanguageChange: (language: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

const languages = [
  { id: 'csharp', name: 'C#', icon: '⚡' },
  { id: 'python', name: 'Python', icon: '🐍' },
];

const difficulties = [
  { id: 'easy', name: 'Easy', color: 'text-green-400' },
  { id: 'medium', name: 'Medium', color: 'text-yellow-400' },
  { id: 'hard', name: 'Hard', color: 'text-red-400' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  selectedDifficulty,
  onLanguageChange,
  onDifficultyChange
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Select Challenge</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Programming Language
          </label>
          <div className="space-y-2">
            {languages.map((language) => (
              <motion.button
                key={language.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onLanguageChange(language.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                  selectedLanguage === language.id
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{language.icon}</span>
                <span className="font-medium">{language.name}</span>
                {selectedLanguage === language.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-blue-400 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Difficulty Level
          </label>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <motion.button
                key={difficulty.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDifficultyChange(difficulty.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                  selectedDifficulty === difficulty.id
                    ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                    : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className={`font-bold ${difficulty.color}`}>●</span>
                <span className="font-medium">{difficulty.name}</span>
                {selectedDifficulty === difficulty.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-purple-400 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};