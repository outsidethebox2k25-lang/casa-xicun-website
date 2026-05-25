import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/primitives/button';

export default function NotFound() {
  return (
    <div className="relative isolate min-h-[88svh] overflow-hidden bg-xicun-black px-5 py-32 text-white lg:px-8">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/tepozteco-pyramid.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover editorial-img"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block h-px w-12 bg-xicun-gold" />
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-editorial text-xicun-gold">
          404
        </p>
        <h1 className="font-display mt-5 text-balance text-5xl tracking-tight md:text-7xl">
          You took a wrong turn off the trail.
        </h1>
        <p className="mt-5 text-base text-white/85 md:text-lg">
          The page you&apos;re looking for doesn&apos;t exist — or maybe it&apos;s up the mountain.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="solid" size="lg">
            Back home
          </Button>
          <Link
            href="/en/rooms"
            className="inline-flex items-center gap-2 border border-white/40 px-7 py-3 text-sm font-semibold uppercase tracking-editorial text-white transition-colors hover:bg-white hover:text-xicun-black rounded-full"
          >
            See rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
