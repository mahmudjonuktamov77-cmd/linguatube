import { createActor } from "@/backend";
import type { Language, VocabEntry } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

const VOCAB_STORAGE_KEY = "lingua_vocab";

function loadLocalVocab(): VocabEntry[] {
  try {
    const raw = localStorage.getItem(VOCAB_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as VocabEntry[]) : [];
  } catch {
    return [];
  }
}

function saveLocalVocab(entries: VocabEntry[]) {
  localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(entries));
}

export function useVocabulary() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const [localVocab, setLocalVocab] = useState<VocabEntry[]>(loadLocalVocab);

  const backendQuery = useQuery<VocabEntry[]>({
    queryKey: ["vocabulary"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getVocabulary();
      return raw.map((e) => ({
        id: String(e.id),
        word: e.englishText,
        translation: e.translationText,
        language: "uzbek" as Language,
        sourceVideoId: e.sourceVideoId,
        sourceVideoTitle: "",
        context: "",
        savedAt: Number(e.savedAt),
      }));
    },
    enabled: !!actor && !isFetching,
  });

  const saveMutation = useMutation({
    mutationFn: async (params: {
      word: string;
      translation: string;
      sourceVideoId: string;
    }) => {
      if (actor) {
        await actor.saveVocabularyWord(
          params.word,
          params.translation,
          params.sourceVideoId,
        );
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] }),
  });

  const saveWord = useCallback(
    (entry: Omit<VocabEntry, "id" | "savedAt">) => {
      const newEntry: VocabEntry = {
        ...entry,
        id: `local-${Date.now()}`,
        savedAt: Date.now(),
      };
      setLocalVocab((prev) => {
        const updated = [newEntry, ...prev];
        saveLocalVocab(updated);
        return updated;
      });
      saveMutation.mutate({
        word: entry.word,
        translation: entry.translation,
        sourceVideoId: entry.sourceVideoId,
      });
    },
    [saveMutation],
  );

  const removeWord = useCallback((id: string) => {
    setLocalVocab((prev) => {
      const updated = prev.filter((v) => v.id !== id);
      saveLocalVocab(updated);
      return updated;
    });
  }, []);

  const isWordSaved = useCallback(
    (word: string) =>
      localVocab.some((v) => v.word.toLowerCase() === word.toLowerCase()),
    [localVocab],
  );

  // Merge backend vocab into local on load
  useEffect(() => {
    if (backendQuery.data && backendQuery.data.length > 0) {
      setLocalVocab((prev) => {
        const merged = [...backendQuery.data!];
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
    totalWords: localVocab.length,
  };
}
