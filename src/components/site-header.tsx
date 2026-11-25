"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CarLine } from "@/components/brand";
import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/content/site";
import { getLenis } from "@/lib/scroll";

const links = [
  { href: "/", label: "Home" },
  { href: "/#lessons", label: "Lessons" },
  { href: "/#test-day", label: "Test day" },
  { href: "/#news", label: "What’s new" },
  { href: "/passes", label: "Pass gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/**
 * Two round buttons in the corners and a centred section label that rolls
 * in letter by letter whenever a new section takes over the screen.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // On the home page the logo button scrolls back to the top instead of reloading.
  const onHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show the blurred bar once the page has scrolled away from the very top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onLabel = (e: Event) => setLabel((e as CustomEvent<string>).detail);
    window.addEventListener("bonam:label", onLabel);
    return () => window.removeEventListener("bonam:label", onLabel);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const html = document.documentElement;
    document.addEventListener("keydown", onKey);
    html.classList.add("menu-open");
    getLenis()?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      html.classList.remove("menu-open");
      getLenis()?.start();
    };
  }, [open]);

  return (
    <>
      <header
        data-scrolled={scrolled}
        className="site-header pointer-events-none fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6 sm:py-4"
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="nav-dot pointer-events-auto grid size-[50px] place-items-center rounded-full hover:scale-105"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute top-1.5 left-0 h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>

        <p
          aria-hidden
          key={label}
          className="nav-label display overflow-hidden text-2xl sm:text-3xl"
        >
          {label.split("").map((ch, i) => (
            <span
              key={i}
              className="label-letter"
              style={{ "--i": i } as React.CSSProperties}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </p>

        <div className="pointer-events-auto flex items-center justify-end gap-3">
          <a
            href={site.phoneHref}
            className="nav-pill hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-bold hover:opacity-70 md:inline-flex"
          >
            <PhoneIcon className="text-base" />
            Call {site.phone}
          </a>
          <Link
            href="/"
            onClick={onHomeClick}
            aria-label={pathname === "/" ? "Back to top" : `${site.name} home`}
            className="nav-dot grid size-[50px] place-items-center rounded-full hover:scale-105"
          >
            <CarLine className="w-8" strokeWidth={34} />
          </Link>
        </div>
      </header>

      <div
        id="site-menu"
        hidden={!open}
        data-lenis-prevent
        className="fixed inset-0 z-40 overflow-y-auto bg-red text-paper"
      >
        <nav
          aria-label="Main"
          className="mx-auto flex min-h-full max-w-page flex-col justify-end px-5 pt-28 pb-10 sm:px-8 lg:px-12"
        >
          <ul>
            {links.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`display block text-heading transition-colors hover:text-ink ${i % 2 ? "text-rose" : "text-paper"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-lg font-medium">
            <a href={site.phoneHref} className="inline-flex items-center gap-2.5 hover:text-ink">
              <PhoneIcon />
              {site.phone}
            </a>
            <a href={site.whatsappHref} className="inline-flex items-center gap-2.5 hover:text-ink">
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-ink">
              <InstagramIcon />
              Instagram
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-ink">
              <MailIcon />
              {site.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
