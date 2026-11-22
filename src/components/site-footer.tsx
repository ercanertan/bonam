import Link from "next/link";
import { GiantLogo } from "@/components/brand";
import { RevealText } from "@/components/motion/reveal";
import { site, testCentres } from "@/content/site";
import { Button, Container } from "./ui";
import { InView } from "@/components/motion/in-view";
import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

/** Red closing section: CTA, contact details, giant BONAM that rises into view. */
export function SiteFooter() {
  return (
    <footer data-section="red" data-label="Contact" className="overflow-hidden text-paper">
      <Container className="pt-28 sm:pt-36">
        <RevealText
          className="display text-display"
          lines={["Ready", { text: "when you are", className: "text-ink" }]}
        />
        <p className="mt-8 max-w-[34ch] text-xl font-medium sm:text-2xl">{site.slogan}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact" variant="light">
            Book a lesson
          </Button>
          <Button href={site.phoneHref} variant="outlineLight">
            <PhoneIcon />
            Call {site.phone}
          </Button>
        </div>

        <div className="mt-20 grid gap-10 text-base sm:grid-cols-3">
          <div>
            <p className="mb-3 text-sm tracking-wide text-ink uppercase">Contact</p>
            <ul className="space-y-1.5">
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-2.5 hover:text-ink">
                  <PhoneIcon />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.whatsappHref} className="inline-flex items-center gap-2.5 hover:text-ink">
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-ink">
                  <InstagramIcon />
                  {site.instagramHandle}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-ink">
                  <MailIcon />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm tracking-wide text-ink uppercase">Test centres</p>
            <ul className="space-y-1.5">
              {testCentres.map((c) => (
                <li key={c.id}>{c.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm tracking-wide text-ink uppercase">Explore</p>
            <ul className="space-y-1.5">
              <li>
                <Link href="/#lessons" className="hover:text-ink">
                  Lessons
                </Link>
              </li>
              <li>
                <Link href="/passes" className="hover:text-ink">
                  Pass gallery
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-ink">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 text-sm text-paper/80">
          © {site.name}. The road to success.
        </p>
      </Container>

      <InView className="mx-auto mt-10 max-w-page px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12">
        {/* "BONAM" is ~2.7em wide, so this font-size makes it span the page width */}
        <GiantLogo className="text-[calc((100vw-2.5rem)/2.72)] text-paper sm:text-[calc((100vw-4rem)/2.72)] lg:text-[min(calc((100vw-6rem)/2.72),calc((1440px-6rem)/2.72))]" />
      </InView>
    </footer>
  );
}
