import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export interface WatchedVideo {
    watchedAt: Timestamp;
    videoId: VideoId;
}
export type Timestamp = bigint;
export interface PublicUserProfile {
    id: UserId;
    streak: bigint;
    displayName: string;
    profileImage: string;
    createdAt: Timestamp;
    email: string;
    language: Language;
    points: bigint;
}
export type VideoId = string;
export interface QuizResult {
    id: bigint;
    score: bigint;
    takenAt: Timestamp;
    totalQuestions: bigint;
    correctAnswers: bigint;
    videoId: VideoId;
}
export interface VocabEntry {
    id: bigint;
    sourceVideoId: VideoId;
    englishText: string;
    savedAt: Timestamp;
    translationText: string;
}
export enum Language {
    Uzbek = "Uzbek",
    Russian = "Russian"
}
export interface backendInterface {
    getAllUsers(): Promise<Array<PublicUserProfile>>;
    getIsAdmin(email: string): Promise<boolean>;
    getLeaderboard(): Promise<Array<PublicUserProfile>>;
    getQuizResults(): Promise<Array<QuizResult>>;
    getUserProfile(): Promise<PublicUserProfile | null>;
    getVocabulary(): Promise<Array<VocabEntry>>;
    getWatchedVideos(): Promise<Array<WatchedVideo>>;
    markVideoWatched(videoId: VideoId): Promise<void>;
    saveQuizResult(videoId: VideoId, score: bigint, correctAnswers: bigint, totalQuestions: bigint): Promise<void>;
    saveVocabularyWord(englishText: string, translationText: string, sourceVideoId: VideoId): Promise<void>;
    setDisplayName(displayName: string): Promise<void>;
    setEmail(email: string): Promise<void>;
    setLanguagePreference(language: Language): Promise<void>;
    setProfileImage(imageUrl: string): Promise<void>;
    updateUserPoints(points: bigint): Promise<void>;
    updateUserStreak(streak: bigint): Promise<void>;
}
