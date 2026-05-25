'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { MapPin } from 'lucide-react';
import { Hairline } from '@/components/primitives/hairline';
import { pushToGHL, readUTM } from '@/lib/ghl';
import { template } from '@/lib/cn';

type Props = {
  lang: 'en' | 'es';
  tagline: string;
  address: string;
  columns: { stay: string; discover: string; connect: string };
  stay: string[];
  discover: string[];
  connect: string[];
  newsletter: { title: string; body: string; placeholder: string; cta: string; thanks: string };
  rights: string;
  links: string[];
};

export function Footer({
  lang,
  tagline,
  address,
  columns,
  stay,
  discover,
  connect,
  newsletter,
  rights,
  links,
}: Props) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const onSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await pushToGHL({
      type: 'newsletter',
      firstName: '',
      email,
      utm: readUTM(),
    });
    setSent(true);
  };

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-xicun-line bg-xicun-charcoal">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href={`/${lang}`} className="inline-flex items-center gap-3">
              <span className="relative h-10 w-12 overflow-hidden">
                <Image src="/images/logo-alt.png" alt="Casa Xicun" fill sizes="48px" className="object-contain" />
              </span>
              <span className="font-display text-xl text-xicun-black">Casa Xicun</span>
            </Link>
            <p className="mt-6 max-w-xs text-sm text-xicun-stone">{tagline}</p>
            <p className="mt-6 inline-flex items-start gap-2 text-xs uppercase tracking-editorial text-xicun-stone">
              <MapPin className="mt-0.5 h-3 w-3 text-xicun-gold" />
              {address}
            </p>
          </div>

          <FooterCol title={columns.stay}>
            {stay.map((l) => (
              <FooterLink key={l} href={`/${lang}/rooms`}>
                {l}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={columns.discover}>
            <FooterLink href={`/${lang}/the-house`}>{discover[0]}</FooterLink>
            <FooterLink href={`/${lang}/journal`}>{discover[1]}</FooterLink>
            <FooterLink href={`/${lang}/journal`}>{discover[2]}</FooterLink>
            <FooterLink href={`/${lang}/contact`}>{discover[3]}</FooterLink>
            <FooterLink href={`/${lang}/the-house`}>{discover[4]}</FooterLink>
          </FooterCol>

          <FooterCol title={columns.connect}>
            <FooterLink href={`/${lang}/contact`}>{connect[0]}</FooterLink>
            <FooterLink href={`/${lang}/contact`}>{connect[1]}</FooterLink>
            <a
              href="https://instagram.com/casaxicun"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-1.5 text-sm text-xicun-stone transition-colors hover:text-xicun-gold"
            >
              <span className="inline-block h-1 w-1 rounded-full bg-xicun-gold" />
              {connect[2]}
            </a>
          </FooterCol>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-xicun-line pt-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl text-xicun-black">{newsletter.title}</p>
            <p className="mt-2 text-sm text-xicun-stone">{newsletter.body}</p>
          </div>
          <form onSubmit={onSubscribe} className="lg:col-span-7">
            {sent ? (
              <p className="text-sm text-xicun-gold">{newsletter.thanks}</p>
            ) : (
              <div className="flex items-center border border-xicun-gold/60 bg-white">
                <input
                  type="email"
                  required
                  placeholder={newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-5 py-3.5 text-sm text-xicun-black placeholder-xicun-stone outline-none"
                />
                <button
                  type="submit"
                  className="border-l border-xicun-gold/60 bg-xicun-gold px-6 py-3.5 text-[11px] font-medium uppercase tracking-widest-x text-xicun-black transition-colors hover:bg-xicun-gold-hov"
                >
                  {newsletter.cta}
                </button>
              </div>
            )}
          </form>
        </div>

        <Hairline className="mt-12 !w-full opacity-30" />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[11px] uppercase tracking-editorial text-xicun-stone sm:flex-row sm:items-center">
          <p>{template(rights, { year })}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l}>
                <Link href={`/${lang}/contact`} className="transition-colors hover:text-xicun-gold">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="lg:col-span-3 sm:col-span-1">
      <p className="text-[10px] font-medium uppercase tracking-editorial text-xicun-gold">{title}</p>
      <ul className="mt-5 flex flex-col gap-1">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="block py-1.5 text-sm text-xicun-stone transition-colors duration-300 hover:text-xicun-gold"
      >
        {children}
      </Link>
    </li>
  );
}
