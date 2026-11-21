"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";

const themes = {
  paper: { bg: "var(--color-paper)", fg: "var(--color-ink)", theme: "light" },
  mist: { bg: "var(--color-mist)", fg: "var(--color-ink)", theme: "light" },
  red: { bg: "var(--color-red)", fg: "var(--color-paper)", theme: "red" },
  ink: { bg: "var(--color-ink)", fg: "var(--color-paper)", theme: "dark" },
} as const;

export type SectionTheme = keyof typeof themes;

/**
 * Site-wide motion engine (agencefoudre.com pattern):
 * - Lenis smooth scroll
 * - [data-section]: when a section crosses the viewport centre, the page
 *   background / text colour / header theme / fixed label change to match
 * (Per-element reveal triggers live in <InView>.)
 */
export function ScrollController() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 } });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const sectionIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const t = themes[(el.dataset.section as SectionTheme) || "paper"];
          root.style.setProperty("--page-bg", t.bg);
          root.style.setProperty("--page-fg", t.fg);
          root.dataset.theme = t.theme;
          window.dispatchEvent(
            new CustomEvent("bonam:label", { detail: el.dataset.label ?? "" }),
          );
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    document
      .querySelectorAll("[data-section]")
      .forEach((el) => sectionIO.observe(el));

    return () => {
      sectionIO.disconnect();
    };
  }, [pathname]);

  return null;
}
