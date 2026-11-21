/**
 * Static content for the Bonam Driving School site.
 *
 * Every export here is shaped like a future Sanity document/type, so the
 * Sanity migration is mostly: define matching schemas, then swap these
 * imports for GROQ queries in `src/content/queries.ts`.
 *
 * Anything marked `TODO` is placeholder copy — replace with real details.
 */

export type SiteSettings = {
  name: string;
  tagline: string;
  slogan: string;
  phone: string; // display format
  phoneHref: string; // tel: link
  whatsappHref: string;
  email: string;
  area: string;
  instructor: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  highlight?: boolean;
};

export type TestCentre = {
  id: string;
  name: string;
};

export type Pass = {
  id: string;
  image: string;
  name?: string; // student first name, only with permission
  testCentre: TestCentre["id"];
  /** Horizontal focal point (0–100) for portrait crops of the 4:3 photo */
  focusX: number;
  firstTime?: boolean;
};

export type Step = { title: string; body: string };
export type LearnerType = { title: string; estimate: string; body: string };
export type Faq = { question: string; answer: string };

export const site: SiteSettings = {
  name: "Bonam Driving School",
  tagline: "Automatic driving lessons in North London",
  slogan: "Turning nervous learners into confident drivers.",
  phone: "07593 242247",
  phoneHref: "tel:+447593242247",
  whatsappHref: "https://wa.me/447593242247",
  email: "hello@bonamdrivingschool.co.uk",
  area: "Barnet · Tottenham · Wood Green · Enfield",
  instructor: "Your instructor", // TODO: instructor name
};

export const testCentres: TestCentre[] = [
  { id: "barnet", name: "Barnet" },
  { id: "enfield", name: "Enfield" },
  { id: "tottenham", name: "Tottenham" },
  { id: "wood-green", name: "Wood Green" },
  { id: "chingford", name: "Chingford" },
];

/** Intro copy (from the Bonam brief). */
export const about = {
  lead: "We specialise in automatic driving lessons, with patient, professional and supportive instruction for learners of all abilities, especially if you feel nervous, anxious or afraid of driving.",
  body: "Our aim is not just to help you pass your test, but to help you become a safe, confident, independent driver for life. Complete beginner, returning after a break, or struggling with nerves: we guide you at your own pace, in a calm and encouraging environment.",
  points: [
    "Professional, patient and friendly instruction",
    "Lessons tailored to your individual needs",
    "Support for nervous and anxious learners",
    "Build confidence at your own pace",
    "Automatic driving lessons",
  ],
};

/** "How many lessons do I need?" — from the Bonam brief. */
export const lessonsNeeded = {
  intro:
    "It depends on your previous experience, your confidence, and how quickly you develop the skills. Every learner is different, so there is no fixed number.",
  outro:
    "Our priority is to help you become a safe, confident driver and prepare you properly for your driving test.",
  types: [
    {
      title: "Complete beginners",
      estimate: "≈25 hrs",
      body: "Never driven before? You may need around 25 hours of professional lessons to build your skills and confidence. It's a rough estimate, and some learners need more time.",
    },
    {
      title: "Driven before",
      estimate: "Fewer",
      body: "Driven in the UK or abroad? You may need fewer lessons. We'll assess your current driving and focus on the areas that need work.",
    },
    {
      title: "Nervous learners",
      estimate: "Your pace",
      body: "Scared, nervous or lacking confidence behind the wheel? Don't worry. We take it step by step, at your pace, until you feel comfortable and confident.",
    },
  ] satisfies LearnerType[],
};

// Lesson options (no prices shown on the site)
export const lessons: Lesson[] = [
  {
    id: "single",
    title: "Single lesson",
    description:
      "One-to-one automatic lesson, tailored to your needs and taken at your pace.",
  },
  {
    id: "block-10",
    title: "10-hour block",
    description:
      "Our most popular way to learn. Book in bulk, save money, keep momentum.",
    highlight: true,
  },
  {
    id: "test-day",
    title: "Test-day package",
    description:
      "Warm-up lesson before your test and use of the instructor's car on the day.",
  },
  {
    id: "refresher",
    title: "Refresher & pass plus",
    description:
      "Already licensed? Rebuild confidence on motorways, at night or in London traffic.",
  },
];

// [test centre, focal x%] per photo — focal point keeps the pupil in frame
const photoMeta: Record<number, [TestCentre["id"], number]> = {
  1: ["chingford", 70],
  2: ["enfield", 40],
  3: ["barnet", 30],
  4: ["barnet", 42],
  5: ["barnet", 60],
  6: ["barnet", 24],
  7: ["enfield", 65],
  8: ["tottenham", 64],
  9: ["enfield", 26],
  10: ["barnet", 78],
  11: ["barnet", 30],
  12: ["tottenham", 38],
  13: ["chingford", 68],
  14: ["barnet", 45],
  15: ["enfield", 74],
  16: ["barnet", 62],
  17: ["barnet", 72],
  18: ["barnet", 68],
  19: ["barnet", 46],
};

export const passes: Pass[] = Object.entries(photoMeta).map(
  ([n, [centre, focusX]]) => ({
    id: `pass-${n.padStart(2, "0")}`,
    image: `/images/passes/pass-${n.padStart(2, "0")}.webp`,
    testCentre: centre,
    focusX,
  }),
);

/** The three photos stacked in the hero (front card first). */
export const heroPassIds = ["pass-13", "pass-05", "pass-19"];

export function passById(id: string) {
  return passes.find((p) => p.id === id)!;
}

export function centreName(id: TestCentre["id"]) {
  return testCentres.find((c) => c.id === id)?.name ?? id;
}

export const steps: Step[] = [
  {
    title: "Get in touch",
    body: "Call, WhatsApp or email. Tell us where you are, how much driving you've done and how you feel about it.",
  },
  {
    title: "Learn at your pace",
    body: "Patient one-to-one automatic lessons on real North London test routes, step by step, at your pace.",
  },
  {
    title: "Pass with confidence",
    body: "Mock tests on the routes you'll actually drive, then a warm-up lesson on the day.",
  },
];

// TODO: review answers
export const faqs: Faq[] = [
  {
    question: "Which test centres do you cover?",
    answer:
      "Barnet, Enfield, Tottenham, Wood Green and Chingford, plus the surrounding areas. We practise on the real routes around each centre.",
  },
  {
    question: "I'm nervous. Is that okay?",
    answer:
      "Completely. We specialise in nervous and anxious learners. We take things step by step, at your own pace, in a calm and encouraging environment.",
  },
  {
    question: "Can I use your car for my test?",
    answer:
      "Yes. Book the test-day package and you'll have a warm-up lesson and the car for your test.",
  },
];
