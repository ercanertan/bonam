import Image from "next/image";
import { centreName, type Pass } from "@/content/site";
import { InView } from "@/components/motion/in-view";

/** Rounded photo cards that pop in one after another as they scroll in. */
export function PassGrid({ items }: { items: Pass[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <InView
          as="li"
          key={p.id}
          className="pop group relative aspect-[742/556]"
          style={{ "--delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
        >
          <div className="card-img">
            <Image
              src={p.image}
              alt={`Bonam pupil celebrating passing their driving test at ${centreName(p.testCentre)}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={i < 3 ? "eager" : undefined}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <span className="absolute bottom-4 left-4 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink">
            {centreName(p.testCentre)}
          </span>
        </InView>
      ))}
    </ul>
  );
}
