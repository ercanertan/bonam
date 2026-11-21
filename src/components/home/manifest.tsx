"use client";

import { useRef } from "react";
import { range, useScrollProgress } from "@/lib/scroll";

const TEXT1 = [
  ["Your", "confidence", "matters."],
  ["Your", "progress", "matters."],
  ["Your", "success", "matters."],
];
const TEXT2 = [["Then", "you"], ["pass."]];

function Words({ lines, className }: { lines: string[][]; className: string }) {
  return (
    <p className={className} aria-label={lines.flat().join(" ")}>
      {lines.map((ws, li) => (
        <span key={li} aria-hidden className="block">
          {ws.map((w, wi) => (
            <span key={wi} className="rv-mask">
              <span
                className="mf-word inline-block will-change-transform"
                style={{ transform: "translateY(120%)" }}
              >
                {w}
              </span>
              {" "}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}

/**
 * Pinned "manifesto" (agencefoudre.com .o-homeManifest pattern), 400vh tall:
 * red panel scales up from nothing → first statement rolls in and out →
 * a winding road draws across the screen → second statement lands on it.
 */
export function Manifest() {
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const road = useRef<SVGPolylineElement>(null);
  const lane = useRef<SVGPolylineElement>(null);
  const t1 = useRef<HTMLDivElement>(null);
  const t2 = useRef<HTMLDivElement>(null);

  useScrollProgress(section, (p) => {
    const grow = range(p, 0, 0.16);
    if (panel.current) {
      panel.current.style.transform = `scale(${grow})`;
      panel.current.style.borderRadius = `${40 * (1 - grow)}px`;
    }

    const out1 = range(p, 0.4, 0.48);
    t1.current?.querySelectorAll<HTMLElement>(".mf-word").forEach((w, i) => {
      const inn = range(p, 0.15 + i * 0.012, 0.27 + i * 0.012);
      w.style.transform = `translateY(${120 * (1 - inn) - 120 * out1}%)`;
    });

    const draw = range(p, 0.42, 0.66);
    if (road.current) {
      road.current.style.strokeDashoffset = `${1 - draw}`;
      road.current.style.strokeWidth = `${150 + 90 * draw}`;
    }
    if (lane.current) lane.current.style.opacity = `${range(p, 0.6, 0.68)}`;

    t2.current?.querySelectorAll<HTMLElement>(".mf-word").forEach((w, i) => {
      const inn = range(p, 0.64 + i * 0.02, 0.78 + i * 0.02);
      w.style.transform = `translateY(${120 * (1 - inn)}%)`;
    });
  });

  const points = "-120,760 180,430 470,560 760,300 1120,420";

  return (
    <section ref={section} data-section="paper" data-label="" className="relative h-[400vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          ref={panel}
          className="absolute inset-0 origin-center bg-red will-change-transform"
          style={{ transform: "scale(0)", borderRadius: 40 }}
        />
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <polyline
            ref={road}
            points={points}
            pathLength={1}
            stroke="var(--color-ink)"
            strokeWidth={150}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          <polyline
            ref={lane}
            points={points}
            stroke="var(--color-paper)"
            strokeWidth={7}
            strokeDasharray="34 30"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0}
          />
        </svg>

        <div ref={t1} className="absolute inset-0 grid place-items-center px-5 text-center">
          <Words
            lines={TEXT1}
            className="display text-[clamp(2.75rem,9vw,8.125rem)] leading-[1.02] text-paper"
          />
        </div>
        <div ref={t2} className="absolute inset-0 grid place-items-center px-5 text-center">
          <Words
            lines={TEXT2}
            className="display text-[clamp(5rem,16vw,15rem)] text-paper"
          />
        </div>
      </div>
    </section>
  );
}
