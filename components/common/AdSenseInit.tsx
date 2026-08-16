"use client";

import { useEffect } from "react";

export function AdSenseInit() {
  useEffect(() => {
    if (document.getElementById("adsense-init-script")) return;
    
    const script = document.createElement("script");
    script.id = "adsense-init-script";
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxx";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  return null;
}
