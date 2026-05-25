'use client';

import { Mountain, Leaf, Wine, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';

type Props = { items: string[] };

const icons = [Mountain, Leaf, Wine, ShieldCheck];

export function ValueBar({ items }: Props) {
  return (
    <Reveal>
      <section className="border-y border-xicun-line bg-xicun-cream py-10 sm:py-12 lg:pt-44 lg:pb-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-xicun-line bg-xicun-line shadow-sm md:grid-cols-4">
            {items.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li
                  key={item}
                  className="flex flex-col items-center gap-2.5 bg-white px-4 py-5 text-center sm:px-6 sm:py-7 lg:flex-row lg:gap-3 lg:text-left"
                >
                  <Icon className="h-5 w-5 flex-none text-xicun-gold" strokeWidth={1.4} />
                  <span className="text-[10px] font-semibold uppercase tracking-editorial text-xicun-black/85 sm:text-[11px]">
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
