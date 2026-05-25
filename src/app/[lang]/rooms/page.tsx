import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { rooms, type RoomSlug } from '@/lib/data';
import { Reveal } from '@/components/primitives/reveal';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { Button } from '@/components/primitives/button';
import { formatMxn } from '@/lib/cn';

export default async function RoomsPage({ params }: PageProps<'/[lang]/rooms'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <section className="bg-xicun-cream px-5 pt-32 pb-28 lg:px-8 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>{dict.rooms.sectionEyebrow}</SectionEyebrow>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-5xl tracking-tight text-xicun-black md:text-6xl">
            {dict.rooms.sectionTitle}
          </h1>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Filters sidebar (desktop) */}
          <aside className="lg:col-span-3">
            <div className="border border-xicun-line p-6 lg:sticky lg:top-32">
              <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">
                {dict.rooms.filters.title}
              </p>

              <Group label={dict.rooms.filters.roomType}>
                {[dict.rooms.filters.any, dict.rooms.filters.private, dict.rooms.filters.dorm].map(
                  (lbl) => (
                    <FilterChip key={lbl}>{lbl}</FilterChip>
                  ),
                )}
              </Group>

              <Group label={dict.rooms.filters.amenities}>
                {[
                  dict.rooms.filters.wifi,
                  dict.rooms.filters.ac,
                  dict.rooms.filters.mountainView,
                  dict.rooms.filters.privateBath,
                  dict.rooms.filters.cowork,
                ].map((lbl) => (
                  <FilterChip key={lbl}>{lbl}</FilterChip>
                ))}
              </Group>

              <Group label={dict.rooms.filters.sort}>
                {[dict.rooms.filters.popular, dict.rooms.filters.priceAsc, dict.rooms.filters.bestReviewed].map(
                  (lbl) => (
                    <FilterChip key={lbl}>{lbl}</FilterChip>
                  ),
                )}
              </Group>
            </div>
          </aside>

          {/* Rooms grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {rooms.map((room, i) => {
                const slug = room.slug;
                const c = dict.rooms.items[slug as RoomSlug];
                const isDorm = room.type === 'dorm';
                return (
                  <Reveal key={slug} delay={i * 0.08}>
                    <Link
                      href={`/${lang}/rooms/${slug}`}
                      className="group block overflow-hidden rounded-2xl border border-xicun-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={room.image}
                          alt={c.name}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover editorial-img transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-editorial text-xicun-gold shadow-sm backdrop-blur">
                          {isDorm ? dict.rooms.filters.dorm : dict.rooms.filters.private}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-2xl text-xicun-black transition-colors duration-300 group-hover:text-xicun-gold">
                            {c.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-xicun-stone">
                            <Star className="h-3 w-3 fill-xicun-gold text-xicun-gold" strokeWidth={0} />
                            {room.rating} · {room.reviewCount}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-xicun-stone">{c.short}</p>
                        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-editorial text-xicun-stone">
                          {room.amenities.slice(0, 4).map((a) => (
                            <li key={a} className="border border-xicun-line px-2 py-1">
                              {dict.rooms.amenities[a]}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex items-baseline justify-between border-t border-xicun-line pt-4">
                          <p className="font-display text-xl text-xicun-black">
                            {formatMxn(c.price)}
                            <span className="ml-1 text-xs text-xicun-stone">
                              {isDorm ? dict.booking.perBed : dict.booking.perNight}
                            </span>
                          </p>
                          <Button href={`/${lang}/rooms/${slug}`} variant="outline" size="sm">
                            {dict.rooms.viewRoom}
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-xicun-line pt-5">
      <p className="text-[10px] uppercase tracking-editorial text-xicun-stone">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="cursor-pointer border border-xicun-line px-3 py-1.5 text-[11px] uppercase tracking-editorial text-xicun-stone transition-colors hover:border-xicun-gold hover:text-xicun-gold">
      {children}
    </span>
  );
}
