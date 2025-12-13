# WaitLa Digital Marketing Agency Website

Modern, high-converting showcase website for WaitLa digital marketing agency.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **i18n:** next-intl
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
waitla-website/
├── app/                    # Next.js App Router
│   ├── [locale]/          # i18n routes (en, fr)
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections
│   └── layout/           # Layout components
├── lib/                   # Utilities and helpers
├── messages/              # i18n translations
├── public/                # Static assets
└── types/                 # TypeScript types
```

## Environment Variables

Create a `.env.local` file:

```env
# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key

# Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_id

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# Database (Supabase - Phase 2)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Development Phases

See [PHASE_PLAN.md](./PHASE_PLAN.md) for detailed implementation phases.

- **Phase 1:** MVP (Homepage, Contact, Portfolio teaser)
- **Phase 2:** Full Launch (All pages, French support, SEO)
- **Phase 3:** Enhancements (Blog, Advanced features)

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

## Resources

- [PRD](./WaitLa_prd.md) - Product Requirements Document
- [Phase Plan](./PHASE_PLAN.md) - Implementation phases
- [Cursor Rules](./.cursorrules) - Development guidelines


