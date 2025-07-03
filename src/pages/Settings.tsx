import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Volume2, 
  VolumeX, 
  Monitor,
  Type,
  Bell,
  Save
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { Theme } from '../types';
import toast from 'react-hot-toast';

export const Settings: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [hasChanges, setHasChanges] = useState(false);

  const themes: { id: Theme; name: string; description: string }[] = [
    { id: 'dark', name: 'Dark', description: 'Default dark theme' },
    { id: 'light', name: 'Light', description: 'Clean light theme' },
    { id: 'vscode', name: 'VS Code', description: 'Visual Studio Code theme' },
    { id: 'sublime', name: 'Sublime', description: 'Sublime Text theme' },
    { id: 'atom', name: 'Atom', description: 'Atom editor theme' },
    { id: 'monokai', name: 'Monokai', description: 'Classic Monokai theme' },
  ];

  const fontFamilies = [
    'JetBrains Mono',
    'Fira Code',
    'Source Code Pro',
    'Monaco',
    'Consolas',
    'Ubuntu Mono',
  ];

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    updateSettings({ [key]: value });
    setHasChanges(true);
  };

  const handleSave = () => {
    toast.success('Settings saved successfully!');
    setHasChanges(false);
  };

  const handleReset = () => {
    resetSettings();
    toast.success('Settings reset to defaults!');
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Customize your typing experience</p>
        </div>
        
        {hasChanges && (
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Palette className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Appearance</h2>
          </div>

          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Theme
              </label>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleSettingChange('theme', theme.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      settings.theme === theme.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="font-medium text-white">{theme.name}</div>
                    <div className="text-xs text-gray-400">{theme.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Font Family
              </label>
              <select
                value={settings.fontFamily}
                onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                {fontFamilies.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Font Size: {settings.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Audio Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-600/20 rounded-lg">
              {settings.soundEnabled ? (
                <Volume2 className="h-5 w-5 text-green-400" />
              ) : (
                <VolumeX className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-white">Audio</h2>
          </div>

          <div className="space-y-6">
            {/* Sound Effects */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Sound Effects</div>
                <div className="text-sm text-gray-400">Keystroke and completion sounds</div>
              </div>
              <button
                onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Background Music */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Background Music</div>
                <div className="text-sm text-gray-400">Ambient music while typing</div>
              </div>
              <button
                onClick={() => handleSettingChange('musicEnabled', !settings.musicEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.musicEnabled ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.musicEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Gameplay Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Type className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Gameplay</h2>
          </div>

          <div className="space-y-6">
            {/* Show Live Stats */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Live Statistics</div>
                <div className="text-sm text-gray-400">Show WPM and accuracy while typing</div>
              </div>
              <button
                onClick={() => handleSettingChange('showLiveStats', !settings.showLiveStats)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.showLiveStats ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showLiveStats ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Auto Save */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Auto Save</div>
                <div className="text-sm text-gray-400">Automatically save progress</div>
              </div>
              <button
                onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoSave ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-yellow-600/20 rounded-lg">
              <Bell className="h-5 w-5 text-yellow-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>

          <div className="space-y-6">
            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Push Notifications</div>
                <div className="text-sm text-gray-400">Achievement and challenge notifications</div>
              </div>
              <button
                onClick={() => handleSettingChange('notifications', !settings.notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="tr">Türkçe</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};