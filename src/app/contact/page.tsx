import type { Metadata } from "next";
import { RevealText } from "@/components/motion/reveal";
import { Container, Label, Pill } from "@/components/ui";
import { site, testCentres } from "@/content/site";
import { InView } from "@/components/motion/in-view";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book automatic driving lessons with ${site.name}. Call, WhatsApp or email.`,
};

// Static for now: direct contact links rather than a form with no backend.
const channels = [
  { label: "Call", value: site.phone, href: site.phoneHref },
  { label: "WhatsApp", value: "Message us", href: site.whatsappHref },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function ContactPage() {
  return (
    <section data-section="paper" data-label="Contact" className="pt-32 pb-20 sm:pt-40 sm:pb-28">
      <Container>
        <Label>Contact</Label>
        <RevealText
          as="h1"
          className="display text-display text-red"
          lines={["Let’s", { text: "drive.", className: "text-rose" }]}
        />
        <p className="mt-8 max-w-[52ch] text-lg leading-snug sm:text-xl">
          Tell us where you are, how much driving you&rsquo;ve done and how
          you feel about it. Nervous is completely fine. We&rsquo;ll find a
          time that works.
        </p>

        <ul className="mt-14 border-t-2 border-line">
          {channels.map((c) => (
            <InView as="li" key={c.label} className="rise border-b-2 border-line">
              <a
                href={c.href}
                className="group grid gap-2 py-8 sm:grid-cols-12 sm:items-baseline"
              >
                <span className="text-sm font-medium tracking-wide uppercase sm:col-span-3">
                  {c.label}
                </span>
                <span
                  className={`display text-ink transition-colors group-hover:text-red sm:col-span-9 ${c.label === "Email" ? "text-[clamp(1.5rem,5vw,3.5rem)] [overflow-wrap:anywhere]" : "text-heading-sm"}`}
                >
                  {c.value}
                </span>
              </a>
            </InView>
          ))}
        </ul>

        <div className="mt-14">
          <Label>Areas & test centres</Label>
          <ul className="flex flex-wrap gap-2">
            {testCentres.map((c) => (
              <li key={c.id}>
                <Pill>{c.name}</Pill>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
