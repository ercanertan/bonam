"use client";

import type Lenis from "lenis";
import { useEffect, type RefObject } from "react";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Calls `onProgress` with how far the element has scrolled, 0 → 1, every frame
 * the page scrolls. Writes nothing to React state, so there are no re-renders.
 *
 * - "pin":  0 when the element's top hits the viewport top, 1 when its bottom
 *           hits the viewport bottom (for tall sections with a sticky child).
 * - "exit": 0 when the element's top hits the viewport top, 1 once it has
 *           scrolled `distance` × its own height off the top.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress: (p: number, el: T) => void,
  { mode = "pin", distance = 1 }: { mode?: "pin" | "exit"; distance?: number } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        mode === "pin"
          ? -rect.top / Math.max(1, rect.height - vh)
          : -rect.top / Math.max(1, rect.height * distance);
      onProgress(clamp01(p), el);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    // onProgress is intentionally excluded: callers pass inline closures
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mode, distance]);
}

/** Map p from [start, end] to 0 → 1, clamped. */
export function range(p: number, start: number, end: number) {
  return clamp01((p - start) / (end - start));
}
