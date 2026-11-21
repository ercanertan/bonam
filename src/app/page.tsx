import Image from "next/image";
import { Hero } from "@/components/home/hero";
import { Manifest } from "@/components/home/manifest";
import { PassesTrack } from "@/components/home/passes-track";
import { Bubble, RevealText, Rise } from "@/components/motion/reveal";
import { Button, Container, Label, Pill } from "@/components/ui";
import {
  centreName,
  faqs,
  lessons,
  lessonsNeeded,
  passById,
  passes,
  steps,
  testCentres,
} from "@/content/site";
import { InView } from "@/components/motion/in-view";

const lessonPhoto = passById("pass-15");
const centreColours = ["text-red", "text-rose", "text-ink", "text-coral", "text-red"];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Lesson options — list + 3D swing-in photo */}
      <section
        id="lessons"
        data-section="paper"
        data-label="Lessons"
        className="scroll-mt-20 overflow-x-clip py-24 sm:py-36"
      >
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Label>Lessons</Label>
            <RevealText className="display text-heading text-red" lines={["Pick your pace"]} />
            <ul className="mt-12 border-t-2 border-line">
              {lessons.map((l, i) => (
                <Rise
                  as="li"
                  key={l.id}
                  delay={i * 80}
                  className="border-b-2 border-line py-8"
                >
                  <h3 className="display text-subheading">{l.title}</h3>
                  {l.highlight && (
                    <span className="mt-3 inline-block">
                      <Pill>Most popular</Pill>
                    </span>
                  )}
                  <p className="mt-3 max-w-[52ch] text-base leading-snug">{l.description}</p>
                </Rise>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/contact">Ask about availability</Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <InView className="swing-stage lg:sticky lg:top-28">
              <div className="swing relative mx-auto aspect-[45/68] max-h-[calc(100svh-10rem)] w-full max-w-[26rem]">
                <div className="card-img">
                  <Image
                    src={lessonPhoto.image}
                    alt={`Bonam pupil holding a pass certificate at ${centreName(lessonPhoto.testCentre)} test centre`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 26rem"
                    className="object-cover"
                    style={{ objectPosition: `${lessonPhoto.focusX}% 50%` }}
                  />
                </div>
                <Bubble emoji="🔑" rot={-8} className="-top-7 right-[14%]" />
              </div>
            </InView>
          </div>
        </Container>
      </section>

      <Manifest />

      {/* How it works */}
      <section data-section="mist" data-label="How it works" className="py-24 sm:py-36">
        <Container>
          <RevealText
            className="display text-heading-lg"
            lines={["Three steps", { text: "to your licence", className: "text-red" }]}
          />
          <ol className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <Rise as="li" key={s.title} delay={i * 120} className="relative">
                <span className="display block text-heading-lg text-rose">0{i + 1}</span>
                <h3 className="display mt-4 text-subheading text-red">{s.title}</h3>
                <p className="mt-3 max-w-[40ch] text-lg leading-snug">{s.body}</p>
              </Rise>
            ))}
          </ol>
        </Container>
      </section>

      {/* How many lessons do I need? */}
      <section data-section="paper" data-label="How many?" className="py-24 sm:py-36">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <RevealText
              className="display text-heading lg:col-span-7"
              lines={["How many lessons", { text: "do I need?", className: "text-red" }]}
            />
            <Rise className="text-lg leading-snug lg:col-span-5 lg:pt-3">
              {lessonsNeeded.intro}
            </Rise>
          </div>
          <ul className="mt-16 grid border-t-2 border-line md:grid-cols-3">
            {lessonsNeeded.types.map((t, i) => (
              <Rise
                as="li"
                key={t.title}
                delay={i * 120}
                className="border-b-2 border-line py-10 md:border-b-0 md:px-8 md:first:pl-0 md:[&:not(:first-child)]:border-l-2"
              >
                <p className="display text-heading-sm text-red">{t.estimate}</p>
                <h3 className="display mt-5 text-subheading">{t.title}</h3>
                <p className="mt-3 max-w-[40ch] text-base leading-snug">{t.body}</p>
              </Rise>
            ))}
          </ul>
          <Rise className="mt-12 max-w-[60ch] text-lg leading-snug font-medium">
            {lessonsNeeded.outro}
          </Rise>
        </Container>
      </section>

      <PassesTrack items={passes.slice(0, 8)} />

      {/* Where we teach — type is the visual */}
      <section data-section="paper" data-label="Where" className="py-24 sm:py-36">
        <Container>
          <Label>Test centres we cover</Label>
          <ul>
            {testCentres.map((c, i) => (
              <li key={c.id}>
                <RevealText
                  as="p"
                  className={`display text-display ${centreColours[i % centreColours.length]}`}
                  lines={[c.name]}
                />
              </li>
            ))}
          </ul>
          <Rise className="mt-10 max-w-[56ch] text-lg leading-snug">
            Plus the surrounding areas. We practise on the real routes around
            each test centre, so nothing on the day is new.
          </Rise>
        </Container>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        data-section="mist"
        data-label="FAQ"
        className="relative scroll-mt-20 py-24 sm:py-36"
      >
        <Container className="grid gap-12 lg:grid-cols-12">
          <InView className="relative lg:col-span-5">
            <RevealText as="h2" className="display text-heading text-red" lines={["Good", "questions"]} />
            <Bubble emoji="🙋" rot={8} className="-top-10 right-[20%] lg:right-[30%]" />
          </InView>
          <div className="lg:col-span-7">
            {faqs.map((f, i) => (
              <Rise key={f.question} delay={i * 60}>
                <details className="group border-b-2 border-rose/50 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-semibold hover:text-red [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span
                      aria-hidden
                      className="display text-3xl text-red transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[60ch] text-lg leading-snug">{f.answer}</p>
                </details>
              </Rise>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
