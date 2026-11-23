import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Per-page metadata: title, description, canonical URL and the social share card.
 * Next.js replaces (rather than merges) `openGraph` from the layout, so each page
 * repeats the shared fields here.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string; // with trailing slash, e.g. "/passes/"
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.name,
      url: path,
      title: `${title} | ${site.name}`,
      description,
      // app/opengraph-image.jpg, which the layout picks up on its own
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${site.name}: automatic driving lessons in North London` }],
    },
  };
}
