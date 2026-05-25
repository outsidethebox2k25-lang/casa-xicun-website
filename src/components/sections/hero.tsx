'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookingWidget } from '@/components/booking/booking-widget';
import { Star } from 'lucide-react';

type Props = {
  lang: 'en' | 'es';
  dict: { eyebrow: string; title: string; subtitle: string; scrollCue: string };
  bookingLabels: React.ComponentProps<typeof BookingWidget>['labels'];
};

export function Hero({ lang, dict, bookingLabels }: Props) {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-xicun-black text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/tepozteco-hero.jpg"
          alt="Tepoztlán village with the Tepozteco mountain"
          fill
          priority
          sizes="100vw"
          className="object-cover editorial-img scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/70" />
        <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-5 pt-28 pb-48 sm:pt-32 sm:pb-44 lg:px-8 lg:pt-44 lg:pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-12 bg-xicun-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-editorial text-white/90">
              {dict.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display mt-6 text-balance text-[2.75rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.02] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]"
          >
            {dict.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-7 max-w-xl text-balance text-base text-white/90 md:text-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
          >
            {dict.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-editorial text-white/85"
          >
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-xicun-gold text-xicun-gold" strokeWidth={0} />
              4.9 · 327 reviews
            </span>
            <span className="h-3 w-px bg-white/30" />
            <span>90 min from CDMX</span>
            <span className="h-3 w-px bg-white/30" />
            <span>Free cancellation</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full px-5 pb-0 lg:px-8 lg:translate-y-1/2"
      >
        <BookingWidget lang={lang} labels={bookingLabels} variant="hero" />
      </motion.div>
    </section>
  );
}
