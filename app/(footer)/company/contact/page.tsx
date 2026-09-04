'use client';

import React, { useState } from 'react';
import { Mail, Megaphone, HelpCircle, Send, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { submitContactFormApi } from '@/app/(footer)/company/contact/api.contact';
import { useTranslation } from '@/hooks/useTranslation';

export default function ContactUsPage() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    otherSubject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t('contact.toast.fillRequired'));
      return;
    }

    let finalSubject = formData.subject;
    if (formData.subject === 'other') {
      if (!formData.otherSubject.trim()) {
        toast.error(t('contact.toast.specifySubject'));
        return;
      }
      finalSubject = formData.otherSubject;
    }

    setIsSubmitting(true);
    try {
      await submitContactFormApi({
        name: formData.name,
        email: formData.email,
        subject: finalSubject,
        message: formData.message
      });
      toast.success(t('contact.toast.success'));
      setFormData({
        name: '',
        email: '',
        subject: '',
        otherSubject: '',
        message: ''
      });
    } catch (error: any) {
      toast.error(error.message || t('contact.toast.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-grow flex flex-col bg-[#fafbfe] dark:bg-gray-900 transition-colors min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 w-full">

        {/* Header */}
        <section className="text-center space-y-6 max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {t('contact.form.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {t('contact.form.workEmail')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                  {t('contact.form.subject')}
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none transition-colors"
                  >
                    <option value="" disabled>{t('contact.form.selectTopic')}</option>
                    <option value="support">{t('contact.form.generalSupport')}</option>
                    <option value="sales">{t('contact.form.salesEnterprise')}</option>
                    <option value="press">{t('contact.form.pressMedia')}</option>
                    <option value="other">{t('contact.form.other')}</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {formData.subject === 'other' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label htmlFor="otherSubject" className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {t('contact.form.pleaseSpecify')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="otherSubject"
                    value={formData.otherSubject}
                    onChange={handleChange}
                    required
                    placeholder="Briefly describe your topic"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                  {t('contact.form.message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors resize-none"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-2 bg-[#0f54c9] text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span>{t('common.sending')}</span>
                      <Loader2 size={18} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>{t('common.sendMessage')}</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Info Cards */}
          <div className="space-y-6">

            {/* Direct Contacts */}
            <div className="bg-[#f8fafc] dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('contact.sidebar.directContacts')}</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#eef3fb] dark:bg-blue-900/30 p-2.5 rounded-lg text-[#1c4794] dark:text-blue-400 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{t('contact.sidebar.support')}</h4>
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('contact.sidebar.quickAnswers')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {t('contact.sidebar.quickAnswersDesc')}
              </p>
              <Link href="/resources/help-center" className="inline-flex items-center space-x-2 text-[#0f54c9] dark:text-blue-400 font-semibold text-sm hover:underline">
                <span>{t('contact.sidebar.visitHelpCenter')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
