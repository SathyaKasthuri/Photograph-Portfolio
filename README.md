# Lens & Light — Photographer Portfolio

A full-featured photography portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Home** — Hero, featured gallery, category previews, testimonials, CTA
- **Gallery** — Categorized collections with masonry grid and lightbox viewer
- **About** — Bio, approach, stats, and gear list
- **Blog** — MDX-powered posts with cover images
- **Contact** — Inquiry form with email delivery via Resend
- **Shop** — Fine art print catalog with cart and Razorpay checkout (UPI, cards, net banking)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) for contact form and order emails |
| `CONTACT_EMAIL` | Email address where inquiries and orders are sent |
| `RAZORPAY_KEY_ID` | Key ID from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys) |
| `RAZORPAY_KEY_SECRET` | Key Secret from Razorpay Dashboard (server-side only) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Same as Key ID (used by checkout UI) |
| `RAZORPAY_WEBHOOK_SECRET` | Optional webhook secret for `/api/webhooks/razorpay` |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (e.g. `https://yoursite.com`) |

Without Razorpay keys, checkout falls back to email-only orders (dev mode).
Without `RESEND_API_KEY`, order emails are logged to the server console.

### Razorpay Setup (India)

1. Sign up free at [razorpay.com](https://razorpay.com) — no monthly fee, pay only per transaction
2. Go to **Dashboard → Account & Settings → API Keys**
3. Generate **Test Mode** keys and add to `.env.local`:
   ```bash
   RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=...
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
   ```
4. Test UPI/card: use Razorpay test cards from [their docs](https://razorpay.com/docs/payments/payments/test-card-details/)

### Razorpay Webhook (optional)

1. Dashboard → **Webhooks** → Add endpoint: `https://yoursite.com/api/webhooks/razorpay`
2. Select event: `payment.captured`
3. Copy signing secret to `RAZORPAY_WEBHOOK_SECRET`

## Content

| Location | Purpose |
|---|---|
| `data/galleries.json` | Gallery images organized by category |
| `data/products.json` | Shop products with sizes and prices |
| `data/testimonials.json` | Client testimonials |
| `content/blog/*.mdx` | Blog posts (Markdown + frontmatter) |
| `public/images/` | Local image assets (optional — currently uses Unsplash URLs) |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deploy on Vercel

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add `RESEND_API_KEY`, `CONTACT_EMAIL`, and Razorpay keys as environment variables
4. Deploy

Vercel will auto-detect Next.js and configure the build.

## Android App

This project includes a native **Android app** via Capacitor. See **[ANDROID.md](./ANDROID.md)** for full setup.

Quick start (after deploying to Vercel):

```bash
CAPACITOR_SERVER_URL=https://your-app.vercel.app npm run cap:sync
npm run cap:open
```

Then run from Android Studio on an emulator or device.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- next-mdx-remote
- Razorpay
- Resend
- Capacitor (Android)
