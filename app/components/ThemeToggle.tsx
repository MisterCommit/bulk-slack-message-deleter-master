"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { Monitor, Moon, Sun } from "lucide-react";

const themes: { value: "light" | "dark" | "system"; label: string; icon: typeof Sun }[] = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-zinc-300 bg-zinc-100 p-1 dark:border-zinc-600 dark:bg-zinc-800/50">
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          title={`Theme: ${label}`}
          aria-label={`Set theme to ${label}`}
          className={`rounded-md p-2 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${
            theme === value
              ? "bg-amber-500/20 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
              : "text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-200"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </button>
      ))}
    </div>
  );
}
