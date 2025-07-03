import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TypingStats, TypingState, CodeSnippet, Achievement } from '../types';
import { useAuth } from './AuthContext';
import { saveTypingSession } from '../lib/supabase';
import { checkAchievements } from '../utils/achievements';
import { playSound } from '../utils/sounds';
import toast from 'react-hot-toast';

interface GameState {
  currentSnippet: CodeSnippet | null;
  userInput: string;
  stats: TypingStats;
  state: TypingState;
  achievements: Achievement[];
  streak: number;
  xp: number;
  level: number;
}

type GameAction =
  | { type: 'SET_SNIPPET'; payload: CodeSnippet }
  | { type: 'UPDATE_INPUT'; payload: string }
  | { type: 'UPDATE_STATS'; payload: Partial<TypingStats> }
  | { type: 'SET_STATE'; payload: TypingState }
  | { type: 'RESET_GAME' }
  | { type: 'COMPLETE_GAME' }
  | { type: 'ADD_ACHIEVEMENT'; payload: Achievement }
  | { type: 'UPDATE_PROGRESS'; payload: { xp: number; level: number; streak: number } };

const initialState: GameState = {
  currentSnippet: null,
  userInput: '',
  stats: {
    wpm: 0,
    accuracy: 0,
    errors: 0,
    currentIndex: 0,
    startTime: null,
    isComplete: false,
    timeElapsed: 0,
    rawWpm: 0,
    consistency: 0,
    errorPositions: [],
    keystrokeData: [],
  },
  state: 'idle',
  achievements: [],
  streak: 0,
  xp: 0,
  level: 1,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_SNIPPET':
      return {
        ...state,
        currentSnippet: action.payload,
        userInput: '',
        stats: { ...initialState.stats },
        state: 'idle',
      };

    case 'UPDATE_INPUT':
      return {
        ...state,
        userInput: action.payload,
      };

    case 'UPDATE_STATS':
      return {
        ...state,
        stats: { ...state.stats, ...action.payload },
      };

    case 'SET_STATE':
      return {
        ...state,
        state: action.payload,
      };

    case 'RESET_GAME':
      return {
        ...state,
        userInput: '',
        stats: { ...initialState.stats },
        state: 'idle',
      };

    case 'COMPLETE_GAME':
      return {
        ...state,
        state: 'completed',
        stats: { ...state.stats, isComplete: true },
      };

    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        achievements: [...state.achievements, action.payload],
      };

    case 'UPDATE_PROGRESS':
      return {
        ...state,
        xp: action.payload.xp,
        level: action.payload.level,
        streak: action.payload.streak,
      };

    default:
      return state;
  }
};

interface GameContextType {
  state: GameState;
  setSnippet: (snippet: CodeSnippet) => void;
  updateInput: (input: string) => void;
  startGame: () => void;
  resetGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  completeGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const { user, userProfile, updateProfile } = useAuth();

  // Initialize user progress from profile
  useEffect(() => {
    if (userProfile) {
      dispatch({
        type: 'UPDATE_PROGRESS',
        payload: {
          xp: userProfile.xp || 0,
          level: userProfile.level || 1,
          streak: userProfile.streak || 0,
        },
      });
    }
  }, [userProfile]);

  const setSnippet = (snippet: CodeSnippet) => {
    dispatch({ type: 'SET_SNIPPET', payload: snippet });
  };

  const updateInput = (input: string) => {
    dispatch({ type: 'UPDATE_INPUT', payload: input });
    
    if (gameState.state === 'idle' && input.length > 0) {
      startGame();
    }

    // Calculate real-time stats
    if (gameState.currentSnippet && gameState.stats.startTime) {
      const targetText = gameState.currentSnippet.code;
      const currentTime = Date.now();
      const timeElapsed = currentTime - gameState.stats.startTime;
      
      let errors = 0;
      let correctChars = 0;
      const errorPositions: number[] = [];
      
      for (let i = 0; i < input.length; i++) {
        if (i < targetText.length) {
          if (input[i] === targetText[i]) {
            correctChars++;
          } else {
            errors++;
            errorPositions.push(i);
          }
        } else {
          errors++;
          errorPositions.push(i);
        }
      }

      const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / (timeElapsed / 60000)) : 0;
      const rawWpm = timeElapsed > 0 ? Math.round((input.length / 5) / (timeElapsed / 60000)) : 0;
      const accuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;
      
      dispatch({
        type: 'UPDATE_STATS',
        payload: {
          wpm,
          rawWpm,
          accuracy,
          errors,
          currentIndex: input.length,
          timeElapsed,
          errorPositions,
        },
      });

      // Check for completion
      if (input.length === targetText.length && errors === 0) {
        completeGame();
      }
    }
  };

  const startGame = () => {
    const startTime = Date.now();
    dispatch({ type: 'SET_STATE', payload: 'typing' });
    dispatch({
      type: 'UPDATE_STATS',
      payload: { startTime },
    });
    playSound('keystroke');
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const pauseGame = () => {
    dispatch({ type: 'SET_STATE', payload: 'paused' });
  };

  const resumeGame = () => {
    dispatch({ type: 'SET_STATE', payload: 'typing' });
  };

  const completeGame = async () => {
    dispatch({ type: 'COMPLETE_GAME' });
    playSound('completion');

    if (user && gameState.currentSnippet) {
      // Save session to database
      const session = {
        user_id: user.id,
        snippet_id: gameState.currentSnippet.id,
        wpm: gameState.stats.wpm,
        accuracy: gameState.stats.accuracy,
        duration: gameState.stats.timeElapsed,
        completed_at: new Date().toISOString(),
        errors: gameState.stats.errors,
        language: gameState.currentSnippet.language,
        difficulty: gameState.currentSnippet.difficulty,
        raw_wpm: gameState.stats.rawWpm,
        consistency: gameState.stats.consistency,
        error_positions: gameState.stats.errorPositions,
      };

      await saveTypingSession(session);

      // Check for achievements
      const newAchievements = await checkAchievements(user.id, gameState.stats);
      newAchievements.forEach(achievement => {
        dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievement });
        playSound('achievement');
        toast.success(`Achievement unlocked: ${achievement.name}!`);
      });

      // Update user progress
      const xpGained = calculateXP(gameState.stats);
      const newXP = gameState.xp + xpGained;
      const newLevel = calculateLevel(newXP);
      const newStreak = gameState.streak + 1;

      dispatch({
        type: 'UPDATE_PROGRESS',
        payload: {
          xp: newXP,
          level: newLevel,
          streak: newStreak,
        },
      });

      // Update user profile
      await updateProfile({
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        last_active: new Date().toISOString(),
      });

      if (newLevel > gameState.level) {
        toast.success(`Level up! You're now level ${newLevel}!`);
        playSound('achievement');
      }
    }
  };

  const calculateXP = (stats: TypingStats): number => {
    const baseXP = 10;
    const wpmBonus = Math.floor(stats.wpm / 10) * 5;
    const accuracyBonus = Math.floor(stats.accuracy / 10) * 3;
    return baseXP + wpmBonus + accuracyBonus;
  };

  const calculateLevel = (xp: number): number => {
    return Math.floor(xp / 100) + 1;
  };

  const value = {
    state: gameState,
    setSnippet,
    updateInput,
    startGame,
    resetGame,
    pauseGame,
    resumeGame,
    completeGame,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};