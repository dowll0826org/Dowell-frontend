import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-white dark:bg-gray-900 py-16 lg:py-24 overflow-hidden transition-colors duration-200">
            <div className="container mx-auto px-8 lg:px-16 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Content */}
                    <div className="max-w-xl">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#f4f5f8] dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-transparent dark:border-gray-700">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Privacy-First Processing
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl lg:text-[4.5rem] font-extrabold text-gray-900 dark:text-white leading-[1.05] mb-8 tracking-tight">
                            One Platform.<br />
                            <span className="text-[#005ee6] dark:text-blue-500">Every Document Tool.</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 pr-4">
                            Privacy-first, account-free document processing. Edit, convert, and compress files instantly in your browser without ever sending data to our servers.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 bg-[#005ee6] text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Start Processing</Link>
                            {/* <Link href="#" className="inline-flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 px-7 py-3.5 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                                Explore Tools
                            </Link> */}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <Image
                            src="/assets/Hero.png"
                            alt="dowll Hero Platform"
                            width={800}
                            height={600}
                            className="w-full h-auto object-contain dark:opacity-90"
                            priority
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}