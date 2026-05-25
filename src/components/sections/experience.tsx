'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/components/primitives/reveal';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { Button } from '@/components/primitives/button';
import { experienceImage } from '@/lib/data';

type Props = {
  lang: 'en' | 'es';
  eyebrow: string;
  title: string;
  intro: string;
  items: { title: string; body: string }[];
  cta: string;
};

export function ExperienceSection({ lang, eyebrow, title, intro, items, cta }: Props) {
  return (
    <section className="relative bg-white px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={experienceImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover editorial-img"
            />
            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-xicun-cream/70 to-transparent" />
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:pt-12">
          <Reveal>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl tracking-tight text-xicun-black md:text-5xl">
              {title}
            </h2>
            <p className="mt-6 max-w-md text-base text-xicun-stone">{intro}</p>
          </Reveal>

          <Stagger delay={0.1} className="mt-12 space-y-7">
            {items.map((item, i) => (
              <StaggerItem
                key={item.title}
                variants={fadeUp}
                className="grid grid-cols-[auto_1fr] gap-5 border-t border-xicun-line pt-5"
              >
                <span className="font-display text-base text-xicun-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg text-xicun-black">{item.title}</h3>
                  <p className="mt-1 text-sm text-xicun-stone">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <Button href={`/${lang}/experiences`} variant="outline" size="md">
                {cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
