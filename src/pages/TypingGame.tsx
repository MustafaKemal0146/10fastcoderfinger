import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { LanguageSelector } from '../components/LanguageSelector';
import { CodeDisplay } from '../components/CodeDisplay';
import { TypingInput } from '../components/TypingInput';
import { StatsPanel } from '../components/StatsPanel';
import { GameControls } from '../components/GameControls';
import { AchievementPanel } from '../components/achievements/AchievementPanel';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { mockCodeSnippets } from '../data/codeSnippets';
import { CodeSnippet } from '../types';

export const TypingGame: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('csharp');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [showAchievements, setShowAchievements] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const { state, setSnippet, updateInput, startGame, resetGame } = useGame();
  const { user } = useAuth();

  // Get filtered snippets based on selected language and difficulty
  const getFilteredSnippets = () => {
    return mockCodeSnippets.filter(
      snippet => 
        snippet.language === selectedLanguage && 
        snippet.difficulty === selectedDifficulty
    );
  };

  // Select a random snippet from filtered results
  const selectRandomSnippet = () => {
    const filteredSnippets = getFilteredSnippets();
    if (filteredSnippets.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredSnippets.length);
      setSnippet(filteredSnippets[randomIndex]);
    }
  };

  // Initialize with a random snippet
  useEffect(() => {
    selectRandomSnippet();
  }, [selectedLanguage, selectedDifficulty]);

  // Show confetti when game is completed
  useEffect(() => {
    if (state.state === 'completed') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [state.state]);

  const handleNewChallenge = () => {
    selectRandomSnippet();
    resetGame();
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    resetGame();
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    resetGame();
  };

  if (showAchievements) {
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setShowAchievements(false)}
            className="text-blue-400 hover:text-blue-300 mb-4"
          >
            ← Back to Game
          </button>
        </div>
        <AchievementPanel />
      </div>
    );
  }

  return (
    <div>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-8"
        >
          {/* Language and Difficulty Selection */}
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            selectedDifficulty={selectedDifficulty}
            onLanguageChange={handleLanguageChange}
            onDifficultyChange={handleDifficultyChange}
          />

          {state.currentSnippet && (
            <>
              {/* Current Challenge Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {state.currentSnippet.title}
                </h2>
                <p className="text-gray-400">
                  {state.currentSnippet.description}
                </p>
                <div className="flex items-center justify-center space-x-4 mt-3">
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                    {selectedLanguage.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedDifficulty === 'easy' ? 'bg-green-600/20 text-green-300' :
                    selectedDifficulty === 'medium' ? 'bg-yellow-600/20 text-yellow-300' :
                    'bg-red-600/20 text-red-300'
                  }`}>
                    {selectedDifficulty.toUpperCase()}
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content - Code Display and Input */}
                <div className="lg:col-span-3 space-y-6">
                  <CodeDisplay
                    code={state.currentSnippet.code}
                    userInput={state.userInput}
                    currentIndex={state.stats.currentIndex}
                  />
                  
                  <TypingInput
                    value={state.userInput}
                    onChange={updateInput}
                    disabled={state.state === 'completed'}
                    state={state.state}
                  />
                </div>

                {/* Sidebar - Stats and Controls */}
                <div className="lg:col-span-1 space-y-6">
                  <StatsPanel stats={state.stats} />
                  
                  <GameControls
                    state={state.state}
                    onStart={startGame}
                    onReset={resetGame}
                    onNewChallenge={handleNewChallenge}
                    isCompleted={state.stats.isComplete}
                  />

                  {user && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAchievements(true)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 rounded-lg transition-all"
                    >
                      <span className="text-white font-medium">View Achievements</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </>
          )}

          {!state.currentSnippet && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400">
                <p>Loading challenge...</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};