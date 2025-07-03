import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Target, AlertCircle } from 'lucide-react';
import { TypingStats } from '../types';

interface StatsPanelProps {
  stats: TypingStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${remainingSeconds}s`;
  };

  const statItems = [
    {
      icon: Zap,
      label: 'WPM',
      value: stats.wpm.toString(),
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: `${stats.accuracy}%`,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: AlertCircle,
      label: 'Errors',
      value: stats.errors.toString(),
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    {
      icon: Clock,
      label: 'Time',
      value: formatTime(stats.timeElapsed),
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Live Stats</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`p-4 rounded-lg border ${item.bgColor} ${item.borderColor} backdrop-blur-sm`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {item.label}
                </p>
                <p className={`text-xl font-bold ${item.color}`}>
                  {item.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm text-gray-400">
            {stats.currentIndex} / {stats.currentIndex + (100 - stats.currentIndex)}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${Math.min((stats.currentIndex / (stats.currentIndex + 100)) * 100, 100)}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};