'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/components/primitives/reveal';
import { shimmer } from '@/lib/blur';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { Button } from '@/components/primitives/button';
import { rooms, type RoomSlug } from '@/lib/data';
import { formatMxn } from '@/lib/cn';

type RoomCopy = { name: string; short: string; bedConfig: string; maxGuests: number; sizeM2: number; price: number };

type Props = {
  lang: 'en' | 'es';
  eyebrow: string;
  title: string;
  seeAllLabel: string;
  fromLabel: string;
  perNightLabel: string;
  perBedLabel: string;
  copy: Record<RoomSlug, RoomCopy>;
};

export function RoomsGrid({ lang, eyebrow, title, seeAllLabel, perNightLabel, perBedLabel, copy }: Props) {
  const featured: RoomSlug[] = ['king-suite', 'boho-double', 'social-dorm'];

  return (
    <section className="relative bg-xicun-cream px-5 py-16 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl tracking-tight text-xicun-black md:text-5xl lg:text-6xl">
            {title}
          </h2>
        </Reveal>

        <Stagger delay={0.15} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((slug, i) => {
            const room = rooms.find((r) => r.slug === slug)!;
            const c = copy[slug];
            const isDorm = room.type === 'dorm';
            return (
              <StaggerItem key={slug} variants={fadeUp}>
                <Link
                  href={`/${lang}/rooms/${slug}`}
                  className="group block"
                  aria-label={c.name}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={room.image}
                      alt={c.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      placeholder="blur"
                      blurDataURL={shimmer(800, 1000)}
                      className="object-cover editorial-img transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="pt-5">
                    <p className="text-[10px] uppercase tracking-editorial text-xicun-stone">
                      {String(i + 1).padStart(2, '0')} · {isDorm ? 'Shared' : 'Private'}
                    </p>
                    <h3 className="font-display mt-1 text-2xl text-xicun-black transition-colors duration-300 group-hover:text-xicun-gold">
                      <span className="relative">
                        {c.name}
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-xicun-gold transition-all duration-[600ms] group-hover:w-full" />
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-xicun-stone">{c.short}</p>
                    <p className="mt-4 font-display text-base text-xicun-black">
                      {formatMxn(c.price)}
                      <span className="ml-1 text-xs text-xicun-stone">
                        {isDorm ? perBedLabel : perNightLabel}
                      </span>
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.2}>
          <div className="mt-14 flex justify-center">
            <Button href={`/${lang}/rooms`} variant="ghost" size="md">
              {seeAllLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
