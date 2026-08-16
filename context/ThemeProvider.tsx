"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // Suppress React 19 false-positive warning from next-themes injecting a script tag
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const origError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
        return;
      }
      origError.apply(console, args);
    };
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
