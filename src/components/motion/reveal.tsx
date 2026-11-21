import type { ElementType, ReactNode } from "react";
import { InView } from "./in-view";

type Line = string | { text: string; className?: string };

/**
 * Headline whose words slide up out of a mask when scrolled into view.
 * The motion is CSS (.rv-word), triggered by <InView> adding .is-inview.
 */
export function RevealText({
  as: Tag = "h2",
  lines,
  className = "",
  delayStart = 0,
}: {
  as?: ElementType;
  lines: Line[];
  className?: string;
  delayStart?: number;
}) {
  let i = delayStart;
  const label = lines.map((l) => (typeof l === "string" ? l : l.text)).join(" ");
  return (
    <InView as={Tag} className={className} aria-label={label}>
      {lines.map((line, li) => {
        const { text, className: lineClass = "" } =
          typeof line === "string" ? { text: line } : line;
        return (
          <span key={li} aria-hidden className={`block ${lineClass}`}>
            {text.split(" ").map((word, wi) => (
              <span key={wi} className="rv-mask">
                <span className="rv-word" style={{ "--i": i++ } as React.CSSProperties}>
                  {word}
                </span>
                {" "}
              </span>
            ))}
          </span>
        );
      })}
    </InView>
  );
}

/** Block that fades and rises into view. */
export function Rise({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  return (
    <InView
      as={Tag}
      className={`rise ${className}`}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </InView>
  );
}

/** Floating emoji chat bubble (bobs, pops in when its parent is in view). */
export function Bubble({
  emoji,
  rot = 8,
  className = "",
}: {
  emoji: string;
  rot?: number;
  className?: string;
}) {
  return (
    <span aria-hidden className={`bubble-float ${className}`}>
      <span className="bubble" style={{ "--rot": `${rot}deg` } as React.CSSProperties}>
        {emoji}
      </span>
    </span>
  );
}
