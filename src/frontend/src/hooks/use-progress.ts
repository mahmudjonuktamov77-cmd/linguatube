import { createActor } from "@/backend";
import type { QuizResult, WatchedVideo } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

const WATCHED_KEY = "lingua_watched";
const QUIZ_KEY = "lingua_quiz";

function loadLocal<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function useProgress() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const [watchedVideos, setWatchedVideos] = useState<WatchedVideo[]>(() =>
    loadLocal<WatchedVideo>(WATCHED_KEY),
  );
  const [quizResults, setQuizResults] = useState<QuizResult[]>(() =>
    loadLocal<QuizResult>(QUIZ_KEY),
  );

  const watchedQuery = useQuery<WatchedVideo[]>({
    queryKey: ["watchedVideos"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getWatchedVideos();
      return raw.map((w) => ({
        videoId: w.videoId,
        videoTitle: "",
        watchedAt: Number(w.watchedAt),
        duration: "",
      }));
    },
    enabled: !!actor && !isFetching,
  });

  const quizQuery = useQuery<QuizResult[]>({
    queryKey: ["quizResults"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getQuizResults();
      return raw.map((r) => ({
        id: String(r.id),
        videoId: r.videoId,
        videoTitle: "",
        score: Number(r.score),
        correctAnswers: Number(r.correctAnswers),
        totalQuestions: Number(r.totalQuestions),
        completedAt: Number(r.takenAt),
      }));
    },
    enabled: !!actor && !isFetching,
  });

  const markWatchedMutation = useMutation({
    mutationFn: async (videoId: string) => {
      if (actor) await actor.markVideoWatched(videoId);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["watchedVideos"] }),
  });

  const saveQuizMutation = useMutation({
    mutationFn: async (params: {
      videoId: string;
      score: number;
      correctAnswers: number;
      totalQuestions: number;
    }) => {
      if (actor)
        await actor.saveQuizResult(
          params.videoId,
          BigInt(params.score),
          BigInt(params.correctAnswers),
          BigInt(params.totalQuestions),
        );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["quizResults"] }),
  });

  const markVideoWatched = useCallback(
    (videoId: string, videoTitle: string, duration: string) => {
      const entry: WatchedVideo = {
        videoId,
        videoTitle,
        watchedAt: Date.now(),
        duration,
      };
      setWatchedVideos((prev) => {
        if (prev.find((v) => v.videoId === videoId)) return prev;
        const updated = [entry, ...prev];
        localStorage.setItem(WATCHED_KEY, JSON.stringify(updated));
        return updated;
      });
      markWatchedMutation.mutate(videoId);
    },
    [markWatchedMutation],
  );

  const saveQuizResult = useCallback(
    (result: Omit<QuizResult, "id" | "completedAt">) => {
      const entry: QuizResult = {
        ...result,
        id: `quiz-${Date.now()}`,
        completedAt: Date.now(),
      };
      setQuizResults((prev) => {
        const updated = [entry, ...prev];
        localStorage.setItem(QUIZ_KEY, JSON.stringify(updated));
        return updated;
      });
      saveQuizMutation.mutate({
        videoId: result.videoId,
        score: result.score,
        correctAnswers: result.correctAnswers,
        totalQuestions: result.totalQuestions,
      });
    },
    [saveQuizMutation],
  );

  const isVideoWatched = useCallback(
    (videoId: string) => watchedVideos.some((v) => v.videoId === videoId),
    [watchedVideos],
  );

  const totalMinutesLearned = Math.round(
    watchedVideos.reduce((acc, v) => {
      const parts = v.duration.split(":").map(Number);
      return acc + (parts[0] * 60 + (parts[1] || 0)) / 60;
    }, 0),
  );

  useEffect(() => {
    if (watchedQuery.data && watchedQuery.data.length > 0) {
      setWatchedVideos(watchedQuery.data);
      localStorage.setItem(WATCHED_KEY, JSON.stringify(watchedQuery.data));
    }
  }, [watchedQuery.data]);

  useEffect(() => {
    if (quizQuery.data && quizQuery.data.length > 0) {
      setQuizResults(quizQuery.data);
      localStorage.setItem(QUIZ_KEY, JSON.stringify(quizQuery.data));
    }
  }, [quizQuery.data]);

  return {
    watchedVideos,
    quizResults,
    markVideoWatched,
    saveQuizResult,
    isVideoWatched,
    totalMinutesLearned,
    streakDays: Math.min(watchedVideos.length * 3, 100),
  };
}
