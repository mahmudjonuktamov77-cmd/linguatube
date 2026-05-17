import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, Brain, Home, Trophy, User } from "lucide-react";

const NAV_ITEMS = [
  { to: "/home", label: "Home", icon: Home, ocid: "nav.home" },
  {
    to: "/vocabulary",
    label: "Vocabulary",
    icon: BookOpen,
    ocid: "nav.vocabulary",
  },
  { to: "/quiz", label: "Quiz", icon: Brain, ocid: "nav.quiz" },
  { to: "/leaderboard", label: "Top", icon: Trophy, ocid: "nav.leaderboard" },
  { to: "/profile", label: "Profile", icon: User, ocid: "nav.profile" },
] as const;

export function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-card/95 backdrop-blur-xl border-t border-border/60">
      <div className="flex items-center justify-around px-2 pb-safe pt-2 pb-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon, ocid }) => {
          const active = pathname === to || pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              data-ocid={ocid}
              className="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-smooth group"
            >
              <div
                className={`p-2 rounded-xl transition-smooth ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span
                className={`text-[10px] font-medium transition-smooth ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
