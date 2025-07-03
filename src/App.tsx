import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

function AppContent({ showAuthModal, setShowAuthModal, authMode, handleShowAuth }: {
  showAuthModal: boolean;
  setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  authMode: 'signin' | 'signup';
  handleShowAuth: (mode?: 'signin' | 'signup') => void;
}) {
  const { loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-white text-xl">Yükleniyor...</div>;
  }

  return (
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
              <Route path="/multiplayer" element={<ComingSoonOverlay><Multiplayer /></ComingSoonOverlay>} />
              <Route path="/learning" element={<ComingSoonOverlay><Learning /></ComingSoonOverlay>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
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
                  <Link to="/about" className="text-blue-400 hover:text-white transition-colors">About</Link>
                  <Link to="/privacy" className="text-blue-400 hover:text-white transition-colors">Privacy</Link>
                  <Link to="/contact" className="text-blue-400 hover:text-white transition-colors">Contact</Link>
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
  );
}

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
          <AppContent
            showAuthModal={showAuthModal}
            setShowAuthModal={setShowAuthModal}
            authMode={authMode}
            handleShowAuth={handleShowAuth}
          />
        </GameProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

// Multiplayer ve Learning için sansürlü uyarı bileşeni
function ComingSoonOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-start justify-center z-20 pointer-events-none">
        <div className="mt-8 bg-gray-900/70 backdrop-blur-md rounded-xl px-6 py-3 text-center text-white text-lg font-semibold shadow-lg opacity-90">
          🚧 This feature is coming soon!
        </div>
      </div>
      <div className="opacity-60 blur-sm select-none pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default App;