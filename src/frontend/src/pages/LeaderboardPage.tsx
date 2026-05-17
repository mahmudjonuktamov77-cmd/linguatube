import { Crown, Flame, Star, Trophy } from "lucide-react";

interface LeaderUser {
  id: string;
  name: string;
  profileImage: string;
  points: number;
  streak: number;
  rank: number;
}

const MOCK_USERS: LeaderUser[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    profileImage:
      "https://ui-avatars.com/api/?name=Alex+Johnson&background=f97316&color=fff",
    points: 4850,
    streak: 23,
    rank: 1,
  },
  {
    id: "u2",
    name: "Sarah Kim",
    profileImage:
      "https://ui-avatars.com/api/?name=Sarah+Kim&background=8b5cf6&color=fff",
    points: 4200,
    streak: 18,
    rank: 2,
  },
  {
    id: "u3",
    name: "Mohammed Ali",
    profileImage:
      "https://ui-avatars.com/api/?name=Mohammed+Ali&background=06b6d4&color=fff",
    points: 3900,
    streak: 15,
    rank: 3,
  },
  {
    id: "u4",
    name: "Emily Chen",
    profileImage:
      "https://ui-avatars.com/api/?name=Emily+Chen&background=10b981&color=fff",
    points: 3400,
    streak: 12,
    rank: 4,
  },
  {
    id: "u5",
    name: "Carlos Rodriguez",
    profileImage:
      "https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=ef4444&color=fff",
    points: 2900,
    streak: 9,
    rank: 5,
  },
  {
    id: "u6",
    name: "Amira Hassan",
    profileImage:
      "https://ui-avatars.com/api/?name=Amira+Hassan&background=f59e0b&color=fff",
    points: 2400,
    streak: 7,
    rank: 6,
  },
  {
    id: "u7",
    name: "David Park",
    profileImage:
      "https://ui-avatars.com/api/?name=David+Park&background=ec4899&color=fff",
    points: 1950,
    streak: 5,
    rank: 7,
  },
  {
    id: "u8",
    name: "Yuki Tanaka",
    profileImage:
      "https://ui-avatars.com/api/?name=Yuki+Tanaka&background=6366f1&color=fff",
    points: 1600,
    streak: 4,
    rank: 8,
  },
  {
    id: "u9",
    name: "Ana Popescu",
    profileImage:
      "https://ui-avatars.com/api/?name=Ana+Popescu&background=14b8a6&color=fff",
    points: 1200,
    streak: 3,
    rank: 9,
  },
  {
    id: "u10",
    name: "Omar Faruk",
    profileImage:
      "https://ui-avatars.com/api/?name=Omar+Faruk&background=84cc16&color=fff",
    points: 800,
    streak: 2,
    rank: 10,
  },
];

const RANK_STYLES: Record<
  number,
  { bg: string; border: string; text: string; icon: React.ReactNode }
> = {
  1: {
    bg: "oklch(0.75 0.18 55 / 0.12)",
    border: "oklch(0.75 0.18 55 / 0.5)",
    text: "oklch(0.85 0.18 55)",
    icon: <Crown size={16} style={{ color: "oklch(0.85 0.18 55)" }} />,
  },
  2: {
    bg: "oklch(0.75 0.01 265 / 0.12)",
    border: "oklch(0.65 0.01 265 / 0.5)",
    text: "oklch(0.82 0.01 265)",
    icon: <Star size={16} style={{ color: "oklch(0.82 0.01 265)" }} />,
  },
  3: {
    bg: "oklch(0.65 0.12 42 / 0.12)",
    border: "oklch(0.62 0.12 42 / 0.5)",
    text: "oklch(0.72 0.12 42)",
    icon: <Trophy size={16} style={{ color: "oklch(0.72 0.12 42)" }} />,
  },
};

export default function LeaderboardPage() {
  const authRaw = localStorage.getItem("linguatube_auth");
  const currentUserName: string = authRaw
    ? ((JSON.parse(authRaw) as { name?: string }).name ?? "")
    : "";

  return (
    <div
      data-ocid="leaderboard.page"
      className="flex flex-col min-h-full bg-background pb-24"
    >
      {/* Header */}
      <div className="bg-card border-b border-border/40 px-4 pt-6 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.18 55), oklch(0.65 0.18 35))",
            }}
          >
            <Trophy size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display text-foreground leading-none">
              Top Learners
            </h1>
            <p className="text-muted-foreground text-xs mt-0.5">
              Global leaderboard
            </p>
          </div>
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="px-4 pt-5 pb-2">
        <div className="flex items-end justify-center gap-3">
          {/* 2nd place */}
          <PodiumCard user={MOCK_USERS[1]} currentUserName={currentUserName} />
          {/* 1st place */}
          <PodiumCard
            user={MOCK_USERS[0]}
            currentUserName={currentUserName}
            tall
          />
          {/* 3rd place */}
          <PodiumCard user={MOCK_USERS[2]} currentUserName={currentUserName} />
        </div>
      </div>

      {/* Rest of the list */}
      <div className="px-4 pt-3 flex flex-col gap-2.5">
        {MOCK_USERS.slice(3).map((user, i) => {
          const isMe = currentUserName && user.name === currentUserName;
          return (
            <div
              key={user.id}
              data-ocid={`leaderboard.item.${user.rank}`}
              className="flex items-center gap-3 rounded-2xl p-3.5 border transition-smooth animate-fade-up"
              style={{
                background: isMe ? "oklch(0.58 0.18 22 / 0.08)" : "var(--card)",
                borderColor: isMe
                  ? "oklch(0.58 0.18 22 / 0.4)"
                  : "oklch(0.2 0.008 265 / 0.5)",
                animationDelay: `${i * 50}ms`,
              }}
            >
              {/* Rank */}
              <span
                className="text-sm font-bold tabular-nums w-6 text-center flex-shrink-0"
                style={{
                  color: isMe
                    ? "oklch(0.58 0.18 22)"
                    : "var(--muted-foreground)",
                }}
              >
                {user.rank}
              </span>

              {/* Avatar */}
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
              />

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="text-foreground text-sm font-semibold truncate">
                  {user.name}
                  {isMe && (
                    <span
                      className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.58 0.18 22 / 0.15)",
                        color: "oklch(0.7 0.18 22)",
                      }}
                    >
                      You
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Flame size={11} style={{ color: "oklch(0.58 0.18 22)" }} />
                  <span className="text-[11px] text-muted-foreground">
                    {user.streak}d streak
                  </span>
                </div>
              </div>

              {/* Points */}
              <div className="text-right flex-shrink-0">
                <p className="text-foreground font-bold text-sm tabular-nums">
                  {user.points.toLocaleString()}
                </p>
                <p className="text-muted-foreground text-[10px]">pts</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* If current user not in top 10 */}
      {currentUserName &&
        !MOCK_USERS.some((u) => u.name === currentUserName) && (
          <div
            className="mx-4 mt-4 rounded-2xl p-4 border animate-fade-up"
            style={{
              background: "oklch(0.58 0.18 22 / 0.08)",
              borderColor: "oklch(0.58 0.18 22 / 0.3)",
            }}
          >
            <p className="text-center text-sm font-medium text-foreground">
              Keep learning to reach the top! 🚀
            </p>
            <p className="text-center text-xs text-muted-foreground mt-1">
              You're not in the top 10 yet. Watch more videos to earn points.
            </p>
          </div>
        )}
    </div>
  );
}

function PodiumCard({
  user,
  currentUserName,
  tall = false,
}: {
  user: LeaderUser;
  currentUserName: string;
  tall?: boolean;
}) {
  const isMe = currentUserName && user.name === currentUserName;
  const style = RANK_STYLES[user.rank];

  return (
    <div
      data-ocid={`leaderboard.podium.${user.rank}`}
      className="flex-1 flex flex-col items-center gap-2 rounded-2xl p-3 border transition-smooth"
      style={{
        background: isMe ? "oklch(0.58 0.18 22 / 0.12)" : style.bg,
        borderColor: isMe ? "oklch(0.58 0.18 22 / 0.5)" : style.border,
        paddingTop: tall ? "20px" : "12px",
        paddingBottom: tall ? "20px" : "12px",
      }}
    >
      {/* Rank icon */}
      <div className="flex items-center justify-center mb-0.5">
        {style.icon}
      </div>

      {/* Avatar */}
      <div className="relative">
        <img
          src={user.profileImage}
          alt={user.name}
          className={`rounded-full object-cover border-2 ${tall ? "w-16 h-16" : "w-12 h-12"}`}
          style={{ borderColor: style.border }}
        />
        <div
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{
            background: style.bg,
            border: `1.5px solid ${style.border}`,
            color: style.text,
          }}
        >
          {user.rank}
        </div>
      </div>

      {/* Name */}
      <p className="text-foreground text-xs font-semibold text-center leading-tight line-clamp-2 w-full">
        {user.name.split(" ")[0]}
        {isMe && <span style={{ color: style.text }}> ★</span>}
      </p>

      {/* Points */}
      <p
        className="font-bold tabular-nums text-sm"
        style={{ color: style.text }}
      >
        {user.points.toLocaleString()}
      </p>
      <p className="text-[10px] text-muted-foreground -mt-1">pts</p>
    </div>
  );
}
