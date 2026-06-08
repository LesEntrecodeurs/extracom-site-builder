# Base Next.js - Site Vitrine

Guide de référence pour créer un projet Next.js site vitrine avec i18n (next-intl), sans authentification, sans middleware de login.

## Tech Stack

- **Next.js 15** avec App Router et Turbopack
- **React 19** avec TypeScript
- **next-intl** pour l'internationalisation (fr/en)
- **Tailwind CSS 3** pour le styling
- **Radix UI** + **shadcn/ui** pour les composants UI
- **CSS natif** (keyframes + transitions via Tailwind) pour les animations. Framer Motion uniquement sur demande explicite pour des cas localisés
- **Lucide React** pour les icônes
- **class-variance-authority** + **clsx** + **tailwind-merge** pour les variantes de classes

### Optionnel (selon besoin)

- **React Hook Form** + **Zod** pour les formulaires (contact, newsletter, etc.)
- **Embla Carousel** pour les carrousels

### Non inclus (vs projet complet)

- ~~Framer Motion~~ — ne pas utiliser. Préférer les animations CSS natives (Tailwind `animate-*`, `transition-*`, `@keyframes`) pour les animations simples, et `tailwindcss-animate` pour les animations déclaratives. Framer Motion alourdit le bundle et force le `"use client"` sur les composants
- ~~TanStack Query~~ (pas de state serveur complexe)
- ~~Middleware d'auth/session~~ (pas de login)
- ~~Fetcher API~~ (pas d'appels API backend, ou fetch simple si besoin)

## Structure du projet

```
apps/web/
  public/
    images/              - Images statiques (logo, hero, illustrations)
    icons/               - Icones et favicons
    fonts/               - Polices locales (optionnel)
  translations/
    fr.json              - Traductions francaises
    en.json              - Traductions anglaises
  src/
    app/
      [locale]/
        layout.tsx       - Layout racine (html, body, metadata, fonts, providers)
        page.tsx         - Page d'accueil
        about/
          page.tsx       - Page A propos
        services/
          page.tsx       - Page Services
        contact/
          page.tsx       - Page Contact
        mentions-legales/
          page.tsx       - Page Mentions legales
      globals.css        - Variables CSS, Tailwind directives
      favicon.ico        - Favicon
      sitemap.ts         - Sitemap pour le SEO (multi-locale)
      robots.ts          - Robots.txt pour le SEO
      llms.txt/
        route.ts         - llms.txt pour les LLMs (GEO)
    components/
      ui/                - Composants shadcn/ui (button, card, dialog, etc.)
      layout/
        header.tsx       - Header / Navigation
        footer.tsx       - Footer
        navbar.tsx       - Barre de navigation
        mobile-menu.tsx  - Menu mobile
        locale-switcher.tsx - Selecteur de langue
    config/
      app.config.ts      - Configuration de l'app (nom, URLs, metadata)
      navigation.ts      - Liens de navigation
      llms.config.ts     - Donnees pour llms.txt (resume, pages)
    hooks/
      use-mobile.tsx     - Hook detection mobile
    i18n/
      routing.ts         - Configuration du routing i18n
      request.ts         - Configuration serveur next-intl
      navigation.ts      - Helpers de navigation types (Link, redirect, etc.)
    lib/
      utils.ts           - Utilitaire cn() pour les classes conditionnelles
    modules/             - Modules par fonctionnalite
      home/
        sections/        - Sections de la page d'accueil
          hero-section.tsx
          features-section.tsx
          testimonials-section.tsx
          cta-section.tsx
        home-page.tsx    - Composant page d'accueil
      about/
        sections/
          team-section.tsx
        about-page.tsx
      contact/
        components/
          contact-form.tsx
        contact-page.tsx
      services/
        sections/
          services-list-section.tsx
        services-page.tsx
    types/               - Types TypeScript partages
  components.json        - Config shadcn/ui
  tailwind.config.ts     - Config Tailwind
  postcss.config.mjs     - Config PostCSS
  next.config.ts         - Config Next.js (avec plugin next-intl)
  tsconfig.json          - Config TypeScript
```

## Configuration de base

### next.config.ts

```typescript
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      // Ajouter les domaines autorisés pour les images distantes
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### postcss.config.mjs

```javascript
const config = {
  plugins: {
    tailwindcss: {},
  },
};
export default config;
```

### components.json (shadcn/ui)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '5rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
```

## Internationalisation (next-intl)

### src/i18n/routing.ts

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  pathnames: {
    '/': { fr: '/', en: '/' },
    '/about': { fr: '/a-propos', en: '/about' },
    '/services': { fr: '/services', en: '/services' },
    '/contact': { fr: '/contact', en: '/contact' },
    '/mentions-legales': { fr: '/mentions-legales', en: '/legal-notice' },
  },
});
```

### src/i18n/request.ts

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
    messages: (await import(`../../translations/${locale}.json`)).default,
  };
});
```

### src/i18n/navigation.ts

```typescript
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

> **Important :** Utiliser `Link` de `@/i18n/navigation` au lieu de `next/link` pour que les liens soient automatiquement prefixes avec la locale.

### translations/fr.json

```json
{
  "common": {
    "contact": "Contact",
    "learnMore": "En savoir plus",
    "allRightsReserved": "Tous droits reserves"
  },
  "nav": {
    "home": "Accueil",
    "services": "Services",
    "about": "A propos",
    "contact": "Contact",
    "legalNotice": "Mentions legales"
  },
  "home": {
    "hero": {
      "title": "Titre principal du site",
      "description": "Description accrocheuse du service ou du produit.",
      "cta": "Nous contacter",
      "ctaSecondary": "Nos services"
    },
    "features": {
      "title": "Nos services",
      "feature1": { "title": "Service 1", "description": "Description du service 1" },
      "feature2": { "title": "Service 2", "description": "Description du service 2" },
      "feature3": { "title": "Service 3", "description": "Description du service 3" }
    }
  },
  "contact": {
    "title": "Nous contacter",
    "name": "Nom",
    "namePlaceholder": "Votre nom",
    "email": "Email",
    "emailPlaceholder": "votre@email.fr",
    "message": "Message",
    "messagePlaceholder": "Votre message...",
    "submit": "Envoyer",
    "validation": {
      "nameRequired": "Le nom est requis",
      "emailInvalid": "Email invalide",
      "messageMin": "Le message doit contenir au moins 10 caracteres"
    }
  },
  "about": {
    "title": "A propos"
  },
  "footer": {
    "navigation": "Navigation",
    "contact": "Contact"
  }
}
```

### translations/en.json

```json
{
  "common": {
    "contact": "Contact",
    "learnMore": "Learn more",
    "allRightsReserved": "All rights reserved"
  },
  "nav": {
    "home": "Home",
    "services": "Services",
    "about": "About",
    "contact": "Contact",
    "legalNotice": "Legal notice"
  },
  "home": {
    "hero": {
      "title": "Main site title",
      "description": "Catchy description of the service or product.",
      "cta": "Contact us",
      "ctaSecondary": "Our services"
    },
    "features": {
      "title": "Our services",
      "feature1": { "title": "Service 1", "description": "Description of service 1" },
      "feature2": { "title": "Service 2", "description": "Description of service 2" },
      "feature3": { "title": "Service 3", "description": "Description of service 3" }
    }
  },
  "contact": {
    "title": "Contact us",
    "name": "Name",
    "namePlaceholder": "Your name",
    "email": "Email",
    "emailPlaceholder": "your@email.com",
    "message": "Message",
    "messagePlaceholder": "Your message...",
    "submit": "Send",
    "validation": {
      "nameRequired": "Name is required",
      "emailInvalid": "Invalid email",
      "messageMin": "Message must be at least 10 characters"
    }
  },
  "about": {
    "title": "About"
  },
  "footer": {
    "navigation": "Navigation",
    "contact": "Contact"
  }
}
```

## Middleware

Le middleware gère uniquement le routing i18n (pas d'auth) :

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
```

> **Note :** Pas de vérification de session/token. Le middleware ne fait que la gestion des locales.

## Fichiers d'application de base

### src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: hsl(0 0% 100%);
    --foreground: hsl(240 10% 4%);
    --card: hsl(0 0% 100%);
    --card-foreground: hsl(240 10% 4%);
    --popover: hsl(0 0% 100%);
    --popover-foreground: hsl(240 10% 4%);
    --primary: hsl(240 6% 10%);
    --primary-foreground: hsl(0 0% 98%);
    --secondary: hsl(240 5% 96%);
    --secondary-foreground: hsl(240 6% 10%);
    --muted: hsl(240 5% 96%);
    --muted-foreground: hsl(240 4% 46%);
    --accent: hsl(240 5% 96%);
    --accent-foreground: hsl(240 6% 10%);
    --destructive: hsl(0 84% 60%);
    --destructive-foreground: hsl(0 0% 98%);
    --border: hsl(240 6% 90%);
    --input: hsl(240 6% 90%);
    --ring: hsl(240 5% 64%);
    --radius: 0.625rem;
  }
}

* {
  scroll-behavior: smooth;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

> **Adapter les couleurs** au design system du projet. Ajouter un theme `.dark` si dark mode necessaire.

### src/app/[locale]/layout.tsx

```tsx
import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Mon Site',
    template: '%s | Mon Site',
  },
  description: 'Description du site vitrine',
  openGraph: {
    title: 'Mon Site',
    description: 'Description du site vitrine',
    url: 'https://monsite.fr',
    siteName: 'Mon Site',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### src/app/[locale]/page.tsx

```tsx
import { HomePage } from '@/modules/home/home-page';

export default function Page() {
  return <HomePage />;
}
```

### src/app/sitemap.ts

```typescript
import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://monsite.fr';

const pages = ['/', '/about', '/services', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${BASE_URL}/${locale}${page === '/' ? '' : page}`])
      ),
    },
  }));
}
```

### src/app/robots.ts

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://monsite.fr/sitemap.xml',
  };
}
```

### src/app/llms.txt/route.ts

Route handler qui génère le fichier `/llms.txt` au format Markdown pour les LLMs (GEO). Le contenu est assemblé depuis `app.config.ts` et `llms.config.ts`.

```typescript
import { appConfig } from '@/config/app.config';
import { llmsConfig } from '@/config/llms.config';

export const dynamic = 'force-static';

export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${appConfig.name}`);
  lines.push('');
  lines.push(`> ${llmsConfig.summary}`);
  lines.push('');
  lines.push('## À propos');
  lines.push('');
  lines.push(llmsConfig.about);
  lines.push('');
  lines.push('## Pages principales');
  lines.push('');
  for (const page of llmsConfig.pages) {
    lines.push(`- [${page.title}](${appConfig.url}${page.path}): ${page.description}`);
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
```

### src/config/llms.config.ts

Données structurées pour la génération de `/llms.txt`. Généré par `/build` depuis les fiches pages.

```typescript
export type LlmsPage = {
  title: string;
  path: string;
  description: string;
};

export type LlmsConfig = {
  summary: string;
  about: string;
  pages: LlmsPage[];
};

export const llmsConfig: LlmsConfig = {
  summary: 'Description courte du site (meta description de la page d\'accueil)',
  about: 'Présentation de l\'entreprise (accroche principale de la page d\'accueil)',
  pages: [
    { title: 'Accueil', path: '/', description: 'Page d\'accueil du site' },
    { title: 'Services', path: '/services', description: 'Nos services' },
    { title: 'À propos', path: '/a-propos', description: 'Présentation de l\'entreprise' },
    { title: 'Contact', path: '/contact', description: 'Nous contacter' },
  ],
};
```

> **Adapter** les données aux fiches pages du client. Le `summary` et `about` sont extraits de la fiche `accueil.md`. Les `pages` correspondent aux pages navigables (exclure header, footer, menu).

## Configuration de l'app

### src/config/app.config.ts

```typescript
export type AppConfig = {
  name: string;
  url: string;
  description: string;
  logo: string;
};

export const appConfig: AppConfig = {
  name: 'Mon Site',
  url: 'https://monsite.fr',
  description: 'Description du site vitrine',
  logo: '/images/logo.png',
};
```

### src/config/navigation.ts

```typescript
import { routing } from '@/i18n/routing';

export type NavLink = {
  labelKey: string;
  href: keyof typeof routing.pathnames;
};

export const mainNavLinks: NavLink[] = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.services', href: '/services' },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.contact', href: '/contact' },
];

export const footerNavLinks: NavLink[] = [
  ...mainNavLinks,
  { labelKey: 'nav.legalNotice', href: '/mentions-legales' },
];
```

> **Note :** Les labels utilisent des cles de traduction (`labelKey`) au lieu de texte en dur.

## Utilitaires

### src/lib/utils.ts

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Patterns pour les composants

### Layout : Header

```tsx
// src/components/layout/header.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { mainNavLinks } from '@/config/navigation';
import { appConfig } from '@/config/app.config';
import { Button } from '@/components/ui/button';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';

export const Header = () => {
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          {appConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <LocaleSwitcher />
          <Button asChild>
            <Link href="/contact">{t('common.contact')}</Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t px-4 py-4 space-y-3">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <LocaleSwitcher />
        </nav>
      )}
    </header>
  );
};
```

### Layout : Locale Switcher

```tsx
// src/components/layout/locale-switcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

const localeLabels: Record<string, string> = {
  fr: 'FR',
  en: 'EN',
};

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <Button
          key={loc}
          variant={loc === locale ? 'default' : 'ghost'}
          size="sm"
          onClick={() => switchLocale(loc)}
          className="text-xs px-2"
        >
          {localeLabels[loc]}
        </Button>
      ))}
    </div>
  );
};
```

### Layout : Footer

```tsx
// src/components/layout/footer.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { footerNavLinks } from '@/config/navigation';
import { appConfig } from '@/config/app.config';

export const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-lg font-bold">{appConfig.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {appConfig.description}
            </p>
          </div>

          <div>
            <p className="font-semibold mb-3">{t('footer.navigation')}</p>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3">{t('footer.contact')}</p>
            <p className="text-sm text-muted-foreground">contact@monsite.fr</p>
            <p className="text-sm text-muted-foreground">01 23 45 67 89</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {appConfig.name}. {t('common.allRightsReserved')}
        </div>
      </div>
    </footer>
  );
};
```

### Modules et sections de page

Chaque page est organisee en module dans `modules/`. Les sections sont des composants autonomes qui composent les pages.

> **Note :** Les exemples ci-dessous (hero, features, CTA, etc.) sont purement illustratifs. Adapter le contenu et les sections aux besoins reels du projet.

```tsx
// src/modules/home/home-page.tsx
import { HeroSection } from './sections/hero-section';
import { FeaturesSection } from './sections/features-section';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
};
```

```tsx
// src/modules/home/sections/hero-section.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const t = useTranslations('home.hero');

  return (
    <section className="container py-24 md:py-32 text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        {t('title')}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
        {t('description')}
      </p>
      <div className="mt-8 flex gap-4 justify-center">
        <Button size="lg" asChild>
          <Link href="/contact">{t('cta')}</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/services">{t('ctaSecondary')}</Link>
        </Button>
      </div>
    </section>
  );
};
```

```tsx
// src/modules/home/sections/features-section.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';

export const FeaturesSection = () => {
  const t = useTranslations('home.features');

  const features = [
    { key: 'feature1' },
    { key: 'feature2' },
    { key: 'feature3' },
  ] as const;

  return (
    <section className="container py-16 md:py-24">
      <h2 className="text-3xl font-bold text-center mb-12">{t('title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card key={feature.key}>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">
                {t(`${feature.key}.title`)}
              </h3>
              <p className="text-muted-foreground">
                {t(`${feature.key}.description`)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
```

## Formulaire de contact (optionnel - exemple)

Si la page contact necessite un formulaire, utiliser React Hook Form + Zod. Voici un exemple illustratif :

La page appelle le module :

```tsx
// src/app/[locale]/contact/page.tsx
import { ContactPage } from '@/modules/contact/contact-page';

export default function Page() {
  return <ContactPage />;
}
```

Le composant du module :

```tsx
// src/modules/contact/contact-page.tsx
'use client';

import { useTranslations } from 'next-intl';
import { ContactForm } from './components/contact-form';

export const ContactPage = () => {
  const t = useTranslations('contact');

  return (
    <section className="container max-w-xl py-16">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      <ContactForm />
    </section>
  );
};
```

Le formulaire extrait dans un composant :

```tsx
// src/modules/contact/components/contact-form.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const t = useTranslations('contact');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Envoyer vers un service (email API, Formspree, etc.)
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label>{t('name')}</Label>
            <Input {...field} placeholder={t('namePlaceholder')} />
            {fieldState.error && (
              <p className="text-sm text-destructive">
                {t('validation.nameRequired')}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label>{t('email')}</Label>
            <Input {...field} type="email" placeholder={t('emailPlaceholder')} />
            {fieldState.error && (
              <p className="text-sm text-destructive">
                {t('validation.emailInvalid')}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="message"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label>{t('message')}</Label>
            <Textarea {...field} rows={5} placeholder={t('messagePlaceholder')} />
            {fieldState.error && (
              <p className="text-sm text-destructive">
                {t('validation.messageMin')}
              </p>
            )}
          </div>
        )}
      />

      <Button type="submit" className="w-full">
        {t('submit')}
      </Button>
    </form>
  );
};
```

## SEO : Metadata par page

Chaque page peut exporter ses propres metadata. Pour les metadata traduites, utiliser `generateMetadata` :

```tsx
// src/app/[locale]/about/page.tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
  };
}

export default function AboutPage() {
  // Utiliser useTranslations dans un composant client si besoin
  return (
    <section className="container py-16">
      {/* Contenu */}
    </section>
  );
}
```

## Conventions cles

| Sujet | Convention |
|---|---|
| **Routing** | App Router avec `[locale]` (`app/[locale]/page.tsx`) |
| **Liens** | Utiliser `Link` de `@/i18n/navigation` (pas `next/link`) |
| **Traductions** | `useTranslations()` dans les composants client, `getTranslations()` dans les server components |
| **Middleware** | next-intl uniquement (gestion des locales), pas d'auth |
| **Composants** | Max 200 lignes, extraire en sous-composants si depasse |
| **Sections** | Composants autonomes dans `sections/` pour composer les pages |
| **Navigation** | Centralisee dans `config/navigation.ts` avec des cles de traduction |
| **Images** | Utiliser `next/image` avec les composants Image de Next.js |
| **Formulaires** | React Hook Form + Zod + Controller (jamais `register()`) |
| **Styling** | Tailwind CSS + `cn()` pour les classes conditionnelles |
| **SEO** | `generateMetadata` pour les metadata traduites, sitemap multi-locale |
| **Fonts** | Google Fonts via `next/font/google` dans le layout |
| **State** | Pas de state manager global, React state local suffit |
| **Animations** | CSS natif via Tailwind (keyframes, transitions, IntersectionObserver). Framer Motion interdit sauf demande explicite du développeur pour des cas précis et localisés |
| **Locale switcher** | Composant dédié avec `router.replace(pathname, { locale })` |

## Animations

Les animations sont gérées en **CSS natif** via Tailwind, sans librairie JS. Cela évite le surcoût de bundle (~40 KB) et permet aux composants de rester en Server Components.

### Pattern standard

1. Définir les `@keyframes` dans `globals.css`
2. Créer un composant `AnimateOnScroll` léger ("use client") qui utilise `IntersectionObserver`
3. Appliquer les animations via des classes CSS dans le JSX

### Keyframes dans globals.css

```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-left {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fade-in-scale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-on-scroll {
  opacity: 0;
}
.animate-on-scroll.is-visible {
  animation: fade-in-up 0.5s ease-out forwards;
  animation-delay: calc(var(--stagger, 0) * 80ms);
}
.animate-fade-in-left.is-visible { animation-name: fade-in-left; }
.animate-fade-in-scale.is-visible { animation-name: fade-in-scale; }
```

### Composant AnimateOnScroll

```tsx
"use client";
import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}

export function AnimateOnScroll({ children, className, style, as: Tag = "div" }: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <Tag ref={ref} className={cn("animate-on-scroll", className)} style={style}>{children}</Tag>;
}
```

### Usage

```tsx
// Fade-in au scroll (Server Component compatible via wrapper)
<AnimateOnScroll>
  <h2>Titre</h2>
</AnimateOnScroll>

// Stagger sur une grille
{items.map((item, i) => (
  <AnimateOnScroll key={item.id} style={{ '--stagger': i } as CSSProperties}>
    <Card>{item.name}</Card>
  </AnimateOnScroll>
))}

// Animations infinies (blobs, etc.) — CSS pur, pas de composant
<div className="animate-float-blob" />
```

### Accordéon (animation de hauteur)

```css
.accordion-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-in-out;
}
.accordion-panel[data-open="true"] {
  grid-template-rows: 1fr;
}
.accordion-panel > div { overflow: hidden; }
```

## Dependances package.json (essentielles)

```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.13",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.474.0",
    "next": "^15.4.10",
    "next-intl": "^4.3.4",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^24.10.1",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.4.17",
    "typescript": "~5.9.3"
  }
}
```

### Ajouter si formulaire de contact

```json
{
  "@hookform/resolvers": "^5.2.1",
  "react-hook-form": "^7.54.2",
  "zod": "^4.3.5"
}
```

### Ajouter si carrousel

```json
{
  "embla-carousel-react": "^8.6.0"
}
```

## Commandes de developpement

```bash
# Installer les dependances
yarn install

# Lancer en dev
yarn dev          # ou: next dev --turbopack -p 3000

# Build production
yarn build        # ou: next build

# Lancer la build
yarn start        # ou: next start

# Ajouter un composant shadcn
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## Checklist de demarrage

1. Creer le projet Next.js (`npx create-next-app@latest`)
2. Configurer Tailwind CSS et les variables CSS dans `globals.css`
3. Installer `next-intl` et configurer `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`
4. Creer les fichiers de traduction dans `translations/fr.json` et `translations/en.json`
5. Configurer le middleware (`middleware.ts`) pour le routing i18n
6. Configurer `next.config.ts` avec le plugin `next-intl`
7. Initialiser shadcn/ui (`npx shadcn@latest init`)
8. Ajouter les composants UI necessaires (`button`, `card`, `input`, etc.)
9. Creer `config/app.config.ts` et `config/navigation.ts`
10. Creer les composants `layout/header.tsx`, `layout/footer.tsx` et `layout/locale-switcher.tsx`
11. Creer le layout racine `app/[locale]/layout.tsx` avec metadata SEO et `NextIntlClientProvider`
12. Creer les sections de la page d'accueil dans `sections/`
13. Composer la page d'accueil dans `app/[locale]/page.tsx`
14. Ajouter les pages secondaires (`about`, `services`, `contact`)
15. Ajouter `sitemap.ts` (multi-locale) et `robots.ts` pour le SEO
16. Deployer (Vercel, Docker, etc.)