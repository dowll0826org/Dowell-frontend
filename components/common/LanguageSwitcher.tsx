"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { LANGUAGES } from "@/lib/i18n";
import { useTranslation } from "@/hooks/useTranslation";

interface LanguageSwitcherProps {
  /** compact — icon only + chevron (used in header) */
  variant?: "compact" | "full";
  /** direction the dropdown opens */
  direction?: "up" | "down";
}

export default function LanguageSwitcher({ variant = "compact", direction = "down" }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen((v) => !v)}
        aria-label={t("languageSwitcher.selectLanguage")}
        aria-expanded={isOpen}
        className={`
          flex items-center gap-1.5 rounded-lg px-2.5 py-2
          text-gray-600 dark:text-gray-300
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition-colors duration-150 select-none
          ${variant === "full" ? "text-sm font-medium" : "text-sm"}
        `}
      >
        <Globe className="w-4 h-4 shrink-0" />
        {variant === "full" && (
          <span className="hidden sm:inline">{current.nativeLabel}</span>
        )}
        {variant === "compact" && (
          <span className="font-semibold text-xs uppercase tracking-wide">
            {current.code.toUpperCase()}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`
            absolute right-0 w-52 z-50
            bg-white dark:bg-gray-900
            border border-gray-100 dark:border-gray-700
            rounded-xl shadow-lg dark:shadow-none
            py-1.5 overflow-hidden
            animate-in fade-in duration-150
            ${direction === "up" ? "bottom-full mb-2 slide-in-from-bottom-2" : "top-full mt-2 slide-in-from-top-2"}
          `}
          role="listbox"
          aria-label={t("languageSwitcher.selectLanguage")}
        >
          <p className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {t("languageSwitcher.label")}
          </p>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === locale}
              onClick={() => {
                setLocale(lang.code);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2 text-sm
                transition-colors duration-100
                ${lang.code === locale
                  ? "bg-blue-50 dark:bg-blue-900/20 text-[#005ee6] dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }
              `}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <span className="flex-1 text-left">{lang.nativeLabel}</span>
              {lang.code === locale && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
