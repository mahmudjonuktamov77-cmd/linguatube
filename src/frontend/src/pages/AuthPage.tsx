import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

// ── Google OAuth 2.0 PKCE config ───────────────────────────────────────────
const GOOGLE_CLIENT_ID =
  "170174422043-c0q1fqpqb9h04u2oi44tqr0r4s0vc3dg.apps.googleusercontent.com";

function getRedirectUri(): string {
  return `${window.location.origin}/auth`;
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
}

function base64urlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64urlEncode(array.buffer);
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const digest = await sha256(verifier);
  return base64urlEncode(digest);
}

function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return base64urlEncode(array.buffer);
}
// ──────────────────────────────────────────────────────────────────────────

type ForgotState = "idle" | "sent";

export default function AuthPage() {
  const navigate = useNavigate();
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotState, setForgotState] = useState<ForgotState>("idle");
  const [showForgot, setShowForgot] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [oauthError, setOauthError] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");

  const persistAuth = useCallback(
    (
      email: string,
      name: string,
      extra?: Partial<Record<string, string | boolean | number>>,
    ) => {
      const payload = {
        email,
        name,
        loggedIn: true,
        loginTime: Date.now(),
        ...extra,
      };
      localStorage.setItem("linguatube_auth", JSON.stringify(payload));
    },
    [],
  );

  // ── Handle OAuth callback (code exchange) ───────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const returnedState = params.get("state");
    const error = params.get("error");

    if (error) {
      setOauthError(
        "Google sign-in was cancelled or failed. Please try again.",
      );
      // Clean URL
      window.history.replaceState({}, "", "/auth");
      return;
    }

    if (!code) return;

    const savedState = sessionStorage.getItem("google_oauth_state");
    const verifier = sessionStorage.getItem("google_pkce_verifier");

    if (!savedState || !verifier || returnedState !== savedState) {
      setOauthError("OAuth state mismatch. Please try again.");
      window.history.replaceState({}, "", "/auth");
      return;
    }

    // Clean up sessionStorage
    sessionStorage.removeItem("google_oauth_state");
    sessionStorage.removeItem("google_pkce_verifier");

    // Clean URL immediately so back-button doesn't re-trigger
    window.history.replaceState({}, "", "/auth");

    setGoogleLoading(true);

    // Exchange code for tokens
    const body = new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: getRedirectUri(),
      grant_type: "authorization_code",
      code_verifier: verifier,
    });

    fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    })
      .then((r) => r.json())
      .then(async (tokens: { access_token?: string; error?: string }) => {
        if (!tokens.access_token) {
          throw new Error(tokens.error ?? "No access token returned");
        }
        // Fetch user profile
        const profileRes = await fetch(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          { headers: { Authorization: `Bearer ${tokens.access_token}` } },
        );
        const profile = (await profileRes.json()) as {
          email?: string;
          name?: string;
          picture?: string;
        };

        persistAuth(
          profile.email ?? "",
          profile.name ?? profile.email?.split("@")[0] ?? "Google User",
          { profileImage: profile.picture ?? "", loginMethod: "google" },
        );

        const hasLanguage = localStorage.getItem("linguatube_language");
        navigate({ to: hasLanguage ? "/home" : "/language-select" });
      })
      .catch((err: unknown) => {
        console.error("Google OAuth token exchange failed:", err);
        setOauthError("Google sign-in failed. Please try again.");
        setGoogleLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, persistAuth]);
  // ──────────────────────────────────────────────────────────────────────────

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    persistAuth(loginEmail, loginEmail.split("@")[0]);
    const hasLanguage = localStorage.getItem("linguatube_language");
    navigate({ to: hasLanguage ? "/home" : "/language-select" });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match");
      return;
    }
    setRegError("");
    persistAuth(regEmail, regName || regEmail.split("@")[0]);
    navigate({ to: "/language-select" });
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotState("sent");
  };

  const handleGoogleLogin = async () => {
    setOauthError("");
    try {
      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      const state = generateState();

      sessionStorage.setItem("google_pkce_verifier", verifier);
      sessionStorage.setItem("google_oauth_state", state);

      const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: getRedirectUri(),
        response_type: "code",
        scope: "openid email profile",
        code_challenge: challenge,
        code_challenge_method: "S256",
        state,
        prompt: "select_account",
      });

      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    } catch (err) {
      console.error("Google OAuth init failed:", err);
      setOauthError("Could not start Google sign-in. Please try again.");
    }
  };

  const inputClass =
    "bg-card border-border/60 h-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/40 transition-smooth placeholder:text-muted-foreground/50";

  return (
    <div
      data-ocid="auth.page"
      className="flex-1 flex flex-col min-h-screen bg-background"
    >
      {/* Top hero strip */}
      <div
        className="relative flex flex-col items-center justify-end pb-8 pt-14 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 0%, oklch(0.3 0.12 22 / 0.55) 0%, oklch(0.08 0.008 265) 70%)",
          minHeight: 200,
        }}
      >
        {/* Glow circle */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 240,
            height: 240,
            background: "oklch(0.58 0.18 22 / 0.18)",
            filter: "blur(40px)",
          }}
        />
        {/* Logo */}
        <div className="relative flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.58 0.18 22), oklch(0.68 0.2 35))",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <polygon
                points="7,5 7,15 15,10"
                fill="white"
                fillOpacity="0.95"
              />
            </svg>
          </div>
          <span
            className="font-bold text-xl tracking-tight"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 22), oklch(0.75 0.22 35))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Lingua
            </span>
            <span style={{ color: "oklch(0.95 0.005 265)" }}>Tube</span>
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          {showForgot ? "Reset your password" : "Your English learning journey"}
        </p>
      </div>

      {/* Card area */}
      <div className="flex-1 -mt-5 rounded-t-3xl bg-card px-6 pt-8 pb-12 animate-fade-up">
        {showForgot ? (
          // Forgot password view
          <div className="animate-fade-up">
            <div className="mb-6">
              <button
                type="button"
                data-ocid="auth.back_to_login_button"
                onClick={() => {
                  setShowForgot(false);
                  setForgotState("idle");
                }}
                className="flex items-center gap-1 text-sm text-muted-foreground mb-4 transition-smooth hover:text-foreground"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 4L6 8L10 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to login
              </button>
              <h2 className="text-xl font-semibold font-display text-foreground">
                Forgot Password?
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Enter your email and we'll send a reset link.
              </p>
            </div>

            {forgotState === "sent" ? (
              <div
                data-ocid="auth.success_state"
                className="flex flex-col items-center gap-4 py-8 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "oklch(0.65 0.15 142 / 0.15)",
                    border: "2px solid oklch(0.65 0.15 142 / 0.4)",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 14L11 20L23 8"
                      stroke="oklch(0.65 0.15 142)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Reset link sent!
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Check your inbox at {forgotEmail}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(false);
                    setForgotState("idle");
                  }}
                  className="text-sm text-primary transition-smooth hover:opacity-80"
                >
                  Back to login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="forgot-email"
                    className="text-foreground/80 text-sm"
                  >
                    Email address
                  </Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    data-ocid="auth.forgot_email_input"
                    placeholder="your@email.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="auth.forgot_submit_button"
                  className="w-full h-12 rounded-xl text-white font-semibold text-base shadow-glow bg-gradient-brand mt-2"
                >
                  Send Reset Link
                </Button>
              </form>
            )}
          </div>
        ) : (
          // Login / Register tabs
          <Tabs defaultValue="login" className="w-full">
            <TabsList
              className="w-full h-11 rounded-xl mb-8 p-1"
              style={{ background: "oklch(0.08 0.008 265)" }}
            >
              <TabsTrigger
                value="login"
                data-ocid="auth.login_tab"
                className="flex-1 rounded-lg text-sm font-medium transition-smooth data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-glow"
              >
                Log In
              </TabsTrigger>
              <TabsTrigger
                value="register"
                data-ocid="auth.register_tab"
                className="flex-1 rounded-lg text-sm font-medium transition-smooth data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-glow"
              >
                Register
              </TabsTrigger>
            </TabsList>

            {/* LOGIN TAB */}
            <TabsContent value="login" className="mt-0">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-email"
                    className="text-foreground/80 text-sm"
                  >
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    data-ocid="auth.email_input"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-password"
                    className="text-foreground/80 text-sm"
                  >
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    data-ocid="auth.password_input"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <button
                  type="button"
                  data-ocid="auth.forgot_password_button"
                  onClick={() => setShowForgot(true)}
                  className="text-sm text-primary transition-smooth hover:opacity-75 text-right w-full block"
                >
                  Forgot password?
                </button>

                <Button
                  type="submit"
                  data-ocid="auth.submit_button"
                  className="w-full h-12 rounded-xl text-white font-semibold text-base shadow-glow bg-gradient-brand mt-2"
                >
                  Log In
                </Button>
              </form>

              {/* OR divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground/60 font-medium select-none">
                  — OR —
                </span>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              {/* OAuth error banner */}
              {oauthError && (
                <p
                  data-ocid="auth.oauth_error_state"
                  className="text-destructive text-xs text-center bg-destructive/10 rounded-lg px-3 py-2"
                >
                  {oauthError}
                </p>
              )}

              {/* Google login button */}
              <button
                type="button"
                data-ocid="auth.google_login_button"
                onClick={() => {
                  void handleGoogleLogin();
                }}
                disabled={googleLoading}
                className="w-full h-12 rounded-xl border border-border/60 bg-card text-foreground font-semibold text-sm flex items-center justify-center gap-3 transition-smooth hover:bg-muted active:scale-[0.98] shadow-sm disabled:opacity-60 disabled:pointer-events-none"
              >
                {googleLoading ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    className="animate-spin"
                    aria-hidden="true"
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="20 25"
                    />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                      fill="#4285F4"
                    />
                    <path
                      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                      fill="#34A853"
                    />
                    <path
                      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                {googleLoading ? "Signing in…" : "Continue with Google"}
              </button>

              <p className="text-center text-xs text-muted-foreground mt-5">
                New here?{" "}
                <span className="text-primary cursor-pointer hover:opacity-80 transition-smooth">
                  Create an account
                </span>
              </p>
            </TabsContent>

            {/* REGISTER TAB */}
            <TabsContent value="register" className="mt-0">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="reg-name"
                    className="text-foreground/80 text-sm"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="reg-name"
                    data-ocid="auth.name_input"
                    placeholder="Your name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="reg-email"
                    className="text-foreground/80 text-sm"
                  >
                    Email
                  </Label>
                  <Input
                    id="reg-email"
                    type="email"
                    data-ocid="auth.reg_email_input"
                    placeholder="your@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="reg-password"
                    className="text-foreground/80 text-sm"
                  >
                    Password
                  </Label>
                  <Input
                    id="reg-password"
                    type="password"
                    data-ocid="auth.reg_password_input"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="reg-confirm"
                    className="text-foreground/80 text-sm"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="reg-confirm"
                    type="password"
                    data-ocid="auth.reg_confirm_input"
                    placeholder="••••••••"
                    value={regConfirm}
                    onChange={(e) => {
                      setRegConfirm(e.target.value);
                      setRegError("");
                    }}
                    required
                    className={inputClass}
                  />
                  {regError && (
                    <p
                      data-ocid="auth.error_state"
                      className="text-destructive text-xs mt-1"
                    >
                      {regError}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  data-ocid="auth.register_submit_button"
                  className="w-full h-12 rounded-xl text-white font-semibold text-base shadow-glow bg-gradient-brand mt-2"
                >
                  Create Account
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground mt-6">
                Already a learner?{" "}
                <span className="text-primary cursor-pointer hover:opacity-80 transition-smooth">
                  Log in
                </span>
              </p>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
