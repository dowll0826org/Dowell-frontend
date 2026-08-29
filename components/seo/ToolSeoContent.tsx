import React from 'react';
import { seoData } from '@/lib/seo.data';
import { CheckCircle2, ChevronDown } from 'lucide-react';

export default function ToolSeoContent({ toolSlug }: { toolSlug: string }) {
  const content = seoData[toolSlug];

  if (!content) {
    return null;
  }

  // Schema markup for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 mb-16 space-y-24 px-4 text-gray-800 dark:text-gray-200">

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Content Area */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {content.heroTitle}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {content.heroSubtitle}
        </p>
      </section>

      {/* How it works */}
      <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          How to use our {content.heroTitle.split(' ')[0]} tool?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.howItWorks.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl">
                {index + 1}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features List */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Why use Dowll?
        </h2>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
          {content.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Explanation Content */}
      <section className="prose prose-blue dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{content.explanationTitle}</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          {content.explanationText.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {content.faqs.map((faq, index) => (
            <details key={index} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden cursor-pointer open:ring-2 open:ring-blue-500/20">
              <summary className="flex items-center justify-between p-6 font-semibold text-gray-900 dark:text-white list-none">
                {faq.question}
                <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}
