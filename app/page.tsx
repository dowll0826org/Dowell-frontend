import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Hero from "@/components/landing/Hero";
import PrivacySection from "@/components/landing/PrivacySection";
import SupportedFormats from "@/components/landing/SupportedFormats";
import Workflow from "@/components/landing/Workflow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docvia - Your Ultimate Document Processing Hub",
  description: "Streamline your workflow with our comprehensive suite of online tools: convert, merge, split, compress, and protect PDFs and Office documents effortlessly.",
};


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <SupportedFormats />
        <Workflow />
        <PrivacySection />
      </main>
      <Footer />
    </div>
  );
}
