import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypingState } from '../types';

interface TypingInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  state: TypingState;
  placeholder?: string;
}

export const TypingInput: React.FC<TypingInputProps> = ({
  value,
  onChange,
  disabled = false,
  state,
  placeholder = "Start typing here..."
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && state === 'typing') {
      textareaRef.current.focus();
    }
  }, [state]);

  const getPlaceholder = () => {
    switch (state) {
      case 'idle':
        return 'Click here and start typing to begin...';
      case 'typing':
        return '';
      case 'completed':
        return 'Challenge completed! Click reset to try again.';
      case 'paused':
        return 'Typing paused...';
      default:
        return placeholder;
    }
  };

  const getBorderColor = () => {
    switch (state) {
      case 'typing':
        return 'border-blue-500 ring-2 ring-blue-500/20';
      case 'completed':
        return 'border-green-500 ring-2 ring-green-500/20';
      default:
        return 'border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Your Code Input
        </label>
        <span>{value.length} characters</span>
      </div>
      
      <div className="flex items-center">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={getPlaceholder()}
          className={`w-full h-40 bg-gray-900/50 text-white placeholder-gray-500 rounded-lg p-4 font-mono text-sm leading-relaxed resize-none transition-all duration-200 ${getBorderColor()}`}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <div className="ml-4">
          <span>
            {state === 'idle' && 'Ready to start'}
            {state === 'typing' && 'Keep typing...'}
            {state === 'completed' && '🎉 Challenge completed!'}
            {state === 'paused' && 'Paused'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};