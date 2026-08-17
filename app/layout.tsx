import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../context/ThemeProvider";
import { ThemeToggle } from "../components/ThemeToggle";
import { ENABLE_ADS } from "@/lib/ads.config";
import { AdSenseInit } from "@/components/common/AdSenseInit";
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://docvia.com"),
  title: {
    default: "Docvia - Secure Document Tools",
    template: "%s | Docvia"
  },
  description:
    "Convert, compress and manage documents online with Docvia. Fast, secure and easy-to-use PDF tools.",
  keywords: [
    "Docvia",
    "PDF converter",
    "PDF tools",
    "PDF to JPG",
    "PDF to Word",
    "Compress PDF",
    "Merge PDF",
    "Split PDF",
    "OCR",
    "Document processing"
  ],
  authors: [{ name: "Docvia Team" }],
  creator: "Docvia",
  publisher: "Docvia",
  openGraph: {
    title: "Docvia - Secure Document Tools",
    description: "Convert PDF, JPG, Word and documents easily online.",
    url: "https://docvia.com",
    siteName: "Docvia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Docvia Document Tools"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Docvia - Secure Document Tools",
    description: "Convert documents online securely with Docvia.",
    creator: "@docvia",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    },
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Docvia PDF Tools",
              "url": "https://docvia.com",
              "applicationCategory": "DocumentApplication",
              "operatingSystem": "Web"
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable} h-full antialiased min-h-full flex flex-col bg-slate-50 dark:bg-black dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:to-black transition-colors duration-200`}>
        {ENABLE_ADS && <AdSenseInit />}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-right" />
          <ThemeToggle />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
