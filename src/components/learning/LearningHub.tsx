import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Star,
  Code,
  Video,
  FileText,
  Award
} from 'lucide-react';
import { LearningModule, Lesson } from '../../types';

export const LearningHub: React.FC = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const mockModules: LearningModule[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming',
      category: 'Programming',
      difficulty: 'beginner',
      progress: 75,
      lessons: [
        {
          id: '1-1',
          title: 'Variables and Data Types',
          content: 'Learn about JavaScript variables, strings, numbers, and booleans.',
          type: 'theory',
          estimated_time: 15,
          completed: true,
        },
        {
          id: '1-2',
          title: 'Functions and Scope',
          content: 'Understanding function declarations, expressions, and scope.',
          type: 'practice',
          estimated_time: 20,
          completed: true,
          exercises: [
            {
              id: 'ex-1',
              instruction: 'Create a function that adds two numbers',
              code: 'function add(a, b) {\n  // Your code here\n}',
              expected_output: '5',
            },
          ],
        },
        {
          id: '1-3',
          title: 'Arrays and Objects',
          content: 'Working with arrays and objects in JavaScript.',
          type: 'practice',
          estimated_time: 25,
          completed: false,
        },
      ],
    },
    {
      id: '2',
      title: 'Python Basics',
      description: 'Introduction to Python programming language',
      category: 'Programming',
      difficulty: 'beginner',
      progress: 30,
      lessons: [
        {
          id: '2-1',
          title: 'Python Syntax',
          content: 'Learn Python syntax and basic concepts.',
          type: 'theory',
          estimated_time: 20,
          completed: true,
        },
        {
          id: '2-2',
          title: 'Control Structures',
          content: 'If statements, loops, and control flow.',
          type: 'practice',
          estimated_time: 30,
          completed: false,
        },
      ],
    },
  ];

  useEffect(() => {
    setModules(mockModules);
  }, []);

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'theory': return FileText;
      case 'practice': return Code;
      case 'quiz': return Award;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  if (selectedLesson) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setSelectedLesson(null)}
            className="text-blue-400 hover:text-blue-300 mb-4"
          >
            ← Back to Module
          </button>
          <h1 className="text-2xl font-bold text-white">{selectedLesson.title}</h1>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed">
              {selectedLesson.content}
            </p>
          </div>

          {selectedLesson.exercises && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Practice Exercise</h3>
              {selectedLesson.exercises.map((exercise) => (
                <div key={exercise.id} className="bg-gray-900/50 rounded-lg p-6 border border-gray-600">
                  <p className="text-gray-300 mb-4">{exercise.instruction}</p>
                  <div className="bg-gray-950 rounded-lg p-4 border border-gray-700">
                    <pre className="text-green-400 font-mono text-sm">
                      <code>{exercise.code}</code>
                    </pre>
                  </div>
                  {exercise.expected_output && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-400 mb-2">Expected Output:</p>
                      <div className="bg-gray-800 rounded p-2 text-sm text-gray-300 font-mono">
                        {exercise.expected_output}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Previous Lesson
            </button>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Mark Complete & Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedModule) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setSelectedModule(null)}
            className="text-blue-400 hover:text-blue-300 mb-4"
          >
            ← Back to Learning Hub
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{selectedModule.title}</h1>
              <p className="text-gray-400 mt-2">{selectedModule.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{selectedModule.progress}%</div>
              <div className="text-sm text-gray-400">Complete</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Progress</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(selectedModule.difficulty)}`}>
              {selectedModule.difficulty}
            </span>
          </div>
          <div className="bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${selectedModule.progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {selectedModule.lessons.map((lesson, index) => {
            const IconComponent = getLessonIcon(lesson.type);
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border cursor-pointer transition-all ${
                  lesson.completed 
                    ? 'border-green-500/50 bg-green-500/5' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedLesson(lesson)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    lesson.completed ? 'bg-green-500/20' : 'bg-gray-700'
                  }`}>
                    {lesson.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <IconComponent className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{lesson.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{lesson.content}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{lesson.estimated_time} min</span>
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        lesson.type === 'theory' ? 'bg-blue-500/20 text-blue-300' :
                        lesson.type === 'practice' ? 'bg-green-500/20 text-green-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {lesson.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {lesson.completed && (
                      <span className="text-green-400 text-sm">Completed</span>
                    )}
                    <Play className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Learning Hub</h2>
          <p className="text-gray-400">Improve your coding skills with interactive lessons</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer"
            onClick={() => setSelectedModule(module)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(module.difficulty)}`}>
                {module.difficulty}
              </span>
            </div>

            <h3 className="font-semibold text-white mb-2">{module.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{module.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-white font-medium">{module.progress}%</span>
              </div>
              <div className="bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${module.progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{module.lessons.length} lessons</span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {module.lessons.reduce((total, lesson) => total + lesson.estimated_time, 0)} min
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};