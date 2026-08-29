"use client";

import { useEffect, useRef, useState } from "react";
import { GitFork, Star } from "lucide-react";

/**
 * Repo featured on the live counters. Swap owner/name to feature
 * any repository — the UI falls back to the cached numbers below
 * whenever the public GitHub API is rate-limited or unreachable.
 */
export const REPO = {
  owner: "microsoft",
  name: "playwright",
  url: "https://github.com/microsoft/playwright",
  fallbackStars: 88000,
  fallbackForks: 5300,
};

interface GhStats {
  stars: number;
  forks: number;
  live: boolean;
}

// Module-level shared fetch: one request to the GitHub API per page load,
// no matter how many consumers render. Avoids burning the public
// rate limit (60 req/h per IP) on duplicate calls.
let sharedFetch: Promise<GhStats> | null = null;

function fetchGitHubStats(): Promise<GhStats> {
  if (!sharedFetch) {
    const fallback: GhStats = {
      stars: REPO.fallbackStars,
      forks: REPO.fallbackForks,
      live: false,
    };
    sharedFetch = (async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4500);
        const res = await fetch(
          `https://api.github.com/repos/${REPO.owner}/${REPO.name}`,
          {
            headers: { Accept: "application/vnd.github.v3+json" },
            signal: controller.signal,
          }
        );
        clearTimeout(timeout);
        if (!res.ok) return fallback;
        const data = await res.json();
        if (typeof data?.stargazers_count !== "number") return fallback;
        return {
          stars: data.stargazers_count,
          forks:
            typeof data.forks_count === "number"
              ? data.forks_count
              : REPO.fallbackForks,
          live: true,
        };
      } catch {
        return fallback;
      }
    })();
  }
  return sharedFetch;
}

function useGitHubStats(): GhStats {
  const [stats, setStats] = useState<GhStats>({
    stars: REPO.fallbackStars,
    forks: REPO.fallbackForks,
    live: false,
  });

  useEffect(() => {
    let cancelled = false;
    fetchGitHubStats().then((result) => {
      if (!cancelled) setStats(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}

function formatNumber(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k >= 100 ? Math.round(k) : k.toFixed(1)}k`;
  }
  return String(n);
}

function useCountUp(target: number, duration = 1400): number {
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const frame = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.floor(target * eased));
      if (t < 1) raf.current = requestAnimationFrame(frame);
    };
    raf.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return value;
}

export function GitHubPill() {
  const { stars, forks, live } = useGitHubStats();
  const starsShown = useCountUp(stars);
  const forksShown = useCountUp(forks);

  return (
    <a
      href={REPO.url}
      target="_blank"
      rel="noopener noreferrer"
      className="gh-pill"
      title={`Live from GitHub — ${REPO.owner}/${REPO.name}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <Star size={12} className="fill-current opacity-80" aria-hidden="true" />
        <span className="gh-num" data-testid="gh-stars">{formatNumber(starsShown)}</span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <GitFork size={12} className="opacity-70" aria-hidden="true" />
        <span className="gh-num" data-testid="gh-forks">{formatNumber(forksShown)}</span>
      </span>
      <span
        className={`ml-0.5 h-1.5 w-1.5 rounded-full ${live ? "" : "opacity-50"}`}
        style={{ background: live ? "var(--pass)" : "var(--muted)" }}
        title={live ? "Live from GitHub API" : "Cached fallback"}
        aria-hidden="true"
      />
    </a>
  );
}

export function GitHubHeroStats() {
  const { stars, forks, live } = useGitHubStats();
  const starsShown = useCountUp(stars, 1600);
  const forksShown = useCountUp(forks, 1600);

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
      <div>
        <a
          href={REPO.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          <Star size={14} aria-hidden="true" />
          <span className="font-mono text-2xl font-bold tabular-nums" data-testid="hero-stars">
            {formatNumber(starsShown)}
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest">stars</span>
        </a>
      </div>
      <div>
        <a
          href={REPO.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          <GitFork size={14} aria-hidden="true" />
          <span className="font-mono text-2xl font-bold tabular-nums" data-testid="hero-forks">
            {formatNumber(forksShown)}
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest">forks</span>
        </a>
      </div>
      <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
        {live ? "live · github api" : "cached · api offline"}
      </span>
    </div>
  );
}
