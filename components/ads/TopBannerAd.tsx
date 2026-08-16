import React from 'react';

export default function TopBannerAd() {
  return (
    <div className="w-full h-[90px] mb-8 bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden group flex-shrink-0 hidden md:flex">
      <span className="text-gray-400 dark:text-gray-500 font-medium text-sm transition-transform group-hover:scale-105">
        Advertisement (728x90)
      </span>
      <div className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white dark:bg-gray-800 px-2 py-0.5 rounded shadow-sm">
        Ad
      </div>
    </div>
  );
}
