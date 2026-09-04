import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | dowll",
  description: "Read the terms of service and user agreement for using dowll.",
};

export default function TermsOfServicePage() {
  return <TermsClient />;
}
