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
        <Link href="/" className="inline-flex items-center space-x-2 bg-[#0f3482] hover:bg-[#0c2a68] text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm shadow-sm">
          <span>Get Started Free</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Core Tools Section */}
      <div className="max-w-6xl mx-auto w-full mb-20 px-4">
        <div className="text-center mb-16">
          <p className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-[11px] mb-3">POWERFUL CAPABILITIES</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Core Document Tools</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-[15px]">
            Streamline your daily document tasks with our intuitive, browser-based utilities. High performance, zero uploads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresCardsData.map((card) => {
            if (card.isWide) {
              return (
                <div key={card.id} className="md:col-span-2 bg-white dark:bg-gray-800 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 group">
                  <div className="p-8 md:p-10 flex flex-col md:w-3/5">
                    <div className="w-12 h-12 rounded-xl bg-[#eef3fb] dark:bg-blue-900/30 flex items-center justify-center text-[#1c4794] dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <card.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{card.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed flex-grow mb-8 pr-4">
                      {card.description}
                    </p>
                    <Link href={card.href || "#"} className="inline-flex items-center space-x-1.5 text-[15px] font-bold text-[#1c4794] dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mt-auto w-fit">
                      <span>Try it now</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className="bg-gradient-to-br from-[#f5f7fb] to-[#e8eef8] dark:from-gray-800/80 dark:to-gray-800/40 p-8 flex-grow flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 min-h-[240px] md:min-h-full">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl shadow-md flex items-center justify-center text-gray-400 border border-gray-100 dark:border-gray-600 group-hover:-translate-y-2 transition-transform duration-500">
                        <FileText size={30} />
                      </div>
                      <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl shadow-md flex items-center justify-center text-[#10b981] border border-gray-100 dark:border-gray-600 group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                        <FileSpreadsheet size={30} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={card.id} className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 group">
                <div className="w-12 h-12 rounded-xl bg-[#eef3fb] dark:bg-blue-900/30 flex items-center justify-center text-[#1c4794] dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <card.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed flex-grow mb-8">
                  {card.description}
                </p>
                <Link href={card.href || "#"} className="inline-flex items-center space-x-1.5 text-[15px] font-bold text-[#1c4794] dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mt-auto w-fit">
                  <span>Try it now</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
