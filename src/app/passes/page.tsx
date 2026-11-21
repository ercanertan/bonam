import type { Metadata } from "next";
import { PassGrid } from "@/components/pass-grid";
import { RevealText } from "@/components/motion/reveal";
import { Button, Container, Label } from "@/components/ui";
import { passes } from "@/content/site";

export const metadata: Metadata = {
  title: "Pass gallery",
  description:
    "Real Bonam Driving School pupils on the day they passed their driving test in Barnet, Enfield, Tottenham and Chingford.",
};

export default function PassesPage() {
  return (
    <>
      <section data-section="paper" data-label="Passed" className="pt-32 pb-16 sm:pt-40">
        <Container>
          <Label>Pass gallery · {passes.length} and counting</Label>
          <RevealText
            as="h1"
            className="display text-display text-red"
            lines={["Passed."]}
          />
          <p className="mt-8 max-w-[52ch] text-lg leading-snug sm:text-xl">
            Every photo is a real Bonam pupil, certificate in hand, at their
            North London test centre.
          </p>
        </Container>
      </section>
      <section data-section="paper" data-label="Passed">
        <Container>
          <PassGrid items={passes} />
        </Container>
      </section>
      <section data-section="mist" data-label="" className="py-24 sm:py-32">
        <Container>
          <RevealText
            className="display text-heading"
            lines={["Your photo", { text: "goes here", className: "text-red" }]}
          />
          <div className="mt-8">
            <Button href="/contact">Book a lesson</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
