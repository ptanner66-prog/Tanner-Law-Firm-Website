# Tanner Law Firm - Cannabis & Hemp Compliance Subscription Service

A professional subscription-based legal information service for cannabis and hemp regulatory compliance.

## Features

- Professional landing page with hero, features, pricing, about, and contact sections
- User authentication (sign up, login, logout)
- Stripe payment integration for subscriptions
- Two subscription tiers: Basic ($500/mo) and Premium ($1,000/mo)
- Member dashboard with compliance guides
- Responsive design for all devices

## Tech Stack

- **Framework:** Next.js 16 with TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Database:** In-memory (replace with PostgreSQL/MongoDB for production)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXTAUTH_URL` - Your site URL (http://localhost:3000 for development)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `STRIPE_SECRET_KEY` - From Stripe Dashboard
- `STRIPE_PUBLISHABLE_KEY` - From Stripe Dashboard
- `STRIPE_WEBHOOK_SECRET` - From Stripe Dashboard (Webhooks section)
- `STRIPE_BASIC_PRICE_ID` - Create a $500/month product in Stripe
- `STRIPE_PREMIUM_PRICE_ID` - Create a $1000/month product in Stripe

### 3. Set Up Stripe Products

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create two products:
   - **Basic Plan:** $500/month recurring
   - **Premium Plan:** $1,000/month recurring
3. Copy the price IDs to your `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Works with any Node.js hosting platform (Railway, Render, DigitalOcean, AWS, etc.)

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── stripe/       # Payment endpoints
│   │   └── user/         # User endpoints
│   ├── dashboard/        # Member dashboard
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   └── page.tsx         # Landing page
├── components/          # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── lib/                 # Utilities
    ├── auth.ts          # NextAuth config
    ├── db.ts            # Database utilities
    └── stripe.ts        # Stripe config
```

## Customization

### Update Contact Info
Edit `src/components/Contact.tsx` to update:
- Email address
- Phone number
- Office locations

### Update Branding
- Logo: Search for "Tanner Law" in components
- Colors: Edit `tailwind.config.ts` (primary = green, navy = dark blue)

### Add Database
Replace the in-memory database in `src/lib/db.ts` with:
- PostgreSQL (recommended for production)
- MongoDB
- Supabase
- PlanetScale

## Legal Disclaimer

The disclaimer in the footer complies with Louisiana and Florida bar requirements for legal information services. Update as needed for your jurisdiction.

## License

MIT
