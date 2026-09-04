import type { Metadata } from "next";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
  title: "Document Guides & Tutorials | dowll",
  description: "Step-by-step guides and tutorials for all your document processing needs.",
};

export default function GuidesPage() {
  return <GuidesClient />;
}
