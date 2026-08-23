import type { Metadata } from "next";
import FAQClient from "./FAQClient";
import { faqData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | dowll",
  description: "Find answers to common questions about dowll's features, security, and billing.",
};

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FAQClient />
    </>
  );
}
