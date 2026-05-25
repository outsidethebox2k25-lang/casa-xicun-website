export type RoomSlug = 'king-suite' | 'boho-double' | 'social-dorm' | 'garden-double';

export type RoomMeta = {
  slug: RoomSlug;
  type: 'private' | 'dorm';
  image: string;
  gallery: string[];
  amenities: ('wifi' | 'ac' | 'view' | 'bath' | 'cowork' | 'linens' | 'blackout' | 'breakfast' | 'terrace' | 'lockers')[];
  rating: number;
  reviewCount: number;
  popularityScore: number;
};

export const rooms: RoomMeta[] = [
  {
    slug: 'king-suite',
    type: 'private',
    image: '/images/room-1.png',
    gallery: ['/images/room-1.png', '/images/photo-02.jpg', '/images/photo-04.jpg', '/images/photo-05.jpg'],
    amenities: ['wifi', 'ac', 'view', 'bath', 'cowork', 'linens', 'blackout', 'breakfast', 'terrace'],
    rating: 4.95,
    reviewCount: 142,
    popularityScore: 92,
  },
  {
    slug: 'boho-double',
    type: 'private',
    image: '/images/room-2.png',
    gallery: ['/images/room-2.png', '/images/photo-04.jpg', '/images/photo-02.jpg', '/images/photo-05.jpg'],
    amenities: ['wifi', 'ac', 'view', 'bath', 'linens', 'blackout', 'breakfast'],
    rating: 4.9,
    reviewCount: 96,
    popularityScore: 84,
  },
  {
    slug: 'social-dorm',
    type: 'dorm',
    image: '/images/room-3.png',
    gallery: ['/images/room-3.png', '/images/photo-02.jpg', '/images/photo-01.jpg', '/images/photo-05.jpg'],
    amenities: ['wifi', 'ac', 'linens', 'blackout', 'breakfast', 'lockers'],
    rating: 4.85,
    reviewCount: 78,
    popularityScore: 77,
  },
  {
    slug: 'garden-double',
    type: 'private',
    image: '/images/room-4.png',
    gallery: ['/images/room-4.png', '/images/photo-01.jpg', '/images/photo-04.jpg', '/images/casa-front.jpg'],
    amenities: ['wifi', 'ac', 'bath', 'linens', 'breakfast', 'terrace'],
    rating: 4.88,
    reviewCount: 64,
    popularityScore: 72,
  },
];

// Photos to surface in the homepage gallery + sections
export const galleryPhotos = [
  '/images/casa-front.jpg',
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-03.jpg',
  '/images/photo-04.jpg',
  '/images/photo-05.jpg',
  '/images/room-1.png',
  '/images/room-2.png',
  '/images/room-3.png',
  '/images/room-4.png',
  '/images/tepozteco-street.jpg',
  '/images/tepozteco-pyramid.jpg',
];

// 4 tiles for the "Built for travelers like you" section — variety of vibes
export const audienceImages = [
  '/images/photo-01.jpg',   // common area (digital nomad)
  '/images/casa-front.jpg', // property entrance (weekender)
  '/images/photo-04.jpg',   // intimate detail (wedding guest)
  '/images/tepozteco-cave.jpg', // mountain hiker (solo traveler)
];

// Editorial photos for the various sections
export const experienceImage = '/images/tepozteco-cave.jpg';
export const destinationImage = '/images/tepozteco-pyramid.jpg';
export const finalCtaImage = '/images/tepozteco-street.jpg';
export const houseFeatureImage = '/images/casa-front.jpg';
export const heroImage = '/images/tepozteco-hero.jpg';
