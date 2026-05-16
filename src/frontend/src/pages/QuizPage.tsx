import { Button } from "@/components/ui/button";
import { MOCK_QUIZ_QUESTIONS, MOCK_VIDEOS } from "@/data/mockData";
import { useProgress } from "@/hooks/use-progress";
import {
  Brain,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { useState } from "react";

type Phase = "start" | "question" | "result";

export default function QuizPage() {
  const { saveQuizResult, quizResults } = useProgress();
  const [phase, setPhase] = useState<Phase>("start");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const question = MOCK_QUIZ_QUESTIONS[current];
  const total = MOCK_QUIZ_QUESTIONS.length;
  const progressPct = phase === "question" ? ((current + 1) / total) * 100 : 0;

  const handleStart = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setPhase("question");
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const isCorrect = selected === question.correctIndex;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (current + 1 >= total) {
      const correct = newAnswers.filter(Boolean).length;
      const videoId = MOCK_QUIZ_QUESTIONS[0].videoId;
      const videoTitle = MOCK_VIDEOS.find((v) => v.id === videoId)?.title ?? "";
      saveQuizResult({
        videoId,
        videoTitle,
        score: Math.round((correct / total) * 100),
        correctAnswers: correct,
        totalQuestions: total,
      });
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const correctCount = answers.filter(Boolean).length;
  const finalScore = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const scoreMessage =
    finalScore >= 90
      ? { label: "Excellent! 🏆", sub: "Outstanding performance!" }
      : finalScore >= 70
        ? { label: "Good job! 🎉", sub: "You are making great progress!" }
        : {
            label: "Keep practicing! 💪",
            sub: "Review and try again to improve.",
          };

  return (
    <div
      data-ocid="quiz.page"
      className="flex flex-col min-h-full bg-background pb-20"
    >
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border/40 px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold font-display text-foreground">
          Daily Quiz
        </h1>
        {phase === "question" && (
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-brand transition-all duration-500 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {current + 1}/{total}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col px-4 py-6">
        {/* Intro Screen */}
        {phase === "start" && (
          <div
            data-ocid="quiz.start_panel"
            className="flex flex-col items-center justify-center flex-1 text-center gap-6 animate-float-in"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl scale-110" />
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-brand flex items-center justify-center shadow-glow">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display text-foreground">
                Test Your Knowledge
              </h2>
              <p className="text-muted-foreground text-sm">
                Based on your watched videos
              </p>
              <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full glass-card">
                <span className="text-primary font-bold text-lg">{total}</span>
                <span className="text-muted-foreground text-sm">
                  questions ready
                </span>
              </div>
            </div>

            {quizResults.length > 0 && (
              <div className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3 w-full">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Last score</p>
                  <p className="font-bold text-foreground">
                    {quizResults[0].score}%
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-muted-foreground">Best</p>
                  <p className="font-bold text-primary">
                    {Math.max(...quizResults.map((r) => r.score))}%
                  </p>
                </div>
              </div>
            )}

            <Button
              type="button"
              data-ocid="quiz.start_button"
              onClick={handleStart}
              className="w-full h-13 rounded-2xl bg-gradient-brand text-white font-bold text-base shadow-glow"
            >
              Start Quiz
            </Button>
          </div>
        )}

        {/* Question Screen */}
        {phase === "question" && question && (
          <div
            key={current}
            data-ocid="quiz.question_panel"
            className="flex flex-col gap-5 animate-fade-up"
          >
            {/* Question card */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                Question {current + 1} of {total}
              </p>
              <p className="text-foreground font-semibold text-base leading-relaxed">
                {question.question}
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {question.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === question.correctIndex;
                const answered = selected !== null;

                let cls =
                  "border-border/40 bg-card text-foreground hover:border-primary/50 hover:bg-card/80 active:scale-[0.99]";
                let icon: React.ReactNode = null;

                if (answered) {
                  if (isCorrect) {
                    cls =
                      "border-accent bg-accent/15 text-accent shadow-glow-green";
                    icon = (
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    );
                  } else if (isSelected) {
                    cls =
                      "border-destructive bg-destructive/15 text-destructive";
                    icon = (
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    );
                  } else {
                    cls =
                      "border-border/20 bg-card/40 text-muted-foreground opacity-60";
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    data-ocid={`quiz.option.${i + 1}`}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-smooth font-medium text-sm flex items-center gap-3 ${cls}`}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold
                      border border-current opacity-60"
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Feedback + Next */}
            {selected !== null && (
              <div className="flex flex-col gap-3 animate-fade-up">
                <div
                  className={`rounded-xl px-4 py-3 flex items-center gap-3 ${
                    selected === question.correctIndex
                      ? "bg-accent/10 border border-accent/30"
                      : "bg-destructive/10 border border-destructive/30"
                  }`}
                >
                  {selected === question.correctIndex ? (
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">
                    {selected === question.correctIndex
                      ? "Correct! Well done."
                      : `Correct answer: ${question.options[question.correctIndex]}`}
                  </p>
                </div>

                <Button
                  type="button"
                  data-ocid="quiz.next_button"
                  onClick={handleNext}
                  className="w-full h-12 rounded-xl bg-gradient-brand text-white font-semibold shadow-glow flex items-center justify-center gap-2"
                >
                  {current + 1 >= total ? "See Results" : "Next Question"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Result Screen */}
        {phase === "result" && (
          <div
            data-ocid="quiz.result_panel"
            className="flex flex-col items-center flex-1 gap-6 animate-float-in"
          >
            {/* Score ring */}
            <div className="relative pt-4">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-125 animate-pulse-subtle" />
              <div className="relative w-32 h-32 rounded-full bg-gradient-brand flex flex-col items-center justify-center shadow-glow">
                <span className="text-4xl font-black text-white leading-none">
                  {finalScore}%
                </span>
                <span className="text-xs text-white/70 font-medium">score</span>
              </div>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold font-display text-foreground">
                {scoreMessage.label}
              </h2>
              <p className="text-muted-foreground text-sm">
                {scoreMessage.sub}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {correctCount} of {total} correct
              </p>
            </div>

            {/* Question summary list */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Review
              </p>
              {MOCK_QUIZ_QUESTIONS.map((q, i) => {
                const wasCorrect = answers[i];
                return (
                  <div
                    key={q.id}
                    data-ocid={`quiz.summary.item.${i + 1}`}
                    className={`flex items-start gap-3 p-3 rounded-xl border ${
                      wasCorrect
                        ? "border-accent/25 bg-accent/8"
                        : "border-destructive/25 bg-destructive/8"
                    }`}
                  >
                    {wasCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                        {q.question}
                      </p>
                      {!wasCorrect && (
                        <p className="text-xs text-accent mt-0.5 truncate">
                          ✓ {q.options[q.correctIndex]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              type="button"
              data-ocid="quiz.retry_button"
              onClick={handleStart}
              className="w-full h-12 rounded-xl bg-gradient-brand text-white font-semibold shadow-glow flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
