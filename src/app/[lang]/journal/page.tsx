import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/components/primitives/reveal';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { galleryPhotos } from '@/lib/data';

export async function generateMetadata({ params }: PageProps<'/[lang]/journal'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.journal.title, description: dict.journal.subtitle };
}

export default async function JournalPage({ params }: PageProps<'/[lang]/journal'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <section className="bg-xicun-cream px-5 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:px-8 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>{dict.journal.eyebrow}</SectionEyebrow>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-5xl tracking-tight text-xicun-black md:text-6xl">
            {dict.journal.title}
          </h1>
          <p className="mt-5 max-w-xl text-base text-xicun-stone">{dict.journal.subtitle}</p>
        </Reveal>

        <Stagger delay={0.1} className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {dict.journal.posts.map((p, i) => (
            <StaggerItem key={p.slug} variants={fadeUp}>
              <Link href={`/${lang}/journal`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={galleryPhotos[i % galleryPhotos.length]}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover editorial-img transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-5">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-editorial text-xicun-stone">
                    <span className="text-xicun-gold">{p.category}</span>
                    <span>·</span>
                    <span>{p.date}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {p.readTime}
                    </span>
                  </div>
                  <h2 className="font-display mt-3 text-2xl text-xicun-black transition-colors duration-300 group-hover:text-xicun-gold">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-xicun-stone">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-editorial text-xicun-gold">
                    {dict.journal.readMore}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
