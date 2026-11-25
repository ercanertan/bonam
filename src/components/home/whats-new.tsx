import { InView } from "@/components/motion/in-view";
import { Bubble, RevealText, Rise } from "@/components/motion/reveal";
import { Button, Container, Label } from "@/components/ui";
import { news } from "@/content/site";

function SourceLink({ href, label, light = false }: { href: string; label: string; light?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline ${light ? "text-rose" : "text-red"}`}
    >
      {label}
      <span aria-hidden>↗</span>
      <span className="sr-only">(opens GOV.UK in a new tab)</span>
    </a>
  );
}

/** "What's new" — latest DVSA rule changes and updates. */
export function WhatsNew() {
  const f = news.featured;
  return (
    <section
      id="news"
      data-section="paper"
      data-label="What's new"
      className="scroll-mt-20 py-24 sm:py-36"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Label>DVSA news & updates</Label>
            <InView className="relative inline-block">
              <RevealText
                className="display text-heading-lg"
                lines={["What’s", { text: "new", className: "text-red" }]}
              />
              <Bubble emoji="📣" rot={-8} className="top-2 -right-20 sm:-right-24" />
            </InView>
          </div>
          <Rise className="max-w-[46ch] text-lg leading-snug lg:col-span-5">
            The rules around booking your test changed in 2026. Here&rsquo;s a
            plain-English round-up, checked against GOV.UK on {news.checked}.
          </Rise>
        </div>

        {/* Featured: 2026 booking rules */}
        <Rise className="mt-14 rounded-[var(--radius-card)] bg-ink p-7 text-paper sm:p-10 lg:p-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-red px-4 py-1.5 text-sm font-bold tracking-wide uppercase">
              {f.tag}
            </span>
          </div>
          <h3 className="display mt-6 text-heading-sm">{f.title}</h3>
          <p className="mt-4 max-w-[60ch] text-lg leading-snug text-paper/85">{f.summary}</p>

          <ol className="mt-10 grid gap-8 border-t border-paper/15 pt-10 md:grid-cols-3 md:gap-10">
            {f.rules.map((r, i) => (
              <li key={r.title}>
                <span className="inline-block rounded-full bg-paper px-3.5 py-1 text-sm font-bold text-red">
                  Since {r.date}
                </span>
                <p className="display mt-4 text-subheading">
                  <span className="text-rose">0{i + 1} </span>
                  {r.title}
                </p>
                <p className="mt-3 text-base leading-snug text-paper/85">{r.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-8 rounded-[1.25rem] bg-red p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="display text-subheading">What this means for you</p>
              <ul className="mt-4 space-y-2.5">
                {f.forYou.map((t) => (
                  <li key={t} className="flex gap-3 text-base leading-snug">
                    <span aria-hidden className="font-bold">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
              <Button href="/contact" variant="light">
                Book your lessons today
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <SourceLink href={f.source.url} label={`Source: ${f.source.label}`} light />
          </div>
        </Rise>

        {/* Smaller updates */}
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {news.items.map((n, i) => (
            <Rise
              as="li"
              key={n.id}
              delay={i * 100}
              className="flex flex-col rounded-[var(--radius-card)] bg-mist p-7 sm:p-9"
            >
              <span className="text-sm font-bold tracking-wide text-red uppercase">
                {n.tag} · {n.date}
              </span>
              <h3 className="display mt-4 text-subheading">{n.title}</h3>
              <p className="mt-3 flex-1 text-base leading-snug">{n.summary}</p>
              <div className="mt-6">
                <SourceLink href={n.source.url} label={`Read on ${n.source.label}`} />
              </div>
            </Rise>
          ))}
        </ul>
      </Container>
    </section>
  );
}
