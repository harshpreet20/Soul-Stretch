# Soul Stretch - Premium Fitness Recovery & Performance Accessories

A premium Next.js 14 website for Soul Stretch, an Indian fitness recovery brand delivering elite training accessories.

**Live Site:** https://soulstretch.in
**Tagline:** Train Better. Recover Faster. Stretch Further.

## Features

- **Premium Minimal Design**: Apple/Nike aesthetic with dark theme
- **Interactive Components**: Framer Motion animations, GSAP scroll storytelling
- **Product Showcase**: 11 premium products with detailed descriptions
- **Dynamic Content**: Google Sheets integration for real-time product updates
- **Blog/Guides**: Expert training guides with full SEO optimization
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **WhatsApp Integration**: Direct customer contact via WhatsApp
- **Performance Optimized**: Next.js Image optimization, lazy loading

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion + GSAP ScrollTrigger
- **Data**: Google Sheets CSV + Static Fallback
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd soul-stretch

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Update WhatsApp number in .env.local
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_SITE_URL=https://soulstretch.in
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
soul-stretch/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── products/
│   │   ├── page.tsx        # Products listing
│   │   └── [slug]/
│   │       └── page.tsx    # Product detail page
│   ├── guides/
│   │   └── page.tsx        # Blog/guides
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── contact/
│   │   └── page.tsx        # Contact form
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navigation
│   │   └── Footer.tsx      # Footer
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ScrollStorytelling.tsx
│   │   ├── AppleProductReveal.tsx
│   │   ├── ComparisonSlider.tsx
│   │   ├── GuidesPreview.tsx
│   │   └── DistributorCTA.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   └── ProductGrid.tsx
│   └── ui/
│       └── WhatsAppButton.tsx
├── lib/
│   ├── products.ts         # Product data & fetch logic
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Product Data

### Local Data

11 products are defined in `/lib/products.ts`:

1. Foam Roller
2. Foot Insoles
3. Hand Gripper
4. Adjustable Hand Gripper
5. Wrist Exerciser
6. Protein Shaker
7. Double Toning Equipment
8. Wrist Support
9. Resistance Band Set
10. Gym Gloves
11. Skipping Rope

### Google Sheets Integration

To enable live data from Google Sheets:

1. Create a public Google Sheet with columns: name, tagline, description, category, imageUrl, benefits, features
2. Update `SHEET_CSV_URL` in `/lib/products.ts`
3. The app will fetch from the sheet at runtime with a 1-hour cache

Currently, the app falls back to static `FALLBACK_PRODUCTS` for reliability.

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_SITE_URL=https://soulstretch.in
```

## Color Palette

- **Background**: #0e0e0e (soul-black)
- **Card**: #1b1b1b (soul-card)
- **Accent**: #ff7a18 (soul-orange)
- **Text**: #ffffff (soul-white)
- **Secondary**: #a0a0a0 (soul-gray)

## Pages

### Public Pages

1. **Home** (`/`) - Hero, storytelling, products, comparison, guides, distributor CTA
2. **Products** (`/products`) - Grid view with category filtering
3. **Product Detail** (`/products/[slug]`) - Individual product page
4. **Guides** (`/guides`) - 3 expert training guides
5. **About** (`/about`) - Brand story and values
6. **Contact** (`/contact`) - Contact form + WhatsApp integration

### Features by Page

**Home**: Full-page sections with animations
- Hero with staggered text animations
- GSAP scroll storytelling (3 sections)
- Apple-style product reveals
- Interactive comparison slider
- Guide previews
- Distributor call-to-action

**Products**:
- Category filter tabs (All, Recovery, Strength, Support, Accessories, Cardio)
- Product cards with 3D hover effects
- Expandable descriptions
- One expanded card at a time
- Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)

**Product Detail**:
- Full product information
- Benefits and features list
- WhatsApp + inquiry CTA buttons
- Trust badges
- Related products link

**Contact**:
- Contact form with WhatsApp integration
- Form submission opens WhatsApp with pre-filled message
- Distributor inquiry section
- FAQ accordion

## Animations & Effects

### Framer Motion
- Staggered text animations (hero)
- Card expand/collapse (products)
- Hover scale & opacity effects
- Page transitions with `AnimatePresence`
- Pulse animation (WhatsApp button)

### GSAP ScrollTrigger
- Scroll-based text reveal (scroll storytelling)
- Product image scale transforms
- Text scrubbing effects

### CSS Animations
- Custom keyframes: shimmer, fadeUp, scaleIn, float
- Smooth transitions on interactive elements
- Custom scrollbar styling

## SEO

### Meta Tags
- Dynamic titles and descriptions per page
- Open Graph images for social sharing
- Twitter card meta tags
- Canonical URLs

### Structured Data
- Schema.org Organization (JSON-LD) in root layout
- Per-page WebPage schema on guides/products

### Keywords
- Premium gym accessories India
- Fitness recovery equipment India
- Foam roller, resistance bands, grip trainers
- Sports recovery tools
- Home gym accessories

## WhatsApp Integration

All CTAs direct to WhatsApp for immediate customer contact:

```
https://wa.me/91XXXXXXXXXX?text=Pre-filled+message
```

The form on the contact page:
1. Collects name, email, message, inquiry type
2. Formats message
3. Opens WhatsApp with pre-filled message
4. No backend required

## Performance

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Route-based chunking
- **CSS**: Tailwind purging unused classes
- **Fonts**: System font stack (no web fonts)
- **Caching**: Product data cached for 1 hour

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Manual Deployment

```bash
# Build
npm run build

# Start production server
npm start
```

The `.next` directory is production-ready for deployment on any Node.js host.

## Customization

### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'soul-black': '#0e0e0e',
  'soul-card': '#1b1b1b',
  'soul-orange': '#ff7a18',
  'soul-white': '#ffffff',
  'soul-gray': '#a0a0a0',
}
```

### Products

Edit `/lib/products.ts`:

```typescript
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Your Product',
    slug: 'your-product',
    // ... other fields
  }
]
```

### Copy & Messaging

Nike-inspired, punchy, benefit-focused copy throughout. Examples:
- "Train Better. Recover Faster. Stretch Further."
- "Performance is not built in the gym alone. It's built in recovery."
- "Your muscles don't grow during the workout. They grow after it."

## Support

For issues, questions, or feature requests:
- Email: support@soulstretch.in
- WhatsApp: [via contact form]
- Instagram: @soulstretchIN

## License

© 2024 Soul Stretch. All rights reserved.

## Credits

- Design inspired by Nike, Apple, Therabody
- Built with Next.js 14, Framer Motion, GSAP
- Deployed on Vercel
