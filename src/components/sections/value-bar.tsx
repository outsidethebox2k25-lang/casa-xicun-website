'use client';

import { Mountain, Leaf, Wine, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';

type Props = { items: string[] };

const icons = [Mountain, Leaf, Wine, ShieldCheck];

export function ValueBar({ items }: Props) {
  return (
    <Reveal>
      <section className="border-y border-xicun-line bg-xicun-cream pt-32 pb-10 lg:pt-44 lg:pb-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ul className="grid grid-cols-2 gap-px overflow-hidden bg-xicun-line md:grid-cols-4">
            {items.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li
                  key={item}
                  className="flex flex-col items-center gap-3 bg-white px-6 py-7 text-center lg:flex-row lg:text-left"
                >
                  <Icon className="h-5 w-5 flex-none text-xicun-gold" strokeWidth={1.4} />
                  <span className="text-[11px] font-medium uppercase tracking-editorial text-xicun-black/85">
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
