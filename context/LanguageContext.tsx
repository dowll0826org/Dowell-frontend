"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Locale, defaultLocale, translations, LANGUAGES } from "@/lib/i18n";

type TranslationValue = string | Record<string, unknown>;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallbackOrVars?: string | Record<string, string | number>, fallback?: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key: string, fallbackOrVars?: string | Record<string, string | number>, fallback?: string) => {
    let text = typeof fallbackOrVars === 'string' ? fallbackOrVars : (fallback || key);
    if (typeof fallbackOrVars === 'object' && fallbackOrVars !== null) {
      Object.entries(fallbackOrVars).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), String(v));
      });
    }
    return text;
  },
  isRTL: false,
});

/**
 * Resolves a dot-notation key from a nested object.
 * e.g. t("hero.headline1") -> translations["en"]["hero"]["headline1"]
 */
function resolvePath(obj: Record<string, unknown>, path: string, fallback?: string): string {
  const parts = path.split(".");
  let current: TranslationValue = obj as Record<string, unknown>;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part] as TranslationValue;
    } else {
      return fallback || path; // Key not found – return fallback or key itself
    }
  }
  return typeof current === "string" ? current : (fallback || path);
}

/** Detect browser language and map it to a supported locale */
function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const browserLang = navigator.language?.slice(0, 2) as Locale;
  const supported = LANGUAGES.map((l) => l.code);
  return supported.includes(browserLang) ? browserLang : defaultLocale;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Load persisted locale or detect from browser on mount
  useEffect(() => {
    const stored = localStorage.getItem("dowll-locale") as Locale | null;
    if (stored && LANGUAGES.some((l) => l.code === stored)) {
      setLocaleState(stored);
    } else {
      setLocaleState(detectBrowserLocale());
    }
  }, []);

  // Sync locale changes to <html> element
  useEffect(() => {
    const lang = LANGUAGES.find((l) => l.code === locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = lang?.rtl ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("dowll-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: string, fallbackOrVars?: string | Record<string, string | number>, fallback?: string): string => {
      let fb = fallback;
      let vars: Record<string, string | number> | undefined = undefined;
      
      if (typeof fallbackOrVars === 'string') {
        fb = fallbackOrVars;
      } else if (fallbackOrVars !== undefined) {
        vars = fallbackOrVars;
      }
      
      const dict = translations[locale] as unknown as Record<string, unknown>;
      let text = resolvePath(dict, key, fb);
      
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), String(v));
        });
      }
      
      return text;
    },
    [locale]
  );

  const isRTL = LANGUAGES.find((l) => l.code === locale)?.rtl ?? false;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
