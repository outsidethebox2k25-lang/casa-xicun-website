'use client';

import { Quote, Star } from 'lucide-react';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/components/primitives/reveal';

type Testimonial = { quote: string; name: string; country: string; roomType: string; date: string };

type Props = {
  stat: string;
  featured: string;
  publications: string[];
  testimonials: Testimonial[];
};

export function SocialProof({ stat, featured, publications, testimonials }: Props) {
  return (
    <section className="border-y border-xicun-line bg-white px-5 py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-display text-3xl text-xicun-black md:text-4xl">{stat}</p>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-xicun-gold text-xicun-gold" strokeWidth={0} />
              ))}
            </div>
          </div>
        </Reveal>

        <Stagger delay={0.15} className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-xicun-line md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem
              key={t.name + t.date}
              variants={fadeUp}
              className="flex h-full flex-col gap-5 bg-white p-7"
            >
              <Quote className="h-6 w-6 text-xicun-gold/70" strokeWidth={1.2} />
              <p className="flex-1 text-base leading-relaxed text-xicun-black">"{t.quote}"</p>
              <div className="border-t border-xicun-line pt-4">
                <p className="font-display text-base text-xicun-black">{t.name}</p>
                <p className="text-[11px] uppercase tracking-editorial text-xicun-stone">
                  {t.country} · {t.roomType} · {t.date}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col items-center gap-5 border-t border-xicun-line pt-10">
            <p className="text-[10px] uppercase tracking-editorial text-xicun-stone">{featured}</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
              {publications.map((p) => (
                <li
                  key={p}
                  className="font-display text-base text-xicun-black/70 md:text-lg"
                  style={{ filter: 'grayscale(1)' }}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
