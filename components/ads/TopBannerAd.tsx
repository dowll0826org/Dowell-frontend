"use client";
import React, { useEffect } from 'react';
import { ENABLE_ADS } from "@/lib/ads.config";

export default function TopBannerAd() {
  useEffect(() => {
    if (ENABLE_ADS) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error", err);
      }
    }
  }, []);

  if (!ENABLE_ADS) {
    return null;
  }

  return (
    <div className="w-full mb-8 flex justify-center hidden md:flex overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6354997878508931"
        data-ad-slot="7731492181"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
