"use client";

import { HelpCircle, Cookie } from 'lucide-react';
import { cookiePolicyData } from '@/lib/data';
import { useTranslation } from '@/hooks/useTranslation';

export default function CookieClient() {
  const { t } = useTranslation();
  const { header, sections, cookieDetails } = cookiePolicyData;

  return (
    <main className="flex-grow flex flex-col bg-[#fafbfe] dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 w-full">
        <div className="mb-12">
          <div className="w-12 h-12 rounded-xl bg-[#eef3fb] dark:bg-blue-900/30 flex items-center justify-center text-[#1c4794] dark:text-blue-400 mb-6">
            <Cookie size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">{header.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">{header.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-6">
                  <section.icon size={20} className="text-[#1c4794] dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                </div>
                {section.content && (
                  <div className="text-gray-600 dark:text-gray-300 space-y-4 text-sm leading-relaxed">
                    {section.content.map((p, idx) => <p key={idx}>{p}</p>)}
                  </div>
                )}
                {section.types && (
                  <div className="space-y-6">
                    {section.types.map((type, idx) => (
                      <div key={idx} className={`pl-4 border-l-2 ${type.colorClass}`}>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{type.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{type.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Cookie Details Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-8 pb-4">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1c4794] dark:text-blue-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="3" x2="21" y1="15" y2="15" /><line x1="9" x2="9" y1="9" y2="21" /><line x1="15" x2="15" y1="9" y2="21" /></svg>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("legal.cookie.cookieDetails")}</h2>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f8fafc] dark:bg-gray-700/50 text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="px-8 py-4 font-medium text-xs uppercase tracking-wider">{t("legal.cookie.tableHeaders.cookieName")}</th>
                      <th className="px-8 py-4 font-medium text-xs uppercase tracking-wider">{t("legal.cookie.tableHeaders.type")}</th>
                      <th className="px-8 py-4 font-medium text-xs uppercase tracking-wider">{t("legal.cookie.tableHeaders.duration")}</th>
                      <th className="px-8 py-4 font-medium text-xs uppercase tracking-wider">{t("legal.cookie.tableHeaders.purpose")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                    {cookieDetails.map((cookie, idx) => (
                      <tr key={idx}>
                        <td className="px-8 py-5 text-gray-900 dark:text-gray-300 font-medium">{cookie.name}</td>
                        <td className="px-8 py-5"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${cookie.typeClass}`}>{cookie.type}</span></td>
                        <td className="px-8 py-5 text-gray-500 dark:text-gray-400">{cookie.duration}</td>
                        <td className="px-8 py-5 text-gray-600 dark:text-gray-300">{cookie.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#f4f7fb] dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{t("legal.cookie.managePreferences")}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">{t("legal.cookie.managePreferencesDesc")}</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{t("legal.cookie.essentialCookies")}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t("legal.cookie.alwaysActive")}</div>
                  </div>
                  <div className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent bg-[#1c4794] opacity-50 dark:bg-blue-600 transition-colors duration-200 ease-in-out">
                    <span className="translate-x-4 pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{t("legal.cookie.analyticalCookies")}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t("legal.cookie.helpUsImprove")}</div>
                  </div>
                  <div className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#1c4794] dark:bg-blue-600 transition-colors duration-200 ease-in-out">
                    <span className="translate-x-4 pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#0f3482] hover:bg-[#0c2a68] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm shadow-sm">
                {t("legal.cookie.savePreferences")}
              </button>
            </div>
            <div className="bg-[#f8fafc] dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex space-x-3">
                <HelpCircle size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{t("legal.cookie.needHelp")}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t("legal.cookie.needHelpDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
