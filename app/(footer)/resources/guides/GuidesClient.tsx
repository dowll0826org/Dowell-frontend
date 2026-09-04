"use client";

import Link from "next/link";
import { ArrowRight, Check, ArrowRightLeft } from "lucide-react";
import { summaryGuides, supportedFormats, conversionTools } from "@/lib/data";
import { useTranslation } from "@/hooks/useTranslation";

const getDescKey = (slug: string) => {
  if (slug.includes('merge')) return 'guides.descriptions.desc-merge';
  if (slug.includes('split')) return 'guides.descriptions.desc-split';
  if (slug.includes('compress')) return 'guides.descriptions.desc-compress';
  if (slug.includes('-to-pdf')) return 'guides.descriptions.desc-to-pdf';
  if (slug.includes('pdf-to-')) return 'guides.descriptions.desc-from-pdf';
  if (slug.includes('edit')) return 'guides.descriptions.desc-edit';
  if (slug.includes('organize')) return 'guides.descriptions.desc-organize';
  if (slug.includes('add-watermark')) return 'guides.descriptions.desc-add-watermark';
  if (slug.includes('remove-watermark')) return 'guides.descriptions.desc-remove-watermark';
  return null;
};

const getCategoryTranslation = (category: string) => {
  switch (category) {
    case 'Document Formats': return 'guides.support.doc-formats';
    case 'Spreadsheet Formats': return 'guides.support.spreadsheet-formats';
    case 'Presentation Formats': return 'guides.support.presentation-formats';
    case 'Image Formats': return 'guides.support.image-formats';
    default: return null;
  }
};

const getToolTitleTranslation = (title: string) => {
  switch (title) {
    case 'PDF Input Support': return 'guides.support.pdf-input';
    case 'Image Input Support': return 'guides.support.image-input';
    case 'Document Input Support': return 'guides.support.doc-input';
    default: return null;
  }
};

const getOutputTranslation = (output: string) => {
  switch (output) {
    case 'Image -> PDF': return 'guides.support.image-to-pdf';
    case 'Compress Image': return 'guides.support.compress-image';
    case 'Resize Image': return 'guides.support.resize-image';
    default: return null;
  }
};

export default function GuidesClient() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pb-32 transition-colors duration-200">
      <div className="container mx-auto px-6 pt-24 lg:pt-32 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            {t('guides.title')}
          </h1>
          <p className="text-[17px] text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('guides.subtitle')}
          </p>
        </div>

        {/* Document Guides Section */}
        <section>
          <div className="text-center mb-14">
            <p className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-[11px] mb-3">{t('guides.tutorialsLabel')}</p>
            <h2 className="text-[26px] font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              {t('guides.documentGuides')}
            </h2>
            <p className="text-[15px] text-gray-500 dark:text-gray-400">
              {t('guides.documentGuidesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {summaryGuides.map((guide) => {
              const descKey = getDescKey(guide.slug);
              const translatedTitle = t(`tools.${guide.slug}`, guide.title);
              const translatedDesc = descKey ? t(descKey, guide.description) : guide.description;

              return (
              <Link key={guide.slug} href={`/resources/guides/${guide.slug}`} className="group block p-7 bg-white dark:bg-gray-800 rounded-[14px] shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-300">
                <h3 className="text-[16px] font-bold text-gray-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{translatedTitle}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed text-[13.5px] pr-2">{translatedDesc}</p>
                <p className="text-[#0ea5e9] dark:text-sky-400 text-[13px] font-bold flex items-center gap-1.5 mt-auto group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  {t('common.readGuide')}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </p>
              </Link>
            )})}
          </div>
        </section>

        {/* Supported Formats Section */}
        <section className="mt-28">
          <div className="text-center mb-12">
            <h2 className="text-[26px] font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              {t('guides.supportedFormats')}
            </h2>
            <p className="text-[15px] text-gray-500 dark:text-gray-400">
              {t('guides.supportedFormatsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportedFormats.map((format, idx) => {
              const catKey = getCategoryTranslation(format.category);
              const catTitle = catKey ? t(catKey, format.category) : format.category;
              
              return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-[#eef2ff] dark:bg-gray-700 p-2 rounded-lg">
                    {format.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-[14px]">{catTitle}</h3>
                </div>
                <ul className="space-y-3">
                  {format.items.map((item, i) => (
                    <li key={i} className="text-[13px] text-gray-500 dark:text-gray-400 flex items-start gap-2.5">
                      <Check size={14} strokeWidth={3} className="text-[#10b981] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )})}
          </div>
        </section>

        {/* Conversion Capabilities Section */}
        <section className="mt-28">
          <div className="text-center mb-12">
            <h2 className="text-[26px] font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              {t('guides.conversionCapabilities')}
            </h2>
            <p className="text-[15px] text-gray-500 dark:text-gray-400">
              {t('guides.conversionCapabilitiesSubtitle')}
            </p>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            {conversionTools.map((tool, idx) => {
              const titleKey = getToolTitleTranslation(tool.title);
              const toolTitle = titleKey ? t(titleKey, tool.title) : tool.title;
              
              return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-[14px] shadow-sm border border-gray-200 dark:border-gray-700 px-8 py-7 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-full md:w-[220px] shrink-0">
                  <h3 className="text-[14px] font-bold text-gray-900 dark:text-white mb-2.5">{toolTitle}</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.inputs.map((input, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#eef2ff] dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[11px] font-bold rounded-md">
                        {input}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center text-gray-300 dark:text-gray-600 px-6 shrink-0">
                  <ArrowRightLeft size={20} strokeWidth={1.5} />
                </div>

                <div className="w-full">
                  <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">
                    {idx === 0 ? t('common.convertsTo') : t('common.availableConversions')}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {tool.outputs?.map((item, i) => {
                      const outKey = getOutputTranslation(item);
                      const itemTitle = outKey ? t(outKey, item) : item;
                      return (
                      <span key={i} className="px-3.5 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-[12px] font-medium rounded-lg shadow-sm">
                        {itemTitle}
                      </span>
                    )})}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </section>
      </div>
    </main>
  );
}
