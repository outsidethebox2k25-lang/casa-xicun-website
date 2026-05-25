'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/components/primitives/reveal';
import { Button } from '@/components/primitives/button';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { destinationImage } from '@/lib/data';

type Props = {
  lang: 'en' | 'es';
  eyebrow: string;
  pullquote: string;
  items: { label: string; body: string }[];
  cta: string;
};

export function Destination({ lang, eyebrow, pullquote, items, cta }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-xicun-cream px-5 py-20 sm:py-24 lg:px-8 lg:py-36">
      <div className="absolute inset-0 -z-10 opacity-25">
        <Image src={destinationImage} alt="" fill sizes="100vw" className="object-cover editorial-img" />
        <span className="absolute inset-0 bg-gradient-to-b from-xicun-cream via-xicun-cream/85 to-xicun-cream" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <SectionEyebrow className="justify-center">{eyebrow}</SectionEyebrow>
          <p className="font-display mt-10 text-balance text-3xl leading-snug text-xicun-black md:text-5xl lg:text-6xl">
            "{pullquote}"
          </p>
        </Reveal>

        <Stagger delay={0.15} className="mt-20 grid grid-cols-1 gap-px overflow-hidden bg-xicun-line text-left md:grid-cols-3">
          {items.map((item) => (
            <StaggerItem
              key={item.label}
              variants={fadeUp}
              className="bg-white/95 p-7 backdrop-blur"
            >
              <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">{item.label}</p>
              <p className="font-display mt-3 text-xl text-xicun-black">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <div className="mt-14 flex justify-center">
            <Button href={`/${lang}/journal`} variant="outline" size="md">
              {cta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
