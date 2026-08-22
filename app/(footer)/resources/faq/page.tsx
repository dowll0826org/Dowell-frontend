import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | dowll",
  description: "Find answers to common questions about dowll's features, security, and billing.",
};

export default function FAQ() {
  return <FAQClient />;
}
