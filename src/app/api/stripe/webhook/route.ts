import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { updateUser, users } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      const planId = session.metadata?.planId

      if (userId) {
        updateUser(userId, {
          subscriptionId: session.subscription as string,
          subscriptionStatus: 'active',
          plan: planId,
        })
      }
      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const user = users.find(
        (u) => u.stripeCustomerId === subscription.customer
      )

      if (user) {
        updateUser(user.id, {
          subscriptionStatus: subscription.status,
          plan: subscription.status === 'active' ? user.plan : undefined,
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
