import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, Filter } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard } from '../lib/supabase';

export const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState<{
    language: string;
    difficulty: string;
    timeframe: string;
  }>({
    language: 'all',
    difficulty: 'all',
    timeframe: 'all',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [filter]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard(
        filter.language === 'all' ? undefined : filter.language,
        50
      );
      setEntries(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-gray-400 font-bold">#{position}</span>;
    }
  };

  const getRankBg = (position: number) => {
    switch (position) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default: return 'bg-gray-800/50 border-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Global Leaderboard</h1>
        <p className="text-gray-400">Compete with the best typists worldwide</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <select
              value={filter.language}
              onChange={(e) => setFilter(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">All Languages</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="csharp">C#</option>
              <option value="java">Java</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              value={filter.difficulty}
              onChange={(e) => setFilter(prev => ({ ...prev, difficulty: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Timeframe
            </label>
            <select
              value={filter.timeframe}
              onChange={(e) => setFilter(prev => ({ ...prev, timeframe: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {entries.length >= 3 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30 rounded-xl p-6 text-center"
          >
            <div className="flex justify-center mb-3">
              <Medal className="h-12 w-12 text-gray-400" />
            </div>
            <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="font-bold text-white">{entries[1]?.username}</h3>
            <p className="text-gray-300 text-lg font-semibold">{entries[1]?.wpm} WPM</p>
            <p className="text-gray-400 text-sm">{entries[1]?.accuracy}% accuracy</p>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-6 text-center transform scale-105"
          >
            <div className="flex justify-center mb-3">
              <Crown className="h-16 w-16 text-yellow-400" />
            </div>
            <div className="w-20 h-20 bg-yellow-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-3xl">👑</span>
            </div>
            <h3 className="font-bold text-white text-lg">{entries[0]?.username}</h3>
            <p className="text-yellow-300 text-xl font-bold">{entries[0]?.wpm} WPM</p>
            <p className="text-gray-300 text-sm">{entries[0]?.accuracy}% accuracy</p>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-amber-600/20 to-amber-700/20 border border-amber-600/30 rounded-xl p-6 text-center"
          >
            <div className="flex justify-center mb-3">
              <Award className="h-12 w-12 text-amber-600" />
            </div>
            <div className="w-16 h-16 bg-amber-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl">🥉</span>
            </div>
            <h3 className="font-bold text-white">{entries[2]?.username}</h3>
            <p className="text-amber-300 text-lg font-semibold">{entries[2]?.wpm} WPM</p>
            <p className="text-gray-400 text-sm">{entries[2]?.accuracy}% accuracy</p>
          </motion.div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Full Rankings</h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 hover:bg-gray-700/30 transition-colors ${getRankBg(index + 1)}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12">
                  {getRankIcon(index + 1)}
                </div>
                
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{entry.username}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{new Date(entry.completed_at).toLocaleDateString()}</span>
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded">
                      {entry.language}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      entry.difficulty === 'easy' ? 'bg-green-600/20 text-green-300' :
                      entry.difficulty === 'medium' ? 'bg-yellow-600/20 text-yellow-300' :
                      'bg-red-600/20 text-red-300'
                    }`}>
                      {entry.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-white">{entry.wpm} WPM</div>
                  <div className="text-sm text-gray-400">{entry.accuracy}% accuracy</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No entries found for the selected filters.</p>
        </div>
      )}
    </div>
  );
};