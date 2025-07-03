import { useState, useEffect, useCallback, useRef } from 'react';
import { TypingStats, TypingState, CodeSnippet } from '../types';

export const useTypingGame = (codeSnippet: CodeSnippet | null) => {
  const [userInput, setUserInput] = useState('');
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    errors: 0,
    currentIndex: 0,
    startTime: null,
    isComplete: false,
    timeElapsed: 0
  });
  const [state, setState] = useState<TypingState>('idle');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const targetText = codeSnippet?.code || '';

  const calculateWPM = useCallback((timeElapsed: number, charactersTyped: number) => {
    if (timeElapsed === 0) return 0;
    const minutes = timeElapsed / 60000; // Convert to minutes
    const words = charactersTyped / 5; // Standard: 5 characters = 1 word
    return Math.round(words / minutes);
  }, []);

  const calculateAccuracy = useCallback((correct: number, total: number) => {
    if (total === 0) return 100;
    return Math.round((correct / total) * 100);
  }, []);

  const updateStats = useCallback(() => {
    if (!stats.startTime) return;

    const now = Date.now();
    const timeElapsed = now - stats.startTime;
    const currentIndex = userInput.length;
    
    let errors = 0;
    let correctChars = 0;

    for (let i = 0; i < currentIndex; i++) {
      if (i < targetText.length) {
        if (userInput[i] === targetText[i]) {
          correctChars++;
        } else {
          errors++;
        }
      } else {
        errors++; // Extra characters
      }
    }

    const wpm = calculateWPM(timeElapsed, correctChars);
    const accuracy = calculateAccuracy(correctChars, currentIndex);
    const isComplete = currentIndex === targetText.length && errors === 0;

    setStats(prev => ({
      ...prev,
      wpm,
      accuracy,
      errors,
      currentIndex,
      timeElapsed,
      isComplete
    }));

    if (isComplete) {
      setState('completed');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [userInput, targetText, stats.startTime, calculateWPM, calculateAccuracy]);

  const startTyping = useCallback(() => {
    if (state === 'idle') {
      const startTime = Date.now();
      setStats(prev => ({ ...prev, startTime }));
      setState('typing');
      
      intervalRef.current = setInterval(() => {
        setStats(prev => ({
          ...prev,
          timeElapsed: Date.now() - startTime
        }));
      }, 100);
    }
  }, [state]);

  const resetGame = useCallback(() => {
    setUserInput('');
    setStats({
      wpm: 0,
      accuracy: 0,
      errors: 0,
      currentIndex: 0,
      startTime: null,
      isComplete: false,
      timeElapsed: 0
    });
    setState('idle');
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleInput = useCallback((value: string) => {
    if (state === 'completed') return;
    
    if (state === 'idle') {
      startTyping();
    }

    setUserInput(value);
  }, [state, startTyping]);

  useEffect(() => {
    updateStats();
  }, [updateStats]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    resetGame();
  }, [codeSnippet, resetGame]);

  return {
    userInput,
    stats,
    state,
    targetText,
    handleInput,
    resetGame,
    startTyping
  };
};