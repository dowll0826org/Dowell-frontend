import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { summaryGuides, detailedGuides } from "@/lib/data";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  FileText,
  ArrowRight,
  BookOpen
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const detailedGuide = detailedGuides[slug as keyof typeof detailedGuides];
  const summaryGuide = summaryGuides.find((g) => g.slug === slug);
  const guide = detailedGuide || summaryGuide;

  if (!guide) {
    return {
      title: "Guide Not Found | Docvia",
    };
  }

  return {
    title: `${guide.title} | Docvia`,
    description: guide.description,
  };
}

export default async function GuidePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  // Try to find the explicit detailed guide
  const detailedGuide = detailedGuides[slug as keyof typeof detailedGuides];

  // Fallback to the summary guide from the index page
  const summaryGuide = summaryGuides.find((g) => g.slug === slug);

  if (!detailedGuide && !summaryGuide) {
    notFound();
  }

  // Generate a fallback guide if a detailed one isn't available
  const guide = detailedGuide || {
    title: summaryGuide!.title,
    description: summaryGuide!.description,
    content: {
      introduction: summaryGuide!.description,
      steps: [
        "Upload your file.",
        "Adjust settings if needed.",
        "Process the file.",
        "Download the result."
      ],
      benefits: [
        "Fast and secure processing",
        "No installation required",
        "Works on any device"
      ],
      security: "Docvia processes files securely and protects your documents.",
      faq: []
    },
    relatedTools: []
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-[#131538] text-white pt-12 pb-48 px-6 relative">
        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col lg:flex-row gap-8 justify-between items-start">

          <div className="max-w-2xl">
            <div className="flex items-center text-gray-400 text-[13px] font-medium mb-8 space-x-2">
              <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
              <ChevronRight size={14} />
              <Link href="/resources/guides" className="hover:text-white transition-colors">Guides</Link>
              <ChevronRight size={14} />
              <span className="text-white font-semibold">{guide.title}</span>
            </div>

            <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-3 py-1 mb-6">
              <BookOpen size={14} className="text-gray-300" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-gray-300">Step-by-Step Guide</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold mb-6 leading-tight tracking-tight text-white">
              {guide.title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              {guide.description}
            </p>
          </div>

          {/* Right side CTA Card */}
          <div className="hidden lg:block shrink-0 mt-4">
            <div className="bg-[#1e204d] rounded-2xl p-8 w-[360px] shadow-2xl">
              <h3 className="font-bold text-white mb-3 text-xl">Ready to start?</h3>
              <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">Jump right into the tool and process your documents securely.</p>
              <Link
                href="/tools"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0052cc] hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-all"
              >
                Explore Tools
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="container mx-auto max-w-6xl px-6 -mt-36 relative z-20 pb-24">
        <div className="bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden min-h-[500px]">

          <div className="p-8 md:p-12 lg:p-16">
            <p className="text-[17px] text-gray-600 dark:text-gray-300 leading-relaxed mb-16 max-w-3xl">
              {guide.content.introduction}
            </p>

            <div className="grid lg:grid-cols-[1fr_400px] gap-x-20 gap-y-16">

              {/* Left Column: Steps & FAQ */}
              <div className="space-y-20">

                {/* Steps Section */}
                <section>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="bg-[#eef2ff] dark:bg-blue-900/30 p-2.5 rounded-xl text-[#3b82f6] dark:text-blue-400">
                      <FileText size={22} />
                    </div>
                    <h2 className="text-[22px] font-bold text-gray-900 dark:text-white">How it works</h2>
                  </div>

                  <div className="space-y-0 pl-2">
                    {guide.content.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-8 relative min-h-[110px]">
                        {/* Connecting Line */}
                        {idx !== guide.content.steps.length - 1 && (
                          <div className="absolute left-[15px] top-10 bottom-[-10px] w-[2px] bg-gray-100 dark:bg-gray-700"></div>
                        )}

                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#eef2ff] dark:bg-blue-900/30 text-blue-900 dark:text-blue-400 font-semibold text-sm shrink-0 relative z-10">
                          {idx + 1}
                        </div>

                        <div className="pt-1 pb-10">
                          <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2">Step {idx + 1}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* FAQ Section */}
                {guide.content.faq && guide.content.faq.length > 0 && (
                  <section>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-gray-100 dark:bg-gray-700 p-2.5 rounded-xl text-gray-600 dark:text-gray-300">
                        <HelpCircle size={22} />
                      </div>
                      <h2 className="text-[22px] font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-6">
                      {guide.content.faq.map((faqItem, idx) => (
                        <div key={idx} className="pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <h3 className="font-bold text-gray-900 dark:text-white text-[16px] mb-2">{faqItem.question}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">{faqItem.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right Column: Widgets */}
              <div className="space-y-6">

                {/* Benefits Widget */}
                <div className="bg-[#f4f5fa] dark:bg-gray-900 rounded-2xl p-7">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-[15px]">Why use Docvia?</h3>
                  <ul className="space-y-4">
                    {guide.content.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-[14px]">
                        <CheckCircle2 className="text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" size={18} strokeWidth={2} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security Widget */}
                <div className="bg-[#f2faef] dark:bg-[#1a2f1c] rounded-2xl p-7 border border-[#d3efca] dark:border-[#2f5333]">
                  <div className="flex items-center gap-2.5 mb-3 text-[#1f7a26] dark:text-[#4ade80]">
                    <ShieldCheck size={20} strokeWidth={2.5} />
                    <h3 className="font-bold text-[15px]">Secure Processing</h3>
                  </div>
                  <p className="text-[#648b59] dark:text-[#a3e635] text-[14px] leading-relaxed">
                    {guide.content.security}
                  </p>
                </div>

                {/* Related Tools Widget */}
                {guide.relatedTools && guide.relatedTools.length > 0 && (
                  <div className="p-7 border border-gray-100 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 shadow-sm mt-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-[15px]">Related Tools</h3>
                    <div className="flex flex-col gap-2">
                      {guide.relatedTools.map((tool, idx) => (
                        <Link
                          key={idx}
                          href={`/tools/${tool}`}
                          className="group flex items-center justify-between p-3 -mx-3 rounded-lg text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-[14px]"
                        >
                          <span className="capitalize">{tool.replace(/-/g, ' ')}</span>
                          <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
