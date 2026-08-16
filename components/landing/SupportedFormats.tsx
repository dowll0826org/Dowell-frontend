export default function SupportedFormats() {
  const formats = [
    {
      name: "PDF",
      icon: (
        <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M9 17h6" />
        </svg>
      )
    },
    {
      name: "DOCX",
      icon: (
        <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6m-6 4h6m-6 4h4" />
        </svg>
      )
    },
    {
      name: "XLSX",
      icon: (
        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6m-6 4h6M12 10v8" />
        </svg>
      )
    },
    {
      name: "PPTX",
      icon: (
        <svg className="w-8 h-8 text-orange-500 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      )
    },
    {
      name: "JPG",
      icon: (
        <svg className="w-8 h-8 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: "TXT",
      icon: (
        <svg className="w-8 h-8 text-gray-800 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6m-6 4h6m-6 4h6" />
        </svg>
      )
    },
    {
      name: "ZIP",
      icon: (
        <svg className="w-8 h-8 text-yellow-500 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4" />
        </svg>
      )
    },
    {
      name: "SVG",
      icon: (
        <svg className="w-8 h-8 text-blue-400 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-200">
      <div className="container mx-auto px-8 lg:px-16 max-w-7xl mb-12">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          Supported File Formats
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert and manage files across multiple formats including documents, images, spreadsheets, and presentations.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative flex overflow-hidden group">

        {/* We use two sets of elements for a seamless loop */}
        <div className="animate-marquee flex items-center gap-16 md:gap-24 whitespace-nowrap py-4 pr-16 md:pr-24 min-w-full justify-around">
          {formats.map((format, idx) => (
            <div key={idx} className="flex items-center gap-3 font-bold text-gray-800 dark:text-gray-200 text-xl cursor-default transition-transform hover:scale-110">
              {format.icon}
              {format.name}
            </div>
          ))}
        </div>

        <div className="animate-marquee flex items-center gap-16 md:gap-24 whitespace-nowrap py-4 pr-16 md:pr-24 min-w-full justify-around" aria-hidden="true">
          {formats.map((format, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-3 font-bold text-gray-800 dark:text-gray-200 text-xl cursor-default transition-transform hover:scale-110">
              {format.icon}
              {format.name}
            </div>
          ))}
        </div>

      </div>

      <p className="text-center text-sm font-semibold text-blue-600 dark:text-blue-400 mt-12 bg-blue-50 dark:bg-blue-900/30 max-w-max mx-auto px-4 py-2 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
        + 50 more formats supported
      </p>
    </section>
  );
}
