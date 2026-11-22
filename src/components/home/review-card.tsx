"use client";

import { useState } from "react";
import type { Review } from "@/content/site";

const LONG = 320; // characters before the card collapses behind "Read more"

export function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label={`${value} out of 5 stars`}
      className={`inline-flex gap-1 text-red ${className}`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden className="size-[1em]" fill="currentColor">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

/** One Google review. Long reviews start clamped with a "Read more" toggle. */
export function ReviewCard({ review }: { review: Review }) {
  const long = review.text.length > LONG;
  const [open, setOpen] = useState(false);
  return (
    <figure className="rounded-card bg-paper p-8 shadow-[0_18px_40px_-24px_rgba(27,18,18,0.35)] sm:p-9">
      <Stars value={review.rating} className="text-lg" />
      <blockquote
        className={`mt-5 text-base leading-snug whitespace-pre-line sm:text-lg ${long && !open ? "line-clamp-[7]" : ""}`}
      >
        {review.text}
      </blockquote>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-3 text-sm font-bold text-red hover:text-ink"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
      <figcaption className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-t-2 border-line pt-5">
        <span className="font-bold">{review.author}</span>
        <span className="text-sm text-ink/70">Google review</span>
      </figcaption>
    </figure>
  );
}
