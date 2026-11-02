"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center opacity-40">
        <Sun className="h-4 w-4" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface-secondary hover:border-accent/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-accent transition-transform rotate-0 scale-100" />
      ) : (
        <Moon className="h-4 w-4 text-foreground/80 transition-transform rotate-0 scale-100" />
      )}
    </button>
  );
}
