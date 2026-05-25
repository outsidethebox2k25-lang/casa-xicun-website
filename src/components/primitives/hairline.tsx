'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export function Hairline({ className }: { className?: string }) {
  return <span className={cn('hairline-gold', className)} aria-hidden />;
}

export function HairlineAnimated({ className }: { className?: string }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{ transformOrigin: '0% 50%' }}
      className={cn('hairline-gold', className)}
      aria-hidden
    />
  );
}

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Hairline />
      <span className="text-[10px] font-medium uppercase tracking-editorial text-xicun-gold">
        {children}
      </span>
    </div>
  );
}
