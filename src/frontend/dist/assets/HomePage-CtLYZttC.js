import { j as jsxRuntimeExports, r as reactExports, L as Link } from "./index-DrKPtmAy.js";
import { S as Slot, c as cn, a as cva } from "./utils-UfMkDFYN.js";
import { M as MOCK_VIDEOS } from "./mockData-Dr3JMoOm.js";
import { S as Search } from "./search-GRc9C6H3.js";
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const CATEGORIES = [
  { id: "All", label: "All" },
  { id: "Podcasts", label: "🎙️ Podcasts" },
  { id: "Conversations", label: "💬 Conversations" },
  { id: "Stories", label: "📚 Stories" },
  { id: "Songs", label: "🎵 Songs" },
  { id: "Interviews", label: "🎤 Interviews" },
  { id: "Beginner", label: "🌱 Beginner" },
  { id: "Intermediate", label: "🔥 Intermediate" },
  { id: "Advanced", label: "⚡ Advanced" }
];
function levelClass(level) {
  if (level === "Beginner") return "level-beginner";
  if (level === "Intermediate") return "level-intermediate";
  return "level-advanced";
}
function VideoCard({ video, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/video/$id",
      params: { id: video.id },
      "data-ocid": `home.video_card.item.${index + 1}`,
      className: "block w-full animate-fade-up",
      style: { animationDelay: `${index * 0.05}s` },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl overflow-hidden bg-card border border-border/30 shadow-premium hover:border-primary/40 hover:scale-[1.015] active:scale-[0.985] transition-smooth cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-video overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: video.thumbnail,
              alt: video.title,
              className: "w-full h-full object-cover transition-smooth",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-0.5 rounded-md tabular-nums", children: video.duration }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-lg backdrop-blur-sm ${levelClass(
                video.level
              )}`,
              children: video.level
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm leading-snug line-clamp-2", children: video.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: video.channelAvatar,
                alt: video.channelName,
                className: "w-5 h-5 rounded-full flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs truncate", children: video.channelName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs ml-auto flex-shrink-0 tabular-nums", children: [
              video.views,
              " · ",
              video.uploadedAt
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs rounded-lg", children: video.category }) })
        ] })
      ] })
    }
  );
}
function loadAllVideos() {
  try {
    const custom = JSON.parse(
      localStorage.getItem("linguatube_custom_videos") ?? "[]"
    );
    return [...custom, ...MOCK_VIDEOS];
  } catch {
    return MOCK_VIDEOS;
  }
}
function HomePage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [headerVisible, setHeaderVisible] = reactExports.useState(true);
  const lastScrollY = reactExports.useRef(0);
  const allVideos = reactExports.useMemo(() => loadAllVideos(), []);
  reactExports.useEffect(() => {
    const el = document.getElementById("home-scroll-root");
    if (!el) return;
    const onScroll = () => {
      const current = el.scrollTop;
      if (current < 60) {
        setHeaderVisible(true);
      } else if (current > lastScrollY.current + 6) {
        setHeaderVisible(false);
      } else if (current < lastScrollY.current - 6) {
        setHeaderVisible(true);
      }
      lastScrollY.current = current;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const filtered = activeCategory === "All" ? allVideos : allVideos.filter(
    (v) => v.category === activeCategory || v.level === activeCategory
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "home-scroll-root",
      "data-ocid": "home.page",
      className: "flex flex-col bg-background h-full overflow-y-auto scrollbar-hide",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border/40 px-4 pt-4 pb-3 transition-transform duration-300 ${headerVisible ? "translate-y-0" : "-translate-y-full"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-gradient", children: "LinguaTube" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "home.search_button",
                    className: "w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 active:scale-95 transition-smooth",
                    "aria-label": "Search videos",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, className: "text-muted-foreground" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto scrollbar-hide pb-1", children: CATEGORIES.map(({ id, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `home.category.${id.toLowerCase()}`,
                  onClick: () => setActiveCategory(id),
                  className: `flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-smooth ${activeCategory === id ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/70"}`,
                  children: label
                },
                id
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 px-4 py-4 pb-24", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "home.empty_state",
            className: "flex flex-col items-center justify-center py-20 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl mb-3", children: "📭" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No videos in this category yet." })
            ]
          }
        ) : filtered.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video, index: i }, video.id)) })
      ]
    }
  );
}
export {
  HomePage as default
};
