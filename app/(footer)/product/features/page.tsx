import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import { featuresCardsData } from '@/lib/data';



export const metadata = {
  title: "Features | dowll",
  description: "Explore all the features dowll has to offer for your document processing needs."
};

export default function FeaturesPage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-start p-8 pt-20 bg-[#fafbfe] dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
          Everything You Need for <br className="hidden md:block" /> Your Documents
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
          A comprehensive, privacy-first platform designed to handle every document task with precision and speed. From simple merges to advanced OCR.
        </p>
        <Link href="#" className="inline-flex items-center space-x-2 bg-[#0f3482] hover:bg-[#0c2a68] text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm shadow-sm">
          <span>Get Started Free</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Core Tools Section */}
      <div className="max-w-6xl mx-auto w-full mb-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Core Tools</h2>
          <p className="text-gray-600 dark:text-gray-400">Streamline your daily document tasks with our intuitive utilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresCardsData.map((card) => {
            if (card.isWide) {
              return (
                <div key={card.id} className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row overflow-hidden transition-all hover:shadow-md">
                  <div className="p-8 flex flex-col md:w-3/5">
                    <div className="w-10 h-10 rounded-lg bg-[#eef3fb] dark:bg-blue-900/30 flex items-center justify-center text-[#1c4794] dark:text-blue-400 mb-6">
                      <card.icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{card.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow mb-6 pr-4">
                      {card.description}
                    </p>
                    <Link href="#" className="inline-flex items-center space-x-1 text-sm font-semibold text-[#1c4794] dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mt-auto">
                      <span>Try it now</span>
                      <span className="text-xs">&gt;</span>
                    </Link>
                  </div>
                  <div className="bg-[#f5f7fb] dark:bg-gray-800/50 p-8 flex-grow flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 min-h-[200px] md:min-h-full">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-600">
                        <FileText size={24} />
                      </div>
                      <ArrowRight size={18} className="text-gray-400" />
                      <div className="w-14 h-14 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex items-center justify-center text-green-600 border border-gray-200 dark:border-gray-600">
                        <FileSpreadsheet size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={card.id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-700 flex flex-col transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-lg bg-[#eef3fb] dark:bg-blue-900/30 flex items-center justify-center text-[#1c4794] dark:text-blue-400 mb-6">
                  <card.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow mb-6">
                  {card.description}
                </p>
                <Link href="#" className="inline-flex items-center space-x-1 text-sm font-semibold text-[#1c4794] dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mt-auto">
                  <span>Try it now</span>
                  <span className="text-xs">&gt;</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
