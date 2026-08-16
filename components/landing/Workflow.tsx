export default function Workflow() {
  return (
    <section className="py-20 lg:py-28 bg-[#f4f6fb] dark:bg-gray-900/50 relative overflow-hidden transition-colors duration-200">
      <div className="container mx-auto px-8 lg:px-16 max-w-7xl relative">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Seamless & Secure Workflow
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Engineered for privacy. Your files are processed instantly and deleted automatically.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          
          {/* Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-[3rem] left-[12%] right-[12%] h-[1px] bg-gray-200 dark:bg-gray-700 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            
            {/* Step 1: Upload */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6 z-10 transition-transform hover:scale-105">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Upload</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-2 leading-relaxed">
                Select files securely via an encrypted connection.
              </p>
            </div>

            {/* Step 2: Process */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-slate-50 dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6 z-10 transition-transform hover:scale-105">
                <svg className="w-8 h-8 text-[#005ee6] dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Process</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-2 leading-relaxed">
                Lightning-fast processing powered by local resources.
              </p>
            </div>

            {/* Step 3: Download */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6 z-10 transition-transform hover:scale-105">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Download</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-2 leading-relaxed">
                Retrieve your processed documents instantly.
              </p>
            </div>

            {/* Step 4: Auto-Delete */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-200/60 dark:bg-gray-800/80 rounded-3xl shadow-sm border border-gray-200/50 dark:border-gray-700 flex items-center justify-center mb-6 z-10 transition-transform hover:scale-105">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Auto-Delete</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-2 leading-relaxed">
                Files are wiped from memory immediately after processing.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
