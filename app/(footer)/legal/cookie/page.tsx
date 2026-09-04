import type { Metadata } from "next";
import CookieClient from "./CookieClient";

export const metadata: Metadata = {
  title: "Cookie Policy | dowll",
  description: "Learn about how we use cookies to improve your experience on dowll.",
};

export default function CookiePolicyPage() {
  return <CookieClient />;
}
