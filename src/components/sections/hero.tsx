'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookingWidget } from '@/components/booking/booking-widget';
import { Star } from 'lucide-react';
import { shimmer } from '@/lib/blur';

type Props = {
  lang: 'en' | 'es';
  dict: { eyebrow: string; title: string; subtitle: string; scrollCue: string };
  bookingLabels: React.ComponentProps<typeof BookingWidget>['labels'];
};

export function Hero({ lang, dict, bookingLabels }: Props) {
  return (
    <>
      {/* Hero section — image + headline. Booking widget renders below on mobile. */}
      <section className="relative isolate min-h-[80svh] overflow-hidden bg-xicun-black text-white lg:min-h-[92svh]">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/tepozteco-hero.jpg"
            alt="Tepoztlán village with the Tepozteco mountain"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={shimmer(2400, 1600)}
            className="object-cover editorial-img scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/80" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/55 via-black/20 to-transparent lg:w-3/5" />
        </div>

        <div className="mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-end px-5 pt-28 pb-12 sm:pb-20 lg:min-h-[92svh] lg:px-8 lg:pt-44 lg:pb-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-3 sm:gap-4"
            >
              <span className="h-px w-8 bg-xicun-gold sm:w-12" />
              <span className="text-[10px] font-semibold uppercase tracking-editorial text-white/90 sm:text-[11px]">
                {dict.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="font-display mt-5 text-balance text-4xl sm:mt-6 sm:text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.04] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]"
            >
              {dict.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-5 max-w-xl text-balance text-sm text-white/90 sm:mt-7 sm:text-base md:text-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
            >
              {dict.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-editorial text-white/95 backdrop-blur-sm sm:mt-9 sm:gap-x-5 sm:px-5 sm:py-2.5 sm:text-[11px]"
            >
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3 w-3 fill-xicun-gold text-xicun-gold sm:h-3.5 sm:w-3.5" strokeWidth={0} />
                4.9 · 327
              </span>
              <span className="h-3 w-px bg-white/30" />
              <span>90 min · CDMX</span>
              <span className="h-3 w-px bg-white/30" />
              <span>Free cancel</span>
            </motion.div>
          </div>
        </div>

        {/* Desktop widget overlaps into next section */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto hidden w-full px-8 pb-0 lg:block lg:translate-y-1/2"
        >
          <BookingWidget lang={lang} labels={bookingLabels} variant="hero" />
        </motion.div>
      </section>

      {/* Mobile booking widget — its own block right after hero */}
      <div className="relative z-10 -mt-10 px-5 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <BookingWidget lang={lang} labels={bookingLabels} variant="hero" />
        </motion.div>
      </div>
    </>
  );
}
