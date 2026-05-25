'use client';

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const easeEditorial = [0.22, 0.61, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeEditorial } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
};

export const stagger = (delay = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

type RevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  once?: boolean;
  amount?: number;
  delay?: number;
  variants?: Variants;
};

export function Reveal({
  children,
  once = true,
  amount = 0.2,
  delay = 0,
  variants = fadeUp,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: '-60px' }}
      variants={variants}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
  amount?: number;
};

export function Stagger({ children, delay = 0.1, amount = 0.15, ...rest }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: '-60px' }}
      variants={stagger(delay)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = motion.div;
