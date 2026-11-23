import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Generated at build time into out/robots.txt (static export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
