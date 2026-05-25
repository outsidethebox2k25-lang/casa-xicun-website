'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/primitives/button';
import { cn } from '@/lib/cn';
import { LangSwitcher } from './lang-switcher';

type Props = {
  lang: 'en' | 'es';
  labels: {
    rooms: string;
    experiences: string;
    house: string;
    journal: string;
    contact: string;
    book: string;
    openMenu: string;
    closeMenu: string;
  };
  langLabels: { en: string; es: string };
  transparentOnTop?: boolean;
};

export function Nav({ lang, labels, langLabels, transparentOnTop = true }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close menu on route change
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: `/${lang}/rooms`, label: labels.rooms },
    { href: `/${lang}/experiences`, label: labels.experiences },
    { href: `/${lang}/the-house`, label: labels.house },
    { href: `/${lang}/journal`, label: labels.journal },
    { href: `/${lang}/contact`, label: labels.contact },
  ];

  const solid = scrolled || !transparentOnTop || open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        solid
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 lg:px-8">
        <Link
          href={`/${lang}`}
          className="group flex items-center gap-3"
          aria-label="Casa Xicun"
        >
          <AnimatePresence mode="wait" initial={false}>
            {solid ? (
              <motion.span
                key="solid-logo"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="relative h-10 w-12 overflow-hidden"
              >
                <Image
                  src="/images/logo-alt.png"
                  alt="Casa Xicun"
                  fill
                  sizes="48px"
                  className="object-contain"
                  priority
                />
              </motion.span>
            ) : null}
          </AnimatePresence>
          <span
            className={cn(
              'font-display text-xl font-medium tracking-tight transition-colors duration-300',
              solid ? 'text-xicun-black' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]',
            )}
          >
            Casa Xicun
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'group relative text-[11px] font-semibold uppercase tracking-editorial transition-colors duration-300',
                solid
                  ? 'text-xicun-black/80 hover:text-xicun-gold'
                  : 'text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] hover:text-xicun-gold',
              )}
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-xicun-gold transition-all duration-[400ms] group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitcher
            current={lang}
            labels={langLabels}
            tone={solid ? 'light' : 'dark'}
            className="hidden sm:inline-flex"
          />
          <Button href={`/${lang}/book`} variant="solid" size="sm" className="hidden lg:inline-flex">
            {labels.book}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition-colors lg:hidden',
              solid
                ? 'border-xicun-line bg-white text-xicun-black'
                : 'border-white/30 bg-black/30 text-white',
            )}
            aria-label={open ? labels.closeMenu : labels.openMenu}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-t border-xicun-line bg-white px-5 py-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block py-3 text-xs font-semibold uppercase tracking-editorial text-xicun-black/85 transition-colors hover:text-xicun-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3">
                <Button href={`/${lang}/book`} variant="solid" size="md" className="w-full">
                  {labels.book}
                </Button>
              </li>
              <li className="mt-4 sm:hidden">
                <LangSwitcher current={lang} labels={langLabels} tone="light" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
