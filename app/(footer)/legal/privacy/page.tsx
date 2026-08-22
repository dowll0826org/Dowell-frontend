import { privacyPolicyData } from '@/lib/data';

export const metadata = {
  title: "Privacy Policy | dowll",
  description: "Read our privacy policy to understand how we handle your data."
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-grow flex flex-col bg-[#fafbfe] dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 w-full">
        <div className="mb-10 text-center">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto text-lg">
            At dowll, your privacy is not just a feature—it is the foundational architecture of our platform. This Privacy Policy outlines our commitment to minimizing data collection and maximizing your control over your documents through our localized processing approach.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] dark:shadow-none border border-gray-100 dark:border-gray-700 p-8 md:p-12 space-y-12">

          {privacyPolicyData.map((section, index) => (
            <div key={section.id}>
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-[#eef3fb] dark:bg-blue-900/30 p-1.5 rounded-lg text-[#1c4794] dark:text-blue-400">
                    <section.icon size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{section.title}</h2>
                </div>

                <div className="text-gray-600 dark:text-gray-300 space-y-4 text-sm leading-relaxed pl-12">
                  {section.specialBanner && (
                    <div className="bg-[#f8fafc] dark:bg-gray-800/50 border border-blue-100 dark:border-blue-900/30 rounded-xl p-6 mb-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#1c4794] dark:bg-blue-500"></div>
                      <div className="text-[11px] font-bold text-[#1c4794] dark:text-blue-400 uppercase tracking-widest mb-2">
                        {section.specialBanner.title}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">
                        {section.specialBanner.content}
                      </p>
                    </div>
                  )}

                  {section.content?.map((p, idx) => (
                    <p key={`p-${idx}`}>{p}</p>
                  ))}

                  {section.list && (
                    <ul className="list-disc pl-5 space-y-2">
                      {section.list.map((item, idx) => (
                        <li key={`l-${idx}`}>
                          {'label' in item && item.label && <strong>{item.label}: </strong>}
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.postListContent?.map((p, idx) => (
                    <p key={`post-${idx}`}>{p}</p>
                  ))}

                  {section.contactBox && (
                    <div className="bg-[#f8fafc] dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-6 mt-6">
                      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p><strong className="text-gray-900 dark:text-white">Email:</strong> {section.contactBox.email}</p>
                        <p><strong className="text-gray-900 dark:text-white">Address:</strong> {section.contactBox.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
              {index < privacyPolicyData.length - 1 && (
                <hr className="border-gray-100 dark:border-gray-700/50 mt-12" />
              )}
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}
