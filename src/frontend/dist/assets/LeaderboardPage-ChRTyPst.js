import { c as createLucideIcon, j as jsxRuntimeExports, T as Trophy } from "./index-DrKPtmAy.js";
import { F as Flame } from "./flame-wzMjBhzg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const MOCK_USERS = [
  {
    id: "u1",
    name: "Alex Johnson",
    profileImage: "https://ui-avatars.com/api/?name=Alex+Johnson&background=f97316&color=fff",
    points: 4850,
    streak: 23,
    rank: 1
  },
  {
    id: "u2",
    name: "Sarah Kim",
    profileImage: "https://ui-avatars.com/api/?name=Sarah+Kim&background=8b5cf6&color=fff",
    points: 4200,
    streak: 18,
    rank: 2
  },
  {
    id: "u3",
    name: "Mohammed Ali",
    profileImage: "https://ui-avatars.com/api/?name=Mohammed+Ali&background=06b6d4&color=fff",
    points: 3900,
    streak: 15,
    rank: 3
  },
  {
    id: "u4",
    name: "Emily Chen",
    profileImage: "https://ui-avatars.com/api/?name=Emily+Chen&background=10b981&color=fff",
    points: 3400,
    streak: 12,
    rank: 4
  },
  {
    id: "u5",
    name: "Carlos Rodriguez",
    profileImage: "https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=ef4444&color=fff",
    points: 2900,
    streak: 9,
    rank: 5
  },
  {
    id: "u6",
    name: "Amira Hassan",
    profileImage: "https://ui-avatars.com/api/?name=Amira+Hassan&background=f59e0b&color=fff",
    points: 2400,
    streak: 7,
    rank: 6
  },
  {
    id: "u7",
    name: "David Park",
    profileImage: "https://ui-avatars.com/api/?name=David+Park&background=ec4899&color=fff",
    points: 1950,
    streak: 5,
    rank: 7
  },
  {
    id: "u8",
    name: "Yuki Tanaka",
    profileImage: "https://ui-avatars.com/api/?name=Yuki+Tanaka&background=6366f1&color=fff",
    points: 1600,
    streak: 4,
    rank: 8
  },
  {
    id: "u9",
    name: "Ana Popescu",
    profileImage: "https://ui-avatars.com/api/?name=Ana+Popescu&background=14b8a6&color=fff",
    points: 1200,
    streak: 3,
    rank: 9
  },
  {
    id: "u10",
    name: "Omar Faruk",
    profileImage: "https://ui-avatars.com/api/?name=Omar+Faruk&background=84cc16&color=fff",
    points: 800,
    streak: 2,
    rank: 10
  }
];
const RANK_STYLES = {
  1: {
    bg: "oklch(0.75 0.18 55 / 0.12)",
    border: "oklch(0.75 0.18 55 / 0.5)",
    text: "oklch(0.85 0.18 55)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 16, style: { color: "oklch(0.85 0.18 55)" } })
  },
  2: {
    bg: "oklch(0.75 0.01 265 / 0.12)",
    border: "oklch(0.65 0.01 265 / 0.5)",
    text: "oklch(0.82 0.01 265)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, style: { color: "oklch(0.82 0.01 265)" } })
  },
  3: {
    bg: "oklch(0.65 0.12 42 / 0.12)",
    border: "oklch(0.62 0.12 42 / 0.5)",
    text: "oklch(0.72 0.12 42)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16, style: { color: "oklch(0.72 0.12 42)" } })
  }
};
function LeaderboardPage() {
  const authRaw = localStorage.getItem("linguatube_auth");
  const currentUserName = authRaw ? JSON.parse(authRaw).name ?? "" : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "leaderboard.page",
      className: "flex flex-col min-h-full bg-background pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/40 px-4 pt-6 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center shadow-glow flex-shrink-0",
              style: {
                background: "linear-gradient(135deg, oklch(0.75 0.18 55), oklch(0.65 0.18 35))"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 20, className: "text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground leading-none", children: "Top Learners" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: "Global leaderboard" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-5 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PodiumCard, { user: MOCK_USERS[1], currentUserName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PodiumCard,
            {
              user: MOCK_USERS[0],
              currentUserName,
              tall: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PodiumCard, { user: MOCK_USERS[2], currentUserName })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-3 flex flex-col gap-2.5", children: MOCK_USERS.slice(3).map((user, i) => {
          const isMe = currentUserName && user.name === currentUserName;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `leaderboard.item.${user.rank}`,
              className: "flex items-center gap-3 rounded-2xl p-3.5 border transition-smooth animate-fade-up",
              style: {
                background: isMe ? "oklch(0.58 0.18 22 / 0.08)" : "var(--card)",
                borderColor: isMe ? "oklch(0.58 0.18 22 / 0.4)" : "oklch(0.2 0.008 265 / 0.5)",
                animationDelay: `${i * 50}ms`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-bold tabular-nums w-6 text-center flex-shrink-0",
                    style: {
                      color: isMe ? "oklch(0.58 0.18 22)" : "var(--muted-foreground)"
                    },
                    children: user.rank
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: user.profileImage,
                    alt: user.name,
                    className: "w-10 h-10 rounded-xl object-cover flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground text-sm font-semibold truncate", children: [
                    user.name,
                    isMe && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                        style: {
                          background: "oklch(0.58 0.18 22 / 0.15)",
                          color: "oklch(0.7 0.18 22)"
                        },
                        children: "You"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 11, style: { color: "oklch(0.58 0.18 22)" } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
                      user.streak,
                      "d streak"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-bold text-sm tabular-nums", children: user.points.toLocaleString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px]", children: "pts" })
                ] })
              ]
            },
            user.id
          );
        }) }),
        currentUserName && !MOCK_USERS.some((u) => u.name === currentUserName) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mx-4 mt-4 rounded-2xl p-4 border animate-fade-up",
            style: {
              background: "oklch(0.58 0.18 22 / 0.08)",
              borderColor: "oklch(0.58 0.18 22 / 0.3)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm font-medium text-foreground", children: "Keep learning to reach the top! 🚀" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-1", children: "You're not in the top 10 yet. Watch more videos to earn points." })
            ]
          }
        )
      ]
    }
  );
}
function PodiumCard({
  user,
  currentUserName,
  tall = false
}) {
  const isMe = currentUserName && user.name === currentUserName;
  const style = RANK_STYLES[user.rank];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `leaderboard.podium.${user.rank}`,
      className: "flex-1 flex flex-col items-center gap-2 rounded-2xl p-3 border transition-smooth",
      style: {
        background: isMe ? "oklch(0.58 0.18 22 / 0.12)" : style.bg,
        borderColor: isMe ? "oklch(0.58 0.18 22 / 0.5)" : style.border,
        paddingTop: tall ? "20px" : "12px",
        paddingBottom: tall ? "20px" : "12px"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-0.5", children: style.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: user.profileImage,
              alt: user.name,
              className: `rounded-full object-cover border-2 ${tall ? "w-16 h-16" : "w-12 h-12"}`,
              style: { borderColor: style.border }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
              style: {
                background: style.bg,
                border: `1.5px solid ${style.border}`,
                color: style.text
              },
              children: user.rank
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground text-xs font-semibold text-center leading-tight line-clamp-2 w-full", children: [
          user.name.split(" ")[0],
          isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: style.text }, children: " ★" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-bold tabular-nums text-sm",
            style: { color: style.text },
            children: user.points.toLocaleString()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground -mt-1", children: "pts" })
      ]
    }
  );
}
export {
  LeaderboardPage as default
};
