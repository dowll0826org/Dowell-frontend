"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  FileText,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { summaryGuides, detailedGuides } from "@/lib/data";

interface GuidePageClientProps {
  slug: string;
  targetLink: string;
  hasDetailedGuide: boolean;
}

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

export default function GuidePageClient({ slug, targetLink, hasDetailedGuide }: GuidePageClientProps) {
  const { t } = useTranslation();
  
  const summaryGuide = summaryGuides.find((g) => g.slug === slug);
  const englishTitle = summaryGuide?.title || slug;
  
  const title = t(`tools.${slug}`, englishTitle);
  const descKey = getDescKey(slug);
  const description = descKey ? t(descKey, summaryGuide?.description) : summaryGuide?.description;

  const steps = [
    t('guides.page.step1', 'Upload your file.'),
    t('guides.page.step2', 'Adjust settings if needed.'),
    t('guides.page.step3', 'Process the file.'),
    t('guides.page.step4', 'Download the result.')
  ];
  
  const benefits = [
    t('guides.page.benefit1', 'Fast and secure processing'),
    t('guides.page.benefit2', 'No installation required'),
    t('guides.page.benefit3', 'Works on any device')
  ];
  
  // Extract related tools from detailed guide if available, else empty
  const detailedGuide = detailedGuides[slug as keyof typeof detailedGuides];
  const relatedTools = detailedGuide?.relatedTools || [];
  
  const faq = detailedGuide?.content?.faq || [];

  return (
    <div className="bg-[#131538] text-white pt-12 pb-48 px-6 relative">
      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col lg:flex-row gap-8 justify-between items-start">
        <div className="max-w-2xl">
          <div className="flex items-center text-gray-400 text-[13px] font-medium mb-8 space-x-2">
            <Link href="/resources" className="hover:text-white transition-colors">{t('guides.page.resources', 'Resources')}</Link>
            <ChevronRight size={14} />
            <Link href="/resources/guides" className="hover:text-white transition-colors">{t('guides.page.guides', 'Guides')}</Link>
            <ChevronRight size={14} />
            <span className="text-white font-semibold">{title}</span>
          </div>

          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-3 py-1 mb-6">
            <BookOpen size={14} className="text-gray-300" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-gray-300">{t('guides.page.stepByStep', 'Step-by-Step Guide')}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold mb-6 leading-tight tracking-tight text-white">
            {title}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        {/* Right side CTA Card */}
        <div className="w-full lg:w-auto shrink-0 mt-8 lg:mt-4">
          <div className="bg-[#1e204d] rounded-2xl p-8 w-full sm:w-[360px] shadow-2xl">
            <h3 className="font-bold text-white mb-3 text-xl">{t('guides.page.readyToStart', 'Ready to start?')}</h3>
            <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">{t('guides.page.jumpRightIn', 'Jump right into the tool and process your documents securely.')}</p>
            <Link
              href={targetLink}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0052cc] hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-all"
            >
              {t('guides.page.exploreTools', 'Explore Tools')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GuideContentClient({ slug, hasDetailedGuide }: { slug: string, hasDetailedGuide: boolean }) {
  const { t } = useTranslation();
  const summaryGuide = summaryGuides.find((g) => g.slug === slug);
  const descKey = getDescKey(slug);
  const description = descKey ? t(descKey, summaryGuide?.description) : summaryGuide?.description;

  const steps = [
    t('guides.page.step1', 'Upload your file.'),
    t('guides.page.step2', 'Adjust settings if needed.'),
    t('guides.page.step3', 'Process the file.'),
    t('guides.page.step4', 'Download the result.')
  ];
  
  const benefits = [
    t('guides.page.benefit1', 'Fast and secure processing'),
    t('guides.page.benefit2', 'No installation required'),
    t('guides.page.benefit3', 'Works on any device')
  ];

  const detailedGuide = detailedGuides[slug as keyof typeof detailedGuides];
  const relatedTools = detailedGuide?.relatedTools || [];
  const faq = detailedGuide?.content?.faq || [];

  return (
    <div className="container mx-auto max-w-6xl px-6 -mt-36 relative z-20 pb-24">
      <div className="bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden min-h-[500px]">
        <div className="p-8 md:p-12 lg:p-16">
          <p className="text-[17px] text-gray-600 dark:text-gray-300 leading-relaxed mb-16 max-w-3xl">
            {description}
          </p>

          <div className="grid lg:grid-cols-[1fr_400px] gap-x-20 gap-y-16">
            <div className="space-y-20">
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-[#eef2ff] dark:bg-blue-900/30 p-2.5 rounded-xl text-[#3b82f6] dark:text-blue-400">
                    <FileText size={22} />
                  </div>
                  <h2 className="text-[22px] font-bold text-gray-900 dark:text-white">{t('guides.page.howItWorks', 'How it works')}</h2>
                </div>

                <div className="space-y-0 pl-2">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-8 relative min-h-[110px]">
                      {idx !== steps.length - 1 && (
                        <div className="absolute left-[15px] top-10 bottom-[-10px] w-[2px] bg-gray-100 dark:bg-gray-700"></div>
                      )}
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#eef2ff] dark:bg-blue-900/30 text-blue-900 dark:text-blue-400 font-semibold text-sm shrink-0 relative z-10">
                        {idx + 1}
                      </div>
                      <div className="pt-1 pb-10">
                        <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2">{t('guides.page.step', 'Step')} {idx + 1}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {faq.length > 0 && (
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-gray-100 dark:bg-gray-700 p-2.5 rounded-xl text-gray-600 dark:text-gray-300">
                      <HelpCircle size={22} />
                    </div>
                    <h2 className="text-[22px] font-bold text-gray-900 dark:text-white">{t('guides.page.faq', 'Frequently Asked Questions')}</h2>
                  </div>
                  <div className="space-y-6">
                    {faq.map((faqItem, idx) => (
                      <div key={idx} className="pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <h3 className="font-bold text-gray-900 dark:text-white text-[16px] mb-2">{faqItem.question}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">{faqItem.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-[#f4f5fa] dark:bg-gray-900 rounded-2xl p-7">
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-[15px]">{t('guides.page.whyUse', 'Why use dowll?')}</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-[14px]">
                      <CheckCircle2 className="text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" size={18} strokeWidth={2} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#f2faef] dark:bg-[#1a2f1c] rounded-2xl p-7 border border-[#d3efca] dark:border-[#2f5333]">
                <div className="flex items-center gap-2.5 mb-3 text-[#1f7a26] dark:text-[#4ade80]">
                  <ShieldCheck size={20} strokeWidth={2.5} />
                  <h3 className="font-bold text-[15px]">{t('guides.page.secureProcessing', 'Secure Processing')}</h3>
                </div>
                <p className="text-[#648b59] dark:text-[#a3e635] text-[14px] leading-relaxed">
                  {t('guides.page.secureProcessingDesc', 'dowll processes files securely and protects your documents.')}
                </p>
              </div>

              {relatedTools.length > 0 && (
                <div className="p-7 border border-gray-100 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 shadow-sm mt-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-[15px]">{t('guides.page.relatedTools', 'Related Tools')}</h3>
                  <div className="flex flex-col gap-2">
                    {relatedTools.map((tool, idx) => (
                      <Link
                        key={idx}
                        href={`/${tool}`}
                        className="group flex items-center justify-between p-3 -mx-3 rounded-lg text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-[14px]"
                      >
                        <span className="capitalize">{t(`tools.${tool}`, tool.replace(/-/g, ' '))}</span>
                        <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
