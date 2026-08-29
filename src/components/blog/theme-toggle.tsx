"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun, TerminalSquare } from "lucide-react";

export type ThemeId = "dark" | "light" | "cyber";

const THEMES: { id: ThemeId; label: string; icon: React.ReactNode }[] = [
  { id: "dark", label: "Night Run (dark)", icon: <Moon size={15} strokeWidth={2.2} /> },
  { id: "light", label: "Paper Trail (light)", icon: <Sun size={15} strokeWidth={2.2} /> },
  { id: "cyber", label: "Phosphor (terminal)", icon: <TerminalSquare size={15} strokeWidth={2.2} /> },
];

const STORAGE_KEY = "asserttrue-theme";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Client snapshot: the live data-theme attribute on <html>. */
function getSnapshot(): ThemeId {
  return (document.documentElement.getAttribute("data-theme") as ThemeId) ?? "dark";
}

/** Server snapshot: matches the default data-theme rendered in layout. */
function getServerSnapshot(): ThemeId {
  return "dark";
}

function applyTheme(next: ThemeId) {
  const root = document.documentElement;
  root.classList.add("theme-anim");
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // private mode etc. — theme still applies for this session
  }
  listeners.forEach((fn) => fn());
  window.setTimeout(() => root.classList.remove("theme-anim"), 600);
}

/**
 * 3-state theme toggle. Adds a temporary `theme-anim` class to <html>
 * so every element cross-fades its colors over ~450ms, then removes
 * it to keep idle rendering cheap.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: ThemeId) => applyTheme(next), []);

  return (
    <div className="theme-toggle" role="group" aria-label="Theme selector">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className="theme-btn"
          data-active={theme === t.id}
          aria-pressed={theme === t.id}
          aria-label={t.label}
          title={t.label}
          onClick={() => setTheme(t.id)}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
