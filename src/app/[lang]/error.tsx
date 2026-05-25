'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/primitives/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="min-h-[80svh] bg-xicun-cream px-5 pt-32 pb-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-editorial text-xicun-gold">
          500
        </p>
        <h1 className="font-display mt-5 text-balance text-5xl tracking-tight text-xicun-black md:text-6xl">
          Something went sideways.
        </h1>
        <p className="mt-5 text-base text-xicun-stone">
          We&apos;re working on it. Try again, or come back in a minute.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-editorial text-xicun-stone/70">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={() => reset()} variant="solid" size="md">
            Try again
          </Button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-editorial text-xicun-black/70 transition-colors hover:text-xicun-gold"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
