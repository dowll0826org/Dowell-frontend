import React from 'react';

type SidebarAdProps = {
  size?: "300x250" | "300x600";
};

export default function SidebarAd({ size = "300x250" }: SidebarAdProps) {
  const heightClass = size === "300x600" ? "h-[600px]" : "h-[250px]";

  return (
    <div className={`w-full ${heightClass} bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl flex flex-col items-center justify-center relative group`}>
      <span className="text-gray-400 dark:text-gray-500 font-medium text-sm transition-transform group-hover:scale-105">
        Advertisement
      </span>
      <span className="text-gray-400 dark:text-gray-600 text-xs mt-1">
        ({size})
      </span>
      <div className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white dark:bg-gray-800 px-2 py-0.5 rounded shadow-sm">
        Ad
      </div>
    </div>
  );
}
