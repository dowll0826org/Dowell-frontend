import { useLanguage } from "@/context/LanguageContext";

/**
 * Convenience hook for translation.
 *
 * Usage:
 *   const { t, locale, setLocale, isRTL } = useTranslation();
 *   <h1>{t("hero.headline1")}</h1>
 */
export function useTranslation() {
  return useLanguage();
}
