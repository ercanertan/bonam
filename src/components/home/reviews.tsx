import { RevealText, Rise } from "@/components/motion/reveal";
import { Button, Container, Label } from "@/components/ui";
import { googleReviews } from "@/content/site";
import { ReviewCard, Stars } from "./review-card";

/** Google reviews: overall rating, what learners mention most, then the reviews themselves. */
export function Reviews() {
  const { rating, count, url, topics, reviews } = googleReviews;
  return (
    <section
      id="reviews"
      data-section="mist"
      data-label="Reviews"
      className="scroll-mt-20 py-24 sm:py-36"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Label>Google reviews</Label>
            <RevealText
              as="h2"
              className="display text-heading text-red"
              lines={["Rated 5.0", { text: "by learners", className: "text-ink" }]}
            />
            <Rise className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="display text-heading-sm leading-none">{rating.toFixed(1)}</span>
              <span className="flex flex-col gap-1">
                <Stars value={rating} className="text-2xl" />
                <span className="text-base font-medium">{count} reviews on Google</span>
              </span>
            </Rise>
          </div>
          <Rise delay={80} className="lg:col-span-5">
            <p className="mb-3 text-sm font-medium tracking-wide uppercase">
              What learners mention most
            </p>
            <ul className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <li key={t.label}>
                  <span className="inline-flex rounded-full bg-paper px-[15px] py-[7px] text-sm font-medium text-ink">
                    {t.label} · {t.count}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={url} target="_blank" rel="noopener noreferrer">
                Read all {count} reviews on Google
              </Button>
            </div>
          </Rise>
        </div>

        <ul className="mt-16 gap-6 sm:columns-2 lg:columns-3">
          {reviews.map((r, i) => (
            <Rise as="li" key={r.author} delay={(i % 3) * 100} className="mb-6 break-inside-avoid">
              <ReviewCard review={r} />
            </Rise>
          ))}
        </ul>
      </Container>
    </section>
  );
}
