import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { Reveal, Stagger, StaggerItem, fadeUp } from '@/components/primitives/reveal';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { formatMxn } from '@/lib/cn';
import { galleryPhotos } from '@/lib/data';

export async function generateMetadata({ params }: PageProps<'/[lang]/experiences'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.experiencesPage.title, description: dict.experiencesPage.subtitle };
}

export default async function ExperiencesPage({ params }: PageProps<'/[lang]/experiences'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <section className="bg-xicun-cream px-5 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:px-8 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>{dict.experiencesPage.eyebrow}</SectionEyebrow>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-5xl tracking-tight text-xicun-black md:text-6xl">
            {dict.experiencesPage.title}
          </h1>
          <p className="mt-5 max-w-xl text-base text-xicun-stone">{dict.experiencesPage.subtitle}</p>
        </Reveal>

        <Stagger delay={0.1} className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dict.experiencesPage.items.map((exp, i) => (
            <StaggerItem key={exp.slug} variants={fadeUp} className="group rounded-xl border border-xicun-line bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={galleryPhotos[i % galleryPhotos.length]}
                  alt={exp.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover editorial-img transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display mt-2 text-2xl text-xicun-black">{exp.title}</h3>
                <p className="mt-2 text-sm text-xicun-stone">{exp.summary}</p>
                <div className="mt-5 flex items-center justify-between border-t border-xicun-line pt-4">
                  <p className="font-display text-base text-xicun-black">{formatMxn(exp.price)}</p>
                  <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-editorial text-xicun-stone">
                    <Clock className="h-3 w-3" />
                    {exp.duration}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <div className="mt-20 border-t border-xicun-line pt-10 text-center">
            <p className="text-[11px] uppercase tracking-editorial text-xicun-stone">
              {lang === 'es' ? 'Agrega cualquiera al hacer tu reserva.' : 'Add any of these when you book.'}
            </p>
            <Link
              href={`/${lang}/book`}
              className="mt-4 inline-flex items-center gap-2 border border-xicun-gold px-7 py-3 text-xs font-medium uppercase tracking-widest-x text-xicun-gold transition-colors hover:bg-xicun-gold hover:text-xicun-black"
            >
              {dict.nav.book}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
