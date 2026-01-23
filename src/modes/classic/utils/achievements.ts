/**
 * Reading Achievement System
 *
 * Gamification features to encourage reading and engagement
 * Tracks progress, awards badges, and celebrates milestones
 */

export interface Achievement {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ReadingStats {
  chaptersRead: number[];
  totalReadTime: number; // in seconds
  sessionCount: number;
  lastReadDate: string;
  readingStreak: number;
  achievements: Achievement[];
  firstReadDate: string;
}

const STORAGE_KEY = 'classic_reading_stats';

/**
 * All available achievements
 */
export const ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  {
    id: 'first_chapter',
    title: '첫 발걸음',
    titleEn: 'First Steps',
    description: '첫 번째 장을 읽었어요!',
    descriptionEn: 'Read your first chapter!',
    icon: '👣',
    rarity: 'common'
  },
  {
    id: 'chapter_3',
    title: '중간 지점',
    titleEn: 'Halfway There',
    description: '3장까지 읽었어요!',
    descriptionEn: 'Read up to chapter 3!',
    icon: '🎯',
    rarity: 'common'
  },
  {
    id: 'complete_story',
    title: '이야기 마스터',
    titleEn: 'Story Master',
    description: '모든 장을 읽었어요!',
    descriptionEn: 'Completed all chapters!',
    icon: '🏆',
    rarity: 'epic'
  },
  {
    id: 'reread',
    title: '다시 읽기',
    titleEn: 'Second Time Around',
    description: '한 장을 두 번 읽었어요!',
    descriptionEn: 'Read a chapter twice!',
    icon: '🔄',
    rarity: 'common'
  },
  {
    id: 'speed_reader',
    title: '빠른 독자',
    titleEn: 'Speed Reader',
    description: '한 세션에 3장 이상 읽었어요!',
    descriptionEn: 'Read 3+ chapters in one session!',
    icon: '⚡',
    rarity: 'rare'
  },
  {
    id: 'night_owl',
    title: '밤의 독자',
    titleEn: 'Night Owl',
    description: '밤 10시 이후에 읽었어요!',
    descriptionEn: 'Read after 10 PM!',
    icon: '🦉',
    rarity: 'rare'
  },
  {
    id: 'early_bird',
    title: '아침 독자',
    titleEn: 'Early Bird',
    description: '아침 7시 전에 읽었어요!',
    descriptionEn: 'Read before 7 AM!',
    icon: '🐦',
    rarity: 'rare'
  },
  {
    id: 'week_streak',
    title: '일주일 연속',
    titleEn: 'Week Warrior',
    description: '7일 연속 읽었어요!',
    descriptionEn: '7-day reading streak!',
    icon: '🔥',
    rarity: 'epic'
  },
  {
    id: 'bilingual',
    title: '이중 언어 독자',
    titleEn: 'Bilingual Reader',
    description: '한국어와 영어로 모두 읽었어요!',
    descriptionEn: 'Read in both Korean and English!',
    icon: '🌍',
    rarity: 'epic'
  },
  {
    id: 'marathon',
    title: '마라톤 독자',
    titleEn: 'Marathon Reader',
    description: '30분 이상 읽었어요!',
    descriptionEn: 'Read for 30+ minutes!',
    icon: '🏃',
    rarity: 'rare'
  }
];

/**
 * Load reading stats from localStorage
 */
export function loadReadingStats(): ReadingStats {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load reading stats:', error);
  }

  // Default stats
  return {
    chaptersRead: [],
    totalReadTime: 0,
    sessionCount: 0,
    lastReadDate: new Date().toISOString(),
    readingStreak: 0,
    achievements: ACHIEVEMENTS.map(a => ({ ...a, unlocked: false })),
    firstReadDate: new Date().toISOString()
  };
}

/**
 * Save reading stats to localStorage
 */
export function saveReadingStats(stats: ReadingStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save reading stats:', error);
  }
}

/**
 * Record chapter read
 */
export function recordChapterRead(chapterId: number): { stats: ReadingStats; newAchievements: Achievement[] } {
  const stats = loadReadingStats();
  const newAchievements: Achievement[] = [];

  // Add chapter to read list if not already there
  if (!stats.chaptersRead.includes(chapterId)) {
    stats.chaptersRead.push(chapterId);
  }

  // Update last read date
  stats.lastReadDate = new Date().toISOString();

  // Check achievements
  const unlockAchievement = (id: string) => {
    const achievement = stats.achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
      newAchievements.push(achievement);
    }
  };

  // First chapter
  if (stats.chaptersRead.length >= 1) {
    unlockAchievement('first_chapter');
  }

  // Halfway
  if (stats.chaptersRead.length >= 3) {
    unlockAchievement('chapter_3');
  }

  // Complete story
  if (stats.chaptersRead.length >= 7) {
    unlockAchievement('complete_story');
  }

  // Re-read (count occurrences)
  const chapterCounts = stats.chaptersRead.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  if (Object.values(chapterCounts).some(count => count > 1)) {
    unlockAchievement('reread');
  }

  // Time-based achievements
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 6) {
    unlockAchievement('night_owl');
  }
  if (hour < 7) {
    unlockAchievement('early_bird');
  }

  saveReadingStats(stats);
  return { stats, newAchievements };
}

/**
 * Record reading session
 */
export function recordReadingSession(chaptersReadThisSession: number, timeSpentSeconds: number): { stats: ReadingStats; newAchievements: Achievement[] } {
  const stats = loadReadingStats();
  const newAchievements: Achievement[] = [];

  stats.sessionCount += 1;
  stats.totalReadTime += timeSpentSeconds;

  const unlockAchievement = (id: string) => {
    const achievement = stats.achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
      newAchievements.push(achievement);
    }
  };

  // Speed reader
  if (chaptersReadThisSession >= 3) {
    unlockAchievement('speed_reader');
  }

  // Marathon
  if (timeSpentSeconds >= 1800) { // 30 minutes
    unlockAchievement('marathon');
  }

  // Calculate streak
  const today = new Date().toDateString();
  const lastRead = new Date(stats.lastReadDate).toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastRead === today) {
    // Same day, streak continues
  } else if (lastRead === yesterday) {
    // Consecutive day
    stats.readingStreak += 1;
  } else {
    // Streak broken
    stats.readingStreak = 1;
  }

  // Week streak
  if (stats.readingStreak >= 7) {
    unlockAchievement('week_streak');
  }

  saveReadingStats(stats);
  return { stats, newAchievements };
}

/**
 * Check if language switch happened (for bilingual achievement)
 */
export function checkBilingualAchievement(currentLanguage: 'ko' | 'en'): Achievement | null {
  const stats = loadReadingStats();
  const key = 'last_language';
  const lastLanguage = localStorage.getItem(key);

  if (lastLanguage && lastLanguage !== currentLanguage) {
    const achievement = stats.achievements.find(a => a.id === 'bilingual');
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
      saveReadingStats(stats);
      return achievement;
    }
  }

  localStorage.setItem(key, currentLanguage);
  return null;
}

/**
 * Get rarity color
 */
export function getRarityColor(rarity: Achievement['rarity']): string {
  const colors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-indigo-500',
    epic: 'from-purple-400 to-pink-500',
    legendary: 'from-yellow-400 to-orange-500'
  };
  return colors[rarity];
}

/**
 * Get progress percentage
 */
export function getReadingProgress(): number {
  const stats = loadReadingStats();
  const uniqueChapters = new Set(stats.chaptersRead);
  return (uniqueChapters.size / 7) * 100;
}
