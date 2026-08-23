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
    url: `https://dowll.com/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Add the root homepage with highest priority
  sitemapUrls.unshift({
    url: `https://dowll.com/`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  // Add static marketing, legal, and support pages
  const staticRoutes = [
    "/company/aboutus",
    "/company/contact",
    "/legal/privacy",
    "/legal/terms",
    "/product/features",
    "/product/security",
    "/resources/faq",
    "/resources/guides",
    "/resources/help-center"
  ];

  for (const route of staticRoutes) {
    sitemapUrls.push({
      url: `https://dowll.com${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return sitemapUrls;
}
