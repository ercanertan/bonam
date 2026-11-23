import type { MetadataRoute } from "next";
import { passes, site } from "@/content/site";

// Generated at build time into out/sitemap.xml (static export).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/passes/`,
      changeFrequency: "monthly",
      priority: 0.8,
      images: passes.map((p) => `${site.url}${p.image}`),
    },
    { url: `${site.url}/contact/`, changeFrequency: "yearly", priority: 0.7 },
  ];
}
