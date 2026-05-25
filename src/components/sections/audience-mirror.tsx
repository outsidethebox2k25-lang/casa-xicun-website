'use client';

import Image from 'next/image';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/components/primitives/reveal';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { audienceImages } from '@/lib/data';

type Props = {
  eyebrow: string;
  title: string;
  items: { label: string; body: string }[];
};

export function AudienceMirror({ eyebrow, title, items }: Props) {
  return (
    <section className="bg-xicun-cream px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl tracking-tight text-xicun-black md:text-5xl">
            {title}
          </h2>
        </Reveal>

        <Stagger delay={0.1} className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <StaggerItem key={item.label} variants={fadeUp} className="group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={audienceImages[i % audienceImages.length]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover editorial-img transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:brightness-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-xicun-cream via-xicun-cream/20 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display mt-2 text-xl text-xicun-black">{item.label}</h3>
                  <p className="mt-2 text-xs text-xicun-black/75">{item.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
