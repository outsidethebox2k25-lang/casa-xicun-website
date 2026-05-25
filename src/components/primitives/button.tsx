import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'solid' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  solid:
    'bg-xicun-gold text-white hover:bg-xicun-gold-hov shadow-[0_4px_14px_-4px_rgba(184,147,47,0.45)] hover:shadow-[0_8px_22px_-6px_rgba(184,147,47,0.55)]',
  outline:
    'bg-white text-xicun-black border border-xicun-line hover:border-xicun-gold hover:text-xicun-gold shadow-sm',
  ghost:
    'bg-transparent text-xicun-black hover:text-xicun-gold',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

type LinkProps = Common & { href: string; onClick?: never; type?: never; disabled?: never };
type BtnProps = Common & {
  href?: undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export function Button(props: LinkProps | BtnProps) {
  const { variant = 'solid', size = 'md', className, children } = props;
  const klass = cn(base, variantClasses[variant], sizeClasses[size], className);

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={klass}>
        {children}
      </Link>
    );
  }

  const { onClick, type = 'button', disabled } = props as BtnProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={klass}>
      {children}
    </button>
  );
}
