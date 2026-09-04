"use client";

import { useTranslation } from "@/hooks/useTranslation";

interface ToolHeroClientProps {
  toolSlug: string;
  defaultTitle?: string;
  defaultSubtitle?: string;
}

export default function ToolHeroClient({ toolSlug, defaultTitle, defaultSubtitle }: ToolHeroClientProps) {
  const { t } = useTranslation();

  // Try to get a translated title and subtitle if they exist in the SEO translations.
  // Otherwise, fall back to the English defaultTitle and defaultSubtitle from seoData.
  const title = t(`seo.${toolSlug}.heroTitle`, defaultTitle);
  const subtitle = t(`seo.${toolSlug}.heroSubtitle`, defaultSubtitle);

  if (!title) return null;

  return (
    <section className="text-center space-y-4 mt-12 mb-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </section>
  );
}
