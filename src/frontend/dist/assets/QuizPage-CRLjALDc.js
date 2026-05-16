import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as Brain } from "./index-DtATHlMl.js";
import { B as Button } from "./button-DWnjlzeZ.js";
import { b as MOCK_QUIZ_QUESTIONS, M as MOCK_VIDEOS } from "./mockData-CmJHL0ad.js";
import { u as useProgress, C as ChevronRight } from "./use-progress-D1FgCv8h.js";
import { T as Trophy } from "./trophy-BpkEYwrk.js";
import { R as RotateCcw } from "./rotate-ccw-Ku-e3ZH0.js";
import "./index-BspW9D6I.js";
import "./utils-nrQbKtHB.js";
import "./backend-4JeLCclE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function QuizPage() {
  const { saveQuizResult, quizResults } = useProgress();
  const [phase, setPhase] = reactExports.useState("start");
  const [current, setCurrent] = reactExports.useState(0);
  const [selected, setSelected] = reactExports.useState(null);
  const [answers, setAnswers] = reactExports.useState([]);
  const question = MOCK_QUIZ_QUESTIONS[current];
  const total = MOCK_QUIZ_QUESTIONS.length;
  const progressPct = phase === "question" ? (current + 1) / total * 100 : 0;
  const handleStart = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setPhase("question");
  };
  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
  };
  const handleNext = () => {
    var _a;
    if (selected === null) return;
    const isCorrect = selected === question.correctIndex;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    if (current + 1 >= total) {
      const correct = newAnswers.filter(Boolean).length;
      const videoId = MOCK_QUIZ_QUESTIONS[0].videoId;
      const videoTitle = ((_a = MOCK_VIDEOS.find((v) => v.id === videoId)) == null ? void 0 : _a.title) ?? "";
      saveQuizResult({
        videoId,
        videoTitle,
        score: Math.round(correct / total * 100),
        correctAnswers: correct,
        totalQuestions: total
      });
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };
  const correctCount = answers.filter(Boolean).length;
  const finalScore = total > 0 ? Math.round(correctCount / total * 100) : 0;
  const scoreMessage = finalScore >= 90 ? { label: "Excellent! 🏆", sub: "Outstanding performance!" } : finalScore >= 70 ? { label: "Good job! 🎉", sub: "You are making great progress!" } : {
    label: "Keep practicing! 💪",
    sub: "Review and try again to improve."
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "quiz.page",
      className: "flex flex-col min-h-full bg-background pb-20",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border/40 px-4 pt-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: "Daily Quiz" }),
          phase === "question" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-gradient-brand transition-all duration-500 rounded-full",
                style: { width: `${progressPct}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground tabular-nums", children: [
              current + 1,
              "/",
              total
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col px-4 py-6", children: [
          phase === "start" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "quiz.start_panel",
              className: "flex flex-col items-center justify-center flex-1 text-center gap-6 animate-float-in",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-3xl bg-primary/20 blur-2xl scale-110" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-24 h-24 rounded-3xl bg-gradient-brand flex items-center justify-center shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-12 h-12 text-white" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold font-display text-foreground", children: "Test Your Knowledge" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Based on your watched videos" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full glass-card", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-lg", children: total }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "questions ready" })
                  ] })
                ] }),
                quizResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl px-5 py-3 flex items-center gap-3 w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 text-yellow-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last score" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground", children: [
                      quizResults[0].score,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Best" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-primary", children: [
                      Math.max(...quizResults.map((r) => r.score)),
                      "%"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "quiz.start_button",
                    onClick: handleStart,
                    className: "w-full h-13 rounded-2xl bg-gradient-brand text-white font-bold text-base shadow-glow",
                    children: "Start Quiz"
                  }
                )
              ]
            }
          ),
          phase === "question" && question && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "quiz.question_panel",
              className: "flex flex-col gap-5 animate-fade-up",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-3", children: [
                    "Question ",
                    current + 1,
                    " of ",
                    total
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-base leading-relaxed", children: question.question })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: question.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === question.correctIndex;
                  const answered = selected !== null;
                  let cls = "border-border/40 bg-card text-foreground hover:border-primary/50 hover:bg-card/80 active:scale-[0.99]";
                  let icon = null;
                  if (answered) {
                    if (isCorrect) {
                      cls = "border-accent bg-accent/15 text-accent shadow-glow-green";
                      icon = /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-accent flex-shrink-0" });
                    } else if (isSelected) {
                      cls = "border-destructive bg-destructive/15 text-destructive";
                      icon = /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-destructive flex-shrink-0" });
                    } else {
                      cls = "border-border/20 bg-card/40 text-muted-foreground opacity-60";
                    }
                  }
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `quiz.option.${i + 1}`,
                      onClick: () => handleAnswer(i),
                      disabled: answered,
                      className: `w-full text-left p-4 rounded-xl border-2 transition-smooth font-medium text-sm flex items-center gap-3 ${cls}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold\n                      border border-current opacity-60",
                            children: String.fromCharCode(65 + i)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 leading-snug", children: opt }),
                        icon
                      ]
                    },
                    opt
                  );
                }) }),
                selected !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 animate-fade-up", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `rounded-xl px-4 py-3 flex items-center gap-3 ${selected === question.correctIndex ? "bg-accent/10 border border-accent/30" : "bg-destructive/10 border border-destructive/30"}`,
                      children: [
                        selected === question.correctIndex ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-accent flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-destructive flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: selected === question.correctIndex ? "Correct! Well done." : `Correct answer: ${question.options[question.correctIndex]}` })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      "data-ocid": "quiz.next_button",
                      onClick: handleNext,
                      className: "w-full h-12 rounded-xl bg-gradient-brand text-white font-semibold shadow-glow flex items-center justify-center gap-2",
                      children: [
                        current + 1 >= total ? "See Results" : "Next Question",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                      ]
                    }
                  )
                ] })
              ]
            },
            current
          ),
          phase === "result" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "quiz.result_panel",
              className: "flex flex-col items-center flex-1 gap-6 animate-float-in",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-125 animate-pulse-subtle" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32 rounded-full bg-gradient-brand flex flex-col items-center justify-center shadow-glow", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-4xl font-black text-white leading-none", children: [
                      finalScore,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/70 font-medium", children: "score" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold font-display text-foreground", children: scoreMessage.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: scoreMessage.sub }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    correctCount,
                    " of ",
                    total,
                    " correct"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Review" }),
                  MOCK_QUIZ_QUESTIONS.map((q, i) => {
                    const wasCorrect = answers[i];
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": `quiz.summary.item.${i + 1}`,
                        className: `flex items-start gap-3 p-3 rounded-xl border ${wasCorrect ? "border-accent/25 bg-accent/8" : "border-destructive/25 bg-destructive/8"}`,
                        children: [
                          wasCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-destructive flex-shrink-0 mt-0.5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-2 leading-snug", children: q.question }),
                            !wasCorrect && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent mt-0.5 truncate", children: [
                              "✓ ",
                              q.options[q.correctIndex]
                            ] })
                          ] })
                        ]
                      },
                      q.id
                    );
                  })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "quiz.retry_button",
                    onClick: handleStart,
                    className: "w-full h-12 rounded-xl bg-gradient-brand text-white font-semibold shadow-glow flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                      "Retake Quiz"
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  QuizPage as default
};
