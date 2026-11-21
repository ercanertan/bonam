"use client";

import { useEffect, useRef, useState } from "react";
import { CarLine } from "@/components/brand";
import { getLenis } from "@/lib/scroll";

const EXPO_OUT = "cubic-bezier(0.19, 1, 0.22, 1)";
const IN_OUT_CIRC = "cubic-bezier(0.785, 0.135, 0.15, 0.86)";
const IN_OUT_EXPO = "cubic-bezier(0.87, 0, 0.13, 1)";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TAGLINE = ["The", "road", "to", "success"];

/**
 * Intro, modelled on agencefoudre.com's loader:
 * red screen → car line draws + tagline rises → tagline leaves while the two
 * halves of an L-plate slide together → the plate becomes a window that
 * rotates 120° and zooms ×28, revealing the hero. Plays once per session.
 */
export function Loader() {
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    let cancelled = false;

    const finish = () => {
      html.classList.add("is-loaded");
      html.style.overflow = "";
      getLenis()?.start();
      setDone(true);
    };

    if (
      html.classList.contains("intro-seen") ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      finish();
      return;
    }
    try {
      sessionStorage.setItem("bonam-intro", "1");
    } catch {}

    html.style.overflow = "hidden";
    getLenis()?.stop();
    window.scrollTo(0, 0);

    const el = ref.current!;
    const $ = <T extends Element>(s: string) => el.querySelector<T>(s)!;
    const words = [...el.querySelectorAll<HTMLElement>(".loader-word")];
    const line = $<SVGPathElement>(".loader-line path");
    const bg = $<HTMLElement>(".loader-bg");
    const svg = $<SVGSVGElement>(".loader-svg");
    const plate = $<SVGGElement>(".loader-plate");
    const plateFill = $<SVGRectElement>(".loader-plate-fill");
    const ell = $<SVGGElement>(".loader-l");
    const opt = (o: KeyframeAnimationOptions) => ({ fill: "forwards", ...o }) as const;

    (async () => {
      // 1 — car line draws, tagline rises
      line.animate(
        [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
        opt({ duration: 1200, easing: EXPO_OUT }),
      );
      words.forEach((w, i) =>
        w.animate(
          [{ transform: "translateY(120%)" }, { transform: "translateY(0)" }],
          opt({ duration: 900, delay: 250 + i * 60, easing: EXPO_OUT }),
        ),
      );
      await wait(1900);
      if (cancelled) return;

      // 2 — tagline leaves, L-plate halves slide together
      words.forEach((w, i) =>
        w.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(-120%)" }],
          opt({ duration: 450, delay: i * 25, easing: IN_OUT_CIRC }),
        ),
      );
      line.parentElement!.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        opt({ duration: 350, easing: IN_OUT_CIRC }),
      );
      plate.animate(
        [
          { transform: "translate(-16px, 5px) rotate(-8deg)", opacity: 0 },
          { transform: "none", opacity: 1 },
        ],
        opt({ duration: 1100, easing: IN_OUT_CIRC }),
      );
      ell.animate(
        [
          { transform: "translate(16px, -5px) rotate(8deg)", opacity: 0 },
          { transform: "none", opacity: 1 },
        ],
        opt({ duration: 1100, easing: IN_OUT_CIRC }),
      );
      await wait(1350);
      if (cancelled) return;

      // 3 — plate turns into a window onto the page, then spins and zooms open
      bg.style.opacity = "0";
      plateFill.style.opacity = "0";
      html.classList.add("is-loaded");
      const zoom = svg.animate(
        [{ transform: "rotate(0deg) scale(1)" }, { transform: "rotate(120deg) scale(28)" }],
        opt({ duration: 1800, easing: IN_OUT_EXPO }),
      );
      el.animate([{ opacity: 1 }, { opacity: 0 }], opt({ duration: 400, delay: 1400 }));
      await zoom.finished;
      if (!cancelled) finish();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="loader pointer-events-auto fixed inset-0 z-[100] overflow-hidden"
    >
      <div className="loader-bg absolute inset-0 bg-red" />

      <svg
        className="loader-svg absolute inset-0 h-full w-full"
        viewBox="-50 -50 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask
            id="loader-hole"
            maskUnits="userSpaceOnUse"
            x="-2000"
            y="-2000"
            width="4000"
            height="4000"
          >
            <rect x="-2000" y="-2000" width="4000" height="4000" fill="#fff" />
            <rect x="-7" y="-7" width="14" height="14" rx="1.6" fill="#000" />
          </mask>
        </defs>
        {/* red frame with an L-plate-shaped window */}
        <rect
          x="-2000"
          y="-2000"
          width="4000"
          height="4000"
          fill="var(--color-red)"
          mask="url(#loader-hole)"
        />
        <g className="loader-plate" opacity="0">
          <rect
            className="loader-plate-fill"
            x="-7"
            y="-7"
            width="14"
            height="14"
            rx="1.6"
            fill="#fff"
          />
        </g>
        <g className="loader-l" opacity="0" fill="var(--color-red)">
          <rect x="-3.4" y="-4.6" width="2.8" height="8.6" />
          <rect x="-3.4" y="1.2" width="7" height="2.8" />
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-paper">
        <span className="loader-line block w-[min(70vw,30rem)]">
          <CarLine
            className="w-full"
            strokeWidth={9}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
        </span>
        <p className="display mt-4 text-[clamp(3rem,9vw,7.5rem)]">
          {TAGLINE.map((w, i) => (
            <span key={i} className="rv-mask">
              <span className="loader-word inline-block" style={{ transform: "translateY(120%)" }}>
                {w}
              </span>
              {" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
