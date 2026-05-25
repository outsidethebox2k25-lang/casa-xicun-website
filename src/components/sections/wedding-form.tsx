'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/primitives/button';
import { pushToGHL, readUTM } from '@/lib/ghl';

type Dict = {
  title: string;
  subtitle: string;
  name: string;
  email: string;
  phone: string;
  guests: string;
  dates: string;
  notes: string;
  submit: string;
  sent: string;
};

export function WeddingForm({ dict }: { dict: Dict }) {
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({ name: '', email: '', phone: '', guests: '', dates: '', notes: '' });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await pushToGHL({
      type: 'wedding_group',
      firstName: data.name,
      email: data.email,
      phone: data.phone,
      guests: data.guests ? Number(data.guests) : undefined,
      notes: `Dates: ${data.dates}\n${data.notes}`,
      utm: readUTM(),
    });
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-xicun-gold/40 bg-white p-10 text-center">
        <p className="font-display text-2xl text-xicun-black">{dict.sent}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field id="name" label={dict.name} value={data.name} onChange={(v) => setData({ ...data, name: v })} required />
      <Field id="email" label={dict.email} type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} required />
      <Field id="phone" label={dict.phone} type="tel" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} />
      <Field id="guests" label={dict.guests} value={data.guests} onChange={(v) => setData({ ...data, guests: v })} />
      <div className="sm:col-span-2">
        <Field id="dates" label={dict.dates} value={data.dates} onChange={(v) => setData({ ...data, dates: v })} />
      </div>
      <div className="sm:col-span-2">
        <Field id="notes" label={dict.notes} value={data.notes} onChange={(v) => setData({ ...data, notes: v })} as="textarea" rows={4} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" variant="solid" size="md" className="w-full sm:w-auto">
          {dict.submit}
        </Button>
      </div>
    </form>
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
