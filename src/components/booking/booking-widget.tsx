'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, ChevronDown, Search, Users } from 'lucide-react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { es as esLocale, enUS } from 'date-fns/locale';
import 'react-day-picker/style.css';
import { cn } from '@/lib/cn';

type Labels = {
  checkin: string;
  checkout: string;
  guests: string;
  roomType: string;
  adults: string;
  children: string;
  selectDates: string;
  any: string;
  private: string;
  dorm: string;
  search: string;
};

type Props = {
  lang: 'en' | 'es';
  labels: Labels;
  variant?: 'hero' | 'inline';
};

type GuestState = { adults: number; children: number };

export function BookingWidget({ lang, labels, variant = 'hero' }: Props) {
  const router = useRouter();
  const [openPanel, setOpenPanel] = useState<'dates' | 'guests' | 'room' | null>(null);
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<GuestState>({ adults: 2, children: 0 });
  const [room, setRoom] = useState<'any' | 'private' | 'dorm'>('any');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpenPanel(null);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const dateLocale = lang === 'es' ? esLocale : enUS;
  const formatDate = (d: Date) => format(d, 'MMM d', { locale: dateLocale });

  const onSearch = () => {
    const params = new URLSearchParams();
    if (range?.from) params.set('checkin', range.from.toISOString().split('T')[0]);
    if (range?.to) params.set('checkout', range.to.toISOString().split('T')[0]);
    params.set('guests', String(guests.adults + guests.children));
    params.set('room', room);
    router.push(`/${lang}/rooms?${params.toString()}`);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop: Airbnb-style horizontal pill */}
      <div className="mx-auto hidden w-full max-w-5xl rounded-full bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/5 lg:block">
        <div className="grid grid-cols-[1.1fr_1.1fr_1fr_1fr_auto] items-stretch">
          <SegmentButton
            icon={<CalendarDays className="h-4 w-4 text-xicun-gold" />}
            label={labels.checkin}
            value={range?.from ? formatDate(range.from) : labels.selectDates}
            active={openPanel === 'dates'}
            onClick={() => setOpenPanel(openPanel === 'dates' ? null : 'dates')}
            first
          />
          <SegmentButton
            icon={<CalendarDays className="h-4 w-4 text-xicun-gold" />}
            label={labels.checkout}
            value={range?.to ? formatDate(range.to) : labels.selectDates}
            active={openPanel === 'dates'}
            onClick={() => setOpenPanel(openPanel === 'dates' ? null : 'dates')}
          />
          <SegmentButton
            icon={<Users className="h-4 w-4 text-xicun-gold" />}
            label={labels.guests}
            value={`${guests.adults + guests.children}`}
            active={openPanel === 'guests'}
            onClick={() => setOpenPanel(openPanel === 'guests' ? null : 'guests')}
          />
          <SegmentButton
            icon={<ChevronDown className="h-4 w-4 text-xicun-gold" />}
            label={labels.roomType}
            value={labels[room]}
            active={openPanel === 'room'}
            onClick={() => setOpenPanel(openPanel === 'room' ? null : 'room')}
          />
          <div className="flex items-center pr-2">
            <button
              type="button"
              onClick={onSearch}
              className="inline-flex items-center gap-2 rounded-full bg-xicun-gold px-7 py-4 text-sm font-semibold text-white shadow-[0_8px_22px_-6px_rgba(184,147,47,0.55)] transition-all duration-200 hover:bg-xicun-gold-hov hover:scale-[1.02]"
            >
              <Search className="h-4 w-4" />
              {labels.search}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: stacked rounded card */}
      <div className="mx-5 mb-6 overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] ring-1 ring-black/5 lg:hidden">
        <div className="flex flex-col divide-y divide-xicun-line">
          <SegmentButton
            icon={<CalendarDays className="h-4 w-4 text-xicun-gold" />}
            label={`${labels.checkin} · ${labels.checkout}`}
            value={
              range?.from && range?.to
                ? `${formatDate(range.from)} → ${formatDate(range.to)}`
                : labels.selectDates
            }
            active={openPanel === 'dates'}
            onClick={() => setOpenPanel(openPanel === 'dates' ? null : 'dates')}
          />
          <SegmentButton
            icon={<Users className="h-4 w-4 text-xicun-gold" />}
            label={labels.guests}
            value={`${guests.adults + guests.children}`}
            active={openPanel === 'guests'}
            onClick={() => setOpenPanel(openPanel === 'guests' ? null : 'guests')}
          />
          <SegmentButton
            icon={<ChevronDown className="h-4 w-4 text-xicun-gold" />}
            label={labels.roomType}
            value={labels[room]}
            active={openPanel === 'room'}
            onClick={() => setOpenPanel(openPanel === 'room' ? null : 'room')}
          />
        </div>
        <button
          type="button"
          onClick={onSearch}
          className="inline-flex w-full items-center justify-center gap-2 bg-xicun-gold py-4 text-sm font-semibold text-white transition-colors hover:bg-xicun-gold-hov"
        >
          <Search className="h-4 w-4" />
          {labels.search}
        </button>
      </div>

      {/* Dropdown panels */}
      <AnimatePresence>
        {openPanel === 'dates' && (
          <Panel>
            <DayPicker
              mode="range"
              numberOfMonths={typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1}
              selected={range}
              onSelect={setRange}
              locale={dateLocale}
              disabled={{ before: new Date() }}
            />
          </Panel>
        )}
        {openPanel === 'guests' && (
          <Panel>
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
          </Panel>
        )}
        {openPanel === 'room' && (
          <Panel>
            <div className="grid grid-cols-1 gap-1">
              {(['any', 'private', 'dorm'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRoom(r);
                    setOpenPanel(null);
                  }}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition-colors',
                    room === r ? 'bg-xicun-gold/10 text-xicun-gold' : 'text-xicun-black hover:bg-xicun-line/30',
                  )}
                >
                  {labels[r]}
                  {room === r && <span className="text-xs">●</span>}
                </button>
              ))}
            </div>
          </Panel>
        )}
      </AnimatePresence>
    </div>
  );
}

function SegmentButton({
  icon,
  label,
  value,
  active,
  onClick,
  first,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
  first?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-start gap-1 px-6 py-4 text-left transition-all duration-200',
        first ? 'lg:rounded-l-full' : '',
        active ? 'bg-xicun-line/40 lg:rounded-full' : 'hover:bg-xicun-line/30 lg:hover:rounded-full',
      )}
    >
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-editorial text-xicun-stone">
        {icon}
        {label}
      </div>
      <span className="font-medium text-sm text-xicun-black">{value}</span>
    </button>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-x-0 top-full z-40 mt-3 rounded-2xl rounded-xl border border-xicun-line bg-white p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] lg:p-7"
    >
      {children}
    </motion.div>
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
    <div className="flex items-center justify-between border-b border-xicun-line py-3 last:border-b-0">
      <span className="text-sm text-xicun-black">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-xicun-line text-xicun-gold transition-colors hover:border-xicun-gold"
          aria-label="-"
        >
          –
        </button>
        <span className="w-6 text-center font-semibold text-base text-xicun-black">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-xicun-line text-xicun-gold transition-colors hover:border-xicun-gold"
          aria-label="+"
        >
          +
        </button>
      </div>
    </div>
  );
}
