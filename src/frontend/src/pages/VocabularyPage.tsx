import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVocabulary } from "@/hooks/use-vocabulary";
import type { VocabEntry } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, PlayCircle, Search, Trash2 } from "lucide-react";
import { useState } from "react";

function VocabCard({
  entry,
  index,
  onDelete,
}: {
  entry: VocabEntry;
  index: number;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      data-ocid={`vocabulary.item.${index + 1}`}
      className="glass-card rounded-2xl p-4 flex items-start gap-3 animate-float-in"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-lg font-bold font-display text-foreground leading-tight truncate">
          {entry.word}
        </p>
        <p className="text-primary font-semibold text-sm mt-0.5 truncate">
          {entry.translation}
        </p>
        {entry.sourceVideoId && (
          <div className="mt-2 inline-flex items-center gap-1.5 bg-secondary/60 rounded-full px-2.5 py-0.5">
            <PlayCircle
              size={11}
              className="text-muted-foreground flex-shrink-0"
            />
            <span className="text-muted-foreground text-xs truncate max-w-[160px]">
              {entry.sourceVideoId}
            </span>
          </div>
        )}
      </div>
      <button
        type="button"
        data-ocid={`vocabulary.delete_button.${index + 1}`}
        onClick={() => onDelete(entry.id)}
        aria-label="Delete word"
        className="flex-shrink-0 p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default function VocabularyPage() {
  const { vocabulary, removeWord } = useVocabulary();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered: VocabEntry[] = query.trim()
    ? vocabulary.filter(
        (v) =>
          v.word.toLowerCase().includes(query.toLowerCase()) ||
          v.translation.toLowerCase().includes(query.toLowerCase()),
      )
    : vocabulary;

  const totalWords = vocabulary.length;

  return (
    <div data-ocid="vocabulary.page" className="flex flex-col min-h-full pb-20">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border/40 px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold font-display text-foreground">
            My Vocabulary
          </h1>
          <span className="bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
            {totalWords} {totalWords === 1 ? "word" : "words"}
          </span>
        </div>

        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            data-ocid="vocabulary.search_input"
            placeholder="Search words\u2026"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-4 bg-secondary/50 border-border/50 rounded-xl h-10 text-sm focus-visible:ring-primary focus-visible:border-primary/60 transition-smooth"
          />
        </div>

        {query.trim() && (
          <p className="text-xs text-muted-foreground mt-2">
            {filtered.length} {filtered.length === 1 ? "result" : "results"} for
            &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-4">
        {totalWords === 0 ? (
          <div
            data-ocid="vocabulary.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 shadow-glow">
              <BookOpen size={36} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">
              No words saved yet
            </h2>
            <p className="text-muted-foreground text-sm max-w-[240px] leading-relaxed mb-6">
              Tap{" "}
              <span className="text-primary font-semibold">
                &ldquo;Save Word&rdquo;
              </span>{" "}
              while watching videos to build your vocabulary list.
            </p>
            <Button
              data-ocid="vocabulary.go_home_button"
              onClick={() => navigate({ to: "/home" })}
              className="bg-gradient-brand text-primary-foreground font-semibold px-6 rounded-2xl h-11 shadow-glow transition-smooth hover:opacity-90"
            >
              Browse Videos
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="vocabulary.empty_state"
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <span className="text-4xl mb-3">&#x1F50D;</span>
            <p className="font-semibold text-foreground mb-1">
              No matches found
            </p>
            <p className="text-muted-foreground text-sm">
              Try a different word or phrase.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((entry, i) => (
              <VocabCard
                key={String(entry.id)}
                entry={entry}
                index={i}
                onDelete={removeWord}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
