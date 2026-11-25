"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Video } from "@/content/site";

/**
 * Vertical (9:16) YouTube Short, "lite" style: shows the Bonam cover and a
 * play button, and only loads the YouTube player (privacy-enhanced domain)
 * when clicked. Closing a surrounding <details> panel stops it. Videos with
 * no YouTube id yet show the cover with a "Coming soon" badge.
 */
export function YouTubeShort({ video, className = "" }: { video: Video; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const details = ref.current?.closest("details");
    if (!details) return;
    const onToggle = () => {
      if (!details.open) setPlaying(false);
    };
    details.addEventListener("toggle", onToggle);
    return () => details.removeEventListener("toggle", onToggle);
  }, []);

  if (!video.id) {
    return (
      <div className={`card-img relative! aspect-[9/16] w-full ${className}`}>
        <Image
          src={video.cover}
          alt={`Cover: ${video.title} (video coming soon)`}
          fill
          sizes="16rem"
          className="object-cover"
        />
        <span className="absolute inset-0 bg-ink/35" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper px-4 py-2 text-sm font-bold whitespace-nowrap text-ink">
          Video coming soon
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`card-img relative! aspect-[9/16] w-full bg-ink ${className}`}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play video: ${video.title}`}
        >
          <Image
            src={video.cover}
            alt=""
            fill
            sizes="16rem"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/0" />
          <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red text-paper shadow-lg transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
          <span className="absolute inset-x-3 bottom-3 rounded-full bg-paper/95 px-3 py-1.5 text-center text-xs font-semibold text-ink">
            Watch the video
          </span>
        </button>
      )}
    </div>
  );
}
