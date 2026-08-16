import React from 'react';
import { ENABLE_ADS } from '@/lib/ads.config';
import TopBannerAd from '@/components/ads/TopBannerAd';
import SidebarAd from '@/components/ads/SidebarAd';
import MobileAd from '@/components/ads/MobileAd';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col xl:flex-row xl:justify-between px-4 xl:px-0">

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col items-center">
        {ENABLE_ADS && (
          <div className="w-full hidden xl:flex justify-center pt-8 px-5">
            <TopBannerAd />
          </div>
        )}
        {/* Mobile Ad Space (Visible only on small screens) */}
        {ENABLE_ADS && (
          <div className="xl:hidden w-full flex justify-center pb-8 pt-4">
            <MobileAd />
          </div>
        )}

        <div className="w-full max-w-full md:px-2">
          {children}
        </div>
      </div>

    </div>
  );
}
