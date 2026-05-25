import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { BookWizard } from '@/components/booking/book-wizard';

export async function generateMetadata({ params }: PageProps<'/[lang]/book'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.book.title };
}

export default async function BookPage({ params }: PageProps<'/[lang]/book'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <section className="bg-xicun-cream px-5 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-5xl">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white/70" />}>
          <BookWizard
            lang={lang as Locale}
            dict={{
              book: dict.book,
              rooms: dict.rooms,
              booking: dict.booking,
              experiencesPage: dict.experiencesPage,
              whatsapp: dict.whatsapp,
              topBarPhone: dict.topBar.phone,
            }}
          />
        </Suspense>
      </div>
    </section>
  );
}
