import { faqs, site, testCentres } from "@/content/site";

/** Renders a schema.org object as a JSON-LD script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so content can never close the script tag early
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** The business, for Google's local results. Service-area business: no street address. */
export const drivingSchoolSchema = {
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  "@id": `${site.url}/#business`,
  name: site.name,
  description:
    "Patient, one-to-one automatic driving lessons in North London, specialising in nervous and anxious learners.",
  slogan: "The road to success",
  url: `${site.url}/`,
  telephone: "+447593242247",
  email: site.email,
  image: `${site.url}/opengraph-image.jpg`,
  areaServed: [
    ...testCentres.map((c) => ({ "@type": "Place", name: `${c.name}, London` })),
    { "@type": "Place", name: "North London" },
  ],
  sameAs: [site.instagram],
  knowsLanguage: "en-GB",
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};
