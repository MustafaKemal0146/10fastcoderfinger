import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { DetailedStats } from '../components/stats/DetailedStats';
import { AchievementPanel } from '../components/achievements/AchievementPanel';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'achievements'>('overview');
  const { userProfile, user } = useAuth();

  if (!user || !userProfile) {
    return (
      <div className="text-center py-12">
        <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">Please sign in to view your profile.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'stats', label: 'Statistics', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-3xl text-white font-bold">
              {userProfile.username.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{userProfile.username}</h1>
            <p className="text-gray-400">{userProfile.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="flex items-center space-x-1 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(userProfile.created_at).toLocaleDateString()}</span>
              </span>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                Level {userProfile.level}
              </span>
              <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                {userProfile.xp} XP
              </span>
            </div>
          </div>

          <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <Settings className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Level Progress</span>
            <span className="text-sm text-gray-400">
              {userProfile.xp % 100} / 100 XP
            </span>
          </div>
          <div className="bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(userProfile.xp % 100)}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 border border-gray-700">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <IconComponent className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Best WPM</p>
                  <p className="text-2xl font-bold text-white">{userProfile.best_wpm || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-600/20 rounded-lg">
                  <Trophy className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Avg Accuracy</p>
                  <p className="text-2xl font-bold text-white">{userProfile.avg_accuracy || 0}%</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Sessions</p>
                  <p className="text-2xl font-bold text-white">{userProfile.total_sessions || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-yellow-600/20 rounded-lg">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Current Streak</p>
                  <p className="text-2xl font-bold text-white">{userProfile.streak || 0} days</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && <DetailedStats />}
        {activeTab === 'achievements' && <AchievementPanel />}
      </motion.div>
    </div>
  );
};