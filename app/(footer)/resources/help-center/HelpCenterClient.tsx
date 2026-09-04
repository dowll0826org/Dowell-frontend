"use client";

import Link from "next/link";
import {
  Image as ImageIcon,
  Layers,
  Minimize2,
  FileText,
  Headphones,
} from "lucide-react";
import SearchTools from "@/components/common/SearchTools";
import { useTranslation } from "@/hooks/useTranslation";

export default function HelpCenterClient() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header & Search */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            {t("helpCenter.title")}
          </h1>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            {t("helpCenter.subtitle")}
          </p>

          <div className="max-w-2xl mx-auto mt-4">
            <SearchTools />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 pb-24">

        {/* Popular Topics Grid */}
        <div className="mb-20">
          <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-6">
            {t("helpCenter.popularTopics")}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {/* Card 1 */}
            <Link href="/pdf-to-jpg" className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-800 group">
              <div className="bg-[#eef2ff] dark:bg-gray-700 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <ImageIcon size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {t("helpCenter.topics.pdfToJpg.title")}
                </h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed pr-2">
                  {t("helpCenter.topics.pdfToJpg.description")}
                </p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/merge-pdf" className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-800 group">
              <div className="bg-[#eef2ff] dark:bg-gray-700 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <Layers size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {t("helpCenter.topics.mergePdf.title")}
                </h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed pr-2">
                  {t("helpCenter.topics.mergePdf.description")}
                </p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/compress-pdf" className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-800 group">
              <div className="bg-[#eef2ff] dark:bg-gray-700 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <Minimize2 size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {t("helpCenter.topics.compressPdf.title")}
                </h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed pr-2">
                  {t("helpCenter.topics.compressPdf.description")}
                </p>
              </div>
            </Link>

            {/* Card 4 */}
            <Link href="/resources/guides" className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-800 group">
              <div className="bg-[#eef2ff] dark:bg-gray-700 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <FileText size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {t("helpCenter.topics.formats.title")}
                </h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed pr-2">
                  {t("helpCenter.topics.formats.description")}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Still Need Help Section */}
        <div className="bg-[#e5e9fa] dark:bg-gray-800/50 rounded-3xl py-14 px-6 text-center border border-transparent dark:border-gray-800">
          <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-3">
            {t("helpCenter.needHelp.title")}
          </h2>
          <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-8 max-w-[320px] mx-auto leading-relaxed">
            {t("helpCenter.needHelp.description")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/company/contact"
              className="inline-flex items-center gap-2.5 bg-[#0e3082] hover:bg-[#0a2366] text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm shadow-md"
            >
              <Headphones size={16} />
              {t("common.contactSupport")}
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
