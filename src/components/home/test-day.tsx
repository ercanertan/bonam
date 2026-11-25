import { InView } from "@/components/motion/in-view";
import { Bubble, RevealText, Rise } from "@/components/motion/reveal";
import { Container, Label } from "@/components/ui";
import { YouTubeShort } from "@/components/youtube-short";
import { site, testDay } from "@/content/site";

/** "What will the examiner say?" — stage-by-stage test-day guide. */
export function TestDay() {
  return (
    <section
      id="test-day"
      data-section="mist"
      data-label="Test day"
      className="scroll-mt-20 py-24 sm:py-36"
    >
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Label>Test day</Label>
            <InView className="relative">
              <RevealText
                className="display text-heading"
                lines={[
                  "What will",
                  "the examiner",
                  { text: "say?", className: "text-red" },
                ]}
              />
              <Bubble
                emoji="🗣️"
                rot={8}
                className="-top-16 right-2 sm:-top-14"
              />
            </InView>
            <Rise className="mt-8 max-w-[46ch] text-lg leading-snug">
              {testDay.intro}
            </Rise>

            <Rise
              delay={120}
              className="mt-10 rounded-[var(--radius-card)] bg-paper p-7 sm:p-8"
            >
              <p className="display text-subheading text-red">Quick tips</p>
              <ul className="mt-5 space-y-3">
                {testDay.tips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-base leading-snug">
                    <span aria-hidden className="font-bold text-red">
                      ✓
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </Rise>

            <Rise delay={180} className="mt-6">
              <a
                href={site.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-red underline-offset-4 hover:underline"
              >
                <span aria-hidden>▶</span> More videos on our YouTube channel
                <span aria-hidden>↗</span>
              </a>
            </Rise>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {testDay.stages.map((stage, i) => (
            <Rise as="li" key={stage.title} delay={(i % 4) * 60}>
              <details
                open={i === 0}
                className="group border-b-2 border-rose/50 py-6 sm:py-7"
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-4 hover:text-red sm:gap-6 [&::-webkit-details-marker]:hidden">
                  <span className="display w-[2.2ch] shrink-0 text-subheading text-rose">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display flex-1 text-subheading">
                    {stage.title}
                  </span>
                  <span
                    aria-hidden
                    className="text-4xl leading-none font-light text-red transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>

                <div
                  className={`mt-5 grid gap-6 sm:items-start sm:pl-16 ${stage.video ? "sm:grid-cols-[1fr_14rem]" : ""}`}
                >
                  <div>
                    <p className="text-xs font-semibold tracking-wide uppercase">
                      You might hear
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {stage.phrases.map((ph) => (
                        <li
                          key={ph}
                          className="rounded-2xl rounded-bl-sm bg-paper px-4 py-2.5 text-base font-semibold text-red"
                        >
                          “{ph}”
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 max-w-[60ch] text-lg leading-snug">
                      {stage.body}
                    </p>
                  </div>
                  {stage.video && (
                    <YouTubeShort
                      video={stage.video}
                      className="max-w-[16rem]"
                    />
                  )}
                </div>
              </details>
            </Rise>
          ))}
        </ol>
      </Container>
    </section>
  );
}
