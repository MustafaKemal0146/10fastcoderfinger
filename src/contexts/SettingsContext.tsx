import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppSettings, Theme } from '../types';

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  fontSize: 16,
  fontFamily: 'JetBrains Mono',
  soundEnabled: true,
  musicEnabled: false,
  showLiveStats: true,
  autoSave: true,
  notifications: true,
  language: 'en',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('typing-app-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('typing-app-settings', JSON.stringify(settings));
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    // Apply font settings
    document.documentElement.style.setProperty('--font-size', `${settings.fontSize}px`);
    document.documentElement.style.setProperty('--font-family', settings.fontFamily);
  }, [settings]);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const value = {
    settings,
    updateSettings,
    resetSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};