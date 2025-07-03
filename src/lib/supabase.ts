import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database functions
export const getCodeSnippets = async (language?: string, difficulty?: string) => {
  let query = supabase.from('code_snippets').select('*');
  
  if (language) {
    query = query.eq('language', language);
  }
  
  if (difficulty) {
    query = query.eq('difficulty', difficulty);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching snippets:', error);
    return [];
  }
  
  return data || [];
};

export const saveTypingSession = async (session: Omit<TypingSession, 'id'>) => {
  const { data, error } = await supabase
    .from('typing_sessions')
    .insert([session])
    .select()
    .single();
  
  if (error) {
    console.error('Error saving session:', error);
    return null;
  }
  
  return data;
};

export const getLeaderboard = async (language?: string, limit = 10) => {
  let query = supabase
    .from('typing_sessions')
    .select(`
      id,
      wpm,
      accuracy,
      language,
      difficulty,
      completed_at,
      users:user_id (username)
    `)
    .order('wpm', { ascending: false })
    .limit(limit);
  
  if (language) {
    query = query.eq('language', language);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
  
  return data || [];
};

export const getUserStats = async (userId: string) => {
  const { data, error } = await supabase
    .from('typing_sessions')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
  
  if (!data || data.length === 0) return null;
  
  const totalSessions = data.length;
  const bestWpm = Math.max(...data.map(s => s.wpm));
  const avgAccuracy = data.reduce((sum, s) => sum + s.accuracy, 0) / totalSessions;
  const totalTime = data.reduce((sum, s) => sum + s.duration, 0);
  
  return {
    totalSessions,
    bestWpm,
    avgAccuracy: Math.round(avgAccuracy * 100) / 100,
    totalTime: Math.round(totalTime / 1000), // Convert to seconds
    recentSessions: data.slice(-5).reverse()
  };
};