import { c as createLucideIcon, r as reactExports, u as useNavigate, j as jsxRuntimeExports, B as BookOpen } from "./index-DrKPtmAy.js";
import { B as Button } from "./button-4M12RXIM.js";
import { I as Input } from "./input-DT74L0GC.js";
import { u as useVocabulary } from "./use-vocabulary-BU-v98yY.js";
import { S as Search } from "./search-GRc9C6H3.js";
import "./utils-UfMkDFYN.js";
import "./backend-B89qqLjz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function VocabCard({
  entry,
  index,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `vocabulary.item.${index + 1}`,
      className: "glass-card rounded-2xl p-4 flex items-start gap-3 animate-float-in",
      style: { animationDelay: `${index * 0.06}s` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold font-display text-foreground leading-tight truncate", children: entry.word }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold text-sm mt-0.5 truncate", children: entry.translation }),
          entry.sourceVideoId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 inline-flex items-center gap-1.5 bg-secondary/60 rounded-full px-2.5 py-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CirclePlay,
              {
                size: 11,
                className: "text-muted-foreground flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs truncate max-w-[160px]", children: entry.sourceVideoId })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `vocabulary.delete_button.${index + 1}`,
            onClick: () => onDelete(entry.id),
            "aria-label": "Delete word",
            className: "flex-shrink-0 p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 })
          }
        )
      ]
    }
  );
}
function VocabularyPage() {
  const { vocabulary, removeWord } = useVocabulary();
  const [query, setQuery] = reactExports.useState("");
  const navigate = useNavigate();
  const filtered = query.trim() ? vocabulary.filter(
    (v) => v.word.toLowerCase().includes(query.toLowerCase()) || v.translation.toLowerCase().includes(query.toLowerCase())
  ) : vocabulary;
  const totalWords = vocabulary.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "vocabulary.page", className: "flex flex-col min-h-full pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border/40 px-4 pt-5 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: "My Vocabulary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20", children: [
          totalWords,
          " ",
          totalWords === 1 ? "word" : "words"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            size: 15,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "vocabulary.search_input",
            placeholder: "Search words\\u2026",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            className: "pl-9 pr-4 bg-secondary/50 border-border/50 rounded-xl h-10 text-sm focus-visible:ring-primary focus-visible:border-primary/60 transition-smooth"
          }
        )
      ] }),
      query.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
        filtered.length,
        " ",
        filtered.length === 1 ? "result" : "results",
        " for “",
        query,
        "”"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-4 py-4", children: totalWords === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "vocabulary.empty_state",
        className: "flex flex-col items-center justify-center py-20 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 36, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground mb-2", children: "No words saved yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm max-w-[240px] leading-relaxed mb-6", children: [
            "Tap",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "“Save Word”" }),
            " ",
            "while watching videos to build your vocabulary list."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "vocabulary.go_home_button",
              onClick: () => navigate({ to: "/home" }),
              className: "bg-gradient-brand text-primary-foreground font-semibold px-6 rounded-2xl h-11 shadow-glow transition-smooth hover:opacity-90",
              children: "Browse Videos"
            }
          )
        ]
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "vocabulary.empty_state",
        className: "flex flex-col items-center justify-center py-16 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl mb-3", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No matches found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Try a different word or phrase." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: filtered.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      VocabCard,
      {
        entry,
        index: i,
        onDelete: removeWord
      },
      String(entry.id)
    )) }) })
  ] });
}
export {
  VocabularyPage as default
};
