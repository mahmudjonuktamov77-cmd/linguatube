export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Category =
  | "Podcasts"
  | "Conversations"
  | "Stories"
  | "Songs"
  | "Interviews"
  | "Beginner"
  | "Intermediate"
  | "Advanced";
export type Language = "uzbek" | "russian";

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  level: Level;
  category: Category;
  description: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  uploadedAt: string;
}

export interface SubtitleLine {
  id: number;
  startTime: number; // seconds
  endTime: number;
  english: string;
  uzbek: string;
  russian: string;
}

export interface VocabEntry {
  id: string;
  word: string;
  translation: string;
  language: Language;
  sourceVideoId: string;
  sourceVideoTitle: string;
  context: string;
  savedAt: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  videoId: string;
}

export interface QuizResult {
  id: string;
  videoId: string;
  videoTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: number;
}

export interface WatchedVideo {
  videoId: string;
  videoTitle: string;
  watchedAt: number;
  duration: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  language: Language;
  streakDays: number;
  minutesLearned: number;
  wordsMastered: number;
}
