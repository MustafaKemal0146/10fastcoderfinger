import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Header } from './components/Header';
import { TypingGame } from './pages/TypingGame';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { Multiplayer } from './pages/Multiplayer';
import { Learning } from './pages/Learning';
import { Settings } from './pages/Settings';
import { AuthModal } from './components/auth/AuthModal';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleShowAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <SettingsProvider>
      <AuthProvider>
        <GameProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              {/* Animated background */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
              </div>

              <div className="relative z-10">
                <Header onShowAuth={handleShowAuth} />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Routes>
                    <Route path="/" element={<TypingGame />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/multiplayer" element={<Multiplayer />} />
                    <Route path="/learning" element={<Learning />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>

                {/* Footer */}
                <footer className="mt-16 py-8 border-t border-gray-800">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">
                        © 2024 TenFastCoderFinger. Master your coding speed with style.
                      </p>
                      <div className="mt-4 flex justify-center space-x-6">
                        <button className="text-gray-400 hover:text-white transition-colors">
                          About
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          Privacy
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>

              <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode={authMode}
              />

              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: '#1F2937',
                    color: '#F3F4F6',
                    border: '1px solid #374151',
                  },
                }}
              />
            </div>
          </Router>
        </GameProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;