# Quick Start Guide

## 🚀 Getting Started

### Step 1: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### Step 2: Set Up Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:
- **Resend API Key** (for email): Get from [resend.com](https://resend.com)
- **Google Analytics ID** (optional for Phase 1)
- **reCAPTCHA keys** (optional for Phase 1, recommended for Phase 2)

### Step 3: Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

## 📁 Project Structure

```
waitla-website/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (contact form)
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── forms/             # Form components
│   ├── layout/            # Header, Footer
│   ├── sections/          # Homepage sections
│   └── ui/                # Reusable UI components
├── lib/
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Zod schemas
└── public/                # Static assets
```

## ✅ What's Already Built

### Phase 1 MVP Components:
- ✅ **Homepage** with all sections:
  - Hero section with animated headline
  - About teaser with value propositions
  - Services overview (8 services)
  - Accreditations section
  - Portfolio teaser (3 featured projects)
  - Client references
  - Contact strip CTA
- ✅ **Header** with mobile menu
- ✅ **Footer** with contact info and links
- ✅ **Contact Page** with form
- ✅ **Contact Form** with validation
- ✅ **API Route** for form submissions

### Next Steps (Phase 1):
1. Install dependencies (`pnpm install`)
2. Add real content (replace placeholders)
3. Add images to `/public` folder
4. Set up email service (Resend)
5. Test form submission
6. Create portfolio detail pages

## 🎨 Customization

### Brand Colors
Edit `tailwind.config.ts` to update brand colors:

```typescript
colors: {
  primary: {
    DEFAULT: "#000000", // Your primary color
    // ...
  },
}
```

### Content
- Homepage sections: `components/sections/`
- Navigation: `components/layout/Header.tsx`
- Footer: `components/layout/Footer.tsx`

## 📝 Development Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm type-check       # Check TypeScript types
```

## 🔧 Troubleshooting

### TypeScript Errors
If you see TypeScript errors, make sure dependencies are installed:
```bash
pnpm install
```

### Module Not Found
Clear `.next` cache and reinstall:
```bash
rm -rf .next node_modules
pnpm install
```

### Port Already in Use
Change the port:
```bash
pnpm dev -- -p 3001
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## 🎯 Phase 1 Checklist

- [x] Project structure created
- [x] Base components built
- [x] Homepage sections created
- [x] Contact form with validation
- [ ] Install dependencies
- [ ] Add real content and images
- [ ] Set up email service
- [ ] Create portfolio detail pages
- [ ] Mobile responsive testing
- [ ] Performance optimization






