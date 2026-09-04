import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { summaryGuides, detailedGuides } from "@/lib/data";
import { sidebarItems } from "@/lib/tools.data";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  FileText,
  ArrowRight,
  BookOpen
} from "lucide-react";
import GuidePageClient, { GuideContentClient } from "./GuidePageClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const detailedGuide = detailedGuides[slug as keyof typeof detailedGuides];
  const summaryGuide = summaryGuides.find((g) => g.slug === slug);
  const guide = detailedGuide || summaryGuide;

  if (!guide) {
    return {
      title: "Guide Not Found | dowll",
    };
  }

  const ogUrl = `/api/og?title=${encodeURIComponent(guide.title)}&desc=${encodeURIComponent(guide.description.slice(0, 100))}`;

  return {
    title: `${guide.title} | dowll`,
    description: guide.description,
    openGraph: {
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
        }
      ]
    },
    twitter: {
      images: [ogUrl]
    }
  };
}

export default async function GuidePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  // Try to find the explicit detailed guide
  const detailedGuide = detailedGuides[slug as keyof typeof detailedGuides];

  // Fallback to the summary guide from the index page
  const summaryGuide = summaryGuides.find((g) => g.slug === slug);

  if (!detailedGuide && !summaryGuide) {
    notFound();
  }

  // Generate a fallback guide if a detailed one isn't available
  const guide = detailedGuide || {
    title: summaryGuide!.title,
    description: summaryGuide!.description,
    content: {
      introduction: summaryGuide!.description,
      steps: [
        "Upload your file.",
        "Adjust settings if needed.",
        "Process the file.",
        "Download the result."
      ],
      benefits: [
        "Fast and secure processing",
        "No installation required",
        "Works on any device"
      ],
      security: "dowll processes files securely and protects your documents.",
      faq: []
    },
    relatedTools: []
  };

  let targetLink = "/";
  if (detailedGuide && detailedGuide.relatedTools && detailedGuide.relatedTools.length > 0) {
      targetLink = `/${detailedGuide.relatedTools[0]}`;
  } else {
      const allSlugs: string[] = [];
      sidebarItems.forEach(item => {
          if (item.slug) allSlugs.push(item.slug);
          if (item.children) {
              item.children.forEach(child => {
                  if (child.slug) allSlugs.push(child.slug);
              });
          }
      });
      const matchedSlug = allSlugs.find(s => slug.includes(s));
      if (matchedSlug) {
          targetLink = `/${matchedSlug}`;
      }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": guide.title,
    "description": guide.description,
    "step": guide.content.steps.map((step: string, idx: number) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "text": step
    }))
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuidePageClient slug={slug} targetLink={targetLink} hasDetailedGuide={!!detailedGuide} />
      <GuideContentClient slug={slug} hasDetailedGuide={!!detailedGuide} />
    </div>
  );
}
