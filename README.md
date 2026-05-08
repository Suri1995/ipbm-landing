# Institute of Practical Business Management — Landing Page

A fully responsive, accessible, and performance-optimised Next.js 14 landing page for IPBM.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (inline utility classes)
- **Language**: TypeScript
- **Fonts**: Playfair Display + DM Sans (Google Fonts)

## Features

- ✅ Clean header with logo + phone CTA only
- ✅ Full-screen hero section with animated stats
- ✅ Smart side navbar (appears after hero, tracks active section)
- ✅ Mobile FAB menu for section navigation
- ✅ About, Programs, Team, Testimonials, FAQs, Contact sections
- ✅ Accordion FAQs with ARIA
- ✅ Contact form with loading + success states
- ✅ Skip-to-content link for screen readers
- ✅ Semantic HTML throughout (`<section>`, `<article>`, `<nav>`, `<footer>`, `<address>`)
- ✅ ARIA labels, roles, and `aria-expanded` on all interactive elements
- ✅ Scroll-triggered entrance animations
- ✅ Fully mobile-responsive (320px → 4K)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to [vercel.com](https://vercel.com) for automatic deployments.

## Project Structure

```
ipbm/
├── app/
│   ├── globals.css        # Tailwind base + Google Fonts import
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page composition
├── components/
│   ├── Header.tsx         # Sticky header: logo + phone button
│   ├── Hero.tsx           # Full-screen hero section
│   ├── SideNavbar.tsx     # Floating side nav (desktop) + FAB (mobile)
│   ├── About.tsx          # Institute overview
│   ├── Services.tsx       # Programs / courses
│   ├── Team.tsx           # Faculty cards
│   ├── Testimonials.tsx   # Alumni quotes
│   ├── FAQs.tsx           # Accordion FAQ
│   ├── Contact.tsx        # Enquiry form
│   └── Footer.tsx         # Footer with links
├── public/                # Static assets (add favicon.ico here)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Customisation

- **Phone number**: Search for `+91 98765 43210` and replace with your number
- **Email**: Replace `admissions@ipbm.edu.in`
- **Address**: Update in `Contact.tsx` and `Footer.tsx`
- **Colors**: Adjust `tailwind.config.ts` — primary is `navy`, accent is `gold`
- **Fonts**: Swap Google Fonts imports in `app/globals.css`
- **Content**: Each section component is self-contained and easy to edit

## Accessibility

This page targets WCAG 2.1 AA compliance:
- Semantic HTML structure
- Skip navigation link
- All interactive elements have focus styles and ARIA labels
- Colour contrast ratios meet AA requirements
- Screen reader-only labels on icon-only buttons
- `aria-expanded` on accordion and menu toggles
