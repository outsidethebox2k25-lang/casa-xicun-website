import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, hasLocale, locales, type Locale } from './dictionaries';
import { TopBar } from '@/components/layout/top-bar';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/layout/whatsapp-float';
import { UTMCapture } from '@/components/layout/utm-capture';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    metadataBase: new URL('https://casaxicun.mx'),
    title: { default: dict.meta.defaultTitle, template: `%s · ${dict.meta.siteName}` },
    description: dict.meta.defaultDescription,
    icons: { icon: '/images/logo.png' },
    alternates: {
      languages: { en: '/en', es: '/es' },
    },
    openGraph: {
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      images: ['/images/hero.jpg'],
      locale: lang === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
      siteName: dict.meta.siteName,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full bg-xicun-cream text-xicun-black">
        <UTMCapture />
        <TopBar
          lang={lang as Locale}
          phone={dict.topBar.phone}
          bestPrice={dict.topBar.bestPrice}
          langLabels={{ en: dict.lang.en, es: dict.lang.es }}
        />
        <Nav
          lang={lang as Locale}
          labels={dict.nav}
          langLabels={{ en: dict.lang.en, es: dict.lang.es }}
        />
        <main className="pt-0">{children}</main>
        <Footer
          lang={lang as Locale}
          tagline={dict.footer.tagline}
          address={dict.footer.address}
          columns={dict.footer.columns}
          stay={dict.footer.stay}
          discover={dict.footer.discover}
          connect={dict.footer.connect}
          newsletter={dict.footer.newsletter}
          rights={dict.footer.rights}
          links={dict.footer.links}
        />
        <WhatsAppFloat phone={dict.topBar.phone} message={dict.whatsapp.default} />
      </body>
    </html>
  );
}
