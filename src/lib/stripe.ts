import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export const PLANS = {
  basic: {
    name: 'Basic',
    priceId: process.env.STRIPE_BASIC_PRICE_ID || 'price_basic',
    price: 500,
  },
  premium: {
    name: 'Premium',
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_premium',
    price: 1000,
  },
}
