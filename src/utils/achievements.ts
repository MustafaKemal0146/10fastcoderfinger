import { Achievement, TypingStats } from '../types';
import { supabase } from '../lib/supabase';

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_session',
    name: 'First Steps',
    description: 'Complete your first typing session',
    icon: '🎯',
    category: 'special',
    requirement: 1,
  },
  {
    id: 'speed_demon_50',
    name: 'Speed Demon',
    description: 'Reach 50 WPM',
    icon: '⚡',
    category: 'speed',
    requirement: 50,
  },
  {
    id: 'speed_demon_100',
    name: 'Lightning Fast',
    description: 'Reach 100 WPM',
    icon: '🚀',
    category: 'speed',
    requirement: 100,
  },
  {
    id: 'accuracy_master',
    name: 'Accuracy Master',
    description: 'Achieve 100% accuracy',
    icon: '🎯',
    category: 'accuracy',
    requirement: 100,
  },
  {
    id: 'consistency_king',
    name: 'Consistency King',
    description: 'Maintain 95%+ accuracy for 10 sessions',
    icon: '👑',
    category: 'consistency',
    requirement: 10,
  },
  {
    id: 'streak_warrior',
    name: 'Streak Warrior',
    description: 'Complete 7 days in a row',
    icon: '🔥',
    category: 'streak',
    requirement: 7,
  },
  {
    id: 'marathon_runner',
    name: 'Marathon Runner',
    description: 'Complete 100 sessions',
    icon: '🏃',
    category: 'special',
    requirement: 100,
  },
];

export const checkAchievements = async (userId: string, stats: TypingStats): Promise<Achievement[]> => {
  const newAchievements: Achievement[] = [];

  try {
    // Get user's current achievements
    const { data: userAchievements } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', userId);

    const unlockedIds = userAchievements?.map(ua => ua.achievement_id) || [];

    // Get user's session count and stats
    const { data: sessions } = await supabase
      .from('typing_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    const sessionCount = sessions?.length || 0;

    // Check each achievement
    for (const achievement of ACHIEVEMENTS) {
      if (unlockedIds.includes(achievement.id)) continue;

      let unlocked = false;

      switch (achievement.id) {
        case 'first_session':
          unlocked = sessionCount >= 1;
          break;
        case 'speed_demon_50':
          unlocked = stats.wpm >= 50;
          break;
        case 'speed_demon_100':
          unlocked = stats.wpm >= 100;
          break;
        case 'accuracy_master':
          unlocked = stats.accuracy >= 100;
          break;
        case 'consistency_king':
          const recentSessions = sessions?.slice(0, 10) || [];
          unlocked = recentSessions.length >= 10 && 
                    recentSessions.every(s => s.accuracy >= 95);
          break;
        case 'streak_warrior':
          // This would need streak tracking in the database
          unlocked = false; // Placeholder
          break;
        case 'marathon_runner':
          unlocked = sessionCount >= 100;
          break;
      }

      if (unlocked) {
        newAchievements.push({
          ...achievement,
          unlocked_at: new Date().toISOString(),
        });

        // Save to database
        await supabase
          .from('user_achievements')
          .insert([
            {
              user_id: userId,
              achievement_id: achievement.id,
              unlocked_at: new Date().toISOString(),
            },
          ]);
      }
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
  }

  return newAchievements;
};

export const getUserAchievements = async (userId: string): Promise<Achievement[]> => {
  try {
    const { data } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId);

    return data?.map(ua => {
      const achievement = ACHIEVEMENTS.find(a => a.id === ua.achievement_id);
      return achievement ? { ...achievement, unlocked_at: ua.unlocked_at } : null;
    }).filter(Boolean) || [];
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    return [];
  }
};