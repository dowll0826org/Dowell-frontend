"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { sidebarItems } from "@/lib/tools.data";

export default function SearchTools() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const allTools = sidebarItems.flatMap(item => item.children ? item.children : [item]);
    const filteredTools = query ? allTools.filter(tool => {
        const lowerQuery = query.toLowerCase();
        return tool.name.toLowerCase().includes(lowerQuery) ||
            tool.category?.toLowerCase().includes(lowerQuery) ||
            tool.metadata?.keywords?.some(k => k.toLowerCase().includes(lowerQuery));
    }) : [];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div className="relative min-w-0 w-full">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full min-w-0 pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border border-blue-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005ee6] focus:border-transparent dark:bg-gray-800 dark:text-white shadow-sm transition-all text-xs md:text-sm"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                />
            </div>
            {isOpen && query.length > 0 && (
                <div className="fixed top-20 left-4 right-4 md:absolute md:top-full md:left-0 md:right-auto md:w-full mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl max-h-[60vh] md:max-h-96 overflow-y-auto z-[100]">
                    {filteredTools.length > 0 ? (
                        <ul className="p-2 space-y-1">
                            {filteredTools.map((tool, index) => {
                                const Icon = tool.icon;
                                const iconColorClass = tool.color || "text-gray-500";
                                return (
                                    <li key={index}>
                                        <Link
                                            href={tool.path || "#"}
                                            className="flex items-center gap-3 p-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                            onClick={() => {
                                                setIsOpen(false);
                                                setQuery("");
                                            }}
                                        >
                                            {Icon && <Icon className={`w-5 h-5 ${iconColorClass}`} />}
                                            {tool.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <div className="p-4 text-sm text-gray-500 text-center">No tools found matching "{query}"</div>
                    )}
                </div>
            )}
        </div>
    );
}
