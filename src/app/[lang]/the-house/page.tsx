import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { Reveal } from '@/components/primitives/reveal';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { WeddingForm } from '@/components/sections/wedding-form';
import { galleryPhotos } from '@/lib/data';

export async function generateMetadata({ params }: PageProps<'/[lang]/the-house'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.house.title, description: dict.house.intro };
}

export default async function HousePage({ params }: PageProps<'/[lang]/the-house'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <section className="bg-xicun-cream pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-44">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionEyebrow>{dict.house.eyebrow}</SectionEyebrow>
          <h1 className="font-display mt-5 max-w-4xl text-balance text-5xl tracking-tight text-xicun-black md:text-7xl">
            {dict.house.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-xicun-black/85">{dict.house.intro}</p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="relative mt-16 aspect-[16/8] w-full overflow-hidden">
          <Image src="/images/casa-front.jpg" alt="Casa Xicun courtyard with botanical murals" fill priority sizes="100vw" className="object-cover editorial-img" />
        </div>
      </Reveal>

      <div className="mx-auto mt-20 max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {dict.house.story.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.08} className="lg:col-span-4">
              <p className="text-[10px] uppercase tracking-editorial text-xicun-gold">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="font-display mt-3 text-3xl text-xicun-black">{s.heading}</h2>
              <p className="mt-4 text-base text-xicun-stone">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-20 grid grid-cols-2 gap-2 md:grid-cols-4">
            {galleryPhotos.slice(0, 4).map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden">
                <Image src={src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover editorial-img" />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-24 grid grid-cols-1 gap-10 border-t border-xicun-line pt-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionEyebrow>{dict.house.eyebrow}</SectionEyebrow>
              <h2 className="font-display mt-5 text-balance text-4xl tracking-tight text-xicun-black md:text-5xl">
                {dict.house.weddingForm.title}
              </h2>
              <p className="mt-5 text-base text-xicun-stone">{dict.house.weddingForm.subtitle}</p>
            </div>
            <div className="lg:col-span-7">
              <WeddingForm dict={dict.house.weddingForm} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
