'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { whatsappLink } from '@/lib/cn';

type Props = {
  phone: string;
  message: string;
};

export function WhatsAppFloat({ phone, message }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safety: avoid render until mounted client-side
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      href={whatsappLink(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full border border-xicun-gold bg-xicun-gold text-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.55)] transition-colors duration-300 hover:bg-xicun-gold-hov sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  );
}
