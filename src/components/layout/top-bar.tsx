import { Phone, ShieldCheck, Star } from 'lucide-react';
import type { Locale } from '@/app/[lang]/dictionaries';

type Props = {
  lang: Locale;
  phone: string;
  bestPrice: string;
  langLabels: { en: string; es: string };
};

export function TopBar({ phone, bestPrice }: Props) {
  return (
    <div className="hidden border-b border-xicun-line bg-white text-[11px] uppercase tracking-editorial text-xicun-stone lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8 py-2.5">
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="inline-flex items-center gap-2 transition-colors hover:text-xicun-gold"
        >
          <Phone className="h-3 w-3" />
          {phone}
        </a>
        <span className="inline-flex items-center gap-2 text-xicun-black/80">
          <ShieldCheck className="h-3 w-3 text-xicun-gold" />
          {bestPrice}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xicun-black/80">
            <Star className="h-3 w-3 fill-xicun-gold text-xicun-gold" strokeWidth={0} />
            4.9
          </span>
          <span className="text-xicun-line">·</span>
          <span>327 reviews</span>
        </span>
      </div>
    </div>
  );
}
