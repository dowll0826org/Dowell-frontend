import React from 'react';
import Image from 'next/image';
import { Lock, Shield, Zap, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "About Us | Docvia",
  description: "Learn more about Docvia, our mission, and our values."
};

export default function AboutUsPage() {
  return (
    <main className="flex-grow flex flex-col bg-[#fafbfe] dark:bg-gray-900 transition-colors min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 w-full space-y-24">
        {/* Header Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Redefining Document <br className="hidden md:block" /> Intelligence
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            We believe your documents belong to you. Docvia combines powerful processing tools with absolute privacy, ensuring your data never leaves your device unless you choose it to.
          </p>
        </section>

        {/* Mission and Story Section */}
        <section className="space-y-6">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 md:p-14 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center h-full">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1c4794] dark:text-blue-400 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To provide frictionless, zero-server document processing that respects user privacy and delivers unmatched speed. We are building a future where professional utility doesn&apos;t require compromising your confidential data to the cloud.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm h-full flex">
              <Image
                src="/assets/aboutimage2.png"
                alt="docvia avout"
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
                alt="docvia avout"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 md:p-14 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center h-full order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                The Docvia Story
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Born from the frustration of relying on cloud-vulnerable tools for sensitive paperwork, Docvia was created to shift the paradigm to local-first technology. We saw professionals risking confidentiality for convenience and decided to build a platform that offers both.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white tracking-tight">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Privacy First", icon: Lock, desc: "Zero-knowledge architecture. Your files remain on your device." },
              { title: "Security", icon: Shield, desc: "Enterprise-grade protection for every interaction, built natively." },
              { title: "Performance", icon: Zap, desc: "Instantaneous processing without waiting on server uploads." },
              { title: "Transparency", icon: Eye, desc: "Clear processes, no hidden data collection, complete user control." }
            ].map((value, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-start h-full">
                <div className="bg-[#eef3fb] dark:bg-blue-900/30 p-2.5 rounded-xl text-[#1c4794] dark:text-blue-400 mb-6">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#0f54c9] rounded-3xl p-10 md:p-16 text-center text-white">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to build the future of documents?
            </h2>
            <p className="text-blue-100 text-lg">
              We&apos;re always looking for talented individuals who are passionate about privacy and performance. Join the team that is redefining document intelligence.
            </p>
            <div>
              <Link href="/careers" className="inline-flex items-center space-x-2 bg-white text-[#0f54c9] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                <span>View Open Positions</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}