import { Button } from "@/components/ui/button";
import { MOCK_SUBTITLES, MOCK_VIDEOS } from "@/data/mockData";
import { useProgress } from "@/hooks/use-progress";
import { useVocabulary } from "@/hooks/use-vocabulary";
import type { Language } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  BookmarkCheck,
  BookmarkPlus,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Pause,
  Play,
  Repeat2,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const TOTAL_DURATION = 52; // mock duration seconds
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5] as const;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ── Word Picker Sheet ──────────────────────────────────────────
interface WordPickerProps {
  words: string[];
  translations: string[];
  onSave: (word: string, translation: string) => void;
  onClose: () => void;
  savedWords: Set<string>;
}

function WordPicker({
  words,
  translations,
  onSave,
  onClose,
  savedWords,
}: WordPickerProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSave = () => {
    if (selected === null) return;
    onSave(words[selected], translations[selected]);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close word picker"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default w-full"
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        data-ocid="word_picker.dialog"
        className="relative w-full max-w-[430px] glass-card rounded-t-3xl p-6 pb-safe shadow-premium"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-border/60 mx-auto mb-5" />

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-foreground text-base">
            Pick a word to save
          </h3>
          <button
            type="button"
            data-ocid="word_picker.close_button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {words.map((word, i) => {
            const isSaved = savedWords.has(word.toLowerCase());
            const isSelected = selected === i;
            return (
              <button
                key={word}
                type="button"
                data-ocid={`word_picker.word.${i + 1}`}
                onClick={() => !isSaved && setSelected(isSelected ? null : i)}
                disabled={isSaved}
                className={[
                  "px-3 py-1.5 rounded-xl text-sm font-medium transition-smooth border",
                  isSaved
                    ? "bg-accent/10 border-accent/30 text-accent/60 cursor-default"
                    : isSelected
                      ? "bg-primary border-primary text-primary-foreground shadow-glow"
                      : "bg-muted/40 border-border/40 text-foreground hover:border-primary/50 hover:text-primary",
                ].join(" ")}
              >
                {isSaved && <BookmarkCheck size={11} className="inline mr-1" />}
                {word}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <motion.div
            className="glass-card rounded-2xl p-3 mb-4 border border-primary/20"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs text-muted-foreground mb-0.5">Translation</p>
            <p className="text-foreground font-medium">
              {translations[selected]}
            </p>
          </motion.div>
        )}

        <Button
          type="button"
          data-ocid="word_picker.confirm_button"
          onClick={handleSave}
          disabled={selected === null}
          className="w-full rounded-xl h-12 font-semibold text-sm"
        >
          <BookmarkPlus size={16} className="mr-2" />
          Save word
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function VideoPlayerPage() {
  const { id } = useParams({ from: "/video/$id" });
  const navigate = useNavigate();
  const { saveWord, isWordSaved } = useVocabulary();
  const { markVideoWatched } = useProgress();

  const video = MOCK_VIDEOS.find((v) => v.id === id) ?? MOCK_VIDEOS[0];
  const language = (localStorage.getItem("linguatube_language") ??
    "uzbek") as Language;

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [showWordPicker, setShowWordPicker] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPodcastMode, setIsPodcastMode] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync audio mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = 1.0;
    }
  }, [isMuted]);

  // Simulate playback
  useEffect(() => {
    if (isPlaying) {
      // Resume audio if available
      if (audioRef.current) {
        audioRef.current.muted = isMuted;
        audioRef.current.volume = 1.0;
        audioRef.current.play().catch(() => {
          // Browser may block autoplay — that's fine, subtitles still work
        });
      }
      intervalRef.current = setInterval(() => {
        setCurrentTime((t) => {
          const next = t + speed * 0.5;
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false);
            if (audioRef.current) audioRef.current.pause();
            markVideoWatched(video.id, video.title, video.duration);
            return TOTAL_DURATION;
          }
          return next;
        });
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) audioRef.current.pause();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, video, markVideoWatched, isMuted]);

  const activeSub = MOCK_SUBTITLES.find(
    (s) => currentTime >= s.startTime && currentTime < s.endTime,
  );

  // Extract word list from current subtitle
  const subWords = activeSub
    ? activeSub.english
        .replace(/[^a-zA-Z' ]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 2)
    : [];

  const subTranslations = activeSub
    ? subWords.map((word) => {
        const src = language === "uzbek" ? activeSub.uzbek : activeSub.russian;
        const srcWords = src
          .replace(/[^\w\s']/g, "")
          .split(/\s+/)
          .filter((w) => w.length > 1);
        const idx = subWords.indexOf(word);
        return srcWords[idx] ?? srcWords[0] ?? src;
      })
    : [];

  const savedSet = new Set(subWords.filter((w) => isWordSaved(w)));

  const handleRepeat = useCallback(() => {
    if (activeSub) {
      setCurrentTime(activeSub.startTime);
    } else {
      setCurrentTime(Math.max(0, currentTime - 3));
    }
  }, [activeSub, currentTime]);

  const handleSaveWord = useCallback(
    (word: string, translation: string) => {
      saveWord({
        word,
        translation,
        language,
        sourceVideoId: video.id,
        sourceVideoTitle: video.title,
        context: activeSub?.english ?? "",
      });
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    },
    [saveWord, language, video, activeSub],
  );

  const progressPct = Math.min((currentTime / TOTAL_DURATION) * 100, 100);

  return (
    <div
      data-ocid="video_player.page"
      className="flex flex-col min-h-screen bg-background"
    >
      {/* Hidden audio element for real audio playback */}
      {/* biome-ignore lint/a11y/useMediaCaption: not relevant for background audio */}
      <audio ref={audioRef} src="" preload="none" />

      {/* ── Video Area ─────────────────────────────── */}
      <div className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
        {/* Thumbnail backdrop */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isPodcastMode ? 0.15 : isPlaying ? 0.35 : 0.6 }}
        />

        {/* Podcast mode overlay */}
        {isPodcastMode && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.58 0.18 22 / 0.2)",
                border: "2px solid oklch(0.58 0.18 22 / 0.5)",
              }}
            >
              <Headphones size={36} style={{ color: "oklch(0.68 0.2 35)" }} />
            </div>
            <p
              className="text-sm font-semibold tracking-wide"
              style={{ color: "oklch(0.68 0.2 35)" }}
            >
              Audio Only Mode
            </p>
          </div>
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Back button */}
        <button
          type="button"
          data-ocid="video_player.back_button"
          onClick={() => navigate({ to: "/home" })}
          className="absolute top-4 left-4 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center transition-smooth hover:bg-black/70 active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        {/* Level badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={[
              "text-xs font-semibold px-2.5 py-1 rounded-full",
              video.level === "Beginner"
                ? "level-beginner"
                : video.level === "Intermediate"
                  ? "level-intermediate"
                  : "level-advanced",
            ].join(" ")}
          >
            {video.level}
          </span>
        </div>

        {/* Center Play/Pause */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <motion.button
            type="button"
            data-ocid="video_player.play_pause_button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={() => setIsPlaying((p) => !p)}
            className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center shadow-premium pointer-events-auto cursor-pointer"
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  <Pause size={24} fill="white" className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  <Play size={24} fill="white" className="text-white ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="h-0.5 bg-white/20">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progressPct}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>

      {/* ── Controls Bar ──────────────────────────── */}
      <div className="bg-card border-b border-border/40 px-4 py-3">
        {/* Time + speed row */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-mono text-muted-foreground tabular-nums">
            {formatTime(currentTime)}
            <span className="text-border/80 mx-1">/</span>
            {formatTime(TOTAL_DURATION)}
          </span>

          {/* Speed pills */}
          <fieldset
            className="flex gap-1 border-none p-0 m-0"
            aria-label="Playback speed"
          >
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                data-ocid={`video_player.speed_${String(s).replace(".", "_")}x`}
                onClick={() => setSpeed(s)}
                aria-pressed={speed === s}
                className={[
                  "min-w-[34px] px-1.5 py-1 rounded-lg text-xs font-semibold transition-smooth",
                  speed === s
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted",
                ].join(" ")}
              >
                {s}×
              </button>
            ))}
          </fieldset>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="video_player.rewind_button"
            onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-smooth text-xs font-medium active:scale-95"
            aria-label="Rewind 10 seconds"
          >
            <RotateCcw size={14} />
            <span>10s</span>
          </button>

          <button
            type="button"
            data-ocid="video_player.repeat_button"
            onClick={handleRepeat}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-smooth text-xs font-medium active:scale-95"
            aria-label="Repeat sentence"
          >
            <Repeat2 size={14} />
            <span>Repeat</span>
          </button>

          <button
            type="button"
            data-ocid="video_player.mute_button"
            onClick={() => setIsMuted((m) => !m)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-smooth text-xs font-medium active:scale-95"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          <button
            type="button"
            data-ocid="video_player.podcast_mode_button"
            onClick={() => setIsPodcastMode((p) => !p)}
            className={[
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-smooth active:scale-95",
              isPodcastMode
                ? "bg-primary/15 border border-primary/40 text-primary"
                : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70",
            ].join(" ")}
            aria-label={
              isPodcastMode ? "Disable podcast mode" : "Enable podcast mode"
            }
            aria-pressed={isPodcastMode}
          >
            <Headphones size={14} />
            <span>Audio</span>
          </button>

          <button
            type="button"
            data-ocid="video_player.save_word_button"
            onClick={() => activeSub && setShowWordPicker(true)}
            disabled={!activeSub}
            className={[
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-smooth active:scale-95 ml-auto",
              justSaved
                ? "bg-accent/20 text-accent border border-accent/30"
                : activeSub
                  ? "bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25"
                  : "bg-muted/20 text-muted-foreground/50 cursor-not-allowed",
            ].join(" ")}
          >
            {justSaved ? (
              <>
                <BookmarkCheck size={14} />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <BookmarkPlus size={14} />
                <span>Save word</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Subtitle + Info Section ───────────────── */}
      <div className="flex-1 flex flex-col gap-3 px-4 pt-4 pb-6">
        {/* Video title */}
        <div className="flex items-center gap-2 min-w-0">
          <ChevronRight size={14} className="text-primary shrink-0" />
          <h2 className="font-display font-semibold text-foreground text-sm truncate leading-tight">
            {video.title}
          </h2>
        </div>

        {/* Subtitle card */}
        <AnimatePresence mode="wait">
          {activeSub ? (
            <motion.div
              key={activeSub.id}
              data-ocid="video_player.subtitle_card"
              className="glass-card rounded-2xl overflow-hidden shadow-premium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {/* English subtitle */}
              <div className="px-5 pt-5 pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  English
                </p>
                <p className="text-foreground text-xl font-medium leading-snug">
                  {activeSub.english}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent mx-5" />

              {/* Translation */}
              <div className="px-5 pt-4 pb-5">
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "oklch(var(--primary))" }}
                >
                  {language === "uzbek" ? "O'zbek" : "Русский"}
                </p>
                <p className="text-foreground/85 text-base leading-snug">
                  {language === "uzbek" ? activeSub.uzbek : activeSub.russian}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              data-ocid="video_player.subtitle_empty_state"
              className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isPlaying ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Waiting for subtitle...
                  </p>
                </>
              ) : (
                <>
                  <div className="text-3xl mb-3">▶</div>
                  <p className="text-foreground/70 font-medium text-sm mb-1">
                    Press play to start
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Subtitles will appear here
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Channel info */}
        <div className="flex items-center gap-3 mt-1 px-1">
          <img
            src={video.channelAvatar}
            alt={video.channelName}
            className="w-7 h-7 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              {video.channelName}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {video.views} views · {video.uploadedAt}
            </p>
          </div>
        </div>
      </div>

      {/* ── Word Picker Sheet ─────────────────────── */}
      <AnimatePresence>
        {showWordPicker && activeSub && (
          <WordPicker
            words={subWords}
            translations={subTranslations}
            onSave={handleSaveWord}
            onClose={() => setShowWordPicker(false)}
            savedWords={savedSet}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
