"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";

// One shared observer for every <InView> on the page.
const callbacks = new Map<Element, (visible: boolean) => void>();
let observer: IntersectionObserver | null = null;
function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => entries.forEach((e) => callbacks.get(e.target)?.(e.isIntersecting)),
    { rootMargin: "0px 0px -12% 0px" },
  );
  return observer;
}

type InViewProps<T extends ElementType> = {
  as?: T;
  /** Remove .is-inview again when the element leaves the viewport. */
  repeat?: boolean;
} & ComponentPropsWithoutRef<T>;

/**
 * Renders `as` (default div) and adds `.is-inview` once it scrolls into view.
 * The class lives in React state, so it never fights hydration.
 */
export function InView<T extends ElementType = "div">({
  as,
  repeat = false,
  className = "",
  ...rest
}: InViewProps<T>) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    callbacks.set(el, (visible) => {
      if (visible) {
        setInView(true);
        if (!repeat) {
          io.unobserve(el);
          callbacks.delete(el);
        }
      } else if (repeat) {
        setInView(false);
      }
    });
    io.observe(el);
    return () => {
      io.unobserve(el);
      callbacks.delete(el);
    };
  }, [repeat]);

  return <Tag ref={ref} className={`${className}${inView ? " is-inview" : ""}`} {...rest} />;
}
