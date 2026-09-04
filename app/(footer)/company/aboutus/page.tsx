import type { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

export const metadata: Metadata = {
  title: "About Us | dowll",
  description: "Learn more about dowll, our mission, and our values.",
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}