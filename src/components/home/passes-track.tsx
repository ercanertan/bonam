"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { RevealText } from "@/components/motion/reveal";
import { Container } from "@/components/ui";
import { centreName, type Pass } from "@/content/site";
import { useScrollProgress } from "@/lib/scroll";
import { InView } from "@/components/motion/in-view";

/**
 * Pinned horizontal gallery: on desktop the section is pinned and vertical
 * scroll slides the cards sideways; each card pops in as it enters.
 * On touch/small screens it falls back to a native swipe row.
 */
export function PassesTrack({ items }: { items: Pass[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useScrollProgress(section, (p) => {
    const el = track.current;
    if (!el) return;
    if (window.innerWidth < 1024) {
      el.style.transform = "";
      return;
    }
    const max = el.scrollWidth - window.innerWidth;
    el.style.transform = `translate3d(${-p * Math.max(0, max)}px,0,0)`;
  });

  return (
    <section
      ref={section}
      data-section="ink"
      data-label="Passed"
      className="relative text-paper lg:h-[320vh]"
    >
      <div className="overflow-hidden py-24 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
        <Container className="flex flex-wrap items-end justify-between gap-6">
          <RevealText
            className="display text-heading"
            lines={["They passed.", { text: "You’re next.", className: "text-rose" }]}
          />
          <Link
            href="/passes"
            className="text-lg font-medium underline-offset-4 hover:text-rose hover:underline"
          >
            See others →
          </Link>
        </Container>

        <div
          ref={track}
          className="mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 will-change-transform [scrollbar-width:none] sm:scroll-px-8 sm:gap-4 sm:px-8 lg:mt-12 lg:snap-none lg:overflow-visible lg:px-12"
        >
          {items.map((p, i) => (
            <InView
              as="figure"
              key={p.id}
              className="pop relative aspect-[742/556] w-[calc(100vw-2.5rem)] shrink-0 snap-start sm:aspect-[4/5] sm:w-[42vw] lg:w-[24vw] lg:max-w-[26rem]"
              style={{ "--delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
            >
              <div className="card-img group">
                <Image
                  src={p.image}
                  alt={`Bonam pupil celebrating a pass at ${centreName(p.testCentre)} test centre`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 26rem"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: `${p.focusX}% 50%` }}
                />
              </div>
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink">
                {centreName(p.testCentre)}
              </figcaption>
            </InView>
          ))}
          <InView
            as={Link}
            href="/passes"
            className="pop display grid aspect-[742/556] w-[calc(100vw-2.5rem)] shrink-0 snap-start place-items-center sm:aspect-[4/5] rounded-[var(--radius-card)] bg-red p-8 text-center text-heading-sm text-paper transition-colors hover:bg-paper hover:text-red sm:w-[42vw] lg:w-[24vw] lg:max-w-[26rem]"
          >
            See others →
          </InView>
        </div>
      </div>
    </section>
  );
}
