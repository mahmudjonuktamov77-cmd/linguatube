import { Layout } from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const SplashPage = lazy(() => import("@/pages/SplashPage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const LanguageSelectPage = lazy(() => import("@/pages/LanguageSelectPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const VideoPlayerPage = lazy(() => import("@/pages/VideoPlayerPage"));
const VocabularyPage = lazy(() => import("@/pages/VocabularyPage"));
const QuizPage = lazy(() => import("@/pages/QuizPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const LeaderboardPage = lazy(() => import("@/pages/LeaderboardPage"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

// Root route wraps everything in Layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={null}>
      <SplashPage />
    </Suspense>
  ),
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: () => (
    <Suspense fallback={null}>
      <AuthPage />
    </Suspense>
  ),
});

const languageSelectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/language-select",
  component: () => (
    <Suspense fallback={null}>
      <LanguageSelectPage />
    </Suspense>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: () => (
    <Suspense fallback={null}>
      <HomePage />
    </Suspense>
  ),
});

const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/video/$id",
  component: () => (
    <Suspense fallback={null}>
      <VideoPlayerPage />
    </Suspense>
  ),
});

const vocabularyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vocabulary",
  component: () => (
    <Suspense fallback={null}>
      <VocabularyPage />
    </Suspense>
  ),
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: () => (
    <Suspense fallback={null}>
      <QuizPage />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={null}>
      <ProfilePage />
    </Suspense>
  ),
});

const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard",
  component: () => (
    <Suspense fallback={null}>
      <LeaderboardPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  splashRoute,
  authRoute,
  languageSelectRoute,
  homeRoute,
  videoRoute,
  vocabularyRoute,
  quizRoute,
  profileRoute,
  leaderboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
