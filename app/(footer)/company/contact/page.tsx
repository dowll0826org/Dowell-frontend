import React from 'react';
import { Mail, Megaphone, HelpCircle, Send, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Contact Us | dowll",
  description: "Get in touch with the dowll team."
};

export default function ContactUsPage() {
  return (
    <main className="flex-grow flex flex-col bg-[#fafbfe] dark:bg-gray-900 transition-colors min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 w-full">

        {/* Header */}
        <section className="text-center space-y-6 max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Have questions about our privacy-first document processing? Our team is here to help you integrate, troubleshoot, and optimize your workflow.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Subject
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none transition-colors"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a topic...</option>
                    <option value="support">General Support</option>
                    <option value="sales">Sales & Enterprise</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors resize-none"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 bg-[#0f54c9] text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Info Cards */}
          <div className="space-y-6">

            {/* Direct Contacts */}
            <div className="bg-[#f8fafc] dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Direct Contacts</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#eef3fb] dark:bg-blue-900/30 p-2.5 rounded-lg text-[#1c4794] dark:text-blue-400 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Support</h4>
                    <a href="mailto:support@dowll.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      support@dowll.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#eef3fb] dark:bg-blue-900/30 p-2.5 rounded-lg text-[#1c4794] dark:text-blue-400 shrink-0">
                    <Megaphone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Press & Media</h4>
                    <a href="mailto:press@dowll.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      press@dowll.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Center CTA */}
            <div className="bg-[#eef3fb] dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30">
              <div className="bg-[#0f54c9] text-white w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <HelpCircle size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Looking for quick answers?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Check out our comprehensive Help Center for API documentation, setup guides, and troubleshooting.
              </p>
              <Link href="/help" className="inline-flex items-center space-x-2 text-[#0f54c9] dark:text-blue-400 font-semibold text-sm hover:underline">
                <span>Visit Help Center</span>
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
