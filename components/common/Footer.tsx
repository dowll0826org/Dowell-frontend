import Image from "next/image";
import Link from "next/link";
import { sidebarItems } from "@/lib/tools.data";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
    const flatTools = sidebarItems.filter(item => !item.children);
    const groupedTools = sidebarItems.filter(item => item.children);

    return (
        <footer className="bg-[#f5f6fb] dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 max-w-7xl">

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
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pr-4 mb-6">
                            Dowll is your all-in-one document toolkit. Convert, compress, edit, and manage your files securely with fast and simple online tools.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://www.linkedin.com/company/dowll" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/get_dowll?igsi=cDN1Y3UwdXFjemVl" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors" aria-label="Instagram">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.facebook.com/share/1D6aiiK5gy" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Facebook">
                                <FaFacebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links (Right) */}
                    <div className="lg:w-3/4 flex flex-col gap-12">

                        {/* All Tools Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                            
                            {/* PDF Tools */}
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">PDF Tools</h3>
                                <ul className="space-y-3">
                                    {flatTools.map(tool => (
                                        <li key={tool.name}>
                                            <Link href={tool.path || `/${tool.slug}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                {tool.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Grouped Tools */}
                            {groupedTools.map(group => (
                                <div key={group.name}>
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">{group.name}</h3>
                                    <ul className="space-y-3">
                                        {group.children?.map(tool => (
                                            <li key={tool.name}>
                                                <Link href={tool.path || `/${tool.slug}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                    {tool.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                        </div>

                        {/* Company & Legal Links Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 border-t border-gray-200 dark:border-gray-800">
                            {/* Column 1: Resources */}
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Resources</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/resources/help-center" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</Link></li>
                                    <li><Link href="/resources/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link></li>
                                    <li><Link href="/resources/guides" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Guides</Link></li>
                                </ul>
                            </div>

                            {/* Column 2: Product */}
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Product</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/product/features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link></li>
                                    <li><Link href="/product/security" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Security</Link></li>
                                </ul>
                            </div>

                            {/* Column 3: Legal */}
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Legal</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/legal/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                                    <li><Link href="/legal/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                                </ul>
                            </div>

                            {/* Column 4: Company */}
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Company</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/company/aboutus" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                                    <li><Link href="/company/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
                                </ul>
                            </div>
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
