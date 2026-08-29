"use client";
import React, { useEffect } from 'react';
import { ENABLE_ADS } from "@/lib/ads.config";

export default function MobileAd() {
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
    <div className="w-full flex justify-center overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6354997878508931"
        data-ad-slot="YOUR_MOBILE_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
