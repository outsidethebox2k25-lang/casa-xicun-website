'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type Lang = 'en' | 'es';

type Props = {
  current: Lang;
  labels: { en: string; es: string };
  className?: string;
  size?: 'sm' | 'md';
  tone?: 'light' | 'dark';
};

export function LangSwitcher({
  current,
  labels,
  className,
  size = 'sm',
  tone = 'light',
}: Props) {
  const pathname = usePathname() ?? '/';

  const swap = (target: Lang) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${target}`;
    segments[0] = target;
    return '/' + segments.join('/');
  };

  const dim = size === 'sm' ? 'text-[11px] px-3 py-1.5' : 'text-xs px-4 py-2';

  const container =
    tone === 'light'
      ? 'border-xicun-line bg-white/85 shadow-sm'
      : 'border-white/25 bg-black/35 backdrop-blur';

  const inactive =
    tone === 'light' ? 'text-xicun-stone hover:text-xicun-black' : 'text-white/85 hover:text-white';

  const activeText = tone === 'light' ? 'text-white' : 'text-xicun-black';
  const activeBg = tone === 'light' ? 'bg-xicun-black' : 'bg-white';

  return (
    <div
      className={[
        'relative inline-flex items-center rounded-full border p-1 backdrop-blur transition-colors duration-300',
        container,
        className ?? '',
      ].join(' ')}
    >
      {(['en', 'es'] as const).map((lng) => {
        const active = lng === current;
        return (
          <Link
            key={lng}
            href={swap(lng)}
            aria-current={active ? 'page' : undefined}
            className={[
              'relative z-10 rounded-full font-semibold uppercase tracking-editorial transition-colors duration-200',
              dim,
              active ? activeText : inactive,
            ].join(' ')}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className={['absolute inset-0 -z-10 rounded-full', activeBg].join(' ')}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            {labels[lng]}
          </Link>
        );
      })}
    </div>
  );
}
