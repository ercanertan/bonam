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
  url: string; // canonical origin, no trailing slash
  tagline: string;
  slogan: string;
  phone: string; // display format
  phoneHref: string; // tel: link
  whatsappHref: string;
  instagram: string;
  instagramHandle: string;
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

export type Review = {
  author: string;
  rating: number;
  /** Verbatim from Google; paragraphs separated by a blank line. */
  text: string;
};

export type Step = { title: string; body: string };
export type LearnerType = { title: string; estimate: string; body: string };
export type Faq = { question: string; answer: string };

export const site: SiteSettings = {
  name: "Bonam Driving School",
  url: "https://bonamdrivingschool.com",
  tagline: "Automatic driving lessons in North London",
  slogan: "Turning nervous learners into confident drivers.",
  phone: "07593 242247",
  phoneHref: "tel:+447593242247",
  whatsappHref: "https://wa.me/447593242247",
  instagram: "https://www.instagram.com/bonam_drivingschool",
  instagramHandle: "@bonam_drivingschool",
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

/** Google reviews, copied verbatim from the Google Business Profile (Nov 2026). */
export const googleReviews = {
  rating: 5.0,
  count: 103,
  // TODO: swap for the profile's own "Share" link from Google Maps
  url: "https://www.google.com/search?q=Bonam+Driving+School+%2F+Driving+Lessons+in+North+London+reviews",
  /** Topics Google pulls out of the reviews, with how many mention each. */
  topics: [
    { label: "Confidence building", count: 17 },
    { label: "Supportive instructor", count: 9 },
    { label: "Stress-free lessons", count: 6 },
  ],
  reviews: [
    {
      author: "T M",
      rating: 5,
      text: "Passed first time with Bonam driving school so I think that says it all 😊🙏 I explained that I had Autism and ADHD at the beginning of my learning and Zafer was patient, supportive, and explained different situations in detail so that when it came to exam time, I was prepared and had considered all points the examiner might be analysing. He answered all of my questions and did his best to understand my needs; I felt comfortable to ask for clarification from him. He was kind and helpful, I felt safe, relaxed and confident with his guidance. I would recommend him to others. Thank you, Zafer. 🙏",
    },
    {
      author: "Nicole Serrant",
      rating: 5,
      text: "I honestly couldn’t recommend Zafer at Bonam Driving School highly enough. He is remarkably patient — genuinely, I don’t think I ever saw him lose his cool once, no matter how many mistakes I made (or repeated!). He is always calm, supportive and encouraging.\n\nHe’s also funny and very easy-going, which makes such a difference when you’re learning to drive. Lessons never felt stressful or intimidating; he has a way of putting you completely at ease while still making sure you are learning and progressing.\n\nWhat I particularly appreciated was the way he explains things. Everything is explained in a practical, straightforward and uncomplicated way that makes it easy to understand and, more importantly, easy to remember when you’re actually driving.\n\nZafer is also extremely thorough. He identifies your weaknesses and doesn’t just gloss over them — he spends the time helping you strengthen them until you are genuinely confident. The number of times he had me doing reverse parallel parking repeatedly until I was literally sweating! 😂 But did it pay off? Absolutely.\n\nI passed my test feeling properly prepared, not just prepared enough to get through the test. I would recommend Zafer and Bonam Driving School 100%, without reservation. An excellent instructor and a genuinely lovely person to learn with. 🚗🎉 Thanx Zafer 🙏",
    },
    {
      author: "Gabriella Bavetta",
      rating: 5,
      text: "I passed my driving test!!! This wouldn’t have been possible without the patience from my driving instructor Zafer. He remained calm and patient countless times throughout lessons where I made silly mistakes and got easily distracted by things. He was my second instructor because I had an awful experience with my first one from a different school. I was scared to continue taking lessons but Zafer gave me the confidence I needed to improve. I’m so grateful for finding him. I definitely recommend!!",
    },
    {
      author: "İlkay Şanlıtürk",
      rating: 5,
      text: "I passed my driving test at Enfield Innova Park thanks to Zafer Bey! He is a very patient, professional and supportive instructor. He knows the test routes around Innova Park really well and helped me understand what to expect on the test day. His clear explanations and guidance gave me a lot of confidence. I highly recommend Zafer Bey to anyone preparing for their driving test. Thank you so much for all your help! 🚗👏",
    },
    {
      author: "Ellen Danquah",
      rating: 5,
      text: "Zafer is an outstanding instructor. He is patient, takes the time to explain everything clearly, and helps build your confidence behind the wheel. His teaching style is excellent and easy to follow. As someone who had no prior driving experience, I can honestly say his guidance made all the difference I passed my driving test on the first attempt🫶",
    },
    {
      author: "Shobhna Sharma",
      rating: 5,
      text: "I highly recommend Zafer as a driving instructor. He was always punctual, calm, and encouraging throughout my lessons. He explained manoeuvres and road situations in a way that was easy to understand and gave constructive feedback after each lesson. His patience and support helped me become a much more confident and safe driver. Thank you for all your help!",
    },
    {
      author: "Murat Solak",
      rating: 5,
      text: "I had a great experience learning to drive with Zafer at Bonam Driving School. He was very patient, professional and supportive throughout my lessons, and always explained everything clearly. Thanks to his guidance and teaching, I managed to pass my driving test on my first attempt! I would definitely recommend Zafer and Bonam Driving School to anyone looking for a great driving instructor.",
    },
    {
      author: "Isla Kirkland",
      rating: 5,
      text: "Zafer is such an amazing instructor and helped me pass on my first try. He is so patient and explains everything so clearly. Zafer is great at making you feel completely comfortable from your first lesson and would recommend him to everyone. Thank you so much for everything!!",
    },
  ] satisfies Review[],
};

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

/** "What will the examiner say?" — test-day walkthrough (written for Bonam). */
export type TestStage = {
  title: string;
  /** Short standard phrases you're likely to hear */
  phrases: string[];
  body: string;
};

export const testDay = {
  intro:
    "Knowing what's coming takes a lot of the nerves away. Here's how a typical driving test unfolds, the kind of things your examiner will say at each stage, and what they actually want from you.",
  stages: [
    {
      title: "Meeting your examiner",
      phrases: ["Can I see your licence?", "Would you like your instructor with you?"],
      body: "Your examiner calls your name, checks your licence and asks you to sign a short declaration about insurance and where you live. They'll ask if you'd like your instructor to sit in the back. Decide before the day. Either answer is completely fine.",
    },
    {
      title: "Eyesight & safety questions",
      phrases: ["Please read that number plate", "Tell me how you'd check…"],
      body: "Outside, you'll read a number plate from about 20 metres. You'll be told the test lasts around 40 minutes. Expect one ‘tell me’ question about the car before you set off, and one ‘show me’ task to do while you're driving, like working the screen wash.",
    },
    {
      title: "Following directions",
      phrases: ["Take the next road on the left", "At the roundabout, take the third exit", "Pull up on the left at a safe place"],
      body: "Unless you're told otherwise, follow the road ahead. Directions come in good time and in plain language. At roundabouts, count the exits as you go. When asked to pull up, choose somewhere safe and legal. You decide exactly where.",
    },
    {
      title: "The emergency stop",
      phrases: ["When I raise my hand and say ‘Stop’…"],
      body: "Not every test has one. If yours does, the examiner explains it first, checks it's safe behind, then raises their hand and says “Stop”. Brake firmly and under control. It's only asked once. Afterwards, check all around properly before moving off again.",
    },
    {
      title: "One reversing manoeuvre",
      phrases: ["Reverse into a bay of your choice", "Pull up on the right, then reverse"],
      body: "You'll be asked to do one of these: parallel park, reverse into a bay, drive forward into a bay and reverse out, or pull up on the right and reverse about two car lengths. Go slowly, keep looking all around, and if you need to correct your position, that's allowed.",
    },
    {
      title: "Independent driving",
      phrases: ["Follow the sat nav until I tell you otherwise", "Follow the signs for…"],
      body: "For around 20 minutes you'll follow a sat nav, which the examiner sets up, or road signs to a destination. Taking a wrong turn isn't a fault if you do it safely. The examiner simply gets you back on track. What matters is safe, confident driving.",
    },
    {
      title: "Your result",
      phrases: ["Please switch the engine off", "I'm pleased to tell you…"],
      body: "Back at the centre you'll be asked to switch off while the examiner finishes the paperwork, then they'll give you the result and talk you through your report. Pass, and your full licence can be sent to you automatically. Not this time? We'll go through the report together and plan what's next.",
    },
  ] satisfies TestStage[],
  tips: [
    "Didn't catch something? Ask the examiner to repeat it. Early is best.",
    "You won't be told about mistakes during the test, so don't try to guess how it's going.",
    "One small fault isn't a fail. Stay calm and keep driving your best.",
    "Missed a turn? Carry on safely. A wrong way isn't a driving fault.",
  ],
};
