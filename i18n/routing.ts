import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['fr', 'en'],

  // Used when no locale matches (default is French)
  defaultLocale: 'fr',

  // Remove prefix for default locale (fr), keep it for others (/en)
  // So: / = French, /en = English
  localePrefix: 'as-needed'
});

