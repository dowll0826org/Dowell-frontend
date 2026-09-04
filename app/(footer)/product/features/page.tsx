import type { Metadata } from "next";
import FeaturesClient from "./FeaturesClient";

export const metadata: Metadata = {
  title: "Features | dowll",
  description: "Explore all the features dowll has to offer for your document processing needs.",
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
