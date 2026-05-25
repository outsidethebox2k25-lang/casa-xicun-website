'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/primitives/reveal';
import { Button } from '@/components/primitives/button';
import { finalCtaImage } from '@/lib/data';
import { whatsappLink } from '@/lib/cn';

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
    <section className="relative isolate overflow-hidden bg-xicun-cream px-5 py-20 sm:py-24 lg:px-8 lg:py-36">
      <div className="absolute inset-0 -z-10">
        <Image src={finalCtaImage} alt="" fill sizes="100vw" className="object-cover editorial-img" />
        <span className="absolute inset-0 bg-black/35" />
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
          <p className="mt-6 text-[11px] uppercase tracking-editorial text-xicun-gold">{eyebrow}</p>
          <h2 className="font-display mt-6 text-balance text-5xl tracking-tight text-xicun-black md:text-7xl">
            {title}
          </h2>
          <p className="mt-6 text-base text-xicun-black/85 md:text-lg">{subtitle}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={`/${lang}/book`} variant="solid" size="lg">
              {primary}
            </Button>
            <a
              href={whatsappLink(whatsappPhone, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-xicun-gold px-9 py-4 text-sm font-medium uppercase tracking-widest-x text-xicun-gold transition-colors duration-300 hover:bg-xicun-gold hover:text-xicun-black"
            >
              {secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
