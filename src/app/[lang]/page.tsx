import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from './dictionaries';
import { Hero } from '@/components/sections/hero';
import { ValueBar } from '@/components/sections/value-bar';
import { RoomsGrid } from '@/components/sections/rooms-grid';
import { ExperienceSection } from '@/components/sections/experience';
import { AudienceMirror } from '@/components/sections/audience-mirror';
import { Gallery } from '@/components/sections/gallery';
import { SocialProof } from '@/components/sections/social-proof';
import { Destination } from '@/components/sections/destination';
import { FinalCta } from '@/components/sections/final-cta';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero lang={lang as Locale} dict={dict.hero} bookingLabels={dict.booking} />
      <ValueBar items={dict.valueBar.items} />
      <RoomsGrid
        lang={lang as Locale}
        eyebrow={dict.rooms.sectionEyebrow}
        title={dict.rooms.sectionTitle}
        viewLabel={dict.rooms.viewRoom}
        seeAllLabel={dict.rooms.seeAll}
        fromLabel="From"
        perNightLabel={dict.booking.perNight}
        perBedLabel={dict.booking.perBed}
        copy={dict.rooms.items}
      />
      <ExperienceSection
        lang={lang as Locale}
        eyebrow={dict.experience.eyebrow}
        title={dict.experience.title}
        intro={dict.experience.intro}
        items={dict.experience.items}
        cta={dict.experience.cta}
      />
      <Gallery
        eyebrow={dict.gallery.eyebrow}
        title={dict.gallery.title}
        subtitle={dict.gallery.subtitle}
      />
      <AudienceMirror
        eyebrow={dict.audience.eyebrow}
        title={dict.audience.title}
        items={dict.audience.items}
      />
      <SocialProof
        stat={dict.social.stat}
        featured={dict.social.featured}
        publications={dict.social.publications}
        testimonials={dict.social.testimonials}
      />
      <Destination
        lang={lang as Locale}
        eyebrow={dict.destination.eyebrow}
        pullquote={dict.destination.pullquote}
        items={dict.destination.items}
        cta={dict.destination.cta}
      />
      <FinalCta
        lang={lang as Locale}
        eyebrow={dict.finalCta.eyebrow}
        title={dict.finalCta.title}
        subtitle={dict.finalCta.subtitle}
        primary={dict.finalCta.primary}
        secondary={dict.finalCta.secondary}
        whatsappPhone={dict.topBar.phone}
        whatsappMessage={dict.whatsapp.default}
      />
    </>
  );
}
