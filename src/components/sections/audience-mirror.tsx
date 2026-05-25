'use client';

import Image from 'next/image';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/components/primitives/reveal';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { audienceImages } from '@/lib/data';
import { shimmer } from '@/lib/blur';

type Props = {
  eyebrow: string;
  title: string;
  items: { label: string; body: string }[];
};

export function AudienceMirror({ eyebrow, title, items }: Props) {
  return (
    <section className="bg-xicun-cream px-5 py-16 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl tracking-tight text-xicun-black md:text-5xl">
            {title}
          </h2>
        </Reveal>

        <Stagger delay={0.1} className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <StaggerItem key={item.label} variants={fadeUp} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
                <Image
                  src={audienceImages[i % audienceImages.length]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  placeholder="blur"
                  blurDataURL={shimmer(400, 533)}
                  className="object-cover editorial-img transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex h-7 items-center rounded-full bg-white/95 px-2.5 text-[10px] font-semibold uppercase tracking-editorial text-xicun-gold backdrop-blur">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-xl text-white">{item.label}</h3>
                  <p className="mt-1.5 text-xs text-white/85">{item.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
