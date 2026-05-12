export const LEVELS = [
  { level: 1, name: 'Curious Learner', minXP: 0, maxXP: 200, icon: '🌱', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { level: 2, name: 'Explorer', minXP: 200, maxXP: 500, icon: '🔍', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { level: 3, name: 'Practitioner', minXP: 500, maxXP: 1000, icon: '⚡', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { level: 4, name: 'Analyst', minXP: 1000, maxXP: 2000, icon: '📊', color: 'text-violet-500', bg: 'bg-violet-100 dark:bg-violet-900/30' },
  { level: 5, name: 'Expert', minXP: 2000, maxXP: 4000, icon: '🧠', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { level: 6, name: 'Master', minXP: 4000, maxXP: 8000, icon: '🏆', color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' },
  { level: 7, name: 'Champion', minXP: 8000, maxXP: Infinity, icon: '👑', color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
];

export const XP_REWARDS = {
  sessionComplete: 50,
  pomodoroComplete: 20,
  streakBonus: 15,
  weekComplete: 200,
  firstSession: 100,
  noteAdded: 10,
  aiChat: 5,
  difficultyBonus: { 3: 10, 4: 25, 5: 50 },
};

export const ACHIEVEMENTS = [
  { id: 'first_session', icon: '🎯', name: 'First Step', description: 'Complete your first study session', xpReward: 100, rarity: 'common' },
  { id: 'streak_3', icon: '🔥', name: 'On Fire', description: '3-day study streak', xpReward: 50, rarity: 'common' },
  { id: 'streak_7', icon: '⚡', name: 'Week Warrior', description: '7-day study streak', xpReward: 150, rarity: 'rare' },
  { id: 'streak_14', icon: '💫', name: 'Fortnight Focus', description: '14-day study streak', xpReward: 300, rarity: 'epic' },
  { id: 'streak_30', icon: '🌟', name: 'Unstoppable', description: '30-day study streak', xpReward: 500, rarity: 'legendary' },
  { id: 'sessions_5', icon: '✅', name: 'Getting Started', description: 'Complete 5 study sessions', xpReward: 50, rarity: 'common' },
  { id: 'sessions_10', icon: '💪', name: 'Building Momentum', description: 'Complete 10 study sessions', xpReward: 100, rarity: 'common' },
  { id: 'sessions_25', icon: '🚀', name: 'In the Zone', description: 'Complete 25 study sessions', xpReward: 200, rarity: 'rare' },
  { id: 'sessions_50', icon: '🏅', name: 'Dedicated Learner', description: 'Complete 50 study sessions', xpReward: 400, rarity: 'epic' },
  { id: 'pomodoro_5', icon: '🍅', name: 'Tomato Timer', description: 'Complete 5 Pomodoro sessions', xpReward: 50, rarity: 'common' },
  { id: 'pomodoro_25', icon: '⏱', name: 'Pomodoro Pro', description: 'Complete 25 Pomodoro sessions', xpReward: 150, rarity: 'rare' },
  { id: 'week_complete', icon: '🏆', name: 'Week Champion', description: 'Complete a full study week', xpReward: 200, rarity: 'rare' },
  { id: 'ai_chat', icon: '🤖', name: 'AI Explorer', description: 'Use the AI tutor for the first time', xpReward: 25, rarity: 'common' },
  { id: 'ai_power_user', icon: '🧬', name: 'AI Power User', description: 'Have 50 AI tutor conversations', xpReward: 200, rarity: 'rare' },
  { id: 'level_3', icon: '⭐', name: 'Rising Star', description: 'Reach Level 3: Practitioner', xpReward: 100, rarity: 'rare' },
  { id: 'level_5', icon: '🌠', name: 'Expert Status', description: 'Reach Level 5: Expert', xpReward: 300, rarity: 'epic' },
  { id: 'career_50', icon: '💼', name: 'Career Ready', description: 'Reach 50% career readiness', xpReward: 250, rarity: 'epic' },
  { id: 'notes_master', icon: '📝', name: 'Note Taker', description: 'Add notes to 10 sessions', xpReward: 75, rarity: 'common' },
];

export const RARITY_COLORS = {
  common: 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/40',
  rare: 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20',
  epic: 'border-violet-200 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20',
  legendary: 'border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20',
};

export function getLevelFromXP(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getXPProgress(xp) {
  const level = getLevelFromXP(xp);
  if (level.maxXP === Infinity) return 100;
  return Math.min(Math.round(((xp - level.minXP) / (level.maxXP - level.minXP)) * 100), 100);
}

export function getXPToNextLevel(xp) {
  const level = getLevelFromXP(xp);
  if (level.maxXP === Infinity) return 0;
  return level.maxXP - xp;
}

export function checkNewAchievements(gamification) {
  const unlocked = gamification.achievements || [];
  const newOnes = [];

  const check = (id, condition) => {
    if (!unlocked.includes(id) && condition) newOnes.push(id);
  };

  check('first_session', gamification.totalSessions >= 1);
  check('streak_3', gamification.streak >= 3);
  check('streak_7', gamification.streak >= 7);
  check('streak_14', gamification.streak >= 14);
  check('streak_30', gamification.streak >= 30);
  check('sessions_5', gamification.totalSessions >= 5);
  check('sessions_10', gamification.totalSessions >= 10);
  check('sessions_25', gamification.totalSessions >= 25);
  check('sessions_50', gamification.totalSessions >= 50);
  check('pomodoro_5', gamification.totalPomodoros >= 5);
  check('pomodoro_25', gamification.totalPomodoros >= 25);
  check('ai_chat', gamification.totalAIMessages >= 1);
  check('ai_power_user', gamification.totalAIMessages >= 50);
  check('notes_master', gamification.notesAdded >= 10);
  check('level_3', getLevelFromXP(gamification.xp).level >= 3);
  check('level_5', getLevelFromXP(gamification.xp).level >= 5);

  return newOnes;
}

export function updateStreak(gamification) {
  const today = new Date().toISOString().split('T')[0];
  const last = gamification.lastStudyDate;

  if (last === today) return gamification;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().split('T')[0];

  const newStreak = last === yStr ? gamification.streak + 1 : 1;

  return { ...gamification, streak: newStreak, lastStudyDate: today };
}
