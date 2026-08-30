import Link from "next/link";
import {
  Image as ImageIcon,
  Layers,
  Minimize2,
  FileText,
  Headphones,
  MessageSquare
} from "lucide-react";
import type { Metadata } from "next";
import SearchTools from "@/components/common/SearchTools";

export const metadata: Metadata = {
  title: "Help Center | dowll",
  description: "Get support and learn how to make the most of dowll's document tools.",
};

export default function Resources() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header & Search */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            How can we help?
          </h1>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Find answers, tutorials, and technical documentation to get the most out of dowll.
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
          <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-6">Popular Topics</h2>

          <div className="grid md:grid-cols-2 gap-4">

            {/* Card 1 */}
            <Link href="/pdf-to-jpg" className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-800 group">
              <div className="bg-[#eef2ff] dark:bg-gray-700 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <ImageIcon size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">How to convert PDF to JPG</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed pr-2">
                  Learn the steps to extract high-quality images from your PDF documents seamlessly.
                </p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/merge-pdf" className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-800 group">
              <div className="bg-[#eef2ff] dark:bg-gray-700 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <Layers size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">How to merge PDF files</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed pr-2">
                  Combine multiple PDFs into a single, organized document in seconds.
                </p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/compress-pdf" className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-800 group">
              <div className="bg-[#eef2ff] dark:bg-gray-700 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <Minimize2 size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">How to compress documents</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed pr-2">
                  Reduce file size for easier sharing without compromising visual quality.
                </p>
              </div>
            </Link>

            {/* Card 4 */}
            <Link href="/resources/guides" className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-800 group">
              <div className="bg-[#eef2ff] dark:bg-gray-700 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <FileText size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">Supported file formats</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed pr-2">
                  View the comprehensive list of document types you can process with dowll.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Still Need Help Section */}
        <div className="bg-[#e5e9fa] dark:bg-gray-800/50 rounded-3xl py-14 px-6 text-center border border-transparent dark:border-gray-800">
          <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-3">Still need help?</h2>
          <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-8 max-w-[320px] mx-auto leading-relaxed">
            Our support team is ready to assist you with any technical issues or account inquiries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/company/contact"
              className="inline-flex items-center gap-2.5 bg-[#0e3082] hover:bg-[#0a2366] text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm shadow-md"
            >
              <Headphones size={16} />
              Contact Support
            </Link>

          </div>
        </div>

      </div>
    </main>
  );
}
