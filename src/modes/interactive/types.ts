/**
 * Type definitions for Interactive Q-Build-CoLab system
 */

// Session Data Types
export interface SessionData {
  pageIndex: number;
  chapterId: number;
  chapterTitle: string;
  questionAnswered: boolean;
  selectedChoice: 'A' | 'B';
  usedAI: boolean;
  aiContinuation: string | null;
  reflection: string;
  timestamp: string;
  timeSpentMs: number;
}

// Page State
export type PageState = 'story' | 'question' | 'choice' | 'ai' | 'reflection';

// Component Props
export interface InteractivePageProps {
  chapter: Chapter;
  pageIndex: number;
  totalPages: number;
  onComplete: (data: SessionData) => void;
  onOpenSettings?: () => void;
}

export interface QuestionBlockProps {
  chapterId: number;
  onContinue: (answered: boolean) => void;
}

export interface ChoiceBlockProps {
  chapterId: number;
  onChoice: (choice: 'A' | 'B') => void;
}

export interface AIWriterFriendProps {
  chapterId: number;
  selectedChoice: 'A' | 'B';
  storyContext: string;
  onContinue: (aiText: string | null) => void;
  onOpenSettings?: () => void;
}

export interface ReflectionBlockProps {
  selectedChoice: 'A' | 'B';
  onSubmit: (reflection: string) => void;
}

export interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

// Story Chapter Type (imported from shared)
export interface Chapter {
  id: number;
  title: string;
  titleEn: string;
  content: string[];
  contentEn: string[];
  image: string;
}

// Analytics Types (for future parent dashboard)
export interface AnalyticsSummary {
  totalSessions: number;
  completedChapters: number;
  averageReflectionLength: number;
  reflectionLengthTrend: number[];
  aiUsageRate: number;
  averageTimePerPage: number;
  skipRate: {
    questions: number;
    reflections: number;
  };
}
