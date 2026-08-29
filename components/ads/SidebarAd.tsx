"use client";
import React, { useEffect } from 'react';
import { ENABLE_ADS } from "@/lib/ads.config";

type SidebarAdProps = {
  size?: "300x250" | "300x600";
};

export default function SidebarAd({ size = "300x250" }: SidebarAdProps) {
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

  const heightClass = size === "300x600" ? "h-[600px]" : "h-[250px]";

  if (!ENABLE_ADS) {
    return null;
  }

  return (
    <div className={`w-full ${heightClass} flex justify-center overflow-hidden`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6354997878508931"
        data-ad-slot="1544418438"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
