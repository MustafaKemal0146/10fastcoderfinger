import React from 'react';
import { motion } from 'framer-motion';

interface CodeDisplayProps {
  code: string;
  userInput: string;
  currentIndex: number;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ 
  code, 
  userInput, 
  currentIndex 
}) => {
  const renderCharacter = (char: string, index: number) => {
    let className = 'transition-all duration-100 ';
    
    if (index < userInput.length) {
      // Typed characters
      if (userInput[index] === char) {
        className += 'bg-green-500/20 text-green-300'; // Correct
      } else {
        className += 'bg-red-500/20 text-red-400'; // Error
      }
    } else if (index === currentIndex) {
      // Current character
      className += 'bg-blue-500/30 text-blue-300 animate-pulse';
    } else {
      // Untyped characters
      className += 'text-gray-400';
    }

    return (
      <motion.span
        key={index}
        className={className}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Code Challenge</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800"
        style={{ userSelect: 'none' }}
        onContextMenu={e => e.preventDefault()}
      >
        <pre className="text-sm leading-relaxed font-mono whitespace-pre-wrap break-words select-none">
          {code.split('').map((char, index) => renderCharacter(char, index))}
        </pre>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        Progress: {userInput.length} / {code.length} characters
      </div>
    </motion.div>
  );
};