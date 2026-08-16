import { termsOfServiceData } from '@/lib/data';

export const metadata = {
  title: "Terms of Service | Docvia",
  description: "Read the terms of service and user agreement for using Docvia."
};

export default function TermsOfServicePage() {
  return (
    <main className="flex-grow flex flex-col bg-[#fafbfe] dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 w-full">
        <div className="mb-10">
          <p className="text-[11px] font-bold text-[#1c4794] dark:text-blue-400 uppercase tracking-widest mb-3">
            Legal Information
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: October 24, 2024
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] dark:shadow-none border border-gray-100 dark:border-gray-700 p-8 md:p-12 space-y-12">
          
          {termsOfServiceData.map((section, index) => (
            <div key={section.id}>
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <section.icon size={22} className="text-[#1c4794] dark:text-blue-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{section.title}</h2>
                </div>
                <div className="text-gray-600 dark:text-gray-300 space-y-4 text-sm leading-relaxed pl-8">
                  {section.content?.map((p, idx) => (
                    <p key={`p-${idx}`}>{p}</p>
                  ))}
                  
                  {section.list && (
                    <ul className="list-disc pl-5 space-y-2">
                      {section.list.map((item, idx) => (
                        <li key={`l-${idx}`}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.obligations && (
                    <ul className="space-y-3">
                      {section.obligations.map((obs, idx) => (
                        <li key={`o-${idx}`} className="flex items-start space-x-3">
                          <obs.icon size={18} className={`${obs.iconColor} mt-0.5 flex-shrink-0`} />
                          <span>{obs.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.postListContent?.map((p, idx) => (
                    <p key={`post-${idx}`}>{p}</p>
                  ))}
                </div>
              </section>
              {index < termsOfServiceData.length - 1 && (
                <hr className="border-gray-100 dark:border-gray-700/50 mt-12" />
              )}
            </div>
          ))}

        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Questions about these terms? <a href="#" className="text-[#1c4794] dark:text-blue-400 font-semibold hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </main>
  );
}
