import { Badge } from "@/components/ui/badge";
import { MOCK_VIDEOS } from "@/data/mockData";
import type { Category, Level, Video } from "@/types";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CATEGORIES: { id: Category | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Podcasts", label: "🎙️ Podcasts" },
  { id: "Conversations", label: "💬 Conversations" },
  { id: "Stories", label: "📚 Stories" },
  { id: "Songs", label: "🎵 Songs" },
  { id: "Interviews", label: "🎤 Interviews" },
  { id: "Beginner", label: "🌱 Beginner" },
  { id: "Intermediate", label: "🔥 Intermediate" },
  { id: "Advanced", label: "⚡ Advanced" },
];

function levelClass(level: Level) {
  if (level === "Beginner") return "level-beginner";
  if (level === "Intermediate") return "level-intermediate";
  return "level-advanced";
}

function VideoCard({ video, index }: { video: Video; index: number }) {
  return (
    <Link
      to="/video/$id"
      params={{ id: video.id }}
      data-ocid={`home.video_card.item.${index + 1}`}
      className="block w-full animate-fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="rounded-2xl overflow-hidden bg-card border border-border/30 shadow-premium hover:border-primary/40 hover:scale-[1.015] active:scale-[0.985] transition-smooth cursor-pointer">
        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-smooth"
            loading="lazy"
          />
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-0.5 rounded-md tabular-nums">
            {video.duration}
          </div>
          {/* Level badge */}
          <span
            className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-lg backdrop-blur-sm ${levelClass(
              video.level,
            )}`}
          >
            {video.level}
          </span>
        </div>
        {/* Info */}
        <div className="px-4 py-3">
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 min-w-0">
            <img
              src={video.channelAvatar}
              alt={video.channelName}
              className="w-5 h-5 rounded-full flex-shrink-0"
            />
            <span className="text-muted-foreground text-xs truncate">
              {video.channelName}
            </span>
            <span className="text-muted-foreground text-xs ml-auto flex-shrink-0 tabular-nums">
              {video.views} · {video.uploadedAt}
            </span>
          </div>
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs rounded-lg">
              {video.category}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
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

  const filtered =
    activeCategory === "All"
      ? MOCK_VIDEOS
      : MOCK_VIDEOS.filter(
          (v) => v.category === activeCategory || v.level === activeCategory,
        );

  return (
    <div
      id="home-scroll-root"
      data-ocid="home.page"
      className="flex flex-col bg-background h-full overflow-y-auto scrollbar-hide"
    >
      {/* Sticky Header */}
      <div
        className={`sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border/40 px-4 pt-4 pb-3 transition-transform duration-300 ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold font-display text-gradient">
            LinguaTube
          </h1>
          <button
            type="button"
            data-ocid="home.search_button"
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 active:scale-95 transition-smooth"
            aria-label="Search videos"
          >
            <Search size={18} className="text-muted-foreground" />
          </button>
        </div>
        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              data-ocid={`home.category.${id.toLowerCase()}`}
              onClick={() => setActiveCategory(id as Category | "All")}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                activeCategory === id
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4 px-4 py-4 pb-24">
        {filtered.length === 0 ? (
          <div
            data-ocid="home.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <span className="text-4xl mb-3">📭</span>
            <p className="text-muted-foreground text-sm">
              No videos in this category yet.
            </p>
          </div>
        ) : (
          filtered.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
