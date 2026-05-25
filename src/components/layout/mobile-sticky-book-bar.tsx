'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/primitives/button';
import { formatMxn } from '@/lib/cn';

type Props = {
  lang: 'en' | 'es';
  fromPrice: number;
  fromLabel: string;
  perNightLabel: string;
  bookLabel: string;
};

export function MobileStickyBookBar({ lang, fromPrice, fromLabel, perNightLabel, bookLabel }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-xicun-line bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-editorial text-xicun-stone">{fromLabel}</p>
          <p className="font-display text-lg text-xicun-black">
            {formatMxn(fromPrice)}
            <span className="ml-1 text-xs text-xicun-stone">{perNightLabel}</span>
          </p>
        </div>
        <Button href={`/${lang}/book`} size="sm" variant="solid">
          {bookLabel}
        </Button>
      </div>
    </div>
  );
}
