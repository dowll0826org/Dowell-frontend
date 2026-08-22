import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#f5f6fb] dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
            <div className="container mx-auto px-8 lg:px-16 max-w-7xl">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row gap-12 mb-16">

                    {/* Brand & Description (Left) */}
                    <div className="lg:w-1/4">
                        <Link href="/" className="flex items-center mb-6">
                            <Image
                                src="/assets/dowll_logo.png"
                                alt="dowll"
                                width={400}
                                height={120}
                                className="w-48 h-auto object-contain"
                                priority
                            />
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pr-4">
                            Dowll is your all-in-one document toolkit. Convert, compress, edit, and manage your files securely with fast and simple online tools.
                        </p>
                    </div>

                    {/* 5 Link Columns (Right) */}
                    <div className="lg:w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">

                        {/* Column 1: Tools */}
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Tools</h3>
                            <ul className="space-y-3">
                                <li><Link href="/pdf-to-img" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">PDF to JPG</Link></li>
                                <li><Link href="/jpg-to-pdf" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">JPG to PDF</Link></li>
                                <li><Link href="/merge-pdf" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Merge PDF</Link></li>
                                <li><Link href="/compress-pdf" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Compress PDF</Link></li>
                                <li><Link href="/split-pdf" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Split PDF</Link></li>
                            </ul>
                        </div>

                        {/* Column 2: Resources */}
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Resources</h3>
                            <ul className="space-y-3">
                                <li><Link href="/resources/help-center" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</Link></li>
                                <li><Link href="/resources/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link></li>
                                <li><Link href="/resources/guides" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Guides</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Product */}
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Product</h3>
                            <ul className="space-y-3">
                                <li><Link href="/product/features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link></li>
                                <li><Link href="/product/security" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Security</Link></li>
                            </ul>
                        </div>

                        {/* Column 4: Legal */}
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Legal</h3>
                            <ul className="space-y-3">
                                <li><Link href="/legal/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/legal/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                                <li><Link href="/legal/cookie" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
                            </ul>
                        </div>

                        {/* Column 5: Company */}
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Company</h3>
                            <ul className="space-y-3">
                                <li><Link href="/company/aboutus" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                                <li><Link href="/company/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2026 dowll. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        Built with precision for professional document processing.
                    </p>
                </div>

            </div>
        </footer>
    );
}
