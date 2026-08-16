"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button suppressHydrationWarning className="fixed bottom-6 right-6 p-3.5 rounded-full bg-white dark:bg-gray-800 text-gray-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 dark:border-gray-700 w-[52px] h-[52px] flex items-center justify-center z-50">
        <span className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      suppressHydrationWarning
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 p-3.5 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 dark:border-gray-700 hover:scale-110 active:scale-95 transition-all duration-300 z-50 flex items-center justify-center w-[52px] h-[52px]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={22} className="text-amber-400" /> : <Moon size={22} className="text-slate-600" />}
    </button>
  );
}
