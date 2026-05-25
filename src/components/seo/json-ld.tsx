type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE = 'https://casa-xicun.vercel.app';

export const lodgingSchema = (lang: 'en' | 'es') => ({
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': `${SITE}/#hostel`,
  name: 'Casa Xicun',
  alternateName: 'Casa Xicun Hostal Boutique',
  description:
    lang === 'es'
      ? 'Hostal boutique en Tepoztlán, Morelos. 90 minutos de CDMX. Habitaciones boho eco, noches de mezcal, mañanas de montaña.'
      : 'Boutique hostel in Tepoztlán, Morelos. 90 minutes from Mexico City. Boho eco rooms, mezcal nights, mountain mornings.',
  url: SITE,
  image: [
    `${SITE}/images/tepozteco-hero.jpg`,
    `${SITE}/images/casa-front.jpg`,
    `${SITE}/images/room-1.png`,
  ],
  telephone: '+52 1 777 000 0000',
  priceRange: '$$',
  currenciesAccepted: 'MXN, USD',
  paymentAccepted: 'Cash, Credit Card, Stripe',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle del Tepozteco',
    addressLocality: 'Tepoztlán',
    addressRegion: 'Morelos',
    postalCode: '62520',
    addressCountry: 'MX',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 18.9856,
    longitude: -99.0996,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '327',
    bestRating: '5',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Mountain view', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Mezcal bar', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Breakfast included', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Cowork-ready', value: true },
  ],
  starRating: { '@type': 'Rating', ratingValue: '4' },
});

export const roomSchema = (room: {
  slug: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  sizeM2: number;
  rating: number;
  reviewCount: number;
  image: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HotelRoom',
  '@id': `${SITE}/rooms/${room.slug}#room`,
  name: room.name,
  description: room.description,
  occupancy: {
    '@type': 'QuantitativeValue',
    maxValue: room.maxGuests,
  },
  floorSize: {
    '@type': 'QuantitativeValue',
    value: room.sizeM2,
    unitCode: 'MTK',
  },
  image: `${SITE}${room.image}`,
  offers: {
    '@type': 'Offer',
    price: room.price,
    priceCurrency: 'MXN',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/en/rooms/${room.slug}`,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: room.rating.toString(),
    reviewCount: room.reviewCount.toString(),
    bestRating: '5',
  },
});

export const breadcrumbSchema = (
  items: { name: string; url: string }[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE}${item.url}`,
  })),
});
