import { Switch } from "@/components/ui/switch";
import { MOCK_VIDEOS } from "@/data/mockData";
import { useProgress } from "@/hooks/use-progress";
import { useVocabulary } from "@/hooks/use-vocabulary";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Flame,
  Info,
  Moon,
  Play,
  Trophy,
  User,
} from "lucide-react";

const LANG_MAP: Record<string, { label: string; flag: string }> = {
  uzbek: { label: "O'zbek", flag: "🇺🇿" },
  russian: { label: "Russian", flag: "🇷🇺" },
};

// Circular progress ring (SVG)
function ProgressRing({
  value,
  max,
  size = 88,
  stroke = 7,
  color = "oklch(0.58 0.18 22)",
  label,
  sublabel,
}: {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
  color?: string;
  label: string;
  sublabel: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / Math.max(max, 1), 1);
  const dash = circ * pct;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: "rotate(-90deg)" }}
          aria-hidden="true"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="oklch(0.2 0.008 265)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{
              transition: "stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ transform: "none" }}
        >
          <span className="font-bold text-foreground text-base leading-none">
            {value}
          </span>
          <span className="text-muted-foreground text-[9px] leading-none mt-0.5">
            /{max}
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-foreground text-xs font-semibold leading-none">
          {label}
        </p>
        <p className="text-muted-foreground text-[10px] mt-0.5">{sublabel}</p>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  delay?: number;
}) {
  return (
    <div
      className="flex-1 glass-card rounded-2xl p-3.5 flex flex-col items-center gap-1.5 animate-float-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-0.5"
        style={{ background: `${color}22`, border: `1px solid ${color}44` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <span className="font-bold text-foreground text-lg leading-none">
        {value}
      </span>
      <span className="text-muted-foreground text-[10px] text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function SettingsRow({
  icon: Icon,
  label,
  value,
  onClick,
  trailing,
  ocid,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
  ocid: string;
}) {
  const content = (
    <div
      data-ocid={ocid}
      className="flex items-center gap-3 bg-card rounded-2xl p-4 border border-border/30 hover:border-primary/30 transition-smooth"
    >
      <div className="w-8 h-8 rounded-xl bg-muted/60 flex items-center justify-center flex-shrink-0">
        <Icon size={15} className="text-muted-foreground" />
      </div>
      <span className="flex-1 text-foreground text-sm font-medium">
        {label}
      </span>
      {value && <span className="text-muted-foreground text-sm">{value}</span>}
      {trailing}
      {onClick && (
        <ChevronRight
          size={16}
          className="text-muted-foreground flex-shrink-0"
        />
      )}
    </div>
  );

  return onClick ? (
    <button type="button" className="w-full text-left" onClick={onClick}>
      {content}
    </button>
  ) : (
    content
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { watchedVideos, quizResults, totalMinutesLearned } = useProgress();
  const { totalWords } = useVocabulary();

  const language = localStorage.getItem("linguatube_language") ?? "uzbek";
  const langInfo = LANG_MAP[language] ?? { label: language, flag: "🌐" };

  const avgScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((a, r) => a + r.score, 0) / quizResults.length,
        )
      : 0;

  // Mock streak = 7 days, weekly target = 60 min
  const STREAK_DAYS = 7;
  const WEEKLY_TARGET = 60;
  const weeklyMinutes = Math.min(totalMinutesLearned + 45, WEEKLY_TARGET);

  return (
    <div
      data-ocid="profile.page"
      className="flex flex-col min-h-full bg-background pb-24"
    >
      {/* Header / Hero section */}
      <div className="bg-card border-b border-border/40 px-4 pt-6 pb-8">
        <h1 className="text-xl font-bold font-display text-foreground mb-5">
          Profile
        </h1>

        {/* Avatar + info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow flex-shrink-0">
              <User size={28} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent border-2 border-card" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground text-base">
              Language Learner
            </p>
            <p className="text-muted-foreground text-sm mt-0.5">
              Learning English
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30">
              <span className="text-sm">{langInfo.flag}</span>
              <span className="text-primary text-xs font-semibold">
                {langInfo.label}
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-2.5">
          <StatCard
            icon={BookOpen}
            label="Words Saved"
            value={totalWords}
            color="oklch(0.65 0.15 142)"
            delay={0}
          />
          <StatCard
            icon={Play}
            label="Videos"
            value={watchedVideos.length}
            color="oklch(0.58 0.18 22)"
            delay={80}
          />
          <StatCard
            icon={Trophy}
            label="Quiz Avg"
            value={`${avgScore}%`}
            color="oklch(0.75 0.18 55)"
            delay={160}
          />
        </div>
      </div>

      {/* Progress section */}
      <div className="px-4 py-5">
        <h2 className="font-bold font-display text-foreground text-base mb-4">
          Your Progress
        </h2>
        <div
          data-ocid="profile.progress_section"
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-center justify-around">
            <ProgressRing
              value={STREAK_DAYS}
              max={30}
              size={88}
              stroke={7}
              color="oklch(0.58 0.18 22)"
              label="Day Streak"
              sublabel="30-day goal"
            />
            <div className="w-px h-16 bg-border/50" />
            <ProgressRing
              value={weeklyMinutes}
              max={WEEKLY_TARGET}
              size={88}
              stroke={7}
              color="oklch(0.65 0.15 142)"
              label="Study Min"
              sublabel="Weekly goal"
            />
            <div className="w-px h-16 bg-border/50" />
            <ProgressRing
              value={totalWords}
              max={100}
              size={88}
              stroke={7}
              color="oklch(0.75 0.18 55)"
              label="Vocab"
              sublabel="100-word goal"
            />
          </div>

          {/* Streak flame badge */}
          <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-border/30">
            <Flame size={16} className="text-primary" />
            <span className="text-foreground text-sm font-semibold">
              {STREAK_DAYS}-day streak
            </span>
            <span className="text-muted-foreground text-xs">
              · Keep it going!
            </span>
            <Clock size={14} className="text-accent ml-2" />
            <span className="text-accent text-xs font-medium">
              {weeklyMinutes}/{WEEKLY_TARGET} min
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 pb-5">
        <h2 className="font-bold font-display text-foreground text-base mb-4">
          Recent Activity
        </h2>

        {/* Watched videos */}
        {watchedVideos.length === 0 ? (
          <div
            data-ocid="profile.watched_empty_state"
            className="text-center py-6 glass-card rounded-2xl mb-3"
          >
            <Play size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              No videos watched yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5 mb-3">
            {watchedVideos.slice(0, 3).map((w, i) => {
              const video = MOCK_VIDEOS.find((v) => v.id === w.videoId);
              return (
                <div
                  key={w.videoId}
                  data-ocid={`profile.watched_item.${i + 1}`}
                  className="flex items-center gap-3 bg-card rounded-2xl p-3 border border-border/30 animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                    {video ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                    ) : (
                      <Play size={16} className="text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm font-medium truncate">
                      {w.videoTitle || video?.title || `Video ${w.videoId}`}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {new Date(w.watchedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quiz results */}
        {quizResults.slice(0, 2).map((r, i) => (
          <div
            key={r.id}
            data-ocid={`profile.quiz_item.${i + 1}`}
            className="flex items-center gap-3 bg-card rounded-2xl p-3 border border-border/30 mb-2.5 animate-fade-up"
            style={{ animationDelay: `${(i + 3) * 60}ms` }}
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
              <Trophy size={16} className="text-yellow-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-foreground text-sm font-medium">Quiz Result</p>
              <p className="text-muted-foreground text-xs mt-0.5">
                {r.correctAnswers}/{r.totalQuestions} correct
              </p>
            </div>
            <span
              className="text-sm font-bold px-2.5 py-1 rounded-lg"
              style={{
                background:
                  r.score >= 70
                    ? "oklch(0.65 0.15 142 / 0.15)"
                    : "oklch(0.58 0.18 22 / 0.15)",
                color:
                  r.score >= 70 ? "oklch(0.75 0.15 142)" : "oklch(0.7 0.18 22)",
              }}
            >
              {r.score}%
            </span>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="px-4 pb-5 border-t border-border/40 pt-5">
        <h2 className="font-bold font-display text-foreground text-base mb-4">
          Settings
        </h2>
        <div className="flex flex-col gap-2.5">
          <SettingsRow
            icon={BookOpen}
            label="Translation Language"
            value={`${langInfo.flag} ${langInfo.label}`}
            onClick={() => navigate({ to: "/language-select" })}
            ocid="profile.change_language_button"
          />
          <SettingsRow
            icon={Moon}
            label="Dark Mode"
            trailing={
              <Switch
                checked
                disabled
                className="pointer-events-none data-[state=checked]:bg-primary"
                aria-label="Dark mode always on"
              />
            }
            ocid="profile.dark_mode_toggle"
          />
          <SettingsRow
            icon={Info}
            label="About LinguaTube"
            value="v1.0"
            onClick={() => {}}
            ocid="profile.about_button"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-2 mt-auto">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
