import type { MetadataRoute } from "next";
import { PAGES, SITE } from "@/lib/seo";

// Served at /sitemap.xml. Lists every public page defined in src/lib/seo.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(PAGES).map((path) => ({
    url: `${SITE}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}
