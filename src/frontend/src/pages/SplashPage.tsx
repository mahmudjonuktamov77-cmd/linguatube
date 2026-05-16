import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function SplashPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger float-in
    const showTimer = setTimeout(() => setVisible(true), 50);

    // Animate loading bar over 2s
    const startTime = Date.now();
    const duration = 2000;
    const raf = { id: 0 };

    function tick() {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf.id = requestAnimationFrame(tick);
      }
    }
    raf.id = requestAnimationFrame(tick);

    // Navigate after 2.5s
    const navTimer = setTimeout(() => {
      navigate({ to: "/auth" });
    }, 2500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(navTimer);
      cancelAnimationFrame(raf.id);
    };
  }, [navigate]);

  return (
    <div
      data-ocid="splash.page"
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.35 0.12 22 / 0.45) 0%, oklch(0.08 0.008 265) 65%)",
      }}
    >
      {/* Ambient glow rings */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, oklch(0.58 0.18 22 / 0.12) 0%, transparent 70%)",
          animation: "pulse-subtle 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 260,
          height: 260,
          background:
            "radial-gradient(circle, oklch(0.58 0.18 22 / 0.18) 0%, transparent 70%)",
          animation: "pulse-subtle 2s ease-in-out infinite reverse",
        }}
      />

      {/* Logo mark */}
      <div
        className="relative mb-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(24px) scale(0.92)",
          transition:
            "opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Glow behind icon */}
        <div
          className="absolute inset-0 rounded-3xl blur-2xl scale-125"
          style={{ background: "oklch(0.58 0.18 22 / 0.35)" }}
        />
        <div
          className="relative w-24 h-24 rounded-3xl flex items-center justify-center shadow-glow"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.58 0.18 22), oklch(0.68 0.2 35))",
          }}
        >
          {/* Play triangle icon */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="22" cy="22" r="18" fill="white" fillOpacity="0.12" />
            <polygon
              points="18,14 18,30 33,22"
              fill="white"
              fillOpacity="0.95"
            />
          </svg>
        </div>
      </div>

      {/* Wordmark */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.5s 0.15s ease, transform 0.5s 0.15s ease",
        }}
        className="flex items-baseline gap-0 mb-3"
      >
        <span
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "2.5rem",
            background:
              "linear-gradient(135deg, oklch(0.58 0.18 22), oklch(0.72 0.22 35))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LINGUA
        </span>
        <span
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "2.5rem",
            color: "oklch(0.95 0.005 265)",
          }}
        >
          TUBE
        </span>
      </div>

      {/* Subtitle */}
      <p
        className="text-sm tracking-widest uppercase"
        style={{
          color: "oklch(0.55 0.01 265)",
          letterSpacing: "0.15em",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s 0.3s ease, transform 0.5s 0.3s ease",
        }}
      >
        Learn English Through Real Content
      </p>

      {/* Loading bar */}
      <div
        className="absolute bottom-16 left-0 right-0 mx-auto px-12"
        style={{
          maxWidth: 430,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s 0.5s ease",
        }}
      >
        <div
          className="h-1 rounded-full overflow-hidden"
          style={{ background: "oklch(0.2 0.008 265)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, oklch(0.58 0.18 22), oklch(0.68 0.2 35))",
              transition: "width 0.05s linear",
              boxShadow: "0 0 12px oklch(0.58 0.18 22 / 0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
