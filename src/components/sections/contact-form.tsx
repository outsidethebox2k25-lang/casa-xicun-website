'use client';

import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/primitives/button';
import { pushToGHL, readUTM } from '@/lib/ghl';

type Dict = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submit: string;
  sent: string;
};

export function ContactForm({ dict }: { dict: Dict }) {
  const [sent, setSent] = useState(false);
  const [d, setD] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await pushToGHL({
      type: 'contact',
      firstName: d.name,
      email: d.email,
      phone: d.phone,
      notes: `${d.subject ? d.subject + '\n' : ''}${d.message}`,
      utm: readUTM(),
    });
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-xicun-gold/40 bg-white p-12 text-center">
        <p className="font-display text-3xl text-xicun-black">{dict.sent}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-xicun-line bg-white p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field id="name" label={dict.name} value={d.name} onChange={(v) => setD({ ...d, name: v })} required />
        <Field id="email" label={dict.email} type="email" value={d.email} onChange={(v) => setD({ ...d, email: v })} required />
        <Field id="phone" label={dict.phone} type="tel" value={d.phone} onChange={(v) => setD({ ...d, phone: v })} />
        <Field id="subject" label={dict.subject} value={d.subject} onChange={(v) => setD({ ...d, subject: v })} />
        <div className="md:col-span-2">
          <Field id="message" label={dict.message} as="textarea" rows={5} value={d.message} onChange={(v) => setD({ ...d, message: v })} />
        </div>
      </div>
      <div className="mt-7">
        <Button type="submit" variant="solid" size="md" className="w-full sm:w-auto">
          <Send className="h-3.5 w-3.5" />
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
