import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-DtATHlMl.js";
import { B as Button } from "./button-DWnjlzeZ.js";
import "./index-BspW9D6I.js";
import "./utils-nrQbKtHB.js";
const LANGUAGES = [
  {
    id: "uzbek",
    label: "Uzbek",
    native: "O'zbek",
    flag: "🇺🇿",
    description: "Translate English subtitles into Uzbek"
  },
  {
    id: "russian",
    label: "Russian",
    native: "Русский",
    flag: "🇷🇺",
    description: "Translate English subtitles into Russian"
  }
];
function LanguageSelectPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = reactExports.useState(null);
  const handleContinue = () => {
    if (!selected) return;
    localStorage.setItem("linguatube_language", selected);
    navigate({ to: "/home" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "language_select.page",
      className: "flex-1 flex flex-col min-h-screen bg-background",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex flex-col items-center justify-end pb-10 pt-16 overflow-hidden",
            style: {
              background: "radial-gradient(ellipse 100% 70% at 50% 0%, oklch(0.28 0.1 22 / 0.5) 0%, oklch(0.08 0.008 265) 70%)",
              minHeight: 180
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none",
                  style: {
                    width: 200,
                    height: 200,
                    background: "oklch(0.58 0.18 22 / 0.14)",
                    filter: "blur(48px)",
                    top: -40
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-glow mb-4",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.58 0.18 22), oklch(0.68 0.2 35))"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      width: "32",
                      height: "32",
                      viewBox: "0 0 32 32",
                      fill: "none",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            cx: "16",
                            cy: "16",
                            r: "11",
                            stroke: "white",
                            strokeWidth: "1.8",
                            strokeOpacity: "0.9"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "ellipse",
                          {
                            cx: "16",
                            cy: "16",
                            rx: "5.5",
                            ry: "11",
                            stroke: "white",
                            strokeWidth: "1.5",
                            strokeOpacity: "0.7"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "line",
                          {
                            x1: "5",
                            y1: "16",
                            x2: "27",
                            y2: "16",
                            stroke: "white",
                            strokeWidth: "1.5",
                            strokeOpacity: "0.7"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "line",
                          {
                            x1: "7",
                            y1: "10",
                            x2: "25",
                            y2: "10",
                            stroke: "white",
                            strokeWidth: "1.2",
                            strokeOpacity: "0.5"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "line",
                          {
                            x1: "7",
                            y1: "22",
                            x2: "25",
                            y2: "22",
                            stroke: "white",
                            strokeWidth: "1.2",
                            strokeOpacity: "0.5"
                          }
                        )
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "text-2xl font-bold font-display text-foreground text-center",
                  style: { fontFamily: "'Space Grotesk', system-ui, sans-serif" },
                  children: "Choose Your Language"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 text-center", children: "Select your preferred translation language" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-6 pt-6 pb-10 flex flex-col gap-4", children: [
          LANGUAGES.map(({ id, label, native, flag, description }, i) => {
            const isSelected = selected === id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `language_select.${id}_button`,
                onClick: () => setSelected(id),
                className: "relative flex items-center gap-4 p-5 rounded-2xl text-left transition-smooth animate-fade-up",
                style: {
                  animationDelay: `${i * 0.12}s`,
                  border: isSelected ? "2px solid oklch(0.58 0.18 22)" : "2px solid oklch(0.2 0.008 265 / 0.6)",
                  background: isSelected ? "oklch(0.58 0.18 22 / 0.1)" : "oklch(0.11 0.008 265)",
                  boxShadow: isSelected ? "0 0 24px -4px oklch(0.58 0.18 22 / 0.35)" : "none",
                  transform: isSelected ? "scale(1.02)" : "scale(1)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl",
                      style: {
                        background: isSelected ? "oklch(0.58 0.18 22 / 0.15)" : "oklch(0.14 0.008 265)",
                        border: "1px solid oklch(0.22 0.008 265 / 0.5)"
                      },
                      children: flag
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-base", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-sm font-medium",
                          style: { color: "oklch(0.58 0.18 22)" },
                          children: native
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: description })
                  ] }),
                  isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-glow",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.58 0.18 22), oklch(0.68 0.2 35))"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          width: "14",
                          height: "14",
                          viewBox: "0 0 14 14",
                          fill: "none",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M2.5 7L5.5 10L11.5 4",
                              stroke: "white",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round"
                            }
                          )
                        }
                      )
                    }
                  )
                ]
              },
              id
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-4 p-5 rounded-2xl text-left opacity-40",
              style: {
                border: "2px dashed oklch(0.2 0.008 265)",
                background: "oklch(0.11 0.008 265 / 0.5)",
                animationDelay: "0.25s"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl",
                    style: {
                      background: "oklch(0.14 0.008 265)",
                      border: "1px solid oklch(0.2 0.008 265)"
                    },
                    children: "🇰🇷"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-base", children: "Korean" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-medium px-2 py-0.5 rounded-full",
                        style: {
                          background: "oklch(0.2 0.008 265)",
                          color: "oklch(0.5 0.01 265)"
                        },
                        children: "Coming soon"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: "Translate English subtitles into Korean" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "language_select.continue_button",
              disabled: !selected,
              onClick: handleContinue,
              className: "w-full h-13 rounded-xl text-white font-semibold text-base shadow-glow bg-gradient-brand disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none",
              style: { height: 52 },
              children: [
                "Continue",
                selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 18 18",
                    fill: "none",
                    className: "ml-1.5",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M7 5L11 9L7 13",
                        stroke: "white",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
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
  LanguageSelectPage as default
};
