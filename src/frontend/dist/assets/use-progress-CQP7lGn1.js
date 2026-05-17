import { c as createLucideIcon, e as useQueryClient, r as reactExports } from "./index-DrKPtmAy.js";
import { u as useActor, a as useQuery, b as useMutation, c as createActor } from "./backend-B89qqLjz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
const WATCHED_KEY = "lingua_watched";
const QUIZ_KEY = "lingua_quiz";
function loadLocal(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function useProgress() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const [watchedVideos, setWatchedVideos] = reactExports.useState(
    () => loadLocal(WATCHED_KEY)
  );
  const [quizResults, setQuizResults] = reactExports.useState(
    () => loadLocal(QUIZ_KEY)
  );
  const watchedQuery = useQuery({
    queryKey: ["watchedVideos"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getWatchedVideos();
      return raw.map((w) => ({
        videoId: w.videoId,
        videoTitle: "",
        watchedAt: Number(w.watchedAt),
        duration: ""
      }));
    },
    enabled: !!actor && !isFetching
  });
  const quizQuery = useQuery({
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
        completedAt: Number(r.takenAt)
      }));
    },
    enabled: !!actor && !isFetching
  });
  const markWatchedMutation = useMutation({
    mutationFn: async (videoId) => {
      if (actor) await actor.markVideoWatched(videoId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["watchedVideos"] })
  });
  const saveQuizMutation = useMutation({
    mutationFn: async (params) => {
      if (actor)
        await actor.saveQuizResult(
          params.videoId,
          BigInt(params.score),
          BigInt(params.correctAnswers),
          BigInt(params.totalQuestions)
        );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizResults"] })
  });
  const markVideoWatched = reactExports.useCallback(
    (videoId, videoTitle, duration) => {
      const entry = {
        videoId,
        videoTitle,
        watchedAt: Date.now(),
        duration
      };
      setWatchedVideos((prev) => {
        if (prev.find((v) => v.videoId === videoId)) return prev;
        const updated = [entry, ...prev];
        localStorage.setItem(WATCHED_KEY, JSON.stringify(updated));
        return updated;
      });
      markWatchedMutation.mutate(videoId);
    },
    [markWatchedMutation]
  );
  const saveQuizResult = reactExports.useCallback(
    (result) => {
      const entry = {
        ...result,
        id: `quiz-${Date.now()}`,
        completedAt: Date.now()
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
        totalQuestions: result.totalQuestions
      });
    },
    [saveQuizMutation]
  );
  const isVideoWatched = reactExports.useCallback(
    (videoId) => watchedVideos.some((v) => v.videoId === videoId),
    [watchedVideos]
  );
  const totalMinutesLearned = Math.round(
    watchedVideos.reduce((acc, v) => {
      const parts = v.duration.split(":").map(Number);
      return acc + (parts[0] * 60 + (parts[1] || 0)) / 60;
    }, 0)
  );
  reactExports.useEffect(() => {
    if (watchedQuery.data && watchedQuery.data.length > 0) {
      setWatchedVideos(watchedQuery.data);
      localStorage.setItem(WATCHED_KEY, JSON.stringify(watchedQuery.data));
    }
  }, [watchedQuery.data]);
  reactExports.useEffect(() => {
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
    streakDays: Math.min(watchedVideos.length * 3, 100)
  };
}
export {
  ChevronRight as C,
  useProgress as u
};
