import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { Reveal } from '@/components/primitives/reveal';
import { SectionEyebrow } from '@/components/primitives/hairline';
import { ContactForm } from '@/components/sections/contact-form';
import { whatsappLink } from '@/lib/cn';

export async function generateMetadata({ params }: PageProps<'/[lang]/contact'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.contact.title, description: dict.contact.subtitle };
}

export default async function ContactPage({ params }: PageProps<'/[lang]/contact'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <section className="bg-xicun-cream px-5 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:px-8 lg:pt-44">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionEyebrow>{dict.contact.eyebrow}</SectionEyebrow>
          <h1 className="font-display mt-5 text-balance text-4xl tracking-tight text-xicun-black sm:text-5xl md:text-6xl">
            {dict.contact.title}
          </h1>
          <p className="mt-5 max-w-md text-base text-xicun-stone">{dict.contact.subtitle}</p>

          <ul className="mt-12 space-y-6 text-sm">
            <InfoRow
              icon={<Phone className="h-3.5 w-3.5" />}
              label={dict.contact.info.phoneLabel}
              value={dict.contact.info.phoneValue}
              href={`tel:${dict.contact.info.phoneValue.replace(/\s/g, '')}`}
            />
            <InfoRow
              icon={<Mail className="h-3.5 w-3.5" />}
              label={dict.contact.info.emailLabel}
              value={dict.contact.info.emailValue}
              href={`mailto:${dict.contact.info.emailValue}`}
            />
            <InfoRow
              icon={<MapPin className="h-3.5 w-3.5" />}
              label={dict.contact.info.addressLabel}
              value={dict.contact.info.addressValue}
            />
            <InfoRow
              icon={<MessageCircle className="h-3.5 w-3.5" />}
              label={dict.contact.info.whatsappLabel}
              value="WhatsApp"
              href={whatsappLink(dict.topBar.phone, dict.whatsapp.default)}
            />
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <ContactForm dict={dict.contact.form} />
        </Reveal>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 border-b border-xicun-line pb-5">
      <span className="mt-1 inline-flex h-8 w-8 flex-none items-center justify-center border border-xicun-line text-xicun-gold">
        {icon}
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-editorial text-xicun-stone">{label}</p>
        <p className="mt-1 font-display text-lg text-xicun-black">{value}</p>
      </div>
    </div>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="block transition-colors hover:text-xicun-gold">
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}
