import en from "./translations/en.json";
import fr from "./translations/fr.json";
import es from "./translations/es.json";
import de from "./translations/de.json";
// import ar from "./translations/ar.json";
import hi from "./translations/hi.json";
import zh from "./translations/zh.json";
import pt from "./translations/pt.json";

export type Locale = "en" | "fr" | "es" | "de" /* | "ar" */ | "hi" | "zh" | "pt";

export interface Language {
  code: Locale;
  label: string;
  nativeLabel: string;
  flag: string;
  rtl?: boolean;
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English",    nativeLabel: "English",    flag: "🇺🇸" },
  { code: "fr", label: "French",     nativeLabel: "Français",   flag: "🇫🇷" },
  { code: "es", label: "Spanish",    nativeLabel: "Español",    flag: "🇪🇸" },
  { code: "de", label: "German",     nativeLabel: "Deutsch",    flag: "🇩🇪" },
  // { code: "ar", label: "Arabic",     nativeLabel: "العربية",    flag: "🇸🇦", rtl: true },
  { code: "hi", label: "Hindi",      nativeLabel: "हिन्दी",      flag: "🇮🇳" },
  { code: "zh", label: "Chinese",    nativeLabel: "中文",        flag: "🇨🇳" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português",  flag: "🇧🇷" },
];

export const defaultLocale: Locale = "en";

export const translations: Record<Locale, typeof en> = { en, fr, es, de, /* ar, */ hi, zh, pt };
