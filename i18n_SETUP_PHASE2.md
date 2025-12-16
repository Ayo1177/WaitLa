# i18n Setup for Phase 2

## Note
For Phase 1 (MVP), we're running English-only without next-intl to keep things simple. 

## Phase 2: Adding French Support

When ready to add multilingual support, follow these steps:

### 1. Update next.config.mjs
```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
```

### 2. Create i18n configuration files

**i18n/request.ts:**
```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

**i18n/routing.ts:**
```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

### 3. Create translation files

**messages/en.json:**
```json
{
  "nav": {
    "home": "Home",
    "services": "Services",
    "portfolio": "Portfolio",
    "about": "About",
    "team": "Team",
    "contact": "Contact"
  }
}
```

**messages/fr.json:**
```json
{
  "nav": {
    "home": "Accueil",
    "services": "Services",
    "portfolio": "Portfolio",
    "about": "À propos",
    "team": "Équipe",
    "contact": "Contact"
  }
}
```

### 4. Update app structure
- Move pages to `app/[locale]/` directory
- Update all components to use `useTranslations()` hook
- Update Header to use language switcher

See [next-intl documentation](https://next-intl-docs.vercel.app/) for full setup guide.






