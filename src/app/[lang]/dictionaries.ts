import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  es: () => import('./dictionaries/es.json').then((m) => m.default),
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export const locales: Locale[] = ['en', 'es'];
export const defaultLocale: Locale = 'en';

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries;
export const getDictionary = (locale: Locale): Promise<Dictionary> => dictionaries[locale]();
