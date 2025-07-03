import React from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Pause, Trophy } from 'lucide-react';
import { TypingState } from '../types';

interface GameControlsProps {
  state: TypingState;
  onStart: () => void;
  onReset: () => void;
  onPause?: () => void;
  onNewChallenge: () => void;
  isCompleted: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  state,
  onStart,
  onReset,
  onPause,
  onNewChallenge,
  isCompleted
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-wrap gap-3 justify-center"
    >
      {state === 'idle' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all"
        >
          <Play className="h-4 w-4 text-white" />
          <span className="text-white font-medium">Start Challenge</span>
        </motion.button>
      )}

      {state === 'typing' && onPause && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPause}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 rounded-lg transition-all"
        >
          <Pause className="h-4 w-4 text-white" />
          <span className="text-white font-medium">Pause</span>
        </motion.button>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-lg transition-all"
      >
        <RotateCcw className="h-4 w-4 text-white" />
        <span className="text-white font-medium">Reset</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNewChallenge}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all"
      >
        <Trophy className="h-4 w-4 text-white" />
        <span className="text-white font-medium">New Challenge</span>
      </motion.button>

      {isCompleted && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-green-700/20 border border-green-500/30 rounded-lg"
        >
          <Trophy className="h-4 w-4 text-green-400" />
          <span className="text-green-400 font-medium">Challenge Completed!</span>
        </motion.div>
      )}
    </motion.div>
  );
};