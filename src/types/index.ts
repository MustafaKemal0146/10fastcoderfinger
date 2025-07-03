export interface CodeSnippet {
  id: string;
  language: string;
  code: string;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  description?: string;
  created_at: string;
  tags?: string[];
  author_id?: string;
  likes?: number;
  category?: string;
}

export interface TypingSession {
  id?: string;
  user_id?: string;
  snippet_id: string;
  wpm: number;
  accuracy: number;
  duration: number;
  completed_at: string;
  errors: number;
  language: string;
  difficulty: string;
  raw_wpm?: number;
  consistency?: number;
  error_positions?: number[];
}

export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
  total_sessions?: number;
  best_wpm?: number;
  avg_accuracy?: number;
  avatar_url?: string;
  level?: number;
  xp?: number;
  streak?: number;
  last_active?: string;
  preferences?: UserPreferences;
  achievements?: Achievement[];
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  font_family: string;
  font_size: number;
  sound_enabled: boolean;
  music_enabled: boolean;
  show_live_wpm: boolean;
  show_live_errors: boolean;
  difficulty_preference: 'easy' | 'medium' | 'hard';
  language_preference: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'speed' | 'accuracy' | 'consistency' | 'streak' | 'special';
  requirement: number;
  unlocked_at?: string;
  progress?: number;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  currentIndex: number;
  startTime: number | null;
  isComplete: boolean;
  timeElapsed: number;
  rawWpm: number;
  consistency: number;
  errorPositions: number[];
  keystrokeData: KeystrokeData[];
}

export interface KeystrokeData {
  character: string;
  timestamp: number;
  correct: boolean;
  timeTaken: number;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  wpm: number;
  accuracy: number;
  language: string;
  difficulty: string;
  completed_at: string;
  avatar_url?: string;
  level?: number;
}

export interface MultiplayerRoom {
  id: string;
  name: string;
  host_id: string;
  snippet_id: string;
  max_players: number;
  current_players: number;
  status: 'waiting' | 'in_progress' | 'finished';
  created_at: string;
  settings: RoomSettings;
}

export interface RoomSettings {
  language: string;
  difficulty: string;
  time_limit?: number;
  allow_spectators: boolean;
  private: boolean;
}

export interface MultiplayerPlayer {
  id: string;
  username: string;
  avatar_url?: string;
  progress: number;
  wpm: number;
  accuracy: number;
  finished: boolean;
  position?: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  requirements: ChallengeRequirement[];
  rewards: ChallengeReward[];
  start_date: string;
  end_date: string;
  participants?: number;
  completed?: boolean;
}

export interface ChallengeRequirement {
  type: 'wpm' | 'accuracy' | 'sessions' | 'languages' | 'streak';
  target: number;
  current?: number;
}

export interface ChallengeReward {
  type: 'xp' | 'achievement' | 'badge';
  value: number | string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
  progress?: number;
  completed?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'theory' | 'practice' | 'quiz';
  exercises?: Exercise[];
  video_url?: string;
  estimated_time: number;
  completed?: boolean;
}

export interface Exercise {
  id: string;
  instruction: string;
  code: string;
  expected_output?: string;
  hints?: string[];
}

export interface UserStats {
  totalSessions: number;
  bestWpm: number;
  avgAccuracy: number;
  totalTime: number;
  recentSessions: TypingSession[];
  weeklyProgress: WeeklyProgress[];
  languageStats: LanguageStats[];
  difficultyStats: DifficultyStats[];
  improvementTrend: ImprovementData[];
}

export interface WeeklyProgress {
  week: string;
  sessions: number;
  avgWpm: number;
  avgAccuracy: number;
  totalTime: number;
}

export interface LanguageStats {
  language: string;
  sessions: number;
  bestWpm: number;
  avgAccuracy: number;
  totalTime: number;
}

export interface DifficultyStats {
  difficulty: string;
  sessions: number;
  bestWpm: number;
  avgAccuracy: number;
  successRate: number;
}

export interface ImprovementData {
  date: string;
  wpm: number;
  accuracy: number;
}

export interface SocialPost {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  content: string;
  type: 'achievement' | 'session' | 'challenge' | 'general';
  data?: any;
  likes: number;
  comments: number;
  created_at: string;
  liked_by_user?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  content: string;
  created_at: string;
}

export interface Friendship {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
  friend?: User;
}

export type TypingState = 'idle' | 'typing' | 'completed' | 'paused';

export type Theme = 'dark' | 'light' | 'vscode' | 'sublime' | 'atom' | 'monokai';

export type SoundEffect = 'keystroke' | 'error' | 'completion' | 'achievement' | 'notification';

export interface AppSettings {
  theme: Theme;
  fontSize: number;
  fontFamily: string;
  soundEnabled: boolean;
  musicEnabled: boolean;
  showLiveStats: boolean;
  autoSave: boolean;
  notifications: boolean;
  language: string;
}