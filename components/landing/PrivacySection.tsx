import Image from "next/image";
import Link from "next/link";

export default function PrivacySection() {
  return (
    <section className="bg-[#16171b] dark:bg-black py-12 lg:py-16 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Left Content */}
          <div className="max-w-xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 text-gray-200 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Privacy First Architecture
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-[2.75rem] font-extrabold text-white leading-tight mb-8">
              Your Files Never Leave Your Device.
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-400 leading-relaxed mb-10">
              Unlike traditional cloud processors, dowll utilizes WebAssembly to process your documents locally in your browser. No uploads, no servers, no traces.
            </p>

            {/* List */}
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3 text-gray-200 font-medium">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Zero-Knowledge Processing
              </li>
              <li className="flex items-center gap-3 text-gray-200 font-medium">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                No Registration Required
              </li>
              <li className="flex items-center gap-3 text-gray-200 font-medium">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Instant Execution
              </li>
            </ul>

            {/* Button */}
            <Link href="#" className="inline-flex items-center justify-center bg-white text-gray-900 px-7 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm">
              Read our Privacy Policy
            </Link>

          </div>

          {/* Right Image */}
          <div className="relative">
            <Image
              src="/assets/Hero2.png"
              alt="Privacy Architecture"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
