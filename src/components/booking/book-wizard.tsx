'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DayPicker, type DateRange } from 'react-day-picker';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { es as esLocale, enUS } from 'date-fns/locale';
import { ArrowLeft, ArrowRight, Check, Lock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/primitives/button';
import { rooms, type RoomSlug } from '@/lib/data';
import { formatMxn, template, whatsappLink } from '@/lib/cn';
import { pushToGHL, readUTM } from '@/lib/ghl';

type BookDict = {
  title: string;
  step: string;
  next: string;
  back: string;
  confirm: string;
  steps: { stay: string; details: string; extras: string; review: string };
  stay: { title: string; dates: string; guests: string; room: string; editDates: string };
  details: { title: string; first: string; last: string; email: string; phone: string; arrival: string; notes: string };
  extras: { title: string; subtitle: string; addedSuffix: string };
  review: {
    title: string;
    summary: string;
    extrasSelected: string;
    noExtras: string;
    payment: string;
    paymentNote: string;
    terms: string;
    secureCheckout: string;
  };
  success: { title: string; subtitle: string; addCal: string; whatsapp: string; back: string };
};

type Props = {
  lang: 'en' | 'es';
  dict: {
    book: BookDict;
    rooms: {
      items: Record<RoomSlug, { name: string; bedConfig: string; price: number; maxGuests: number }>;
      filters: { private: string; dorm: string };
    };
    booking: { perNight: string; perBed: string; nights: string; nightsPlural: string; total: string; serviceFee: string; taxes: string; subtotal: string };
    experiencesPage: { items: { slug: string; title: string; summary: string; price: number; duration: string }[] };
    whatsapp: { default: string; room: string };
    topBarPhone: string;
  };
};

export function BookWizard({ lang, dict }: Props) {
  const sp = useSearchParams();
  const initialRoom = (sp?.get('room') as RoomSlug) || 'king-suite';
  const initialAdults = Number(sp?.get('adults') ?? 2);
  const initialChildren = Number(sp?.get('children') ?? 0);
  const initialCheckin = sp?.get('checkin');
  const initialCheckout = sp?.get('checkout');

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationRef, setConfirmationRef] = useState<string>('');
  const [room, setRoom] = useState<RoomSlug>(initialRoom);
  const [range, setRange] = useState<DateRange | undefined>(
    initialCheckin && initialCheckout
      ? { from: parseISO(initialCheckin), to: parseISO(initialCheckout) }
      : undefined,
  );
  const [editingDates, setEditingDates] = useState(false);
  const [guests, setGuests] = useState({ adults: initialAdults, children: initialChildren });
  const [details, setDetails] = useState({ first: '', last: '', email: '', phone: '', arrival: '', notes: '' });
  const [extras, setExtras] = useState<string[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- rehydrate wizard state from sessionStorage on mount */
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('xicun_book');
      if (!stored) return;
      const s = JSON.parse(stored);
      if (s.room) setRoom(s.room);
      if (s.guests) setGuests(s.guests);
      if (s.details) setDetails(s.details);
      if (s.extras) setExtras(s.extras);
    } catch { /* ignore */ }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    try {
      sessionStorage.setItem('xicun_book', JSON.stringify({ room, guests, details, extras }));
    } catch { /* ignore */ }
  }, [room, guests, details, extras]);

  const dateLocale = lang === 'es' ? esLocale : enUS;
  const roomCopy = dict.rooms.items[room];
  const nights = useMemo(() => {
    if (range?.from && range?.to) return Math.max(1, differenceInCalendarDays(range.to, range.from));
    return 0;
  }, [range]);
  const subtotal = nights * roomCopy.price;
  const extrasTotal = dict.experiencesPage.items
    .filter((e) => extras.includes(e.slug))
    .reduce((sum, e) => sum + e.price, 0);
  const service = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.16);
  const total = subtotal + extrasTotal + service + taxes;

  const stepTitles = [dict.book.steps.stay, dict.book.steps.details, dict.book.steps.extras, dict.book.steps.review];

  const canNext = () => {
    if (step === 1) return !!(range?.from && range?.to);
    if (step === 2) return !!(details.first && details.email && details.phone);
    return true;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;
    await pushToGHL({
      type: 'booking_inquiry',
      firstName: details.first,
      lastName: details.last,
      email: details.email,
      phone: details.phone,
      checkin: range?.from?.toISOString().split('T')[0],
      checkout: range?.to?.toISOString().split('T')[0],
      guests: guests.adults + guests.children,
      roomType: roomCopy.name,
      totalMXN: total,
      experiences: extras,
      notes: details.notes,
      utm: readUTM(),
    });
    setConfirmationRef(`XCN-${Date.now().toString(36).toUpperCase().slice(-6)}`);
    setSubmitted(true);
    try { sessionStorage.removeItem('xicun_book'); } catch { /* ignore */ }
  };

  if (submitted) {
    const ref = confirmationRef;
    return (
      <div className="border border-xicun-gold/40 bg-white p-10 lg:p-16">
        <Check className="h-12 w-12 text-xicun-gold" strokeWidth={1.2} />
        <h1 className="font-display mt-6 text-4xl text-xicun-black md:text-5xl">{dict.book.success.title}</h1>
        <p className="mt-3 text-base text-xicun-stone">{dict.book.success.subtitle}</p>
        <p className="mt-6 text-[11px] uppercase tracking-editorial text-xicun-gold">
          {lang === 'es' ? 'Referencia' : 'Reference'} · {ref}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink(
              dict.topBarPhone,
              template(dict.whatsapp.room, {
                room: roomCopy.name,
                checkin: range?.from ? format(range.from, 'MMM d') : '',
                checkout: range?.to ? format(range.to, 'MMM d') : '',
              }),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-xicun-gold bg-xicun-gold px-7 py-3.5 text-xs font-medium uppercase tracking-widest-x text-xicun-black transition-colors hover:bg-xicun-gold-hov"
          >
            <MessageCircle className="h-4 w-4" />
            {dict.book.success.whatsapp}
          </a>
          <Link
            href={`/${lang}`}
            className="inline-flex items-center justify-center gap-2 border border-xicun-line px-7 py-3.5 text-xs font-medium uppercase tracking-widest-x text-xicun-black transition-colors hover:border-xicun-gold hover:text-xicun-gold"
          >
            {dict.book.success.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-xicun-black md:text-4xl">{dict.book.title}</h1>
        <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">
          {template(dict.book.step, { n: step })}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-1 sm:gap-2">
        {stepTitles.map((t, i) => (
          <div key={t} className="flex flex-col gap-2">
            <span
              className={`h-px transition-colors duration-500 ${
                i + 1 <= step ? 'bg-xicun-gold' : 'bg-xicun-line'
              }`}
            />
            <span
              className={`hidden text-[10px] uppercase tracking-editorial sm:block ${
                i + 1 <= step ? 'text-xicun-black' : 'text-xicun-stone'
              }`}
            >
              {t}
            </span>
            <span
              className={`text-[10px] font-semibold sm:hidden ${
                i + 1 <= step ? 'text-xicun-gold' : 'text-xicun-stone'
              }`}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl text-xicun-black">{dict.book.stay.title}</h2>

                {/* Room picker */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {rooms.map((r) => {
                    const c = dict.rooms.items[r.slug as RoomSlug];
                    const active = room === r.slug;
                    return (
                      <button
                        type="button"
                        key={r.slug}
                        onClick={() => setRoom(r.slug as RoomSlug)}
                        className={`border p-4 text-left transition-colors ${
                          active ? 'border-xicun-gold bg-white' : 'border-xicun-line hover:border-xicun-gold/60'
                        }`}
                      >
                        <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">
                          {r.type === 'dorm' ? dict.rooms.filters.dorm : dict.rooms.filters.private}
                        </p>
                        <p className="font-display mt-1 text-lg text-xicun-black">{c.name}</p>
                        <p className="mt-2 text-xs text-xicun-stone">{c.bedConfig}</p>
                        <p className="mt-3 font-display text-sm text-xicun-black">{formatMxn(c.price)}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Dates */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">{dict.book.stay.dates}</p>
                    {range?.from && range?.to && !editingDates && (
                      <button
                        type="button"
                        onClick={() => setEditingDates(true)}
                        className="text-[10px] uppercase tracking-editorial text-xicun-stone underline-offset-2 hover:underline hover:text-xicun-gold"
                      >
                        {dict.book.stay.editDates}
                      </button>
                    )}
                  </div>

                  {(!range?.from || !range?.to || editingDates) ? (
                    <div className="mt-3 overflow-x-auto rounded-2xl border border-xicun-line p-3 sm:p-4">
                      <DayPicker
                        mode="range"
                        numberOfMonths={typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1}
                        selected={range}
                        onSelect={(r) => {
                          setRange(r);
                          if (r?.from && r?.to) setEditingDates(false);
                        }}
                        locale={dateLocale}
                        disabled={{ before: new Date() }}
                      />
                    </div>
                  ) : (
                    <p className="mt-3 font-display text-base text-xicun-black">
                      {format(range.from!, 'PPP', { locale: dateLocale })} → {format(range.to!, 'PPP', { locale: dateLocale })}
                    </p>
                  )}
                </div>

                {/* Guests */}
                <div className="mt-10">
                  <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">{dict.book.stay.guests}</p>
                  <div className="mt-3 border border-xicun-line">
                    <GuestRow label="Adults" value={guests.adults} min={1} max={6} onChange={(v) => setGuests({ ...guests, adults: v })} />
                    <GuestRow label="Children" value={guests.children} min={0} max={4} onChange={(v) => setGuests({ ...guests, children: v })} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl text-xicun-black">{dict.book.details.title}</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field id="first" label={dict.book.details.first} value={details.first} onChange={(v) => setDetails({ ...details, first: v })} required />
                  <Field id="last" label={dict.book.details.last} value={details.last} onChange={(v) => setDetails({ ...details, last: v })} />
                  <Field id="email" label={dict.book.details.email} type="email" value={details.email} onChange={(v) => setDetails({ ...details, email: v })} required />
                  <Field id="phone" label={dict.book.details.phone} type="tel" value={details.phone} onChange={(v) => setDetails({ ...details, phone: v })} required />
                  <div className="md:col-span-2">
                    <Field id="arrival" label={dict.book.details.arrival} value={details.arrival} onChange={(v) => setDetails({ ...details, arrival: v })} />
                  </div>
                  <div className="md:col-span-2">
                    <Field id="notes" label={dict.book.details.notes} as="textarea" rows={4} value={details.notes} onChange={(v) => setDetails({ ...details, notes: v })} />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl text-xicun-black">{dict.book.extras.title}</h2>
                <p className="mt-2 text-sm text-xicun-stone">{dict.book.extras.subtitle}</p>
                <ul className="mt-7 space-y-2">
                  {dict.experiencesPage.items.map((exp) => {
                    const active = extras.includes(exp.slug);
                    return (
                      <li key={exp.slug}>
                        <button
                          type="button"
                          onClick={() =>
                            setExtras(active ? extras.filter((s) => s !== exp.slug) : [...extras, exp.slug])
                          }
                          className={`flex w-full items-center justify-between border p-5 text-left transition-colors ${
                            active ? 'border-xicun-gold bg-white' : 'border-xicun-line hover:border-xicun-gold/50'
                          }`}
                        >
                          <div className="flex-1 pr-4">
                            <p className="font-display text-base text-xicun-black">{exp.title}</p>
                            <p className="mt-1 text-xs text-xicun-stone">{exp.summary}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="font-display text-base text-xicun-black">{formatMxn(exp.price)}</span>
                            <span
                              className={`inline-flex h-5 w-5 items-center justify-center border ${
                                active ? 'border-xicun-gold bg-xicun-gold text-xicun-black' : 'border-xicun-line'
                              }`}
                            >
                              {active && <Check className="h-3 w-3" />}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {step === 4 && (
              <form onSubmit={onSubmit}>
                <h2 className="font-display text-2xl text-xicun-black">{dict.book.review.title}</h2>

                <section className="mt-7 border border-xicun-line p-6">
                  <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">{dict.book.review.summary}</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <Row label={dict.book.stay.room} value={roomCopy.name} />
                    <Row label={dict.book.stay.dates} value={range?.from && range?.to ? `${format(range.from, 'PPP', { locale: dateLocale })} → ${format(range.to, 'PPP', { locale: dateLocale })}` : '—'} />
                    <Row label={dict.book.stay.guests} value={`${guests.adults + guests.children}`} />
                  </div>
                </section>

                <section className="mt-5 border border-xicun-line p-6">
                  <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">{dict.book.review.extrasSelected}</p>
                  {extras.length === 0 ? (
                    <p className="mt-3 text-sm text-xicun-stone">{dict.book.review.noExtras}</p>
                  ) : (
                    <ul className="mt-3 space-y-2 text-sm">
                      {dict.experiencesPage.items
                        .filter((e) => extras.includes(e.slug))
                        .map((e) => (
                          <Row key={e.slug} label={e.title} value={formatMxn(e.price)} />
                        ))}
                    </ul>
                  )}
                </section>

                <section className="mt-5 border border-xicun-line p-6">
                  <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">{dict.book.review.payment}</p>
                  <p className="mt-3 text-sm text-xicun-stone">{dict.book.review.paymentNote}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-editorial text-xicun-stone">
                    <Lock className="h-3 w-3 text-xicun-gold" />
                    {dict.book.review.secureCheckout}
                  </p>
                </section>

                <label className="mt-7 flex items-start gap-3 text-sm text-xicun-black/85">
                  <input
                    type="checkbox"
                    required
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-[var(--color-xicun-gold)]"
                  />
                  {dict.book.review.terms}
                </label>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={!acceptTerms}
                    className="inline-flex w-full items-center justify-center gap-2 border border-xicun-gold bg-xicun-gold px-7 py-4 text-sm font-medium uppercase tracking-widest-x text-xicun-black transition-colors hover:bg-xicun-gold-hov disabled:opacity-50 sm:w-auto"
                  >
                    {dict.book.confirm}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sticky price summary */}
          <aside className="lg:col-span-5">
            <div className="rounded-xl border border-xicun-line bg-white p-6 lg:sticky lg:top-32">
              <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">{dict.book.review.summary}</p>
              <p className="font-display mt-3 text-2xl text-xicun-black">{roomCopy.name}</p>
              {range?.from && range?.to && (
                <p className="mt-1 text-sm text-xicun-stone">
                  {format(range.from, 'MMM d', { locale: dateLocale })} → {format(range.to, 'MMM d', { locale: dateLocale })} ·{' '}
                  {template(nights === 1 ? dict.booking.nights : dict.booking.nightsPlural, { n: nights })}
                </p>
              )}
              <div className="mt-6 space-y-1.5 border-t border-xicun-line pt-4 text-sm">
                {nights > 0 && (
                  <>
                    <Row label={`${formatMxn(roomCopy.price)} × ${nights}`} value={formatMxn(subtotal)} />
                    {extrasTotal > 0 && <Row label={dict.book.review.extrasSelected} value={formatMxn(extrasTotal)} />}
                    <Row label={dict.booking.serviceFee} value={formatMxn(service)} />
                    <Row label={dict.booking.taxes} value={formatMxn(taxes)} />
                  </>
                )}
              </div>
              <div className="mt-4 border-t border-xicun-line pt-4">
                <Row label={dict.booking.total} value={formatMxn(total)} bold />
              </div>
            </div>
          </aside>
        </motion.div>
      </AnimatePresence>

      {/* Step nav */}
      {step < 4 && (
        <div className="mt-12 flex items-center justify-between border-t border-xicun-line pt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-editorial text-xicun-stone transition-colors hover:text-xicun-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {dict.book.back}
            </button>
          ) : (
            <span />
          )}
          <Button
            onClick={() => canNext() && setStep(step + 1)}
            variant="solid"
            size="md"
            disabled={!canNext()}
          >
            {dict.book.next}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? 'font-display text-lg' : ''}`}>
      <span className={bold ? 'text-xicun-black' : 'text-xicun-stone'}>{label}</span>
      <span className="text-xicun-black">{value}</span>
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
          className="inline-flex h-8 w-8 items-center justify-center border border-xicun-line text-xicun-gold hover:border-xicun-gold"
        >
          –
        </button>
        <span className="w-6 text-center font-display text-base text-xicun-black">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="inline-flex h-8 w-8 items-center justify-center border border-xicun-line text-xicun-gold hover:border-xicun-gold"
        >
          +
        </button>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required,
  as = 'input',
  rows,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[10px] font-medium uppercase tracking-editorial text-xicun-gold">{label}</span>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-xl border border-xicun-line bg-white px-4 py-3 text-sm text-xicun-black outline-none transition-colors focus:border-xicun-gold"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-xl border border-xicun-line bg-white px-4 py-3 text-sm text-xicun-black outline-none transition-colors focus:border-xicun-gold"
        />
      )}
    </label>
  );
}
