import Link from 'next/link';
import { Lock } from 'lucide-react';
import { securityCardsData as securityCards } from '@/lib/data';

export const metadata = {
  title: "Security | dowll",
  description: "Learn about how dowll keeps your documents secure and private."
};

export default function SecurityPage() {


  return (
    <main className="flex-grow flex flex-col items-center justify-start p-8 pt-20 bg-[#fafbfe] dark:bg-gray-900 transition-colors">
      {/* Top section */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-[#0a58d1] text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-8 shadow-sm">
          <Lock size={14} />
          <span>Enterprise-Grade Privacy</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Your Security is Our Priority
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Experience zero-knowledge document processing. We built dowll on the principle that your data belongs to you, processing it locally so it never leaves your device.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-20">
          <Link href="#" className="bg-[#0f3482] hover:bg-[#0c2a68] text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm shadow-sm">
            Start Processing Securely
          </Link>
          <Link href="/resources/guides" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#0f3482] dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-3 px-6 rounded-lg transition-colors text-sm shadow-sm">
            Learn more about our Privacy Policy
          </Link>
        </div>
      </div>

      {/* Cards section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-20 px-4">
        {
          securityCards.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-700 flex flex-col items-start transition-all hover:shadow-md">
              <div className={`w-12 h-12 rounded-xl ${item.iconColor} flex items-center justify-center text-white mb-6`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))
        }







      </div>
    </main>
  );
}
