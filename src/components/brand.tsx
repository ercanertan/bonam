import type { CSSProperties, SVGProps } from "react";

/**
 * The car-roof line from the Bonam logo, redrawn as SVG.
 * TODO: replace with the original vector logo when available.
 * `pathLength=1` lets callers animate stroke-dashoffset 1 → 0 to draw it.
 */
export function CarLine(props: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  const { strokeWidth = 7, ...rest } = props;
  return (
    <svg viewBox="0 0 560 120" fill="none" aria-hidden {...rest}>
      <path
        pathLength={1}
        d="M8 112C14 86 92 70 186 58C232 28 292 10 344 12C404 14 452 34 512 40C536 43 552 56 550 84"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small header/footer wordmark: car line over "Bonam". */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <CarLine className="-mb-1 w-[4.2em] text-red" strokeWidth={14} />
      <span className="text-[1.15em] font-semibold tracking-tight">
        Bonam <span className="font-normal">Driving School</span>
      </span>
    </span>
  );
}

/**
 * Giant BONAM word (letters set together) whose letters rise one by one
 * when scrolled into view. Size it with a text-[…] class.
 */
export function GiantLogo({
  className = "",
  word = "BONAM",
}: {
  className?: string;
  word?: string;
}) {
  return (
    <p
      aria-label={word}
      className={`display flex w-full justify-center overflow-hidden leading-[0.92] ${className}`}
    >
      {word.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="logo-letter"
          style={{ "--delay": `${i * 50}ms` } as CSSProperties}
        >
          {ch}
        </span>
      ))}
    </p>
  );
}

/**
 * Full logo lockup recreated from the Bonam logo: red car line,
 * "Bonam Driving School", red letter-spaced tagline. Scales with font-size.
 * TODO: swap for the original vector logo file when available.
 */
export function FullLogo({
  className = "",
  tagline = true,
}: {
  className?: string;
  tagline?: boolean;
}) {
  return (
    <span
      role="img"
      aria-label={tagline ? "Bonam Driving School — The road to success" : "Bonam Driving School"}
      className={`full-logo inline-flex flex-col items-start leading-none ${className}`}
    >
      <CarLine
        className="-mb-[0.6em] -ml-[0.7em] w-[11em] text-red"
        strokeWidth={17}
      />
      <span className="text-[2em] font-medium tracking-[-0.02em] text-ink">
        Bonam Driving School
      </span>
      {tagline && (
        <span className="mt-[0.55em] text-[0.82em] font-normal tracking-[0.16em] text-red uppercase">
          The road to success
        </span>
      )}
    </span>
  );
}
