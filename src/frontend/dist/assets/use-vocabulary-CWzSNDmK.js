import { u as useActor, a as useQuery, b as useMutation, c as createActor } from "./backend-4JeLCclE.js";
import { e as useQueryClient, r as reactExports } from "./index-DtATHlMl.js";
const VOCAB_STORAGE_KEY = "lingua_vocab";
function loadLocalVocab() {
  try {
    const raw = localStorage.getItem(VOCAB_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveLocalVocab(entries) {
  localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(entries));
}
function useVocabulary() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const [localVocab, setLocalVocab] = reactExports.useState(loadLocalVocab);
  const backendQuery = useQuery({
    queryKey: ["vocabulary"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getVocabulary();
      return raw.map((e) => ({
        id: String(e.id),
        word: e.englishText,
        translation: e.translationText,
        language: "uzbek",
        sourceVideoId: e.sourceVideoId,
        sourceVideoTitle: "",
        context: "",
        savedAt: Number(e.savedAt)
      }));
    },
    enabled: !!actor && !isFetching
  });
  const saveMutation = useMutation({
    mutationFn: async (params) => {
      if (actor) {
        await actor.saveVocabularyWord(
          params.word,
          params.translation,
          params.sourceVideoId
        );
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vocabulary"] })
  });
  const saveWord = reactExports.useCallback(
    (entry) => {
      const newEntry = {
        ...entry,
        id: `local-${Date.now()}`,
        savedAt: Date.now()
      };
      setLocalVocab((prev) => {
        const updated = [newEntry, ...prev];
        saveLocalVocab(updated);
        return updated;
      });
      saveMutation.mutate({
        word: entry.word,
        translation: entry.translation,
        sourceVideoId: entry.sourceVideoId
      });
    },
    [saveMutation]
  );
  const removeWord = reactExports.useCallback((id) => {
    setLocalVocab((prev) => {
      const updated = prev.filter((v) => v.id !== id);
      saveLocalVocab(updated);
      return updated;
    });
  }, []);
  const isWordSaved = reactExports.useCallback(
    (word) => localVocab.some((v) => v.word.toLowerCase() === word.toLowerCase()),
    [localVocab]
  );
  reactExports.useEffect(() => {
    if (backendQuery.data && backendQuery.data.length > 0) {
      setLocalVocab((prev) => {
        const merged = [...backendQuery.data];
        for (const lv of prev) {
          if (!merged.find((bv) => bv.word === lv.word)) merged.push(lv);
        }
        saveLocalVocab(merged);
        return merged;
      });
    }
  }, [backendQuery.data]);
  return {
    vocabulary: localVocab,
    isLoading: backendQuery.isLoading,
    saveWord,
    removeWord,
    isWordSaved,
    totalWords: localVocab.length
  };
}
export {
  useVocabulary as u
};
