'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/primitives/button';
import { formatMxn } from '@/lib/cn';

type Props = {
  lang: 'en' | 'es';
  fromPrice: number;
  fromLabel: string;
  perNightLabel: string;
  bookLabel: string;
};

export function MobileStickyBookBar({
  lang,
  fromPrice,
  fromLabel,
  perNightLabel,
  bookLabel,
}: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewport = window.innerHeight;
      // Show after scrolling past hero (600px) AND hide when within 600px of footer/end
      const nearBottom = scrolled + viewport > docHeight - 700;
      setShow(scrolled > 600 && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-xicun-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.18)] lg:hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-editorial text-xicun-stone">
                {fromLabel}
              </p>
              <p className="font-display text-lg font-medium text-xicun-black leading-tight">
                {formatMxn(fromPrice)}
                <span className="ml-1 text-xs font-normal text-xicun-stone">
                  {perNightLabel}
                </span>
              </p>
            </div>
            <Button href={`/${lang}/book`} size="sm" variant="solid">
              {bookLabel}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
