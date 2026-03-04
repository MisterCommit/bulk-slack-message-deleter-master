"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const THEME_KEY = "theme";

export type ThemeValue = "light" | "dark" | "system";

function getStoredTheme(): ThemeValue {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark" || stored === "system")
    return stored;
  return "system";
}

function getSystemDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(value: ThemeValue) {
  const isDark =
    value === "dark" || (value === "system" && getSystemDark());
  document.documentElement.classList.toggle("dark", isDark);
}

const ThemeContext = createContext<{
  theme: ThemeValue;
  setTheme: (value: ThemeValue) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeValue>("system");

  const setTheme = useCallback((value: ThemeValue) => {
    setThemeState(value);
    localStorage.setItem(THEME_KEY, value);
    applyTheme(value);
  }, []);

  useEffect(() => {
    setThemeState(getStoredTheme());
    applyTheme(getStoredTheme());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (getStoredTheme() === "system") applyTheme("system");
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
