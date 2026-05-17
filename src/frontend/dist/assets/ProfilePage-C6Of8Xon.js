import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useNavigate, U as User, B as BookOpen, T as Trophy } from "./index-DrKPtmAy.js";
import { B as Button } from "./button-4M12RXIM.js";
import { I as Input } from "./input-DT74L0GC.js";
import { u as useLayoutEffect2, d as useControllableState, P as Primitive, b as composeEventHandlers, c as createContextScope, L as Label } from "./index-D8DwRm2I.js";
import { u as useComposedRefs, c as cn } from "./utils-UfMkDFYN.js";
import { M as MOCK_VIDEOS } from "./mockData-Dr3JMoOm.js";
import { u as useProgress, C as ChevronRight } from "./use-progress-CQP7lGn1.js";
import { u as useVocabulary } from "./use-vocabulary-BU-v98yY.js";
import { P as Play, X } from "./x-pmwU_wH-.js";
import { F as Flame } from "./flame-wzMjBhzg.js";
import "./backend-B89qqLjz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
function useSize(element) {
  const [size, setSize] = reactExports.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size;
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const ADMIN_EMAIL = "mahmudjonuktamov77@gmail.com";
const UPLOAD_CATEGORIES = [
  "Podcasts",
  "Conversations",
  "Stories",
  "Songs",
  "Interviews",
  "Beginner",
  "Intermediate",
  "Advanced"
];
const UPLOAD_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const INITIAL_FORM = {
  title: "",
  category: "Podcasts",
  level: "Beginner",
  youtubeUrl: "",
  description: ""
};
const LANG_MAP = {
  uzbek: { label: "O'zbek", flag: "🇺🇿" },
  russian: { label: "Russian", flag: "🇷🇺" }
};
function ProgressRing({
  value,
  max,
  size = 88,
  stroke = 7,
  color = "oklch(0.58 0.18 22)",
  label,
  sublabel
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / Math.max(max, 1), 1);
  const dash = circ * pct;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { width: size, height: size }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: size,
          height: size,
          style: { transform: "rotate(-90deg)" },
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: size / 2,
                cy: size / 2,
                r,
                fill: "none",
                stroke: "oklch(0.2 0.008 265)",
                strokeWidth: stroke
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: size / 2,
                cy: size / 2,
                r,
                fill: "none",
                stroke: color,
                strokeWidth: stroke,
                strokeLinecap: "round",
                strokeDasharray: `${dash} ${circ}`,
                style: {
                  transition: "stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)"
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "absolute inset-0 flex flex-col items-center justify-center",
          style: { transform: "none" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-base leading-none", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-[9px] leading-none mt-0.5", children: [
              "/",
              max
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-xs font-semibold leading-none", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px] mt-0.5", children: sublabel })
    ] })
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 glass-card rounded-2xl p-3.5 flex flex-col items-center gap-1.5 animate-float-in",
      style: { animationDelay: `${delay}ms` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-xl flex items-center justify-center mb-0.5",
            style: { background: `${color}22`, border: `1px solid ${color}44` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, style: { color } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-lg leading-none", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-[10px] text-center leading-tight", children: label })
      ]
    }
  );
}
function SettingsRow({
  icon: Icon,
  label,
  value,
  onClick,
  trailing,
  ocid
}) {
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "flex items-center gap-3 bg-card rounded-2xl p-4 border border-border/30 hover:border-primary/30 transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-muted/60 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, className: "text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-foreground text-sm font-medium", children: label }),
        value && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: value }),
        trailing,
        onClick && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronRight,
          {
            size: 16,
            className: "text-muted-foreground flex-shrink-0"
          }
        )
      ]
    }
  );
  return onClick ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "w-full text-left", onClick, children: content }) : content;
}
function ProfilePage() {
  const navigate = useNavigate();
  const { watchedVideos, quizResults, totalMinutesLearned } = useProgress();
  const { totalWords } = useVocabulary();
  const [showUpload, setShowUpload] = reactExports.useState(false);
  const [uploadForm, setUploadForm] = reactExports.useState(INITIAL_FORM);
  const [uploadSuccess, setUploadSuccess] = reactExports.useState(false);
  const authRaw = localStorage.getItem("linguatube_auth");
  const authData = authRaw ? JSON.parse(authRaw) : null;
  const isAdmin = (authData == null ? void 0 : authData.email) === ADMIN_EMAIL;
  const language = localStorage.getItem("linguatube_language") ?? "uzbek";
  const langInfo = LANG_MAP[language] ?? { label: language, flag: "🌐" };
  const avgScore = quizResults.length > 0 ? Math.round(
    quizResults.reduce((a, r) => a + r.score, 0) / quizResults.length
  ) : 0;
  const STREAK_DAYS = 7;
  const WEEKLY_TARGET = 60;
  const weeklyMinutes = Math.min(totalMinutesLearned + 45, WEEKLY_TARGET);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "profile.page",
      className: "flex flex-col min-h-full bg-background pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border/40 px-4 pt-6 pb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground mb-5", children: "Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              (authData == null ? void 0 : authData.profileImage) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: authData.profileImage,
                  alt: authData.name ?? "User",
                  className: "w-16 h-16 rounded-2xl object-cover shadow-glow"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 28, className: "text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent border-2 border-card" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-base", children: (authData == null ? void 0 : authData.name) ?? "Language Learner" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: (authData == null ? void 0 : authData.email) ?? "Learning English" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: langInfo.flag }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-semibold", children: langInfo.label })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: BookOpen,
                label: "Words Saved",
                value: totalWords,
                color: "oklch(0.65 0.15 142)",
                delay: 0
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Play,
                label: "Videos",
                value: watchedVideos.length,
                color: "oklch(0.58 0.18 22)",
                delay: 80
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Trophy,
                label: "Quiz Avg",
                value: `${avgScore}%`,
                color: "oklch(0.75 0.18 55)",
                delay: 160
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold font-display text-foreground text-base mb-4", children: "Your Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "profile.progress_section",
              className: "glass-card rounded-2xl p-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-around", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProgressRing,
                    {
                      value: STREAK_DAYS,
                      max: 30,
                      size: 88,
                      stroke: 7,
                      color: "oklch(0.58 0.18 22)",
                      label: "Day Streak",
                      sublabel: "30-day goal"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-16 bg-border/50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProgressRing,
                    {
                      value: weeklyMinutes,
                      max: WEEKLY_TARGET,
                      size: 88,
                      stroke: 7,
                      color: "oklch(0.65 0.15 142)",
                      label: "Study Min",
                      sublabel: "Weekly goal"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-16 bg-border/50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProgressRing,
                    {
                      value: totalWords,
                      max: 100,
                      size: 88,
                      stroke: 7,
                      color: "oklch(0.75 0.18 55)",
                      label: "Vocab",
                      sublabel: "100-word goal"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-5 pt-4 border-t border-border/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 16, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground text-sm font-semibold", children: [
                    STREAK_DAYS,
                    "-day streak"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "· Keep it going!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14, className: "text-accent ml-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent text-xs font-medium", children: [
                    weeklyMinutes,
                    "/",
                    WEEKLY_TARGET,
                    " min"
                  ] })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold font-display text-foreground text-base mb-4", children: "Recent Activity" }),
          watchedVideos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "profile.watched_empty_state",
              className: "text-center py-6 glass-card rounded-2xl mb-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 24, className: "text-muted-foreground mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No videos watched yet" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2.5 mb-3", children: watchedVideos.slice(0, 3).map((w, i) => {
            const video = MOCK_VIDEOS.find((v) => v.id === w.videoId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `profile.watched_item.${i + 1}`,
                className: "flex items-center gap-3 bg-card rounded-2xl p-3 border border-border/30 animate-fade-up",
                style: { animationDelay: `${i * 60}ms` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0", children: video ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: video.thumbnail,
                      alt: video.title,
                      className: "w-10 h-10 rounded-xl object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 16, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-medium truncate", children: w.videoTitle || (video == null ? void 0 : video.title) || `Video ${w.videoId}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: new Date(w.watchedAt).toLocaleDateString() })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-accent" }) })
                ]
              },
              w.videoId
            );
          }) }),
          quizResults.slice(0, 2).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `profile.quiz_item.${i + 1}`,
              className: "flex items-center gap-3 bg-card rounded-2xl p-3 border border-border/30 mb-2.5 animate-fade-up",
              style: { animationDelay: `${(i + 3) * 60}ms` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16, className: "text-yellow-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-medium", children: "Quiz Result" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5", children: [
                    r.correctAnswers,
                    "/",
                    r.totalQuestions,
                    " correct"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-sm font-bold px-2.5 py-1 rounded-lg",
                    style: {
                      background: r.score >= 70 ? "oklch(0.65 0.15 142 / 0.15)" : "oklch(0.58 0.18 22 / 0.15)",
                      color: r.score >= 70 ? "oklch(0.75 0.15 142)" : "oklch(0.7 0.18 22)"
                    },
                    children: [
                      r.score,
                      "%"
                    ]
                  }
                )
              ]
            },
            r.id
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-5 border-t border-border/40 pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold font-display text-foreground text-base mb-4", children: "Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingsRow,
              {
                icon: BookOpen,
                label: "Translation Language",
                value: `${langInfo.flag} ${langInfo.label}`,
                onClick: () => navigate({ to: "/language-select" }),
                ocid: "profile.change_language_button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingsRow,
              {
                icon: Moon,
                label: "Dark Mode",
                trailing: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    checked: true,
                    disabled: true,
                    className: "pointer-events-none data-[state=checked]:bg-primary",
                    "aria-label": "Dark mode always on"
                  }
                ),
                ocid: "profile.dark_mode_toggle"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingsRow,
              {
                icon: Info,
                label: "About LinguaTube",
                value: "v1.0",
                onClick: () => {
                },
                ocid: "profile.about_button"
              }
            ),
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "profile.upload_video_button",
                onClick: () => {
                  setShowUpload(true);
                  setUploadSuccess(false);
                  setUploadForm(INITIAL_FORM);
                },
                className: "w-full flex items-center gap-3 bg-primary/10 rounded-2xl p-4 border border-primary/30 hover:border-primary/60 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 15, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-primary text-sm font-semibold text-left", children: "Upload Video" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[10px] px-2 py-0.5 rounded-full font-bold",
                      style: {
                        background: "oklch(0.58 0.18 22 / 0.15)",
                        color: "oklch(0.7 0.18 22)"
                      },
                      children: "ADMIN"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-primary flex-shrink-0" })
                ]
              }
            )
          ] })
        ] }),
        showUpload && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "dialog",
          {
            open: true,
            className: "fixed inset-0 z-50 m-0 p-0 max-w-none max-h-none w-full h-full border-0 bg-transparent flex items-end sm:items-center justify-center px-0 sm:px-4",
            style: {
              background: "rgba(0,0,0,0.80)",
              backdropFilter: "blur(8px)"
            },
            onClick: (e) => {
              if (e.target === e.currentTarget) setShowUpload(false);
            },
            onKeyDown: (e) => {
              if ((e.key === "Escape" || e.key === "Enter") && e.target === e.currentTarget)
                setShowUpload(false);
            },
            tabIndex: -1,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "profile.upload_dialog",
                className: "w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-premium animate-fade-up",
                style: {
                  background: "var(--card)",
                  border: "1.5px solid oklch(0.2 0.008 265)",
                  maxHeight: "88dvh",
                  display: "flex",
                  flexDirection: "column"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 pt-4 pb-0 px-6 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border/60 mx-auto" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center justify-between px-6 pt-5 pb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "Upload Video" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "profile.upload_close_button",
                        onClick: () => setShowUpload(false),
                        className: "w-9 h-9 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth",
                        "aria-label": "Close",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex-1 overflow-y-auto px-6 pb-8",
                      style: { overscrollBehavior: "contain" },
                      children: uploadSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": "profile.upload_success_state",
                          className: "flex flex-col items-center gap-4 py-10 text-center",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-16 h-16 rounded-full flex items-center justify-center",
                                style: {
                                  background: "oklch(0.65 0.15 142 / 0.15)",
                                  border: "2px solid oklch(0.65 0.15 142 / 0.4)"
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "svg",
                                  {
                                    width: "28",
                                    height: "28",
                                    viewBox: "0 0 28 28",
                                    fill: "none",
                                    "aria-hidden": "true",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "path",
                                      {
                                        d: "M5 14L11 20L23 8",
                                        stroke: "oklch(0.65 0.15 142)",
                                        strokeWidth: "2.5",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                      }
                                    )
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Video uploaded!" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "It will appear in the home feed." })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setShowUpload(false),
                                className: "text-sm text-primary hover:opacity-80 transition-smooth",
                                children: "Close"
                              }
                            )
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "form",
                        {
                          onSubmit: (e) => {
                            var _a;
                            e.preventDefault();
                            const existing = JSON.parse(
                              localStorage.getItem("linguatube_custom_videos") ?? "[]"
                            );
                            const newVideo = {
                              id: `custom_${Date.now()}`,
                              title: uploadForm.title,
                              category: uploadForm.category,
                              level: uploadForm.level,
                              thumbnail: uploadForm.youtubeUrl ? `https://img.youtube.com/vi/${((_a = uploadForm.youtubeUrl.match(/(?:v=|youtu\.be\/)([\w-]{11})/)) == null ? void 0 : _a[1]) ?? "dQw4w9WgXcQ"}/mqdefault.jpg` : "https://picsum.photos/seed/custom/400/225",
                              duration: "0:00",
                              channelName: "Admin",
                              channelAvatar: "https://ui-avatars.com/api/?name=Admin&background=f97316&color=fff",
                              views: "0",
                              uploadedAt: "Just now",
                              description: uploadForm.description
                            };
                            localStorage.setItem(
                              "linguatube_custom_videos",
                              JSON.stringify([newVideo, ...existing])
                            );
                            setUploadSuccess(true);
                          },
                          className: "space-y-5",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground/80 text-sm", children: "Title" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Input,
                                {
                                  "data-ocid": "profile.upload_title_input",
                                  placeholder: "Video title",
                                  value: uploadForm.title,
                                  onChange: (e) => setUploadForm((p) => ({ ...p, title: e.target.value })),
                                  required: true,
                                  className: "bg-background border-border/60 h-11 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/40 transition-smooth"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground/80 text-sm", children: "Category" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "select",
                                  {
                                    "data-ocid": "profile.upload_category_select",
                                    value: uploadForm.category,
                                    onChange: (e) => setUploadForm((p) => ({
                                      ...p,
                                      category: e.target.value
                                    })),
                                    className: "w-full h-11 rounded-xl border border-border/60 bg-background text-foreground text-sm px-3 focus:border-primary focus:outline-none transition-smooth",
                                    children: UPLOAD_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground/80 text-sm", children: "Level" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "select",
                                  {
                                    "data-ocid": "profile.upload_level_select",
                                    value: uploadForm.level,
                                    onChange: (e) => setUploadForm((p) => ({
                                      ...p,
                                      level: e.target.value
                                    })),
                                    className: "w-full h-11 rounded-xl border border-border/60 bg-background text-foreground text-sm px-3 focus:border-primary focus:outline-none transition-smooth",
                                    children: UPLOAD_LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l, children: l }, l))
                                  }
                                )
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground/80 text-sm", children: "YouTube URL" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Input,
                                {
                                  "data-ocid": "profile.upload_youtube_input",
                                  placeholder: "https://youtube.com/watch?v=...",
                                  value: uploadForm.youtubeUrl,
                                  onChange: (e) => setUploadForm((p) => ({
                                    ...p,
                                    youtubeUrl: e.target.value
                                  })),
                                  className: "bg-background border-border/60 h-11 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/40 transition-smooth"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground/80 text-sm", children: "Description" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "textarea",
                                {
                                  "data-ocid": "profile.upload_description_textarea",
                                  placeholder: "Brief description...",
                                  value: uploadForm.description,
                                  onChange: (e) => setUploadForm((p) => ({
                                    ...p,
                                    description: e.target.value
                                  })),
                                  rows: 3,
                                  className: "w-full rounded-xl border border-border/60 bg-background text-foreground text-sm px-3 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40 transition-smooth resize-none placeholder:text-muted-foreground/50"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Button,
                              {
                                type: "submit",
                                "data-ocid": "profile.upload_submit_button",
                                className: "w-full h-12 rounded-xl text-white font-semibold text-base shadow-glow bg-gradient-brand",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16, className: "mr-2" }),
                                  "Upload Video"
                                ]
                              }
                            )
                          ]
                        }
                      )
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-2 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ". Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary hover:underline",
              children: "caffeine.ai"
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  ProfilePage as default
};
