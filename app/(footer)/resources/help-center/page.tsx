import type { Metadata } from "next";
import HelpCenterClient from "./HelpCenterClient";

export const metadata: Metadata = {
  title: "Help Center | dowll",
  description: "Get support and learn how to make the most of dowll's document tools.",
};

export default function Resources() {
  return <HelpCenterClient />;
}
