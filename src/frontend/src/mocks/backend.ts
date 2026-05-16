import type { backendInterface } from "../backend";
import { Language } from "../backend";

export const mockBackend: backendInterface = {
  getQuizResults: async () => [
    {
      id: BigInt(1),
      score: BigInt(80),
      takenAt: BigInt(Date.now()),
      totalQuestions: BigInt(10),
      correctAnswers: BigInt(8),
      videoId: "video-1",
    },
    {
      id: BigInt(2),
      score: BigInt(60),
      takenAt: BigInt(Date.now() - 86400000),
      totalQuestions: BigInt(10),
      correctAnswers: BigInt(6),
      videoId: "video-2",
    },
  ],
  getUserProfile: async () => ({
    id: { toString: () => "user-1" } as any,
    displayName: "Alex Johnson",
    language: Language.Uzbek,
  }),
  getVocabulary: async () => [
    {
      id: BigInt(1),
      sourceVideoId: "video-1",
      englishText: "perseverance",
      savedAt: BigInt(Date.now()),
      translationText: "qat'iyatlilik",
    },
    {
      id: BigInt(2),
      sourceVideoId: "video-1",
      englishText: "eloquent",
      savedAt: BigInt(Date.now() - 3600000),
      translationText: "notiq",
    },
    {
      id: BigInt(3),
      sourceVideoId: "video-2",
      englishText: "resilience",
      savedAt: BigInt(Date.now() - 7200000),
      translationText: "bardoshlilik",
    },
  ],
  getWatchedVideos: async () => [
    {
      watchedAt: BigInt(Date.now() - 3600000),
      videoId: "video-1",
    },
    {
      watchedAt: BigInt(Date.now() - 86400000),
      videoId: "video-2",
    },
  ],
  markVideoWatched: async (_videoId: string) => undefined,
  saveQuizResult: async (_videoId, _score, _correctAnswers, _totalQuestions) => undefined,
  saveVocabularyWord: async (_englishText, _translationText, _sourceVideoId) => undefined,
  setDisplayName: async (_displayName: string) => undefined,
  setLanguagePreference: async (_language) => undefined,
};
