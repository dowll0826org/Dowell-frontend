import Image from "next/image";
import Link from "next/link";
import { ChevronDown, FileImage, FileText, Presentation, Table, Globe, FileArchive } from "lucide-react";
import { sidebarItems } from "@/lib/tools.data";

const allTools = sidebarItems.flatMap(item => item.children ? item.children : [item]);
const convertToPdfTools = sidebarItems.find(item => item.name === "Convert Documents")?.children?.filter(child => child.category === "to_pdf") || [];
const convertFromPdfTools = sidebarItems.find(item => item.name === "Convert Documents")?.children?.filter(child => child.category === "from_pdf") || [];
const compressPdfImageTools = sidebarItems.find(item => item.name === "Compress Documents")?.children?.filter(child => child.category === "pdf_image") || [];
const compressOfficeMediaTools = sidebarItems.find(item => item.name === "Compress Documents")?.children?.filter(child => child.category === "office_media") || [];

export default function Header() {
    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-200 relative z-50">
            <div className="container mx-auto px-8 lg:px-16 max-w-7xl h-20 flex items-center justify-between gap-4">
                {/* Logo (Top Left) */}
                <Link href="/" className="flex items-center shrink-0">
                    <Image
                        src="/assets/dowll_logo.png"
                        alt="dowll"
                        width={200}
                        height={60}
                        className="w-32 md:w-40 h-auto object-contain"
                        priority
                    />
                </Link>



                {/* Navigation (Center/Right) */}
                <div className="hidden md:flex items-center gap-8 shrink-0">
                    {/* Compress Document Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-[#005ee6] dark:hover:text-[#005ee6] transition-colors uppercase tracking-wide py-8">
                            COMPRESS
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        </button>

                        {/* Dropdown Menu (Bubble Screen) */}
                        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 hidden group-hover:flex w-max min-w-[520px] bg-white dark:bg-gray-900 rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-800 p-6 flex-row gap-8 transition-all before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white dark:before:border-b-gray-800">

                            {/* PDF & Images Column */}
                            <div className="flex-1">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-wider">PDF & IMAGES</h3>
                                <ul className="space-y-3">
                                    {compressPdfImageTools.map((tool, index) => {
                                        const Icon = tool.icon;
                                        const iconColorClass = tool.color || "text-gray-500";
                                        return (
                                            <li key={tool.path || index}>
                                                <Link href={tool.path || "#"} className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 -ml-2 rounded-lg transition-colors">
                                                    {Icon && <Icon className={`w-5 h-5 ${iconColorClass}`} />}
                                                    {tool.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Divider */}
                            <div className="w-[1px] bg-gray-100 dark:bg-gray-800 my-2"></div>

                            {/* Office & Media Column */}
                            <div className="flex-1">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-wider">OFFICE & MEDIA</h3>
                                <ul className="space-y-3">
                                    {compressOfficeMediaTools.map((tool, index) => {
                                        const Icon = tool.icon;
                                        const iconColorClass = tool.color || "text-gray-500";
                                        return (
                                            <li key={tool.path || index}>
                                                <Link href={tool.path || "#"} className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 -ml-2 rounded-lg transition-colors">
                                                    {Icon && <Icon className={`w-5 h-5 ${iconColorClass}`} />}
                                                    {tool.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Convert Document Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-bold text-[#005ee6] dark:text-[#005ee6] transition-colors uppercase tracking-wide py-8">
                            CONVERT PDF
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        </button>

                        {/* Dropdown Menu (Bubble Screen) */}
                        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 hidden group-hover:flex w-max min-w-[520px] bg-white dark:bg-gray-900 rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-800 p-6 flex-row gap-8 transition-all before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white dark:before:border-b-gray-800">

                            {/* Convert to PDF Column */}
                            <div className="flex-1">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-wider">CONVERT TO PDF</h3>
                                <ul className="space-y-3">
                                    {convertToPdfTools.map((tool, index) => {
                                        const Icon = tool.icon;
                                        const iconColorClass = tool.color || "text-gray-500";
                                        return (
                                            <li key={tool.path || index}>
                                                <Link href={tool.path || "#"} className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 -ml-2 rounded-lg transition-colors">
                                                    {Icon && <Icon className={`w-5 h-5 ${iconColorClass}`} />}
                                                    {tool.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Divider */}
                            <div className="w-[1px] bg-gray-100 dark:bg-gray-800 my-2"></div>

                            {/* Convert from PDF Column */}
                            <div className="flex-1">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-wider">CONVERT FROM PDF</h3>
                                <ul className="space-y-3">
                                    {convertFromPdfTools.map((tool, index) => {
                                        const Icon = tool.icon;
                                        const iconColorClass = tool.color || "text-gray-500";
                                        return (
                                            <li key={tool.path || index}>
                                                <Link href={tool.path || "#"} className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 -ml-2 rounded-lg transition-colors">
                                                    {Icon && <Icon className={`w-5 h-5 ${iconColorClass}`} />}
                                                    {tool.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-[#005ee6] dark:hover:text-[#005ee6] transition-colors uppercase tracking-wide py-8">
                            ALL PDF TOOLS
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        </button>

                        <div className="absolute top-[80px] right-0 hidden group-hover:flex w-max min-w-[700px] max-w-[900px] bg-white dark:bg-gray-900 rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-800 p-6 transition-all before:absolute before:-top-2 before:right-10 before:border-8 before:border-transparent before:border-b-white dark:before:border-b-gray-800">
                            <div className="grid grid-cols-3 gap-y-3 gap-x-6 w-full">
                                {allTools.map((tool, index) => {
                                    const Icon = tool.icon;
                                    const iconColorClass = tool.color || "text-gray-500";
                                    return (
                                        <Link key={tool.path || index} href={tool.path || "#"} className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 -ml-2 rounded-lg transition-colors group/item">
                                            {Icon && <Icon className={`w-5 h-5 ${iconColorClass} group-hover/item:text-[#005ee6] transition-colors`} />}
                                            <span className="truncate">{tool.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <Link href="/login" className="text-sm font-semibold bg-[#005ee6] text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm ml-4">Login</Link>
                </div>
            </div>
        </header>
    );
}
