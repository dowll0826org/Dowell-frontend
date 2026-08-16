import { MetadataRoute } from "next";
import { sidebarItems } from "@/lib/tools.data";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs: string[] = [];

  // Extract all valid slugs from the nested sidebarItems structure
  for (const item of sidebarItems) {
    if (item.slug) {
      slugs.push(item.slug);
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.slug) {
          slugs.push(child.slug);
        }
      }
    }
  }

  // Map slugs to sitemap URLs using the clean structure
  const sitemapUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `https://docvia.com/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Add the root homepage with highest priority
  sitemapUrls.unshift({
    url: `https://docvia.com/`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  return sitemapUrls;
}
