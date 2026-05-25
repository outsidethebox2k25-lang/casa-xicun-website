'use client';

import Image from 'next/image';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/components/primitives/reveal';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { galleryPhotos } from '@/lib/data';

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

const layout: { idx: number; col?: string; row?: string }[] = [
  { idx: 0, col: 'md:col-span-2', row: 'md:row-span-2' },
  { idx: 1 },
  { idx: 2 },
  { idx: 3, col: 'md:col-span-2' },
  { idx: 4 },
  { idx: 5 },
  { idx: 6, row: 'md:row-span-2' },
  { idx: 7 },
  { idx: 8 },
  { idx: 9, col: 'md:col-span-2' },
  { idx: 10 },
  { idx: 11 },
];

export function Gallery({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="bg-xicun-cream px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display mt-5 max-w-3xl text-balance text-4xl tracking-tight text-xicun-black md:text-5xl lg:text-6xl">
            {title}
          </h2>
          {subtitle && <p className="mt-4 max-w-xl text-base text-xicun-stone">{subtitle}</p>}
        </Reveal>

        <Stagger
          delay={0.06}
          className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4"
        >
          {layout
            .filter((tile) => tile.idx < galleryPhotos.length)
            .map((tile, i) => (
              <StaggerItem
                key={tile.idx}
                variants={fadeUp}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className={[
                  'group relative overflow-hidden rounded-2xl bg-xicun-line shadow-sm',
                  tile.col ?? '',
                  tile.row ?? '',
                ].join(' ')}
              >
                <Image
                  src={galleryPhotos[tile.idx]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover editorial-img transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-editorial text-xicun-black opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                  {String(i + 1).padStart(2, '0')} · Casa Xicun
                </span>
              </StaggerItem>
            ))}
        </Stagger>
      </div>
    </section>
  );
}
