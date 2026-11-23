"use client";

import Image from "next/image";
import { useRef } from "react";
import { FullLogo } from "@/components/brand";
import { InView } from "@/components/motion/in-view";
import { Bubble, RevealText } from "@/components/motion/reveal";
import { Button, Container, Pill } from "@/components/ui";
import { about, centreName, heroPassIds, passById, site, testCentres } from "@/content/site";
import { useScrollProgress } from "@/lib/scroll";

const introPhoto = passById("pass-07");

const bubbles = [
  { emoji: "🚗", rot: 8, pos: "-top-6 left-[12%]" },
  { emoji: "🎉", rot: -8, pos: "top-[28%] -left-8" },
  { emoji: "✅", rot: 8, pos: "top-[58%] -right-8" },
];

function CardStack({ className = "", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <div className={`hero-stack ${className}`}>
      {heroPassIds.map((id, i) => {
        const p = passById(id);
        return (
          <div key={id} className="hero-card">
            <div className="card-img">
              <Image
                src={p.image}
                alt={`Bonam pupil with their pass certificate at ${centreName(p.testCentre)} test centre`}
                fill
                sizes="(max-width: 1024px) 70vw, 30vw"
                loading={eager && i === 0 ? "eager" : undefined}
                fetchPriority={eager && i === 0 ? "high" : undefined}
                className="object-cover"
                style={{ objectPosition: `${p.focusX}% 50%` }}
              />
            </div>
            <Bubble emoji={bubbles[i].emoji} rot={bubbles[i].rot} className={bubbles[i].pos} />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Hero + intro, wrapped so the card stack can stay pinned in the centre of
 * the screen across both (desktop). --progress (0 → 1 over the first screen
 * of scroll) folds the fanned cards into a single stack.
 */
export function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);

  useScrollProgress(
    hero,
    (p) => wrap.current?.style.setProperty("--progress", p.toFixed(4)),
    { mode: "exit", distance: 0.7 },
  );

  return (
    <div ref={wrap} className="hero relative overflow-x-clip">
      <section
        ref={hero}
        data-section="paper"
        data-label=""
        className="relative flex h-svh min-h-[38rem] flex-col justify-between pt-24 pb-6 sm:pt-28 lg:pb-10"
      >
        <Container>
          <h1 className="sr-only">
            {site.name}: automatic driving lessons in North London. The road to success.
          </h1>
          <div className="hero-logo flex justify-center text-[4.3vw] whitespace-nowrap lg:text-[min(3vw,2.75rem)]">
            <FullLogo tagline={false} />
          </div>
        </Container>

        {/* Card stack sits in its own row below the logo, so it never covers it */}
        <div className="flex min-h-0 flex-1 items-center justify-center pt-12 pb-6 lg:py-10">
          <CardStack eager className="h-full max-h-[34rem]" />
        </div>

        <Container className="relative z-10 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-[26rem] text-lg leading-snug sm:text-xl">
            Patient one-to-one automatic driving lessons across North London.{" "}
            <em className="font-semibold text-red not-italic">The road to success</em>{" "}
            starts here.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Book a lesson</Button>
            <Button href="#lessons" variant="ghost">
              See lessons
            </Button>
          </div>
        </Container>
      </section>

      <section
        data-section="mist"
        data-label="Bonam"
        className="relative py-[18vh] lg:min-h-svh lg:py-[22vh]"
      >
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,28%)_1fr]">
          <RevealText
            className="display text-heading-lg text-ink"
            lines={["Calm.", "Patient.", { text: "Clear.", className: "text-red" }]}
          />
          <InView className="swing-stage hidden lg:block">
            <div className="swing relative mx-auto aspect-[45/68] w-full">
              <div className="card-img">
                <Image
                  src={introPhoto.image}
                  alt={`Bonam pupil celebrating a pass at ${centreName(introPhoto.testCentre)} test centre`}
                  fill
                  sizes="28vw"
                  className="object-cover"
                  style={{ objectPosition: `${introPhoto.focusX}% 50%` }}
                />
              </div>
              <Bubble emoji="⭐" rot={-8} className="-top-7 -left-6" />
            </div>
          </InView>
          <div className="lg:pl-6">
            <p className="max-w-[42ch] text-lg leading-snug sm:text-xl">{about.lead}</p>
            <p className="mt-4 max-w-[46ch] text-base leading-snug">{about.body}</p>
            <ul className="mt-6 space-y-2">
              {about.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-base font-medium">
                  <span aria-hidden className="text-red">★</span>
                  {pt}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {testCentres.map((c) => (
                <li key={c.id}>
                  <Pill>{c.name}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

    </div>
  );
}
