"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, MessageSquare } from "lucide-react";
import { faqData as faq } from "@/lib/data";

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#f0f4fd] to-white dark:from-gray-900 dark:to-gray-900 pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 border border-blue-100 dark:border-blue-900/50 bg-white dark:bg-blue-900/20 rounded-full px-3 py-1 mb-8 text-blue-600 dark:text-blue-400 text-[12px] font-semibold tracking-wide shadow-sm">
            <HelpCircle size={14} />
            Support Center
          </div>

          <h1 className="text-4xl md:text-[54px] font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
            Frequently Asked Questions
          </h1>
          <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-8 max-w-[500px] mx-auto leading-relaxed">
            Everything you need to know about the product and billing. Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
          </p>
        </div>
      </div>

      {/* Accordion Content */}
      <div className="max-w-[700px] mx-auto px-6 pb-32 relative z-10">
        <div className="space-y-3.5 mb-14">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md border-blue-200 dark:border-blue-500' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="font-semibold text-slate-900 dark:text-white text-[15px]">{item.question}</span>
                  <ChevronDown size={18} className={`text-gray-400 dark:text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`px-5 text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="bg-[#fafbfc] dark:bg-gray-800 rounded-[20px] p-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-[18px] mb-2">Still have questions?</h3>
            <p className="text-[14px] text-slate-500 dark:text-slate-400 max-w-[280px] leading-relaxed">
              Our support team is ready to help you with any specific queries.
            </p>
          </div>
          <Link
            href="/company/contact"
            className="shrink-0 inline-flex items-center gap-2.5 bg-[#2563eb] hover:bg-blue-600 text-white font-medium px-5 py-3 rounded-xl transition-all text-sm shadow-md hover:shadow-lg"
          >
            <MessageSquare size={16} />
            Contact Support
          </Link>
        </div>

      </div>
    </main>
  );
}
