"use client";

import React from 'react';
import Image from 'next/image';
import { Lock, Shield, Zap, Eye } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function AboutUsClient() {
  const { t } = useTranslation();

  const values = [
    { titleKey: "about.values.privacyFirst.title", descKey: "about.values.privacyFirst.desc", icon: Lock },
    { titleKey: "about.values.security.title", descKey: "about.values.security.desc", icon: Shield },
    { titleKey: "about.values.performance.title", descKey: "about.values.performance.desc", icon: Zap },
    { titleKey: "about.values.transparency.title", descKey: "about.values.transparency.desc", icon: Eye },
  ];

  return (
    <main className="flex-grow flex flex-col bg-[#fafbfe] dark:bg-gray-900 transition-colors min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 w-full space-y-24">
        {/* Header Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t("about.headline")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {t("about.subtitle")}
          </p>
        </section>

        {/* Mission and Story Section */}
        <section className="space-y-6">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 md:p-14 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center h-full">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1c4794] dark:text-blue-400 mb-4">
                {t("about.mission.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("about.mission.text")}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm h-full flex">
              <Image
                src="/assets/aboutimage2.png"
                alt="dowll about"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-sm h-full flex order-2 md:order-1">
              <Image
                src="/assets/aboutImage1.png"
                alt="dowll about"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 md:p-14 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center h-full order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t("about.story.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("about.story.text")}
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white tracking-tight">
            {t("about.values.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-start h-full">
                <div className="bg-[#eef3fb] dark:bg-blue-900/30 p-2.5 rounded-xl text-[#1c4794] dark:text-blue-400 mb-6">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t(value.titleKey)}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t(value.descKey)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
