import { useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

const HIDDEN_NAV_PATHS = ["/", "/auth", "/language-select"];
const VIDEO_PATH_PREFIX = "/video/";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const showNav =
    !HIDDEN_NAV_PATHS.includes(pathname) &&
    !pathname.startsWith(VIDEO_PATH_PREFIX);

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[430px] min-h-screen flex flex-col bg-background overflow-hidden">
        <main className={`flex-1 flex flex-col ${showNav ? "pb-[80px]" : ""}`}>
          {children}
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
