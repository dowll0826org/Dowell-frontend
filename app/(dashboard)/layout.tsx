'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import Footer from '@/components/common/Footer';
import TopBannerAd from '@/components/ads/TopBannerAd';
import SidebarAd from '@/components/ads/SidebarAd';
import MobileAd from '@/components/ads/MobileAd';
import { ENABLE_ADS } from '@/lib/ads.config';
import { sidebarItems } from '@/lib/tools.data';
import SearchTools from '@/components/common/SearchTools';



// Sidebar navigation component
function Sidebar() {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  // Try to use pathname for active state if running on client, otherwise safely fallback
  let pathname = '';
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    pathname = usePathname() || '';
  } catch (e) {
    // During SSR in layouts this might not be available
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-[#fbfcfd] dark:bg-gray-900 overflow-y-visible hidden md:block sticky top-16 h-[calc(100vh-4rem)] z-[100]">
      <div className="p-6 h-full overflow-y-visible">
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">Services</h3>
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = pathname === item.path || (item.children?.some((child: any) => pathname === child.path));

            if (hasChildren) {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.path || '#'}
                    onClick={() => setHoveredItem(null)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left ${isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-[#005ee6] dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    <div className="flex items-center space-x-3 pointer-events-none">
                      <item.icon size={18} className={isActive ? "text-[#005ee6] dark:text-blue-400" : "text-gray-500 dark:text-gray-400"} />
                      <span>{item.name}</span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-400 -rotate-90 transition-colors ${hoveredItem === item.name ? 'text-[#005ee6]' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Hover Popup Menu (Flyout to the right) */}
                  <div className={`absolute left-full top-0 ml-2 ${hoveredItem === item.name ? 'block' : 'hidden'} bg-white dark:bg-gray-900 rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-800 p-6 z-[150] before:absolute before:-left-2 before:top-0 before:h-full before:w-2 before:bg-transparent ${item.children!.some((c: any) => c.category) ? 'w-[520px]' : 'w-64'}`}>

                    {item.children!.some((c: any) => c.category) ? (
                      <div className="flex gap-8">
                        {Array.from(new Set(item.children!.map((c: any) => c.category).filter(Boolean))).map((category: any, index, arr) => {
                          const categoryTitles: Record<string, string> = {
                            to_pdf: 'CONVERT TO PDF',
                            from_pdf: 'CONVERT FROM PDF',
                            pdf_image: 'PDF & IMAGES',
                            office_media: 'OFFICE & MEDIA',
                          };

                          return (
                            <React.Fragment key={category}>
                              <div className="flex-1">
                                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-wider">
                                  {categoryTitles[category] || category.replace('_', ' ')}
                                </h4>
                                <ul className="space-y-3">
                                  {item.children!.filter((c: any) => c.category === category).map((child: any) => {
                                    const iconName = child.icon.displayName || child.icon.name;
                                    const iconColor = iconName === 'Image' ? 'text-yellow-500' :
                                      iconName === 'FileText' ? 'text-blue-500' :
                                        iconName === 'Presentation' ? 'text-orange-500' :
                                          iconName === 'Table' ? 'text-green-500' :
                                            iconName === 'Globe' ? 'text-blue-400' :
                                              iconName === 'FileArchive' || iconName === 'Archive' ? 'text-indigo-500' :
                                                iconName === 'Video' ? 'text-rose-500' :
                                                  iconName === 'Music' ? 'text-purple-500' :
                                                    'text-gray-400 dark:text-gray-500';
                                    return (
                                      <li key={child.slug}>
                                        <Link
                                          href={child.path}
                                          onClick={() => setHoveredItem(null)}
                                          className={`flex items-center gap-3 text-sm font-semibold p-2 -ml-2 rounded-lg transition-colors ${pathname === child.path
                                            ? 'bg-blue-50/50 dark:bg-blue-900/10 text-[#005ee6] dark:text-blue-400'
                                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                        >
                                          <child.icon size={20} className={pathname === child.path ? "text-[#005ee6] dark:text-blue-400" : iconColor} />
                                          <span>{child.name}</span>
                                        </Link>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </div>

                              {/* Divider if not the last column */}
                              {index < arr.length - 1 && (
                                <div className="w-[1px] bg-gray-100 dark:bg-gray-800 my-2"></div>
                              )}
                            </React.Fragment>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-1">
                        <h4 className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{item.name} Services</h4>
                        {item.children!.map((child: any) => {
                          const isChildActive = pathname === child.path;
                          return (
                            <Link
                              key={child.slug}
                              href={child.path}
                              onClick={() => setHoveredItem(null)}
                              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isChildActive
                                ? 'bg-blue-50/50 dark:bg-blue-900/10 text-[#005ee6] dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                            >
                              <child.icon size={16} className={isChildActive ? "text-[#005ee6] dark:text-blue-400" : (child.color || "text-gray-400 dark:text-gray-500")} />
                              <span>{child.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.slug || item.name}
                href={item.path || `/${item.slug}`}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-[#005ee6] dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <item.icon size={18} className={isActive ? "text-[#005ee6] dark:text-blue-400" : "text-gray-500 dark:text-gray-400"} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function DashboardNavbar() {
  return (
    <header className="h-16 flex-shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center sticky top-0 z-20">
      <div className="flex-shrink-0 flex items-center px-4 md:px-6 md:w-64 md:border-r border-gray-200 dark:border-gray-800 h-full md:bg-[#fbfcfd] md:dark:bg-gray-900">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/dowll_logo.png"
            alt="dowll"
            width={200}
            height={50}
            className="w-24 md:w-32 h-auto object-contain"
            priority
          />
        </Link>
      </div>

      <div className="flex-1 px-4 md:px-6 flex items-center justify-center bg-white dark:bg-gray-950 h-full min-w-0">
        <div className="w-full max-w-2xl">
          <SearchTools />
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hide right sidebar ad for tools that need maximum horizontal space
  const hideSidebarAd = pathname === '/edit-pdf';

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 relative">
      <DashboardNavbar />
      <div className="flex flex-row flex-1 w-full">
        <Sidebar />

        <main className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-[#f8fafc] dark:bg-gray-950">
          <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-8 flex flex-col xl:flex-row gap-8">

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col">
              {ENABLE_ADS && <TopBannerAd />}

              {ENABLE_ADS && (
                <div className="md:hidden w-full flex justify-center pb-8 pt-4">
                  <MobileAd />
                </div>
              )}

              <div className="flex-1">
                {children}
              </div>
            </div>

            {/* Right Sidebar Ad Space */}
            {ENABLE_ADS && !hideSidebarAd && (
              <aside className="hidden xl:block w-[300px] flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  <SidebarAd size="300x600" />
                </div>
              </aside>
            )}

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
