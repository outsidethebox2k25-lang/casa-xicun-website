import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { BookWizard } from '@/components/booking/book-wizard';

export default async function BookPage({ params }: PageProps<'/[lang]/book'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <section className="bg-xicun-cream px-5 pt-32 pb-28 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-5xl">
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
      </div>
    </section>
  );
}
