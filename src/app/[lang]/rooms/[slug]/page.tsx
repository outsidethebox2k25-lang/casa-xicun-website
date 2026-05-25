import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { getDictionary, hasLocale, type Locale } from '../../dictionaries';
import { rooms, type RoomSlug } from '@/lib/data';
import { ReservationCard } from '@/components/booking/reservation-card';
import { Reveal } from '@/components/primitives/reveal';
import { SectionEyebrow } from '@/components/primitives/hairline';

export async function generateStaticParams() {
  const slugs = rooms.map((r) => r.slug);
  return ['en', 'es'].flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export default async function RoomDetail({ params }: PageProps<'/[lang]/rooms/[slug]'>) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();
  const dict = await getDictionary(lang as Locale);
  const c = dict.rooms.items[slug as RoomSlug];
  const isDorm = room.type === 'dorm';

  return (
    <section className="bg-xicun-cream px-5 pt-28 pb-28 lg:px-8 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>{isDorm ? dict.rooms.filters.dorm : dict.rooms.filters.private}</SectionEyebrow>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-5xl tracking-tight text-xicun-black md:text-6xl">
            {c.name}
          </h1>
          <p className="mt-5 text-[11px] uppercase tracking-editorial text-xicun-stone">
            {c.bedConfig} · {c.maxGuests} {dict.booking.guests.toLowerCase()} · {c.sizeM2} m² ·
            <span className="ml-2 inline-flex items-center gap-1 text-xicun-black">
              <Star className="h-3 w-3 fill-xicun-gold text-xicun-gold" strokeWidth={0} />
              {room.rating} · {room.reviewCount}
            </span>
          </p>
        </Reveal>

        {/* Gallery */}
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-4 md:grid-rows-2">
            <div className="relative aspect-[4/3] overflow-hidden md:col-span-2 md:row-span-2 md:aspect-auto">
              <Image src={room.gallery[0]} alt={c.name} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover editorial-img" />
            </div>
            {room.gallery.slice(1, 5).map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden">
                <Image src={src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover editorial-img" />
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-2xl text-xicun-black">
                {lang === 'es' ? 'Sobre la habitación' : 'About this room'}
              </h2>
              <div className="mt-5 space-y-5">
                {c.long.map((p) => (
                  <p key={p} className="text-base leading-relaxed text-xicun-black/85">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="font-display mt-14 text-xl text-xicun-black">
                {lang === 'es' ? 'Amenidades' : 'Amenities'}
              </h3>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-3 border-b border-xicun-line py-3 text-sm text-xicun-black"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-xicun-gold" />
                    {dict.rooms.amenities[a]}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="font-display mt-14 text-xl text-xicun-black">
                {lang === 'es' ? 'Por dentro' : 'Inside the room'}
              </h3>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {room.gallery.slice(0, 3).map((src) => (
                  <div key={src} className="relative aspect-square overflow-hidden">
                    <Image src={src} alt="" fill sizes="33vw" className="object-cover editorial-img" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <ReservationCard
              lang={lang as Locale}
              roomSlug={slug}
              pricePerNight={c.price}
              isDorm={isDorm}
              labels={dict.booking}
            />
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-24 border-t border-xicun-line pt-10">
            <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">
              {lang === 'es' ? 'También te puede gustar' : 'You might also like'}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {rooms
                .filter((r) => r.slug !== slug)
                .slice(0, 3)
                .map((r) => {
                  const oc = dict.rooms.items[r.slug as RoomSlug];
                  return (
                    <Link key={r.slug} href={`/${lang}/rooms/${r.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image src={r.image} alt={oc.name} fill sizes="33vw" className="object-cover editorial-img transition-transform duration-[1200ms] group-hover:scale-[1.04]" />
                      </div>
                      <p className="font-display mt-3 text-base text-xicun-black group-hover:text-xicun-gold">
                        {oc.name}
                      </p>
                      <p className="text-xs text-xicun-stone">{oc.short}</p>
                    </Link>
                  );
                })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
