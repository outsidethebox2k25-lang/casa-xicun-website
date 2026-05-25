'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { differenceInCalendarDays, format } from 'date-fns';
import { es as esLocale, enUS } from 'date-fns/locale';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/primitives/button';
import { formatMxn } from '@/lib/cn';

type Labels = {
  perNight: string;
  perBed: string;
  selectDates: string;
  reserve: string;
  youWontBeCharged: string;
  freeCancellation: string;
  bestPrice: string;
  directPerks: string;
  trustRow: string;
  guests: string;
  adults: string;
  children: string;
  subtotal: string;
  serviceFee: string;
  taxes: string;
  total: string;
};

type Props = {
  lang: 'en' | 'es';
  roomSlug: string;
  pricePerNight: number;
  isDorm?: boolean;
  labels: Labels;
};

export function ReservationCard({ lang, roomSlug, pricePerNight, isDorm, labels }: Props) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });

  const nights = useMemo(() => {
    if (range?.from && range?.to) return Math.max(1, differenceInCalendarDays(range.to, range.from));
    return 0;
  }, [range]);

  const subtotal = nights * pricePerNight;
  const service = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.16);
  const total = subtotal + service + taxes;
  const dateLocale = lang === 'es' ? esLocale : enUS;

  const bookHref = `/${lang}/book?room=${roomSlug}${range?.from ? `&checkin=${range.from.toISOString().split('T')[0]}` : ''}${range?.to ? `&checkout=${range.to.toISOString().split('T')[0]}` : ''}&adults=${guests.adults}&children=${guests.children}`;

  return (
    <aside className="rounded-xl border border-xicun-line bg-white p-6 lg:sticky lg:top-28">
      <div className="flex items-baseline justify-between">
        <p className="font-display text-3xl text-xicun-black">{formatMxn(pricePerNight)}</p>
        <span className="text-xs text-xicun-stone">{isDorm ? labels.perBed : labels.perNight}</span>
      </div>

      <div className="mt-5 border border-xicun-line">
        <DayPicker
          mode="range"
          numberOfMonths={1}
          selected={range}
          onSelect={setRange}
          locale={dateLocale}
          disabled={{ before: new Date() }}
          className="!m-0 p-3"
        />
      </div>

      <div className="mt-5 border border-xicun-line">
        <GuestRow
          label={labels.adults}
          value={guests.adults}
          min={1}
          max={6}
          onChange={(v) => setGuests((g) => ({ ...g, adults: v }))}
        />
        <GuestRow
          label={labels.children}
          value={guests.children}
          min={0}
          max={4}
          onChange={(v) => setGuests((g) => ({ ...g, children: v }))}
        />
      </div>

      {nights > 0 && (
        <div className="mt-5 space-y-1.5 border-t border-xicun-line pt-5 text-sm text-xicun-black">
          <Row label={`${formatMxn(pricePerNight)} × ${nights}`} value={formatMxn(subtotal)} />
          <Row label={labels.serviceFee} value={formatMxn(service)} />
          <Row label={labels.taxes} value={formatMxn(taxes)} />
          <div className="mt-3 border-t border-xicun-line pt-3">
            <Row label={labels.total} value={formatMxn(total)} bold />
          </div>
        </div>
      )}

      <Link
        href={bookHref}
        className="mt-6 inline-flex w-full items-center justify-center border border-xicun-gold bg-xicun-gold px-7 py-4 text-[12px] font-medium uppercase tracking-widest-x text-xicun-black transition-colors duration-300 hover:bg-xicun-gold-hov"
      >
        {labels.reserve}
      </Link>

      <p className="mt-3 text-center text-xs text-xicun-stone">{labels.youWontBeCharged}</p>

      <div className="mt-5 flex items-start gap-2 border-t border-xicun-line pt-4 text-[11px] uppercase tracking-editorial text-xicun-stone">
        <ShieldCheck className="mt-0.5 h-3 w-3 flex-none text-xicun-gold" />
        <span>{labels.trustRow}</span>
      </div>
    </aside>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? 'font-display text-base' : ''}`}>
      <span className={bold ? 'text-xicun-black' : 'text-xicun-stone'}>{label}</span>
      <span className={bold ? 'text-xicun-black' : 'text-xicun-black'}>{value}</span>
    </div>
  );
}

function GuestRow({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-xicun-line px-4 py-3 last:border-b-0">
      <span className="text-sm text-xicun-black">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="inline-flex h-7 w-7 items-center justify-center border border-xicun-line text-xicun-gold hover:border-xicun-gold"
        >
          –
        </button>
        <span className="w-6 text-center font-display text-sm text-xicun-black">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="inline-flex h-7 w-7 items-center justify-center border border-xicun-line text-xicun-gold hover:border-xicun-gold"
        >
          +
        </button>
      </div>
    </div>
  );
}
