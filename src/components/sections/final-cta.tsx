'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/primitives/reveal';
import { Button } from '@/components/primitives/button';
import { finalCtaImage } from '@/lib/data';
import { whatsappLink } from '@/lib/cn';
import { shimmer } from '@/lib/blur';

type Props = {
  lang: 'en' | 'es';
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  whatsappPhone: string;
  whatsappMessage: string;
};

export function FinalCta({ lang, eyebrow, title, subtitle, primary, secondary, whatsappPhone, whatsappMessage }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-xicun-black px-5 py-20 text-white sm:py-24 lg:px-8 lg:py-36">
      <div className="absolute inset-0 -z-10">
        <Image
          src={finalCtaImage}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={shimmer(2400, 1200)}
          className="object-cover editorial-img"
        />
        <span className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/70" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ transformOrigin: '50% 50%' }}
            className="mx-auto block h-px w-16 bg-xicun-gold"
          />
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-editorial text-xicun-gold">
            {eyebrow}
          </p>
          <h2 className="font-display mt-6 text-balance text-4xl tracking-tight text-white sm:text-5xl md:text-7xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
            {title}
          </h2>
          <p className="mt-6 text-base text-white/90 md:text-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={`/${lang}/book`} variant="solid" size="lg">
              {primary}
            </Button>
            <a
              href={whatsappLink(whatsappPhone, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 py-3.5 text-sm font-semibold uppercase tracking-editorial text-white backdrop-blur transition-colors duration-300 hover:border-white hover:bg-white hover:text-xicun-black"
            >
              {secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
